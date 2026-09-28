"use client";

import React, { useRef } from "react";
import { useEffect } from "react";
import gsap from "gsap";

/**
 * Command Console Technical Inspection Frame — Act II: The Operator
 *
 * Hardware mounted inside a control room:
 * - Rounded matte frame with frosted edge and subtle inset depth
 * - Blueprint overlay: construction lines, alignment lines, center reticle, scan ticks
 * - Environmental storytelling telemetry (LAT 21.1458° N, NODE-02, STATUS: ACTIVE)
 * - Required tag: {/* PLACEHOLDER: Replace with real portrait *\/}
 */
export default function PortraitPlaceholder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    if (!container || !card) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const el = container;
    const elCard = card;

    const ctx = gsap.context(() => {
      function handlePointerMove(e: PointerEvent) {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(elCard, {
          rotateY: x * 6,
          rotateX: -y * 6,
          duration: 0.6,
          ease: "power2.out",
          transformPerspective: 900,
        });
      }

      function handlePointerLeave() {
        gsap.to(elCard, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      function handleOrientation(e: DeviceOrientationEvent) {
        if (e.gamma == null || e.beta == null) return;
        const gamma = Math.max(-20, Math.min(20, e.gamma));
        const beta = Math.max(20, Math.min(60, e.beta)) - 40;
        gsap.to(elCard, {
          rotateY: (gamma / 20) * 4,
          rotateX: (-beta / 20) * 4,
          duration: 0.8,
          ease: "power1.out",
          transformPerspective: 900,
        });
      }

      el.addEventListener("pointermove", handlePointerMove);
      el.addEventListener("pointerleave", handlePointerLeave);
      window.addEventListener("deviceorientation", handleOrientation);

      return () => {
        el.removeEventListener("pointermove", handlePointerMove);
        el.removeEventListener("pointerleave", handlePointerLeave);
        window.removeEventListener("deviceorientation", handleOrientation);
      };
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[390px] select-none"
      style={{ perspective: "1000px" }}
    >
      {/* Environmental Storytelling — Background Telemetry (8–12% opacity) */}
      <div className="pointer-events-none absolute -inset-8 z-0 hidden select-none md:block">
        <div className="absolute -top-4 right-2 font-mono text-[9px] tracking-widest text-soft-glow/15">
          <span>LAT 21.1458° N // ORBIT_SEC: 05</span>
        </div>
        <div className="absolute left-[-22px] top-1/3 flex flex-col items-center gap-1 font-mono text-[8px] text-white/10">
          <span>+</span>
          <div className="h-10 w-[1px] bg-white/10" />
          <span>NODE-02</span>
        </div>
        <div className="absolute -bottom-6 left-4 flex items-center gap-3 font-mono text-[9px] tracking-wider text-white/12">
          <span>STATUS: ACTIVE</span>
          <span>•</span>
          <span>SYSTEM_INIT // 2026.09</span>
        </div>
      </div>

      {/* Volumetric Inspection Lighting Cone (Soft blue back-illumination) */}
      <div
        className="pointer-events-none absolute -inset-10 z-0 rounded-3xl opacity-40 blur-3xl transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, rgba(95, 168, 255, 0.12) 0%, rgba(15, 76, 129, 0.04) 50%, transparent 75%)",
        }}
      />

      {/* PLACEHOLDER: Replace with real portrait */}
      <div
        ref={cardRef}
        id="operator-portrait-frame-next"
        className="portrait-card reflection-edge relative z-10 aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d0f14]/85 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),_0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-all duration-500 hover:border-soft-glow/30"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Matte Technical Surface Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Blueprint Engineering Overlay */}
        <div className="portrait-blueprint pointer-events-none absolute inset-0 z-20 overflow-hidden">
          <div className="absolute left-3 top-3 font-mono text-[9px] text-soft-glow/40">+</div>
          <div className="absolute right-3 top-3 font-mono text-[9px] text-soft-glow/40">+</div>
          <div className="absolute bottom-3 left-3 font-mono text-[9px] text-soft-glow/40">+</div>
          <div className="absolute bottom-3 right-3 font-mono text-[9px] text-soft-glow/40">+</div>

          <div className="absolute bottom-10 top-10 left-1/2 w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-soft-glow/20 to-transparent" />
          <div className="absolute left-8 right-8 top-1/2 h-[1px] -translate-y-1/2 bg-gradient-to-r from-transparent via-soft-glow/20 to-transparent" />

          <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-soft-glow/25">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-soft-glow/60" />
            </div>
          </div>

          <div className="absolute left-0 top-1/4 h-[1px] w-2 bg-white/20" />
          <div className="absolute left-0 top-3/4 h-[1px] w-2 bg-white/20" />
          <div className="absolute right-0 top-1/4 h-[1px] w-2 bg-white/20" />
          <div className="absolute right-0 top-3/4 h-[1px] w-2 bg-white/20" />
          <div className="absolute top-0 left-1/3 h-2 w-[1px] bg-white/20" />
          <div className="absolute top-0 right-1/3 h-2 w-[1px] bg-white/20" />
        </div>

        {/* Handcrafted Geometric Silhouette / Architectural Headform Vector */}
        <div className="portrait-vector relative z-10 flex h-full w-full items-center justify-center p-8">
          <svg
            viewBox="0 0 240 300"
            width="100%"
            height="100%"
            style={{ maxHeight: "100%", maxWidth: "100%", height: "auto" }}
            className="h-full w-full select-none"
            fill="none"
          >
            <path
              d="M120,40 L165,80 L175,135 L160,185 L120,215 L80,185 L65,135 L75,80 Z"
              stroke="#f8fafc"
              strokeWidth="1.2"
              strokeOpacity="0.45"
            />
            <path
              d="M120,40 L120,215"
              stroke="#5FA8FF"
              strokeWidth="0.8"
              strokeDasharray="4 4"
              strokeOpacity="0.3"
            />
            <path
              d="M75,80 L165,80"
              stroke="#5FA8FF"
              strokeWidth="0.8"
              strokeOpacity="0.25"
            />
            <path
              d="M65,135 L175,135"
              stroke="#5FA8FF"
              strokeWidth="0.8"
              strokeOpacity="0.25"
            />
            <path
              d="M80,185 L160,185"
              stroke="#5FA8FF"
              strokeWidth="0.8"
              strokeOpacity="0.25"
            />
            <path
              d="M100,215 L95,245 L40,285 L200,285 L145,245 L140,215"
              stroke="#f8fafc"
              strokeWidth="1.2"
              strokeOpacity="0.4"
            />
            <line
              x1="95"
              y1="245"
              x2="145"
              y2="245"
              stroke="#5FA8FF"
              strokeWidth="0.8"
              strokeOpacity="0.2"
            />
            <circle cx="120" cy="135" r="3.5" fill="#F6C343" fillOpacity="0.9" />
            <circle cx="120" cy="40" r="2.5" fill="#5FA8FF" fillOpacity="0.75" />
            <circle cx="120" cy="215" r="2.5" fill="#5FA8FF" fillOpacity="0.75" />
          </svg>
        </div>

        {/* Blueprint Dossier Labels */}
        <div className="portrait-labels pointer-events-none absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between border-t border-white/10 pt-2 font-mono text-[9px] tracking-widest text-white/40">
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-soft-glow/60 animate-pulse" />
            <span className="text-soft-glow/70">PORTRAIT // 01</span>
          </div>
          <span>SCAN READY</span>
          <span className="text-white/60">SUBJECT: ASWIN BINU</span>
        </div>

        {/* Soft Blue Rim Light */}
        <div className="portrait-rim pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-soft-glow/12 blur-2xl transition-all duration-700" />
      </div>
    </div>
  );
}
