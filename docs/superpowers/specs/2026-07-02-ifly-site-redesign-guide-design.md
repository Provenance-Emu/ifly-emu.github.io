# iFly Website Redesign + Guide — Design

**Date:** 2026-07-02
**Status:** Approved (design), pending implementation plan
**Author:** Joe Mattiello (with Claude)

## Goal

Prepare the iFly marketing site for its first App Store release. Two tracks:

1. **Content** — a new multi-page `/guide` section covering how to import games, what
   formats are supported, BIOS setup, arcade/Naomi rip handling, systems/compatibility,
   and a troubleshooting FAQ. This is the highest priority.
2. **Restyle** — port the visual language of the recently-redesigned
   `provenance-emu.com` (Hugo site) into the iFly Next.js site, keeping iFly's orange
   brand. Build a small design-system layer so all existing pages and the new guide share
   one look.

## Non-goals (deferred)

- Dark/light theme toggle (site stays dark-only for now).
- Blog / news section, press kit, subscription/comparison tables.
- No stack change. Provenance-emu is Hugo; we port its *look*, not its tooling.

## Stack (unchanged)

Next.js 16 App Router · React 19 · Tailwind v4 (PostCSS) · `output: 'export'` static ·
GitHub Pages. `trailingSlash: true`, `images: { unoptimized: true }`. API routes stay
`force-static`.

## Copy constraints

All public-facing prose follows `~/Workspace/personal-os/VOICE.md`:

- Backticks around every identifier — file extensions (`` `.chd` ``), filenames
  (`` `naomi.zip` ``), paths (`` `BIOS/` ``), URL schemes (`` `ifly://` ``).
- Specific numbers, always (`1440p`, `4K`, `1K+ shaders`, `iPhone 16 Pro Max`).
- No marketing speak, no closing-callback summary paragraphs. End on the last fact.
- Banned phrases + soft-avoid vocabulary from VOICE.md apply. Em-dash cap 2/1000 words.
- Honest about scope limits (e.g. iCloud sync covers saves/VMUs/BIOS but **not** ROMs;
  DCNet is "what Flycast supports").

---

## Design System

### Tokens (orange adaptation of the provenance retrowave system)

Defined in `src/app/globals.css` via Tailwind v4 `@theme` + a few custom properties and
keyframes.

- **Primary gradient:** `linear-gradient(135deg, #ffab40 0%, #ff6900 50%, #d64500 100%)`
  (amber → orange → deep). Used for gradient text ("i**Fly**"), pill buttons, icon boxes.
- **Backgrounds:** layered near-black. Base `#0a0a0f`; alternating sections
  `#0d0d14` / `#111119`. (Shift off the current flat `gray-950` so orange pops.)
- **Grid overlay:** drifting grid in `rgba(255,105,0,0.08)`, `background-size: 40px 40px`,
  `prov-grid-drift`-style keyframe, ~22s linear loop. Hero-only.
- **Radial glow:** orange (`bg-orange-500/10 blur-3xl`) — already present in the hero, keep.
- **Cards (glass):** `bg-white/[0.04]`, `border-white/[0.08]`, `--radius: 12px`,
  hover-lift (`translateY(-6px)`) + shadow escalation.
- **Icon boxes:** 64–70px, `border-radius: 16px`, tinted orange gradient background that
  fills to solid primary gradient on hover (icon → white).
