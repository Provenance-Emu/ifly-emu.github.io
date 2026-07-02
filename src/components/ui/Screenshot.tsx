import Image from 'next/image';
import React from 'react';

type ScreenshotProps = {
  src?: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  className?: string;
};

export default function Screenshot({ src, alt, caption, width, height, className = '' }: ScreenshotProps) {
  return (
    <figure className={className}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="rounded-xl border border-white/10 shadow-lg"
        />
      ) : (
        <div
          role="img"
          aria-label={`Placeholder: ${alt}`}
          style={{ aspectRatio: `${width} / ${height}` }}
          className="flex w-full flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-center"
        >
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">Screenshot</span>
          <span className="text-sm text-gray-400">{alt}</span>
          <span className="text-[11px] text-gray-600">{width}×{height}</span>
        </div>
      )}
      {caption && <figcaption className="mt-2 text-center text-xs text-gray-500">{caption}</figcaption>}
    </figure>
  );
}
