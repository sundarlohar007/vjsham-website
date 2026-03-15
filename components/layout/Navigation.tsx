'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/clients', label: 'Clients' },
  { href: '/gear', label: 'Gear' },
  { href: '/book', label: 'Book' },
];

export default function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isHome 
          ? "bg-transparent" 
          : "bg-background/80 backdrop-blur-xl border-b border-surface-elevated"
      )}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link 
              href="/" 
              className={cn(
                "font-mono text-xl md:text-2xl font-bold tracking-wider transition-colors z-50",
                isHome 
                  ? "text-foreground hover:text-accent-primary" 
                  : "text-foreground"
              )}
            >
              VJ<span className="text-accent-primary">SHAM</span>
            </Link>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "font-mono text-sm uppercase tracking-wider transition-colors",
                    pathname === item.href 
                      ? "text-accent-primary" 
                      : "text-foreground-muted hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-foreground z-50 relative"
              aria-label="Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-[100] md:hidden transition-opacity duration-300",
        mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-background/95 backdrop-blur-xl"
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div className="relative flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "font-mono text-2xl uppercase tracking-wider transition-all",
                pathname === item.href 
                  ? "text-accent-primary scale-110" 
                  : "text-foreground-muted hover:text-foreground hover:scale-105"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
