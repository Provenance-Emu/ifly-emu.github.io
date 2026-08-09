import React from 'react';
import type { PlusPlatform } from './plusFeatures';

// Aspect ratios in device points, so a slot reserves the right shape before any
// capture exists. Without this the page reflows when screenshots land, and a
// missing capture collapses the layout instead of showing a marked gap.
const RATIO: Record<PlusPlatform, { w: number; h: number; label: string }> = {
  iphone:  { w: 402,  h: 874,  label: 'iPhone' },
  ipad:    { w: 1024, h: 1366, label: 'iPad' },
  // The site's existing iPad captures are landscape and already normalized to
  // 4:3, so a slot holding one must match that and not the portrait ratio.
  'ipad-landscape': { w: 4, h: 3, label: 'iPad' },
  tvos:    { w: 1920, h: 1080, label: 'Apple TV' },
  watchos: { w: 205,  h: 251,  label: 'Apple Watch' },
};

// `next/image` optimization is disabled for the static export, so a plain <img>
// is what next/image would emit anyway, minus the wrapper.
export default function MediaSlot({
  platform,
  src,
  video = false,
  alt,
}: {
  platform: PlusPlatform;
  src?: string;
  video?: boolean;
  alt: string;
}) {
  const { w, h, label } = RATIO[platform];
  const frame =
    'overflow-hidden rounded-2xl border border-white/10 bg-black/40 ring-1 ring-white/5';

  if (!src) {
    return (
      <div className={`${frame} flex items-center justify-center`} style={{ aspectRatio: `${w} / ${h}` }}>
        <div className="px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p>
          <p className="mt-1 text-xs text-gray-600">Screenshot pending</p>
        </div>
      </div>
    );
  }

  if (video) {
    return (
      // Muted + playsInline + loop so it behaves as a moving screenshot rather
      // than a video the reader has to manage. autoPlay without muted is
      // blocked on iOS.
      <video
        className={frame}
        style={{ aspectRatio: `${w} / ${h}` }}
        src={src}
        aria-label={alt}
        autoPlay
        loop
        muted
        playsInline
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- optimization is off for the static export
    <img
      className={`${frame} h-auto w-full`}
      style={{ aspectRatio: `${w} / ${h}` }}
      src={src}
      alt={alt}
      loading="lazy"
    />
  );
}
