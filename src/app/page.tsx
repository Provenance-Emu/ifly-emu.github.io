import type { Metadata } from 'next';
import Image from 'next/image';
import GridHero from '@/components/ui/GridHero';
import Section from '@/components/ui/Section';
import GradientButton from '@/components/ui/GradientButton';
import { Pill } from '@/components/ui/Badge';
import DownloadSection from '@/components/DownloadSection';
import StoreBadge, { AltStoreIcon, SideStoreIcon } from '@/components/StoreBadge';
import { GitHubIcon } from '@/components/ButtonLink';
import SocialButton, { DiscordIcon, XIcon, BmcIcon, PatreonIcon } from '@/components/SocialButton';
import Features from '@/components/Features';
import VideoShowcase from '@/components/VideoShowcase';
import Link from 'next/link';
import ScreenshotGallery from '@/components/ScreenshotGallery';

export const metadata: Metadata = {
  title: 'iFly – Dreamcast Emulator for iOS & tvOS',
  description: 'Play classic Sega Dreamcast games on your iPhone, iPad, and Apple TV. Free, open-source emulation with Metal shaders, MFi controller support, save states, and automatic cheat downloads.',
  alternates: { canonical: 'https://ifly-emu.com/' },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-ink">

      {/* Hero */}
      <GridHero className="pt-20 pb-12 text-center">
        <div className="max-w-3xl mx-auto">

          {/* App icon — priority preloads it since it's above the fold. It is NOT
              the LCP element: on mobile Lighthouse (Oct 2026) LCP is the hero
              <p> below, and its time is ~75% render delay (main thread busy with
              framework JS), with zero image load time. Image tweaks here won't
              move LCP. */}
          <div className="flex justify-center mb-8">
            <Image
              src="/icon-512.png"
              alt="iFly app icon"
              width={96}
              height={96}
              priority
              className="rounded-[22px] shadow-2xl shadow-orange-500/20 ring-1 ring-white/10"
            />
          </div>

          <h1 className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tight">
            i<span className="text-gradient">Fly</span>
          </h1>

          <p className="text-xl sm:text-2xl font-semibold tracking-tight text-orange-400 mb-6">
            Dreamcast Emulator
          </p>

          <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Play classic Sega Dreamcast games on your iPhone, iPad, and Apple TV.
            Fast, JIT-less emulation built for Apple silicon. No jailbreak, no sideload hacks.
          </p>

          {/* Platform badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {['iPhone', 'iPad', 'Apple TV', 'iOS 17+', 'tvOS 17+', 'Free'].map(badge => (
              <Pill key={badge}>{badge}</Pill>
            ))}
          </div>

          {/* Primary CTAs — one filled, one neutral outline, so the beta is
              unambiguously the action being asked for. */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <GradientButton href="/testflight/">TestFlight Beta</GradientButton>
            <GradientButton href="/downloads/" variant="outline">Download IPA</GradientButton>
          </div>

          {/* Sideload sources — secondary row under the primary CTAs */}
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            <StoreBadge
              href={`altstore://source?url=${encodeURIComponent('https://ifly-emu.com/api/altstore')}`}
              eyebrow="Add to"
              label="AltStore"
              icon={<AltStoreIcon className="w-8 h-8" />}
              external
              data-proofer-ignore
            />
            <StoreBadge
              href={`sidestore://source?url=${encodeURIComponent('https://ifly-emu.com/api/sidestore')}`}
              eyebrow="Add to"
              label="SideStore"
              icon={<SideStoreIcon className="w-8 h-8" />}
              external
              data-proofer-ignore
            />
            <StoreBadge
              href="https://github.com/JoeMatt/iFly-releases/releases"
              eyebrow="Download from"
              label="GitHub"
              icon={<GitHubIcon className="w-6 h-6" />}
              external
            />
          </div>
        </div>
      </GridHero>

      {/* Stats row — reads as part of the hero, so it stays tight to it */}
      <Section spacing="tight">
        <div className="max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
          {([
            ['JIT-Free', 'Full Speed'],
            ['1K+', 'Metal Shaders'],
            ['3', 'Platforms'],
            ['Free', 'Open Source'],
          ] as const).map(([value, label]) => (
            <div key={label} className="text-center py-5 px-2 card-glass card-static">
              <div className="text-2xl font-black tracking-tight text-orange-400">{value}</div>
              <div className="text-xs font-semibold text-gray-400 mt-1.5 uppercase tracking-[0.14em]">{label}</div>
            </div>
          ))}
        </div>
      </Section>

      <VideoShowcase />

      {/* Download Section */}
      <DownloadSection className="py-16 md:py-24" />

      {/* Community + Donate */}
      <Section>
        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
          <div className="card-glass card-static p-6 md:p-8 text-center">
            <h2 className="text-xl font-semibold text-white mb-1.5">Community</h2>
            <p className="text-sm leading-relaxed text-gray-400 mb-6">Join for updates, tips, and support.</p>
            <div className="flex flex-col gap-3 items-center">
              <SocialButton href="https://discord.gg/QF5ZjVT4Sa" label="Join our Discord" leftIcon={<DiscordIcon className="w-5 h-5" />} variant="discord" />
              <SocialButton href="https://x.com/ProvenanceApp" label="Follow on X/Twitter" leftIcon={<XIcon className="w-5 h-5" />} variant="x" />
            </div>
          </div>
          <div className="card-glass card-static p-6 md:p-8 text-center">
            <h2 className="text-xl font-semibold text-white mb-1.5">Support Development</h2>
            <p className="text-sm leading-relaxed text-gray-400 mb-6">Help keep iFly free and actively developed.</p>
            <div className="flex flex-col gap-3 items-center">
              <SocialButton href="https://buymeacoffee.com/joemattiello" label="Buy Me a Coffee" leftIcon={<BmcIcon className="w-5 h-5" />} variant="bmc" />
              <SocialButton href="https://www.patreon.com/provenance" label="Support on Patreon" leftIcon={<PatreonIcon className="w-5 h-5" />} variant="patreon" />
            </div>
          </div>
        </div>
      </Section>

      <section id="screenshots" className="container mx-auto px-4 py-16">
        <h2 className="mb-5 text-center text-3xl font-bold text-white">See it in action</h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-sm text-gray-400">Actual app captures with homebrew games. Game files are imported separately.</p>
        <ScreenshotGallery device="iphone" title="iPhone" />
        <ScreenshotGallery device="ipad" title="iPad" />
        <ScreenshotGallery device="watch" title="Apple Watch Series 12" />
        <p className="text-center text-xs text-gray-400">Serpent XL is a derivative of <a href="https://github.com/jahan-addison/serpent" className="underline">Serpent</a>. <a href="/media/credits/serpent-xl-license.txt" className="underline">BSD license</a>.</p>
      </section>

      {/* Features */}
      <Section className="border-t border-white/10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Built for Apple silicon</h2>
          <p className="text-lg leading-relaxed text-gray-400 max-w-xl mx-auto">Optimized from the ground up for iPhone, iPad, and Apple TV.</p>
        </div>
        <Features compact />
        <div className="text-center mt-12">
          <Link
            href="/features/"
            className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 px-6 py-2.5 text-sm font-semibold text-orange-300 transition-colors hover:border-orange-500/70 hover:bg-orange-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            See all features
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Section>

    </div>
  );
}
