import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'iFly vs Flycast in RetroArch',
  description:
    'iFly is a standalone iOS/tvOS Dreamcast app built on Flycast. Compare it to running the Flycast core inside RetroArch on iOS — features, controls, and setup.',
  alternates: { canonical: 'https://ifly-emu.com/compare/ifly-vs-flycast/' },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ifly-emu.com/' },
    { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://ifly-emu.com/compare/' },
    { '@type': 'ListItem', position: 3, name: 'iFly vs Flycast in RetroArch', item: 'https://ifly-emu.com/compare/ifly-vs-flycast/' },
  ],
};

const rows: [string, string, string][] = [
  ['App type', 'Standalone native SwiftUI app', 'Multi-core frontend; Flycast is one of many cores'],
  ['Emulation core', 'Flycast, ARM64-optimized interpreter, JIT-less', 'Flycast (libretro core)'],
  ['Systems covered', 'Dreamcast, NAOMI, Atomiswave', 'Dozens of systems, one per core'],
  ['UI', 'Native SwiftUI, tailored to iOS/tvOS', "RetroArch's own cross-platform menu, shared across all platforms"],
  ['Graphics backend', 'Custom Metal renderer with HDR upscaling', 'Not documented'],
  ['Shaders', '1,000+ native Metal shaders', 'RetroArch shader library (Slang/GLSL), per-core options'],
  ['Controller support', 'MFi, PlayStation, Xbox, and Switch controllers, with haptics and Jump Pack rumble mapping', 'MFi and other controllers via RetroArch input config'],
  ['VMU tooling', 'Floating VMU window, VMU Watch companion (Apple Watch), native VMU file manager', 'Not documented'],
  ['Save states', 'Yes, with off-thread auto-saves', 'Yes, RetroArch save states'],
  ['iCloud sync', 'Saves, VMUs, and BIOS sync across devices; ROMs stay local', 'Not documented'],
  ['Cheat codes', 'Automatic cheat code downloads', 'Manual cheat file management'],
  ['Artwork', 'Automatic artwork downloads', 'Manual via playlists/thumbnails'],
  ['Texture packs', 'Custom texture-pack support with a management UI', 'Not documented'],
  ['Distribution', 'Sideload (AltStore/SideStore) today; App Store planned', 'App Store, or sideload via AltStore'],
  ['Extras', 'iFly Plus: CRT/filter packs, HD texture packs, per-game tuning profiles, watermark-free clips, unlimited Handoff', 'Not documented'],
];

export default function IflyVsFlycastPage() {
  return (
    <div className="min-h-screen bg-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageHeader
        eyebrow="Compare"
        title="iFly vs Flycast in RetroArch"
        subtitle="iFly is a standalone iOS/tvOS app built on Flycast. RetroArch runs the same Flycast core inside a general-purpose multi-system frontend. Here is how they differ."
      />

      <section className="container mx-auto px-4 pb-20">
        <div className="mx-auto max-w-4xl space-y-10">
          <p className="text-sm leading-relaxed text-gray-400">
            Both apps ultimately run{' '}
            <a href="https://github.com/flyinghead/flycast" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">
              Flycast
            </a>
            , the upstream Dreamcast, NAOMI, and Atomiswave emulator. The difference is what wraps around
            it: iFly is a dedicated native app built specifically for Dreamcast on Apple platforms;
            RetroArch is a general-purpose, cross-platform frontend with Flycast as one of many
            installable cores. Facts below are drawn from iFly&apos;s own feature pages. Where iFly&apos;s
            site does not document a claim about RetroArch, the table says so rather than guessing.
          </p>

          <div>
            <h2 className="mb-6 text-2xl font-bold text-white">Feature Comparison</h2>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/[0.03] text-gray-300">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Feature</th>
                    <th className="px-4 py-3 font-semibold">iFly</th>
                    <th className="px-4 py-3 font-semibold">Flycast in RetroArch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-400">
                  {rows.map(([feature, ifly, retroarch]) => (
                    <tr key={feature} className="align-top">
                      <td className="px-4 py-3 font-medium text-gray-300 whitespace-nowrap">{feature}</td>
                      <td className="px-4 py-3">{ifly}</td>
                      <td className="px-4 py-3">{retroarch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">Where RetroArch Stands Out</h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-400">
              RetroArch covers dozens of systems in one app, so if Dreamcast is just one of several
              consoles you want to emulate, a single RetroArch install with multiple cores (including
              Flycast) avoids installing a separate app per system. It also carries a large shader
              library shared across every core, and per-core configuration options for users who want
              to tune emulation behavior directly.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">Where iFly Stands Out</h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-400">
              iFly is built as a native SwiftUI app specifically for Dreamcast on iOS and tvOS, rather
              than a shared cross-platform menu wrapped around a core. That focus shows up as a Metal
              renderer with HDR upscaling, 1,000+ native shaders, automatic cheat code and artwork
              downloads, a native VMU file manager, a floating VMU window, and a VMU companion app for
              Apple Watch. iFly Plus adds CRT and filter shader packs, HD texture packs, per-game tuning
              profiles, watermark-free clips, and unlimited Handoff on top of a free core that already
              includes save states, iCloud sync, and RetroAchievements-adjacent save/cheat tooling.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">Which Should You Pick?</h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-400">
              If Dreamcast is the console you care about and you want a native iOS/tvOS interface built
              around it — with VMU tooling, Apple Watch support, and Apple-silicon-tuned rendering — iFly
              is built for exactly that. If you already run RetroArch for other systems and want Dreamcast
              alongside them in the same frontend, adding the Flycast core there keeps everything in one
              place. There is no technical reason you cannot use both.
            </p>
          </div>

          <div className="card-glass p-8 text-center">
            <h2 className="text-xl font-bold text-white">Try iFly</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-gray-400">
              iFly is free to install and free to play. See what else it offers, or see how it compares
              to Provenance&apos;s Dreamcast core.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link href="/downloads/" className="text-sm font-medium text-orange-400 transition-colors hover:text-orange-300">
                Download iFly
              </Link>
              <Link href="/features/" className="text-sm font-medium text-orange-400 transition-colors hover:text-orange-300">
                All features →
              </Link>
              <Link href="/plus/" className="text-sm font-medium text-orange-400 transition-colors hover:text-orange-300">
                iFly Plus →
              </Link>
              <Link href="/compare/ifly-vs-provenance/" className="text-sm font-medium text-orange-400 transition-colors hover:text-orange-300">
                iFly vs Provenance →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
