import type { Metadata } from 'next';
import Link from 'next/link';
import { GUIDE_PAGES } from './guideNav';

export const metadata: Metadata = {
  title: 'Guide',
  description: 'How to import games, which formats iFly supports, BIOS setup, arcade and Naomi rips, and troubleshooting.',
  alternates: { canonical: 'https://ifly-emu.com/guide/' },
};

export default function GuideIndex() {
  const pages = GUIDE_PAGES.filter((p) => p.href !== '/guide/');
  return (
    <>
      <h1 className="text-3xl font-black text-white">iFly Guide</h1>
      <p className="mt-3 max-w-2xl text-gray-400">
        Everything you need to get games running on iFly. New here? Most Dreamcast games need
        no BIOS at all — drop a <code>.chd</code> or <code>.cdi</code> into iFly and go.
      </p>

      <div className="mt-8 rounded-xl border border-orange-500/20 bg-orange-500/[0.06] p-5">
        <h2 className="text-lg font-semibold text-white">First import in 3 steps</h2>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-gray-300">
          <li>Get a Dreamcast game as <code>.chd</code>, <code>.cdi</code>, or <code>.gdi</code>.</li>
          <li>Open iFly → import via the Files app, drag-and-drop, or Wi-Fi upload.</li>
          <li>Tap the game. No BIOS required for Dreamcast.</li>
        </ol>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {pages.map((p) => (
          <Link key={p.href} href={p.href} className="card-glass block p-5">
            <h3 className="font-semibold text-white">{p.label}</h3>
            <p className="mt-1 text-sm text-gray-400">{p.blurb}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
