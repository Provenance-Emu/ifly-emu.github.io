import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Sideload Sources',
  description: 'AltStore and SideStore source feeds for iFly, iCube, and the combined Provenance feed. Add one source to install and auto-update every Provenance app.',
  alternates: { canonical: 'https://ifly-emu.com/sources/' },
};

export const dynamic = 'force-static';

interface Source {
  name: string;
  description: string;
  altstoreUrl: string;
  sidestoreUrl: string;
  note?: string;
}

export default function SourcesPage() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ifly-emu.com';

  const sources: Source[] = [
    {
      name: 'Provenance (combined feed)',
      description: 'Recommended: one source for every Provenance app.',
      altstoreUrl: 'https://provenance-emu.com/apps.json',
      sidestoreUrl: 'https://provenance-emu.com/apps.json',
      note: 'iFly joins this feed with its first tagged release.',
    },
    {
      name: 'iFly',
      description: "iFly's own source feed.",
      altstoreUrl: `${baseURL}/api/altstore`,
      sidestoreUrl: `${baseURL}/api/sidestore`,
    },
    {
      name: 'iCube',
      description: "iCube's own source feed.",
      altstoreUrl: 'https://icube-emu.com/api/altstore',
      sidestoreUrl: 'https://icube-emu.com/api/sidestore',
    },
  ];

  return (
    <div className="min-h-screen bg-ink">
      <PageHeader
        title="Sideload Sources"
        subtitle="Add an AltStore or SideStore source to install and automatically update Provenance apps."
      />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-sm leading-relaxed text-gray-400">
            Sideloaded and self-built copies include every Plus feature at no cost. Plus purchases
            apply to the App Store build.
          </p>

          {sources.map((source, idx) => (
            <div
              key={source.name}
              className={`card-glass card-static p-6 md:p-8 ${idx === 0 ? 'card-accent' : ''}`}
            >
              <h2 className="text-xl font-semibold text-white mb-2">{source.name}</h2>
              <p className="text-sm leading-relaxed text-gray-400 mb-4">
                {source.description}
                {source.note && <span className="block mt-1">{source.note}</span>}
              </p>
              <div className="card-glass card-static p-4 mb-6">
                <p className="text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-[0.14em]">Source URL</p>
                <code className="text-sm text-orange-300 break-all">{source.altstoreUrl}</code>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`altstore://source?url=${encodeURIComponent(source.altstoreUrl)}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  data-proofer-ignore
                >
                  Add to AltStore
                </a>
                <a
                  href={`sidestore://source?url=${encodeURIComponent(source.sidestoreUrl)}`}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  data-proofer-ignore
                >
                  Add to SideStore
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
