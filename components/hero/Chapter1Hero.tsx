"use client";

import React from "react";

/**
 * Chapter 1 — The Statement
 *
 * Dominant visual: 'ASWIN BINU' centered over the black void.
 * Serves as the scroll trigger target (#crack-trigger) pinned by Background.tsx.
 * Typography adheres strictly to locked blueprint: 800 weight, -0.04em tracking.
 */
export default function Chapter1Hero() {
  return (
    <section
      id="crack-trigger"
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* Dominant Element: ASWIN BINU */}
      <h1
        id="hero-title"
        className="relative z-10 text-center font-extrabold tracking-hero text-white text-[13vw] leading-none md:text-[9.5vw]"
      >
        ASWIN BINU
      </h1>

      {/* Minimal Scroll indicator at the bottom */}
      <div
        id="scroll-prompt"
        className="scroll-prompt absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-xs tracking-widest text-white/40"
      >
        <span>Scroll</span>
        <span className="block h-4 w-[1px] bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
