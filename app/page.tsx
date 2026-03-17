'use client';

import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import ControlPanel from '@/components/controller/ControlPanel';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

const Visualizer = lazy(() => import('@/components/visualizer/Visualizer'));

function StaticBackground() {
  return (
    <div 
      className="absolute inset-0 bg-gradient-to-br from-[#0D0D0D] via-[#1a1a2e] to-[#0D0D0D]"
      style={{ contain: 'paint' }}
    />
  );
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;

    const handleLoad = () => {
      setIsLoaded(true);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  return (
    <main className="min-h-screen">
      <Navigation />
      
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-24 md:pb-0">
        <Suspense fallback={<StaticBackground />}>
          <Visualizer isLoaded={isLoaded} />
        </Suspense>
        
        <div 
          className="relative z-10 text-center px-4 pt-16" 
          style={{ contain: 'layout style paint' }}
        >
          <h1 className="font-mono text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold tracking-wider mb-3 md:mb-4">
            <span className="text-foreground">VJ</span>
            <span className="text-accent-primary">SHAM</span>
          </h1>
          <p className="font-sans text-sm md:text-lg lg:text-xl text-foreground-muted max-w-xs md:max-w-md mx-auto">
            Visual Jockey • Live Visuals • Interactive Experiences
          </p>
          <p className="font-mono text-xs text-accent-secondary mt-2 animate-pulse md:hidden">
            ↓ Try the controls ↓
          </p>
          <p className="font-mono text-xs md:text-sm text-accent-secondary mt-3 md:mt-4 animate-pulse hidden md:block">
            ↓ Interact with the controls below ↓
          </p>
        </div>
      </section>
      
      <ControlPanel />
      
      <Footer />
    </main>
  );
}
