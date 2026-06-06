import React from 'react';
import ButtonLink, { ItchIcon } from '@/components/ButtonLink';
import ItchIoEmbed from '@/components/ItchIoEmbed';

const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className ?? 'w-5 h-5'} aria-hidden="true">
    <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
  </svg>
);

export type DownloadSectionProps = {
  title?: string;
  description?: React.ReactNode;
  showEmbed?: boolean;
  className?: string;
};

const DefaultDescription = () => (
  <p className="text-gray-400 mb-6">
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

const DownloadSection: React.FC<DownloadSectionProps> = ({
  title = 'Download',
  description,
  showEmbed = false,
  className,
}) => {
  return (
    <section className={`container mx-auto px-4 ${className ?? ''}`}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
        {description ?? <DefaultDescription />}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <ButtonLink href="/downloads/" external={false} leftIcon={<DownloadIcon className="w-5 h-5" />}>All Downloads</ButtonLink>
          <ButtonLink href="https://provenance.itch.io/ifly" leftIcon={<ItchIcon className="w-5 h-5" />}>Sideload via itch.io</ButtonLink>
        </div>
        {showEmbed && (
          <div className="flex justify-center">
            <ItchIoEmbed itchId="3923686" linkColor="#5b96fa" title="iFly - Dreamcast Emulator for iOS and tvOS by Provenance EMU" />
          </div>
        )}
      </div>
    </section>
  );
};

export default DownloadSection;
