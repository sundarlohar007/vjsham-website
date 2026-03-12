"use client";

import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";

// ── Section mapping ──────────────────────────────────────────────
export const SECTIONS = [
  { id: "showreel", label: "Showreel" },
  { id: "live-performances", label: "Live Performances" },
  { id: "visual-loops", label: "Visual Loops" },
  { id: "installations", label: "Installations" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "booking", label: "Booking" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

// ── Transient Global State for WebGL ─────────────────────────────
// Allows R3F useFrame to read 60fps updates without React re-renders
export const globalControllerState = {
  knobValues: Array(8).fill(0.5),
  faderValues: Array(4).fill(0.5),
};

// ── Context shape ────────────────────────────────────────────────
interface ControllerState {
  activeSection: SectionId;
  knobValues: number[];   // 8 values, each 0–1
  faderValues: number[];  // 4 values, each 0–1
  setActiveSection: (id: SectionId) => void;
  setKnobValue: (index: number, value: number) => void;
  setFaderValue: (index: number, value: number) => void;
}

const ControllerStateContext = createContext<ControllerState | null>(null);

// ── Provider ─────────────────────────────────────────────────────
export function ControllerProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSectionRaw] = useState<SectionId>("showreel");
  const [knobValues, setKnobValues] = useState<number[]>(() =>
    Array(8).fill(0.5)
  );
  const [faderValues, setFaderValues] = useState<number[]>(() =>
    Array(4).fill(0.5)
  );

  const setActiveSection = useCallback((id: SectionId) => {
    setActiveSectionRaw(id);
  }, []);

  const setKnobValue = useCallback((index: number, value: number) => {
    const clamped = Math.max(0, Math.min(1, value));
    globalControllerState.knobValues[index] = clamped;
    setKnobValues((prev) => {
      const next = [...prev];
      next[index] = clamped;
      return next;
    });
  }, []);

  const setFaderValue = useCallback((index: number, value: number) => {
    const clamped = Math.max(0, Math.min(1, value));
    globalControllerState.faderValues[index] = clamped;
    setFaderValues((prev) => {
      const next = [...prev];
      next[index] = clamped;
      return next;
    });
  }, []);

  return (
    <ControllerStateContext.Provider
      value={{
        activeSection,
        knobValues,
        faderValues,
        setActiveSection,
        setKnobValue,
        setFaderValue,
      }}
    >
      {children}
    </ControllerStateContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────────
export function useControllerState(): ControllerState {
  const ctx = useContext(ControllerStateContext);
  if (!ctx) {
    throw new Error("useControllerState must be used within a ControllerProvider");
  }
  return ctx;
}
