import Features from '@/components/Features';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-orange-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            iFly Features
          </h1>
          
          <div className="mb-12">
            <Features />
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Coming Soon
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Enhanced Features
                </h3>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                  <li>• VMU (Visual Memory Unit) support</li>
                  <li>• Network play capabilities</li>
                  <li>• Advanced graphics filters</li>
                  <li>• Custom control schemes</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Platform Specific
                </h3>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                  <li>• SharePlay support on Apple TV</li>
                  <li>• Handoff between devices</li>
                  <li>• iCloud save sync</li>
                  <li>• AirPlay streaming</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}