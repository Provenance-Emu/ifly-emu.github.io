import type { Metadata } from 'next';
import Link from 'next/link';
import Features from '@/components/Features';
import SocialButton, { DiscordIcon, XIcon } from '@/components/SocialButton';

export const metadata: Metadata = {
  title: 'Features',
  description: 'Full feature list for iFly Dreamcast emulator: MFi/PS/Xbox/Switch controller support, Metal shaders, save states, automatic cheat downloads, ARM64 optimized interpreter, and more.',
  alternates: { canonical: 'https://ifly-emu.com/features/' },
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
            Features
          </h1>
          <p className="text-gray-400 mb-10 text-center max-w-3xl mx-auto">
            A modern Dreamcast emulation experience tailored for iPhone, iPad, and Apple TV. iFly focuses on smooth
            performance, robust controller support, and a clean interface designed for iOS and tvOS.
          </p>

          <Features />

          {/* Bottom CTAs */}
          <div className="mt-14 bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Join the Community</h2>
            <p className="text-gray-400 text-sm mb-6">Get help, share tips, and stay updated on new releases.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <SocialButton href="https://discord.gg/4TK7PU5" label="Join our Discord" leftIcon={<DiscordIcon className="w-5 h-5" />} variant="discord" />
              <SocialButton href="https://x.com/ProvenanceApp" label="Follow on X/Twitter" leftIcon={<XIcon className="w-5 h-5" />} variant="x" />
            </div>
            <Link href="/" className="text-sm text-orange-400 hover:text-orange-300 font-medium transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
