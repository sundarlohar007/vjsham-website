"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PadProps {
  label?: string;
  color?: "cyan" | "magenta";
  active?: boolean;
  className?: string;
  onTap?: () => void;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

let rippleCounter = 0;

export default function Pad({
  label,
  color = "cyan",
  active = false,
  className = "",
  onTap,
}: PadProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const isCyan = color === "cyan";

  const accentColor = isCyan ? "#00FFFF" : "#FF00FF";
  const baseColor = active
    ? isCyan
      ? "border-neon-cyan"
      : "border-magenta"
    : isCyan
      ? "border-neon-cyan/30"
      : "border-magenta/30";

  const activeBg = active
    ? isCyan
      ? "bg-neon-cyan/15"
      : "bg-magenta/15"
    : "bg-dark-surface";

  const textColor = isCyan ? "text-neon-cyan" : "text-magenta";

  const activeGlow = active
    ? isCyan
      ? "0 0 20px rgba(0,255,255,0.4), 0 0 50px rgba(0,255,255,0.15)"
      : "0 0 20px rgba(255,0,255,0.4), 0 0 50px rgba(255,0,255,0.15)"
    : "inset 0 1px 1px rgba(255,255,255,0.03)";

  const hoverGlow = isCyan
    ? "0 0 15px rgba(0,255,255,0.3), 0 0 40px rgba(0,255,255,0.1)"
    : "0 0 15px rgba(255,0,255,0.3), 0 0 40px rgba(255,0,255,0.1)";

  const handlePress = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      const id = ++rippleCounter;
      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
      onTap?.();
    },
    [onTap]
  );

  return (
    <motion.button
      className={`
        relative flex aspect-square cursor-pointer items-center justify-center
        overflow-hidden rounded-lg border
        transition-colors duration-150
        ${baseColor} ${activeBg}
        ${className}
      `}
      whileHover={{
        scale: 1.05,
        boxShadow: hoverGlow,
      }}
      whileTap={{ scale: 0.92 }}
      animate={
        active
          ? {
              boxShadow: [
                activeGlow,
                isCyan
                  ? "0 0 25px rgba(0,255,255,0.5), 0 0 60px rgba(0,255,255,0.2)"
                  : "0 0 25px rgba(255,0,255,0.5), 0 0 60px rgba(255,0,255,0.2)",
                activeGlow,
              ],
            }
          : { boxShadow: activeGlow }
      }
      transition={
        active
          ? { boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } }
          : { duration: 0.2 }
      }
      onPointerDown={handlePress}
      suppressHydrationWarning
      style={{ touchAction: "none" }}
    >
      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="pointer-events-none absolute rounded-full"
            initial={{
              width: 0,
              height: 0,
              opacity: 0.6,
              left: `${ripple.x}%`,
              top: `${ripple.y}%`,
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              width: 200,
              height: 200,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            suppressHydrationWarning
            style={{ backgroundColor: accentColor }}
          />
        ))}
      </AnimatePresence>

      {/* Label */}
      {label && (
        <span
          className={`relative z-10 text-[10px] font-semibold uppercase tracking-wider ${textColor} ${active ? "opacity-100" : "opacity-60"}`}
        >
          {label}
        </span>
      )}
    </motion.button>
  );
}