- **Typography:** fluid `clamp()` headings (`h1: clamp(2rem, 5vw, 3.5rem)`), tight
  letter-spacing (`-0.02em`), system font stack (already in place), body line-height 1.7.
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` as a token; shadows `sm/md/lg`.

### Reusable components (`src/components/ui/`)

Each has one clear purpose and a small prop surface:

| Component | Purpose |
|-----------|---------|
| `GridHero` | Full-bleed hero: animated grid overlay + radial glow + slotted content. |
| `PageHeader` | Interior-page hero-lite: title + subtitle + subtle grid, no CTAs. |
| `Section` | Vertical rhythm wrapper; optional alternating background + `container`. |
| `Card` / `FeatureCard` | Glass card, hover-lift; `FeatureCard` adds gradient icon box + title + copy. |
| `GradientButton` | Orange gradient pill w/ hover overlay + lift. Refactor `ButtonLink` to use it. |
| `Accordion` + `AccordionItem` | Client component; collapsible Q&A (chevron rotates). Used by FAQ. |
| `Callout` | Tip / warning / note box (e.g. "Prefer CHD or CDI over GDI"). Variants: `tip`, `warn`, `info`. |
| `Badge` / `Pill` | Small rounded labels (platform badges, "Required" / "Optional" BIOS tags). |
| `Screenshot` | Placeholder-aware image slot (caption + aspect box) so Joe can drop real images later. |

`Navigation` and `Footer` get restyled (glassmorphism nav: `backdrop-blur`, `bg-*/80`,
border) but stay in `src/components/`.

### Screenshot placeholders

`Screenshot` renders a labeled placeholder box (dimensions + caption) when no `src` is
provided, and a real optimized image when it is. Every feature/guide section that wants a
visual gets one now, so Joe can supply images without markup changes. Placeholder files
live under `public/placeholders/` or are drawn via CSS; real images go in
`src/images/...` following the existing WebP convention.

---

## Features (content)

Grouped for the `/features` page (full) and the homepage (curated highlights). Every group
gets a `Screenshot` slot. Copy uses VOICE.md rules — numbers + backticks, no fluff.

**Performance & graphics**
- Custom Metal backend.
- Custom Apple-silicon CPU performance work → JIT-less full-speed emulation. Upscaling to
  `1440p` or `4K` (e.g. iPhone 16 Pro Max).
- `1K+` Metal shaders.
- HDR "upscaling" support.
- Custom texture-pack support (like Flycast) with a management UI.
- ProMotion high-refresh support + original-refresh-rate locking.

**VMU tooling (differentiators)**
- Floating VMU window.
- VMU Watch companion — live viewer on Apple Watch.
- Custom Swift-native VMU file manager — per-game or per-VMU backup and restore.

**Saves & sync**
- iCloud sync of saves, VMUs, BIOS, etc. — **not** ROMs.
- Auto timed saves — custom off-main-thread save-state serialization so emulation does not
  stall (upstream Flycast serializes on the main thread).
- HLE and native BIOS support.

**Input & controls**
- External controller haptics.
- Jump Pack rumble → device haptics or external controller rumble (DualShock, DualSense,
  Xbox).
- Touch light-gun support.
- On-screen touch keyboard/mouse + native Bluetooth keyboard/mouse & Smart Keyboard
  (where the OS supports it).
- Native CoreAudio microphone input.
- Customizable, movable on-screen controls.
- Remappable external controller buttons with presets.
- DeltaSkin / ManicSkin controller-skin support.

**Connectivity & display**
- External display support (iOS / iPadOS).
- DCNet network and LAN support (what Flycast supports).

**Games & content**
- In-app cheat-code database.
- RetroAchievements support.
- Online game-metadata lookup.
- Per-game options tuning.

**Import** (also detailed in `/guide/importing`)
- WebDAV, HTTP, or Files.app import; drag-and-drop on iPad.

**Platform & convenience**
- iOS / iPadOS / tvOS.
- Quick-launch recent-games Springboard widget.

---

## `/guide` Section

Route group under `src/app/guide/`. Shared `layout.tsx` with sticky sub-nav (sidebar on
desktop, horizontal scroller on mobile) + prev/next links. Each page is a server component
exporting `metadata` (title, description, `alternates.canonical`); interactive bits (FAQ
accordion) are client children. All pages get added to `sitemap.ts`.

### Pages

1. **`/guide` (index)** — overview + cards linking to each sub-page; quick "first import in
   3 steps" summary.

2. **`/guide/importing` — Importing Games**
   - Methods: Files app / document picker; drag-and-drop (iPad, iOS 15+); Wi-Fi WebDAV
     upload with QR (iOS/tvOS/macOS); `` `ifly://` `` URL scheme.
   - Where files land: `` `ROMs/` ``, `` `BIOS/` ``, `` `Skins/` `` (Documents or Caches).
   - Extraction behavior: disc archives (`` `.zip` ``/`` `.7z` `` containing `` `.gdi` ``/`` `.cue` ``)
     are extracted; arcade romsets copied as-is; all-or-nothing rollback.

3. **`/guide/formats` — Supported Formats**
   - Full table:
     - Standalone: `` `.iso` ``, `` `.cdi` ``, `` `.chd` ``.
     - Index-based: `` `.gdi` `` (→ `` `.bin` ``/`` `.raw` ``/`` `.img` ``), `` `.cue` `` (→ `` `.bin` ``).
     - Payload/tracks: `` `.bin` ``, `` `.raw` ``, `` `.img` ``, `` `.dat` ``, `` `.lst` ``.
     - Playlist: `` `.m3u` `` (multi-disc).
     - Homebrew: `` `.elf` ``.
     - Archives: `` `.zip` ``, `` `.7z` ``.
     - Skins: `` `.deltaskin` ``, `` `.manicskin` ``, `` `.skin` ``, `` `.emuskin` ``.
   - `Callout` (tip): prefer `` `.chd` `` or `` `.cdi` `` over `` `.gdi` `` — single file,
     nothing to lose from missing tracks; `` `.chd` `` is compressed (700 MB → ~300 MB).

