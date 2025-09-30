import Link from 'next/link';

export default function Hero() {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-4 pt-16 pb-10">
      <div className="text-center">
        <span className="inline-flex items-center rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 px-3 py-1 text-xs font-medium">New • In development</span>
        <h1 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Dreamcast Emulator for iOS & tvOS
        </h1>
        <p className="mt-4 text-base md:text-lg leading-relaxed text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          Experience classic Sega Dreamcast games on your iPhone, iPad, and Apple TV with a fast, modern emulator.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="#download" className="inline-flex h-11 items-center justify-center rounded-lg bg-orange-600 px-5 text-white font-medium hover:bg-orange-700 transition-colors">
            Download (soon)
          </Link>
          <Link href="/features" className="inline-flex h-11 items-center justify-center rounded-lg border border-neutral-300 dark:border-neutral-700 px-5 text-neutral-800 dark:text-neutral-200 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
            View Features
          </Link>
        </div>
      </div>

      {/* Visual placeholder */}
      <div className="mt-10 max-w-3xl mx-auto">
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-4 md:p-6">
          <div className="aspect-video rounded-xl bg-neutral-200 dark:bg-neutral-800 grid place-items-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🎮</div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Gameplay preview coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
