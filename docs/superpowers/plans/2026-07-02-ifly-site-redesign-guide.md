# iFly Website Redesign + Guide Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the iFly Next.js site with a provenance-emu-inspired retrowave design system (kept orange) and add a multi-page `/guide` section covering importing, formats, BIOS, arcade rips, systems, and FAQ — ready for the first App Store release.

**Architecture:** Add a token layer to `globals.css` (Tailwind v4 `@theme` + CSS custom properties + keyframes) and a small reusable component library under `src/components/ui/`. Restyle nav/footer/pages and build the `/guide` route group on top of those components. No stack change; static export stays intact.

**Tech Stack:** Next.js 16 App Router · React 19 · Tailwind v4 (PostCSS) · TypeScript · `output: 'export'` static export.

## Global Constraints

- **No test suite exists.** Verification per task = `npm run type-check` && `npm run lint` && `npm run build` all pass, plus a render check via `npm run dev`. There is no pytest/jest cycle.
- **Static export only:** `output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`. No server-only features. API routes stay `export const dynamic = 'force-static'`.
- **`'use client'` components cannot export `metadata`.** Interactive pieces (accordion) are client children imported by server pages.
- **Every page exports `metadata`** with `title`, `description`, and `alternates.canonical` (`https://ifly-emu.com/<path>/` with trailing slash).
- **Brand:** primary orange `#ff6900`. Primary gradient `linear-gradient(135deg, #ffab40 0%, #ff6900 50%, #d64500 100%)`. Layered near-black backgrounds `#0a0a0f` / `#0d0d14` / `#111119`.
- **Copy follows `~/Workspace/personal-os/VOICE.md`:** backticks around every identifier/extension/filename/path; specific numbers; no marketing speak; no closing-summary paragraphs; banned-phrase + soft-vocab lists apply; em-dash cap 2/1000 words. Homepage hero may read slightly more "marketing" (approved exception); guide/FAQ copy stays factual.
- **Path alias:** `@/*` → `./src/*`.
- **New routes** must be added to `src/app/sitemap.ts`.
- **CSP:** do not introduce new external origins (would require editing the CSP in `src/app/layout.tsx`). All new assets are same-origin.
- **Branch:** all work on `redesign/site-guide` (already created). Commit after each task.

---

## Facts reference (for content tasks — source-verified from the iFly repo)

**Supported extensions:**
- Standalone disc: `.iso`, `.cdi`, `.chd`
- Index-based: `.gdi` (→ `.bin`/`.raw`/`.img` tracks), `.cue` (→ `.bin`)
- Payload/tracks: `.bin`, `.raw`, `.img`, `.dat`, `.lst`
- Playlist: `.m3u` (multi-disc)
- Homebrew: `.elf`
- Archives: `.zip`, `.7z`
- Skins: `.deltaskin`, `.manicskin`, `.skin`, `.emuskin`

**Systems:** Dreamcast, Naomi, Naomi 2, Atomiswave, System SP ("Spider"), plus game-specific boards (House of the Dead 2, Ferrari F355, Airline Pilots).

**BIOS matrix:**
| System | File | Required? | Notes |
|--------|------|-----------|-------|
| Dreamcast | `dc_boot.bin` | Optional | Boot animation; HLE BIOS (Reios) used by default |
| Dreamcast | `dc_flash.bin` | Optional | Flash/NVRAM; pair with `dc_boot.bin` for full accuracy |
| Naomi | `naomi.zip` | Required | MAME romset; basename must match |
| Naomi 2 | `naomi2.zip` | Required | MAME romset |
| Atomiswave | `awbios.zip` | Required | MAME romset |
| System SP | `segasp.zip` | Required | MAME romset |
| House of the Dead 2 | `hod2bios.zip` | Optional | Game-specific board |
| Ferrari F355 | `f355bios.zip` / `f355dlx.zip` | Optional | Challenge / Deluxe |
| Airline Pilots | `airlbios.zip` | Optional | Also Sega Strike Fighter |

BIOS live in the `BIOS/` folder (case-normalized to lowercase). Storage: `ROMs/`, `BIOS/`, `Skins/`.

