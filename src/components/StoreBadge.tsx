import React from 'react';

export type StoreBadgeProps = {
  href: string;
  eyebrow: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'>;

/* Dark "store badge" style button — small icon at left, tiny eyebrow label
   above a bold product name (e.g. "Get it on / AltStore"). Modeled on the
   provenance-emu.com store badges but built as inline markup rather than a
   static image so eyebrow/label/icon can vary per store. */
const StoreBadge: React.FC<StoreBadgeProps> = ({ href, eyebrow, label, icon, external = true, className, ...rest }) => {
  const classes =
    'card-glass card-static inline-flex items-center gap-3 px-4 py-2.5 rounded-lg border border-white/15 ' +
    'hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ' +
    'focus-visible:ring-offset-2 focus-visible:ring-offset-ink ' +
    (className ?? '');

  const content = (
    <>
      <span className="shrink-0 text-white" aria-hidden="true">{icon}</span>
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[10px] font-normal text-gray-400 uppercase tracking-[0.08em]">{eyebrow}</span>
        <span className="text-base font-semibold text-white -mt-0.5">{label}</span>
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <a href={href} className={classes} {...rest}>
      {content}
    </a>
  );
};

export const AltStoreIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className ?? 'w-6 h-6'} aria-hidden="true">
    <rect x="1" y="1" width="22" height="22" rx="6" fill="currentColor" opacity="0.12" />
    <rect x="1.5" y="1.5" width="21" height="21" rx="5.5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <text x="12" y="16.5" textAnchor="middle" fontFamily="-apple-system, 'Helvetica Neue', Arial, sans-serif" fontSize="12" fontWeight="700" fill="currentColor">A</text>
  </svg>
);

export const SideStoreIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className ?? 'w-6 h-6'} aria-hidden="true">
    <rect x="1" y="1" width="22" height="22" rx="6" fill="currentColor" opacity="0.12" />
    <rect x="1.5" y="1.5" width="21" height="21" rx="5.5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <text x="12" y="16.5" textAnchor="middle" fontFamily="-apple-system, 'Helvetica Neue', Arial, sans-serif" fontSize="12" fontWeight="700" fill="currentColor">S</text>
  </svg>
);

export default StoreBadge;
