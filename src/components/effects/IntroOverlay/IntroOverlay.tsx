import React from "react";
import { useIntroAnimation } from "./useIntroAnimation";
import type { IntroOverlayProps } from "./types";

/**
 * First-Person Astronaut Visor Point-of-View (POV) Intro:
 * - Outer area: 100% Solid Pure Black (#000000) with zero bleed-through.
 * - Visor Viewport: Cutout window revealing the actual cosmic background with enhanced contrast and clarity.
 * - Content: 2 simple, meaningful lines inside the visor viewport (Zero user name).
 * - Smoothly fades away to reveal the main Hero portfolio.
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
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none cursor-pointer"
      style={{ backgroundColor: "transparent" }}
    >
      {/* 1. Outer Solid Black Frame with Astronaut Visor Viewport Cutout */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full z-10"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Mask: White (#FFFFFF) keeps the solid black frame, Black (#000000) cuts out the transparent visor window */}
          <mask id="astronaut-visor-cutout-mask">
            {/* Solid white covers entire screen */}
            <rect width="1920" height="1080" fill="#ffffff" />
            {/* The Cutout Window: Pure black in mask creates 100% transparency for the background */}
            <path
              d="M 200 160 
                 Q 960 90 1720 160 
                 Q 1810 540 1720 920 
                 Q 960 990 200 920 
                 Q 110 540 200 160 Z"
              fill="#000000"
            />
          </mask>
        </defs>

        {/* 100% Solid Pure Pitch Black Outside the Visor Window */}
        <rect
          width="1920"
          height="1080"
          fill="#000000"
          mask="url(#astronaut-visor-cutout-mask)"
        />

        {/* Visor Glass Outer Rim Bezel */}
        <path
          d="M 200 160 
             Q 960 90 1720 160 
             Q 1810 540 1720 920 
             Q 960 990 200 920 
             Q 110 540 200 160 Z"
          fill="none"
          stroke="rgba(255, 255, 255, 0.16)"
          strokeWidth="4"
        />

        {/* Subtle Specular Top Reflection on Visor Glass */}
        <path
          d="M 260 175 Q 960 115 1660 175"
          fill="none"
          stroke="rgba(255, 255, 255, 0.28)"
          strokeWidth="1.5"
        />
      </svg>

      {/* 2. Top-Right Skip Button */}
      <div className="absolute top-6 right-8 z-30 font-mono text-[10px] sm:text-xs tracking-widest text-white/50 hover:text-white transition-colors uppercase">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            finishIntro();
          }}
          className="cursor-pointer px-3.5 py-1.5 rounded-full border border-white/15 hover:border-white/40 bg-black/60 backdrop-blur-md"
        >
          SKIP [ESC]
        </button>
      </div>

      {/* 3. 2-Line Content Displayed Exclusively Inside the Visor Viewport */}
      <div
        ref={contentRef}
        className="relative z-20 flex flex-col items-center justify-center text-center max-w-3xl px-6 sm:px-12 mx-auto"
      >
        <div className="flex flex-col items-center gap-4 sm:gap-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          {/* Simple, Meaningful 2-Line Manifesto */}
          <h2 className="font-mono text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-white leading-snug">
            We don't just teach machines to calculate.
          </h2>

          <p className="font-mono text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-white/85 leading-snug">
            We build systems that endure when failure isn't an option.
          </p>
        </div>
      </div>
    </div>
  );
}