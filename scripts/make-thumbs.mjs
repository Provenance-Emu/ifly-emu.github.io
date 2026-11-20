#!/usr/bin/env node
/**
 * Writes <slug>-thumb.webp (576px wide, 2x of the widest gallery card) next to
 * every full-size screenshot .webp wider than 576px. The home-page gallery
 * uses these so phones don't download 1200px captures for 256px cards.
 * Re-run after scripts/import-screenshots.mjs.
 */
import sharp from 'sharp';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const WIDTH = 576;
const root = new URL('../public/screenshots/', import.meta.url).pathname;

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (name.endsWith('.webp') && !name.endsWith('-thumb.webp')) yield p;
  }
}

for (const file of walk(root)) {
  const { width } = await sharp(file).metadata();
  if (!width || width <= WIDTH) continue;
  const out = file.replace(/\.webp$/, '-thumb.webp');
  await sharp(file).resize({ width: WIDTH }).webp({ quality: 80 }).toFile(out);
  console.log('wrote', out);
}
