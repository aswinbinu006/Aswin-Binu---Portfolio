import React from "react";
import { useIntroAnimation } from "./useIntroAnimation";
import type { IntroOverlayProps } from "./types";

/**
 * Cinematic First-Person Astronaut Perspective (POV) Introduction:
 * - The screen/viewport IS the astronaut's vision looking directly into deep space.
 * - ZERO HUDs, ZERO sci-fi dashboard labels, ZERO fake spacecraft interfaces.
 * - The actual WebGL cosmic nebula & starlight universe is the visual subject.
 * - Sequence: Pure Blackness -> Vision Adjusts -> Discovered Identity -> Camera Glides Forward -> Main Portfolio Begins.
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
      aria-label="Celestial Observation"
      onClick={finishIntro}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden text-white select-none cursor-pointer"
      style={{ backgroundColor: "transparent" }}
    >
      {/* 1. Complete Darkness Veil (Smoothly lifts as the astronaut's eyes adjust to the cosmic void) */}
      <div
        ref={darknessRef}
        className="pointer-events-none absolute inset-0 z-30 bg-[#020814] transition-opacity duration-300"
      />

      {/* 2. Astronaut Field-Of-View Camera Rig (Natural breathing drift & forward universe transit) */}
      <div
        ref={cameraRef}
        className={`relative z-10 flex h-full w-full flex-col justify-between px-6 sm:px-12 lg:px-20 py-8 sm:py-12 transition-transform ease-out ${
          isTransitioning ? "duration-1000" : "animate-astronaut-drift"
        }`}
      >
        {/* Top Minimal Utility Header (Quiet skip) */}
        <header className="flex items-center justify-end font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#94A3B8]/60 uppercase">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              finishIntro();
            }}
            className="text-[10px] sm:text-[11px] tracking-widest text-[#94A3B8]/60 hover:text-white transition-colors uppercase py-1 px-2"
          >
            SKIP
          </button>
        </header>

        {/* 3. Discovered Identity Floating Naturally in the Cosmic Scene */}
        <div
          ref={introContentRef}
          className="my-auto flex flex-col items-center justify-center text-center max-w-3xl mx-auto px-4"
        >
          {/* Subtle Photographic Silhouette Object Discovered in Deep Space */}
          <div className="cinematic-intro-portrait mb-8 relative">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#061A3A]/40 border border-[#0F4C81]/30 backdrop-blur-[1px] flex items-center justify-center overflow-hidden shadow-[0_0_40px_rgba(15,76,129,0.2)]">
              {/* PLACEHOLDER: replace with real portrait asset */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0F172A] flex items-center justify-center border border-[#5FA8FF]/20">
                <span className="font-mono text-[10px] text-[#94A3B8]/70 tracking-widest">AB</span>
              </div>
              <div className="absolute inset-0 rounded-full border border-[#5FA8FF]/25 pointer-events-none" />
            </div>
          </div>

          {/* Primary Identity: ASWIN BINU */}
          <h1 className="cinematic-intro-name font-mono text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#F7FBFF] uppercase leading-none mb-4">
            ASWIN BINU
          </h1>

          {/* Subtitle: AI / ML ENGINEER */}
          <p className="cinematic-intro-tagline font-mono text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase text-[#94A3B8] font-medium mb-6">
            AI / ML ENGINEER
          </p>

          {/* Core Philosophy Copy */}
          <div className="cinematic-intro-copy max-w-xl mx-auto font-mono text-xs sm:text-sm md:text-base text-[#CBD5E1]/90 leading-relaxed font-normal">
            <p className="tracking-wide">
              I build systems that turn complex ideas into useful things.
            </p>
          </div>
        </div>

        {/* Bottom Ambient Prompt (Quiet human invitation) */}
        <footer className="cinematic-intro-hint flex items-center justify-center font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#94A3B8]/50 uppercase text-center pb-2">
          <span>CLICK OR PRESS ANY KEY TO ADVANCE</span>
        </footer>
      </div>
    </div>
  );
}