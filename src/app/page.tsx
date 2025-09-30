import Hero from '@/components/Hero';
import DownloadSection from '@/components/DownloadSection';
import Features from '@/components/Features';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <Hero />

      <section className="w-full max-w-[1200px] mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">Fast, Modern, Accurate</h2>
          <p className="mt-3 text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Built with performance and fidelity in mind, focusing on a simple, great experience.
          </p>
        </div>
        <div className="mt-10">
          <Features compact />
        </div>
        <div className="text-center mt-10">
          <a href="/features" className="text-base md:text-lg text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-semibold transition-colors">
            See all features →
          </a>
        </div>
      </section>

      <DownloadSection className="pb-8" showEmbed />

      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-10">
        <div className="w-full max-w-[1200px] mx-auto px-4 text-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-400"> 2025 Provenance EMU. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}