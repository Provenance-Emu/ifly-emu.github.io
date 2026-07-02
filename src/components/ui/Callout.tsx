import React from 'react';

const variantClass = {
  tip: 'border-orange-500/30 bg-orange-500/[0.06]',
  warn: 'border-amber-500/30 bg-amber-500/[0.06]',
  info: 'border-sky-500/30 bg-sky-500/[0.06]',
} as const;

const labelClass = {
  tip: 'text-orange-300',
  warn: 'text-amber-300',
  info: 'text-sky-300',
} as const;

export default function Callout({
  variant = 'info',
  title,
  children,
}: {
  variant?: keyof typeof variantClass;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`my-6 rounded-xl border p-4 ${variantClass[variant]}`}>
      {title && <p className={`mb-1 text-sm font-semibold ${labelClass[variant]}`}>{title}</p>}
      <div className="text-sm leading-relaxed text-gray-300">{children}</div>
    </div>
  );
}
