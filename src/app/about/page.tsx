export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-orange-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            About iFly
          </h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              What is iFly?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              iFly is a Dreamcast emulator designed specifically for iOS and tvOS devices. 
              Built as part of the Provenance EMU project, iFly brings the magic of Sega&apos;s 
              final console to your iPhone, iPad, and Apple TV.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              The Dreamcast Legacy
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              The Sega Dreamcast, released in 1998, was ahead of its time with features like 
              built-in internet connectivity and innovative games. Despite its commercial 
              failure, it left behind an incredible library of games that deserve to be 
              preserved and enjoyed by new generations.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Development Status
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              iFly is currently in active development. We&apos;re working hard to bring you the 
              best possible Dreamcast emulation experience on iOS and tvOS devices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}