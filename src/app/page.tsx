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
import DeviceFrame from '@/components/DeviceFrame';
import VideoShowcase from '@/components/VideoShowcase';
import Link from 'next/link';
import { screenshots } from '@/data/screenshots';

export const metadata: Metadata = {
  title: 'iFly – Dreamcast Emulator for iOS & tvOS',
  description: 'Play classic Sega Dreamcast games on your iPhone, iPad, and Apple TV. Free, open-source emulation with Metal shaders, MFi controller support, save states, and automatic cheat downloads.',
  alternates: { canonical: 'https://ifly-emu.com/' },
};

/* Screenshot galleries. Below `lg` these are swipeable snap rails — six phone
   frames stacked vertically is a wall, one row you flick through is a
   showcase. At `lg` and up the rail becomes a centred wrap capped at max-w-3xl
   (48rem = 768px), which lands the iPhones as a 3x2 block and the iPad/Apple TV
   sets as 2x2, so every frame is visible without a gesture on desktop.
   Frame widths come from DeviceFrame: iPhone w-56 (224px), iPad 360px,
   Apple TV w-80 (320px); with gap-6 (24px) the rows measure 720 / 744 / 664px,
   all inside the 768px cap.
   The breakpoint is `lg`, not `md`: Tailwind's `container` is capped at 48rem
   in the md band, so the usable inner width there is 768 - 32 = 736px and the
   744px iPad row would wrap to one per line. */
const galleryRail =
  '-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 ' +
  'lg:mx-auto lg:max-w-3xl lg:flex-wrap lg:justify-center lg:gap-y-8 lg:overflow-visible lg:px-0 lg:pb-0 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400';

const galleryFrame = 'shrink-0 snap-center';

/* Centred group label with hairlines, so each platform block announces itself
   without competing with the section heading. */
function PlatformLabel({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <h3 className="mb-8 flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-gray-300">
      <span aria-hidden="true" className="hidden h-px w-10 bg-gradient-to-r from-transparent to-white/20 sm:block" />
      <span className="flex items-center gap-2">
        {icon}
        {children}
      </span>
      <span aria-hidden="true" className="hidden h-px w-10 bg-gradient-to-l from-transparent to-white/20 sm:block" />
    </h3>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-ink">

      {/* Hero */}
      <GridHero className="pt-20 pb-12 text-center">
        <div className="max-w-3xl mx-auto">

          {/* App icon — priority ensures it's preloaded as the LCP element */}
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
            {['iPhone', 'iPad', 'Apple TV', 'iOS 15.6+', 'tvOS 16.6+', 'Free'].map(badge => (
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
              href="https://github.com/Provenance-Emu/Provenance"
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

      {/* Video Showcase — drop MP4 at public/video/gameplay.mp4 to activate */}
      <VideoShowcase />

      {/* Screenshots */}
      <Section tone="ink-2">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-4">See It In Action</h2>
          <p className="text-lg leading-relaxed text-gray-400 max-w-xl mx-auto">Classic Dreamcast games on your iPhone, iPad, and Apple TV.</p>
        </div>

        {/* iPhone — from the screenshots manifest (src/data/screenshots.json),
            up to 6 items in manifest order. */}
        <div className="mb-16 md:mb-20">
          <PlatformLabel
            icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-orange-400" aria-hidden="true"><path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm5 18a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"/></svg>}
          >
            iPhone
          </PlatformLabel>
          <div className={galleryRail} role="group" aria-label="iPhone screenshots" tabIndex={0}>
            {screenshots('iphone').slice(0, 6).map((item, idx) => (
              <DeviceFrame
                key={item.id}
                type="iphone"
                src={item.webp}
                alt={item.alt}
                width={item.width}
                height={item.height}
                priority={idx === 0}
                className={galleryFrame}
              />
            ))}
          </div>
        </div>

        {/* iPad — from the manifest, up to 4 items in manifest order. */}
        <div className="mb-16 md:mb-20">
          <PlatformLabel
            icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-orange-400" aria-hidden="true"><path d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 18a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"/></svg>}
          >
            iPad
          </PlatformLabel>
          <div className={galleryRail} role="group" aria-label="iPad screenshots" tabIndex={0}>
            {screenshots('ipad').slice(0, 4).map((item) => (
              <DeviceFrame
                key={item.id}
                type="ipad"
                src={item.webp}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className={galleryFrame}
              />
            ))}
          </div>
        </div>

        {/* Apple TV — from the manifest, up to 4 items in manifest order. */}
        <div>
          <PlatformLabel
            icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-orange-400" aria-hidden="true"><path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm8 13h4v1H10v-1Z"/></svg>}
          >
            Apple TV
          </PlatformLabel>
          <div className={galleryRail} role="group" aria-label="Apple TV screenshots" tabIndex={0}>
            {screenshots('appletv').slice(0, 4).map((item) => (
              <DeviceFrame
                key={item.id}
                type="appletv"
                src={item.webp}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className={galleryFrame}
              />
            ))}
          </div>
        </div>
      </Section>

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
