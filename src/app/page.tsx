"use client";

import { ControllerProvider } from "@/lib/ControllerStateContext";
import HeroSection from "@/sections/HeroSection";
import dynamic from "next/dynamic";

const SceneCanvas = dynamic(() => import("@/components/scene/SceneCanvas"), {
  ssr: false,
});

export default function Home() {
  return (
    <ControllerProvider>
      <main className="relative min-h-screen">
        <div className="pointer-events-none absolute inset-0 z-0">
          <SceneCanvas />
        </div>
        <div className="relative z-10">
          <HeroSection />
        </div>
      </main>
    </ControllerProvider>
  );
}
