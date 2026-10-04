import type { Metadata } from 'next';
import Link from 'next/link';
import Callout from '@/components/ui/Callout';

export const metadata: Metadata = {
  title: 'Dumping Dreamcast Discs',
  description:
    'How to dump your own Dreamcast GD-ROM discs with a Dreamcast and an SD adapter, convert the result to a single CHD file, and import it into iFly.',
  alternates: { canonical: 'https://ifly-emu.com/guide/dumping-dreamcast/' },
};

const link = 'text-orange-300 hover:underline';
const pre =
  'mt-3 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-gray-300';

export default function DumpingDreamcastPage() {
  return (
    <>
      <h1 className="text-3xl font-black text-white">Dumping Dreamcast Discs</h1>
      <p className="mt-3 text-gray-400">
        iFly plays Dreamcast disc images, so a game you own has to become a file first. This page
        covers how to make that file from a real disc, shrink it to one <code>.chd</code>, and get
        it into iFly.
      </p>
      <p className="mt-3 text-gray-400">
        iFly does not provide, link to, or endorse any source of pre-dumped games. Dump discs you
        own, from hardware you own.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-white">Why a PC drive isn&apos;t enough</h2>
      <p className="mt-2 text-gray-400">
        Dreamcast retail games ship on GD-ROM, a proprietary disc that holds about 1 GB. A normal
        PC optical drive can read only the low-density area of one, and the game data sits in the
        high-density area. So the dump is done by the Dreamcast itself, which reads its own discs
        and hands the tracks to a computer.
      </p>
      <p className="mt-3 text-gray-400">
        A GD-ROM dump is a <code>.gdi</code> index plus separate track files (<code>.bin</code>,{' '}
        <code>.raw</code>, <code>.iso</code>). There are always at least three tracks, and iFly needs
        every one of them.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-white">What you need</h2>
      <ul className="mt-2 list-disc space-y-2 pl-6 text-gray-400">
        <li>A working Dreamcast that can boot a burned CD-R.</li>
        <li>A Dreamcast SD card adapter (it plugs into the serial port, the one the link cable uses) and an SD card.</li>
        <li>
          Room on that card for the whole disc. A full dump runs about 900 to 1000 MB, so a card
          with 2 GB free leaves headroom. The SD Rip page doesn&apos;t say which file system the card
          needs, so check its notes before you format it.
        </li>
        <li>
          <strong className="text-gray-300">Dreamcast SD Rip</strong> v1.1, burned to a CD-R. The{' '}
          <a href="https://hiddenpalace.org/Dreamcast_SD_Rip" className={link} target="_blank" rel="noopener noreferrer">
            Hidden Palace page
          </a>{' '}
          names DiscJuggler for the burn.
        </li>
        <li>A computer with an SD card reader.</li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold text-white">Dump with SD Rip</h2>
      <ol className="mt-2 list-decimal space-y-2 pl-6 text-gray-400">
        <li>Connect the SD adapter, with the card in it, to the Dreamcast.</li>
        <li>Boot the Dreamcast SD Rip disc.</li>
        <li>Swap in the disc you want to dump.</li>
        <li>
          Choose <strong className="text-gray-300">GD-ROM &lt;bin&gt; all track</strong> from the menu.
        </li>
        <li>Wait for it to finish, then copy the files from the SD card to your computer.</li>
      </ol>
      <p className="mt-3 text-gray-400">
        Budget about 40 minutes. One{' '}
        <a
          href="https://multimedia.cx/eggs/dreamcast-sd-adapter-and-dreamshell/"
          className={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          write-up of the SD adapter
        </a>{' '}
        measured 38 to 40 minutes for a 900 to 1000 MB disc, using DreamShell, a second tool that
        works with the same adapter and has its own ripping interface. The SD Rip page also covers
        GD-R prototypes, which need System Disc 2. Retail discs don&apos;t.
      </p>

      <Callout variant="info" title="No SD adapter?">
        A Dreamcast with a Broadband Adapter can serve the disc over your network using an{' '}
        <code>httpd</code> boot disc (the{' '}
        <a
          href="https://wiki.provenance-emu.com/installation-and-usage/roms/ripping-roms"
          className={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Provenance wiki
        </a>{' '}
        walks through httpd-ism). It works, but it hands over one track at a time at roughly 40
        KB/s, so a full disc takes hours. Use the SD adapter if you can.
      </Callout>

      <h2 className="mt-10 text-xl font-semibold text-white">Check the files</h2>
      <p className="mt-2 text-gray-400">
        Before you do anything else, open the <code>.gdi</code> in a text editor. It lists every
        track file by name. Each one has to exist next to it, and a track that is missing or
        empty means a bad dump. Run it again before converting.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-white">Convert to one CHD</h2>
      <p className="mt-2 text-gray-400">
        A <code>.gdi</code> won&apos;t boot if a single track goes missing, and the track files add up
        to a lot of loose data. <code>.chd</code> is one compressed file, and the{' '}
        <Link href="/guide/formats/" className={link}>formats table</Link> notes it roughly
        halves disk use, though how much you save depends on the game. It comes from{' '}
        <code>chdman</code>, part of the MAME tools. On a Mac:
      </p>
      <pre className={pre}>{'brew install rom-tools'}</pre>
      <p className="mt-3 text-gray-400">
        Then point it at the <code>.gdi</code>, with the track files in the same folder:
      </p>
      <pre className={pre}>{'chdman createcd -i game.gdi -o game.chd'}</pre>
      <p className="mt-3 text-gray-400">
        Keep the original tracks until you&apos;ve booted the <code>.chd</code> once.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-white">Multi-disc games</h2>
      <p className="mt-2 text-gray-400">
        Dump and convert each disc on its own. Then write an <code>.m3u</code> playlist next to
        the <code>.chd</code> files that lists them in order, one per line:
      </p>
      <pre className={pre}>{'Game (Disc 1).chd\nGame (Disc 2).chd'}</pre>
      <p className="mt-3 text-gray-400">
        Import the discs and the playlist, and iFly groups them as one game. The{' '}
        <Link href="/guide/faq/" className={link}>FAQ</Link> has the same steps.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-white">Get it into iFly</h2>
      <p className="mt-2 text-gray-400">
        Add the <code>.chd</code> from the Files app, drag it onto the library on iPad, or upload it
        over Wi-Fi. If you skipped the conversion and kept a <code>.gdi</code>, pick the whole
        folder so every track comes along. See{' '}
        <Link href="/guide/importing/" className={link}>Importing Games</Link> for all four ways.
      </p>

      <Callout variant="warn" title="Arcade discs are a different job">
        Naomi, Naomi 2, and other arcade GD-ROM games come from arcade hardware, not a home
        Dreamcast. Their discs pair with a security chip and a DIMM board, so the steps on this
        page don&apos;t apply. The{' '}
        <a href="https://dumping.guide/discs/sega" className={link} target="_blank" rel="noopener noreferrer">
          Dumping Guide&apos;s Sega page
        </a>{' '}
        points to the Redump team&apos;s documentation for those systems. For what iFly does with
        the files, see{' '}
        <Link href="/guide/arcade/" className={link}>Arcade &amp; Naomi Rips</Link> and{' '}
        <Link href="/guide/bios/" className={link}>BIOS Setup</Link>.
      </Callout>
    </>
  );
}
