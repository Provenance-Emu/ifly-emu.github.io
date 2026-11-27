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
      <h1 className="max-w-2xl text-balance text-4xl font-bold tracking-tight sm:text-5xl text-white">Get started with iFly</h1>
      <p className="mt-4 max-w-prose leading-relaxed text-gray-300">Import your games, check supported formats, or find setup help for your system.</p>

      <section className="mt-8 rounded-2xl border p-5 sm:p-7 border-white/10 bg-white/[.035]" aria-labelledby="first-import">
        <h2 id="first-import" className="text-xl font-bold text-white">Import your first game</h2>
        <ol className="mt-5 grid list-decimal gap-4 pl-5 leading-relaxed sm:grid-cols-3 sm:gap-8 text-gray-300">
            <li><strong className="text-white">Prepare your game</strong><p className="mt-1">Use a Dreamcast game you own in CHD, CDI, or GDI format.</p></li>
            <li><strong className="text-white">Import into iFly</strong><p className="mt-1">Use Files, drag and drop, or Wi-Fi upload.</p></li>
            <li><strong className="text-white">Start playing</strong><p className="mt-1">Open the game from your library. Dreamcast games can run without a BIOS.</p></li>
        </ol>
        <Link href="/guide/importing/" className="mt-5 inline-flex min-h-11 items-center font-semibold underline underline-offset-4 text-orange-300">See import instructions <span aria-hidden="true" className="ml-2">→</span></Link>
      </section>

      <section className="mt-10" aria-labelledby="guide-topics">
        <h2 id="guide-topics" className="mb-3 text-2xl font-bold text-white">Guide topics</h2>
        <ul className="grid gap-x-7 sm:grid-cols-2">
          {pages.map(page => (
            <li key={page.href} className="border-b border-white/10">
              <Link href={page.href} className="group block rounded-sm py-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400">
                <span className="flex items-center justify-between gap-4 font-semibold text-white"><span className="group-hover:underline">{page.label}</span><span aria-hidden="true" className="text-orange-300">→</span></span>
                <p className="mt-1 text-sm leading-relaxed text-gray-300">{page.blurb}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
