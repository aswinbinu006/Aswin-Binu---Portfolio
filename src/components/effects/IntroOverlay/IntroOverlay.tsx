import React from "react";
import { useIntroAnimation } from "./useIntroAnimation";
import WarpSpeedCanvas from "./WarpSpeedCanvas";
import type { IntroOverlayProps } from "./types";

/**
 * First-Person Astronaut Visor Point-of-View (POV) Intro:
 * - Outer area: 100% Solid Pure Black (#000000) with zero bleed-through.
 * - Visor Viewport: Cutout window revealing the actual cosmic background with enhanced contrast and clarity.
 * - Content: 2 simple, meaningful lines inside the visor viewport (Zero user name).
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
      {/* Dynamic High-Speed Warp Velocity Starfield */}
      <WarpSpeedCanvas isFastMoving={isFastMoving} />

      {/* 1. Outer Solid Black Frame with Astronaut Visor Viewport Cutout */}
      <svg
        ref={visorMaskRef}
        className="pointer-events-none absolute inset-0 h-full w-full z-10 origin-center"
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

        {/* --- ASTRONAUT HELMET PHYSICAL STRUCTURE (NO TEXT) --- */}

        {/* 1. Outer Gasket & Visor Sealing Channel */}
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

        {/* 2. Visor Outer Rim Bezel (High-strength Polycarbonate Frame) */}
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

        {/* 3. Inner Seal Rubber O-Ring */}
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

        {/* 4. Top Brow Helmet Shell Structure & Micro Vents */}
        <path
          d="M 380 75 Q 960 25 1540 75"
          fill="none"
          stroke="rgba(255, 255, 255, 0.14)"
          strokeWidth="2.5"
        />
        <path
          d="M 460 95 Q 960 48 1460 95"
          fill="none"
          stroke="rgba(255, 255, 255, 0.06)"
          strokeWidth="1.5"
        />

        {/* Upper Brow Air Circulation / Defog Nozzles */}
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

        {/* 5. Left Helmet Hinge & Seal Locking Assembly */}
        <g opacity="0.85">
          {/* Vertical Mounting Bracket */}
          <rect
            x="95"
            y="430"
            width="32"
            height="220"
            rx="6"
            fill="none"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="2"
          />
          {/* Main Visor Pivot Hub */}
          <circle
            cx="111"
            cy="540"
            r="36"
            fill="#06080c"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="3"
          />
          <circle
            cx="111"
            cy="540"
            r="20"
            fill="none"
            stroke="rgba(255, 255, 255, 0.14)"
            strokeWidth="2"
          />
          <circle
            cx="111"
            cy="540"
            r="8"
            fill="rgba(255, 255, 255, 0.25)"
          />
          {/* Locking Hex Pins */}
          <circle cx="111" cy="455" r="4.5" fill="rgba(255, 255, 255, 0.3)" />
          <circle cx="111" cy="485" r="3.5" fill="rgba(255, 255, 255, 0.2)" />
          <circle cx="111" cy="595" r="3.5" fill="rgba(255, 255, 255, 0.2)" />
          <circle cx="111" cy="625" r="4.5" fill="rgba(255, 255, 255, 0.3)" />
        </g>

        {/* 6. Right Helmet Hinge & Seal Locking Assembly */}
        <g opacity="0.85">
          {/* Vertical Mounting Bracket */}
          <rect
            x="1793"
            y="430"
            width="32"
            height="220"
            rx="6"
            fill="none"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="2"
          />
          {/* Main Visor Pivot Hub */}
          <circle
            cx="1809"
            cy="540"
            r="36"
            fill="#06080c"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="3"
          />
          <circle
            cx="1809"
            cy="540"
            r="20"
            fill="none"
            stroke="rgba(255, 255, 255, 0.14)"
            strokeWidth="2"
          />
          <circle
            cx="1809"
            cy="540"
            r="8"
            fill="rgba(255, 255, 255, 0.25)"
          />
          {/* Locking Hex Pins */}
          <circle cx="1809" cy="455" r="4.5" fill="rgba(255, 255, 255, 0.3)" />
          <circle cx="1809" cy="485" r="3.5" fill="rgba(255, 255, 255, 0.2)" />
          <circle cx="1809" cy="595" r="3.5" fill="rgba(255, 255, 255, 0.2)" />
          <circle cx="1809" cy="625" r="4.5" fill="rgba(255, 255, 255, 0.3)" />
        </g>

        {/* 7. Bottom Chin Guard & Space Suit Collar Neck-Ring Seam */}
        <path
          d="M 380 1005 Q 960 1055 1540 1005"
          fill="none"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="2.5"
        />
        <path
          d="M 460 985 Q 960 1032 1460 985"
          fill="none"
          stroke="rgba(255, 255, 255, 0.07)"
          strokeWidth="1.5"
        />

        {/* Lower Chin Airflow Intake Slits */}
        {[-240, -120, 0, 120, 240].map((offset, i) => (
          <rect
            key={`bot-vent-${i}`}
            x={960 + offset - 30}
            y={1018 + (300 - Math.abs(offset)) * 0.03}
            width={60}
            height={6}
            rx={3}
            fill="rgba(255, 255, 255, 0.1)"
          />
        ))}

        {/* 8. Four Corner Structural Reinforcement Clips */}
        <g stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2" fill="none">
          {/* Top-Left */}
          <path d="M 230 190 L 265 170" />
          <circle cx="230" cy="190" r="3" fill="rgba(255, 255, 255, 0.3)" />
          {/* Top-Right */}
          <path d="M 1690 190 L 1655 170" />
          <circle cx="1690" cy="190" r="3" fill="rgba(255, 255, 255, 0.3)" />
          {/* Bottom-Left */}
          <path d="M 230 890 L 265 910" />
          <circle cx="230" cy="890" r="3" fill="rgba(255, 255, 255, 0.3)" />
          {/* Bottom-Right */}
          <path d="M 1690 890 L 1655 910" />
          <circle cx="1690" cy="890" r="3" fill="rgba(255, 255, 255, 0.3)" />
        </g>

        {/* 9. Visor Polycarbonate Optical Glass Reflections (Curved Highlight Arcs) */}
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