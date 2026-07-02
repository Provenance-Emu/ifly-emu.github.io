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

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-gray-700 bg-gray-800 px-3 py-1 text-sm text-gray-300">
      {children}
    </span>
  );
}
