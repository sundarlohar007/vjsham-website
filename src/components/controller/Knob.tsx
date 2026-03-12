"use client";

import React, { useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface KnobProps {
  label?: string;
  value: number;          // 0–1
  index: number;
  color?: "cyan" | "magenta";
  onChange?: (index: number, value: number) => void;
  className?: string;
}

export default function Knob({
  label,
  value,
  index,
  color = "cyan",
  onChange,
  className = "",
}: KnobProps) {
  const isDragging = useRef(false);
  const lastY = useRef(0);

  // Map 0–1 → -135° to +135° (270° sweep)
  const rotation = -135 + value * 270;
  const isCyan = color === "cyan";
  const accentColor = isCyan ? "#00FFFF" : "#FF00FF";
  const borderColor = isCyan ? "border-neon-cyan/20" : "border-magenta/20";
  const textColor = isCyan ? "text-neon-cyan" : "text-magenta";

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      lastY.current = e.clientY;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const deltaY = lastY.current - e.clientY; // up = positive
      lastY.current = e.clientY;
      const sensitivity = 0.005;
      const newValue = Math.max(0, Math.min(1, value + deltaY * sensitivity));
      onChange?.(index, newValue);
    },
    [value, index, onChange]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div className={`flex flex-col items-center gap-1.5 ${className}`}>
      {/* Knob body */}
      <motion.div
        className={`
          relative flex h-10 w-10 cursor-grab items-center justify-center
          rounded-full border bg-dark-surface select-none
          active:cursor-grabbing
          sm:h-12 sm:w-12
          ${borderColor}
        `}
        animate={{ boxShadow: `0 0 ${8 + value * 15}px ${accentColor}${Math.floor(15 + value * 25).toString(16).padStart(2, '0')}, inset 0 1px 2px rgba(0,0,0,0.5)` }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        suppressHydrationWarning
        style={{
          touchAction: "none",
        }}
      >
        {/* Arc indicator (SVG) */}
        <svg
          className="absolute inset-0 h-full w-full -rotate-[0deg]"
          viewBox="0 0 40 40"
        >
          <circle
            cx="20"
            cy="20"
            r="17"
            fill="none"
            stroke={accentColor}
            strokeOpacity={0.15}
            strokeWidth="2"
            strokeDasharray={`${270 * (Math.PI * 34) / 360}`}
            strokeDashoffset={0}
            strokeLinecap="round"
            transform="rotate(135 20 20)"
          />
          <circle
            cx="20"
            cy="20"
            r="17"
            fill="none"
            stroke={accentColor}
            strokeOpacity={0.8}
            strokeWidth="2.5"
            strokeDasharray={`${value * 270 * (Math.PI * 34) / 360} ${(Math.PI * 34)}`}
            strokeLinecap="round"
            transform="rotate(135 20 20)"
            style={{ filter: `drop-shadow(0 0 ${2 + value * 4}px ${accentColor})` }}
          />
        </svg>

        {/* Rotation indicator line */}
        <div
          className="absolute h-full w-full"
          suppressHydrationWarning
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div
            className="absolute left-1/2 top-1 h-3 w-0.5 -translate-x-1/2 rounded-full"
            suppressHydrationWarning
            style={{ backgroundColor: accentColor }}
          />
        </div>

        {/* Center dot */}
        <div
          className="h-1.5 w-1.5 rounded-full"
          suppressHydrationWarning
          style={{ 
            backgroundColor: accentColor, 
            opacity: 0.5 + value * 0.5,
            boxShadow: `0 0 ${4 + value * 6}px ${accentColor}`
          }}
        />
      </motion.div>

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
