import React from "react";
import { useIntroAnimation } from "./useIntroAnimation";
import type { IntroOverlayProps } from "./types";

/**
 * First-Person Astronaut Visor Point-of-View (POV) Intro:
 * - Outer area is completely blacked out (solid pure black silhouette frame).
 * - Center is the astronaut's visor viewport cutout through which the deep cosmos is seen.
 * - Displays only 1-2 simple, meaningful lines of intro content (ZERO name repetition).
 * - Smoothly fades away after a few seconds (or on click/ESC) to reveal the main Hero portfolio.
 */
export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const {
    isVisible,
    overlayRef,
    contentRef,
    finishIntro,
  } = useIntroAnimation({ onComplete });

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      role="region"
      aria-label="Astronaut Point of View"
      onClick={finishIntro}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black select-none cursor-pointer"
    >
      {/* 1. Outer Blackout Frame with Central Astronaut Visor Viewport Cutout */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full z-10"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Mask: White shows through (the visor), Black blocks out */}
          <mask id="astronaut-visor-mask">
            {/* White base allows everything, black cutout blocks */}
            <rect width="1920" height="1080" fill="white" />
            {/* The Astronaut Visor Cutout Hole (Ergonomic wide panoramic visor window) */}
            <path
              d="M 220 180 
                 Q 960 110 1700 180 
                 Q 1780 540 1700 900 
                 Q 960 970 220 900 
                 Q 140 540 220 180 Z"
              fill="black"
            />
          </mask>
        </defs>

        {/* Solid Pure Black Surrounding Mask */}
        <rect
          width="1920"
          height="1080"
          fill="#000000"
          mask="url(#astronaut-visor-mask)"
        />

        {/* Visor Glass Curvature Bezel & Soft Ambient Reflection */}
        <path
          d="M 220 180 
             Q 960 110 1700 180 
             Q 1780 540 1700 900 
             Q 960 970 220 900 
             Q 140 540 220 180 Z"
          fill="none"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="6"
        />
        <path
          d="M 220 180 
             Q 960 110 1700 180 
             Q 1780 540 1700 900 
             Q 960 970 220 900 
             Q 140 540 220 180 Z"
          fill="none"
          stroke="rgba(95, 168, 255, 0.18)"
          strokeWidth="1.5"
        />
      </svg>

      {/* 2. Top-Right Skip Hint */}
      <div className="absolute top-6 right-8 z-30 font-mono text-[10px] sm:text-xs tracking-widest text-white/50 hover:text-white transition-colors uppercase">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            finishIntro();
          }}
          className="cursor-pointer px-3 py-1 rounded border border-white/10 hover:border-white/30 bg-black/40 backdrop-blur-sm"
        >
          SKIP [ESC]
        </button>
      </div>

      {/* 3. Content Displayed Exclusively Inside the Astronaut's Visor POV Area */}
      <div
        ref={contentRef}
        className="relative z-20 flex flex-col items-center justify-center text-center max-w-3xl px-6 sm:px-12 mx-auto"
      >
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          {/* Simple, Meaningful 2-Line Manifesto (No Name) */}
          <h2 className="font-mono text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-white leading-snug">
            We don't just teach machines to calculate.
          </h2>

          <p className="font-mono text-base sm:text-xl md:text-2xl lg:text-3xl font-normal text-white/80 leading-snug">
            We build systems that endure when failure isn't an option.
          </p>
        </div>
      </div>
    </div>
  );
}