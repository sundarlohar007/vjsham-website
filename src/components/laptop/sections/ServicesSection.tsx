"use client";

import React from "react";
import { motion } from "framer-motion";

const SERVICES = [
  {
    icon: "◎",
    title: "Live VJ",
    description: "Real-time visual performance for clubs, festivals, and concerts with bespoke content.",
    color: "#00FFFF",
  },
  {
    icon: "◈",
    title: "Visual Content",
    description: "Custom loops, generative art, and motion graphics for stages and LED installations.",
    color: "#FF00FF",
  },
  {
    icon: "◇",
    title: "Consultation",
    description: "Technical consulting for venue setups, projection mapping, and AV integration.",
    color: "#00FFFF",
  },
];

export default function ServicesSection() {
  return (
    <div className="flex h-full w-full flex-col p-3 sm:p-4">
      {/* Header */}
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
        Services
      </h2>

      {/* Service cards */}
      <div className="flex flex-1 gap-2">
        {SERVICES.map((service) => (
          <motion.div
            key={service.title}
            className="flex flex-1 flex-col items-center justify-center rounded-lg border border-neutral-800 bg-dark-surface p-3 text-center"
            whileHover={{
              borderColor: service.color,
              boxShadow: `0 0 15px ${service.color}20`,
            }}
            transition={{ duration: 0.25 }}
          >
            <motion.span
              className="mb-2 text-2xl"
              style={{ color: service.color }}
              whileHover={{ scale: 1.2, rotate: 15 }}
            >
              {service.icon}
            </motion.span>

            <p
              className="mb-1 text-[10px] font-bold uppercase tracking-wider"
              style={{ color: service.color }}
            >
              {service.title}
            </p>

            <p className="text-[8px] leading-relaxed text-neutral-500">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
