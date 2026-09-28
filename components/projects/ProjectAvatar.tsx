"use client";

import { motion } from "framer-motion";

interface ProjectAvatarProps {
  type: "radar-hud" | "anomaly-matrix" | "neural-edge";
  isExpanded: boolean;
}

/**
 * Animated Project Insignia / Avatar
 * Morphs smoothly between pill circular thumbnail and card badge.
 */
export default function ProjectAvatar({ type, isExpanded }: ProjectAvatarProps) {
  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
      className={`relative flex shrink-0 items-center justify-center overflow-hidden border transition-all duration-300 ${
        isExpanded
          ? "h-14 w-14 rounded-2xl border-soft-glow/40 bg-[#061A3A] shadow-[0_0_20px_rgba(95,168,255,0.25)]"
          : "h-11 w-11 rounded-full border-soft-glow/30 bg-[#061A3A]/90 shadow-[0_0_12px_rgba(95,168,255,0.2)] md:h-12 md:w-12"
      }`}
    >
      {/* Background ambient pulse */}
      <div className="absolute inset-0 bg-gradient-to-br from-soft-glow/15 via-transparent to-nebula-blue/20" />

      {type === "radar-hud" && (
        <svg
          viewBox="0 0 32 32"
          className="relative z-10 h-6 w-6 text-soft-glow md:h-7 md:w-7"
          fill="none"
          stroke="currentColor"
        >
          {/* Concentric radar rings */}
          <circle cx="16" cy="16" r="12" strokeWidth="1" strokeOpacity="0.4" />
          <circle cx="16" cy="16" r="7" strokeWidth="1" strokeOpacity="0.6" />
          <circle cx="16" cy="16" r="2.5" fill="currentColor" />
          {/* Crosshairs */}
          <line
            x1="16"
            y1="3"
            x2="16"
            y2="29"
            strokeWidth="0.8"
            strokeDasharray="2 2"
            strokeOpacity="0.4"
          />
          <line
            x1="3"
            y1="16"
            x2="29"
            y2="16"
            strokeWidth="0.8"
            strokeDasharray="2 2"
            strokeOpacity="0.4"
          />
          {/* Blip dot */}
          <circle cx="21" cy="10" r="1.5" fill="#5FA8FF" className="animate-ping" />
          <circle cx="21" cy="10" r="1.5" fill="#5FA8FF" />
        </svg>
      )}

      {type === "anomaly-matrix" && (
        <svg
          viewBox="0 0 32 32"
          className="relative z-10 h-6 w-6 text-soft-glow md:h-7 md:w-7"
          fill="none"
          stroke="currentColor"
        >
          {/* Matrix waveform grid */}
          <line x1="4" y1="16" x2="28" y2="16" strokeWidth="0.8" strokeOpacity="0.3" />
          <rect x="6" y="11" width="3" height="10" rx="1" fill="#5FA8FF" fillOpacity="0.6" />
          <rect x="11" y="7" width="3" height="18" rx="1" fill="#5FA8FF" fillOpacity="0.9" />
          <rect x="16" y="13" width="3" height="6" rx="1" fill="#5FA8FF" fillOpacity="0.4" />
          <rect x="21" y="9" width="3" height="14" rx="1" fill="#5FA8FF" fillOpacity="0.8" />
          <rect x="26" y="12" width="2" height="8" rx="0.5" fill="#5FA8FF" fillOpacity="0.5" />
        </svg>
      )}

      {type === "neural-edge" && (
        <svg
          viewBox="0 0 32 32"
          className="relative z-10 h-6 w-6 text-soft-glow md:h-7 md:w-7"
          fill="none"
          stroke="currentColor"
        >
          {/* Quantized chip core */}
          <rect
            x="8"
            y="8"
            width="16"
            height="16"
            rx="3"
            strokeWidth="1.2"
            strokeOpacity="0.8"
          />
          <circle cx="16" cy="16" r="3" fill="#5FA8FF" fillOpacity="0.7" />
          {/* Edge pin connectors */}
          <line x1="12" y1="4" x2="12" y2="8" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="16" y1="4" x2="16" y2="8" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="20" y1="4" x2="20" y2="8" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="12" y1="24" x2="12" y2="28" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="16" y1="24" x2="16" y2="28" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="20" y1="24" x2="20" y2="28" strokeWidth="1" strokeOpacity="0.6" />
        </svg>
      )}
    </motion.div>
  );
}
