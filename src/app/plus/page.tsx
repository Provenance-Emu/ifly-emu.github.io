import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import Callout from '@/components/ui/Callout';
import PlusFeature from '@/components/plus/PlusFeature';
import PlusComparison from '@/components/plus/PlusComparison';
import { PLUS_FEATURES, FREE_FOREVER } from '@/components/plus/plusFeatures';

export const metadata: Metadata = {
  title: 'iFly Plus',
  description:
    'iFly Plus unlocks the extras built on top of the emulator: CRT and filter shader packs, HD texture packs, per-game tuning profiles, VMU mini-games on Apple Watch, watermark-free clips, and unlimited Handoff. The emulator core, imports, save states, and RetroAchievements stay free.',
  alternates: { canonical: 'https://ifly-emu.com/plus/' },
};

export default function PlusPage() {
  return (
    <div className="min-h-screen bg-ink">
      <PageHeader
        eyebrow="Upgrade"
        title="iFly Plus"
        subtitle="Plus unlocks the extras built on top of the emulator. The emulator itself, and everything needed to play your games, stays free."
      />

      <section className="container mx-auto px-4 pb-20">
        <div className="mx-auto max-w-5xl space-y-20">

          {/* The free boundary comes first, deliberately. The core is GPL and we
              didn't write the games — being vague here is how an emulator gets
              accused of paywalling work that isn't its own. */}
          <div>
            <h2 className="text-2xl font-bold text-white">Free forever</h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-400">
              None of this is behind Plus, and none of it will be. If a feature is needed to
              import a game, play it, save it, or earn achievements in it, it is free.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {FREE_FOREVER.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-gray-300">
                  <span aria-hidden="true" className="mt-0.5 shrink-0 text-orange-400">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What Plus actually unlocks. */}
          <div className="space-y-20">
            <div>
              <h2 className="text-2xl font-bold text-white">What Plus unlocks</h2>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-400">
                Six features, all of them iFly&apos;s own work rather than the emulator core.
              </p>
            </div>
            {PLUS_FEATURES.map((feature, i) => (
              <PlusFeature key={feature.id} feature={feature} flip={i % 2 === 1} />
            ))}
          </div>

          {/* Free vs Plus at a glance. */}
          <div>
            <h2 className="mb-6 text-2xl font-bold text-white">Free vs Plus</h2>
            <PlusComparison />
          </div>

          {/* Founder. No date — FounderStatus.cutoff is still a placeholder in the
              app and gets its real value at submission. */}
          <div>
            <h2 className="text-2xl font-bold text-white">Founder badge</h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-400">
              Buy the lifetime unlock during the first six weeks after launch and the app keeps a
              Founder badge for you. It is local recognition in the app — there is no leaderboard
              and nothing is published.
            </p>
          </div>

          {/* Crossover. Not live: ProvenanceCrossover.swift requires Provenance
              3.4.0+, which hasn't shipped. Worded as forthcoming on purpose. */}
          <div>
            <h2 className="text-2xl font-bold text-white">Provenance Plus</h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-400">
              iFly and{' '}
              <a href="https://provenance-emu.com" className="text-orange-400 transition-colors hover:text-orange-300">
                Provenance
              </a>{' '}
              are built by the same person, and Plus is meant to carry across both.
            </p>
            <Callout variant="info" title="Not live yet">
              The crossover needs Provenance 3.4.0 or newer, which has not shipped. Until it does,
              an iFly Plus unlock and a Provenance Plus unlock are separate purchases.
            </Callout>
          </div>

          {/* Pricing is genuinely undecided. `ProStore.swift` defines monthly,
              yearly, AND lifetime product IDs, and which of them actually ship
              is not settled — so this page must not claim a shape either. An
              earlier draft said "one-time unlock, not a subscription"; that was
              unsupported and is why this section states nothing but the fact. */}
          <div>
            <h2 className="text-2xl font-bold text-white">Price</h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-400">
              Not announced yet.
            </p>
          </div>

          <div className="card-glass p-8 text-center">
            <h2 className="text-xl font-bold text-white">Try it first</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-gray-400">
              iFly is free to install and free to play. Plus is there if you want the extras.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/downloads/" className="text-sm font-medium text-orange-400 transition-colors hover:text-orange-300">
                Download iFly
              </Link>
              <Link href="/features/" className="text-sm font-medium text-orange-400 transition-colors hover:text-orange-300">
                All features →
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
