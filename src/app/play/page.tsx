import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';

// Landing page for game links: https://ifly-emu.com/play?md5=<md5>.
// With iFly installed, iOS opens the app straight from the link (the
// apple-app-site-association in public/.well-known claims /play* only), so
// this page only shows for someone without the app, or on a desktop.
// Kept static: the md5 in the query is for the app, not this page.
export const metadata: Metadata = {
  title: 'Open in iFly',
  description: 'This link starts a Dreamcast game in iFly on iPhone or iPad.',
  alternates: { canonical: 'https://ifly-emu.com/play/' },
  robots: { index: false, follow: true },
};

export default function PlayPage() {
  return (
    <div className="min-h-screen bg-ink">
      <PageHeader title="Open in iFly" subtitle="This link starts a game in iFly." />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto card-glass p-8 text-gray-300 space-y-4">
          <p>
            On an iPhone or iPad with iFly installed, the link opens the app and boots the game, as long as
            that game is in your library. NFC game tags written by iFly carry the same link.
          </p>
          <p>
            Already have iFly and still on this page? Touch and hold the link, then choose Open in iFly.
          </p>
          <p>Don&apos;t have iFly yet?</p>
          {/* App Store link goes here at launch; until then, the Downloads page. */}
          <Link
            href="/downloads/"
            className="inline-block rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Get iFly
          </Link>
        </div>
      </div>
    </div>
  );
}
