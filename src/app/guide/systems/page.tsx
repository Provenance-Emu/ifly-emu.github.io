import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Systems',
  description: 'Every system iFly runs: Dreamcast, Naomi, Naomi 2, Atomiswave, System SP, and game-specific boards.',
  alternates: { canonical: 'https://ifly-emu.com/guide/systems/' },
};

const systems: { name: string; biosRequired: boolean; notes: string }[] = [
  { name: 'Dreamcast', biosRequired: false, notes: 'Consumer console. Runs on the built-in HLE BIOS; no BIOS file needed.' },
  { name: 'Naomi', biosRequired: true, notes: 'Arcade board. Requires naomi.zip.' },
  { name: 'Naomi 2', biosRequired: true, notes: 'Upgraded arcade board. Requires naomi2.zip.' },
  { name: 'Atomiswave', biosRequired: true, notes: 'Sammy arcade hardware. Requires awbios.zip.' },
  { name: 'System SP ("Spider")', biosRequired: true, notes: 'Sega arcade system. Requires segasp.zip.' },
  { name: 'Game-specific boards', biosRequired: false, notes: 'House of the Dead 2, Ferrari F355, Airline Pilots — optional per-game BIOS.' },
];

export default function SystemsPage() {
  return (
    <>
      <h1 className="text-3xl font-black text-white">Systems</h1>
      <p className="mt-3 text-gray-400">
        iFly runs the Sega Dreamcast plus the arcade platforms it shares hardware with. Arcade
        systems need a BIOS; Dreamcast does not.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {systems.map((s) => (
          <div key={s.name} className="card-glass p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold text-white">{s.name}</h2>
              <Badge tone={s.biosRequired ? 'required' : 'optional'}>
                {s.biosRequired ? 'BIOS required' : 'No BIOS'}
              </Badge>
            </div>
            <p className="mt-2 text-sm text-gray-400">{s.notes}</p>
          </div>
        ))}
      </div>
    </>
  );
}
