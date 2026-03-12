"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BookingSection() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit booking");
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neon-cyan/20 text-neon-cyan">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-neon-cyan">
            Request Sent
          </h2>
          <p className="text-[10px] text-neutral-400">
            Thank you. We will be in touch shortly.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="mt-6 rounded-md border border-neutral-700 bg-dark-card px-4 py-2 text-[10px] uppercase tracking-wider text-neutral-400 hover:text-white"
          >
            Send Another
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto p-3 sm:p-4">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
        Booking Request
      </h2>

      {error && (
        <div className="mb-4 rounded-md border border-red-500/50 bg-red-500/10 p-2 text-[10px] text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-3">
        {/* Name & Email Row */}
        <div className="flex gap-2">
          <div className="flex flex-1 flex-col gap-1">
            <label className="text-[8px] font-medium uppercase tracking-wider text-neutral-500">
              Name *
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full rounded-md border border-neutral-800 bg-dark-surface px-2 py-1.5 text-[10px] text-neutral-300 placeholder-neutral-600 focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan/50"
              placeholder="Your name"
            />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <label className="text-[8px] font-medium uppercase tracking-wider text-neutral-500">
              Email *
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-md border border-neutral-800 bg-dark-surface px-2 py-1.5 text-[10px] text-neutral-300 placeholder-neutral-600 focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan/50"
              placeholder="your@email.com"
            />
          </div>
        </div>

        {/* Event Details Row */}
        <div className="flex gap-2">
          <div className="flex flex-1 flex-col gap-1">
            <label className="text-[8px] font-medium uppercase tracking-wider text-neutral-500">
              Date
            </label>
            <input
              type="date"
              name="event_date"
              className="w-full rounded-md border border-neutral-800 bg-dark-surface px-2 py-1.5 text-[10px] text-neutral-300 [color-scheme:dark] focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan/50"
            />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <label className="text-[8px] font-medium uppercase tracking-wider text-neutral-500">
              Type
            </label>
            <select
              name="event_type"
              className="w-full rounded-md border border-neutral-800 bg-dark-surface px-2 py-1.5 text-[10px] text-neutral-300 focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan/50"
            >
              <option value="">Select type...</option>
              <option value="Festival">Festival</option>
              <option value="Club Night">Club Night</option>
              <option value="Corporate">Corporate</option>
              <option value="Private">Private Event</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2">
           <div className="flex flex-1 flex-col gap-1">
            <label className="text-[8px] font-medium uppercase tracking-wider text-neutral-500">
              Location / City
            </label>
            <input
              type="text"
              name="event_location"
              className="w-full rounded-md border border-neutral-800 bg-dark-surface px-2 py-1.5 text-[10px] text-neutral-300 placeholder-neutral-600 focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan/50"
              placeholder="e.g. Berlin, GE"
            />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <label className="text-[8px] font-medium uppercase tracking-wider text-neutral-500">
              Est. Budget
            </label>
            <input
              type="text"
              name="budget"
              className="w-full rounded-md border border-neutral-800 bg-dark-surface px-2 py-1.5 text-[10px] text-neutral-300 placeholder-neutral-600 focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan/50"
              placeholder="$..."
            />
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-1 flex-col gap-1">
          <label className="text-[8px] font-medium uppercase tracking-wider text-neutral-500">
            Details
          </label>
          <textarea
            name="message"
            className="w-full flex-1 resize-none rounded-md border border-neutral-800 bg-dark-surface px-2 py-1.5 text-[10px] text-neutral-300 placeholder-neutral-600 focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan/50"
            placeholder="Tell us about your event vision, technical requirements, hours..."
          />
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 flex w-full items-center justify-center rounded-md border border-neon-cyan/50 bg-neon-cyan/10 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-neon-cyan disabled:cursor-not-allowed disabled:opacity-50"
          whileHover={!isSubmitting ? {
            backgroundColor: "rgba(0,255,255,0.2)",
            boxShadow: "0 0 15px rgba(0,255,255,0.2)",
          } : {}}
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
        >
          {isSubmitting ? "Sending..." : "Submit Booking"}
        </motion.button>
      </form>
    </div>
  );
}
