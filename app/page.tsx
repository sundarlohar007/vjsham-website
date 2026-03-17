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

function CSSAnimatedBackground() {
  return (
    <div 
      className="absolute inset-0 -z-10"
      style={{
        background: 'linear-gradient(-45deg, #0D0D0D, #1a1a2e, #16213e, #0f3460, #1a1a2e, #0D0D0D)',
        backgroundSize: '400% 400%',
        animation: 'gradientBG 15s ease infinite',
      }}
    />
  );
}

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [showVisualizer, setShowVisualizer] = useState(false);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile || hasLoadedRef.current) return;
    
    const handleLoad = () => {
      if (hasLoadedRef.current) return;
      hasLoadedRef.current = true;
      setShowVisualizer(true);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, [isMobile]);

  return (
    <main className="min-h-screen">
      <Navigation />
      
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-24 md:pb-0">
        {isMobile ? (
          <CSSAnimatedBackground />
        ) : showVisualizer ? (
          <Suspense fallback={<StaticBackground />}>
            <Visualizer />
          </Suspense>
        ) : (
          <StaticBackground />
        )}
        
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
      
      <style jsx global>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </main>
  );
}
