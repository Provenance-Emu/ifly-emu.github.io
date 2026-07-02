import type { Metadata } from 'next';
import Link from 'next/link';
import Callout from '@/components/ui/Callout';

export const metadata: Metadata = {
  title: 'Supported Formats',
  description: 'Every disc image, track, archive, and skin format iFly supports, and why to prefer CHD or CDI over GDI.',
  alternates: { canonical: 'https://ifly-emu.com/guide/formats/' },
};

const rows: [string, string, string][] = [
  ['.chd', 'Standalone disc', 'Compressed, single file. Best storage (~700 MB → ~300 MB). Dreamcast + Naomi GD-ROM.'],
  ['.cdi', 'Standalone disc', 'Single-file Dreamcast image. No tracks to lose.'],
  ['.iso', 'Standalone disc', 'Single-file image.'],
  ['.gdi', 'Index', 'GD-ROM index that points at .bin / .raw / .img tracks. All tracks must be present.'],
  ['.cue', 'Index', 'CUE sheet that points at .bin tracks.'],
  ['.bin / .raw / .img', 'Track', 'Payload tracks referenced by a .gdi or .cue.'],
  ['.dat', 'Arcade payload', 'Decrypted single-cart arcade ROM (often inside a .zip).'],
  ['.lst', 'Arcade list', 'Metadata for MAME-style arcade rips.'],
  ['.m3u', 'Playlist', 'Groups multiple discs into an ordered multi-disc set.'],
  ['.elf', 'Homebrew', 'Raw homebrew executable.'],
  ['.zip / .7z', 'Archive', 'Disc archives are extracted; arcade romsets copied as-is.'],
  ['.deltaskin / .manicskin / .skin / .emuskin', 'Controller skin', 'Routed to the Skins folder.'],
];

export default function FormatsPage() {
  return (
    <>
      <h1 className="text-3xl font-black text-white">Supported Formats</h1>
      <p className="mt-3 text-gray-400">
        iFly reads the same disc and arcade formats as Flycast, plus extra handling for odd
        arcade rips (see <Link href="/guide/arcade/" className="text-orange-300 hover:underline">Arcade &amp; Naomi Rips</Link>).
      </p>

      <Callout variant="tip" title="Prefer CHD or CDI over GDI">
        A <code>.chd</code> or <code>.cdi</code> is a single file — nothing to lose. A
        <code>.gdi</code> references separate <code>.bin</code>/<code>.raw</code> tracks, and the
        game will not boot if any track is missing. <code>.chd</code> is also compressed, roughly
        halving disk use.
      </Callout>

      <div className="mt-8 overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.03] text-gray-300">
            <tr>
              <th className="px-4 py-3 font-semibold">Extension</th>
              <th className="px-4 py-3 font-semibold">Kind</th>
              <th className="px-4 py-3 font-semibold">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-gray-400">
            {rows.map(([ext, kind, notes]) => (
              <tr key={ext} className="align-top">
                <td className="px-4 py-3"><code className="text-orange-300">{ext}</code></td>
                <td className="px-4 py-3 whitespace-nowrap">{kind}</td>
                <td className="px-4 py-3">{notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
