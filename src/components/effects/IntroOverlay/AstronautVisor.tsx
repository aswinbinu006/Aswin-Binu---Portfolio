import React, { useMemo } from "react";

interface AstronautVisorProps {
  progress: number;
  timecode: string;
  isWarping: boolean;
  children: React.ReactNode;
  onInitialize: () => void;
}

/**
 * High-Fidelity First-Person Astronaut Helmet Visor Overlay
 * - Dark matte carbon-composite helmet silhouette with authentic ergonomic curves
 * - Visor glass viewport with starlight reflections & curvature sheen
 * - Life-support telemetry (O2, Suit Pressure, Heart Rate ECG, Event Horizon Vectors)
 * - HUD Projection Area where the mission manifesto & controls live
 */
export default function AstronautVisor({
  progress,
  timecode,
  isWarping,
  children,
  onInitialize,
}: AstronautVisorProps) {
  // Dynamic ECG heartbeat polyline points
  const ecgPoints = useMemo(() => {
    return "0,10 12,10 16,3 20,18 24,6 28,12 32,10 48,10 52,4 56,16 60,10 80,10";
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between overflow-hidden select-none">
      {/* 1. Heavy Outer Astronaut Helmet Composite Frame (Curved Viewport Mask) */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-transform duration-700 ease-out"
        style={{
          boxShadow: "inset 0 0 140px 60px rgba(1, 2, 6, 0.95), inset 0 0 40px 10px rgba(0, 0, 0, 1)",
          transform: isWarping ? "scale(1.35)" : "scale(1)",
        }}
      />

      {/* 2. Helmet Visor Glass Rim Vignette & Optical Curvature */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full z-15 opacity-85"
        preserveAspectRatio="none"
        viewBox="0 0 1920 1080"
      >
        <defs>
          {/* Curvature Bezel Gradient */}
          <linearGradient id="helmetBezel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0a0c14" stopOpacity="0.98" />
            <stop offset="12%" stopColor="#121624" stopOpacity="0.6" />
            <stop offset="25%" stopColor="#1e2438" stopOpacity="0.1" />
            <stop offset="75%" stopColor="#1e2438" stopOpacity="0.1" />
            <stop offset="88%" stopColor="#121624" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0a0c14" stopOpacity="0.98" />
          </linearGradient>

          {/* Golden Starlight Visor Sheen */}
          <linearGradient id="visorSheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(251, 191, 36, 0.12)" />
            <stop offset="35%" stopColor="rgba(255, 255, 255, 0.04)" />
            <stop offset="60%" stopColor="rgba(0, 0, 0, 0)" />
            <stop offset="100%" stopColor="rgba(217, 119, 6, 0.08)" />
          </linearGradient>
        </defs>

        {/* Visor Cutout Contour (Ergonomic Astronaut Helmet Visor Shape) */}
        <path
          d="M 120 80 
             Q 960 30 1800 80 
             Q 1880 540 1800 1000 
             Q 960 1050 120 1000 
             Q 40 540 120 80 Z"
          fill="none"
          stroke="url(#helmetBezel)"
          strokeWidth="38"
        />

        {/* Outer Helmet Mechanical Rivets & Seam Highlights */}
        <path
          d="M 150 105 Q 960 55 1770 105"
          fill="none"
          stroke="rgba(251, 191, 36, 0.25)"
          strokeWidth="1.5"
          strokeDasharray="18 12"
        />
        <path
          d="M 150 975 Q 960 1025 1770 975"
          fill="none"
          stroke="rgba(251, 191, 36, 0.25)"
          strokeWidth="1.5"
          strokeDasharray="18 12"
        />

        {/* Diagonal Visor Glass Glare Arc */}
        <path
          d="M 280 120 Q 960 220 1640 120"
          fill="none"
          stroke="url(#visorSheen)"
          strokeWidth="60"
        />
      </svg>

      {/* 3. Top Visor Telemetry (Helmet HUD Header) */}
      <header className="relative z-30 flex items-center justify-between px-8 sm:px-16 pt-7 sm:pt-9 pointer-events-auto">
        <div className="flex items-center gap-3.5 font-mono text-[10px] sm:text-xs tracking-widest text-amber-300/85">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-80" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
          </span>
          <span className="font-bold text-white tracking-wider">EVA-01 // VISOR HUD</span>
          <span className="text-amber-500/40 hidden sm:inline">|</span>
          <span className="hidden sm:inline text-amber-200/70">O₂: 99.4% • PRESS: 101.3 kPa</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Dynamic ECG Heartbeat Telemetry */}
          <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-amber-300/75 bg-amber-950/30 px-3 py-1 rounded-full border border-amber-500/20 backdrop-blur-md">
            <span className="text-amber-400 font-bold">BPM 74</span>
            <svg width="60" height="18" viewBox="0 0 80 20" className="overflow-visible">
              <polyline
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.5"
                points={ecgPoints}
                className="animate-pulse"
              />
            </svg>
          </div>

          {/* Instant Skip Button */}
          <button
            type="button"
            onClick={onInitialize}
            className="font-mono text-[10px] sm:text-[11px] tracking-widest text-amber-200/70 hover:text-white transition-all uppercase px-4 py-1.5 rounded-full border border-amber-500/30 hover:border-amber-400 bg-amber-500/10 hover:bg-amber-500/20 cursor-pointer backdrop-blur-md"
          >
            SKIP [ESC]
          </button>
        </div>
      </header>

      {/* 4. Center Visor Area (Where the Children Content is Rendered) */}
      <div className="relative z-30 flex-1 flex flex-col items-center justify-center pointer-events-auto px-4">
        {children}
      </div>

      {/* 5. Bottom Visor Telemetry (Flight Path & Warp Progression) */}
      <footer className="relative z-30 flex items-center justify-between px-8 sm:px-16 pb-7 sm:pb-8 font-mono text-[9px] sm:text-[10px] tracking-widest text-amber-200/70 pointer-events-auto">
        <div className="flex items-center gap-3">
          <span className="text-amber-400/80 font-bold">WORMHOLE INSERTION:</span>
          <span className="text-white font-semibold">{progress}%</span>
          <div className="h-1.5 w-20 sm:w-36 bg-amber-950/60 rounded-full overflow-hidden border border-amber-500/30">
            <div
              className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-200 transition-all duration-100 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 text-amber-300/80">
          <span className="hidden sm:inline text-amber-400/60">EVENT HORIZON DIST: 0.04 AU</span>
          <span className="text-white/90 font-semibold">{timecode}</span>
        </div>
      </footer>
    </div>
  );
}
