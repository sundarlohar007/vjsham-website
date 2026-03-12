"use client";

import React, { useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface FaderProps {
  label?: string;
  value: number;          // 0–1
  index: number;
  color?: "cyan" | "magenta";
  onChange?: (index: number, value: number) => void;
  className?: string;
}

export default function Fader({
  label,
  value,
  index,
  color = "cyan",
  onChange,
  className = "",
}: FaderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const isCyan = color === "cyan";
  const accentColor = isCyan ? "#00FFFF" : "#FF00FF";
  const textColor = isCyan ? "text-neon-cyan" : "text-magenta";

  const thumbBottomPercent = value * 100;

  const updateValueFromPointer = useCallback(
    (clientY: number) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      // Invert: top of track = 1, bottom = 0
      const ratio = 1 - (clientY - rect.top) / rect.height;
      const clamped = Math.max(0, Math.min(1, ratio));
      onChange?.(index, clamped);
    },
    [index, onChange]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updateValueFromPointer(e.clientY);
    },
    [updateValueFromPointer]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      updateValueFromPointer(e.clientY);
    },
    [updateValueFromPointer]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div className={`flex flex-col items-center gap-1.5 ${className}`}>
      {/* Fader track */}
      <div
        ref={trackRef}
        className="relative h-24 w-3 cursor-grab rounded-full border border-neutral-700 bg-dark-surface active:cursor-grabbing sm:h-28"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        suppressHydrationWarning
        style={{
          touchAction: "none",
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        {/* Filled portion */}
        <div
          className="absolute bottom-0 left-0 w-full rounded-full opacity-30"
          suppressHydrationWarning
          style={{
            height: `${thumbBottomPercent}%`,
            background: `linear-gradient(to top, ${accentColor}, transparent)`,
          }}
        />

        {/* Thumb */}
        <motion.div
          className="absolute left-1/2 h-2.5 w-5 -translate-x-1/2 rounded-sm"
          animate={{
            bottom: `calc(${thumbBottomPercent}% - 5px)`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          suppressHydrationWarning
          style={{
            backgroundColor: accentColor,
            boxShadow: `0 0 8px ${accentColor}80`,
          }}
        />
      </div>

      {/* Label + Value */}
      <div className="flex flex-col items-center">
        {label && (
          <span
            className={`text-[9px] font-medium uppercase tracking-widest ${textColor} opacity-60`}
          >
            {label}
          </span>
        )}
        <span className={`text-[8px] tabular-nums ${textColor} opacity-40`}>
          {(value * 100).toFixed(0)}
        </span>
      </div>
    </div>
  );
}
