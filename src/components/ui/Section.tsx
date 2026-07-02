import React from 'react';

const toneClass = {
  ink: 'bg-ink',
  'ink-2': 'bg-ink-2',
  'ink-3': 'bg-ink-3',
} as const;

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  tone?: keyof typeof toneClass;
  id?: string;
};

export default function Section({ children, className = '', tone, id }: SectionProps) {
  return (
    <section id={id} className={`${tone ? toneClass[tone] : ''} py-16 ${className}`}>
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}
