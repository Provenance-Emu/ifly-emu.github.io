import SocialButton, { DiscordIcon, XIcon, ItchIoIcon } from '@/components/SocialButton';

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-orange-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Links & Community
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Community Links */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Community
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Discord</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    Join our Discord server for real-time support, discussions, and updates.
                  </p>
                  <SocialButton 
                    href="https://discord.com/invite/4TK7PU5" 
                    label="Join Discord" 
                    leftIcon={<DiscordIcon className="w-5 h-5" />} 
                    variant="discord" 
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">X/Twitter</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    Follow @ProvenanceApp for news and announcements.
                  </p>
                  <SocialButton 
                    href="https://x.com/ProvenanceApp" 
                    label="Follow on X" 
                    leftIcon={<XIcon className="w-5 h-5" />} 
                    variant="x" 
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">itch.io</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    Find us on itch.io for alternative downloads and updates.
                  </p>
                  <SocialButton 
                    href="https://provenance-emu.itch.io" 
                    label="Visit itch.io" 
                    leftIcon={<ItchIoIcon className="w-5 h-5" />} 
                    variant="default" 
                  />
                </div>
              </div>
            </div>
            
            {/* Useful Resources */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Resources
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Documentation</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Coming soon: User guides, troubleshooting, and FAQ.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Source Code</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    iFly is part of the open-source Provenance EMU project.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Dreamcast Resources</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Learn about the Dreamcast console and its game library.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}