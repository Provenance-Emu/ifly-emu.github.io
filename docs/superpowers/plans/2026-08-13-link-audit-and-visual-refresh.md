# Link Audit + Visual Refresh — Implementation Plan

Spec: `docs/superpowers/specs/2026-08-13-link-audit-and-visual-refresh-design.md`
Branch: `feat/link-audit-visual-refresh`

## Context

Marketing site for iFly, a Dreamcast emulator. Next.js 15 App Router,
`output: 'export'` (fully static, deployed to GitHub Pages), Tailwind v4.
Brand colour `#ff6900`. Dark theme (`bg-ink` / `bg-gray-950`).

Source media lives outside the repo at
`/Users/jmattiello/Workspace/Provenance/iFly/ifly screens/`, with a
subfolder `ifly delilah screenshots/` (referred to below as `delilah/`).
That directory is a registered additional working directory and is readable.

## Global Constraints

These bind every task. A violation is a defect regardless of what an
individual task says.

- **Static export only.** No server-side features. API routes must keep
  `export const dynamic = 'force-static'`.
- **`images: { unoptimized: true }`.** Nothing is resized at build time.
  Every image committed must already be at its delivery size.
- **Do not modify the CSP** in `src/app/layout.tsx`. In particular
  `script-src`'s `'unsafe-inline'` is load-bearing for hydration and
  `worker-src 'none'` must stay. If a task appears to need a CSP change,
  stop and report rather than editing the policy.
- **`public/screenshots/` filenames are hardcoded into the AltStore/SideStore
  feed at `src/lib/buildParser.ts:203-210`.** Default to replacing image
  *content* only, so the two never drift.

  **Exception, owner-approved 2026-08-14 (Task 2b only):** the three
  gameplay PNGs move to `.jpg`, with `buildParser.ts` updated in the *same
  commit*. Rationale: the new captures hold 100–132K unique colours, so
  truecolor PNG costs 847/782/820 KB against 144/163/154 KB for JPEG q88 —
  a 5.7× saving on assets every AltStore client downloads. The drift risk
  the default guards against does not apply when both sides change together
  in one deliberate commit. No other task may edit `buildParser.ts`.
- **Verification for every task** (this repo has no test suite):
  `npm run type-check` and `npm run build` must both pass. Paste the actual
  command output into the report — not a summary of it.

  **`npm run lint` is broken on this repo and is NOT a gate.** It fails
  identically on `main` with `typescript-eslint does not support TS 7.0`
  (`package.json` pins `typescript: 7.0.2` against
  `eslint-config-next: 16.2.12`). Verified against a clean `main` checkout
  on 2026-08-13. Do not attempt to fix it, do not change the TypeScript or
  ESLint versions, and do not treat its failure as a task failure.
- **Voice:** any public-facing prose follows `~/Workspace/personal-os/VOICE.md`
  if that file is readable. Do not invent marketing claims; if a change
  would require a new factual claim about the app, keep the existing wording.
- Commit with a conventional-commit subject line.

## Task 1: Fix the TestFlight link and the stale Observatory reference

**Files:** `src/components/TestFlightGate.tsx`, `src/app/layout.tsx`

### Background

`https://ifly-emu.com/testflight/` currently sends users to the TestFlight
beta for **iCube Emu**, a different app (a GameCube/Wii emulator). This was
reported by users and reproduced. It is the highest-priority fix in this
plan.

### Requirements

1. In `src/components/TestFlightGate.tsx`, change `DEFAULT_TESTFLIGHT_URL`
   (line 7) from:

   `https://testflight.apple.com/join/9ZEfnyMP`

   to exactly:

   `https://testflight.apple.com/join/KTUTErgU`

   `KTUTErgU` has been verified by the project owner to resolve to
   **iFly EMU**. Use it verbatim.

2. Add a brief comment above that constant recording what it is and the
   trap: that `9ZEfnyMP` pointed at iCube Emu, and that the two other codes
   in this repo are deliberately *not* interchangeable with it —
   `dpDcf8Ua` (`/testflight-patrons/`) bypasses the follow gate and
   `9mbKzrZH` (`/secret/`) is unlisted. Keep it to a few lines.

