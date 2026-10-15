import React from 'react';
import variants from '@/data/image-variants.json';

type VariantEntry = {
  width: number;
  height: number;
  variants: { w: number; src: string }[];
};

const manifest = variants as Record<string, VariantEntry>;

/**
 * The `srcset` value for a public image, or undefined when no variants exist.
 * Variants come from scripts/make-image-variants.mjs (`npm run images`), which
 * writes src/data/image-variants.json. The original is included as the largest
 * candidate when it is itself a WebP (the screenshots); the app icon's PNG
 * original is not, since its WebP variants cover every size the page renders.
 */
export function srcSetFor(src: string): string | undefined {
  const entry = manifest[src];
  if (!entry || entry.variants.length === 0) return undefined;
  const candidates = entry.variants.map((v) => `${v.src} ${v.w}w`);
  if (src.endsWith('.webp')) candidates.push(`${src} ${entry.width}w`);
  return candidates.join(', ');
}

type ResponsiveImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'width' | 'height' | 'alt'> & {
  src: string;
  alt: string;
  /** Intrinsic size of `src`; always rendered so the browser reserves space (no layout shift). */
  width: number;
  height: number;
  /** Display width hint for srcset selection, e.g. "204px" or "(min-width: 1024px) 700px, 100vw". */
  sizes?: string;
  /** Above-the-fold images: load eagerly with high fetch priority. Everything else lazy-loads. */
  priority?: boolean;
};

/**
 * Plain <img> with srcset. `next/image` can't do this here: the static export
 * runs with `images.unoptimized`, under which it emits no srcset at all.
 * Rendering on the server (no 'use client') also keeps next/image's client
 * component out of the page bundle.
 */
export default function ResponsiveImage({ src, alt, width, height, sizes, priority = false, ...rest }: ResponsiveImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- see component docs: next/image can't emit srcset under `unoptimized`
    <img
      {...rest}
      src={src}
      srcSet={srcSetFor(src)}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
    />
  );
}
