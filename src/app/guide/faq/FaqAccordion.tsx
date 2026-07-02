'use client';

import Accordion, { type AccordionItemData } from '@/components/ui/Accordion';

const items: AccordionItemData[] = [
  {
    q: 'My game won\'t boot. What\'s wrong?',
    a: (
      <>
        For arcade games, confirm the arcade BIOS (<code>naomi.zip</code>, <code>naomi2.zip</code>,
        <code>awbios.zip</code>, <code>segasp.zip</code>) is in <code>BIOS/</code>. For a
        <code>.gdi</code> or <code>.cue</code>, confirm every referenced track
        (<code>.bin</code>/<code>.raw</code>/<code>.img</code>) is present. Prefer a single-file
        <code>.chd</code> or <code>.cdi</code> to avoid missing-track problems.
      </>
    ),
  },
  {
    q: 'An arcade rip fails to import or load.',
    a: (
      <>
        Arcade rips come in several shapes. See{' '}
        <a href="/guide/arcade/" className="text-orange-300 hover:underline">Arcade &amp; Naomi Rips</a>{' '}
        for decrypted single-cart <code>.bin</code> dumps, multi-track GD-ROM dumps, and Naomi
        GD-cartridge <code>zip</code>+<code>.chd</code> layouts.
      </>
    ),
  },
  {
    q: 'How do I add a multi-disc game?',
    a: (
      <>
        Import each disc, then use an <code>.m3u</code> playlist listing the disc images in order.
        iFly groups them as one multi-disc game.
      </>
    ),
  },
  {
    q: 'What syncs over iCloud?',
    a: (
      <>
        Saves, VMUs, and BIOS sync across your devices over iCloud. ROMs do not sync — import
        those on each device.
      </>
    ),
  },
  {
    q: 'Do auto-saves interrupt gameplay?',
    a: (
      <>
        No. iFly serializes save states off the main thread, so timed auto-saves run without
        stalling emulation.
      </>
    ),
  },
  {
    q: 'How do I set up controllers?',
    a: (
      <>
        See the <a href="/controllers/" className="text-orange-300 hover:underline">Controllers</a>{' '}
        page for MFi, DualShock, DualSense, Xbox, and Switch mappings, plus on-screen control
        options.
      </>
    ),
  },
  {
    q: 'How do I get better performance or higher resolution?',
    a: (
      <>
        iFly runs JIT-less at full speed on Apple silicon and can upscale to <code>1440p</code> or
        <code>4K</code> on recent devices. Use per-game options to tune internal resolution,
        frame pacing, and ProMotion refresh.
      </>
    ),
  },
];

export default function FaqAccordion() {
  return <Accordion items={items} />;
}
