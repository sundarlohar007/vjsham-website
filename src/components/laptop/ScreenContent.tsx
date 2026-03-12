"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SectionId } from "@/lib/ControllerStateContext";

import dynamic from "next/dynamic";

const Loader = () => (
  <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-widest text-neon-cyan/50">
    Initializing Module...
  </div>
);

const ShowreelSection = dynamic(() => import("./sections/ShowreelSection"), { loading: Loader });
const LivePerformancesSection = dynamic(() => import("./sections/LivePerformancesSection"), { loading: Loader });
const VisualLoopsSection = dynamic(() => import("./sections/VisualLoopsSection"), { loading: Loader });
const InstallationsSection = dynamic(() => import("./sections/InstallationsSection"), { loading: Loader });
const AboutSection = dynamic(() => import("./sections/AboutSection"), { loading: Loader });
const ServicesSection = dynamic(() => import("./sections/ServicesSection"), { loading: Loader });
const BookingSection = dynamic(() => import("./sections/BookingSection"), { loading: Loader });
const ContactSection = dynamic(() => import("./sections/ContactSection"), { loading: Loader });

const SECTION_MAP: Record<SectionId, React.ComponentType> = {
  showreel: ShowreelSection,
  "live-performances": LivePerformancesSection,
  "visual-loops": VisualLoopsSection,
  installations: InstallationsSection,
  about: AboutSection,
  services: ServicesSection,
  booking: BookingSection,
  contact: ContactSection,
};




interface ScreenContentProps {
  activeSection: SectionId;
}

export default function ScreenContent({ activeSection }: ScreenContentProps) {
  const SectionComponent = SECTION_MAP[activeSection];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeSection}
        className="h-full w-full"
        initial={{
          opacity: 0,
          scale: 0.92,
          filter: "blur(8px)",
          y: 15,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          y: 0,
          transition: {
            duration: 0.45,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
          },
        }}
        exit={{
          opacity: 0,
          scale: 1.05,
          filter: "blur(6px)",
          y: -10,
          transition: {
            duration: 0.3,
            ease: [0.55, 0.06, 0.68, 0.19] as const,
          },
        }}
      >
        <SectionComponent />
      </motion.div>
    </AnimatePresence>
  );
}