**Arcade rip handling (iFly's edge over stock Flycast):**
- Single decrypted `.bin`/`.dat` cart in an archive with **no** `.ic*` chip files (archive.org style, e.g. `VirtuaFighter4.zip` → `VirtuaFighter4.bin`) → iFly routes to the decrypted-ROM path; Flycast peeks the board header (`NAOMI`/`Naomi2`) to auto-select BIOS. Stock Flycast fails these.
- Multi-track GD-ROM dumps (`.cue` + multiple `.bin`) → detected as a disc, extracted, all tracks verified present.
- Naomi GD-cartridge zip+CHD companion: `senkosp.zip` + `senkosp/gdl-0030a.chd` → iFly carries the sibling CHD alongside the cart zip and warns if it is missing.
- MAME chip-set zips (contain `.ic*`) → copied as-is, opened by the MAME loader.

**Import methods:** Files app / document picker; drag-and-drop (iPad, iOS 15+); Wi-Fi WebDAV upload with QR (iOS/tvOS/macOS); `ifly://` URL scheme. Disc archives (`.zip`/`.7z` containing `.gdi`/`.cue`) are extracted; arcade romsets copied as-is; extraction is all-or-nothing with rollback.

**Format recommendation:** prefer `.chd` (compressed, ~700 MB → ~300 MB, single file) or `.cdi` (single file) over `.gdi` (multi-file, breaks if a track is missing).

**Feature list (grouped) — for Tasks 13/14:**
- *Performance & graphics:* custom Metal backend; custom Apple-silicon CPU work → JIT-less full-speed emulation, upscaling to `1440p`/`4K` (e.g. iPhone 16 Pro Max); `1K+` Metal shaders; HDR "upscaling"; custom texture-pack support with management UI; ProMotion high-refresh + original-rate locking.
- *VMU tooling:* floating VMU window; VMU Watch companion (live viewer on Apple Watch); custom Swift-native VMU file manager with per-game / per-VMU backup and restore.
- *Saves & sync:* iCloud sync of saves, VMUs, BIOS — **not** ROMs; auto timed saves via off-main-thread save-state serialization (no emulation stall); HLE and native BIOS support.
- *Input & controls:* external controller haptics; Jump Pack rumble → device haptics or controller rumble (DualShock, DualSense, Xbox); touch light-gun; on-screen touch keyboard/mouse + native Bluetooth keyboard/mouse & Smart Keyboard where the OS supports it; native CoreAudio microphone input; customizable movable on-screen controls; remappable controller buttons with presets; DeltaSkin / ManicSkin skins.
- *Connectivity & display:* external display support (iOS/iPadOS); DCNet network and LAN support (what Flycast supports).
- *Games & content:* in-app cheat-code database; RetroAchievements; online game-metadata lookup; per-game options tuning.
- *Import:* WebDAV, HTTP, or Files.app import; drag-and-drop on iPad.
- *Platform & convenience:* iOS / iPadOS / tvOS; quick-launch recent-games Springboard widget.

---

## File Structure

**Create**
- `src/components/ui/Section.tsx` — layout wrapper (container + vertical rhythm + optional bg tone).
- `src/components/ui/Card.tsx` — glass card + `FeatureCard` (icon box + title + copy).
- `src/components/ui/GradientButton.tsx` — orange gradient pill (Link or `<a>`).
- `src/components/ui/Badge.tsx` — `Badge` + `Pill` small labels.
- `src/components/ui/Callout.tsx` — tip/warn/info note box.
- `src/components/ui/Screenshot.tsx` — placeholder-aware image slot.
- `src/components/ui/GridHero.tsx` — full-bleed hero with animated grid + glow.
- `src/components/ui/PageHeader.tsx` — interior-page header (grid-lite, no CTAs).
- `src/components/ui/Accordion.tsx` — `'use client'` collapsible list.
- `src/app/guide/layout.tsx` — guide shell + sub-nav + prev/next.
- `src/app/guide/guideNav.ts` — shared ordered list of guide pages (data).
- `src/app/guide/page.tsx` — guide index.
- `src/app/guide/importing/page.tsx`
- `src/app/guide/formats/page.tsx`
- `src/app/guide/bios/page.tsx`
- `src/app/guide/arcade/page.tsx`
- `src/app/guide/systems/page.tsx`
- `src/app/guide/faq/page.tsx`
- `src/app/guide/faq/FaqAccordion.tsx` — `'use client'` FAQ data + Accordion usage.

**Modify**
- `src/app/globals.css` — tokens, keyframes, utilities.
- `src/components/Navigation.tsx` — glassmorphism + Guide item.
- `src/components/Footer.tsx` — add Guide links, retune tones.
- `src/components/Features.tsx` — new grouped feature set.
- `src/components/ButtonLink.tsx` — keep API, restyle to gradient (optional; GradientButton is the primary path).
- `src/app/page.tsx` — homepage restyle + highlights.
- Existing pages: `downloads`, `about`, `features`, `support`, `links`, `donate`, `status`, `controllers`, `privacy`, `licenses`, `testflight`, `testflight-patrons` — restyle onto new components.
- `src/app/sitemap.ts` — add 7 guide routes.

---

## Task 1: Design tokens, keyframes, and utilities

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: CSS utility classes `.text-gradient`, `.grid-overlay`, `.card-glass`, `.btn-gradient`, `.btn-gradient:hover`; CSS vars `--gradient-primary`, `--gradient-primary-hover`, `--ease-smooth`, `--radius-card`, `--shadow-sm/md/lg`; theme colors `--color-ink`, `--color-ink-2`, `--color-ink-3`; keyframe `grid-drift`.

- [ ] **Step 1: Replace `globals.css` with the token layer**

```css
@import "tailwindcss";

@theme inline {
  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  --font-mono: 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;

  /* Layered near-black backgrounds (exposes bg-ink / bg-ink-2 / bg-ink-3 utilities) */
  --color-ink: #0a0a0f;
  --color-ink-2: #0d0d14;
  --color-ink-3: #111119;
}

:root {
  --gradient-primary: linear-gradient(135deg, #ffab40 0%, #ff6900 50%, #d64500 100%);
  --gradient-primary-hover: linear-gradient(135deg, #ffbe5c 0%, #ff7d1f 50%, #f0530f 100%);
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --radius-card: 12px;
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.45);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.55);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.65);
}

body {
  background-color: var(--color-ink);
  color: #ededed;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

h1, h2 { letter-spacing: -0.02em; }

/* Gradient text (orange). Apply to a span/heading. */
.text-gradient {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Animated drifting grid overlay — absolute child of a relative hero. */
.grid-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255, 105, 0, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 105, 0, 0.08) 1px, transparent 1px);
  background-size: 40px 40px;
  animation: grid-drift 22s linear infinite;
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%);
  mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%);
}

@keyframes grid-drift {
  from { background-position: 0 0, 0 0; }
  to   { background-position: 40px 40px, 40px 40px; }
}

/* Glass card */
.card-glass {
  background-color: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-card);
  transition: transform 0.3s var(--ease-smooth), box-shadow 0.3s var(--ease-smooth), border-color 0.3s var(--ease-smooth);
}
.card-glass:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(255, 105, 0, 0.35);
}

/* Gradient pill button */
.btn-gradient {
  position: relative;
  background: var(--gradient-primary);
  color: #fff;
  border-radius: 9999px;
  transition: transform 0.3s var(--ease-smooth), box-shadow 0.3s var(--ease-smooth), filter 0.3s var(--ease-smooth);
  box-shadow: 0 6px 20px rgba(255, 105, 0, 0.25);
}
.btn-gradient:hover {
  transform: translateY(-2px);
  filter: brightness(1.08);
  box-shadow: 0 10px 28px rgba(255, 105, 0, 0.35);
}

@media (prefers-reduced-motion: reduce) {
  .grid-overlay { animation: none; }
  .card-glass:hover, .btn-gradient:hover { transform: none; }
}
```

- [ ] **Step 2: Verify build**

Run: `npm run type-check && npm run build`
Expected: build succeeds, static export to `out/`. (CSS-only change; no type impact.)

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(ui): add retrowave design tokens, keyframes, and utility classes"
```

---

## Task 2: Primitive UI components

**Files:**
- Create: `src/components/ui/Section.tsx`, `src/components/ui/Card.tsx`, `src/components/ui/GradientButton.tsx`, `src/components/ui/Badge.tsx`, `src/components/ui/Callout.tsx`, `src/components/ui/Screenshot.tsx`

**Interfaces:**
- Produces:
  - `Section({ children, className, tone, id }: { children: React.ReactNode; className?: string; tone?: 'ink' | 'ink-2' | 'ink-3'; id?: string })`
  - `Card({ children, className })`; `FeatureCard({ icon, title, children, className })` (named exports from `Card.tsx`; `Card` default)
  - `GradientButton({ href, children, external?, className?, variant? })` — `variant?: 'solid' | 'outline'` (default `'solid'`)
  - `Badge({ children, tone })` (`tone?: 'default' | 'required' | 'optional'`) + `Pill({ children })` from `Badge.tsx`
  - `Callout({ variant, title, children })` (`variant: 'tip' | 'warn' | 'info'`)
  - `Screenshot({ src?, alt, caption?, width, height, className? })`

- [ ] **Step 1: Create `src/components/ui/Section.tsx`**

```tsx
import React from 'react';

const toneClass = {
  ink: 'bg-ink',
  'ink-2': 'bg-ink-2',
  'ink-3': 'bg-ink-3',
} as const;

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  tone?: keyof typeof toneClass;
  id?: string;
};

export default function Section({ children, className = '', tone, id }: SectionProps) {
  return (
    <section id={id} className={`${tone ? toneClass[tone] : ''} py-16 ${className}`}>
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/components/ui/Card.tsx`**

```tsx
import React from 'react';

export default function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`card-glass p-6 ${className}`}>{children}</div>;
}

