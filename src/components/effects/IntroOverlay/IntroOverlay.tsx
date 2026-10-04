import React, { useState, useEffect } from "react";
import { useIntroAnimation } from "./useIntroAnimation";
import WarpSpeedCanvas from "./WarpSpeedCanvas";
import type { IntroOverlayProps } from "./types";

/**
 * First-Person Astronaut Visor Point-of-View (POV) Intro:
 * - Outer area: 100% Solid Pure Black (#000000) with zero bleed-through.
 * - Visor Viewport: Adaptive portrait/landscape cutout window revealing cosmic space.
 * - Mobile Optimized: Fits phone screens with dedicated portrait visor frame and typography.
 * - Fast-Moving Effect: Hyperspace warp velocity forward plunge into the cosmos on exit.
 */
export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const {
    isVisible,
    isFastMoving,
    overlayRef,
    contentRef,
    visorMaskRef,
    finishIntro,
  } = useIntroAnimation({ onComplete });

  const [isPortrait, setIsPortrait] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768 || window.innerWidth < window.innerHeight;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkOrientation = () => {
      setIsPortrait(window.innerWidth < 768 || window.innerWidth < window.innerHeight);
    };
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      role="region"
      aria-label="Astronaut Point of View"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none"
      style={{ backgroundColor: "transparent" }}
    >
      {/* Dynamic Cosmic Warp Velocity Starfield */}
      <WarpSpeedCanvas isFastMoving={isFastMoving} />

      {/* 1. Outer Solid Black Frame with Astronaut Visor Viewport Cutout */}
      {isPortrait ? (
        /* Mobile Portrait Visor Frame (ViewBox 1080x1920 - safe-framed for 16:9 to 21:9 mobile aspect ratios) */
        <svg
          ref={visorMaskRef}
          className="pointer-events-none absolute inset-0 h-full w-full z-10 origin-center"
          viewBox="0 0 1080 1920"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <mask id="astronaut-visor-cutout-mask-portrait">
              <rect width="1080" height="1920" fill="#ffffff" />
              {/* Visor Cutout Hole */}
              <path
                d="M 140 220 
                   Q 540 130 940 220 
                   Q 1000 960 940 1700 
                   Q 540 1790 140 1700 
                   Q 80 960 140 220 Z"
                fill="#000000"
              />
            </mask>
          </defs>

          {/* 100% Solid Pure Pitch Black Outside the Visor Window */}
          <rect
            width="1080"
            height="1920"
            fill="#000000"
            mask="url(#astronaut-visor-cutout-mask-portrait)"
          />

          {/* Portrait Visor Outer Rim Bezel */}
          <path
            d="M 140 220 
               Q 540 130 940 220 
               Q 1000 960 940 1700 
               Q 540 1790 140 1700 
               Q 80 960 140 220 Z"
            fill="none"
            stroke="rgba(255, 255, 255, 0.24)"
            strokeWidth="4.5"
          />

          {/* Portrait Outer Gasket Channel */}
          <path
            d="M 115 190 
               Q 540 100 965 190 
               Q 1030 960 965 1730 
               Q 540 1820 115 1730 
               Q 50 960 115 190 Z"
            fill="none"
            stroke="rgba(255, 255, 255, 0.09)"
            strokeWidth="3"
          />

          {/* Inner Seal Rubber O-Ring */}
          <path
            d="M 155 235 
               Q 540 145 925 235 
               Q 985 960 925 1685 
               Q 540 1775 155 1685 
               Q 95 960 155 235 Z"
            fill="none"
            stroke="rgba(255, 255, 255, 0.09)"
            strokeWidth="1.5"
            strokeDasharray="16 8"
          />

          {/* Top Brow Arch & Micro Vents */}
          <path
            d="M 280 120 Q 540 85 800 120"
            fill="none"
            stroke="rgba(255, 255, 255, 0.16)"
            strokeWidth="2.5"
          />
          {[-140, -70, 0, 70, 140].map((offset, i) => (
            <rect
              key={`top-p-vent-${i}`}
              x={540 + offset - 18}
              y={106 + Math.abs(offset) * 0.03}
              width={36}
              height={4.5}
              rx={2.25}
              fill="rgba(255, 255, 255, 0.15)"
            />
          ))}

          {/* Bottom Chin Guard Seam */}
          <path
            d="M 280 1800 Q 540 1835 800 1800"
            fill="none"
            stroke="rgba(255, 255, 255, 0.16)"
            strokeWidth="2.5"
          />

          {/* Visor Optical Reflection Arcs */}
          <path
            d="M 180 230 Q 540 160 900 230"
            fill="none"
            stroke="rgba(255, 255, 255, 0.28)"
            strokeWidth="1.5"
          />
          <path
            d="M 220 1685 Q 540 1750 860 1685"
            fill="none"
            stroke="rgba(255, 255, 255, 0.14)"
            strokeWidth="1.5"
          />
        </svg>
      ) : (
        /* Landscape Desktop Visor Frame (ViewBox 1920x1080) */
        <svg
          ref={visorMaskRef}
          className="pointer-events-none absolute inset-0 h-full w-full z-10 origin-center"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <mask id="astronaut-visor-cutout-mask-landscape">
              <rect width="1920" height="1080" fill="#ffffff" />
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
            mask="url(#astronaut-visor-cutout-mask-landscape)"
          />

          {/* Outer Gasket & Visor Sealing Channel */}
          <path
            d="M 160 120 
               Q 960 45 1760 120 
               Q 1870 540 1760 960 
               Q 960 1035 160 960 
               Q 50 540 160 120 Z"
            fill="none"
            stroke="rgba(255, 255, 255, 0.07)"
            strokeWidth="3"
          />

          {/* Visor Outer Rim Bezel (High-strength Polycarbonate Frame) */}
          <path
            d="M 200 160 
               Q 960 90 1720 160 
               Q 1810 540 1720 920 
               Q 960 990 200 920 
               Q 110 540 200 160 Z"
            fill="none"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="4"
          />

          {/* Inner Seal Rubber O-Ring */}
          <path
            d="M 215 175 
               Q 960 105 1705 175 
               Q 1795 540 1705 905 
               Q 960 975 215 905 
               Q 125 540 215 175 Z"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1.5"
            strokeDasharray="16 8"
          />

          {/* Top Brow Helmet Shell Structure */}
          <path
            d="M 380 75 Q 960 25 1540 75"
            fill="none"
            stroke="rgba(255, 255, 255, 0.14)"
            strokeWidth="2.5"
          />

          {/* Upper Brow Air Circulation Nozzles */}
          {[-300, -200, -100, 0, 100, 200, 300].map((offset, i) => (
            <rect
              key={`top-vent-${i}`}
              x={960 + offset - 24}
              y={58 + Math.abs(offset) * 0.03}
              width={48}
              height={5}
              rx={2.5}
              fill="rgba(255, 255, 255, 0.12)"
            />
          ))}

          {/* Bottom Chin Guard Seam */}
          <path
            d="M 380 1005 Q 960 1055 1540 1005"
            fill="none"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="2.5"
          />

          {/* Visor Optical Glass Reflections */}
          <path
            d="M 260 175 Q 960 115 1660 175"
            fill="none"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="1.5"
          />
          <path
            d="M 320 905 Q 960 970 1600 905"
            fill="none"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1.5"
          />
        </svg>
      )}

      {/* 2. Top-Right Skip Button */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-30 font-mono text-[10px] sm:text-xs tracking-widest text-white/70 hover:text-white transition-colors uppercase">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            finishIntro();
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            finishIntro();
          }}
          className="cursor-pointer px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full border border-white/25 hover:border-white/50 bg-black/70 backdrop-blur-md transition-all active:scale-95 shadow-lg"
        >
          SKIP [ESC]
        </button>
      </div>

      {/* 3. 2-Line Content Displayed Exclusively Inside the Visor Viewport */}
      <div
        ref={contentRef}
        className="relative z-20 flex flex-col items-center justify-center text-center w-full max-w-[88vw] sm:max-w-xl md:max-w-2xl px-3 sm:px-12 mx-auto"
      >
        <div className="flex flex-col items-center gap-2 sm:gap-6 drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">
          {/* Simple, Meaningful 2-Line Manifesto with Fully Fitted Mobile Typography */}
          <h2 className="font-mono text-sm xs:text-base sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-white leading-snug sm:leading-snug">
            We don't just teach machines to calculate.
          </h2>

          <p className="font-mono text-[11px] xs:text-xs sm:text-lg md:text-xl lg:text-2xl font-normal text-white/85 leading-snug sm:leading-snug">
            We build systems that endure when failure isn't an option.
          </p>
        </div>
      </div>
    </div>
  );
}