import React from 'react';
import ItchIoEmbed from './ItchIoEmbed';

interface DownloadSectionProps {
  className?: string;
  showEmbed?: boolean;
}

const DownloadSection: React.FC<DownloadSectionProps> = ({ className, showEmbed = false }) => {
  return (
    <section className={`container mx-auto px-4 py-8 ${className || ''}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Download iFly
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Get iFly Dreamcast emulator for your iOS devices and Apple TV.
        </p>

        {/* Coming Soon Notice */}
        <div className="bg-orange-100 dark:bg-orange-900 border border-orange-300 dark:border-orange-700 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-2">
            Coming Soon
          </h3>
          <p className="text-orange-700 dark:text-orange-300">
            iFly is currently in development. Check back soon for download links and installation instructions.
          </p>
        </div>

        {/* Placeholder for future download options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto opacity-50">
          <div className="bg-black text-white px-6 py-3 rounded-lg cursor-not-allowed">
            <div className="flex items-center justify-center">
              <span className="text-xs">Download on the</span>
            </div>
            <div className="text-lg font-semibold">App Store</div>
          </div>
          <div className="bg-black text-white px-6 py-3 rounded-lg cursor-not-allowed">
            <div className="flex items-center justify-center">
              <span className="text-xs">Available on</span>
            </div>
            <div className="text-lg font-semibold">Apple TV</div>
          </div>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          * Coming to the App Store and Apple TV App Store
        </p>

        {/* Itch.io embed placeholder for future releases */}
        {showEmbed && (
          <div className="mt-8">
            <ItchIoEmbed />
          </div>
        )}
      </div>
    </section>
  );
};

export default DownloadSection;