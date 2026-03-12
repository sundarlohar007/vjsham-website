"use client";

import React from "react";
import { motion } from "framer-motion";
import Pad from "./Pad";
import Knob from "./Knob";
import Fader from "./Fader";
import { useControllerState, SECTIONS } from "@/lib/ControllerStateContext";

const KNOB_LABELS = ["Mix", "Rate", "Depth", "Hue", "Feedback", "Decay", "Drive", "Filter"];
const KNOB_COLORS: Array<"cyan" | "magenta"> = [
  "cyan", "cyan", "magenta", "magenta",
  "cyan", "cyan", "magenta", "magenta",
];

const FADER_LABELS = ["Master", "Aux", "FX Send", "Monitor"];
const FADER_COLORS: Array<"cyan" | "magenta"> = ["cyan", "magenta", "cyan", "magenta"];

const PAD_COLORS: Array<"cyan" | "magenta"> = [
  "cyan", "magenta", "cyan", "magenta",
  "magenta", "cyan", "magenta", "cyan",
];

export default function MidiController() {
  const {
    activeSection,
    knobValues,
    faderValues,
    setActiveSection,
    setKnobValue,
    setFaderValue,
  } = useControllerState();

  return (
    <motion.div
      className="mx-auto w-full max-w-2xl rounded-2xl border border-neutral-700 bg-dark-card p-4 shadow-xl sm:p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
    >
      {/* Top section: Knobs + Faders */}
      <div className="mb-4 flex items-end justify-between gap-4 border-b border-neutral-800 pb-4">
        {/* Knobs — 2 rows of 4 */}
        <div className="grid grid-cols-4 gap-x-3 gap-y-2 sm:gap-x-5 sm:gap-y-3">
          {KNOB_LABELS.map((lbl, i) => (
            <Knob
              key={lbl}
              label={lbl}
              index={i}
              value={knobValues[i]}
              color={KNOB_COLORS[i]}
              onChange={setKnobValue}
            />
          ))}
        </div>

        {/* Faders */}
        <div className="flex gap-2 sm:gap-3">
          {FADER_LABELS.map((lbl, i) => (
            <Fader
              key={lbl}
              label={lbl}
              index={i}
              value={faderValues[i]}
              color={FADER_COLORS[i]}
              onChange={setFaderValue}
            />
          ))}
        </div>
      </div>

      {/* Bottom section: Pad Grid (2 rows × 4 cols) */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {SECTIONS.map((section, i) => (
          <Pad
            key={section.id}
            label={section.label}
            color={PAD_COLORS[i]}
            active={activeSection === section.id}
            onTap={() => setActiveSection(section.id)}
          />
        ))}
      </div>

      {/* Controller brand strip */}
      <div className="mt-4 flex items-center justify-center">
        <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-neutral-600">
          SHAM Controller v1
        </span>
      </div>
    </motion.div>
  );
}
