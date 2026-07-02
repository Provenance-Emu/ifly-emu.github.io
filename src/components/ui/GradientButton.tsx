import Link from 'next/link';
import React from 'react';

type GradientButtonProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
  variant?: 'solid' | 'outline';
};

const base = 'inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink';
const solid = 'btn-gradient';
const outline = 'rounded-full border border-orange-500/50 text-orange-300 hover:bg-orange-500/10 transition-colors';

export default function GradientButton({ href, children, external = false, className = '', variant = 'solid' }: GradientButtonProps) {
  const classes = `${base} ${variant === 'solid' ? solid : outline} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
