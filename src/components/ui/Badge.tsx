import React from 'react';

const toneClass = {
  default: 'bg-gray-800 text-gray-300 border-gray-700',
  required: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
  optional: 'bg-gray-800 text-gray-400 border-gray-700',
} as const;

export function Badge({ children, tone = 'default' }: { children: React.ReactNode; tone?: keyof typeof toneClass }) {
  return (
    <span className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${toneClass[tone]}`}>
      {children}
    </span>
  );
}

/* Glass-tinted spec chip. gray-300 on the composited surface is 12.25:1. */
export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-gray-300">
      {children}
    </span>
  );
}
