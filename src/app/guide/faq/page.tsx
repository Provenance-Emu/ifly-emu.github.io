import type { Metadata } from 'next';
import FaqAccordion from './FaqAccordion';

export const metadata: Metadata = {
  title: 'FAQ & Troubleshooting',
  description: 'Fixes for the common iFly problems: games that won\'t boot, arcade rip failures, multi-disc games, iCloud sync, and performance.',
  alternates: { canonical: 'https://ifly-emu.com/guide/faq/' },
};

export default function FaqPage() {
  return (
    <>
      <h1 className="text-3xl font-black text-white">FAQ &amp; Troubleshooting</h1>
      <p className="mt-3 mb-8 text-gray-400">
        The common failures and how to fix them. Still stuck? Ask in the{' '}
        <a href="https://discord.gg/QF5ZjVT4Sa" target="_blank" rel="noopener noreferrer" className="text-orange-300 hover:underline">Discord</a>.
      </p>
      <FaqAccordion />
    </>
  );
}
