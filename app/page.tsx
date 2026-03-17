'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import ControlPanel from '@/components/controller/ControlPanel';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

function StaticBackground() {
  return (
    <div 
      className="absolute inset-0 bg-gradient-to-br from-[#0D0D0D] via-[#1a1a2e] to-[#0D0D0D]"
      style={{ contain: 'paint' }}
    />
  );
}

const Visualizer = dynamic(() => import('@/components/visualizer/Visualizer'), {
  ssr: false,
  loading: () => <StaticBackground />,
});

export default function Home() {
  const [showVisualizer, setShowVisualizer] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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
    if (hasLoadedRef.current) return;
    
    const loadVisualizer = () => {
      if (hasLoadedRef.current) return;
      hasLoadedRef.current = true;
      
      setTimeout(() => {
        setShowVisualizer(true);
      }, 100);
    };

    const handleInteraction = () => {
      loadVisualizer();
    };

    window.addEventListener('scroll', handleInteraction, { once: true });
    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });
    window.addEventListener('mousemove', handleInteraction, { once: true });

    const fallbackTimer = setTimeout(() => {
      loadVisualizer();
    }, isMobile ? 5000 : 3000);

    return () => {
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
      clearTimeout(fallbackTimer);
    };
  }, [isMobile]);

  return (
    <main className="min-h-screen">
      <Navigation />
      
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-24 md:pb-0">
        {showVisualizer ? (
          <Visualizer />
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
    </main>
  );
}
