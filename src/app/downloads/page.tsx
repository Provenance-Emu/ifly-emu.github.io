import type { Metadata } from 'next';
import path from 'path';
import Link from 'next/link';
import { parseBuilds } from '@/lib/buildParser';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Downloads',
  description: 'Download iFly Dreamcast emulator IPA for iOS and tvOS. Install via AltStore, SideStore, or direct IPA download. Free and open source.',
  alternates: { canonical: 'https://ifly-emu.com/downloads/' },
};

export const dynamic = 'force-static';
export const revalidate = 3600;

export default function DownloadsPage() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ifly-emu.com';
  const buildsDir = path.join(process.cwd(), 'public', 'builds');
  const versions = parseBuilds(buildsDir, baseURL);

  // Group versions by platform
  const iosVersions = versions.filter(v => v.platform === 'iOS');
  const tvosVersions = versions.filter(v => v.platform === 'tvOS');

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-ink">
      <PageHeader
        title="Downloads"
        subtitle="Download iFly for iOS or tvOS. For sideloading with AltStore or SideStore, add our source feed."
      />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* AltStore/SideStore Source — the recommended path, so it carries the
              accent edge and everything below it stays neutral. */}
          <div className="card-glass card-static card-accent p-6 md:p-8">
            <h2 className="text-xl font-semibold text-white mb-2">
              AltStore / SideStore Source
            </h2>
            <p className="text-sm leading-relaxed text-gray-400 mb-6">
              Add our source to AltStore or SideStore for easy installation and automatic updates:
            </p>
            <div className="card-glass card-static p-4 mb-6">
              <p className="text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-[0.14em]">Source URL</p>
              <code className="text-sm text-orange-300 break-all">
                {baseURL}/api/altstore
              </code>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={`altstore://source?url=${encodeURIComponent(`${baseURL}/api/altstore`)}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                data-proofer-ignore
              >
                Add to AltStore
              </a>
              <a
                href={`sidestore://source?url=${encodeURIComponent(`${baseURL}/api/sidestore`)}`}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                data-proofer-ignore
              >
                Add to SideStore
              </a>
              <a
                href="/api/altstore"
                className="border border-white/15 text-gray-300 hover:bg-white/5 hover:text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                data-proofer-ignore
              >
                View JSON Feed
              </a>
            </div>
          </div>

          {/* External Download Sources */}
          <div className="card-glass card-static p-6 md:p-8">
            <h2 className="text-xl font-semibold text-white mb-2">
              Other Download Sources
            </h2>
            <p className="text-sm leading-relaxed text-gray-400 mb-6">
              You can also download iFly from these platforms. These may have different versions or additional release notes:
            </p>
            <a
              href="https://provenance.itch.io/ifly"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-4 card-glass group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 ring-1 ring-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path d="M3 6.5C3 5.12 4.12 4 5.5 4h13c1.38 0 2.5 1.12 2.5 2.5v8.75A2.75 2.75 0 0 1 18.25 18H5.75A2.75 2.75 0 0 1 3 15.25V6.5Zm4.02-.75a2.75 2.75 0 0 0-2.75 2.75v4.5c0 1.518 1.232 2.75 2.75 2.75h9.96A2.75 2.75 0 0 0 19.73 13V8.5a2.75 2.75 0 0 0-2.75-2.75H7.02Zm5.48 2.25c1.494 0 2.75 1.256 2.75 2.75S14 13.5 12.5 13.5 9.75 12.244 9.75 10.75 11.006 8 12.5 8Z"/></svg>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-white mb-1 group-hover:text-orange-300 transition-colors">itch.io</h3>
                <p className="text-sm leading-relaxed text-gray-400 mb-2">Download with optional pay-what-you-want support.</p>
                <span className="text-sm font-medium text-orange-300">Visit itch.io →</span>
              </div>
            </a>
          </div>

          {/* iOS Downloads */}
          <div className="card-glass card-static p-6 md:p-8">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2.5">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-400" aria-hidden="true"><path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm5 18a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"/></svg>
              iOS Builds
            </h2>
            {iosVersions.length === 0 ? (
              <p className="text-sm text-gray-400">No iOS builds available yet.</p>
            ) : (
              <div className="space-y-4">
                {iosVersions.map((version, idx) => (
                  <div
                    key={idx}
                    className="card-glass card-static p-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-white">
                          {version.version}
                          {version.isBeta && (
                            <span className="ml-2 align-middle text-xs font-semibold uppercase tracking-wide bg-amber-500/10 text-amber-300 border border-amber-500/25 px-2 py-0.5 rounded">
                              Beta {version.betaNumber}
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1.5">
                          Build {version.buildVersion} • {formatDate(version.date)}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Size: {formatFileSize(version.size)} • Min iOS: {version.minOSVersion}
                        </p>
                      </div>
                      <a
                        href={version.downloadURL}
                        download
                        className="bg-orange-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold text-center whitespace-nowrap transition hover:ring-2 hover:ring-orange-400/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                      >
                        Download IPA
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* tvOS Downloads */}
          <div className="card-glass card-static p-6 md:p-8">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2.5">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-400" aria-hidden="true"><path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm8 13h4v1H10v-1Z"/></svg>
              tvOS Builds
            </h2>
            {tvosVersions.length === 0 ? (
              <p className="text-sm text-gray-400">No tvOS builds available yet.</p>
            ) : (
              <div className="space-y-4">
                {tvosVersions.map((version, idx) => (
                  <div
                    key={idx}
                    className="card-glass card-static p-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-white">
                          {version.version}
                          {version.isBeta && (
                            <span className="ml-2 align-middle text-xs font-semibold uppercase tracking-wide bg-amber-500/10 text-amber-300 border border-amber-500/25 px-2 py-0.5 rounded">
                              Beta {version.betaNumber}
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1.5">
                          Build {version.buildVersion} • {formatDate(version.date)}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Size: {formatFileSize(version.size)} • Min tvOS: {version.minOSVersion}
                        </p>
                      </div>
                      <a
                        href={version.downloadURL}
                        download
                        className="bg-orange-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold text-center whitespace-nowrap transition hover:ring-2 hover:ring-orange-400/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                      >
                        Download IPA
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Installation Instructions */}
          <div className="card-glass card-static p-6 md:p-8">
            <h2 className="text-xl font-semibold text-white mb-6">
              Installation Instructions
            </h2>
            <div className="space-y-8 text-sm leading-relaxed text-gray-400">
              <div>
                <h3 className="text-base font-semibold text-white mb-3">
                  Using AltStore / SideStore (Recommended)
                </h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Install <a href="https://altstore.io" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">AltStore</a> or <a href="https://sidestore.io" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">SideStore</a> on your device</li>
                  <li>Tap the &quot;Add to AltStore&quot; or &quot;Add to SideStore&quot; button above</li>
                  <li>Browse to iFly in the app and tap &quot;Install&quot;</li>
                  <li>Enjoy automatic updates!</li>
                </ol>
              </div>
              <div>
                <h3 className="text-base font-semibold text-white mb-3">
                  Manual Installation
                </h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Download the IPA file for your platform</li>
                  <li>Use a sideloading tool like AltStore, SideStore, or Sideloadly</li>
                  <li>Sign and install the IPA on your device</li>
                  <li>Trust the certificate in Settings → General → VPN & Device Management</li>
                </ol>
              </div>
              <div className="bg-amber-500/10 border-l-2 border-amber-500/50 rounded-r-xl px-5 py-4">
                <p className="text-sm leading-relaxed text-amber-300">
                  <strong>Note:</strong> Beta builds may contain bugs and are intended for testing purposes.
                  For the most stable experience, use the latest non-beta release.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
