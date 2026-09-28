import React, { useRef } from "react";
import { usePortraitTilt } from "./usePortraitTilt";

/**
 * Command Console Technical Inspection Frame — Act II: The Operator
 * Strict Palette: #020814 / #061A3A / #0F4C81 / #5FA8FF / #F7FBFF
 *
 * Hardware mounted inside a control room:
 * - Blueprint overlay: construction lines, alignment lines, center reticle, scan ticks
 * - Environmental storytelling telemetry (LAT 21.1458° N, NODE-02, STATUS: ACTIVE)
 * - Required tag: {/* PLACEHOLDER: Replace with real portrait *\/}
 */
export default function PortraitPlaceholder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  usePortraitTilt({ containerRef, cardRef });

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[390px] select-none"
      style={{ perspective: "1000px" }}
    >
      {/* Environmental Storytelling — Background Telemetry */}
      <div className="pointer-events-none absolute -inset-8 z-0 hidden select-none md:block">
        {/* Top-Right Orbit Ticks */}
        <div className="absolute -top-4 right-2 font-mono text-[9px] tracking-widest text-white/30">
          <span>LAT 21.1458° N // ORBIT_SEC: 05</span>
        </div>
        {/* Left Measurement Markings */}
        <div className="absolute left-[-22px] top-1/3 flex flex-col items-center gap-1 font-mono text-[8px] text-white/20">
          <span>+</span>
          <div className="h-10 w-[1px] bg-white/20" />
          <span>NODE-02</span>
        </div>
        {/* Bottom Status Readout */}
        <div className="absolute -bottom-6 left-4 flex items-center gap-3 font-mono text-[9px] tracking-wider text-white/40">
          <span>STATUS: ACTIVE</span>
          <span>•</span>
          <span>SYSTEM_INIT // 2026.09</span>
        </div>
      </div>

      {/* Volumetric Inspection Lighting Cone — Neutral Silver */}
      <div
        className="pointer-events-none absolute -inset-10 z-0 rounded-3xl opacity-20 blur-3xl transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, rgba(255, 255, 255, 0.1) 0%, rgba(148, 163, 184, 0.04) 50%, transparent 75%)",
        }}
      />

      {/* Portrait frame — transparent, no card layer. SVG floats on nebula. */}
      <div
        ref={cardRef}
        id="operator-portrait-frame"
        className="portrait-card relative z-10 aspect-[4/5] w-full overflow-visible transition-all duration-500"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Blueprint Engineering Overlay */}
        <div className="portrait-blueprint pointer-events-none absolute inset-0 z-20 overflow-hidden">
          {/* 4-Corner Crosshair Scan Markers */}
          <div className="absolute left-3 top-3 font-mono text-[9px] text-white/40">+</div>
          <div className="absolute right-3 top-3 font-mono text-[9px] text-white/40">+</div>
          <div className="absolute bottom-3 left-3 font-mono text-[9px] text-white/40">+</div>
          <div className="absolute bottom-3 right-3 font-mono text-[9px] text-white/40">+</div>

          {/* Vertical Construction Line */}
          <div className="absolute bottom-10 top-10 left-1/2 w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

          {/* Horizontal Alignment Line */}
          <div className="absolute left-8 right-8 top-1/2 h-[1px] -translate-y-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Center Targeting Reticle */}
          <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
            </div>
          </div>

          {/* Blueprint Coordinate Edge Ticks */}
          <div className="absolute left-0 top-1/4 h-[1px] w-2 bg-white/20" />
          <div className="absolute left-0 top-3/4 h-[1px] w-2 bg-white/20" />
          <div className="absolute right-0 top-1/4 h-[1px] w-2 bg-white/20" />
          <div className="absolute right-0 top-3/4 h-[1px] w-2 bg-white/20" />
          <div className="absolute top-0 left-1/3 h-2 w-[1px] bg-white/20" />
          <div className="absolute top-0 right-1/3 h-2 w-[1px] bg-white/20" />
        </div>

        {/* Handcrafted Geometric Silhouette / Architectural Headform Vector */}
        {/* PLACEHOLDER: Replace with real high-resolution portrait asset */}
        <div className="portrait-vector relative z-10 flex h-full w-full items-center justify-center p-8">
          <svg
            viewBox="0 0 240 300"
            width="100%"
            height="100%"
            style={{ maxHeight: "100%", maxWidth: "100%", height: "auto" }}
            className="h-full w-full select-none"
            fill="none"
          >
            {/* Faceted geometric contour lines */}
            <path
              d="M120,40 L165,80 L175,135 L160,185 L120,215 L80,185 L65,135 L75,80 Z"
              stroke="#F7FBFF"
              strokeWidth="1.2"
              strokeOpacity="0.5"
            />
            <path
              d="M120,40 L120,215"
              stroke="#cbd5e1"
              strokeWidth="0.8"
              strokeDasharray="4 4"
              strokeOpacity="0.4"
            />
            <path
              d="M75,80 L165,80"
              stroke="#cbd5e1"
              strokeWidth="0.8"
              strokeOpacity="0.3"
            />
            <path
              d="M65,135 L175,135"
              stroke="#cbd5e1"
              strokeWidth="0.8"
              strokeOpacity="0.3"
            />
            <path
              d="M80,185 L160,185"
              stroke="#cbd5e1"
              strokeWidth="0.8"
              strokeOpacity="0.3"
            />

            {/* Neck and Shoulder Structure */}
            <path
              d="M100,215 L95,245 L40,285 L200,285 L145,245 L140,215"
              stroke="#F7FBFF"
              strokeWidth="1.2"
              strokeOpacity="0.4"
            />
            <line
              x1="95"
              y1="245"
              x2="145"
              y2="245"
              stroke="#cbd5e1"
              strokeWidth="0.8"
              strokeOpacity="0.25"
            />

            {/* Tactical Focal Nodes */}
            <circle cx="120" cy="135" r="3.5" fill="#ffffff" fillOpacity="0.95" />
            <circle cx="120" cy="40" r="2.5" fill="#e2e8f0" fillOpacity="0.8" />
            <circle cx="120" cy="215" r="2.5" fill="#94a3b8" fillOpacity="0.85" />
          </svg>
        </div>

        {/* Blueprint Dossier Labels */}
        <div className="portrait-labels pointer-events-none absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between pt-2 font-mono text-[9px] tracking-widest text-white/50">
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-white animate-pulse" />
            <span className="text-white/80">PORTRAIT // 01</span>
          </div>
          <span>SCAN READY</span>
          <span className="text-white/70">SUBJECT: ASWIN BINU</span>
        </div>

        {/* Subtle ambient rim light */}
        <div className="portrait-rim pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/10 blur-2xl transition-all duration-700" />
      </div>
    </div>
  );
}