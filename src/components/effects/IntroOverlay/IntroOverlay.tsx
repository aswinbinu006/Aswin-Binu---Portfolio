import React from "react";
import { useIntroAnimation } from "./useIntroAnimation";
import type { IntroOverlayProps } from "./types";

const IDENTITY_MARKERS = [
  { label: "NODE", value: "NAGPUR" },
  { label: "DOMAIN", value: "AI & ROBOTICS" },
  { label: "SIGNAL", value: "IEEE" },
  { label: "CLEARANCE", value: "LEVEL 04" },
];

/**
 * First-Person Astronaut Point-Of-View (POV) Introduction:
 * - Camera IS the astronaut's eyes looking directly out into the celestial void.
 * - ZERO personal name / portrait duplicate (the monumental ASWIN BINU name belongs exclusively to the Hero section).
 * - Sequence: Darkness -> Vision Comes Online -> Floating Celestial Directive -> Forward Travel into Aswin's Universe.
 */
export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const {
    isVisible,
    isTransitioning,
    overlayRef,
    darknessRef,
    cameraRef,
    introContentRef,
    finishIntro,
  } = useIntroAnimation({ onComplete });

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      role="region"
      aria-label="Celestial Observation & Introduction"
      onClick={finishIntro}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#020814] text-white select-none cursor-pointer"
    >
      {/* 1. Darkness Veil (Smoothly lifts as eyes adapt to the celestial environment) */}
      <div
        ref={darknessRef}
        className="pointer-events-none absolute inset-0 z-30 bg-[#020814] transition-opacity duration-300"
      />

      {/* 2. Astronaut Spatial Camera Rig (Human breathing drift & forward universe transit) */}
      <div
        ref={cameraRef}
        className={`relative z-10 flex h-full w-full flex-col justify-between px-6 sm:px-12 lg:px-20 py-8 sm:py-12 transition-transform ease-out ${
          isTransitioning ? "duration-800" : "animate-astronaut-drift"
        }`}
      >
        {/* Top Celestial Header */}
        <header className="pov-intro-eyebrow flex items-center justify-between font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#94A3B8] uppercase">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5FA8FF] animate-pulse" />
            <span>SECTOR // 01 • DEEP SPACE OBSERVATION</span>
          </div>
          <div className="hidden sm:block text-[#94A3B8]/60 text-[10px]">
            LAT 21.14°N • CELESTIAL STABLE
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              finishIntro();
            }}
            className="text-[10px] text-[#94A3B8]/80 hover:text-white transition-colors uppercase px-2.5 py-1 rounded border border-white/10 hover:border-white/30"
          >
            SKIP [ESC]
          </button>
        </header>

        {/* 3. Main Floating Suspense Stage */}
        <div
          ref={introContentRef}
          className="my-auto flex flex-col items-center justify-center text-center max-w-4xl mx-auto py-4 sm:py-6"
        >
          {/* Mission Directive Eyebrow */}
          <div className="pov-intro-eyebrow mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 font-mono text-[10px] sm:text-xs text-[#94A3B8] tracking-widest uppercase backdrop-blur-md">
            <span className="h-1 w-1 rounded-full bg-[#5FA8FF]" />
            <span>MISSION DIRECTIVE</span>
          </div>

          {/* Suspense Headline: Part 1 */}
          <h2 className="pov-intro-headline font-mono text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F7FBFF] uppercase leading-[1.2] max-w-3xl mb-4 sm:mb-6">
            WE DON'T JUST TEACH MACHINES TO CALCULATE.
          </h2>

          {/* Suspense Headline: Part 2 */}
          <div className="pov-intro-copy max-w-2xl mx-auto font-mono text-sm sm:text-base md:text-lg text-[#94A3B8] leading-relaxed font-medium">
            <p className="tracking-wide text-[#CBD5E1]">
              WE BUILD SYSTEMS THAT ENDURE WHEN FAILURE ISN'T AN OPTION.
            </p>
          </div>

          {/* Environmental Spatial Markers */}
          <div className="pov-intro-markers mt-8 sm:mt-10 flex flex-wrap justify-center items-center gap-3 sm:gap-6 font-mono text-[10px] sm:text-xs tracking-widest text-[#94A3B8]/80">
            {IDENTITY_MARKERS.map((marker, idx) => (
              <div key={marker.label} className="flex items-center gap-1.5 sm:gap-2">
                {idx > 0 && <span className="text-[#0F4C81] hidden sm:inline">•</span>}
                <span className="text-[#94A3B8]/50">{marker.label} //</span>
                <span className="text-[#F7FBFF] font-medium">{marker.value}</span>
              </div>
            ))}
          </div>

          {/* Interactive Universe Entrance Action */}
          <div className="pov-intro-btn mt-10 sm:mt-12">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                finishIntro();
              }}
              className="group relative flex items-center gap-3 rounded-full border border-[#5FA8FF]/40 bg-[#0F4C81]/20 hover:bg-[#0F4C81]/40 px-8 sm:px-10 py-3 sm:py-3.5 font-mono text-xs sm:text-sm tracking-widest text-[#F7FBFF] backdrop-blur-md transition-all duration-300 hover:border-[#5FA8FF] hover:shadow-[0_0_30px_rgba(95,168,255,0.35)] cursor-pointer active:scale-95"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#5FA8FF] animate-pulse" />
              <span className="font-semibold tracking-wider">ENTER THE UNIVERSE</span>
              <span className="text-[#5FA8FF] transition-transform duration-300 group-hover:translate-x-1.5 font-bold">
                →
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Ambient Prompt */}
        <footer className="pov-intro-eyebrow flex items-center justify-between font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#94A3B8]/60 uppercase">
          <div className="hidden sm:block">
            SYSTEM STATUS // NOMINAL
          </div>
          <div className="mx-auto sm:mx-0 text-center flex items-center gap-2">
            <span className="text-[#94A3B8]/70">CLICK ANYWHERE OR PRESS [SPACE / ESC] TO ENTER</span>
          </div>
          <div className="hidden sm:block">
            DEPTH // RELATIVISTIC
          </div>
        </footer>
      </div>
    </div>
  );
}