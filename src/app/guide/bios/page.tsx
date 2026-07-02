import type { Metadata } from 'next';
import Callout from '@/components/ui/Callout';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'BIOS Setup',
  description: 'Dreamcast needs no BIOS in iFly. Only the arcade systems require one — here are the exact files and where they go.',
  alternates: { canonical: 'https://ifly-emu.com/guide/bios/' },
};

const biosRows: { system: string; file: string; required: boolean; notes: string }[] = [
  { system: 'Dreamcast', file: 'dc_boot.bin', required: false, notes: 'Boot animation only. HLE BIOS (Reios) is used by default.' },
  { system: 'Dreamcast', file: 'dc_flash.bin', required: false, notes: 'Flash / NVRAM (clock, settings). Pair with dc_boot.bin for full accuracy.' },
  { system: 'Naomi', file: 'naomi.zip', required: true, notes: 'MAME romset. Basename must match exactly.' },
  { system: 'Naomi 2', file: 'naomi2.zip', required: true, notes: 'MAME romset.' },
  { system: 'Atomiswave', file: 'awbios.zip', required: true, notes: 'MAME romset.' },
  { system: 'System SP', file: 'segasp.zip', required: true, notes: 'MAME romset.' },
  { system: 'House of the Dead 2', file: 'hod2bios.zip', required: false, notes: 'Game-specific board.' },
  { system: 'Ferrari F355', file: 'f355bios.zip / f355dlx.zip', required: false, notes: 'Challenge / Deluxe variants.' },
  { system: 'Airline Pilots', file: 'airlbios.zip', required: false, notes: 'Also covers Sega Strike Fighter.' },
];

export default function BiosPage() {
  return (
    <>
      <h1 className="text-3xl font-black text-white">BIOS Setup</h1>

      <Callout variant="tip" title="Dreamcast needs no BIOS">
        Almost every Dreamcast game runs on iFly&apos;s built-in HLE BIOS (Reios). You only need
        a real BIOS for the arcade systems (Naomi, Naomi 2, Atomiswave, System SP).
      </Callout>

      <p className="mt-6 text-gray-400">
        Put BIOS files in the <code>BIOS/</code> folder. Names are case-normalized to lowercase,
        and MAME romsets must keep their exact basename.
      </p>

      <div className="mt-8 overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.03] text-gray-300">
            <tr>
              <th className="px-4 py-3 font-semibold">System</th>
              <th className="px-4 py-3 font-semibold">File</th>
              <th className="px-4 py-3 font-semibold">Required</th>
              <th className="px-4 py-3 font-semibold">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-gray-400">
            {biosRows.map((r) => (
              <tr key={`${r.system}-${r.file}`} className="align-top">
                <td className="px-4 py-3 whitespace-nowrap">{r.system}</td>
                <td className="px-4 py-3"><code className="text-orange-300">{r.file}</code></td>
                <td className="px-4 py-3">
                  <Badge tone={r.required ? 'required' : 'optional'}>{r.required ? 'Required' : 'Optional'}</Badge>
                </td>
                <td className="px-4 py-3">{r.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
