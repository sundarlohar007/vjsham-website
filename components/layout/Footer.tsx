'use client';

import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  
  if (isHome) return null;
  
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-t border-surface-elevated">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between text-xs text-foreground-muted">
          <span className="font-mono">
            © {new Date().getFullYear()} VJ SHAM
          </span>
          <span className="font-mono hidden sm:block">
            All Rights Reserved
          </span>
        </div>
      </div>
    </footer>
  );
}
