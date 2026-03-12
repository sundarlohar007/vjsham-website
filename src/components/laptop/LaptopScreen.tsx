"use client";

import React from "react";
import { motion } from "framer-motion";
import ScreenContent from "./ScreenContent";
import type { SectionId } from "@/lib/ControllerStateContext";

interface LaptopScreenProps {
  activeSection: SectionId;
}

const SECTION_COLORS: Record<SectionId, string> = {
  showreel: "rgba(0, 255, 255, 0.15)",         // cyan
  "live-performances": "rgba(255, 0, 255, 0.15)", // magenta
  "visual-loops": "rgba(0, 255, 255, 0.15)",
  installations: "rgba(255, 0, 255, 0.15)",
  about: "rgba(0, 255, 255, 0.15)",
  services: "rgba(255, 0, 255, 0.15)",
  booking: "rgba(0, 255, 255, 0.15)",
  contact: "rgba(255, 0, 255, 0.15)",
};

export default function LaptopScreen({ activeSection }: LaptopScreenProps) {
  const currentGlow = SECTION_COLORS[activeSection] || "rgba(0, 255, 255, 0.15)";
  
  return (
    <motion.div
      className="relative mx-auto w-full max-w-2xl"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Laptop lid / screen bezel */}
      <motion.div 
        className="rounded-t-2xl border border-neutral-700 bg-dark-card p-2 shadow-lg"
        animate={{
          boxShadow: `0 -10px 40px -10px ${currentGlow}, 0 20px 25px -5px rgba(0, 0, 0, 0.5)`
        }}
        transition={{ duration: 0.5 }}
      >
        {/* Screen area */}
        <div className="relative aspect-video overflow-hidden rounded-lg border border-neutral-700 bg-dark glow-cyan">
          {/* Scanline overlay — always on top */}
          <div
            className="pointer-events-none absolute inset-0 z-20 opacity-[0.03]"
            suppressHydrationWarning
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.05) 2px, rgba(0,255,255,0.05) 4px)",
            }}
          />

          {/* Section content */}
          <div className="relative z-10 h-full w-full">
            <ScreenContent activeSection={activeSection} />
          </div>
        </div>
      </motion.div>

      {/* Laptop base / hinge */}
      <div className="mx-auto h-3 w-[60%] rounded-b-lg bg-neutral-800" />
      <div className="mx-auto h-1 w-[80%] rounded-b-md bg-neutral-800/60" />
    </motion.div>
  );
}
