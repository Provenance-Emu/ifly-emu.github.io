import SocialButton, { DiscordIcon } from '@/components/SocialButton';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-orange-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Support & Help
          </h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Get Help with iFly
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
              Need assistance? Our community is here to help!
            </p>
            
            <div className="text-center mb-8">
              <SocialButton 
                href="https://discord.com/invite/4TK7PU5" 
                label="Join our Discord for Support" 
                leftIcon={<DiscordIcon className="w-6 h-6" />} 
                variant="discord"
                className="text-lg px-6 py-3"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Common Questions
              </h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">When will iFly be released?</h4>
                  <p>iFly is currently in active development. Follow our social media for release announcements.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Which devices are supported?</h4>
                  <p>iFly will support iPhone, iPad, and Apple TV running modern iOS and tvOS versions.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">What ROM formats are supported?</h4>
                  <p>iFly will support CDI, GDI, CHD, and other common Dreamcast ROM formats.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Getting Started
              </h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">System Requirements</h4>
                  <p>iOS 15.0+ or tvOS 15.0+ with sufficient storage space for games.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Controllers</h4>
                  <p>MFi controllers are recommended for the best gaming experience, though touch controls are available.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Legal ROMs</h4>
                  <p>Only use ROM files that you legally own. iFly does not provide or endorse piracy.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-100 dark:bg-orange-900 border border-orange-300 dark:border-orange-700 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-2">
              Reporting Issues
            </h3>
            <div className="text-orange-700 dark:text-orange-300">
              <p className="mb-2">
                Found a bug or have a feature request? Here&apos;s how to report it:
              </p>
              <ul className="space-y-1">
                <li>• Join our Discord and post in the appropriate channel</li>
                <li>• Include your device model and iOS/tvOS version</li>
                <li>• Describe the issue in detail with steps to reproduce</li>
                <li>• Attach screenshots or screen recordings if helpful</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}