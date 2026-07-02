import React from 'react';
import GridHero from './GridHero';

export default function PageHeader({
  title,
  subtitle,
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  return (
    <GridHero className="pt-16 pb-10 text-center">
      <div className="mx-auto max-w-3xl">
        {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-orange-400">{eyebrow}</p>}
        <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-400">{subtitle}</p>}
      </div>
    </GridHero>
  );
}
