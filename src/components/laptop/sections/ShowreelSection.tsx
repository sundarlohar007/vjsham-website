"use client";

import React from "react";
import { motion } from "framer-motion";
import LazyVideo from "@/components/ui/LazyVideo";

export default function ShowreelSection() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
      {/* Real placeholder video simulated via LazyVideo */}
      <LazyVideo
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        className="absolute inset-0 h-full w-full opacity-60"
      />

      {/* Scan lines moving effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-10"
        animate={{ y: ["-100%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        suppressHydrationWarning
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,255,255,0.15) 50%, transparent 100%)",
          height: "30%",
        }}
      />

      {/* NOW PLAYING overlay */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <motion.div
          className="flex items-center gap-2"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="h-2 w-2 rounded-full bg-red-500" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-red-400">
            Now Playing
          </span>
        </motion.div>

        <h2 className="text-xl font-bold tracking-wider text-white sm:text-2xl">
          SHOWREEL 2025
        </h2>

        <p className="text-[11px] tracking-wide text-neutral-500">
          Visual Highlights &bull; Live Sets &bull; Club Visuals
        </p>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-3 left-4 right-4 z-10">
        <div className="h-0.5 w-full overflow-hidden rounded-full bg-neutral-800">
          <motion.div
            className="h-full rounded-full bg-neon-cyan"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="mt-1 flex justify-between">
          <span className="text-[8px] tabular-nums text-neutral-600">0:00</span>
          <span className="text-[8px] tabular-nums text-neutral-600">3:24</span>
        </div>
      </div>

      {/* Play icon */}
      <motion.div
        className="absolute bottom-8 right-4 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-neon-cyan/30"
        whileHover={{ scale: 1.2 }}
      >
        <div
          className="ml-0.5 h-0 w-0"
          style={{
            borderLeft: "6px solid #00FFFF",
            borderTop: "4px solid transparent",
            borderBottom: "4px solid transparent",
          }}
        />
      </motion.div>
    </div>
  );
}
