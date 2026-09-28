import React from "react";
import StarCanvas from "./StarCanvas";
import { useIntroAnimation } from "./useIntroAnimation";
import type { IntroOverlayProps } from "./types";

const HOOK_LINE_1 = "We don't just teach machines to calculate.";
const HOOK_LINE_2 = "We build systems that endure when failure isn't an option.";

/**
 * Cinematic, suspenseful intro overlay:
 * - Matching cosmic deep space theme with ambient glass wash
 * - Telemetry reticles and coordinates (LAT 21.14°N)
 * - Suspenseful manifesto hook that builds anticipation for the operator reveal
 * - Smooth camera aperture dissolve directly into the monumental ASWIN BINU hero
 */
export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const {
    isVisible,
    overlayRef,
    terminalRef,
    ctaRef,
    handleExplore,
  } = useIntroAnimation({ onComplete });

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      role="region"
      aria-label="System Initialization Directive"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#090a0f]/92 backdrop-blur-md text-white select-none"
    >
      {/* Dynamic Cosmic Star Particles Layer */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <StarCanvas />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 65% at 50% 50%, rgba(18,21,28,0.3) 0%, rgba(9,10,15,0.85) 65%, #090a0f 100%)",
          }}
        />
      </div>

      {/* Cyber Reticles & Corner Telemetry */}
      <div className="intro-telemetry pointer-events-none absolute top-6 left-6 z-20 font-mono text-[9px] sm:text-[10px] tracking-widest text-white/40 select-none flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
        <span>NODE: 01 // LAT 21.14°N</span>
      </div>

      <div className="intro-telemetry pointer-events-none absolute bottom-6 left-6 z-20 font-mono text-[9px] sm:text-[10px] tracking-widest text-white/40 select-none hidden sm:block">
        <span>DIRECTIVE // AUTONOMOUS_EDGE</span>
      </div>

      <div className="intro-telemetry pointer-events-none absolute bottom-6 right-6 z-20 font-mono text-[9px] sm:text-[10px] tracking-widest text-white/40 select-none hidden sm:block">
        <span>SECURITY // TLS 1.3 • LEVEL 04</span>
      </div>

      {/* Skip Button */}
      <button
        type="button"
        onClick={handleExplore}
        className="absolute top-6 right-6 z-20 font-mono text-[10px] sm:text-[11px] tracking-widest text-white/40 hover:text-white transition-colors uppercase px-3 py-1 rounded border border-white/10 hover:border-white/30 cursor-pointer backdrop-blur-md"
      >
        SKIP [ESC]
      </button>

      {/* Main Suspense Container */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center px-6 text-center">
        {/* Terminal Status Pill */}
        <div
          ref={terminalRef}
          className="mb-8 sm:mb-10 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.04] px-4 py-1.5 font-mono text-[10px] sm:text-xs text-white/80 tracking-widest uppercase backdrop-blur-md shadow-glass"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          <span className="font-semibold text-white">SYSTEM PROTOCOL</span>
          <span className="text-white/30">•</span>
          <span className="text-white/60">INITIALIZING NEURAL TELEMETRY</span>
        </div>

        {/* Suspense Manifesto Headline */}
        <div className="flex flex-col items-center gap-3 sm:gap-4 max-w-3xl">
          {/* Line 1 */}
          <h2 className="font-mono text-lg sm:text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-white/70 leading-[1.3] flex flex-wrap justify-center gap-x-2.5 sm:gap-x-3">
            {HOOK_LINE_1.split(" ").map((word, idx) => (
              <span key={`w1-${idx}`} className="hook-word-1 inline-block overflow-visible">
                {word}
              </span>
            ))}
          </h2>

          {/* Line 2 with Specular White Glow */}
          <h2 className="font-mono text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-[1.3] flex flex-wrap justify-center gap-x-2.5 sm:gap-x-3">
            {HOOK_LINE_2.split(" ").map((word, idx) => (
              <span
                key={`w2-${idx}`}
                className="hook-word-2 inline-block overflow-visible text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.35)]"
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* Action Button */}
        <div className="mt-10 sm:mt-12">
          <button
            ref={ctaRef}
            type="button"
            onClick={handleExplore}
            className="group relative flex items-center gap-3 rounded-full border border-white/25 bg-white/[0.08] px-6 sm:px-8 py-3 sm:py-3.5 font-mono text-xs sm:text-sm tracking-widest text-white backdrop-blur-xl transition-all duration-300 hover:border-white/60 hover:bg-white/[0.16] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] cursor-pointer"
          >
            <span>INITIALIZE OPERATOR</span>
            <span className="text-white/80 transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}