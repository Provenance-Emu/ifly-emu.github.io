import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="text-center space-y-6">
            <div className="inline-block">
              <span className="inline-flex items-center rounded-full bg-orange-100 dark:bg-orange-900/30 px-4 py-1.5 text-sm font-medium text-orange-700 dark:text-orange-300">
                ✨ Now in development
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Dreamcast on iOS
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              Experience classic Sega Dreamcast games on your iPhone, iPad, and Apple TV with iFly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="#download"
                className="inline-flex items-center justify-center rounded-xl bg-orange-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-orange-700 transition-all hover:scale-105"
              >
                Get Started
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center justify-center rounded-xl border-2 border-neutral-300 dark:border-neutral-700 px-8 py-4 text-base font-semibold text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-16">
            <div className="relative rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-8 shadow-2xl">
              <div className="aspect-video rounded-xl bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
                <div className="text-center space-y-3">
                  <div className="text-6xl">🎮</div>
                  <p className="text-neutral-600 dark:text-neutral-400 font-medium">Gameplay preview coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white">
              Built for Performance
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Fast, accurate emulation with a focus on great user experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🎯', title: 'Accurate Emulation', desc: 'High compatibility with your favorite Dreamcast games' },
              { icon: '⚡', title: 'High Performance', desc: 'Optimized for modern iOS devices with smooth gameplay' },
              { icon: '🎮', title: 'Controller Support', desc: 'Full MFi controller and touch control support' },
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-orange-500 dark:hover:border-orange-500 transition-all hover:shadow-xl">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section id="download" className="w-full py-20 md:py-28 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white">
            Download iFly
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300">
            Get iFly for your iOS devices and Apple TV.
          </p>

          <div className="inline-block w-full max-w-2xl">
            <div className="rounded-2xl border-2 border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950/30 p-8">
              <div className="space-y-4">
                <div className="text-2xl font-bold text-orange-900 dark:text-orange-200">Coming Soon</div>
                <p className="text-orange-800 dark:text-orange-300">
                  iFly is currently in development. Check back soon for download links and installation instructions.
                </p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto pt-4 opacity-50">
            <div className="rounded-xl bg-neutral-900 dark:bg-neutral-800 text-white p-6 text-center">
              <div className="text-sm mb-1">Download on the</div>
              <div className="text-xl font-semibold">App Store</div>
            </div>
            <div className="rounded-xl bg-neutral-900 dark:bg-neutral-800 text-white p-6 text-center">
              <div className="text-sm mb-1">Available on</div>
              <div className="text-xl font-semibold">Apple TV</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="text-xl font-bold text-neutral-900 dark:text-white mb-2">iFly</div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Part of the Provenance EMU project
              </p>
            </div>
            <div className="flex gap-6 text-sm text-neutral-600 dark:text-neutral-400">
              <Link href="/about" className="hover:text-neutral-900 dark:hover:text-white transition-colors">About</Link>
              <Link href="/features" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Features</Link>
              <Link href="/support" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Support</Link>
              <Link href="/donate" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Donate</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800 text-center text-sm text-neutral-500 dark:text-neutral-500">
            © 2025 Provenance EMU. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}