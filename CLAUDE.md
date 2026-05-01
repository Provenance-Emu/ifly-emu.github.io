# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Part of `personal-os`

This repo is a satellite of [`personal-os`](file:///Users/jmattiello/Workspace/personal-os) at `~/Workspace/personal-os`. A fresh agent session here should read `personal-os/AGENTS.md` first for shared conventions:

- **`VOICE.md`** — voice rules for any public-facing prose (marketing copy on this site falls under it).
- **`decisions/`** — cross-repo MADR-numbered ADRs.
- **`journal/`** — daily orchestration log; touch entries when shipping work in this repo.
- **`INBOX.md`** — things-to-act-on across all projects.
- **`wiki/projects-index.md`** — registry of every active repo and how it relates to this one.

Don't edit `personal-os/raw/` from a satellite — that's the central drop-zone, one-way.

## What This Is

Marketing and distribution website for **iFly**, a Dreamcast emulator for iOS and tvOS. Hosted on GitHub Pages as a static export. The site handles app downloads, AltStore/SideStore distribution feeds, TestFlight gating, and community links.

## Commands

```bash
# Development
npm run dev          # Next.js dev server with Turbopack
npm run build        # Static export build (outputs to /out)
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run type-check   # TypeScript validation without building

# Cleanup
npm run clean        # Remove .next cache
npm run clean:all    # Remove .next, node_modules, and out/
```

No test suite exists in this project.

## Architecture

**Next.js 15 App Router** with `output: 'export'` — generates a fully static site. `trailingSlash: true` and `images: { unoptimized: true }` are required for GitHub Pages compatibility.

### App Distribution Feed

- `src/lib/buildParser.ts` — scans `/public/builds/{version}/{platform}/{app}.ipa` and reads `DistributionSummary.plist` files. Handles beta versioning (e.g., `iOS-Beta7`), semantic version comparison, and deduplication.
- `src/app/api/altstore/route.ts` and `src/app/api/sidestore/route.ts` — serve the JSON feed. Use `export const dynamic = 'force-static'`. The `NEXT_PUBLIC_BASE_URL` env var controls the base URL.

### SEO

Every page exports a `metadata` object with `title`, `description`, and `alternates.canonical`. The layout (`src/app/layout.tsx`) provides the global default with `metadataBase`, OpenGraph, Twitter card, and JSON-LD `SoftwareApplication` schema. `sitemap.ts` and `robots.ts` auto-generate `/sitemap.xml` and `/robots.txt` — both need `export const dynamic = 'force-static'` for the static export.

### Security Headers

A `Content-Security-Policy` and `Referrer-Policy` are set via `<meta>` tags in `layout.tsx` (GitHub Pages cannot set HTTP headers). `Strict-Transport-Security` and `X-Frame-Options` require HTTP headers — these can only be added by routing through Cloudflare or another CDN. The Observatory threshold in `site-audit.yml` is therefore set to grade C (not B/A).

### TestFlight Gating

`src/components/TestFlightGate.tsx` gates access behind a social follow prompt. State stored in `localStorage` under `ifly_testflight_gate_passed`. Tracked via `gtag('event', 'testflight_access', { method })`.

### Google Analytics

GA is loaded via two `<Script>` tags in `layout.tsx` (the gtag.js library + `public/gtag-init.js`). `src/components/GoogleAnalytics.tsx` handles SPA route change tracking on top of the initial load — it does NOT duplicate the load, it fires `gtag('config', ...)` on navigation events.

### Status Page

`src/app/status/page.tsx` is a server component (exports `metadata`). The client logic lives in `src/app/status/StatusDashboard.tsx`. The dashboard fetches `/status.json` at runtime — this file is committed to `public/status.json` by the site-audit workflow after each run.

### Styling

Tailwind CSS v4 with PostCSS. Primary brand color `#ff6900` (orange). Dark theme (`bg-gray-950`/`bg-gray-900`) is the standard for new pages. Background uses a fixed gradient image in `globals.css`.

### Path Aliases

`@/*` maps to `./src/*`.

## GitHub Actions

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `deploy.yml` | push to main | Build + deploy to GitHub Pages, writes `out/build-sha.txt` |
| `claude.yml` | `@claude` mentions | Run Claude Code agent (owner/member/collaborator only) |
| `claude-code-review.yml` | PR open/sync | Auto-review every PR |
| `claude-auto-pr.yml` | push to `claude/*` | Fallback PR creation + auto-merge |
| `claude-review-loop.yml` | PR reviews | Re-engage Claude on changes_requested; auto-merge on approval |
| `site-audit.yml` | push, weekly Mon 7am | Lighthouse, htmlproofer, Observatory, SSL Labs; auto-opens/closes issues |
| `auto-update-prs.yml` | push to main | Rebase all open PRs onto main |
| `spell-check.yml` | PR, push to main | cspell across src/ |

## Required Secrets

| Secret | Used by |
|--------|---------|
| `CLAUDE_CODE_OAUTH_TOKEN` | claude.yml, claude-code-review.yml |
| `GH_PAT_ISSUES` | claude-auto-pr.yml, claude-review-loop.yml, site-audit.yml (issue management) |

## Key Constraints

- **Static export only**: No dynamic server features. API routes need `export const dynamic = 'force-static'`.
- **No image optimization**: `next/image` optimization is disabled. Pre-optimize images manually (prefer WebP).
- **GitHub Pages deployment**: The `out/` directory is deployed. Build errors block deployment.
- **No HTTP headers on GitHub Pages**: CSP/referrer via `<meta>` only. HSTS and X-Frame-Options require a CDN layer.
- **`'use client'` components cannot export `metadata`**: Use a server wrapper page that imports the client component.
