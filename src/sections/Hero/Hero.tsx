import React from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";

const FIRST_NAME = "ASWIN";
const LAST_NAME = "BINU";

/**
 * Chapter 1 — The Cosmic Entrance & System Initialization
 *
 * Completely redesigned with scroll-driven storytelling:
 * - Framer Motion for cinematic vertical transitions
 * - Letter-by-letter magnetic reveals for dramatic impact
 * - Dynamic parallax title that shifts as you scroll
 * - Background constellation that responds to scroll position
 * - Magnetic typographic drops that create depth
 */
export default function Hero() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 md:px-8 select-none"
    >
      {/* Dynamic Background Elements - Responsive to scroll */}
      <ScrollVariableBackground />

      {/* 4-Corner Space OS Targeting Reticles */}
      <div className="absolute inset-6 md:inset-10 flex flex-col justify-between opacity-30">
        <div className="flex justify-between font-mono text-[9px] md:text-[10px] text-[#F6C343]">
          <span>+ [ SECTOR_COORD: 05:38:42 ]</span>
          <span>[ ORBIT_STATION: DEFENSE_NET ] +</span>
        </div>
        <div className="flex justify-between font-mono text-[9px] md:text-[10px] text-[#F6C343]">
          <span>+ [ MISSION_EPOCH: 2026.09 ]</span>
          <span>[ ALL SYSTEMS NOMINAL ] +</span>
        </div>
      </div>

      {/* Main Content - Scroll-Triggered Animations */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-6xl">
        {/* Futuristic Space OS Badge - Magnetic Pulse */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#F6C343]/30 bg-[#F6C343]/10 px-5 py-2 font-mono text-[11px] md:text-xs tracking-widest text-white backdrop-blur-md"
        >
          <span className="relative h-2 w-2 flex items-center justify-center">
            <motion.span
              className="absolute inset-0 rounded-full bg-[#F6C343] animate-ping"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.5, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="relative inline-flex h-full w-full rounded-full bg-[#F6C343]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
          <span className="space-dots text-[#F6C343]">▲ DEEP SPACE INITIALIZATION</span>
        </motion.div>

        {/* Dynamic Title with Scroll-Driven Parallax */}
        <h1
          id="hero-title"
          className="relative font-extrabold tracking-[0.08em] md:tracking-[0.14em] text-white md:text-[11vw] leading-none uppercase drop-shadow-2xl flex flex-wrap justify-center items-center"
        >
          {/* First Name - Cascade Reveal */}
          <div className="overflow-hidden">
            {FIRST_NAME.split("").map((char, index) => (
              <ScrollRevealChar key={`first-${index}`} char={char} index={index} delay={0.1} />
            ))}
          </div>

          {' '}

          {/* Last Name - Cascade Reveal */}
          <div className="overflow-hidden">
            {LAST_NAME.split("").map((char, index) => (
              <ScrollRevealChar key={`last-${index}`} char={char} index={index} delay={0.2} />
            ))}
          </div>
        </h1>

        {/* Editorial Subtitle - Scroll-Staggered Reveal */}
        <motion.div
          className="mt-8 flex flex-col items-center gap-3 font-mono text-xs md:text-sm tracking-widest text-white/90 max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.span
            className="uppercase tracking-[0.3em] text-[#F6C343] font-semibold"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            AI & ML Engineer // Creative Technologist
          </motion.span>
          <p className="mt-2 text-[12px] md:text-xs text-white/60 tracking-wide font-normal leading-relaxed max-w-xl">
            Building autonomous neural systems and edge intelligence for
            high-stakes defense and mission-critical infrastructure.
          </p>
        </motion.div>

        {/* Tactical Telemetry Strip - Magnetic Hologram */}
        <motion.div
          id="hero-telemetry"
          className="mt-8 hidden sm:flex items-center gap-4 rounded-full border border-white/15 bg-white/[0.02] px-7 py-3 font-mono text-[10px] text-white/50 backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F6C343] animate-pulse" />
            SYS_ID: ASWIN-X2026
          </span>
          <span className="text-white/20">•</span>
          <span className="text-[#F6C343]">STATUS: AUTONOMOUS READY</span>
          <span className="text-white/20">•</span>
          <span>CLEARANCE: LEVEL 04</span>
        </motion.div>
      </div>

      {/* Futuristic Scroll Narrative Prompt - Dynamic Glow */}
      <div className="scroll-prompt absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 font-mono text-[10px] md:text-xs tracking-widest text-white/40">
        <span className="uppercase tracking-[0.3em]">SCROLL TO ENTER OPERATOR DECK</span>
        <div className="relative h-8 w-[1px] overflow-hidden bg-white/20">
          <motion.div
            className="absolute inset-0 h-1/2 w-full bg-gradient-to-b from-transparent via-[#F6C343] to-transparent animate-bounce"
            initial={{ y: "-100%" }}
            animate={{ y: ["-100%", "100%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </div>
    </section>
  );
}

/**
 * Dynamic background that responds to scroll position
 * Creates a sense of depth and immersion
 */
function ScrollVariableBackground() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0.3]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.5]);
  const blur = useTransform(scrollY, [0, 500], [0, 20]);
  const parallaxY = useTransform(scrollY, [0, 1000], [0, 50]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        opacity,
        scale,
        backdropFilter: blur ? `blur(${blur}px)` : "blur(0px)",
        y: parallaxY,
      }}
    >
      {/* Ambient glow that shifts with scroll */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#F6C343]/5 via-transparent to-[#F6C343]/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
      {/* Particle dispersion effect */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle at 50% 50%, white 1px, transparent 1px)" }}
        initial={{ backgroundSize: "50px 50px" }}
        animate={{ backgroundSize: ["50px 50px", "100px 100px", "50px 50px"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}

/**
 * Individual letter with scroll-driven reveal animation
 * Creates dramatic reveals as user scrolls
 */
interface ScrollRevealCharProps {
  char: string;
  index: number;
  delay: number;
}

function ScrollRevealChar({ char, index, delay }: ScrollRevealCharProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -50 + index * 10]);

  return (
    <motion.span
      className="overflow-hidden inline-block leading-none"
      style={{ y }}
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: delay + index * 0.05, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <span className="hero-char inline-block px-1">
        {char === " " ? " " : char}
      </span>
    </motion.span>
  );
}