import SocialButton, { BmcIcon, PatreonIcon } from '@/components/SocialButton';

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-orange-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Support iFly Development
          </h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Help Keep the Project Going
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-8 text-lg">
              iFly is developed as part of the Provenance EMU project, which is entirely free and open-source. 
              Your support helps cover development costs and keeps the project alive.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <SocialButton 
                href="https://buymeacoffee.com/joemattiello" 
                label="Buy Me a Coffee" 
                leftIcon={<BmcIcon className="w-6 h-6" />} 
                variant="bmc"
                className="text-lg px-6 py-3"
              />
              <SocialButton 
                href="https://patreon.com/provenanceemu" 
                label="Support on Patreon" 
                leftIcon={<PatreonIcon className="w-6 h-6" />} 
                variant="patreon"
                className="text-lg px-6 py-3"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                One-time Donations
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Support the project with a one-time contribution through Buy Me a Coffee.
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Quick and easy</li>
                <li>• No recurring charges</li>
                <li>• Every amount helps</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Monthly Support
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Become a patron and support ongoing development with monthly contributions.
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Steady development funding</li>
                <li>• Exclusive updates</li>
                <li>• Community recognition</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-orange-100 dark:bg-orange-900 border border-orange-300 dark:border-orange-700 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-2">
              Other Ways to Help
            </h3>
            <div className="text-orange-700 dark:text-orange-300">
              <ul className="space-y-1">
                <li>• Share iFly with friends and fellow retro gaming enthusiasts</li>
                <li>• Join our Discord and help other users</li>
                <li>• Report bugs and provide feedback</li>
                <li>• Contribute to the open-source codebase</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}