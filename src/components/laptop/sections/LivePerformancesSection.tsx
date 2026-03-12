"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import LazyVideo from "@/components/ui/LazyVideo";

const PROJECTS = [
  { title: "NEON PULSE", venue: "Berghain, Berlin", year: "2025", color: "#00FFFF" },
  { title: "FRACTAL DREAMS", venue: "Fabric, London", year: "2024", color: "#FF00FF" },
  { title: "SYNTH WAVE", venue: "Shelter, Amsterdam", year: "2024", color: "#00FFFF" },
  { title: "VOID SEQUENCE", venue: "Tresor, Berlin", year: "2023", color: "#FF00FF" },
];

export default function LivePerformancesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex h-full w-full flex-col p-3 sm:p-4">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
          Live Performances
        </h2>
        <span className="text-[9px] text-neutral-600">{PROJECTS.length} projects</span>
      </div>

      {/* Project grid 2x2 */}
      <div className="grid flex-1 grid-cols-2 gap-2">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.title}
            className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-md border border-neutral-800 bg-dark-surface p-2.5"
            onHoverStart={() => setHoveredIndex(i)}
            onHoverEnd={() => setHoveredIndex(null)}
            whileHover={{ borderColor: project.color }}
            transition={{ duration: 0.2 }}
          >
            {/* Real placeholder video simulated via LazyVideo */}
            {hoveredIndex === i && (
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
              >
                <LazyVideo
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  className="h-full w-full object-cover grayscale mix-blend-screen"
                />
              </motion.div>
            )}

            <div className="relative z-10">
              <p
                className="text-[11px] font-bold tracking-wider"
                style={{ color: project.color }}
              >
                {project.title}
              </p>
              <p className="mt-0.5 text-[9px] text-neutral-500">{project.venue}</p>
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[8px] text-neutral-600">{project.year}</span>
              {hoveredIndex === i && (
                <motion.span
                  className="text-[8px] uppercase tracking-wider"
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{ color: project.color }}
                >
                  Preview ▶
                </motion.span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
