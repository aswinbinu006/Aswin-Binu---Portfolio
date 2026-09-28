import React from "react";
import StarCanvas from "./StarCanvas";
import { useIntroAnimation } from "./useIntroAnimation";
import type { IntroOverlayProps } from "./types";

const FIRST_NAME = "ASWIN";
const LAST_NAME = "BINU";

const SUBTITLE_WORDS = [
  "AI & ML Engineer / Creative Technologist",
  "Architecting Autonomous Systems & Edge Intelligence",
];

/**
 * Cinematic, scroll-free intro overlay inspired by Nakula Framer
 * Adapted for Space OS Portfolio - Warm Gold/Amber Palette.
 *
 * Sequence:
 * 0–0.8s: Pure darkness (#000000)
 * 0.8–2.2s: "ASWIN BINU" revealed letter-by-letter with 20px upward motion
 * 2.2–3.8s: Centered subtitle appears with upward drift and staggered opacity
 * 3.8–5.5s: JWST Tarantula Nebula & twinkling stars emerge behind text; glass CTA reveals
 * 5.5s: Smooth exit fade, scrolling restored, seamless transition into Hero.
 */
export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const {
    isVisible,
    overlayRef,
    nebulaRef,
    nameRef,
    subtitleRef,
    ctaRef,
    handleExplore,
  } = useIntroAnimation({ onComplete });

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      role="region"
      aria-label="Cinematic Universe Introduction"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-black text-white select-none"
    >
      {/* 3.8–5.5s: JWST Tarantula Nebula + Star Canvas Layer */}
      <div
        ref={nebulaRef}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <img
          src="/nebula.webp"
          alt="JWST Tarantula Nebula"
          className="h-full w-full object-cover object-center opacity-65 mix-blend-screen scale-105 transition-transform duration-1000"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(9,10,13,0.1) 0%, rgba(0,0,0,0.85) 75%, #000000 100%)",
          }}
        />
        {/* Delicate star twinkling particles */}
        <StarCanvas />
      </div>

      {/* Skip button for keyboard accessibility and instant bypass */}
      <button
        type="button"
        onClick={handleExplore}
        className="absolute top-6 right-6 z-20 font-mono text-[11px] tracking-widest text-white/40 hover:text-white transition-colors uppercase px-3 py-1 rounded border border-white/10 hover:border-white/30"
      >
        SKIP [ESC]
      </button>

      {/* Main Content Container (keeps everything centered) */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center px-6 text-center">
        {/* 0.8–2.2s: "ASWIN BINU" letter-by-letter reveal */}
        <h1
          ref={nameRef}
          className="font-space flex flex-wrap items-center justify-center text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.22em] sm:tracking-[0.25em] text-white"
        >
          {/* First Name */}
          <span className="inline-flex mr-4 sm:mr-7">
            {FIRST_NAME.split("").map((char, index) => (
              <span
                key={`first-${index}`}
                className="intro-char inline-block"
              >
                {char}
              </span>
            ))}
          </span>

          {/* Last Name */}
          <span className="inline-flex">
            {LAST_NAME.split("").map((char, index) => (
              <span
                key={`last-${index}`}
                className="intro-char inline-block"
              >
                {char}
              </span>
            ))}
          </span>
        </h1>

        {/* 2.2–3.8s: Centered Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-6 sm:mt-8 max-w-xl font-mono text-xs sm:text-sm md:text-base leading-relaxed text-white/70 tracking-wider flex flex-col items-center gap-1"
        >
          {SUBTITLE_WORDS.map((phrase, idx) => (
            <span
              key={idx}
              className="intro-sub-line inline-block"
            >
              {phrase}
            </span>
          ))}
        </p>

        {/* 3.8–5.5s: Glass CTA Button - Warm Gold/Amber */}
        <div className="mt-8 sm:mt-10">
          <button
            ref={ctaRef}
            type="button"
            onClick={handleExplore}
            className="frosted-glass group relative flex items-center gap-3 rounded-full border border-[#F6C343]/30 bg-[#F6C343]/10 px-6 py-3 font-mono text-xs tracking-widest text-white/90 backdrop-blur-xl transition-all duration-300 hover:border-[#F6C343]/60 hover:bg-[#F6C343]/20 hover:text-white hover:shadow-[0_0_30px_rgba(246,195,67,0.4)] cursor-pointer"
          >
            <span>Explore My Universe</span>
            <span className="text-[#F6C343] transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}