3. **Do not change** the codes on `src/app/testflight-patrons/page.tsx`
   (`dpDcf8Ua`) or `src/app/secret/page.tsx` (`9mbKzrZH`). Both were
   verified correct.

4. In `src/app/layout.tsx`, the comment at line 66 references
   `https://observatory.mozilla.org/analyze/ifly-emu.com`. Mozilla moved
   Observatory. Update that URL in the comment to
   `https://developer.mozilla.org/en-US/observatory/analyze?host=ifly-emu.com`.
   This is a comment-only change — do not touch the `CSP` constant or any
   other part of that file.

### Out of scope

Every other external link in `src/` was audited and verified correct. Do
not "fix" any other URL. In particular the two different Discord invites
are both intentional: `QF5ZjVT4Sa` is the Provenance server and
`X8YWP8w` is the upstream Flycast server, correctly labelled as such on
`/links/`.

### Verification

- `grep -rn "9ZEfnyMP" src/` returns nothing.
- `grep -rn "KTUTErgU" src/` returns exactly one hit, in `TestFlightGate.tsx`.
- `grep -rn "dpDcf8Ua\|9mbKzrZH" src/` still returns exactly one hit each.
- lint, type-check, build all pass.

## Task 2: Convert and install the new screenshot assets

**Files:** new `.webp` files under `src/images/screenshots/{ios,ipad}/`,
replaced image content under `public/screenshots/`

### Background

The current screenshots predate several shipped features. The owner
supplied 29 new captures. This task only produces and installs the image
files — wiring them into pages is Task 3.

Available tooling on this machine: `magick` (ImageMagick), `cwebp`, `sips`,
`ffmpeg`.

### Source directory

`/Users/jmattiello/Workspace/Provenance/iFly/ifly screens/`
with subfolder `ifly delilah screenshots/` (written `delilah/` below).

Note: `Screenshot 2026-06-25 at 12.10.47 pm.png` contains a **narrow
no-break space (U+202F)** before `pm`, not a normal space. Glob for
`Screenshot*` rather than typing the name.

### Requirements

**A. Site assets** — write these as WebP into `src/images/screenshots/`.
Portrait sources are 1320×2868; resize to **828 px wide**. Landscape
sources; resize to **1400 px wide**. Quality 80. Preserve aspect ratio.

| Target path | Source file |
|---|---|
| `ios/iphone1-library.webp` | `delilah/IMG_2430.png` |
| `ios/iphone2-settings.webp` | `IMG_2495.jpg` |
| `ios/iphone3-emu.webp` | `IMG_2590.png` |
| `ios/iphone4-pause.webp` | `IMG_2522.png` |
| `ios/iphone5-shaders.webp` | `IMG_2592.png` |
| `ios/iphone6-themes.webp` | `delilah/IMG_2429.png` |
| `ios/iphone7-3d.webp` | `delilah/IMG_2425.png` |
| `ipad/ipad3-shaders.webp` | `IMG_1639.png` |
| `ipad/ipad4-emu.webp` | `IMG_1637.png` |
| `ipad/ipad5-arcade.webp` | `Screenshot 2026-06-25…png` (glob `Screenshot*`) |

`iphone1`, `iphone2`, `iphone3`, `ipad3`, `ipad4` already exist and are
overwritten. `iphone4`–`iphone7` and `ipad5` are new.

Leave `ipad/ipad1-library.webp`, `ipad/ipad2-search.webp` and everything
under `tvos/` **untouched** — the batch contains no iPad library, iPad
search, or tvOS captures.

**B. Feed assets** — replace the *content* of these existing files in
`public/screenshots/`, keeping each filename and extension exactly as it
is (they are hardcoded in the feed). Resize to **828 px wide**, quality 82.

| Target (keep name + extension) | Source file |
|---|---|
| `iphone1-library.jpg` | `delilah/IMG_2430.png` |
| `iphone3-emu.png` | `IMG_2590.png` |
| `iphone4-shaders.png` | `IMG_2592.png` |
| `iphone5-emu_shader.png` | `IMG_2593.png` |
| `iphone7-touchcontrols.jpg` | `delilah/IMG_2422.png` |
| `iphone8-pause.jpg` | `IMG_2522.png` |

