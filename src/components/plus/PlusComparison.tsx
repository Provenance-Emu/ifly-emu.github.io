import React from 'react';

type Row = { label: string; free: string; plus: string };

// Rows are the boundary, not a feature dump — every row is somewhere a reader
// could reasonably wonder which side of the paywall it falls on.
const ROWS: Row[] = [
  { label: 'Emulator core, all systems',   free: 'Yes',              plus: 'Yes' },
  { label: 'Importing games',              free: 'Yes',              plus: 'Yes' },
  { label: 'Save states & auto-saves',     free: 'Yes',              plus: 'Yes' },
  { label: 'RetroAchievements',            free: 'Yes',              plus: 'Yes' },
  { label: 'Controller skins',             free: 'Yes',              plus: 'Yes' },
  { label: 'iCloud sync',                  free: 'Yes',              plus: 'Yes' },
  { label: 'Shaders',                      free: 'Basic buckets',    plus: 'All packs' },
  { label: 'HD texture packs',             free: '—',                plus: 'Yes' },
  { label: 'Per-game tuning profiles',     free: '—',                plus: 'Yes' },
  { label: 'VMU on Apple Watch',           free: 'Live viewer',      plus: 'Mini-games & card trading' },
  { label: 'Gameplay clips',               free: 'Watermarked',      plus: 'No watermark' },
  { label: 'Handoff between devices',      free: '3 a day',          plus: 'Unlimited' },
];

const cell = 'px-4 py-3 text-sm';

export default function PlusComparison() {
  return (
    // Wide tables must scroll inside their own container, never the page body.
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[520px] border-collapse text-left">
        <caption className="sr-only">Feature comparison between free iFly and iFly Plus</caption>
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.03]">
            <th scope="col" className={`${cell} font-semibold text-white`}>Feature</th>
            <th scope="col" className={`${cell} font-semibold text-gray-300`}>Free</th>
            <th scope="col" className={`${cell} font-semibold text-orange-400`}>Plus</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.label} className="border-b border-white/5 last:border-0">
              <th scope="row" className={`${cell} font-normal text-gray-300`}>{row.label}</th>
              <td className={`${cell} text-gray-400`}>{row.free}</td>
              <td className={`${cell} text-white`}>{row.plus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
