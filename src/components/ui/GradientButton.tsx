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
// Secondary actions recede via text colour and a neutral edge, so the orange
// fill is the only thing on the page reading as "the" action. gray-300 on ink
// is 13.41:1; the gray-500 border is 4.08:1, clear of the 3:1 UI floor.
const outline = 'rounded-full border border-gray-500 text-gray-300 hover:border-gray-400 hover:bg-white/5 hover:text-white transition-colors';

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
