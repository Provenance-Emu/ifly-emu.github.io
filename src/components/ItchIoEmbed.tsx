'use client';

import React, { useEffect, useRef, useState } from 'react';

export type ItchIoEmbedProps = {
  itchId: string; // e.g., '3854531'
  linkColor?: string; // hex string like '#5b96fa'
  title?: string; // accessible link text
  className?: string;
};

const ItchIoEmbed: React.FC<ItchIoEmbedProps> = ({ itchId, linkColor = '#5b96fa', title, className }) => {
  const [visible, setVisible] = useState(false);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = placeholderRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const src = `https://itch.io/embed/${itchId}?link_color=${encodeURIComponent(linkColor.replace('#', ''))}`;
  const anchorTitle = title ?? 'iFly - Dreamcast Emulator for iOS and tvOS by Provenance EMU';

  return (
    <div className="w-full overflow-x-auto" ref={placeholderRef} style={{ minHeight: 167 }}>
      {visible && (
        <iframe
          title={anchorTitle}
          src={src}
          width={552}
          height={167}
          style={{ border: 0, maxWidth: '100%' }}
          className={className}
        />
      )}
    </div>
  );
};

export default ItchIoEmbed;
