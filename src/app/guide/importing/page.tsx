import type { Metadata } from 'next';
import Callout from '@/components/ui/Callout';
import Screenshot from '@/components/ui/Screenshot';

export const metadata: Metadata = {
  title: 'Importing Games',
  description: 'Import Dreamcast and arcade games into iFly via the Files app, drag-and-drop, Wi-Fi upload, or the ifly:// URL scheme.',
  alternates: { canonical: 'https://ifly-emu.com/guide/importing/' },
};

export default function ImportingPage() {
  return (
    <>
      <h1 className="text-3xl font-black text-white">Importing Games</h1>
      <p className="mt-3 text-gray-400">
        iFly imports games four ways. All of them route through the same importer, so the file
        ends up in the right place no matter which you use.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-white">Files app / document picker</h2>
      <p className="mt-2 text-gray-400">
        In iFly, add games from the Files app. Pick a single file (<code>.chd</code>,
        <code>.cdi</code>, <code>.gdi</code>) or a whole folder for multi-track dumps. This works
        on iOS, iPadOS, and tvOS.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-white">Drag-and-drop (iPad)</h2>
      <p className="mt-2 text-gray-400">
        On iPad (iOS 15+), drag files from Files, Safari downloads, or another app straight onto
        the iFly library grid.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-white">Wi-Fi upload (WebDAV / HTTP)</h2>
      <p className="mt-2 text-gray-400">
        Start the built-in web server in iFly, then scan the QR code or open the shown URL in a
        desktop browser and drag files in. Works over WebDAV or plain HTTP on iOS, tvOS, and
        macOS — the easiest way to move large arcade sets onto Apple TV.
      </p>
      <Screenshot alt="Wi-Fi upload screen with QR code" width={1200} height={800} className="mt-4" />

      <h2 className="mt-8 text-xl font-semibold text-white">URL scheme</h2>
      <p className="mt-2 text-gray-400">
        Links using the <code>ifly://</code> scheme open a file and import it through the same
        policy.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-white">Where files go</h2>
      <p className="mt-2 text-gray-400">
        Games land in <code>ROMs/</code>, BIOS in <code>BIOS/</code>, controller skins in
        <code>Skins/</code> (under Documents or Caches). Skins (<code>.deltaskin</code>,
        <code>.manicskin</code>) are routed to <code>Skins/</code> automatically.
      </p>

      <Callout variant="info" title="What happens to archives">
        Disc archives (a <code>.zip</code> or <code>.7z</code> containing a <code>.gdi</code> or
        <code>.cue</code>) are extracted on import. Arcade romsets are copied as-is so the MAME
        loader can open them in place. Extraction is all-or-nothing: a partial extract rolls back
        and leaves the source archive alone.
      </Callout>
    </>
  );
}
