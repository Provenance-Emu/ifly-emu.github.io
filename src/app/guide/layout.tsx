'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GUIDE_PAGES } from './guideNav';

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const currentIndex = GUIDE_PAGES.findIndex((p) => p.href === normalized);
  const prev = currentIndex > 0 ? GUIDE_PAGES[currentIndex - 1] : null;
  const next = currentIndex >= 0 && currentIndex < GUIDE_PAGES.length - 1 ? GUIDE_PAGES[currentIndex + 1] : null;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        {/* Sub-nav */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <nav aria-label="Guide navigation" className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
            {GUIDE_PAGES.map((p) => {
              const active = p.href === normalized;
              return (
                <Link
                  key={p.href}
                  href={p.href}
                  className={`whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors ${
                    active ? 'bg-orange-500/15 font-medium text-orange-300' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {p.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <div className="min-w-0">
          <article className="max-w-none">{children}</article>

          {(prev || next) && (
            <div className="mt-12 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
              {prev ? (
                <Link href={prev.href} className="text-sm text-gray-400 hover:text-orange-300">
                  ← {prev.label}
                </Link>
              ) : <span />}
              {next ? (
                <Link href={next.href} className="text-sm text-gray-400 hover:text-orange-300">
                  {next.label} →
                </Link>
              ) : <span />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
