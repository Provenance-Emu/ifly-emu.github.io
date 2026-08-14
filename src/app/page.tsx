import type { Metadata } from 'next';
import Image from 'next/image';
import GridHero from '@/components/ui/GridHero';
import Section from '@/components/ui/Section';
import GradientButton from '@/components/ui/GradientButton';
import { Pill } from '@/components/ui/Badge';
import iphone1 from '@/images/screenshots/ios/iphone1-library.webp';
import iphone2 from '@/images/screenshots/ios/iphone2-settings.webp';
import iphone3 from '@/images/screenshots/ios/iphone3-emu.webp';
import iphone4 from '@/images/screenshots/ios/iphone4-pause.webp';
import iphone6 from '@/images/screenshots/ios/iphone6-themes.webp';
import iphone7 from '@/images/screenshots/ios/iphone7-3d.webp';
import ipad1 from '@/images/screenshots/ipad/ipad1-library.webp';
import ipad2 from '@/images/screenshots/ipad/ipad2-search.webp';
import ipad3 from '@/images/screenshots/ipad/ipad3-shaders.webp';
import ipad5 from '@/images/screenshots/ipad/ipad5-arcade.webp';
import DownloadSection from '@/components/DownloadSection';
import SocialButton, { DiscordIcon, XIcon, BmcIcon, PatreonIcon } from '@/components/SocialButton';
import Features from '@/components/Features';
import DeviceFrame from '@/components/DeviceFrame';
import VideoShowcase from '@/components/VideoShowcase';
import tvos1 from '@/images/screenshots/tvos/tvos-library.webp';
import tvos2 from '@/images/screenshots/tvos/tvos-gameplay.webp';
import tvos3 from '@/images/screenshots/tvos/tvos-cheats.webp';
import tvos4 from '@/images/screenshots/tvos/tvos-settings-themes.webp';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'iFly – Dreamcast Emulator for iOS & tvOS',
  description: 'Play classic Sega Dreamcast games on your iPhone, iPad, and Apple TV. Free, open-source emulation with Metal shaders, MFi controller support, save states, and automatic cheat downloads.',
  alternates: { canonical: 'https://ifly-emu.com/' },
};

/* Screenshot galleries. Below `md` these are swipeable snap rails — six phone
   frames stacked vertically is a wall, one row you flick through is a
   showcase. At `md` and up the rail becomes a centred wrap capped at max-w-3xl,
   which lands the iPhones as a 3x2 block and the iPad/Apple TV sets as 2x2, so
   every frame is visible without a gesture on desktop. */
const galleryRail =
  '-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 ' +
  'md:mx-auto md:max-w-3xl md:flex-wrap md:justify-center md:gap-y-8 md:overflow-visible md:px-0 md:pb-0 ' +
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
              <div className="text-[11px] font-semibold text-gray-400 mt-1.5 uppercase tracking-[0.14em]">{label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Download Section */}
      <DownloadSection className="py-16 md:py-24" showEmbed />

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

        {/* iPhone — library, gameplay, settings, 3D, pause, themes. Ordered so
            no two consecutive frames show the same kind of screen. */}
        <div className="mb-16 md:mb-20">
          <PlatformLabel
            icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-orange-400" aria-hidden="true"><path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm5 18a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"/></svg>}
          >
            iPhone
          </PlatformLabel>
          <div className={galleryRail} role="group" aria-label="iPhone screenshots" tabIndex={0}>
            {([
              [iphone1, 'iFly iPhone – game library'],
              [iphone3, 'iFly iPhone – gameplay'],
              [iphone2, 'iFly iPhone – settings'],
              [iphone7, 'iFly iPhone – 3D gameplay in a snowy mountain landscape with on-screen touch controls'],
              [iphone4, 'iFly iPhone – pause menu with save-state slots, quick save, and controller-skin settings'],
              [iphone6, 'iFly iPhone – game library with green accent theming'],
            ] as const).map(([img, alt], idx) => (
              <DeviceFrame key={`iphone-${idx}`} type="iphone" src={img} alt={alt} priority={idx === 0} className={galleryFrame} />
            ))}
          </div>
        </div>

        {/* iPad */}
        <div className="mb-16 md:mb-20">
          <PlatformLabel
            icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-orange-400" aria-hidden="true"><path d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 18a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"/></svg>}
          >
            iPad
          </PlatformLabel>
          <div className={galleryRail} role="group" aria-label="iPad screenshots" tabIndex={0}>
            {([
              [ipad1, 'iFly iPad – game library'],
              [ipad3, 'iFly iPad – Metal shaders'],
              [ipad2, 'iFly iPad – search'],
              [ipad5, 'iFly iPad – NAOMI arcade board booting with a CRT shader, performance HUD, and arcade-style touch controls'],
            ] as const).map(([img, alt], idx) => (
              <DeviceFrame key={`ipad-${idx}`} type="ipad" src={img} alt={alt} className={galleryFrame} />
            ))}
          </div>
        </div>

        {/* Apple TV */}
        <div>
          <PlatformLabel
            icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-orange-400" aria-hidden="true"><path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm8 13h4v1H10v-1Z"/></svg>}
          >
            Apple TV
          </PlatformLabel>
          <div className={galleryRail} role="group" aria-label="Apple TV screenshots" tabIndex={0}>
            {([
              [tvos1, 'iFly Apple TV – game library'],
              [tvos2, 'iFly Apple TV – gameplay'],
              [tvos3, 'iFly Apple TV – cheat codes'],
              [tvos4, 'iFly Apple TV – settings and themes'],
            ] as const).map(([img, alt], idx) => (
              <DeviceFrame key={`appletv-${idx}`} type="appletv" src={img} alt={alt} className={galleryFrame} />
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
