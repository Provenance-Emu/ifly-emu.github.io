import type { Metadata } from 'next';
import Image from 'next/image';
import iphone1 from '@/images/screenshots/ios/iphone1-library.webp';
import iphone2 from '@/images/screenshots/ios/iphone2-settings.webp';
import iphone3 from '@/images/screenshots/ios/iphone3-emu.webp';
import ipad1 from '@/images/screenshots/ipad/ipad1-library.webp';
import ipad2 from '@/images/screenshots/ipad/ipad2-search.webp';
import ipad3 from '@/images/screenshots/ipad/ipad3-shaders.webp';
import ipad4 from '@/images/screenshots/ipad/ipad4-emu.webp';
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

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950">

      {/* Hero */}
      <section className="relative container mx-auto px-4 pt-20 pb-16 text-center overflow-hidden">
        {/* Radial glow */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-orange-600/5 blur-2xl" />
        </div>
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

          <h1 className="text-6xl md:text-7xl font-black text-white mb-3 tracking-tight">
            i<span className="text-orange-500">Fly</span>
          </h1>

          <p className="text-2xl md:text-3xl font-semibold text-orange-400 mb-5">
            Dreamcast Emulator
          </p>

          <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed">
            Play classic Sega Dreamcast games on your iPhone, iPad, and Apple TV.
            Fast, JIT-less emulation built for Apple silicon. No jailbreak, no sideload hacks.
          </p>

          {/* Platform badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {['iPhone', 'iPad', 'Apple TV', 'iOS 15.6+', 'tvOS 16.6+', 'Free'].map(badge => (
              <span
                key={badge}
                className="bg-gray-800 text-gray-300 text-sm px-3 py-1 rounded-full border border-gray-700"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/testflight/"
              className="bg-orange-700 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-orange-700/25"
            >
              TestFlight Beta
            </Link>
            <Link
              href="/downloads/"
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-colors border border-gray-700"
            >
              Download IPA
            </Link>
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
          {([
            ['JIT-Free', 'Full Speed'],
            ['1K+', 'Metal Shaders'],
            ['3', 'Platforms'],
            ['Free', 'Open Source'],
          ] as const).map(([value, label]) => (
            <div key={label} className="text-center py-4 px-2 bg-gray-900 border border-gray-800 rounded-xl">
              <div className="text-xl font-black text-orange-400">{value}</div>
              <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Download Section */}
      <DownloadSection className="pb-4" showEmbed />

      {/* Community + Donate */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Community</h2>
            <p className="text-gray-400 text-sm mb-5">Join for updates, tips, and support.</p>
            <div className="flex flex-col gap-3 items-center">
              <SocialButton href="https://discord.gg/QF5ZjVT4Sa" label="Join our Discord" leftIcon={<DiscordIcon className="w-5 h-5" />} variant="discord" />
              <SocialButton href="https://x.com/ProvenanceApp" label="Follow on X/Twitter" leftIcon={<XIcon className="w-5 h-5" />} variant="x" />
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Support Development</h2>
            <p className="text-gray-400 text-sm mb-5">Help keep iFly free and actively developed.</p>
            <div className="flex flex-col gap-3 items-center">
              <SocialButton href="https://buymeacoffee.com/joemattiello" label="Buy Me a Coffee" leftIcon={<BmcIcon className="w-5 h-5" />} variant="bmc" />
              <SocialButton href="https://www.patreon.com/provenance" label="Support on Patreon" leftIcon={<PatreonIcon className="w-5 h-5" />} variant="patreon" />
            </div>
          </div>
        </div>
      </section>

      {/* Video Showcase — drop MP4 at public/video/gameplay.mp4 to activate */}
      <VideoShowcase />

      {/* Screenshots */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">See It In Action</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Classic Dreamcast games on your iPhone, iPad, and Apple TV.</p>
        </div>

        {/* iPhone */}
        <div className="mb-16">
          <h3 className="flex items-center justify-center gap-2 text-lg font-semibold text-gray-300 mb-6">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-400" aria-hidden="true"><path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm5 18a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"/></svg>
            iPhone
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {([
              [iphone1, 'iFly iPhone – game library'],
              [iphone2, 'iFly iPhone – settings'],
              [iphone3, 'iFly iPhone – gameplay'],
            ] as const).map(([img, alt], idx) => (
              <DeviceFrame key={`iphone-${idx}`} type="iphone" src={img} alt={alt} priority={idx === 0} />
            ))}
          </div>
        </div>

        {/* iPad */}
        <div className="mb-16">
          <h3 className="flex items-center justify-center gap-2 text-lg font-semibold text-gray-300 mb-6">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-400" aria-hidden="true"><path d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 18a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"/></svg>
            iPad
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {([
              [ipad1, 'iFly iPad – game library'],
              [ipad2, 'iFly iPad – search'],
              [ipad3, 'iFly iPad – Metal shaders'],
              [ipad4, 'iFly iPad – gameplay'],
            ] as const).map(([img, alt], idx) => (
              <DeviceFrame key={`ipad-${idx}`} type="ipad" src={img} alt={alt} />
            ))}
          </div>
        </div>

        {/* Apple TV */}
        <div>
          <h3 className="flex items-center justify-center gap-2 text-lg font-semibold text-gray-300 mb-6">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-400" aria-hidden="true"><path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm8 13h4v1H10v-1Z"/></svg>
            Apple TV
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {([
              [tvos1, 'iFly Apple TV – game library'],
              [tvos2, 'iFly Apple TV – gameplay'],
              [tvos3, 'iFly Apple TV – cheat codes'],
              [tvos4, 'iFly Apple TV – settings and themes'],
            ] as const).map(([img, alt], idx) => (
              <DeviceFrame key={`appletv-${idx}`} type="appletv" src={img} alt={alt} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-gray-800/60 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Built for Apple silicon</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Optimized from the ground up for iPhone, iPad, and Apple TV.</p>
          </div>
          <Features compact />
          <div className="text-center mt-8">
            <Link href="/features/" className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">
              See all features →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