Leave `iphone2-search.jpg` and `iphone9-cheats.png` alone — the batch has
no replacement for either.

**C. Do not add** the `.mov` file, `IMG_2433.png`, or `IMG_8949.HEIC` to
the repo. The video is only 296×640 and the owner has held it back until a
higher-resolution recapture exists; `IMG_2433` has pixelated box art.

### Constraints

- **Site assets (`src/images/screenshots/`) must be under 250 KB each.**
  These are rendered by pages and count against the Lighthouse perf gate.
  If an output exceeds it, lower WebP quality in steps of 5 (floor: 60)
  until it fits, and report the final quality used per file.

- **Feed assets (`public/screenshots/`) have no size ceiling and must NOT
  be palette-quantized.** Corrected 2026-08-13 after the ceiling was found
  to be wrong for these files: they are referenced *only* from the
  AltStore/SideStore JSON feed (`buildParser.ts:203-210`) and never appear
  in any HTML page, so they carry no Lighthouse cost. The pre-existing
  baseline on `main` already shipped these at 195 KB, 299 KB, 314 KB and
  354 KB. Encode them at full colour depth — visible banding on gameplay
  gradients is a worse outcome than a 300 KB file. Keep them roughly at or
  below the ~350 KB the repo already shipped.
- Report the total byte size of `public/screenshots/` and
  `src/images/screenshots/` before and after.

### Verification

- Every target file listed above exists, is a valid image, and has the
  expected pixel width (`sips -g pixelWidth -g pixelHeight`).
- No file under `public/screenshots/` was renamed, added, or deleted —
  `git status --porcelain public/screenshots/` shows only `M` entries.
- lint, type-check, build all pass.

## Task 3: Wire the new screenshots into the site

**Files:** `src/app/page.tsx`, and `src/app/guide/arcade/page.tsx`

### Background

Task 2 installed new image files. The home page gallery still imports only
the old subset, so the new material is invisible. `src/app/page.tsx`
renders three galleries — iPhone, iPad, Apple TV — each an array of
`[importedImage, altText]` tuples mapped over a `DeviceFrame` component
(`type="iphone" | "ipad" | "appletv"`). See lines ~140-185.

### Requirements

1. In `src/app/page.tsx`, extend the **iPhone** gallery to include the new
   captures. Import and add, with descriptive alt text following the
   existing convention (`'iFly iPhone – game library'`):

   - `ios/iphone4-pause.webp` — pause menu and save states
   - `ios/iphone5-shaders.webp` — shader treatment
   - `ios/iphone6-themes.webp` — accent theming
   - `ios/iphone7-3d.webp` — 3D gameplay

   Keep `priority` on the first frame only, as it is today.

2. In `src/app/page.tsx`, add `ipad/ipad5-arcade.webp` to the **iPad**
   gallery with alt text describing NAOMI arcade support.

3. `src/app/guide/arcade/page.tsx` currently has no imagery. Add the
   `ipad5-arcade.webp` screenshot to that page using `next/image`,
   following whatever image pattern already exists elsewhere in
   `src/app/guide/`. If no such pattern exists, use `next/image` with an
   explicit `alt`, `sizes`, and rounded/ring styling consistent with
   `card-glass` usage on that page. Caption it as the NAOMI arcade
   hardware running under iFly.

4. Alt text must describe the screenshot's content, not repeat the
   filename. Every image needs one — the accessibility gate is ≥ 0.80.

### Constraints

- Do not modify `DeviceFrame.tsx` or `VideoShowcase.tsx`.
- Do not touch the Apple TV gallery — those assets did not change.

### Verification

- lint, type-check, build all pass.
- `grep -c "DeviceFrame" src/app/page.tsx` reflects the added frames.
- Confirm `out/` contains the new webp files after build.

## Task 4: Visual polish pass — home, downloads, testflight

**Files:** `src/app/page.tsx`, `src/app/downloads/page.tsx`,
`src/components/TestFlightGate.tsx`, and `src/app/globals.css` if needed

### Background

The owner's ask was to "make the site prettier." This is the substance of
that — typography, spacing, and visual hierarchy — done in Tailwind with
no new dependency and no risk to the CI gates. A separate later task adds
one decorative canvas effect; that is not this task.

