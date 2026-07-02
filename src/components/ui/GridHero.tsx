import React from 'react';

export default function GridHero({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      <div className="grid-overlay" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute left-1/2 top-20 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-orange-600/5 blur-2xl" />
      </div>
      <div className="container relative mx-auto px-4">{children}</div>
    </section>
  );
}
