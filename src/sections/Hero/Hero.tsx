import React from "react";
import { motion } from "framer-motion";

const FIRST_NAME = "ASWIN";
const LAST_NAME = "BINU";

const TOP_MARQUEE_ITEMS = [
  "AUTONOMOUS MULTI-AGENT WORKFLOWS & APPLIED AI",
  "FULL-STACK WEB PLATFORMS & CLOUD DEPLOYMENTS",
  "PREDICTIVE MACHINE LEARNING & DEEP LEARNING (PYTORCH)",
  "COMPILER CONSTRUCTION, PARSERS & AST GENERATION",
  "OPERATING SYSTEMS & PROCESS CONCURRENCY (POSIX C)",
  "HIGH-PERFORMANCE DATA PIPELINES & REST APIS",
];

const BOTTOM_MARQUEE_ITEMS = [
  "NAGPUR, INDIA [LAT 21.14°N • LON 79.08°E]",
  "PYTHON • TYPESCRIPT • REACT • FASTAPI • PYTORCH • DOCKER",
  "IEEE STUDENT BRANCH CHAIR // LEADERSHIP & R&D",
  "MISSION STATUS: PRODUCTION DEPLOYMENTS & ACTIVE BUILDS",
  "FULL-STACK ARCHITECTURES & AGENTIC ORCHESTRATION",
];

/**
 * Chapter 1 — The Cosmic Entrance & System Initialization
 *
 * Redesigned as a kinetic HUD with balanced spatial spread:
 * - Structured in-flow telemetry and marquee ribbons (guaranteed zero collision)
 * - Monumental display title with masked letter reveals
 * - Zero overflow, seamless scroll integration
 */
