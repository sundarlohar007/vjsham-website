'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import ControlPanel from '@/components/controller/ControlPanel';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

const Visualizer = dynamic(() => import('@/components/visualizer/Visualizer'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[#0D0D0D]" />
  ),
});

function DelayedVisualizer() {
  const [showVisualizer, setShowVisualizer] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVisualizer(true);
    }, 1500); // Delay loading by 1.5 seconds to prioritize LCP

    return () => clearTimeout(timer);
  }, []);

  if (!showVisualizer) {
    return <div className="absolute inset-0 bg-[#0D0D0D]" />;
  }

  return <Visualizer />;
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section - Above the fold - Critical for LCP */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-24 md:pb-0">
        {/* Visualizer Background - Loaded after hero content */}
        <DelayedVisualizer />
        
        {/* Hero Content - Rendered immediately for LCP */}
        <div className="relative z-10 text-center px-4 pt-16" style={{ contain: 'layout style paint' }}>
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
      
      {/* Control Panel - Below fold */}
      <ControlPanel />
      
      <Footer />
    </main>
  );
}
