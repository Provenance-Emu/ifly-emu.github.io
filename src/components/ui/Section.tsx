import React from 'react';

const toneClass = {
  ink: 'bg-ink',
  'ink-2': 'bg-ink-2',
  'ink-3': 'bg-ink-3',
} as const;

/* Vertical rhythm for page sections. `default` is the standard beat; `tight`
   is for a block that belongs to the one above it (e.g. stats under a hero);
   `none` hands spacing back to the caller. */
const spacingClass = {
  default: 'py-16 md:py-24',
  tight: 'pt-0 pb-14 md:pb-16',
  none: '',
} as const;

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  tone?: keyof typeof toneClass;
  spacing?: keyof typeof spacingClass;
  id?: string;
};

export default function Section({ children, className = '', tone, spacing = 'default', id }: SectionProps) {
  return (
    <section id={id} className={`${tone ? toneClass[tone] : ''} ${spacingClass[spacing]} ${className}`}>
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}
