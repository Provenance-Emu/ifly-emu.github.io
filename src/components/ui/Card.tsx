import React from 'react';

export default function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`card-glass p-6 ${className}`}>{children}</div>;
}

export function FeatureCard({
  icon,
  title,
  children,
  className = '',
}: {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`card-glass group flex flex-col gap-4 p-6 ${className}`}>
      {icon && (
        <div
          aria-hidden="true"
          // The hover fill is --gradient-primary, the same bright orange ramp as
          // .btn-gradient, so the glyph takes the same ink foreground rather than
          // white (10.49 / 8.41 / 6.86:1 instead of 1.88 / 2.89 / 4.46:1). The
          // icons are `fill="currentColor"`, so this reaches the glyph itself.
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/20 transition-colors duration-300 group-hover:bg-[image:var(--gradient-primary)] group-hover:text-ink group-hover:ring-transparent"
        >
          {icon}
        </div>
      )}
      <div>
        <h3 className="mb-1.5 text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-400">{children}</p>
      </div>
    </div>
  );
}
