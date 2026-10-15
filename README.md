# ifly-emu.github.io
Source for https://ifly-emu.com A Dreamcast Emulator for iOS and tvOS

## Screenshots

Site screenshots (homepage galleries, the AltStore/SideStore feed, and guide
pages like `/guide/arcade/`) are generated, not hand-imported. The source of
truth is `src/data/screenshots.json`, produced by
`scripts/import-screenshots.mjs`; pages read it through the typed helpers in
`src/data/screenshots.ts` (`screenshots(device)`, `screenshotById(id)`) —
there should be no `import x from '@/images/screenshots/...'` in page code.

Producer: raw captures come from the app-side harness in the iFly app repo,
`tools/screenshots/capture.py` (drives the simulator over the accessibility
tree and `GET /api/debug/screenshot`, so there's no screenshot-and-guess
loop). Point the importer at whatever folder that harness (or a manual
capture pass) drops PNGs/JPGs into:

```bash
node scripts/import-screenshots.mjs <input-dir> [--replace] [--device iphone] [--locale en-US]
```

The input directory can be flat or nested by device and/or locale
(`<dir>/<name>.png`, `<dir>/<device>/<name>.png`,
`<dir>/<locale>/<device>/<name>.png`); the device is inferred from the
directory name, a filename prefix (`iphone-`, `ipad-`, `tvos-`, `appletv-`,
`watch-`, `mac-`), or failing that the image's aspect ratio. An optional
`captions.json` sidecar in the input directory supplies alt text, captions,
theme, and display order per file — see the header comment in
`scripts/import-screenshots.mjs` for the exact contract.

The script writes optimised `.webp` (site) and `.jpg` (AltStore/SideStore
feed) assets to `public/screenshots/<device>/<slug>.{webp,jpg}` and
merges/updates `src/data/screenshots.json`. Raw capture folders (e.g.
`public/screenshots/2026-08/`) are gitignored — only the generated manifest
and optimised images are committed.

### Responsive image variants

`next/image` can't emit `srcset` under the static export (`images.unoptimized`),
so smaller WebP variants are generated and committed instead:
`public/screenshots/<device>/<slug>-<w>w.webp` plus `public/icon-{96,192,288}.webp`,
indexed by `src/data/image-variants.json`. `<ResponsiveImage>`
(`src/components/ui/ResponsiveImage.tsx`, used by `DeviceFrame`, `Screenshot` and
the home-page icon) reads that index and renders `srcset`/`sizes`.

`import-screenshots.mjs` runs this step itself, so a screenshot refresh needs
nothing extra. To (re)generate on its own: `npm run images` (or
`node scripts/make-image-variants.mjs --force` to rebuild everything). `npm run build` runs it first
via `prebuild`; `npm run images:check` exits non-zero if anything is stale.
Widths per device live at the top of `scripts/make-image-variants.mjs` and are
derived from each frame's rendered width in `DeviceFrame.tsx`. Commit the
generated files with the screenshots (CI runs `npx next build`, which skips
`prebuild`, so the committed variants are what ships).
