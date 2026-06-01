'use client';

import React, { useRef, useState, useEffect } from 'react';

export type ItchIoEmbedProps = {
  itchId: string;
  linkColor?: string;
  title?: string;
  className?: string;
};

const ItchIoEmbed: React.FC<ItchIoEmbedProps> = ({ itchId, linkColor = '#5b96fa', title, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
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
    <div ref={containerRef} className="w-full overflow-x-auto" style={{ minHeight: '167px' }}>
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
