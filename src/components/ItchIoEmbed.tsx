import React from 'react';

export type ItchIoEmbedProps = {
  itchId: string; // e.g., '3854531'
  linkColor?: string; // hex string like '#5b96fa'
  title?: string; // accessible link text
  className?: string;
};

const ItchIoEmbed: React.FC<ItchIoEmbedProps> = ({ itchId, linkColor = '#5b96fa', title, className }) => {
  const src = `https://itch.io/embed/${itchId}?link_color=${encodeURIComponent(linkColor.replace('#', ''))}`;
  const anchorTitle = title ?? 'iFly - Dreamcast Emulator for iOS and tvOS by Provenance EMU';

  return (
    <div className="w-full overflow-x-auto">
      <iframe
        title={anchorTitle}
        src={src}
        width={552}
        height={167}
        style={{ border: 0, maxWidth: '100%' }}
        className={className}
        loading="lazy"
      />
    </div>
  );
};

export default ItchIoEmbed;
