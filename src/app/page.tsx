import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="w-full bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">iFly</h1>
          <p className="text-2xl md:text-3xl mb-4">Dreamcast Emulator for iOS & tvOS</p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Experience classic Sega Dreamcast games on your iPhone, iPad, and Apple TV.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="#download" className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700">
              Download
            </Link>
            <Link href="/features" className="border-2 border-gray-300 dark:border-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800">
              Features
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why iFly?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Accurate</h3>
              <p className="text-gray-600 dark:text-gray-400">High compatibility with Dreamcast games</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Fast</h3>
              <p className="text-gray-600 dark:text-gray-400">Optimized for modern iOS devices</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🎮</div>
              <h3 className="text-xl font-bold mb-2">Controllers</h3>
              <p className="text-gray-600 dark:text-gray-400">Full MFi controller support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Download */}
      <section id="download" className="w-full py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Download iFly</h2>
          <div className="max-w-2xl mx-auto bg-orange-100 dark:bg-orange-900/30 border-2 border-orange-300 dark:border-orange-700 rounded-lg p-8 mb-8">
            <p className="text-xl font-bold mb-2">Coming Soon</p>
            <p className="text-gray-700 dark:text-gray-300">iFly is currently in development. Check back soon!</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">© 2025 Provenance EMU. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}