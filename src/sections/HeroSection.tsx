"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import LaptopScreen from "@/components/laptop/LaptopScreen";
import MidiController from "@/components/controller/MidiController";
import { useControllerState, SECTIONS } from "@/lib/ControllerStateContext";

// Removed SceneCanvas dynamic import from here

export default function HeroSection() {
  const { activeSection } = useControllerState();
  const sectionInfo = SECTIONS.find((s) => s.id === activeSection);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-12 sm:gap-12 sm:py-16 lg:py-20"
    >
      {/* Ambient glow blobs */}
      <motion.div 
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <div className="absolute -top-32 left-1/4 h-64 w-64 rounded-full bg-neon-cyan/5 blur-[120px]" />
        <div className="absolute -bottom-32 right-1/4 h-64 w-64 rounded-full bg-magenta/5 blur-[120px]" />
      </motion.div>

      {/* Laptop */}
      <div className="relative z-10 w-full">
        <LaptopScreen activeSection={activeSection} />
      </div>

      {/* Active section indicator */}
      <motion.div 
        className="relative z-10 flex items-center gap-3"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      >
        <div className="h-px w-8 bg-neon-cyan/30" />
        <AnimatePresence mode="wait">
          <motion.span
            key={activeSection}
            className="text-xs font-medium uppercase tracking-[0.3em] text-neon-cyan/60"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {sectionInfo?.label ?? "Showreel"}
          </motion.span>
        </AnimatePresence>
        <div className="h-px w-8 bg-neon-cyan/30" />
      </motion.div>

      {/* Controller */}
      <div className="relative z-10 w-full">
        <MidiController />
      </div>
    </section>
  );
}
