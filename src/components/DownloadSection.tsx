import React from 'react';
import path from 'path';
import ButtonLink, { GitHubIcon } from '@/components/ButtonLink';
import { parseBuilds, type BuildVersion } from '@/lib/buildParser';
import StoreBadge, { AltStoreIcon, SideStoreIcon } from '@/components/StoreBadge';

const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className ?? 'w-5 h-5'} aria-hidden="true">
    <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
  </svg>
);

export type DownloadSectionProps = {
  title?: string;
  description?: React.ReactNode;
  className?: string;
};

const DefaultDescription = () => (
  <p className="text-lg leading-relaxed text-gray-400 mb-8">
    iFly isn’t on the App Store. You can sideload it from the sources below. We recommend
    <a
      href="https://sideloadly.io"
      target="_blank"
      rel="noopener noreferrer"
      className="text-orange-400 hover:underline ml-1"
    >
      Sideloadly
    </a>
    for installing on iOS/tvOS. For enabling JIT on Apple TV, ask in our{' '}
    <a
      href="https://discord.gg/QF5ZjVT4Sa"
      target="_blank"
      rel="noopener noreferrer"
      className="text-orange-400 hover:underline"
    >
      Discord
    </a>
    {' '}for current JIT enabler recommendations.
  </p>
);

// Newest build per platform, from the same release data /downloads/ renders
// (parseBuilds reads the iFly-releases feed fetched at build time). The home
// section used to show only source buttons, so it looked like there were no
// downloads at all.
function latestBuilds(): BuildVersion[] {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ifly-emu.com';
  const versions = parseBuilds(path.join(process.cwd(), 'public', 'builds'), baseURL);
  return (['iOS', 'tvOS'] as const)
    .map((platform) => versions.find((v) => v.platform === platform))
    .filter((v): v is BuildVersion => v !== undefined);
}

const DownloadSection: React.FC<DownloadSectionProps> = ({
  title = 'Download',
  description,
  className,
}) => {
  const latest = latestBuilds();
  return (
    <section className={`container mx-auto px-4 ${className ?? ''}`}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white mb-4">{title}</h2>
        {description ?? <DefaultDescription />}
        <div className="flex flex-wrap gap-3 justify-center items-center mb-6">
          <StoreBadge
            href={`altstore://source?url=${encodeURIComponent('https://ifly-emu.com/api/altstore')}`}
            eyebrow="Add to"
            label="AltStore"
            icon={<AltStoreIcon className="w-8 h-8" />}
            external
            data-proofer-ignore
          />
          <StoreBadge
            href={`sidestore://source?url=${encodeURIComponent('https://ifly-emu.com/api/sidestore')}`}
            eyebrow="Add to"
            label="SideStore"
            icon={<SideStoreIcon className="w-8 h-8" />}
            external
            data-proofer-ignore
          />
          <StoreBadge
            href="https://github.com/JoeMatt/iFly-releases/releases"
            eyebrow="Download from"
            label="GitHub"
            icon={<GitHubIcon className="w-6 h-6" />}
            external
          />
        </div>
        <p className="text-sm text-gray-400 mb-8">
          Sideloaded and self-built copies include every Plus feature at no cost. Plus purchases
          apply to the App Store build.
        </p>
        {latest.length > 0 && (
          <div className="mb-6">
            <p className="text-sm uppercase tracking-wide text-gray-500 mb-3">Latest builds</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {latest.map((build) => (
                <ButtonLink
                  key={build.platform}
                  href={build.downloadURL}
                  leftIcon={<DownloadIcon className="w-5 h-5" />}
                >
                  {build.platform} {build.version} ({build.buildVersion})
                </ButtonLink>
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <ButtonLink href="/downloads/" external={false} leftIcon={<DownloadIcon className="w-5 h-5" />}>All Downloads</ButtonLink>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
