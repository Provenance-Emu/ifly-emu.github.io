import type { Metadata } from 'next';
import Link from 'next/link';
import DownloadSection from '@/components/DownloadSection';
import SocialButton, { DiscordIcon, XIcon, BmcIcon, PatreonIcon } from '@/components/SocialButton';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about iFly, a Dreamcast emulator for iOS and tvOS. Platform support, system requirements, and the story behind the project.',
  alternates: { canonical: 'https://ifly-emu.com/about/' },
};

export default function About() {
  return (
    <div className="min-h-screen bg-ink">
      <PageHeader title="About iFly" />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="card-glass p-8 mb-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              What is iFly?
            </h2>
            <p className="text-gray-400 mb-6">
              iFly is a Dreamcast emulator for iOS and tvOS. Fast, JIT-less Dreamcast performance
              on iPhone, iPad, and Apple TV, built on Flycast and optimized from the ground up
              for Apple silicon. From the creator of Provenance EMU (388k+ App Store downloads,
              6,300+ GitHub stars).
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">
              Built for Speed Without JIT
            </h2>
            <p className="text-gray-400 mb-6">
              iFly runs at full speed on modern iPhones and Apple TV without requiring JIT compilation,
              jailbreak, or sideload workarounds. The ARM64-optimized interpreter handles Dreamcast
              workloads natively on Apple silicon. 1,000+ Metal shaders for CRT effects, scanlines,
              and visual filters, all running at native frame rates.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">
              Platform Support
            </h2>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {([
                ['iPhone', 'Optimized touch controls and responsive design', 'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm5 18a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z'],
                ['iPad', 'Larger screen experience with enhanced controls', 'M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 18a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z'],
                ['Apple TV', 'Big screen gaming with controller support', 'M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm8 13h4v1H10v-1Z'],
              ] as const).map(([name, desc, path]) => (
                <div key={name} className="flex flex-col items-center text-center p-5 card-glass">
                  <div className="w-11 h-11 rounded-xl bg-orange-500/10 ring-1 ring-orange-500/20 flex items-center justify-center text-orange-400 mb-3">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true"><path d={path} /></svg>
                  </div>
                  <h3 className="font-semibold text-white mb-1">{name}</h3>
                  <p className="text-sm text-gray-400">{desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-semibold text-white mb-4">
              Key Features
            </h2>
            <ul className="space-y-2 text-gray-400 mb-4">
              {['MFi, PlayStation, Xbox, and Switch controller support', '1,000+ native Metal shaders for visual quality and performance', 'ARM64-optimized interpreter for fast JIT-less performance', 'Save states and pause menu with quick in-game toggles', 'Automatic artwork and cheat code downloads', 'Smart search, filters, and full game library management'].map(item => (
                <li key={item} className="flex gap-2"><span className="text-orange-500 mt-1">•</span><span>{item}</span></li>
              ))}
            </ul>
            <Link href="/features/" className="text-sm text-orange-400 hover:text-orange-300 font-medium transition-colors">
              See full feature list →
            </Link>

            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              System Requirements
            </h2>
            <div className="card-glass p-4">
              <ul className="text-gray-400 space-y-1.5">
                <li><span className="font-medium text-gray-300">iOS:</span> iOS 15.6 or later</li>
                <li><span className="font-medium text-gray-300">tvOS:</span> tvOS 16.6 or later</li>
                <li><span className="font-medium text-gray-300">Device:</span> iPhone 12 or newer, iPad (6th generation) or newer, Apple TV 4K with JIT support</li>
                <li><span className="font-medium text-gray-300">Recommendation:</span> Newer devices recommended for best performance</li>
                <li><span className="font-medium text-gray-300">Storage:</span> Varies by game size</li>
              </ul>
            </div>
          </div>

          <DownloadSection className="mt-8" showEmbed />

          {/* Community + Donate */}
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="card-glass p-6 text-center">
              <h2 className="text-xl font-bold text-white mb-2">Community</h2>
              <p className="text-gray-400 text-sm mb-5">Join for updates, tips, and support.</p>
              <div className="flex flex-col gap-3 items-center">
                <SocialButton href="https://discord.gg/QF5ZjVT4Sa" label="Join our Discord" leftIcon={<DiscordIcon className="w-5 h-5" />} variant="discord" />
                <SocialButton href="https://x.com/ProvenanceApp" label="Follow on X/Twitter" leftIcon={<XIcon className="w-5 h-5" />} variant="x" />
              </div>
            </div>
            <div className="card-glass p-6 text-center">
              <h2 className="text-xl font-bold text-white mb-2">Support Development</h2>
              <p className="text-gray-400 text-sm mb-5">Help keep iFly free and improving.</p>
              <div className="flex flex-col gap-3 items-center">
                <SocialButton href="https://buymeacoffee.com/joemattiello" label="Buy Me a Coffee" leftIcon={<BmcIcon className="w-5 h-5" />} variant="bmc" />
                <SocialButton href="https://www.patreon.com/provenance" label="Support on Patreon" leftIcon={<PatreonIcon className="w-5 h-5" />} variant="patreon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