export function FeatureCard({
  icon,
  title,
  children,
  className = '',
}: {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`card-glass group flex flex-col gap-4 p-6 ${className}`}>
      {icon && (
        <div
          aria-hidden="true"
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/20 transition-colors duration-300 group-hover:bg-[image:var(--gradient-primary)] group-hover:text-white group-hover:ring-transparent"
        >
          {icon}
        </div>
      )}
      <div>
        <h3 className="mb-1.5 text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-400">{children}</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `src/components/ui/GradientButton.tsx`**

```tsx
import Link from 'next/link';
import React from 'react';

type GradientButtonProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
  variant?: 'solid' | 'outline';
};

const base = 'inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink';
const solid = 'btn-gradient';
const outline = 'rounded-full border border-orange-500/50 text-orange-300 hover:bg-orange-500/10 transition-colors';

export default function GradientButton({ href, children, external = false, className = '', variant = 'solid' }: GradientButtonProps) {
  const classes = `${base} ${variant === 'solid' ? solid : outline} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
```

- [ ] **Step 4: Create `src/components/ui/Badge.tsx`**

```tsx
import React from 'react';

const toneClass = {
  default: 'bg-gray-800 text-gray-300 border-gray-700',
  required: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
  optional: 'bg-gray-800 text-gray-400 border-gray-700',
} as const;

export function Badge({ children, tone = 'default' }: { children: React.ReactNode; tone?: keyof typeof toneClass }) {
  return (
    <span className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${toneClass[tone]}`}>
      {children}
    </span>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-gray-700 bg-gray-800 px-3 py-1 text-sm text-gray-300">
      {children}
    </span>
  );
}
```

- [ ] **Step 5: Create `src/components/ui/Callout.tsx`**

```tsx
import React from 'react';

const variantClass = {
  tip: 'border-orange-500/30 bg-orange-500/[0.06]',
  warn: 'border-amber-500/30 bg-amber-500/[0.06]',
  info: 'border-sky-500/30 bg-sky-500/[0.06]',
} as const;

const labelClass = {
  tip: 'text-orange-300',
  warn: 'text-amber-300',
  info: 'text-sky-300',
} as const;

export default function Callout({
  variant = 'info',
  title,
  children,
}: {
  variant?: keyof typeof variantClass;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`my-6 rounded-xl border p-4 ${variantClass[variant]}`}>
      {title && <p className={`mb-1 text-sm font-semibold ${labelClass[variant]}`}>{title}</p>}
      <div className="text-sm leading-relaxed text-gray-300">{children}</div>
    </div>
  );
}
```

- [ ] **Step 6: Create `src/components/ui/Screenshot.tsx`**

```tsx
import Image from 'next/image';
import React from 'react';

type ScreenshotProps = {
  src?: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  className?: string;
};

export default function Screenshot({ src, alt, caption, width, height, className = '' }: ScreenshotProps) {
  return (
    <figure className={className}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="rounded-xl border border-white/10 shadow-lg"
        />
      ) : (
        <div
          role="img"
          aria-label={`Placeholder: ${alt}`}
          style={{ aspectRatio: `${width} / ${height}` }}
          className="flex w-full flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-center"
        >
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">Screenshot</span>
          <span className="text-sm text-gray-400">{alt}</span>
          <span className="text-[11px] text-gray-600">{width}×{height}</span>
        </div>
      )}
      {caption && <figcaption className="mt-2 text-center text-xs text-gray-500">{caption}</figcaption>}
    </figure>
  );
}
```

- [ ] **Step 7: Verify**

Run: `npm run type-check && npm run lint && npm run build`
Expected: all pass. (Components unused so far; build still succeeds.)

- [ ] **Step 8: Commit**

```bash
git add src/components/ui/Section.tsx src/components/ui/Card.tsx src/components/ui/GradientButton.tsx src/components/ui/Badge.tsx src/components/ui/Callout.tsx src/components/ui/Screenshot.tsx
git commit -m "feat(ui): add Section, Card, GradientButton, Badge, Callout, Screenshot primitives"
```

---

## Task 3: Hero components

**Files:**
- Create: `src/components/ui/GridHero.tsx`, `src/components/ui/PageHeader.tsx`

**Interfaces:**
- Consumes: `.grid-overlay` (Task 1).
- Produces:
  - `GridHero({ children, className })` — relative section with grid overlay + orange radial glow; caller supplies centered content.
  - `PageHeader({ title, subtitle, eyebrow? })` — interior page header.

- [ ] **Step 1: Create `src/components/ui/GridHero.tsx`**

```tsx
import React from 'react';

export default function GridHero({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      <div className="grid-overlay" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute left-1/2 top-20 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-orange-600/5 blur-2xl" />
      </div>
      <div className="container relative mx-auto px-4">{children}</div>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/components/ui/PageHeader.tsx`**

```tsx
import React from 'react';
import GridHero from './GridHero';

export default function PageHeader({
  title,
  subtitle,
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  return (
    <GridHero className="pt-16 pb-10 text-center">
      <div className="mx-auto max-w-3xl">
        {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-orange-400">{eyebrow}</p>}
        <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-400">{subtitle}</p>}
      </div>
    </GridHero>
  );
}
```

- [ ] **Step 3: Verify + commit**

Run: `npm run type-check && npm run build`
Expected: pass.

```bash
git add src/components/ui/GridHero.tsx src/components/ui/PageHeader.tsx
git commit -m "feat(ui): add GridHero and PageHeader hero components"
```

---

## Task 4: Accordion (client)

**Files:**
- Create: `src/components/ui/Accordion.tsx`

**Interfaces:**
- Produces: `Accordion({ items }: { items: { q: string; a: React.ReactNode }[] })` — client component, one open at a time not required (each toggles independently), chevron rotates, accessible via `<button aria-expanded>`.

- [ ] **Step 1: Create `src/components/ui/Accordion.tsx`**

```tsx
'use client';

import React, { useState } from 'react';

export type AccordionItemData = { q: string; a: React.ReactNode };

export default function Accordion({ items }: { items: AccordionItemData[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="bg-white/[0.02]">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="font-medium text-white">{item.q}</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className={`h-5 w-5 shrink-0 text-orange-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {isOpen && <div className="px-5 pb-5 text-sm leading-relaxed text-gray-300">{item.a}</div>}
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Verify + commit**

Run: `npm run type-check && npm run build`
Expected: pass.

```bash
git add src/components/ui/Accordion.tsx
git commit -m "feat(ui): add accessible Accordion client component"
```

---

## Task 5: Restyle Navigation + Footer, add Guide

**Files:**
- Modify: `src/components/Navigation.tsx`, `src/components/Footer.tsx`

**Interfaces:**
- Consumes: nothing new (uses Tailwind + tokens).
- Produces: Guide entry in top nav and footer.

- [ ] **Step 1: Add Guide to nav items and restyle active state in `src/components/Navigation.tsx`**

Replace the `navItems` array (lines 7-16) with:

```tsx
const navItems = [
  { href: '/',            label: 'Home' },
  { href: '/downloads/',  label: 'Downloads' },
  { href: '/guide/',      label: 'Guide' },
  { href: '/features/',   label: 'Features' },
  { href: '/about/',      label: 'About' },
  { href: '/support/',    label: 'Support' },
  { href: '/donate/',     label: 'Donate' },
  { href: '/status/',     label: 'Status' },
];
```

Update `linkClass` (lines 25-30) so the active state uses the gradient and hover is subtler:

```tsx
  const linkClass = (href: string) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive(href)
        ? 'btn-gradient text-white'
        : 'text-gray-300 hover:bg-white/5 hover:text-white'
    }`;
```

Add a helper above `linkClass` so `/guide/` also highlights on `/guide/*` sub-pages (replace the single `normalizedPath ===` equality):

```tsx
  const isActive = (href: string) => {
    if (href === '/') return normalizedPath === '/';
    return normalizedPath === href || normalizedPath.startsWith(href);
  };
```

Restyle the `<nav>` element (line 33) to a stronger glass treatment:

```tsx
    <nav aria-label="Main navigation" className="sticky top-0 z-50 border-b border-white/10 bg-ink/80 text-white backdrop-blur-md">
```

Update the mobile menu container (line 73) to match:

```tsx
        <div className="md:hidden border-t border-white/10 bg-ink/95 px-4 py-3 space-y-1">
```

- [ ] **Step 2: Add Guide to Footer in `src/components/Footer.tsx`**

In the "App" column (lines 32-37), add a Guide link after Features:

```tsx
              <FooterLink href="/guide/">Guide</FooterLink>
```

In the "Support" column keep existing links; add the FAQ guide link after "FAQ &amp; Help":

```tsx
              <FooterLink href="/guide/faq/">Import FAQ</FooterLink>
```

Change the footer background (line 17) from `bg-gray-950` to `bg-ink`:

```tsx
    <footer className="border-t border-white/10 bg-ink mt-16">
```

- [ ] **Step 3: Verify**

Run: `npm run type-check && npm run lint && npm run build`
Expected: pass. Then `npm run dev`, confirm nav shows Guide, active state uses the gradient, `/guide/*` will highlight Guide.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navigation.tsx src/components/Footer.tsx
git commit -m "feat(nav): glassmorphism nav + footer, add Guide entry with sub-route highlighting"
```

---

## Task 6: Guide shell (layout + nav data + index)

**Files:**
- Create: `src/app/guide/guideNav.ts`, `src/app/guide/layout.tsx`, `src/app/guide/page.tsx`

**Interfaces:**
- Consumes: `PageHeader`, `Section`, `FeatureCard`, `Card` (Tasks 2-3).
- Produces: `GUIDE_PAGES` ordered array; guide layout with sub-nav + prev/next.

- [ ] **Step 1: Create `src/app/guide/guideNav.ts`**

```ts
export type GuidePage = { href: string; label: string; blurb: string };

export const GUIDE_PAGES: GuidePage[] = [
  { href: '/guide/', label: 'Overview', blurb: 'Start here — get your first game running.' },
  { href: '/guide/importing/', label: 'Importing Games', blurb: 'Files app, drag-and-drop, Wi-Fi upload, and URL scheme.' },
  { href: '/guide/formats/', label: 'Supported Formats', blurb: 'Every extension iFly reads, and which to prefer.' },
  { href: '/guide/bios/', label: 'BIOS Setup', blurb: 'When you need a BIOS and where it goes.' },
  { href: '/guide/arcade/', label: 'Arcade & Naomi Rips', blurb: 'Naomi, Naomi 2, and Atomiswave in odd formats.' },
  { href: '/guide/systems/', label: 'Systems', blurb: 'Every system iFly runs, with per-system notes.' },
  { href: '/guide/faq/', label: 'FAQ & Troubleshooting', blurb: 'Fixes for the common failures.' },
];
```

- [ ] **Step 2: Create `src/app/guide/layout.tsx`**

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GUIDE_PAGES } from './guideNav';

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const currentIndex = GUIDE_PAGES.findIndex((p) => p.href === normalized);
  const prev = currentIndex > 0 ? GUIDE_PAGES[currentIndex - 1] : null;
  const next = currentIndex >= 0 && currentIndex < GUIDE_PAGES.length - 1 ? GUIDE_PAGES[currentIndex + 1] : null;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        {/* Sub-nav */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <nav aria-label="Guide navigation" className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
            {GUIDE_PAGES.map((p) => {
              const active = p.href === normalized;
              return (
                <Link
                  key={p.href}
                  href={p.href}
                  className={`whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors ${
                    active ? 'bg-orange-500/15 font-medium text-orange-300' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {p.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <div className="min-w-0">
          <article className="prose-guide max-w-none">{children}</article>

          {(prev || next) && (
            <div className="mt-12 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
              {prev ? (
                <Link href={prev.href} className="text-sm text-gray-400 hover:text-orange-300">
                  ← {prev.label}
                </Link>
              ) : <span />}
              {next ? (
                <Link href={next.href} className="text-sm text-gray-400 hover:text-orange-300">
                  {next.label} →
                </Link>
              ) : <span />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

Note: this layout is a client component (uses `usePathname`) and does not export `metadata` — each page below exports its own. That is allowed: the layout has no metadata export.

- [ ] **Step 3: Create `src/app/guide/page.tsx` (index)**

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { GUIDE_PAGES } from './guideNav';

export const metadata: Metadata = {
  title: 'Guide',
  description: 'How to import games, which formats iFly supports, BIOS setup, arcade and Naomi rips, and troubleshooting.',
  alternates: { canonical: 'https://ifly-emu.com/guide/' },
};

export default function GuideIndex() {
  const pages = GUIDE_PAGES.filter((p) => p.href !== '/guide/');
  return (
    <>
      <h1 className="text-3xl font-black text-white">iFly Guide</h1>
      <p className="mt-3 max-w-2xl text-gray-400">
        Everything you need to get games running on iFly. New here? Most Dreamcast games need
        no BIOS at all — drop a <code>.chd</code> or <code>.cdi</code> into iFly and go.
      </p>

      <div className="mt-8 rounded-xl border border-orange-500/20 bg-orange-500/[0.06] p-5">
        <h2 className="text-lg font-semibold text-white">First import in 3 steps</h2>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-gray-300">
          <li>Get a Dreamcast game as <code>.chd</code>, <code>.cdi</code>, or <code>.gdi</code>.</li>
          <li>Open iFly → import via the Files app, drag-and-drop, or Wi-Fi upload.</li>
          <li>Tap the game. No BIOS required for Dreamcast.</li>
        </ol>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {pages.map((p) => (
          <Link key={p.href} href={p.href} className="card-glass block p-5">
            <h3 className="font-semibold text-white">{p.label}</h3>
            <p className="mt-1 text-sm text-gray-400">{p.blurb}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run type-check && npm run build`
Expected: pass; `out/guide/index.html` generated. `npm run dev` → `/guide/` shows sub-nav + cards.

- [ ] **Step 5: Commit**

```bash
git add src/app/guide/guideNav.ts src/app/guide/layout.tsx src/app/guide/page.tsx
git commit -m "feat(guide): add guide shell, sub-nav data, and overview page"
```

---

## Task 7: Guide — Importing Games

**Files:**
- Create: `src/app/guide/importing/page.tsx`

**Interfaces:**
- Consumes: `Callout`, `Screenshot`.

- [ ] **Step 1: Create `src/app/guide/importing/page.tsx`**

```tsx
import type { Metadata } from 'next';
import Callout from '@/components/ui/Callout';
import Screenshot from '@/components/ui/Screenshot';

export const metadata: Metadata = {
  title: 'Importing Games',
  description: 'Import Dreamcast and arcade games into iFly via the Files app, drag-and-drop, Wi-Fi upload, or the ifly:// URL scheme.',
  alternates: { canonical: 'https://ifly-emu.com/guide/importing/' },
};

export default function ImportingPage() {
  return (
    <>
      <h1 className="text-3xl font-black text-white">Importing Games</h1>
      <p className="mt-3 text-gray-400">
        iFly imports games four ways. All of them route through the same importer, so the file
        ends up in the right place no matter which you use.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-white">Files app / document picker</h2>
      <p className="mt-2 text-gray-400">
        In iFly, add games from the Files app. Pick a single file (<code>.chd</code>,
        <code>.cdi</code>, <code>.gdi</code>) or a whole folder for multi-track dumps. This works
        on iOS, iPadOS, and tvOS.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-white">Drag-and-drop (iPad)</h2>
      <p className="mt-2 text-gray-400">
        On iPad (iOS 15+), drag files from Files, Safari downloads, or another app straight onto
        the iFly library grid.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-white">Wi-Fi upload (WebDAV / HTTP)</h2>
      <p className="mt-2 text-gray-400">
        Start the built-in web server in iFly, then scan the QR code or open the shown URL in a
        desktop browser and drag files in. Works over WebDAV or plain HTTP on iOS, tvOS, and
        macOS — the easiest way to move large arcade sets onto Apple TV.
      </p>
      <Screenshot alt="Wi-Fi upload screen with QR code" width={1200} height={800} className="mt-4" />

      <h2 className="mt-8 text-xl font-semibold text-white">URL scheme</h2>
      <p className="mt-2 text-gray-400">
        Links using the <code>ifly://</code> scheme open a file and import it through the same
        policy.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-white">Where files go</h2>
      <p className="mt-2 text-gray-400">
        Games land in <code>ROMs/</code>, BIOS in <code>BIOS/</code>, controller skins in
        <code>Skins/</code> (under Documents or Caches). Skins (<code>.deltaskin</code>,
        <code>.manicskin</code>) are routed to <code>Skins/</code> automatically.
      </p>

      <Callout variant="info" title="What happens to archives">
        Disc archives (a <code>.zip</code> or <code>.7z</code> containing a <code>.gdi</code> or
        <code>.cue</code>) are extracted on import. Arcade romsets are copied as-is so the MAME
        loader can open them in place. Extraction is all-or-nothing: a partial extract rolls back
        and leaves the source archive alone.
      </Callout>
    </>
  );
}
```

- [ ] **Step 2: Verify + commit**

Run: `npm run type-check && npm run build`
Expected: pass; `out/guide/importing/index.html` exists.

```bash
git add src/app/guide/importing/page.tsx
git commit -m "feat(guide): add Importing Games page"
```

---

## Task 8: Guide — Supported Formats

**Files:**
- Create: `src/app/guide/formats/page.tsx`

**Interfaces:**
- Consumes: `Callout`.

- [ ] **Step 1: Create `src/app/guide/formats/page.tsx`**

```tsx
import type { Metadata } from 'next';
import Callout from '@/components/ui/Callout';

export const metadata: Metadata = {
  title: 'Supported Formats',
  description: 'Every disc image, track, archive, and skin format iFly supports, and why to prefer CHD or CDI over GDI.',
  alternates: { canonical: 'https://ifly-emu.com/guide/formats/' },
};

const rows: [string, string, string][] = [
  ['.chd', 'Standalone disc', 'Compressed, single file. Best storage (~700 MB → ~300 MB). Dreamcast + Naomi GD-ROM.'],
  ['.cdi', 'Standalone disc', 'Single-file Dreamcast image. No tracks to lose.'],
  ['.iso', 'Standalone disc', 'Single-file image.'],
  ['.gdi', 'Index', 'GD-ROM index that points at .bin / .raw / .img tracks. All tracks must be present.'],
  ['.cue', 'Index', 'CUE sheet that points at .bin tracks.'],
  ['.bin / .raw / .img', 'Track', 'Payload tracks referenced by a .gdi or .cue.'],
  ['.dat', 'Arcade payload', 'Decrypted single-cart arcade ROM (often inside a .zip).'],
  ['.lst', 'Arcade list', 'Metadata for MAME-style arcade rips.'],
  ['.m3u', 'Playlist', 'Groups multiple discs into an ordered multi-disc set.'],
  ['.elf', 'Homebrew', 'Raw homebrew executable.'],
  ['.zip / .7z', 'Archive', 'Disc archives are extracted; arcade romsets copied as-is.'],
  ['.deltaskin / .manicskin / .skin / .emuskin', 'Controller skin', 'Routed to the Skins folder.'],
];

export default function FormatsPage() {
  return (
    <>
      <h1 className="text-3xl font-black text-white">Supported Formats</h1>
      <p className="mt-3 text-gray-400">
        iFly reads the same disc and arcade formats as Flycast, plus extra handling for odd
        arcade rips (see <a href="/guide/arcade/" className="text-orange-300 hover:underline">Arcade &amp; Naomi Rips</a>).
      </p>

      <Callout variant="tip" title="Prefer CHD or CDI over GDI">
        A <code>.chd</code> or <code>.cdi</code> is a single file — nothing to lose. A
        <code>.gdi</code> references separate <code>.bin</code>/<code>.raw</code> tracks, and the
        game will not boot if any track is missing. <code>.chd</code> is also compressed, roughly
        halving disk use.
      </Callout>

      <div className="mt-8 overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.03] text-gray-300">
            <tr>
              <th className="px-4 py-3 font-semibold">Extension</th>
              <th className="px-4 py-3 font-semibold">Kind</th>
              <th className="px-4 py-3 font-semibold">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-gray-400">
            {rows.map(([ext, kind, notes]) => (
              <tr key={ext} className="align-top">
                <td className="px-4 py-3"><code className="text-orange-300">{ext}</code></td>
                <td className="px-4 py-3 whitespace-nowrap">{kind}</td>
                <td className="px-4 py-3">{notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify + commit**

Run: `npm run type-check && npm run build`
Expected: pass.

```bash
git add src/app/guide/formats/page.tsx
git commit -m "feat(guide): add Supported Formats page with format table"
```

---

## Task 9: Guide — BIOS Setup

**Files:**
- Create: `src/app/guide/bios/page.tsx`

**Interfaces:**
- Consumes: `Callout`, `Badge` (from `Badge.tsx`).

- [ ] **Step 1: Create `src/app/guide/bios/page.tsx`**

```tsx
import type { Metadata } from 'next';
import Callout from '@/components/ui/Callout';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'BIOS Setup',
  description: 'Dreamcast needs no BIOS in iFly. Only the arcade systems require one — here are the exact files and where they go.',
  alternates: { canonical: 'https://ifly-emu.com/guide/bios/' },
};

const biosRows: { system: string; file: string; required: boolean; notes: string }[] = [
  { system: 'Dreamcast', file: 'dc_boot.bin', required: false, notes: 'Boot animation only. HLE BIOS (Reios) is used by default.' },
  { system: 'Dreamcast', file: 'dc_flash.bin', required: false, notes: 'Flash / NVRAM (clock, settings). Pair with dc_boot.bin for full accuracy.' },
  { system: 'Naomi', file: 'naomi.zip', required: true, notes: 'MAME romset. Basename must match exactly.' },
  { system: 'Naomi 2', file: 'naomi2.zip', required: true, notes: 'MAME romset.' },
  { system: 'Atomiswave', file: 'awbios.zip', required: true, notes: 'MAME romset.' },
  { system: 'System SP', file: 'segasp.zip', required: true, notes: 'MAME romset.' },
  { system: 'House of the Dead 2', file: 'hod2bios.zip', required: false, notes: 'Game-specific board.' },
  { system: 'Ferrari F355', file: 'f355bios.zip / f355dlx.zip', required: false, notes: 'Challenge / Deluxe variants.' },
  { system: 'Airline Pilots', file: 'airlbios.zip', required: false, notes: 'Also covers Sega Strike Fighter.' },
];

export default function BiosPage() {
  return (
    <>
      <h1 className="text-3xl font-black text-white">BIOS Setup</h1>

      <Callout variant="tip" title="Dreamcast needs no BIOS">
        Almost every Dreamcast game runs on iFly&apos;s built-in HLE BIOS (Reios). You only need
        a real BIOS for the arcade systems (Naomi, Naomi 2, Atomiswave, System SP).
      </Callout>

      <p className="mt-6 text-gray-400">
        Put BIOS files in the <code>BIOS/</code> folder. Names are case-normalized to lowercase,
        and MAME romsets must keep their exact basename.
      </p>

      <div className="mt-8 overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.03] text-gray-300">
            <tr>
              <th className="px-4 py-3 font-semibold">System</th>
              <th className="px-4 py-3 font-semibold">File</th>
              <th className="px-4 py-3 font-semibold">Required</th>
              <th className="px-4 py-3 font-semibold">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-gray-400">
            {biosRows.map((r) => (
              <tr key={`${r.system}-${r.file}`} className="align-top">
                <td className="px-4 py-3 whitespace-nowrap">{r.system}</td>
                <td className="px-4 py-3"><code className="text-orange-300">{r.file}</code></td>
                <td className="px-4 py-3">
                  <Badge tone={r.required ? 'required' : 'optional'}>{r.required ? 'Required' : 'Optional'}</Badge>
                </td>
                <td className="px-4 py-3">{r.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify + commit**

Run: `npm run type-check && npm run build`
Expected: pass.

```bash
git add src/app/guide/bios/page.tsx
git commit -m "feat(guide): add BIOS Setup page with requirement matrix"
```

---

## Task 10: Guide — Arcade & Naomi Rips

**Files:**
- Create: `src/app/guide/arcade/page.tsx`

**Interfaces:**
- Consumes: `Callout`.

- [ ] **Step 1: Create `src/app/guide/arcade/page.tsx`**

```tsx
import type { Metadata } from 'next';
import Callout from '@/components/ui/Callout';

export const metadata: Metadata = {
  title: 'Arcade & Naomi Rips',
  description: 'How iFly handles Naomi, Naomi 2, and Atomiswave rips in odd formats — decrypted single-cart bins, multi-track GD-ROM dumps, and GD-cartridge zip+CHD layouts.',
  alternates: { canonical: 'https://ifly-emu.com/guide/arcade/' },
};

export default function ArcadePage() {
  return (
    <>
      <h1 className="text-3xl font-black text-white">Arcade &amp; Naomi Rips</h1>
      <p className="mt-3 text-gray-400">
        Naomi, Naomi 2, and Atomiswave rips arrive in several shapes. iFly detects each and
        routes it correctly — including formats stock Flycast can&apos;t open. You still need the
        matching arcade BIOS (see <a href="/guide/bios/" className="text-orange-300 hover:underline">BIOS Setup</a>).
      </p>

      <h2 className="mt-10 text-xl font-semibold text-white">Decrypted single-cart ROMs</h2>
      <p className="mt-2 text-gray-400">
        Many archive.org rips are a single decrypted <code>.bin</code> named after the game, e.g.
        <code>VirtuaFighter4.zip</code> containing <code>VirtuaFighter4.bin</code> with no
        <code>.ic*</code> chip files. iFly detects the single-cart shape, routes it to the
        decrypted-ROM path, and Flycast peeks the board header (<code>NAOMI</code> /
        <code>Naomi2</code>) to auto-select the BIOS. Stock Flycast sends these to its MAME loader
        and fails.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-white">Multi-track GD-ROM dumps</h2>
      <p className="mt-2 text-gray-400">
        Arcade GD-ROM games sometimes come as a <code>.cue</code> plus several <code>.bin</code>
        tracks (e.g. Slashout). iFly treats the <code>.cue</code> as a disc, extracts it like a
        Dreamcast multi-track set, and verifies every referenced track exists.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-white">Naomi GD-cartridge (zip + CHD)</h2>
      <p className="mt-2 text-gray-400">
        Some Naomi games pair a MAME cart zip with a GD-ROM image in a subfolder:
        <code>senkosp.zip</code> alongside <code>senkosp/gdl-0030a.chd</code>. iFly carries the
        sibling CHD with the cart zip on import and warns if the CHD is missing before boot.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-white">MAME chip-set zips</h2>
      <p className="mt-2 text-gray-400">
        Traditional MAME romsets (a <code>.zip</code> of <code>.ic*</code> chip files) are copied
        as-is and opened directly by the MAME loader.
      </p>

      <Callout variant="warn" title="If an arcade game won't boot">
        Check that the arcade BIOS (<code>naomi.zip</code>, <code>naomi2.zip</code>,
        <code>awbios.zip</code>, or <code>segasp.zip</code>) is in <code>BIOS/</code>, and that a
        GD-cartridge game&apos;s companion <code>.chd</code> sits in its named subfolder.
      </Callout>
    </>
  );
}
```

- [ ] **Step 2: Verify + commit**

Run: `npm run type-check && npm run build`
Expected: pass.

```bash
git add src/app/guide/arcade/page.tsx
git commit -m "feat(guide): add Arcade & Naomi Rips page"
```

---

## Task 11: Guide — Systems

**Files:**
- Create: `src/app/guide/systems/page.tsx`

**Interfaces:**
- Consumes: `Badge`.

- [ ] **Step 1: Create `src/app/guide/systems/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Systems',
  description: 'Every system iFly runs: Dreamcast, Naomi, Naomi 2, Atomiswave, System SP, and game-specific boards.',
  alternates: { canonical: 'https://ifly-emu.com/guide/systems/' },
};

const systems: { name: string; biosRequired: boolean; notes: string }[] = [
  { name: 'Dreamcast', biosRequired: false, notes: 'Consumer console. Runs on the built-in HLE BIOS; no BIOS file needed.' },
  { name: 'Naomi', biosRequired: true, notes: 'Arcade board. Requires naomi.zip.' },
  { name: 'Naomi 2', biosRequired: true, notes: 'Upgraded arcade board. Requires naomi2.zip.' },
  { name: 'Atomiswave', biosRequired: true, notes: 'Sammy arcade hardware. Requires awbios.zip.' },
  { name: 'System SP ("Spider")', biosRequired: true, notes: 'Sega arcade system. Requires segasp.zip.' },
  { name: 'Game-specific boards', biosRequired: false, notes: 'House of the Dead 2, Ferrari F355, Airline Pilots — optional per-game BIOS.' },
];

export default function SystemsPage() {
  return (
    <>
      <h1 className="text-3xl font-black text-white">Systems</h1>
      <p className="mt-3 text-gray-400">
        iFly runs the Sega Dreamcast plus the arcade platforms it shares hardware with. Arcade
        systems need a BIOS; Dreamcast does not.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {systems.map((s) => (
          <div key={s.name} className="card-glass p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold text-white">{s.name}</h2>
              <Badge tone={s.biosRequired ? 'required' : 'optional'}>
                {s.biosRequired ? 'BIOS required' : 'No BIOS'}
              </Badge>
            </div>
            <p className="mt-2 text-sm text-gray-400">{s.notes}</p>
          </div>
        ))}
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify + commit**

Run: `npm run type-check && npm run build`
Expected: pass.

```bash
git add src/app/guide/systems/page.tsx
git commit -m "feat(guide): add Systems page"
```

---

## Task 12: Guide — FAQ & Troubleshooting

**Files:**
- Create: `src/app/guide/faq/FaqAccordion.tsx`, `src/app/guide/faq/page.tsx`

**Interfaces:**
- Consumes: `Accordion` (Task 4).

- [ ] **Step 1: Create `src/app/guide/faq/FaqAccordion.tsx`**

```tsx
'use client';

import Accordion, { type AccordionItemData } from '@/components/ui/Accordion';

const items: AccordionItemData[] = [
  {
    q: 'My game won’t boot. What’s wrong?',
    a: (
      <>
        For arcade games, confirm the arcade BIOS (<code>naomi.zip</code>, <code>naomi2.zip</code>,
        <code>awbios.zip</code>, <code>segasp.zip</code>) is in <code>BIOS/</code>. For a
        <code>.gdi</code> or <code>.cue</code>, confirm every referenced track
        (<code>.bin</code>/<code>.raw</code>/<code>.img</code>) is present. Prefer a single-file
        <code>.chd</code> or <code>.cdi</code> to avoid missing-track problems.
      </>
    ),
  },
  {
    q: 'An arcade rip fails to import or load.',
    a: (
      <>
        Arcade rips come in several shapes. See{' '}
        <a href="/guide/arcade/" className="text-orange-300 hover:underline">Arcade &amp; Naomi Rips</a>{' '}
        for decrypted single-cart <code>.bin</code> dumps, multi-track GD-ROM dumps, and Naomi
        GD-cartridge <code>zip</code>+<code>.chd</code> layouts.
      </>
    ),
  },
  {
    q: 'How do I add a multi-disc game?',
    a: (
      <>
        Import each disc, then use an <code>.m3u</code> playlist listing the disc images in order.
        iFly groups them as one multi-disc game.
      </>
    ),
  },
  {
    q: 'What syncs over iCloud?',
    a: (
      <>
        Saves, VMUs, and BIOS sync across your devices over iCloud. ROMs do not sync — import
        those on each device.
      </>
    ),
  },
  {
    q: 'Do auto-saves interrupt gameplay?',
    a: (
      <>
        No. iFly serializes save states off the main thread, so timed auto-saves run without
        stalling emulation.
      </>
    ),
  },
  {
    q: 'How do I set up controllers?',
    a: (
      <>
        See the <a href="/controllers/" className="text-orange-300 hover:underline">Controllers</a>{' '}
        page for MFi, DualShock, DualSense, Xbox, and Switch mappings, plus on-screen control
        options.
      </>
    ),
  },
  {
    q: 'How do I get better performance or higher resolution?',
    a: (
      <>
        iFly runs JIT-less at full speed on Apple silicon and can upscale to <code>1440p</code> or
        <code>4K</code> on recent devices. Use per-game options to tune internal resolution,
        frame pacing, and ProMotion refresh.
      </>
    ),
  },
];

export default function FaqAccordion() {
  return <Accordion items={items} />;
}
```

- [ ] **Step 2: Create `src/app/guide/faq/page.tsx`**

```tsx
import type { Metadata } from 'next';
import FaqAccordion from './FaqAccordion';

export const metadata: Metadata = {
  title: 'FAQ & Troubleshooting',
  description: 'Fixes for the common iFly problems: games that won’t boot, arcade rip failures, multi-disc games, iCloud sync, and performance.',
  alternates: { canonical: 'https://ifly-emu.com/guide/faq/' },
};

export default function FaqPage() {
  return (
    <>
      <h1 className="text-3xl font-black text-white">FAQ &amp; Troubleshooting</h1>
      <p className="mt-3 mb-8 text-gray-400">
        The common failures and how to fix them. Still stuck? Ask in the{' '}
        <a href="https://discord.gg/QF5ZjVT4Sa" target="_blank" rel="noopener noreferrer" className="text-orange-300 hover:underline">Discord</a>.
      </p>
      <FaqAccordion />
    </>
  );
}
```

- [ ] **Step 3: Verify + commit**

Run: `npm run type-check && npm run build`
Expected: pass; FAQ accordion opens/closes in `npm run dev`.

```bash
git add src/app/guide/faq/FaqAccordion.tsx src/app/guide/faq/page.tsx
git commit -m "feat(guide): add FAQ & Troubleshooting page with accordion"
```

---

## Task 13: Rewrite Features with the grouped feature set

**Files:**
- Modify: `src/components/Features.tsx`

**Interfaces:**
- Consumes: `FeatureCard` (Task 2) — replaces the inline card markup.
- Produces: `Features({ compact?, className? })` unchanged signature (homepage uses `compact`), but now renders grouped sections when `compact` is false.

- [ ] **Step 1: Rewrite `src/components/Features.tsx`**

Keep the existing icon components (`ControllerIcon`, `PhoneIcon`, etc.) — reuse them. Replace `allFeatures`/`extendedOnly`/render with grouped data + `FeatureCard`. Full file:

```tsx
import React from 'react';
import { FeatureCard } from '@/components/ui/Card';

// Reuse a compact inline icon set (24x24, currentColor).
const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true"><path d={d} /></svg>
);

const ICONS = {
  bolt: 'M13 2 4 14h6l-1 8 9-12h-6l1-8Z',
  cpu: 'M9 3h6v2h3a2 2 0 0 1 2 2v3h2v2h-2v3a2 2 0 0 1-2 2h-3v2H9v-2H6a2 2 0 0 1-2-2v-3H2v-2h2V7a2 2 0 0 1 2-2h3V3Zm-1 6v6h8V9H8Z',
  sparkles: 'M11 2 9 7l-5 2 5 2 2 5 2-5 5-2-5-2-2-5Zm8 9-1 3-3 1 3 1 1 3 1-3 3-1-3-1-1-3Z',
  save: 'M5 3h11l3 3v15a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm2 4v4h8V7H7Zm8 12v-5H9v5h6Z',
  cloud: 'M7 18h9a4 4 0 1 0-1.1-7.9A5 5 0 0 0 5 12a4 4 0 0 0 2 6Z',
  controller: 'M6 8h12a4 4 0 0 1 3.8 5.2l-1.1 3A3 3 0 0 1 17 18h-2l-2-2h-2l-2 2H7a3 3 0 0 1-3.7-1.8l-1.1-3A4 4 0 0 1 6 8Zm2 2v2H6v2h2v2h2v-2h2v-2h-2v-2H8Zm8 .5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z',
  target: 'M12 2v2a8 8 0 1 1-8 8H2a10 10 0 1 0 10-10Zm0 6a4 4 0 1 0 4 4h2a6 6 0 1 1-6-6v2Z',
  phone: 'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm5 18a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z',
  chart: 'M4 20V4h2v16H4Zm4 0v-9h2v9H8Zm4 0v-6h2v6h-2Zm4 0v-12h2v12h-2Z',
  search: 'M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm8.7 13.3 3.3 3.3-1.4 1.4-3.3-3.3 1.4-1.4Z',
  network: 'M12 2a4 4 0 0 1 1 7.87V11h6a1 1 0 0 1 1 1v2.13a4 4 0 1 1-2 0V13h-5v1.13a4 4 0 1 1-2 0V13H6v1.13a4 4 0 1 1-2 0V12a1 1 0 0 1 1-1h6V9.87A4 4 0 0 1 12 2Z',
} as const;

type Feature = { title: string; description: string; icon: React.ReactNode };
type Group = { heading: string; items: Feature[] };

const f = (title: string, description: string, d: string): Feature => ({ title, description, icon: <Icon d={d} /> });

const GROUPS: Group[] = [
  {
    heading: 'Performance & graphics',
    items: [
      f('JIT-less full speed', 'Custom Apple-silicon CPU work runs Dreamcast at full speed with no JIT. Upscales to 1440p or 4K on recent devices.', ICONS.cpu),
      f('Custom Metal backend', 'A Metal renderer built for Apple GPUs, with HDR upscaling support.', ICONS.sparkles),
      f('1K+ Metal shaders', 'A large native shader library for visual quality and effects.', ICONS.bolt),
      f('Texture packs', 'Custom texture-pack support with a management UI, like Flycast.', ICONS.chart),
      f('ProMotion support', 'High-refresh ProMotion rendering, or lock to the original refresh rate.', ICONS.phone),
    ],
  },
  {
    heading: 'VMU tooling',
    items: [
      f('Floating VMU window', 'Keep a live VMU on screen while you play.', ICONS.save),
      f('VMU Watch companion', 'A live VMU viewer on Apple Watch.', ICONS.save),
      f('Native VMU file manager', 'A Swift-native VMU manager with per-game and per-VMU backup and restore.', ICONS.save),
    ],
  },
  {
    heading: 'Saves & sync',
    items: [
      f('iCloud sync', 'Saves, VMUs, and BIOS sync across devices over iCloud. ROMs stay local.', ICONS.cloud),
      f('Off-thread auto-saves', 'Timed auto-saves serialize off the main thread, so emulation never stalls.', ICONS.save),
      f('HLE & native BIOS', 'Run on the built-in HLE BIOS, or supply a real BIOS.', ICONS.cpu),
    ],
  },
  {
    heading: 'Input & controls',
    items: [
      f('External controllers + haptics', 'DualShock, DualSense, Xbox, Switch, and MFi controllers, with haptics.', ICONS.controller),
      f('Jump Pack rumble', 'Jump Pack rumble maps to device haptics or controller rumble.', ICONS.controller),
      f('Remappable + presets', 'Remap external controller buttons and save presets.', ICONS.target),
      f('On-screen controls', 'Customizable, movable on-screen controls.', ICONS.target),
      f('Keyboard & mouse', 'On-screen touch keyboard/mouse plus native Bluetooth keyboard, mouse, and Smart Keyboard where the OS supports it.', ICONS.phone),
      f('Light gun & microphone', 'Touch light-gun input and native CoreAudio microphone input.', ICONS.target),
      f('DeltaSkin / ManicSkin', 'Import DeltaSkin and ManicSkin controller skins.', ICONS.controller),
    ],
  },
  {
    heading: 'Connectivity & display',
    items: [
      f('External display', 'Output to an external display on iOS and iPadOS.', ICONS.phone),
      f('DCNet & LAN', 'DCNet network and LAN support, matching Flycast.', ICONS.network),
    ],
  },
  {
    heading: 'Games & content',
    items: [
      f('Cheat database', 'In-app cheat-code database.', ICONS.sparkles),
      f('RetroAchievements', 'RetroAchievements support.', ICONS.target),
      f('Metadata lookup', 'Online game-metadata lookup for your library.', ICONS.search),
      f('Per-game options', 'Tune options per game.', ICONS.chart),
    ],
  },
  {
    heading: 'Platform & import',
    items: [
      f('iOS, iPadOS, tvOS', 'One app across iPhone, iPad, and Apple TV.', ICONS.phone),
      f('Recent-games widget', 'Quick-launch recent games from a Springboard widget.', ICONS.bolt),
      f('Flexible import', 'WebDAV, HTTP, or Files.app import, plus drag-and-drop on iPad.', ICONS.cloud),
    ],
  },
];

// Curated highlights for the homepage compact view.
const HIGHLIGHTS: Feature[] = [
  GROUPS[0].items[0], // JIT-less full speed
  GROUPS[0].items[2], // 1K+ Metal shaders
  GROUPS[1].items[0], // Floating VMU window
  GROUPS[2].items[0], // iCloud sync
  GROUPS[3].items[0], // External controllers + haptics
  GROUPS[5].items[1], // RetroAchievements
];

export type FeaturesProps = { compact?: boolean; className?: string };

export default function Features({ compact = false, className }: FeaturesProps) {
  if (compact) {
    return (
      <div className={className}>
        <div className="grid gap-5 md:grid-cols-3">
          {HIGHLIGHTS.map((item) => (
            <FeatureCard key={item.title} icon={item.icon} title={item.title}>{item.description}</FeatureCard>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="space-y-12">
        {GROUPS.map((group) => (
          <div key={group.heading}>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-orange-400">{group.heading}</h3>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <FeatureCard key={item.title} icon={item.icon} title={item.title}>{item.description}</FeatureCard>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run type-check && npm run lint && npm run build`
Expected: pass. Homepage still calls `<Features compact />`; `/features` calls `<Features />`.

- [ ] **Step 3: Commit**

```bash
git add src/components/Features.tsx
git commit -m "feat(features): grouped feature set with homepage highlights"
```

---

## Task 14: Restyle homepage

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `GridHero`, `Section`, `GradientButton`, `Card`, `Screenshot`.

- [ ] **Step 1: Convert the hero to `GridHero` + `.text-gradient` + `GradientButton`**

In `src/app/page.tsx`, replace the hero `<section>` (lines 32-93) with a `GridHero`-based hero. Keep the app icon, badges, and the two CTAs, but:
- Wrap in `<GridHero className="pt-20 pb-16 text-center">` and drop the now-duplicated manual radial-glow/overflow markup (GridHero provides it).
- Change the `<h1>` orange span to gradient text: replace `<span className="text-orange-500">Fly</span>` with `<span className="text-gradient">Fly</span>`.
- Replace both CTA `<Link>`s with `<GradientButton href="/testflight/">TestFlight Beta</GradientButton>` (solid) and `<GradientButton href="/downloads/" variant="outline">Download IPA</GradientButton>`.

Add the imports at the top:

```tsx
import GridHero from '@/components/ui/GridHero';
import Section from '@/components/ui/Section';
import GradientButton from '@/components/ui/GradientButton';
```

- [ ] **Step 2: Restyle the stats, community, and screenshots sections to glass cards**

- In the stats row (lines 96-110), change each stat card class from `bg-gray-900 border border-gray-800 rounded-xl` to `card-glass` (keep padding utilities).
- In the Community + Donate section (lines 116-135), change both card wrappers from `bg-gray-900 border border-gray-800 rounded-2xl p-6` to `card-glass p-6`.
- In the Features section wrapper (line 202), change `border-t border-gray-800/60` to `border-t border-white/10`.
- Optionally wrap the screenshot device sections' container in `<Section tone="ink-2">` for alternating background. Leave `DeviceFrame` usage intact.

- [ ] **Step 3: Verify**

Run: `npm run type-check && npm run lint && npm run build`
Expected: pass. `npm run dev` → hero shows animated grid + gradient "Fly", gradient CTA, glass cards.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(home): restyle homepage onto GridHero, gradient CTAs, and glass cards"
```

---

## Task 15: Restyle remaining pages

**Files:**
- Modify: `src/app/features/page.tsx`, `src/app/about/page.tsx`, `src/app/support/page.tsx`, `src/app/downloads/page.tsx`, `src/app/links/page.tsx`, `src/app/donate/page.tsx`, `src/app/controllers/page.tsx`, `src/app/privacy/page.tsx`, `src/app/licenses/page.tsx`, `src/app/testflight/page.tsx`, `src/app/testflight-patrons/page.tsx`, `src/app/status/page.tsx`

**Interfaces:**
- Consumes: `PageHeader`, `Section`, `Card`, `Callout`, `GradientButton`.

This is a repetitive restyle. Apply the same three substitutions to each page, then verify once at the end.

- [ ] **Step 1: For each page, add a `PageHeader` and swap card/background classes**

For every page listed above:
1. If the page has a title heading block at the top, replace it with:
   ```tsx
   <PageHeader title="<Existing Title>" subtitle="<existing subtitle if any>" />
   ```
   and import `PageHeader from '@/components/ui/PageHeader'`. (Do not add a PageHeader to `status` if it would clash with the dashboard header — instead just swap classes there.)
2. Replace card wrappers `bg-gray-900 border border-gray-800 rounded-2xl` (and `rounded-xl` variants) with `card-glass`.
3. Replace section dividers `border-gray-800` → `border-white/10`, and any page-level `bg-gray-950` → `bg-ink`.
4. Replace primary CTA links styled as orange buttons with `<GradientButton>`; leave secondary/outline links as-is or use `variant="outline"`.

Work through them in this order, committing after each for reviewability: `about`, `features`, `support`, `downloads`, `links`, `donate`, `controllers`, `privacy`, `licenses`, `testflight`, `testflight-patrons`, `status`.

- [ ] **Step 2: Verify after each page**

Run: `npm run type-check && npm run build`
Expected: pass. Spot-check the page in `npm run dev`.

- [ ] **Step 3: Commit (per page or in small batches)**

```bash
git add src/app/<page>/page.tsx
git commit -m "feat(pages): restyle <page> onto new design system"
```

---

## Task 16: Sitemap + final verification

**Files:**
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Consumes: guide routes from Tasks 6-12.

- [ ] **Step 1: Add guide routes to `src/app/sitemap.ts`**

Insert after the `/downloads/` entry (line 9):

```ts
    { url: `${base}/guide/`,           changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/guide/importing/`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/guide/formats/`,   changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/guide/bios/`,      changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/guide/arcade/`,    changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/guide/systems/`,   changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/guide/faq/`,       changeFrequency: 'monthly', priority: 0.6 },
```

- [ ] **Step 2: Full verification**

Run: `npm run type-check && npm run lint && npm run build`
Expected: all pass; static export completes.

Confirm generated output:
```bash
ls out/guide out/guide/importing out/guide/formats out/guide/bios out/guide/arcade out/guide/systems out/guide/faq
grep -c "guide/" out/sitemap.xml
```
Expected: each guide directory contains `index.html`; `grep` count ≥ 7.

- [ ] **Step 3: Manual pass in `npm run dev`**

- Nav: Guide entry present; visiting any `/guide/*` highlights Guide.
- Guide sub-nav highlights the current page; prev/next links work.
- FAQ accordion opens/closes; chevron rotates.
- Screenshot placeholders render with dimensions + captions.
- Reduced-motion: with "Reduce Motion" on, the grid overlay is static.

- [ ] **Step 4: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat(seo): add guide routes to sitemap"
```

---

## Self-Review

**Spec coverage:**
- Design tokens / retrowave patterns → Task 1. ✅
- Reusable components (GridHero, PageHeader, Section, Card/FeatureCard, GradientButton, Accordion, Callout, Badge/Pill, Screenshot) → Tasks 2-4. ✅
- Glassmorphism nav + Guide entry → Task 5. ✅
- `/guide` multi-page section (importing, formats, BIOS, arcade, systems, FAQ) → Tasks 6-12. ✅
- FAQ accordion → Tasks 4 + 12. ✅
- Systems/compatibility page → Task 11. ✅
- Feature set (all groups incl. VMU tooling, JIT-less 4K, off-thread saves) → Task 13. ✅
- Homepage restyle + highlights → Task 14. ✅
- Restyle all existing pages → Task 15. ✅
- Sitemap + canonical metadata → Task 16 + each page. ✅
- Screenshot placeholders → Task 2 (`Screenshot`) used in Tasks 7, 14, and available site-wide. ✅
- VOICE.md copy rules → Global Constraints; applied in all content tasks. ✅
- Deferred (no task, by design): dark/light toggle, blog, press kit, comparison tables. ✅

**Placeholder scan:** No TBD/TODO. Task 15 is intentionally pattern-based (repetitive mechanical restyle across 12 near-identical pages) rather than full per-file code — each substitution is concrete and the components it uses are fully defined in Tasks 2-4.

**Type consistency:** Component signatures in Tasks 2-4 match their consumers in Tasks 6-14 (`FeatureCard` icon+title+children; `Callout` variant/title; `Badge` tone `required|optional`; `Accordion` `items: {q,a}[]`; `Screenshot` width/height required; `GradientButton` variant `solid|outline`). `Features` keeps its `{ compact?, className? }` signature so existing call sites in `page.tsx` and `features/page.tsx` still compile.
