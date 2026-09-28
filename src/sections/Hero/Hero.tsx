import React from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui";

const FIRST_NAME = "ASWIN";
const LAST_NAME = "BINU";

const RIBBON_TRACK_A = [
  "DETERMINISTIC EDGE RUNTIMES",
  "TACTICAL AVIONICS TELEMETRY",
  "AUTONOMOUS THREAT MATRICES",
  "ZERO-LATENCY INFERENCE",
  "SELF-SUPERVISED SENSOR FUSION",
];

const RIBBON_TRACK_B = [
  "NAGPUR [LAT 21.14°N]",
  "SYS_ARCH: TENSORRT / ROS2 / EMBEDDED C",
  "MISSION EPOCH: 2026.09",
  "IEEE DIRECTIVE // CRITICAL SYSTEMS",
];

interface HeroProps {
  isIntroComplete?: boolean;
}

/**
 * Chapter 1 — The Hero Entrance
 * Strict Silver / Dark Grey Monochrome Identity
 * Balanced typography, left-right spatial spread, and dynamic kinetic text ribbons.
 */
export default function Hero({ isIntroComplete = true }: HeroProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex min-h-screen w-full flex-col justify-between overflow-x-clip px-4 sm:px-6 lg:px-12 select-none py-12 md:py-16"
    >
      {/* ── TOP HUD SPREAD: Left & Right Telemetry Flanks ── */}
      <div className="relative z-10 flex w-full items-start justify-between border-b border-white/10 pb-4 pt-2 font-mono text-[11px] text-white/50">
        {/* Left Flank */}
        <div className="flex flex-col gap-1 text-left">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/70 animate-pulse" />
            <span className="font-semibold text-white/80">TACTICAL_SYS // NODE-01</span>
          </div>
          <span className="text-white/40 tracking-wider">
            SECTOR_COORD: 05:38:42 • LAT 21.14°N
          </span>
        </div>

        {/* Center Space Cue */}
        <div className="hidden md:flex items-center gap-3 font-mono text-[10px] text-white/30 tracking-[0.2em] uppercase">
          <span>ORBIT_STATION</span>
          <span>•</span>
          <span>AUTONOMOUS_MATRIX</span>
        </div>

        {/* Right Flank */}
        <div className="flex flex-col items-end gap-1 text-right">
          <div className="flex items-center gap-2">
            <span className="text-white/70">CLEARANCE: LEVEL 04</span>
            <span className="h-1.5 w-1.5 rounded-full bg-white/70 animate-ping" />
          </div>
          <span className="text-white/40 tracking-wider">
            STATUS: OPERATIONAL [ALL SYSTEMS NOMINAL]
          </span>
        </div>
      </div>

      {/* ── KINETIC TEXT MARQUEE RIBBON 1 (Top Background Ambient) ── */}
      <div className="pointer-events-none absolute top-28 left-0 w-full overflow-hidden opacity-[0.06] select-none py-1">
        <motion.div
          className="flex whitespace-nowrap font-mono text-sm tracking-[0.3em] uppercase text-white"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {Array(4)
            .fill(RIBBON_TRACK_A)
            .flat()
            .map((item, idx) => (
              <span key={`ribbon-a-${idx}`} className="mx-6">
                + {item}
              </span>
            ))}
        </motion.div>
      </div>

      {/* ── MAIN CENTER HERO STAGE (Spread across Left & Right Balance) ── */}
      <div className="relative z-10 my-auto flex w-full max-w-7xl mx-auto flex-col items-center justify-center text-center px-2 py-8">
        {/* Tactical HUD Eyebrow Badge */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: 15 }}
          animate={isIntroComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Label beacon beaconColor="bg-white/80">
            Tactical Avionics // Autonomous Systems
          </Label>
        </motion.div>

        {/* Dynamic Fluid Display Title with Masked Letter Reveals */}
        <h1
          id="hero-title"
          className="relative font-mono font-extrabold text-display tracking-tight text-white uppercase flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-5"
        >
          <span className="inline-block overflow-hidden">
            {FIRST_NAME.split("").map((char, index) => (
              <motion.span
                key={`first-${index}`}
                initial={{ y: "110%", opacity: 0 }}
                animate={isIntroComplete ? { y: 0, opacity: 1 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + index * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block text-white"
              >
                {char}
              </motion.span>
            ))}
          </span>

          <span className="inline-block overflow-hidden">
            {LAST_NAME.split("").map((char, index) => (
              <motion.span
                key={`last-${index}`}
                initial={{ y: "110%", opacity: 0 }}
                animate={isIntroComplete ? { y: 0, opacity: 1 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.35 + index * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block text-silver-bright drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]"
              >
                {char}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Subtitle / Role Narrative with Staggered Reveal */}
        <motion.div
          className="mt-6 flex flex-col items-center gap-3 font-mono text-center max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isIntroComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
        >
          <span className="font-semibold text-white tracking-widest text-caption uppercase border-b border-white/10 pb-1">
            AI & ML Engineer // Defense & Critical Systems
          </span>
          <p className="max-w-xl text-caption sm:text-body text-white/70 leading-relaxed pt-1">
            Architecting deterministic edge runtimes, zero-latency avionics telemetry,
            and self-supervised anomaly matrices for mission-critical infrastructure.
          </p>
        </motion.div>

        {/* Tactical Telemetry Strip — Silver Glass Pill */}
        <motion.div
          id="hero-telemetry"
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 rounded-full border border-white/15 bg-[#12151c]/80 px-5 sm:px-7 py-2 font-mono text-label text-white/70 backdrop-blur-md shadow-glass"
          initial={{ opacity: 0, y: 15 }}
          animate={isIntroComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.75, ease: "easeOut" }}
        >
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span>SYS_ID: ASWIN-X2026</span>
          </span>
          <span className="text-white/20 hidden sm:inline">•</span>
          <span className="text-white font-medium">STATUS: OPERATIONAL</span>
          <span className="text-white/20 hidden sm:inline">•</span>
          <span className="text-white/50">CLEARANCE: LEVEL 04</span>
        </motion.div>
      </div>

      {/* ── KINETIC TEXT MARQUEE RIBBON 2 (Bottom Ambient Movement) ── */}
      <div className="pointer-events-none absolute bottom-24 left-0 w-full overflow-hidden opacity-[0.06] select-none py-1">
        <motion.div
          className="flex whitespace-nowrap font-mono text-sm tracking-[0.3em] uppercase text-white"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        >
          {Array(4)
            .fill(RIBBON_TRACK_B)
            .flat()
            .map((item, idx) => (
              <span key={`ribbon-b-${idx}`} className="mx-6">
                * {item}
              </span>
            ))}
        </motion.div>
      </div>

      {/* ── BOTTOM HUD FOOTER & SCROLL PROMPT ── */}
      <div className="relative z-10 flex w-full items-end justify-between border-t border-white/10 pt-4 pb-2 font-mono text-[11px] text-white/45">
        <div className="text-left">
          <span>MISSION_EPOCH: 2026.09</span>
        </div>

        {/* Scroll cue prompt */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <span className="uppercase tracking-[0.25em] text-[10px] text-white/60">
            SCROLL TO INITIALIZE
          </span>
          <div className="relative h-6 w-[1px] overflow-hidden bg-white/20">
            <motion.div
              className="absolute inset-0 h-1/2 w-full bg-white"
              animate={{ y: ["-100%", "200%"] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>

        <div className="text-right">
          <span>SEC_NET: ENCRYPTED // TLS 1.3</span>
        </div>
      </div>
    </section>
  );
}