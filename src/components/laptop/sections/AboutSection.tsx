"use client";

import React from "react";
import { motion } from "framer-motion";

const GEAR = [
  { category: "Software", items: ["Resolume Arena", "TouchDesigner", "After Effects", "Blender"] },
  { category: "Hardware", items: ["Akai APC40 MK2", "NVIDIA RTX 4090", "Datapath FX4", "Custom LED Mapper"] },
];

export default function AboutSection() {
  return (
    <div className="flex h-full w-full flex-col overflow-y-auto p-3 sm:p-4">
      {/* Header */}
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
        About
      </h2>

      <div className="flex flex-1 gap-3">
        {/* Left — Bio */}
        <div className="flex flex-1 flex-col gap-2">
          {/* Avatar placeholder */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-neon-cyan/30 bg-dark-surface">
              <span className="text-xs text-neon-cyan">S</span>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-white">VJ SHAM</p>
              <p className="text-[8px] text-neutral-500">Visual Artist &bull; Berlin</p>
            </div>
          </div>

          <p className="text-[9px] leading-relaxed text-neutral-400">
            Pushing the boundaries of live visual performance since 2018.
            Specializing in real-time generative graphics, LED mapping,
            and immersive installations for clubs, festivals, and
            galleries worldwide.
          </p>

          <p className="text-[9px] leading-relaxed text-neutral-400">
            Every performance is a dialogue between sound and light —
            creating visual narratives that transform spaces and
            amplify the collective experience.
          </p>
        </div>

        {/* Right — Gear */}
        <div className="flex flex-1 flex-col gap-2">
          {GEAR.map((group) => (
            <div key={group.category}>
              <p className="mb-1 text-[9px] font-semibold uppercase tracking-wider text-magenta opacity-70">
                {group.category}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => (
                  <motion.li
                    key={item}
                    className="flex items-center gap-1 text-[9px] text-neutral-400"
                    whileHover={{ x: 2, color: "#ffffff" }}
                    transition={{ duration: 0.15 }}
                  >
                    <span className="text-neon-cyan opacity-40">›</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
