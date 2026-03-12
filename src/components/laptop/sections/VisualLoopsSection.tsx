"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import LazyVideo from "@/components/ui/LazyVideo";

const LOOPS = [
  { title: "Kaleidoscope", bpm: 120, color: "#00FFFF" },
  { title: "Glitch Grid", bpm: 128, color: "#FF00FF" },
  { title: "Neon Rain", bpm: 140, color: "#00FFFF" },
  { title: "Plasma Wave", bpm: 130, color: "#FF00FF" },
  { title: "Data Stream", bpm: 125, color: "#00FFFF" },
  { title: "Void Mesh", bpm: 135, color: "#FF00FF" },
];

export default function VisualLoopsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex h-full w-full flex-col p-3 sm:p-4">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
          Visual Loops
        </h2>
        <span className="text-[9px] text-neutral-600">{LOOPS.length} loops</span>
      </div>

      {/* 3x2 loop grid */}
      <div className="grid flex-1 grid-cols-3 gap-2">
        {LOOPS.map((loop, i) => (
          <motion.div
            key={loop.title}
            className="group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md border border-neutral-800 bg-dark-surface"
            onHoverStart={() => setHoveredIndex(i)}
            onHoverEnd={() => setHoveredIndex(null)}
            whileHover={{ scale: 1.03, borderColor: loop.color }}
            transition={{ duration: 0.2 }}
          >
            {/* Real looping video simulated via LazyVideo */}
            {hoveredIndex === i && (
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
              >
                <LazyVideo
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  className="h-full w-full object-cover grayscale mix-blend-screen"
                />
              </motion.div>
            )}
            {/* Animated shimmer border */}
            <motion.div
              className="absolute inset-0 rounded-md opacity-0"
              whileHover={{ opacity: 1 }}
              suppressHydrationWarning
              style={{
                background: `conic-gradient(from ${i * 60}deg, transparent, ${loop.color}30, transparent)`,
              }}
            />

            {/* Loop icon */}
            <motion.span
              className="text-lg opacity-30"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "linear" }}
              style={{ color: loop.color }}
            >
              ∞
            </motion.span>

            {/* Info */}
            <p
              className="mt-1 text-[9px] font-semibold tracking-wider"
              style={{ color: loop.color }}
            >
              {loop.title}
            </p>
            <p className="text-[8px] text-neutral-600">{loop.bpm} BPM</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