### Requirements

Make a focused design pass over the three pages above. Judgement is yours,
but it must be a *coherent* pass, not scattered tweaks. Concretely:

1. **Typographic rhythm.** The pages mix heading scales inconsistently
   (`text-6xl`/`text-7xl` hero against `text-2xl`/`text-3xl` section heads
   with varying weights and tracking). Establish one scale and apply it
   consistently across the three pages.
2. **Vertical spacing.** Section padding varies. Normalise it so sections
   breathe evenly.
3. **Hierarchy.** On each page the primary action should be
   unambiguously dominant; secondary actions should recede.
4. **The screenshot galleries** (now larger after Task 3) should read as a
   deliberate showcase rather than a wall of frames — consider spacing,
   grouping, or a scroll treatment.

### Constraints

- **Contrast:** all text must meet WCAG AA (4.5:1 for body, 3:1 for large
  text) against its background. The accessibility gate is ≥ 0.80 and this
  is the most likely way to break it. Check the greys actually used —
  `text-gray-400`/`text-gray-500` on `bg-gray-950` is the risk area.
- Keep the brand colour `#ff6900` as the primary accent. Do not introduce
  a new accent hue.
- Do not restructure page content, rewrite marketing copy, change routes,
  or alter metadata. This is visual only.
- Do not add any npm dependency.
- Preserve every existing `Link` / `href`. Task 1 audited them.
- Heading levels must stay semantically ordered (one `h1`, no skipped
  levels) — this is also an accessibility-gate item.

### Verification

- lint, type-check, build all pass.
- Report the contrast ratio for each text/background colour pair that was
  changed or introduced, with the computed number.

## Task 5: Canvas UI hero accent

**Files:** a new component under `src/components/`, plus `src/app/page.tsx`

### Background

Canvas UI (https://canvasui.dev/docs) is an open-source library of
canvas-drawn creative components by David Haz, distributed through a shadcn
registry — you receive source files in the project rather than an npm
dependency. The owner wants one effect used as an accent.

Its headline `html-in-canvas` capability is behind an experimental Chrome
flag and is **explicitly out of scope**. Only a WebGL/canvas shader
background is in scope.

This is the riskiest task in the plan and the most likely to be reverted.
Treat the gates below as hard requirements, not aspirations.

### Requirements

1. Read the Canvas UI docs at https://canvasui.dev/docs and choose **one**
   background/shader effect suitable as a subtle hero backdrop behind the
   existing `GridHero` content on `src/app/page.tsx`.

2. **Vet it against the CSP before integrating.** The site's policy has
   `worker-src 'none'` and no `blob:` in `script-src`. If the effect
   spawns a worker, creates a blob-URL script, or loads anything from a
   third-party origin, it is disqualified — pick a different effect. The
   CSP must not be modified. If no effect qualifies, report that as the
   outcome; that is a valid result, not a failure.

3. Vendor the source into `src/components/` (the shadcn-registry model).
   If it must come in as an npm dependency instead, stop and report before
   adding it.

4. **`prefers-reduced-motion: reduce` must render a static fallback** —
   the existing hero background, or a static gradient. No animation, and
   ideally no WebGL context created at all. This is a hard requirement.

5. The canvas is decorative: `aria-hidden="true"` and not focusable. It
   must never sit above interactive content in the stacking order.

6. It must degrade gracefully where WebGL is unavailable — no blank hero,
   no thrown error. The static export must render correctly with JS
   disabled.

### Gate — this task is only complete if the gates hold

After integrating, run Lighthouse against the built output and confirm:

- performance ≥ 0.70
- accessibility ≥ 0.80
- best-practices ≥ 0.80

(`.lighthouserc.yml` holds these thresholds; `site-audit.yml` runs them on
every push and auto-opens an issue on failure.)

**If any gate fails, revert the integration** and report the measured
scores. A reverted Task 5 with honest numbers is a successful outcome. Do
not lower the thresholds in `.lighthouserc.yml` — that file is not to be
edited by this task.

### Verification

- lint, type-check, build all pass.
- Report the three measured Lighthouse scores as numbers.
- Report how `prefers-reduced-motion` was handled and how it was checked.
- State plainly whether the effect shipped or was reverted.