4. **`/guide/bios` — BIOS Setup**
   - Headline: **Dreamcast needs no BIOS.** Almost every game runs on the built-in HLE
     BIOS (Reios). `` `dc_boot.bin` `` + `` `dc_flash.bin` `` are optional (boot animation /
     full accuracy).
   - Required for arcade: `` `naomi.zip` ``, `` `naomi2.zip` ``, `` `awbios.zip` ``,
     `` `segasp.zip` `` (MAME romsets; basename must match exactly).
   - Optional game-specific: `` `hod2bios.zip` ``, `` `f355bios.zip` ``, `` `f355dlx.zip` ``,
     `` `airlbios.zip` ``.
   - Location: `` `BIOS/` `` folder; case-normalized to lowercase.
   - `Badge` tags: Required / Optional per row.

5. **`/guide/arcade` — Arcade & Naomi Rips** (the "weird formats" page; iFly's edge over
   stock Flycast)
   - Single decrypted `` `.bin` `` carts (archive.org style: `VirtuaFighter4.zip` →
     `VirtuaFighter4.bin`, no `` `.ic*` `` chips) — iFly routes to the decrypted-ROM path
     and auto-selects BIOS from the board header. Upstream Flycast fails these.
   - Multi-track GD-ROM dumps (`` `.cue` `` + multiple `` `.bin` ``) — detected + extracted;
     all tracks verified present.
   - Naomi **GD-cartridge zip+CHD companion** layout: `` `senkosp.zip` `` +
     `` `senkosp/gdl-0030a.chd` `` — iFly carries the sibling CHD alongside the cart zip and
     warns if it is missing.
   - MAME chip-set zips (`` `.ic*` ``) — copied as-is, opened by the MAME loader.

6. **`/guide/systems` — Systems / Compatibility**
   - Cards/table: Dreamcast, Naomi, Naomi 2, Atomiswave, System SP, plus game-specific
     boards (House of the Dead 2, Ferrari F355, Airline Pilots). BIOS requirement + notes
     per system.

7. **`/guide/faq` — FAQ / Troubleshooting** (uses `Accordion`)
   - Game won't boot → missing BIOS (arcade) or missing track (`` `.gdi` ``/`` `.cue` ``).
   - Arcade rip fails → wrong archive shape; link to `/guide/arcade`.
   - Multi-disc games → `` `.m3u` `` grouping.
   - Save states / auto-saves / iCloud sync scope.
   - Controllers → link existing `/controllers` page.
   - Performance / upscaling tips.

## Navigation changes

Add **Guide** to the top nav, right after Downloads. Current items: Home, Downloads,
About, Features, Support, Links, Donate, Status. Guide becomes a prominent primary entry
(the `/guide` index links out to sub-pages via the guide layout's sub-nav). Nav restyled to
glassmorphism.

## Files to create / modify (indicative)

**Create**
- `src/components/ui/{GridHero,PageHeader,Section,Card,FeatureCard,GradientButton,Accordion,Callout,Badge,Screenshot}.tsx`
- `src/app/guide/layout.tsx`
- `src/app/guide/page.tsx`
- `src/app/guide/{importing,formats,bios,arcade,systems,faq}/page.tsx`
- `src/app/guide/faq/FaqAccordion.tsx` (client)

**Modify**
- `src/app/globals.css` (tokens, keyframes, utilities)
- `src/components/Navigation.tsx`, `src/components/Footer.tsx`
- `src/components/Features.tsx` (new grouped feature set)
- `src/app/page.tsx` + all existing pages (restyle onto new components)
- `src/app/sitemap.ts` (add guide routes)
- `src/components/ButtonLink.tsx` (delegate to `GradientButton`)

## Build sequence (for the plan)

1. Design-system layer: tokens/keyframes in `globals.css` + `ui/` components.
2. Restyle `Navigation` + `Footer`, add Guide nav item.
3. `/guide` layout + the 7 guide pages (content-first, VOICE.md copy).
4. Rewrite `Features.tsx` with the grouped feature set + homepage highlights.
5. Restyle remaining existing pages onto the new components.
6. Add guide routes to `sitemap.ts`; `npm run build` + `npm run type-check` + `npm run lint` clean.

## Verification

- `npm run type-check`, `npm run lint`, `npm run build` all pass (static export succeeds).
- Every new page exports `metadata` with canonical; guide routes appear in
  `out/sitemap.xml`.
- CSP unchanged and still valid (no new external origins introduced).
- Manual pass: nav highlights correct route; accordion opens/closes; placeholders render.
