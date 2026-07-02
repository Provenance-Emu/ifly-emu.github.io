'use client';

import React, { useState } from 'react';

export type AccordionItemData = { q: string; a: React.ReactNode };

export default function Accordion({ items }: { items: AccordionItemData[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="bg-white/[0.02]">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="font-medium text-white">{item.q}</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className={`h-5 w-5 shrink-0 text-orange-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {isOpen && <div className="px-5 pb-5 text-sm leading-relaxed text-gray-300">{item.a}</div>}
          </div>
        );
      })}
    </div>
  );
}
