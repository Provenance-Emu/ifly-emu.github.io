import type { GalleryGroup, GalleryImage } from '@provenance-emu/web-media/gallery';
import native from './gallery-native.json';
import { screenshots, type Device } from './screenshots';

const nativeBySlot: Record<string, GalleryImage> = native;

const devices: [Device, string, GalleryGroup['layout']][] = [
  ['iphone', 'iPhone', 'phone'],
  ['ipad', 'iPad', 'tablet'],
  ['watch', 'Apple Watch Series 12', 'watch'],
];

export const galleryGroups: GalleryGroup[] = devices.map(([id, label, layout]) => ({
  id,
  label,
  layout,
  images: screenshots(id, { featured: true }).map(item => {
    const capture = nativeBySlot[`${item.device}/${item.slug}`];
    if (capture) return capture;
    const width = Math.min(item.width, 576);
    return {
      id: item.id,
      src: item.width > width ? item.webp.replace(/\.webp$/, '-thumb.webp') : item.webp,
      href: item.jpg,
      alt: item.alt,
      width: width,
      height: Math.round(item.height * width / item.width),
      caption: item.caption,
      premium: item.premium,
      developmentPreview: item.developmentPreview,
    };
  }),
})).filter(group => group.images.length > 0);
