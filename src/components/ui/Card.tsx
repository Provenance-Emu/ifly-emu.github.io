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
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/20 transition-colors duration-300 group-hover:bg-[image:var(--gradient-primary)] group-hover:text-white group-hover:ring-transparent"
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
