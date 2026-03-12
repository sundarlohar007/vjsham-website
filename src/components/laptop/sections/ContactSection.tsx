"use client";

import React from "react";
import { motion } from "framer-motion";

const SOCIALS = [
  { name: "Instagram", handle: "@vjsham", icon: "◐", color: "#FF00FF" },
  { name: "YouTube", handle: "VJ SHAM", icon: "▶", color: "#FF0000" },
  { name: "Vimeo", handle: "vjsham", icon: "▷", color: "#00BFFF" },
  { name: "SoundCloud", handle: "vjsham", icon: "☁", color: "#FF6600" },
];

export default function ContactSection() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-3 sm:p-4">
      {/* Tagline */}
      <motion.p
        className="mb-4 text-center text-lg font-light tracking-[0.2em] text-neutral-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Let&apos;s create <span className="text-neon-cyan text-glow-cyan">together</span>
      </motion.p>

      {/* Email */}
      <motion.a
        href="mailto:hello@vjsham.com"
        className="mb-4 text-[11px] font-medium tracking-wider text-neon-cyan/80 transition-colors hover:text-neon-cyan"
        whileHover={{ scale: 1.05 }}
      >
        hello@vjsham.com
      </motion.a>

      {/* Social grid */}
      <div className="grid grid-cols-2 gap-2">
        {SOCIALS.map((social, i) => (
          <motion.div
            key={social.name}
            className="flex cursor-pointer items-center gap-2 rounded-md border border-neutral-800 bg-dark-surface px-3 py-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            whileHover={{
              borderColor: social.color,
              boxShadow: `0 0 10px ${social.color}20`,
            }}
          >
            <span className="text-sm" style={{ color: social.color }}>
              {social.icon}
            </span>
            <div>
              <p className="text-[9px] font-semibold text-white">{social.name}</p>
              <p className="text-[8px] text-neutral-500">{social.handle}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Location */}
      <p className="mt-3 text-[8px] uppercase tracking-[0.3em] text-neutral-600">
        Based in Berlin &bull; Available Worldwide
      </p>
    </div>
  );
}
