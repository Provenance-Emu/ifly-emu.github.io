import type { Metadata } from 'next';
import Image from 'next/image';
import iphone1 from '@/images/screenshots/ios/iphone1-library.jpg';
import iphone2 from '@/images/screenshots/ios/iphone2-settings.png';
import iphone3 from '@/images/screenshots/ios/iphone3-emu.png';
import ipad1 from '@/images/screenshots/ipad/ipad1-library.jpg';
import ipad2 from '@/images/screenshots/ipad/ipad2-search.jpg';
import DownloadSection from '@/components/DownloadSection';
import SocialButton, { DiscordIcon, XIcon, BmcIcon, PatreonIcon } from '@/components/SocialButton';
import Features from '@/components/Features';
import tvos1 from '@/images/screenshots/tvos/tvos-library.png';
import tvos2 from '@/images/screenshots/tvos/tvos-gameplay.png';
import tvos3 from '@/images/screenshots/tvos/tvos-cheats.png';
import tvos4 from '@/images/screenshots/tvos/tvos-settings-themes.png';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'iFly – Dreamcast Emulator for iOS & tvOS',
  description: 'Play classic Sega Dreamcast games on your iPhone, iPad, and Apple TV. Free, open-source emulation with Metal shaders, MFi controller support, save states, and automatic cheat downloads.',
  alternates: { canonical: 'https://ifly-emu.com/' },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">

      {/* Hero */}
      <section className="container mx-auto px-4 pt-20 pb-16 text-center">
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
            Fast, accurate emulation built for Apple silicon.
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

      {/* Download Section */}
      <DownloadSection className="pb-4" showEmbed />

      {/* Community */}
      <section className="container mx-auto px-4 pb-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Community</h2>
          <p className="text-gray-400 mb-6">Join for updates, tips, and support.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <SocialButton href="https://discord.com/invite/4TK7PU5" label="Join our Discord" leftIcon={<DiscordIcon className="w-5 h-5" />} variant="discord" />
            <SocialButton href="https://x.com/ProvenanceApp" label="Follow on X/Twitter" leftIcon={<XIcon className="w-5 h-5" />} variant="x" />
          </div>
        </div>
      </section>

      {/* Support Development */}
      <section className="container mx-auto px-4 pb-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Support Development</h2>
          <p className="text-gray-400 mb-6">If you find iFly helpful, consider supporting the project.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <SocialButton href="https://buymeacoffee.com/joemattiello" label="Buy Me a Coffee" leftIcon={<BmcIcon className="w-5 h-5" />} variant="bmc" />
            <SocialButton href="https://patreon.com/provenanceemu" label="Support on Patreon" leftIcon={<PatreonIcon className="w-5 h-5" />} variant="patreon" />
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Screenshots</h2>

        {/* iPhone */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-gray-300 mb-6 text-center">iPhone</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[iphone1, iphone2, iphone3].map((img, idx) => (
              <div key={`iphone-${idx}`} className="bg-gray-800 rounded-2xl p-3 shadow-xl ring-1 ring-white/5">
                <div className="rounded-xl overflow-hidden w-52 h-[22rem]">
                  <Image
                    src={img}
                    alt={`iFly iPhone screenshot ${idx + 1}`}
                    className="h-full w-full object-cover"
                    sizes="208px"
                    priority={idx === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* iPad */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-gray-300 mb-6 text-center">iPad</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[ipad1, ipad2].map((img, idx) => (
              <div key={`ipad-${idx}`} className="bg-gray-800 rounded-2xl p-3 shadow-xl ring-1 ring-white/5">
                <div className="rounded-xl overflow-hidden w-[340px] h-[260px]">
                  <Image
                    src={img}
                    alt={`iFly iPad screenshot ${idx + 1}`}
                    className="h-full w-full object-cover"
                    sizes="340px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Apple TV */}
        <div>
          <h3 className="text-xl font-semibold text-gray-300 mb-6 text-center">Apple TV</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[tvos1, tvos2, tvos3, tvos4].map((img, idx) => (
              <div key={`appletv-${idx}`} className="bg-gray-800 rounded-2xl p-3 shadow-xl ring-1 ring-white/5">
                <div className="rounded-xl overflow-hidden w-80 aspect-video">
                  <Image
                    src={img}
                    alt={`iFly Apple TV screenshot ${idx + 1}`}
                    className="h-full w-full object-cover"
                    sizes="320px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-900/50 border-t border-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Features</h2>
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
