# Link Audit + Visual Refresh — Design

**Date:** 2026-08-13
**Status:** Approved

## Problem

1. `https://ifly-emu.com/testflight/` sends users to the wrong app's TestFlight beta. Reported by users, reproduced and confirmed.
2. The site's screenshots predate several shipped features (RetroAchievements, controller skins, accent theming, arcade/NAOMI support).
3. The visual design has drifted — the marketing pages read as functional rather than polished.

## Findings from the audit

All 38 external URLs in `src/` were checked by HTTP status, then the
identity-sensitive ones were content-checked (status codes cannot detect a
link that resolves fine but points at the wrong thing — which is exactly the
reported bug).

### Confirmed defect

`DEFAULT_TESTFLIGHT_URL` in `src/components/TestFlightGate.tsx:7` is
`https://testflight.apple.com/join/9ZEfnyMP`, which resolves to **iCube Emu**
(a GameCube/Wii emulator — a sibling project), not iFly.

The other two codes in the repo are correct but special-purpose:

| Location | Code | Resolves to | Purpose |
|---|---|---|---|
| `TestFlightGate.tsx:7` (default → `/testflight/`) | `9ZEfnyMP` | ❌ iCube Emu | **wrong** |
| `/testflight-patrons/` | `dpDcf8Ua` | iFly EMU | patron link, `skipGate` |
| `/secret/` | `9mbKzrZH` | iFly EMU beta | unlisted |

Correct public code, supplied by the owner and verified to resolve to
**iFly EMU**: `KTUTErgU`.

Neither `dpDcf8Ua` nor `9mbKzrZH` may be promoted to the public page —
`dpDcf8Ua` bypasses the follow gate, and `9mbKzrZH` is meant to stay
unlisted.

### Not defects (verified, no action)

- **Both Discord invites are intentional and correctly labelled.**
  `QF5ZjVT4Sa` → Provenance guild, `#ifly-general` (used site-wide).
  `X8YWP8w` → the upstream Flycast guild, labelled "Flycast Discord" on
  `/links/`. Resolved via the Discord invites API.
- **The 404/000 rows in the status scan are not links.** `html.itch.zone`,
  `v6p9d9t4.ssl.hwcdn.net`, `www.googletagmanager.com` and the wildcard
  `*.google-analytics.com` / `*.analytics.google.com` hosts appear only in
  the CSP `frame-src` / `connect-src` directives. A bare-root 404 on a CDN
  host is expected.
- Every other URL returns 2xx and points where its label claims.

### Cosmetic

`src/app/layout.tsx:66` cites `observatory.mozilla.org`, which moved to
`developer.mozilla.org/en-US/observatory`. It is inside a comment.

## Constraints discovered

These bind the implementation and were not evident from the request.

1. **Two independent screenshot paths.** Site pages import
   `src/images/screenshots/{ios,ipad,tvos}/*.webp` through `next/image`.
   The AltStore/SideStore feed hardcodes `public/screenshots/*.{jpg,png}`
   filenames at `src/lib/buildParser.ts:203-210`. htmlproofer cannot catch
   drift between them because the feed URLs never appear in HTML.

   **Design decision:** keep every `public/screenshots/` filename and
   extension byte-identical and replace only the image content. This leaves
   `buildParser.ts` untouched and removes the drift risk structurally
   rather than relying on both paths being edited together.

2. **`images: { unoptimized: true }`** (required for GitHub Pages). Nothing
   resizes at build time. The new source assets total ~55 MB against a
   current `public/screenshots` budget of 1.6 MB, so every asset is
   converted and resized before it lands in the repo.

3. **CI gates every push** at Lighthouse performance ≥ 0.70, accessibility
   ≥ 0.80, best-practices ≥ 0.80. `site-audit.yml` auto-opens an issue on
   failure. This is the binding constraint on the visual work.

4. **CSP is restrictive**: `worker-src 'none'`, and `script-src` has no
   `blob:`. Any Canvas UI effect that spawns a worker or a blob-URL script
   is blocked. The policy is not to be loosened — `script-src`'s existing
   `'unsafe-inline'` is load-bearing for hydration (see the comment at
   `layout.tsx:68-77`) and already costs Observatory points.

## Media assessment

29 new stills across two folders, classified by pixel dimensions.

**Excluded, with reasons:**

- `iFly-2026-08-06-212439 - Sturmwind (2013)(Duranik).mov` — the capture is
  **296×640** @ 59 fps. That is roughly thumbnail resolution; scaled to any
  useful size on the page it would look worse than the static screenshots
  beside it. `VideoShowcase` keeps its current content until a
  device-resolution recapture exists.
- `IMG_2433.png` — box art is deliberately pixelated.
- No tvOS captures in the batch, so `src/images/screenshots/tvos/*` is
  unchanged.

**Mapping** — sources are in `~/Workspace/Provenance/iFly/ifly screens/`
(`delilah/` = the `ifly delilah screenshots/` subfolder):

| Target | Source | Content |
|---|---|---|
| `ios/iphone1-library.webp` | `delilah/IMG_2430` | Library, orange accent (brand match) |
| `ios/iphone2-settings.webp` | `IMG_2495` | RetroAchievements settings — feature not currently shown anywhere |
| `ios/iphone3-emu.webp` | `IMG_2590` | Gameplay, Dreamsicle touch skin |
| `ios/iphone4-pause.webp` | `IMG_2522` | Pause menu with save-state thumbnails |
| `ios/iphone5-shaders.webp` | `IMG_2592` | Shader treatment |
| `ios/iphone6-themes.webp` | `delilah/IMG_2429` | Library, green accent — accent theming |
| `ios/iphone7-3d.webp` | `delilah/IMG_2425` | 3D gameplay |
| `ipad/ipad3-shaders.webp` | `IMG_1639` | iPad landscape, CRT shader |
| `ipad/ipad4-emu.webp` | `IMG_1637` | iPad landscape, touch controls |
| `ipad/ipad5-arcade.webp` | `Screenshot 2026-06-25…` | NAOMI arcade boot, perf HUD, arcade buttons |

`ipad1-library.webp` and `ipad2-search.webp` are unchanged — the batch has
no iPad library or search capture.

## Approach

Four stages, ordered so the user-facing bug is fixed first and the riskiest
work is last and revertible.

1. **Link fix** — one-line correction plus the stale comment reference.
2. **Media conversion** — resize and convert into both paths.
3. **Wire-up** — gallery updated to show the new material.
4. **Visual polish** — typography, spacing and hierarchy on home, downloads
   and testflight. Pure Tailwind, no dependency.
5. **Canvas UI accent** — one shader as the hero backdrop, behind
   `prefers-reduced-motion`, with a static fallback. Reverted if Lighthouse
   drops below gate.

Canvas UI (canvasui.dev, David Haz, shadcn-registry distribution) is real,
but its headline `html-in-canvas` capability is behind an experimental
Chrome flag and is **not** used. Only the WebGL shader effects are in
scope, and they are decoration, not layout. Most of "prettier" is stage 4,
not stage 5.

## Verification

The repo has no test suite. Verification for every stage is:

- `npm run lint`
- `npm run type-check`
- `npm run build` (static export must succeed)
- Asset budget: `public/screenshots` and `src/images/screenshots` byte
  totals reported per stage
- Stage 5 additionally: Lighthouse run confirming the gates still pass
