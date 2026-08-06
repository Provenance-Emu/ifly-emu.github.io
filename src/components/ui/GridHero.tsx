import React from 'react';

export default function GridHero({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      <div className="grid-overlay" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {/* Radial-gradient glow instead of filter:blur() — same look, no expensive paint cost on the LCP-critical hero */}
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.10),transparent_70%)]" />
        <div className="absolute left-1/2 top-20 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(234,88,12,0.05),transparent_70%)]" />
      </div>
      <div className="container relative mx-auto px-4">{children}</div>
    </section>
  );
}
