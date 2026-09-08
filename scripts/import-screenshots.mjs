#!/usr/bin/env node
/**
 * scripts/import-screenshots.mjs
 *
 * Imports a folder of raw screenshot captures (PNG/JPG) into web-optimised
 * assets under public/screenshots/<device>/<slug>.{webp,jpg} and merges
 * metadata into src/data/screenshots.json, which src/data/screenshots.ts
 * reads at build time. This replaces hard-coded
 * `import x from '@/images/screenshots/...'` statements in pages — pages
 * should read from the manifest instead (see src/data/screenshots.ts).
 *
 * Usage:
 *   node scripts/import-screenshots.mjs <input-dir> [--replace] [--device iphone] [--locale en-US]
 *
 *   <input-dir>   Directory of PNG/JPG files, flat or nested:
 *                   <dir>/<name>.png
 *                   <dir>/<device>/<name>.png
 *                   <dir>/<locale>/<device>/<name>.png
 *   --replace     Drop all existing manifest items for the devices present
 *                 in this input before writing the new ones (default: only
 *                 the same ids are updated, everything else is kept).
 *   --device      Force a device for every file in this run (skips
 *                 inference; files that don't match are still skipped).
 *   --locale      Force a locale for every file in this run (default en-US,
 *                 or the <locale> path segment when the input is nested
 *                 three deep).
 *
 * Device inference (first match wins):
 *   1. The immediate parent directory name, if it is one of
 *      iphone|ipad|appletv|tvos|watch|mac ("tvos" normalises to "appletv").
 *   2. A filename prefix: iphone-, ipad-, tvos-, appletv-, watch-, mac-
 *      (with or without a trailing number, e.g. "iphone1-library.png").
 *   3. Pixel aspect ratio: portrait ~9:19.5 -> iphone, ~4:3 -> ipad,
 *      16:9 at >=1920px wide -> appletv, square-ish <=500px -> watch.
 *
 * Optional sidecar `<input-dir>/captions.json`, keyed by the *original*
 * filename without its extension (not the slug):
 *   {
 *     "iphone-library-theme": { "alt": "...", "caption": "...", "theme": "dark", "order": 2 }
 *   }
 * Missing alt text is derived by humanising the filename with the device
 * prefix stripped, e.g. "iphone-library-theme" -> "Library, theme". Missing
 * order falls back to alphabetical filename order within the device.
 *
 * Output images are resized (no upscaling) so the long edge is at most
 * 1600px (1920px for appletv): a .webp at quality 82 for the site, and a
 * .jpg at quality 85 for the AltStore/SideStore feed, which wants plain
 * image URLs rather than next/image-only formats.
 */

import { readdirSync, statSync, mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve, extname, basename, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import os from 'node:os';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const OUT_DIR = join(REPO_ROOT, 'public', 'screenshots');
const DATA_FILE = join(REPO_ROOT, 'src', 'data', 'screenshots.json');

const DEVICES = ['iphone', 'ipad', 'appletv', 'watch', 'mac'];
const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg']);

function parseArgs(argv) {
  const args = { input: null, replace: false, device: null, locale: null };
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--replace') args.replace = true;
    else if (a === '--device') args.device = argv[++i];
    else if (a === '--locale') args.locale = argv[++i];
    else rest.push(a);
  }
  args.input = rest[0];
  return args;
}

function kebab(s) {
  return s
    .replace(/[_\s]+/g, '-')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function normaliseDevice(d) {
  const dl = String(d).toLowerCase();
  return dl === 'tvos' ? 'appletv' : dl;
}

function deviceFromPrefix(filename) {
  const n = filename.toLowerCase();
  const candidates = ['iphone', 'ipad', 'appletv', 'tvos', 'watch', 'mac'];
  for (const dev of candidates) {
    if (new RegExp(`^${dev}\\d*-`).test(n)) return normaliseDevice(dev);
  }
  return null;
}

function deviceFromAspect(width, height) {
  if (!width || !height) return null;
  if (height > width) {
    const r = height / width;
    if (Math.abs(r - 19.5 / 9) < 0.6) return 'iphone';
    if (Math.abs(r - 4 / 3) < 0.2) return 'ipad';
  } else {
    const r = width / height;
    if (Math.abs(r - 4 / 3) < 0.2) return 'ipad';
    if (r >= 16 / 9 - 0.2 && width >= 1920) return 'appletv';
  }
  if (width <= 500 && height <= 500) return 'watch';
  return null;
}

function stripDevicePrefix(fileBase) {
  return fileBase.replace(/^(iphone|ipad|appletv|tvos|watch|mac)\d*-/i, '');
}

function humaniseAlt(slug) {
  const words = slug.split('-').filter(Boolean);
  if (words.length === 0) return '';
  const first = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  const rest = words.slice(1).join(' ');
  return rest ? `${first}, ${rest}` : first;
}

function sourcePathFor(full) {
  const home = os.homedir();
  if (full.startsWith(home)) return '~' + full.slice(home.length);
  return relative(REPO_ROOT, full);
}

function collectFiles(inputDir) {
  const results = [];
  function walk(dir, segments) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === 'captions.json') continue;
      if (entry.name.startsWith('.')) continue;
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full, [...segments, entry.name]);
      } else if (IMAGE_EXT.has(extname(entry.name).toLowerCase())) {
        results.push({ full, segments });
      }
    }
  }
  walk(inputDir, []);
  return results;
}

function loadCaptions(inputDir) {
  const p = join(inputDir, 'captions.json');
  if (!existsSync(p)) return {};
  try {
    return JSON.parse(readFileSync(p, 'utf8'));
  } catch (err) {
    console.error(`Could not parse ${p}: ${err.message}`);
    return {};
  }
}

