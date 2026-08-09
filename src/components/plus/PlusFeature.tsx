import React from 'react';
import MediaSlot from './MediaSlot';
import type { PlusFeatureSpec } from './plusFeatures';

// One feature, media on alternating sides so a column of six doesn't read as a
// list of identical rows.
export default function PlusFeature({
  feature,
  flip = false,
}: {
  feature: PlusFeatureSpec;
  flip?: boolean;
}) {
  const { title, body, freeNote, platform, media, video } = feature;
  // Apple Watch and iPhone frames are narrow; giving them a full half of a wide
  // row leaves a stranded portrait image, so they get a capped column.
  const narrow = platform === 'watchos' || platform === 'iphone';

  return (
    <div className="grid items-center gap-8 md:grid-cols-2">
      <div className={flip ? 'md:order-2' : undefined}>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="mt-3 text-base leading-relaxed text-gray-400">{body}</p>
        {freeNote && (
          <p className="mt-4 border-l-2 border-orange-500/40 pl-4 text-sm leading-relaxed text-gray-500">
            {freeNote}
          </p>
        )}
      </div>
      <div className={flip ? 'md:order-1' : undefined}>
        <div className={narrow ? 'mx-auto w-full max-w-[260px]' : undefined}>
          <MediaSlot platform={platform} src={media} video={video} alt={`${title} in iFly`} />
        </div>
      </div>
    </div>
  );
}
