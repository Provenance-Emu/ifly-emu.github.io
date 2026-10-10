import type { BuildVersion } from '@/lib/buildParser';

const formatFileSize = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

/**
 * Downloads for one platform. Each build with release notes gets a native
 * <details> block, so it expands without client JS and works in the static export.
 */
export default function BuildList({ versions, platform }: { versions: BuildVersion[]; platform: 'iOS' | 'tvOS' }) {
  if (versions.length === 0) {
    return <p className="text-sm text-gray-400">No {platform} builds available yet.</p>;
  }
  return (
    <div className="space-y-4">
      {versions.map((version) => (
        <div key={`${version.version}-${version.buildVersion}-${version.platform}`} className="card-glass card-static p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-base font-semibold text-white">
                {version.version}
                {version.isBeta && (
                  <span className="ml-2 align-middle text-xs font-semibold uppercase tracking-wide bg-amber-500/10 text-amber-300 border border-amber-500/25 px-2 py-0.5 rounded">
                    Beta{version.betaNumber ? ` ${version.betaNumber}` : ''}
                  </span>
                )}
              </h3>
              <p className="text-sm text-gray-400 mt-1.5">
                Build {version.buildVersion} • {formatDate(version.date)}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Size: {formatFileSize(version.size)} • Min {platform}: {version.minOSVersion}
              </p>
            </div>
            <div className="flex flex-col items-stretch sm:items-end gap-2">
              <a
                href={version.downloadURL}
                download
                className="bg-orange-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold text-center whitespace-nowrap transition hover:ring-2 hover:ring-orange-400/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                Download IPA
              </a>
              {version.releaseURL && (
                <a
                  href={version.releaseURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-orange-400 hover:underline text-center sm:text-right"
                >
                  View on GitHub ↗
                </a>
              )}
            </div>
          </div>
          {version.changelogHtml && (
            <details className="changelog-details mt-4 border-t border-white/10 pt-3">
              <summary className="cursor-pointer select-none text-sm font-semibold text-orange-300 hover:text-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded">
                What&apos;s new
              </summary>
              <div className="changelog mt-3" dangerouslySetInnerHTML={{ __html: version.changelogHtml }} />
            </details>
          )}
        </div>
      ))}
    </div>
  );
}
