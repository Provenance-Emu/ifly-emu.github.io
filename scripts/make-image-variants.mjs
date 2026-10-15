#!/usr/bin/env node
/**
 * scripts/make-image-variants.mjs
 *
 * Generates smaller WebP variants of the site's screenshots and app icon, and
 * records them in src/data/image-variants.json. <ResponsiveImage> (and so
 * DeviceFrame / Screenshot) reads that manifest to emit srcset, so phones
 * download a ~1x/2x-sized file instead of the full 1600px capture.
 *
 * Why this exists: next.config.ts sets `images.unoptimized` (required for the
 * GitHub Pages static export), which makes next/image emit a bare `src` with no
 * srcset. Variants are therefore produced here and committed.
 *
 * Usage:
 *   node scripts/make-image-variants.mjs            # generate whatever is missing/stale
 *   node scripts/make-image-variants.mjs --force    # regenerate everything
 *   node scripts/make-image-variants.mjs --check    # exit 1 if anything is out of date (CI-friendly)
 *
 * Also runs automatically from `npm run build` (prebuild) and at the end of
 * scripts/import-screenshots.mjs, so a screenshot refresh needs no extra step.
 *
 * What is processed:
 *   public/screenshots/<device>/<slug>.webp  -> <slug>-<w>w.webp (widths per device below)
 *   public/icon-512.png                       -> icon-<w>.webp  (see ICONS)
 * Variants are only generated narrower than the source (never upscaled), and a
 * variant that would be >= 90% of the source's width is skipped as pointless.
 * The manifest records a hash of each source, so output only changes when the
 * source image (or the width list) changes, not on every run or machine.
 */

import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, writeFileSync, unlinkSync, mkdirSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = join(REPO_ROOT, 'public');
const MANIFEST = join(REPO_ROOT, 'src', 'data', 'image-variants.json');

// Widths are chosen from the content width each frame renders at in
// DeviceFrame.tsx (204 / 342 / 304 CSS px) times the common DPRs (1x, 1.75x,
// 2x, 3x), so the browser's pick is rarely more than a few percent oversized.
const SCREENSHOT_WIDTHS = {
  iphone: [240, 360, 480],
  ipad: [360, 640, 800, 1080],
  appletv: [320, 560, 640, 960],
};
const DEFAULT_WIDTHS = [320, 640, 960];

// The icon renders at 96 CSS px (96 / 192 / 288 = 1x / 2x / 3x).
const ICONS = [{ src: '/icon-512.png', widths: [96, 192, 288], name: (w) => `icon-${w}.webp` }];

const VARIANT_RE = /-\d+w\.webp$/;
const WEBP_QUALITY = 80;
const MIN_SAVING = 0.9;

const args = new Set(process.argv.slice(2));

function sha(buf) {
  return createHash('sha1').update(buf).digest('hex').slice(0, 12);
}

function loadManifest() {
  try {
    return JSON.parse(readFileSync(MANIFEST, 'utf8'));
  } catch {
    return {};
  }
}

function collectSources() {
  const sources = [];
  const shotsDir = join(PUBLIC_DIR, 'screenshots');
  if (existsSync(shotsDir)) {
    for (const device of readdirSync(shotsDir, { withFileTypes: true })) {
      if (!device.isDirectory()) continue;
      const dir = join(shotsDir, device.name);
      for (const file of readdirSync(dir).sort()) {
        if (!file.endsWith('.webp') || VARIANT_RE.test(file)) continue;
        sources.push({
          src: `/screenshots/${device.name}/${file}`,
          widths: SCREENSHOT_WIDTHS[device.name] ?? DEFAULT_WIDTHS,
          name: (w) => file.replace(/\.webp$/, `-${w}w.webp`),
        });
      }
    }
  }
  for (const icon of ICONS) sources.push(icon);
  return sources;
}

export async function generateVariants({ force = false, check = false, log = console.log } = {}) {
  const previous = loadManifest();
  const next = {};
  let changed = 0;
  const keep = new Set();

  for (const entry of collectSources()) {
    const file = join(PUBLIC_DIR, entry.src);
    if (!existsSync(file)) continue;
    const buf = readFileSync(file);
    const hash = sha(buf);
    const meta = await sharp(buf).metadata();
    const widths = entry.widths.filter((w) => w <= meta.width * MIN_SAVING);
    const dir = dirname(entry.src).replace(/\/$/, '');
    const variants = widths.map((w) => ({ w, src: `${dir}/${entry.name(w)}` }));
    const prev = previous[entry.src];
    const upToDate =
      !force &&
      prev &&
      prev.hash === hash &&
      JSON.stringify(prev.variants) === JSON.stringify(variants) &&
      variants.every((v) => existsSync(join(PUBLIC_DIR, v.src)));

    for (const v of variants) keep.add(v.src);
    next[entry.src] = { width: meta.width, height: meta.height, hash, variants };
    if (upToDate) continue;

    changed++;
    if (check) {
      log(`out of date: ${entry.src}`);
      continue;
    }
    for (const v of variants) {
      await sharp(buf).rotate().resize({ width: v.w }).webp({ quality: WEBP_QUALITY }).toFile(join(PUBLIC_DIR, v.src));
    }
    log(`variants: ${entry.src} -> ${variants.map((v) => `${v.w}w`).join(', ') || '(none, source is small)'}`);
  }

  // Remove variant files that no manifest entry references any more (a screenshot
  // was replaced under a new slug, or a width was dropped from the list).
  const stale = [];
  const shotsDir = join(PUBLIC_DIR, 'screenshots');
  if (existsSync(shotsDir)) {
    for (const device of readdirSync(shotsDir, { withFileTypes: true })) {
      if (!device.isDirectory()) continue;
      for (const file of readdirSync(join(shotsDir, device.name))) {
        const pub = `/screenshots/${device.name}/${file}`;
        if (VARIANT_RE.test(file) && !keep.has(pub)) stale.push(pub);
      }
    }
  }
  for (const ic of ICONS) {
    for (const w of [...ic.widths, 16, 32, 48, 64, 128, 256, 384]) {
      const pub = `/${ic.name(w)}`;
      if (existsSync(join(PUBLIC_DIR, pub)) && !keep.has(pub)) stale.push(pub);
    }
  }
  for (const pub of stale) {
    changed++;
    if (check) log(`stale: ${pub}`);
    else {
      unlinkSync(join(PUBLIC_DIR, pub));
      log(`removed stale: ${pub}`);
    }
  }

  const serialised = JSON.stringify(next, null, 2) + '\n';
  const manifestDiffers = !existsSync(MANIFEST) || readFileSync(MANIFEST, 'utf8') !== serialised;
  if (manifestDiffers) {
    if (check) log('manifest out of date: src/data/image-variants.json');
    else {
      mkdirSync(dirname(MANIFEST), { recursive: true });
      writeFileSync(MANIFEST, serialised);
    }
  }
  return { changed, manifestDiffers };
}

if (process.argv[1] && basename(process.argv[1]) === 'make-image-variants.mjs') {
  const { changed, manifestDiffers } = await generateVariants({ force: args.has('--force'), check: args.has('--check') });
  if (args.has('--check') && (changed > 0 || manifestDiffers)) {
    console.error('Image variants are out of date. Run: npm run images');
    process.exit(1);
  }
  if (changed === 0 && !manifestDiffers) console.log('Image variants up to date.');
}
