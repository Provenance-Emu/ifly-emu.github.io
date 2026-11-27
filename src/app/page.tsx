import SharedMediaHero from '@provenance-emu/web-media/hero';
import MediaGallery from '@provenance-emu/web-media/gallery';
import type { Metadata } from 'next';
import Section from '@/components/ui/Section';
import GradientButton from '@/components/ui/GradientButton';
import DownloadSection from '@/components/DownloadSection';
import SocialButton, { DiscordIcon, XIcon, BmcIcon, PatreonIcon } from '@/components/SocialButton';
import FeatureSpotlight from '@/components/FeatureSpotlight';
import VideoShowcase from '@/components/VideoShowcase';
import { galleryGroups } from '@/data/gallery';

export const metadata: Metadata = {
  title: 'iFly – Dreamcast Emulator for iOS & tvOS',
  description: 'Play classic Sega Dreamcast games on your iPhone, iPad, and Apple TV. Free, open-source emulation with Metal shaders, MFi controller support, save states, and automatic cheat downloads.',
  alternates: { canonical: 'https://ifly-emu.com/' },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-ink">

      <SharedMediaHero
        brand="fly"
        title="Dreamcast, in your hands."
        description="Play Dreamcast, NAOMI, NAOMI 2, and Atomiswave on iPhone, iPad, and Apple TV."
        primary={{ src: '/video/hero/gravity-wave.mp4', poster: '/video/hero/gravity-wave.webp', label: 'Gravity Wave · Dreamcast', width: 576, height: 432 }}
        companion={{ src: '/video/hero/live-vmu.mp4', poster: '/video/hero/live-vmu.webp', label: 'Live VMU · Apple Watch', width: 416, height: 496 }}
        detail="Apple Watch VMU is a Plus feature in the App Store edition."
        actions={<>
          <GradientButton href="/testflight/">TestFlight Beta</GradientButton>
          <GradientButton href="/downloads/" variant="outline">Download IPA</GradientButton>
        </>}
      />

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

      <section id="screenshots" className="container mx-auto scroll-mt-20 px-4 py-12 md:py-16">
        <h2 className="mb-5 text-center text-3xl font-bold text-white">See it in action</h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-sm text-gray-400">Actual app captures with homebrew games. Game files are imported separately.</p>
        <MediaGallery brand="fly" groups={galleryGroups} />
        <p className="mt-8 text-center text-xs text-gray-400">Serpent XL is a derivative of <a href="https://github.com/jahan-addison/serpent" className="underline">Serpent</a>. <a href="/media/credits/serpent-xl-license.txt" className="underline">BSD license</a>.</p>
      </section>

      <section className="border-y border-white/10 bg-white/[.035]">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <FeatureSpotlight
            title="Pick up where you left off."
            description="Browse Dreamcast and arcade games, jump back into a recent run, and see your save states in one place."
            href="/features/"
            linkLabel="Explore features"
          />
        </div>
      </section>

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

    </div>
  );
}
