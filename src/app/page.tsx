import DownloadSection from '@/components/DownloadSection';
import SocialButton, { DiscordIcon, XIcon, BmcIcon, PatreonIcon, ItchIoIcon } from '@/components/SocialButton';
import Features from '@/components/Features';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-orange-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            iFly
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4">
            Dreamcast Emulator for iOS & tvOS
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Experience classic Sega Dreamcast games on your iOS devices and Apple TV.
            Relive the magic of games like Shenmue, Jet Set Radio, and Crazy Taxi.
          </p>

          {/* Placeholder for app screenshots or promotional images */}
          <div className="mb-16">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-8 shadow-lg mx-auto max-w-2xl">
              <div className="aspect-video bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🎮</div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Screenshots coming soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <DownloadSection className="pb-4" showEmbed />

      {/* Community Section */}
      <section className="container mx-auto px-4 pb-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Community</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Join the Provenance EMU community for updates, tips, and support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            <SocialButton href="https://discord.com/invite/4TK7PU5" label="Join our Discord" leftIcon={<DiscordIcon className="w-5 h-5" />} variant="discord" />
            <SocialButton href="https://x.com/ProvenanceApp" label="Follow on X/Twitter" leftIcon={<XIcon className="w-5 h-5" />} variant="x" />
          </div>
          <div className="flex justify-center">
            <SocialButton href="https://provenance-emu.itch.io" label="Find us on itch.io" leftIcon={<ItchIoIcon className="w-5 h-5" />} variant="default" />
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section className="container mx-auto px-4 pb-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Support Development</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">If you find iFly helpful, consider supporting the project.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <SocialButton href="https://buymeacoffee.com/joemattiello" label="Buy Me a Coffee" leftIcon={<BmcIcon className="w-5 h-5" />} variant="bmc" />
            <SocialButton href="https://patreon.com/provenanceemu" label="Support on Patreon" leftIcon={<PatreonIcon className="w-5 h-5" />} variant="patreon" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Features
          </h2>
          <Features compact />
          <div className="text-center mt-8">
            <a href="/features" className="text-orange-600 dark:text-orange-400 hover:underline font-semibold">See all features →</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-4">iFly</h3>
            <p className="text-gray-400 mb-4">
              Dreamcast emulator for iOS and tvOS. Part of the Provenance EMU project.
            </p>
            <div className="flex justify-center space-x-4 text-sm text-gray-400">
              <a href="/about" className="hover:text-white">About</a>
              <a href="/support" className="hover:text-white">Support</a>
              <a href="/links" className="hover:text-white">Links</a>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              © 2025 Provenance EMU. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}