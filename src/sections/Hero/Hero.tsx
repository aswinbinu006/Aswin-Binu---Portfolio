import React from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui";

const FIRST_NAME = "ASWIN";
const LAST_NAME = "BINU";

interface HeroProps {
  isIntroComplete?: boolean;
}

/**
 * Chapter 1 — The Hero Entrance
 * Strict palette: #020814 / #061A3A / #0F4C81 / #5FA8FF / #F7FBFF
 * Fluid clamp typography, zero horizontal overflow, seamless background integration.
 */
export default function Hero({ isIntroComplete = true }: HeroProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-clip px-4 sm:px-6 md:px-8 select-none py-24 md:py-32"
    >
      {/* 4-Corner Space OS Targeting Reticles (Constrained to prevent overflow) */}
      <div
        className="pointer-events-none absolute inset-4 sm:inset-6 md:inset-10 flex flex-col justify-between opacity-35"
        aria-hidden="true"
      >
        <div className="flex justify-between font-mono text-label text-cyan">
          <span>+ [ SECTOR_COORD: 05:38:42 ]</span>
          <span className="hidden sm:inline">[ ORBIT_STATION: DEFENSE_NET ] +</span>
          <span className="sm:hidden">+</span>
        </div>
        <div className="flex justify-between font-mono text-label text-cyan">
          <span>+ [ MISSION_EPOCH: 2026.09 ]</span>
          <span className="hidden sm:inline">[ ALL SYSTEMS NOMINAL ] +</span>
          <span className="sm:hidden">+</span>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto w-full">
        {/* Tactical HUD Eyebrow Badge */}
        <div className="mb-6">
          <Label beacon beaconColor="bg-cyan">
            Tactical Avionics // Autonomous Systems
          </Label>
        </div>

        {/* Dynamic Fluid Display Title */}
        <h1
          id="hero-title"
          className="relative font-mono font-extrabold text-display tracking-tight text-luminous uppercase drop-shadow-2xl flex flex-wrap justify-center items-center gap-x-4 sm:gap-x-6"
        >
          <span className="inline-block overflow-hidden">
            {FIRST_NAME.split("").map((char, index) => (
              <motion.span
                key={`first-${index}`}
                initial={{ y: "100%", opacity: 0 }}
                animate={isIntroComplete ? { y: 0, opacity: 1 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.1 + index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </span>

          <span className="inline-block overflow-hidden">
            {LAST_NAME.split("").map((char, index) => (
              <motion.span
                key={`last-${index}`}
                initial={{ y: "100%", opacity: 0 }}
                animate={isIntroComplete ? { y: 0, opacity: 1 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.35 + index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block text-cyan"
              >
                {char}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Subtitle / Role */}
        <motion.div
          className="mt-6 sm:mt-8 flex flex-col items-center gap-3 font-mono text-body text-luminous-muted max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isIntroComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <span className="font-semibold text-cyan-bright tracking-widest text-caption uppercase">
            AI & ML Engineer // Defense & Critical Systems
          </span>
          <p className="max-w-xl text-caption sm:text-body text-luminous-dim leading-relaxed">
            Architecting deterministic edge runtimes, zero-latency avionics telemetry,
            and self-supervised anomaly matrices for mission-critical infrastructure.
          </p>
        </motion.div>

        {/* Tactical Telemetry Strip */}
        <motion.div
          id="hero-telemetry"
          className="mt-8 hidden sm:flex items-center gap-4 rounded-full border border-luminous-faint bg-navy-surface px-6 py-2.5 font-mono text-label text-luminous-dim backdrop-blur-md"
          initial={{ opacity: 0, y: 15 }}
          animate={isIntroComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
            SYS_ID: ASWIN-X2026
          </span>
          <span className="text-luminous-faint">•</span>
          <span className="text-cyan">STATUS: OPERATIONAL</span>
          <span className="text-luminous-faint">•</span>
          <span>CLEARANCE: LEVEL 04</span>
        </motion.div>
      </div>

      {/* Scroll cue prompt */}
      <div className="scroll-prompt absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-label text-luminous-dim tracking-widest">
        <span className="uppercase tracking-[0.25em]">SCROLL TO INITIALIZE</span>
        <div className="relative h-7 w-[1px] overflow-hidden bg-luminous-faint">
          <motion.div
            className="absolute inset-0 h-1/2 w-full bg-cyan"
            animate={{ y: ["-100%", "200%"] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </section>
  );
}