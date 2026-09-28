import React from "react";
import { useIntroAnimation } from "./useIntroAnimation";
import type { IntroOverlayProps } from "./types";

const IDENTITY_MARKERS = [
  { label: "NODE 01", value: "NAGPUR" },
  { label: "SYSTEM", value: "AI / ML" },
  { label: "SIGNAL", value: "IEEE" },
  { label: "MODE", value: "BUILDER" },
];

/**
 * First-Person Astronaut Point-Of-View (POV) Introduction:
 * - The camera/viewport IS the astronaut's eyes looking directly into the deep celestial void.
 * - NO visible helmet, NO visor borders, NO sci-fi dashboard HUDs.
 * - Sequence: Blackness -> Vision Comes Online (eyes adjust) -> Unknown Universe -> Floating Introduction -> Camera moves forward into Aswin's universe.
 * - Typography: Azeret Mono only. Zero text gradients, zero aggressive glows.
 */
export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const {
    isVisible,
    isForwardMoving,
    overlayRef,
    darknessRef,
    cameraRef,
    introContentRef,
    startForwardTransition,
  } = useIntroAnimation({ onComplete });

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      role="region"
      aria-label="Celestial Observation & Introduction"
      onClick={startForwardTransition}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#020814] text-white select-none cursor-pointer"
    >
      {/* 1. Complete Darkness Veil (Lifts gradually as human vision adjusts to deep space) */}
      <div
        ref={darknessRef}
        className="pointer-events-none absolute inset-0 z-30 bg-[#020814] transition-opacity duration-300"
      />

      {/* 2. Astronaut Spatial Camera Rig (Gentle human breathing drift & forward travel) */}
      <div
        ref={cameraRef}
        className={`relative z-10 flex h-full w-full flex-col justify-between px-6 sm:px-12 lg:px-20 py-8 sm:py-12 transition-transform ease-out ${
          isForwardMoving ? "duration-1000" : "animate-astronaut-drift"
        }`}
      >
        {/* Top Horizon Ambient Telemetry Bar */}
        <header className="pov-intro-eyebrow flex items-center justify-between font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#94A3B8] uppercase">
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[#5FA8FF]" />
            <span>INTRODUCTION // 01</span>
          </div>
          <div className="hidden sm:block text-[#94A3B8]/60 text-[10px]">
            LAT 21.14°N • DEEP SPACE
          </div>
          <div className="text-[10px] text-[#94A3B8]/80 hover:text-white transition-colors">
            SKIP [ESC]
          </div>
        </header>

        {/* 3. Main Floating Introduction Stage (Occupies physical location inside the environment) */}
        <div
          ref={introContentRef}
          className="my-auto flex flex-col items-center justify-center text-center max-w-4xl mx-auto py-6"
        >
          {/* Distant Visual Object: Subtle Photographic Silhouette Placeholder */}
          <div className="pov-intro-portrait mb-8 relative">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-[#0F4C81]/40 bg-[#061A3A]/30 backdrop-blur-[2px] flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(15,76,129,0.15)]">
              {/* PLACEHOLDER: replace with real portrait */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-[#1E293B] to-[#0F172A] opacity-80 flex items-center justify-center border border-[#5FA8FF]/20">
                <span className="font-mono text-[10px] text-[#94A3B8]/70 tracking-widest">AB</span>
              </div>
              {/* Subtle blue rim highlight */}
              <div className="absolute inset-0 rounded-full border border-[#5FA8FF]/20 pointer-events-none" />
            </div>
          </div>

          {/* Monumental Name */}
          <h1 className="pov-intro-name font-mono text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#F7FBFF] uppercase leading-none mb-6">
            ASWIN BINU
          </h1>

          {/* Core Philosophy Copy (Floating in Deep Space) */}
          <div className="pov-intro-copy max-w-2xl mx-auto flex flex-col gap-2 font-mono text-xs sm:text-sm md:text-base text-[#94A3B8] leading-relaxed font-normal">
            <p className="text-[#E2E8F0] tracking-wide">
              I BUILD SYSTEMS THAT LEARN.
            </p>
            <p className="tracking-wide">
              AND I BUILD THEM FOR PLACES WHERE GETTING IT WRONG MATTERS.
            </p>
          </div>

          {/* Environmental Spatial Markers */}
          <div className="pov-intro-markers mt-10 sm:mt-12 flex flex-wrap justify-center items-center gap-4 sm:gap-8 font-mono text-[10px] sm:text-xs tracking-widest text-[#94A3B8]/80">
            {IDENTITY_MARKERS.map((marker, idx) => (
              <div key={marker.label} className="flex items-center gap-2">
                {idx > 0 && <span className="text-[#0F4C81] hidden sm:inline">•</span>}
                <span className="text-[#94A3B8]/50">{marker.label} //</span>
                <span className="text-[#F7FBFF] font-medium">{marker.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Ambient Prompt & Deep Space Status */}
        <footer className="pov-intro-prompt flex items-center justify-between font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#94A3B8]/60 uppercase">
          <div className="hidden sm:block">
            ENVIRONMENT // CELESTIAL STABLE
          </div>
          <div className="mx-auto sm:mx-0 text-center flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5FA8FF] animate-ping" />
            <span className="text-[#F7FBFF]/80">CLICK OR PRESS ANY KEY TO ENTER UNIVERSE</span>
          </div>
          <div className="hidden sm:block">
            DEPTH // RELATIVISTIC
          </div>
        </footer>
      </div>
    </div>
  );
}