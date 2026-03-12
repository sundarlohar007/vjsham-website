"use client";

import React from "react";
import { motion } from "framer-motion";

const INSTALLATIONS = [
  { title: "Digital Eden", location: "MoMA PS1, NYC", type: "Immersive", span: "large" },
  { title: "Light Cage", location: "Ars Electronica", type: "Interactive", span: "small" },
  { title: "Neural Garden", location: "STRP Festival", type: "Generative", span: "small" },
  { title: "Pulse Room", location: "Mutek, Montreal", type: "Responsive", span: "large" },
];

export default function InstallationsSection() {
  return (
    <div className="flex h-full w-full flex-col p-3 sm:p-4">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
          Installations
        </h2>
        <span className="text-[9px] text-neutral-600">{INSTALLATIONS.length} works</span>
      </div>

      {/* Masonry-like grid */}
      <div className="grid flex-1 grid-cols-3 grid-rows-2 gap-2">
        {INSTALLATIONS.map((inst, i) => {
          const isLarge = inst.span === "large";
          const color = i % 2 === 0 ? "#00FFFF" : "#FF00FF";
          return (
            <motion.div
              key={inst.title}
              className={`relative flex cursor-pointer flex-col justify-end overflow-hidden rounded-md border border-neutral-800 bg-dark-surface p-2 ${isLarge ? "col-span-2" : "col-span-1"}`}
              whileHover={{ borderColor: color }}
              transition={{ duration: 0.2 }}
            >
              {/* Abstract visual placeholder */}
              <motion.div
                className="absolute inset-0 opacity-10"
                suppressHydrationWarning
                style={{
                  background: `radial-gradient(ellipse at ${isLarge ? "30% 50%" : "50% 50%"}, ${color}30, transparent 60%)`,
                }}
              />

              {/* Floating dots */}
              {[...Array(3)].map((_, j) => (
                <motion.div
                  key={j}
                  className="absolute h-1 w-1 rounded-full"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 2 + j,
                    repeat: Infinity,
                    delay: j * 0.5,
                  }}
                  suppressHydrationWarning
                  style={{
                    backgroundColor: color,
                    left: `${20 + j * 25}%`,
                    top: `${30 + j * 10}%`,
                  }}
                />
              ))}

              <div className="relative z-10">
                <span
                  className="text-[8px] uppercase tracking-wider opacity-60"
                  style={{ color }}
                >
                  {inst.type}
                </span>
                <p className="text-[10px] font-semibold text-white">{inst.title}</p>
                <p className="text-[8px] text-neutral-500">{inst.location}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
