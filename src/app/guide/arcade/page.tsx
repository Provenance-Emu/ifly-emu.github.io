import type { Metadata } from 'next';
import Callout from '@/components/ui/Callout';

export const metadata: Metadata = {
  title: 'Arcade & Naomi Rips',
  description: 'How iFly handles Naomi, Naomi 2, and Atomiswave rips in odd formats — decrypted single-cart bins, multi-track GD-ROM dumps, and GD-cartridge zip+CHD layouts.',
  alternates: { canonical: 'https://ifly-emu.com/guide/arcade/' },
};

export default function ArcadePage() {
  return (
    <>
      <h1 className="text-3xl font-black text-white">Arcade &amp; Naomi Rips</h1>
      <p className="mt-3 text-gray-400">
        Naomi, Naomi 2, and Atomiswave rips arrive in several shapes. iFly detects each and
        routes it correctly — including formats stock Flycast can&apos;t open. You still need the
        matching arcade BIOS (see <a href="/guide/bios/" className="text-orange-300 hover:underline">BIOS Setup</a>).
      </p>

      <h2 className="mt-10 text-xl font-semibold text-white">Decrypted single-cart ROMs</h2>
      <p className="mt-2 text-gray-400">
        Many archive.org rips are a single decrypted <code>.bin</code> named after the game, e.g.
        <code>VirtuaFighter4.zip</code> containing <code>VirtuaFighter4.bin</code> with no
        <code>.ic*</code> chip files. iFly detects the single-cart shape, routes it to the
        decrypted-ROM path, and Flycast peeks the board header (<code>NAOMI</code> /
        <code>Naomi2</code>) to auto-select the BIOS. Stock Flycast sends these to its MAME loader
        and fails.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-white">Multi-track GD-ROM dumps</h2>
      <p className="mt-2 text-gray-400">
        Arcade GD-ROM games sometimes come as a <code>.cue</code> plus several <code>.bin</code>
        tracks (e.g. Slashout). iFly treats the <code>.cue</code> as a disc, extracts it like a
        Dreamcast multi-track set, and verifies every referenced track exists.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-white">Naomi GD-cartridge (zip + CHD)</h2>
      <p className="mt-2 text-gray-400">
        Some Naomi games pair a MAME cart zip with a GD-ROM image in a subfolder:
        <code>senkosp.zip</code> alongside <code>senkosp/gdl-0030a.chd</code>. iFly carries the
        sibling CHD with the cart zip on import and warns if the CHD is missing before boot.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-white">MAME chip-set zips</h2>
      <p className="mt-2 text-gray-400">
        Traditional MAME romsets (a <code>.zip</code> of <code>.ic*</code> chip files) are copied
        as-is and opened directly by the MAME loader.
      </p>

      <Callout variant="warn" title="If an arcade game won't boot">
        Check that the arcade BIOS (<code>naomi.zip</code>, <code>naomi2.zip</code>,
        <code>awbios.zip</code>, or <code>segasp.zip</code>) is in <code>BIOS/</code>, and that a
        GD-cartridge game&apos;s companion <code>.chd</code> sits in its named subfolder.
      </Callout>
    </>
  );
}
