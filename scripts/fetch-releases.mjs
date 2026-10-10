#!/usr/bin/env node
/**
 * Writes data/releases.json from the public releases repo (default
 * JoeMatt/iFly-releases), which is where the iFly app's Beta Release workflow
 * publishes each IPA as a GitHub pre-release (tag `v<version>+<build>`, asset
 * `iFly-<version>-<build>.ipa`).
 *
 * The Downloads page and the AltStore/SideStore feeds (/api/altstore,
 * /api/sidestore) read this file, so the download links point straight at the
 * release assets. Nothing is copied into the site. Provenance's combined
 * sideload feed in turn fetches /api/altstore.
 *
 * In CI a failed fetch fails the build on purpose: publishing an empty feed
 * over a good one would silently drop iFly from the store sources, whereas a
 * failed build leaves the previous deployment live. Outside CI it only warns.
 */
import fs from 'node:fs';
import path from 'node:path';

const REPO = process.env.RELEASES_REPO || 'JoeMatt/iFly-releases';
const OUT = path.join(process.cwd(), 'data', 'releases.json');
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';
const IN_CI = !!process.env.CI;

function fail(message) {
  if (IN_CI) {
    console.error(`::error::fetch-releases: ${message}`);
    process.exit(1);
  }
  console.warn(`fetch-releases: ${message} (continuing; not in CI)`);
  process.exit(0);
}

const releases = [];
for (let page = 1; ; page += 1) {
  const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=100&page=${page}`, {
    headers: {
      // `full` adds body_html: the release notes already rendered and sanitised by GitHub.
      accept: 'application/vnd.github.full+json',
      'user-agent': 'ifly-site-build',
      ...(TOKEN ? { authorization: `Bearer ${TOKEN}` } : {}),
    },
  }).catch((e) => fail(`request failed: ${e.message}`));

  if (!res.ok) fail(`GET releases for ${REPO} returned HTTP ${res.status}`);

  const pageReleases = await res.json();
  if (!Array.isArray(pageReleases)) fail(`GET releases for ${REPO} returned an invalid response`);
  releases.push(...pageReleases);
  if (pageReleases.length < 100) break;
}
/**
 * One release can carry several platforms' notes, each under its own <h2>
 * ("iFly EMU 1.0.0 (build N)" and "... for Apple TV"). Keep this platform's
 * section, drop its title (the card already shows it) and the boilerplate
 * "Install" block, and leave just the change list.
 */
function changelogHtml(bodyHtml, platform) {
  if (!bodyHtml) return '';
  const sections = bodyHtml.split(/(?=<h2[\s>])/).filter((x) => x.trim());
  const titleOf = (x) => x.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)?.[1] ?? '';
  const isTv = (x) => /apple tv|tvos/i.test(titleOf(x));
  let picked = sections.filter((x) => /^<h2/.test(x) && isTv(x) === (platform === 'tvOS'));
  if (!picked.length) picked = sections;
  return picked
    .map((x) => x.replace(/^<h2[^>]*>[\s\S]*?<\/h2>\s*/, ''))
    .join('')
    .replace(/<h3[^>]*>\s*Install\s*<\/h3>[\s\S]*?(?=<h[23][\s>]|$)/gi, '')
    .trim();
}

const builds = [];
for (const r of releases) {
  if (r.draft) continue;
  for (const asset of r.assets ?? []) {
    if (!/\.ipa$/i.test(asset.name)) continue;
    // Prefer the tag (v0.1.1+1234); fall back to the asset name (iFly-0.1.1-1234.ipa).
    const m =
      /^v?(\d+(?:\.\d+)*)\+(\d+)$/.exec(r.tag_name) ??
      /^iFly-(\d+(?:\.\d+)*)-(\d+)\.ipa$/i.exec(asset.name);
    if (!m) {
      console.warn(`fetch-releases: skipping ${r.tag_name} / ${asset.name}: no version+build in either`);
      continue;
    }
    const platform = /tvos/i.test(asset.name) ? 'tvOS' : 'iOS';
    builds.push({
      tag: r.tag_name,
      releaseURL: r.html_url,
      changelogHtml: changelogHtml(r.body_html, platform),
      version: m[1],
      build: m[2],
      prerelease: !!r.prerelease,
      date: (r.published_at || asset.updated_at || '').slice(0, 10),
      name: asset.name,
      url: asset.browser_download_url,
      size: asset.size,
      platform,
    });
  }
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ repo: REPO, fetchedAt: new Date().toISOString(), builds }, null, 2) + '\n');
console.log(`fetch-releases: ${builds.length} IPA(s) from ${REPO} -> ${path.relative(process.cwd(), OUT)}`);
