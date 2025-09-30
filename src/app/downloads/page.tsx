import DownloadSection from '@/components/DownloadSection';

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-orange-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Download iFly
          </h1>
          
          <DownloadSection showEmbed />
          
          <div className="mt-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Installation Guide
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Once iFly is released, you&apos;ll be able to install it through the following methods:
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li><strong>App Store:</strong> The easiest way to install iFly on your iOS devices.</li>
                  <li><strong>Apple TV App Store:</strong> Direct installation on your Apple TV.</li>
                  <li><strong>Sideloading:</strong> For development builds and beta versions.</li>
                </ol>
                <div className="bg-orange-100 dark:bg-orange-900 border border-orange-300 dark:border-orange-700 rounded-lg p-4 mt-6">
                  <p className="text-orange-800 dark:text-orange-200">
                    <strong>Note:</strong> iFly is currently in development. Check back soon for release announcements!
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