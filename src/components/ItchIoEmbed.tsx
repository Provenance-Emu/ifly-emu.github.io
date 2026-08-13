'use client';

import React, { useState } from 'react';

export type ItchIoEmbedProps = {
  itchId: string;
  linkColor?: string;
  title?: string;
  className?: string;
};

// Click-to-load facade — the itch.io widget is a third-party iframe that pulls in
// its own CSS/JS/images. Loading it eagerly (even via IntersectionObserver, which
// can still fire during an automated audit with no real scrolling) adds third-party
// weight to the critical path and hurts Lighthouse performance (TBT, JS/CSS payload).
// Deferring until a real click guarantees it never loads during a passive page load.
const ItchIoEmbed: React.FC<ItchIoEmbedProps> = ({ itchId, linkColor = '#5b96fa', title, className }) => {
  const [loaded, setLoaded] = useState(false);
  const src = `https://itch.io/embed/${itchId}?link_color=${encodeURIComponent(linkColor.replace('#', ''))}`;
  const anchorTitle = title ?? 'iFly - Dreamcast Emulator for iOS and tvOS by Provenance EMU';

  if (loaded) {
    return (
      <div className="w-full overflow-x-auto" style={{ minHeight: '167px' }}>
        <iframe
          title={anchorTitle}
          src={src}
          width={552}
          height={167}
          style={{ border: 0, maxWidth: '100%' }}
          className={className}
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className={`w-full max-w-[552px] flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors ${className ?? ''}`}
      style={{ minHeight: '167px' }}
      aria-label={`Load the itch.io widget for ${anchorTitle}`}
    >
      Show itch.io widget
    </button>
  );
};

export default ItchIoEmbed;