function loadManifest() {
  if (existsSync(DATA_FILE)) {
    try {
      return JSON.parse(readFileSync(DATA_FILE, 'utf8'));
    } catch {
      return { items: [] };
    }
  }
  return { items: [] };
}

async function processFile({ full, segments }, args, captions) {
  const ext = extname(full).toLowerCase();
  const fileBase = basename(full, extname(full));

  let device = null;
  let locale = null;

  if (segments.length >= 2) {
    const maybeDevice = normaliseDevice(segments[segments.length - 1]);
    if (DEVICES.includes(maybeDevice)) {
      device = maybeDevice;
      locale = segments[segments.length - 2];
    }
  } else if (segments.length === 1) {
    const maybeDevice = normaliseDevice(segments[0]);
    if (DEVICES.includes(maybeDevice)) device = maybeDevice;
  }

  if (!device) device = deviceFromPrefix(fileBase + ext);
  if (!device) device = deviceFromPrefix(fileBase);

  let meta = null;
  if (!device) {
    meta = await sharp(full).metadata();
    device = deviceFromAspect(meta.width, meta.height);
  }

  if (!device) {
    console.error(`SKIP (cannot infer device): ${full}`);
    return null;
  }

  if (args.device && normaliseDevice(args.device) !== device) return null;

  locale = args.locale || locale || 'en-US';

  const slug = kebab(stripDevicePrefix(fileBase)) || kebab(fileBase);
  const id = `${device}/${slug}`;

  const caption = captions[fileBase] || {};
  const alt = caption.alt || humaniseAlt(slug);
  const theme = caption.theme;
  const order = typeof caption.order === 'number' ? caption.order : null;

  const maxEdge = device === 'appletv' ? 1920 : 1600;
  meta = meta || (await sharp(full).metadata());
  const longEdge = Math.max(meta.width, meta.height);
  const needsResize = longEdge > maxEdge;
  const resizeOpts = meta.width >= meta.height ? { width: Math.min(meta.width, maxEdge) } : { height: Math.min(meta.height, maxEdge) };

  let pipeline = sharp(full).rotate();
  if (needsResize) pipeline = pipeline.resize({ ...resizeOpts, withoutEnlargement: true });

  const outDir = join(OUT_DIR, device);
  mkdirSync(outDir, { recursive: true });
  const webpPath = join(outDir, `${slug}.webp`);
  const jpgPath = join(outDir, `${slug}.jpg`);

  const webpBuffer = await pipeline.clone().webp({ quality: 82 }).toBuffer();
  const jpgBuffer = await pipeline.clone().flatten({ background: '#000000' }).jpeg({ quality: 85 }).toBuffer();

  writeFileSync(webpPath, webpBuffer);
  writeFileSync(jpgPath, jpgBuffer);

  const outMeta = await sharp(webpBuffer).metadata();
  const stat = statSync(full);

  return {
    id,
    device,
    locale,
    slug,
    alt,
    caption: caption.caption || undefined,
    theme: theme || undefined,
    order,
    width: outMeta.width,
    height: outMeta.height,
    webp: `/screenshots/${device}/${slug}.webp`,
    jpg: `/screenshots/${device}/${slug}.jpg`,
    capturedAt: stat.mtime.toISOString(),
    source: sourcePathFor(full),
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.input) {
    console.error('Usage: node scripts/import-screenshots.mjs <input-dir> [--replace] [--device iphone] [--locale en-US]');
    process.exit(1);
  }

  const inputDir = resolve(process.cwd(), args.input);
  if (!existsSync(inputDir) || !statSync(inputDir).isDirectory()) {
    console.error(`Not a directory: ${inputDir}`);
    process.exit(1);
  }

  const captions = loadCaptions(inputDir);
  const files = collectFiles(inputDir);
  if (files.length === 0) {
    console.error(`No PNG/JPG files found in ${inputDir}`);
    process.exit(1);
  }

  const newItems = [];
  let failed = 0;
  for (const f of files.sort((a, b) => a.full.localeCompare(b.full))) {
    try {
      const item = await processFile(f, args, captions);
      if (item) newItems.push(item);
    } catch (err) {
      failed++;
      console.error(`FAILED: ${f.full}: ${err.message}`);
    }
  }

  // Assign default order (alphabetical by slug within device) where missing.
  const nextOrderByDevice = {};
  for (const item of [...newItems].sort((a, b) => a.slug.localeCompare(b.slug))) {
    if (item.order === null) {
      nextOrderByDevice[item.device] = (nextOrderByDevice[item.device] || 0) + 1;
      item.order = nextOrderByDevice[item.device];
    }
  }

  const manifest = loadManifest();
  let items = manifest.items || [];

  if (args.replace) {
    const devicesInInput = new Set(newItems.map((i) => i.device));
    items = items.filter((i) => !devicesInInput.has(i.device));
  }

  const byId = new Map(items.map((i) => [i.id, i]));
  for (const item of newItems) byId.set(item.id, item);
  items = Array.from(byId.values());

  mkdirSync(dirname(DATA_FILE), { recursive: true });
  writeFileSync(DATA_FILE, JSON.stringify({ generatedAt: new Date().toISOString(), items }, null, 2) + '\n');

  console.table(
    newItems.map((i) => ({ id: i.id, order: i.order, size: `${i.width}x${i.height}`, webp: i.webp }))
  );
  console.log(`Wrote ${newItems.length} item(s) to ${relative(REPO_ROOT, DATA_FILE)} (${items.length} total in manifest).`);

  if (failed > 0) process.exit(1);
}

main();