export default function Hero({ isIntroComplete }: { isIntroComplete?: boolean }) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] w-full flex-col justify-between overflow-x-clip px-3 sm:px-6 lg:px-12 select-none pt-3 pb-3 sm:pt-4 sm:pb-4 md:pt-6 md:pb-6"
    >
      {/* ── TOP SECTION (HUD + Ambient Marquee Ribbon 1) ── */}
      <div className="relative z-10 flex w-full flex-col gap-2 sm:gap-3">
        {/* Top Telemetry Flanks */}
        <div className="flex w-full items-start justify-between border-b border-white/20 pb-2 sm:pb-3 font-mono text-[10.5px] sm:text-[11px] text-white/95">
          {/* Left Flank */}
          <div className="flex flex-col gap-0.5 text-left">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              <span className="font-semibold text-white text-[10.5px] sm:text-[11px]">TACTICAL_SYS // ONLINE</span>
            </div>
            <span className="text-white/80 tracking-wider text-[9.5px] sm:text-[11px]">
              SECTOR_COORD: 05:38:42 • LAT 21.14°N
            </span>
          </div>

          {/* Center Space Cue */}
          <div className="hidden md:flex items-center gap-3 font-mono text-[10px] text-white/75 tracking-[0.2em] uppercase pt-1">
            <span>ORBIT_STATION</span>
            <span>•</span>
            <span>AUTONOMOUS_MATRIX</span>
          </div>

          {/* Right Flank */}
          <div className="flex flex-col items-end gap-0.5 text-right">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-white font-medium text-[10.5px] sm:text-[11px]">CLEARANCE: GRANTED</span>
              <span className="h-1.5 w-1.5 rounded-full bg-white/90 animate-ping" />
            </div>
            <span className="text-white/80 tracking-wider text-[9.5px] sm:text-[11px]">
              STATUS: OPERATIONAL [ALL SYSTEMS NOMINAL]
            </span>
          </div>
        </div>

        {/* Top Marquee Ribbon (Positioned cleanly below top HUD in flow - zero collision, aria-hidden for screen readers) */}
        <div aria-hidden="true" className="pointer-events-none w-full max-w-full overflow-hidden opacity-40 select-none py-1.5 sm:py-2 border-y border-white/[0.08] bg-white/[0.02] backdrop-blur-[1px]">
          <motion.div
            className="flex whitespace-nowrap font-mono text-[10.5px] sm:text-xs tracking-[0.25em] uppercase text-white/95 font-medium"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          >
            {[...TOP_MARQUEE_ITEMS, ...TOP_MARQUEE_ITEMS].map((item, idx) => (
              <span key={`top-marquee-${idx}`} className="mx-4 sm:mx-6 flex items-center gap-2 sm:gap-3">
                <span className="text-white/50">✦</span>
                <span>{item}</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── MAIN CENTER HERO STAGE (Monumental Creative Typography & Command Matrix) ── */}
      <motion.div
        className="relative z-10 my-auto flex w-full max-w-7xl mx-auto flex-col items-center justify-center text-center px-2 sm:px-4 py-2 sm:py-4 md:py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isIntroComplete ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Tactical Dossier Eyebrow Pill */}
        <motion.div
          className="mb-2 sm:mb-3"
          initial={{ opacity: 0, y: 15 }}
          animate={isIntroComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full border border-white/25 bg-slate-800/30 px-3.5 sm:px-4 py-1.5 font-mono text-[10px] sm:text-xs text-white tracking-widest uppercase backdrop-blur-md shadow-glass">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            <span className="font-bold text-white">AI & ML ENGINEER</span>
            <span className="text-white/40">•</span>
            <span className="text-white/90">FULL-STACK & MULTI-AGENT SYSTEMS</span>
          </div>
        </motion.div>

        {/* Monumental Hero Display Title with Masked Letter Reveals & Spatial Reticles */}
        <div className="relative w-full max-w-5xl my-1 sm:my-2">
          {/* Subtle Cyber Reticle Corner Ticks */}
          <div className="pointer-events-none absolute -left-2 -top-2 font-mono text-[9px] text-white/25 select-none hidden sm:block">
            + [SEC]
          </div>
          <div className="pointer-events-none absolute -right-2 -top-2 font-mono text-[9px] text-white/25 select-none hidden sm:block">
            [SYS] +
          </div>

          <h1
            id="hero-title"
            className="relative font-mono font-extrabold tracking-[-0.03em] uppercase flex flex-wrap justify-center items-center gap-x-2.5 sm:gap-x-8 md:gap-x-10 text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] leading-[0.95] text-white"
          >
            {/* First Name: ASWIN */}
            <span className="inline-block overflow-hidden pb-1">
              {FIRST_NAME.split("").map((char, index) => (
                <motion.span
                  key={`first-${index}`}
                  initial={{ y: isIntroComplete ? "0" : "110%", opacity: isIntroComplete ? 1 : 0 }}
                  animate={isIntroComplete ? { y: 0, opacity: 1 } : {}}
                  transition={{
                    duration: 0.75,
                    delay: 0.15 + index * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                >
                  {char}
                </motion.span>
              ))}
            </span>

            {/* Last Name: BINU */}
            <span className="inline-block overflow-hidden pb-1">
              {LAST_NAME.split("").map((char, index) => (
                <motion.span
                  key={`last-${index}`}
                  initial={{ y: isIntroComplete ? "0" : "110%", opacity: isIntroComplete ? 1 : 0 }}
                  animate={isIntroComplete ? { y: 0, opacity: 1 } : {}}
                  transition={{
                    duration: 0.75,
                    delay: 0.35 + index * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block text-silver-bright drop-shadow-[0_0_40px_rgba(226,232,240,0.4)]"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </h1>

          <div className="pointer-events-none absolute -left-2 -bottom-2 font-mono text-[9px] text-white/25 select-none hidden sm:block">
            LAT 21.14°N
          </div>
          <div className="pointer-events-none absolute -right-2 -bottom-2 font-mono text-[9px] text-white/25 select-none hidden sm:block">
            SYS_ONLINE +
          </div>
        </div>

        {/* Narrative Mission Statement */}
        <motion.div
          className="mt-2 sm:mt-3 flex flex-col items-center gap-2 sm:gap-3 font-mono text-center max-w-2xl px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isIntroComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
        >
          <p className="max-w-xl font-mono text-xs sm:text-sm md:text-base text-white font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            Architecting autonomous multi-agent systems, high-performance web platforms,
            and data-driven machine learning models with uncompromising engineering rigor.
          </p>
        </motion.div>

        {/* Specialization Matrix Chips */}
        <motion.div
          className="mt-2.5 sm:mt-4 flex flex-wrap justify-center gap-1.5 sm:gap-2.5 max-w-3xl"
          initial={{ opacity: 0, y: 15 }}
          animate={isIntroComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
        >
          {["MULTI-AGENT AI", "FULL-STACK REACT & FASTAPI", "APPLIED MACHINE LEARNING", "COMPILERS & SYSTEMS", "IEEE CHAIR"].map((chip) => (
            <span
              key={chip}
              className="rounded-lg border border-white/25 bg-slate-800/35 px-2.5 sm:px-3 py-1 font-mono text-[10px] sm:text-[11px] font-bold tracking-wider text-white backdrop-blur-md shadow-glass transition-all duration-300 hover:border-white/50 hover:bg-white/15"
            >
              {chip}
            </span>
          ))}
        </motion.div>

        {/* Tactical Telemetry Strip — Silver Glass Pill */}
        <motion.div
          id="hero-telemetry"
          className="mt-3 sm:mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-4 rounded-full border border-white/25 bg-slate-800/35 px-4 sm:px-7 py-1.5 sm:py-2 font-mono text-[10px] sm:text-label text-white backdrop-blur-md shadow-glass"
          initial={{ opacity: 0, y: 15 }}
          animate={isIntroComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.75, ease: "easeOut" }}
        >
          <span className="flex items-center gap-1.5 sm:gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span className="font-bold text-white">SYS_ID: ASWIN-X2026</span>
          </span>
          <span className="text-white/50 sm:inline">•</span>
          <span className="text-white font-bold">STATUS: OPERATIONAL</span>
          <span className="text-white/50 sm:inline">•</span>
          <span className="text-white/90">CLEARANCE: LEVEL 04</span>
        </motion.div>
      </motion.div>

      {/* ── BOTTOM SECTION (Ambient Marquee Ribbon 2 + Bottom HUD Footer) ── */}
      <div className="relative z-10 flex w-full flex-col gap-2 sm:gap-3">
        {/* Bottom Marquee Ribbon (Positioned cleanly below bottom HUD in flow - zero collision, aria-hidden for screen readers) */}
        <div aria-hidden="true" className="pointer-events-none w-full max-w-full overflow-hidden opacity-40 select-none py-1.5 sm:py-2 border-y border-white/[0.08] bg-white/[0.02] backdrop-blur-[1px]">
          <motion.div
            className="flex whitespace-nowrap font-mono text-[10.5px] sm:text-xs tracking-[0.25em] uppercase text-white/95 font-medium"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          >
            {[...BOTTOM_MARQUEE_ITEMS, ...BOTTOM_MARQUEE_ITEMS].map((item, idx) => (
              <span key={`bottom-marquee-${idx}`} className="mx-4 sm:mx-6 flex items-center gap-2 sm:gap-3">
                <span className="text-white/50">◈</span>
                <span>{item}</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Bottom Telemetry Footer & Scroll Prompt */}
        <div className="flex w-full items-end justify-between border-t border-white/20 pt-2 sm:pt-3 pb-1 font-mono text-[10.5px] sm:text-[11px] text-white/95">
          <div className="text-left">
            <span className="text-white font-semibold">MISSION_EPOCH: 2026.09</span>
          </div>

          {/* Scroll cue prompt */}
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="uppercase tracking-[0.25em] text-[9.5px] sm:text-[10px] text-white font-bold">
              SCROLL TO INITIALIZE
            </span>
            <div className="relative h-4 sm:h-5 w-[1px] overflow-hidden bg-white/50">
              <motion.div
                className="absolute inset-0 h-1/2 w-full bg-white shadow-[0_0_8px_#ffffff]"
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
            <span className="text-white/90">SEC_NET: ENCRYPTED // TLS 1.3</span>
          </div>
        </div>
      </div>
    </section>
  );
}