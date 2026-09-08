import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Compare iFly',
  description: 'How iFly compares to RetroArch (Flycast core) and to the Dreamcast core inside Provenance. Neutral, feature-by-feature comparisons.',
  alternates: { canonical: 'https://ifly-emu.com/compare/' },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ifly-emu.com/' },
    { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://ifly-emu.com/compare/' },
  ],
};

const pages = [
  {
    href: '/compare/ifly-vs-flycast/',
    title: 'iFly vs Flycast in RetroArch',
    blurb:
      'iFly is a standalone iOS/tvOS app built on Flycast. See how it compares to running the Flycast core inside RetroArch.',
  },
  {
    href: '/compare/ifly-vs-provenance/',
    title: 'iFly vs Provenance',
    blurb:
      'Same team, same Flycast lineage. iFly is a single-system Dreamcast app; Provenance is a 38+ system library. Here is the actual difference.',
  },
];

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageHeader
        eyebrow="Comparisons"
        title="Compare iFly"
        subtitle="Neutral, fact-based comparisons to help you pick the right Dreamcast setup."
      />
      <section className="container mx-auto px-4 pb-20">
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {pages.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="card-glass p-6 transition-colors hover:bg-white/[0.04]"
            >
              <h2 className="text-lg font-semibold text-white">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">{p.blurb}</p>
              <span className="mt-4 inline-block text-sm font-medium text-orange-400">Read comparison →</span>
            </Link>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-4xl text-sm text-gray-500">
          Also see the{' '}
          <a href="https://provenance-emu.com/compare/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">
            Provenance family comparison pages
          </a>{' '}
          and{' '}
          <Link href="/plus/" className="text-orange-400 hover:underline">
            iFly Plus
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
