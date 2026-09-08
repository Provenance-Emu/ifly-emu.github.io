import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'iFly vs Provenance',
  description:
    'iFly is a standalone Dreamcast app; Provenance emulates 38+ systems including Dreamcast in one library. Same team, same Flycast lineage — here is the actual difference.',
  alternates: { canonical: 'https://ifly-emu.com/compare/ifly-vs-provenance/' },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ifly-emu.com/' },
    { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://ifly-emu.com/compare/' },
    { '@type': 'ListItem', position: 3, name: 'iFly vs Provenance', item: 'https://ifly-emu.com/compare/ifly-vs-provenance/' },
  ],
};

const rows: [string, string, string][] = [
  ['Focus', 'Single system: Dreamcast, NAOMI, Atomiswave', '38+ systems in one library, including Dreamcast'],
  ['Dreamcast core', 'Flycast, ARM64-optimized interpreter, JIT-less', 'Flycast'],
  ['Platforms', 'iOS, iPadOS, tvOS', 'iOS, iPadOS, tvOS, macOS'],
  ['Distribution', 'Sideload (AltStore/SideStore) today; App Store planned', 'App Store and sideload'],
  ['Price', 'Free; Plus is optional', 'Free; Plus is optional'],
  ['Graphics backend', 'Custom Metal renderer with HDR upscaling', 'Not documented on iFly’s site'],
  ['Shaders', '1,000+ native Metal shaders', 'CRT filters and upscaling options (per Provenance’s Dreamcast page)'],
  ['VMU tooling', 'Floating VMU window, VMU Watch companion (Apple Watch), native VMU file manager', 'VMU emulation for in-game saves (per Provenance’s Dreamcast page)'],
  ['Save states', 'Yes, with off-thread auto-saves', 'Yes'],
  ['iCloud sync', 'Saves, VMUs, and BIOS sync across devices; ROMs stay local', 'iCloud sync for save states is a Provenance Plus feature'],
  ['Cheat codes', 'Automatic cheat code downloads', 'Cheat code support (per Provenance’s Dreamcast page)'],
  ['Open source', 'Not documented on iFly’s site', 'Yes (MIT License)'],
];

export default function IflyVsProvenancePage() {
  return (
    <div className="min-h-screen bg-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageHeader
        eyebrow="Compare"
        title="iFly vs Provenance"
        subtitle="Both are built by the same team on the same Flycast lineage. The difference is scope: one app for Dreamcast, or one app for 38+ systems including Dreamcast."
      />

      <section className="container mx-auto px-4 pb-20">
        <div className="mx-auto max-w-4xl space-y-10">
          <p className="text-sm leading-relaxed text-gray-400">
            iFly and{' '}
            <a href="https://provenance-emu.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">
              Provenance
            </a>{' '}
            are built by the same person, and both use Flycast for Dreamcast emulation. Provenance
            wraps 38+ systems (NES, SNES, N64, GBA, PS1, Saturn, Genesis, Dreamcast, and more) into one
            multi-system frontend. iFly is a dedicated, single-system app built only for Dreamcast,
            NAOMI, and Atomiswave. Facts about Provenance below come from{' '}
            <a
              href="https://provenance-emu.com/systems/dreamcast/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:underline"
            >
              Provenance&apos;s own Dreamcast system page
            </a>
            ; facts about iFly come from iFly&apos;s own site.
          </p>

          <div>
            <h2 className="mb-6 text-2xl font-bold text-white">Feature Comparison</h2>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/[0.03] text-gray-300">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Feature</th>
                    <th className="px-4 py-3 font-semibold">iFly</th>
                    <th className="px-4 py-3 font-semibold">Provenance (Dreamcast core)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-400">
                  {rows.map(([feature, ifly, provenance]) => (
                    <tr key={feature} className="align-top">
                      <td className="px-4 py-3 font-medium text-gray-300 whitespace-nowrap">{feature}</td>
                      <td className="px-4 py-3">{ifly}</td>
                      <td className="px-4 py-3">{provenance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">Where Provenance Stands Out</h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-400">
              Provenance covers Dreamcast alongside 37+ other systems — PlayStation, Sega Genesis,
              Saturn, Atari, and many more — in one library. It is already on the App Store, is open
              source under the MIT license, and Provenance Plus adds iCloud sync for Dreamcast save
              states on top of the free core. If you want one app to cover your whole retro library
              instead of one per console, Provenance is the broader choice.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">Where iFly Stands Out</h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-400">
              iFly is built from the ground up as a single-system Dreamcast app, which lets it go
              deeper on that one platform: a custom Metal renderer with HDR upscaling, 1,000+ native
              shaders, automatic cheat code and artwork downloads, a floating VMU window, a native VMU
              file manager, and a VMU companion app for Apple Watch. iFly Plus layers CRT and filter
              shader packs, HD texture packs, per-game tuning profiles, watermark-free clips, and
              unlimited Handoff on top of that. iFly is currently sideload-only (AltStore/SideStore),
              with an App Store release planned. Sideloaded and self-built copies include every Plus
              feature at no cost. Plus purchases apply to the App Store build.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">Which Should You Pick?</h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-400">
              If you want Dreamcast alongside dozens of other systems in one App Store app, Provenance
              is the fit. If Dreamcast is your primary focus and you want the deepest Dreamcast-specific
              tooling — VMU management, Apple Watch support, and Apple-silicon-tuned rendering — iFly is
              built for exactly that, and it is free to sideload today. There is no technical reason you
              cannot use both.
            </p>
          </div>

          <div className="card-glass p-8 text-center">
            <h2 className="text-xl font-bold text-white">Try iFly</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-gray-400">
              iFly is free to install and free to play. See what else it offers, or see how it compares
              to running Flycast in RetroArch.
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
              <Link href="/compare/ifly-vs-flycast/" className="text-sm font-medium text-orange-400 transition-colors hover:text-orange-300">
                iFly vs Flycast →
              </Link>
              <a
                href="https://provenance-emu.com/systems/dreamcast/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-orange-400 transition-colors hover:text-orange-300"
              >
                Provenance Dreamcast page →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
