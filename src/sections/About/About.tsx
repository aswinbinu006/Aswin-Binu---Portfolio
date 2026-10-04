import React, { useRef, useEffect } from "react";
import PortraitPlaceholder from "./PortraitPlaceholder";
import HorizontalTextReveal from "@/components/effects/HorizontalTextReveal";
import HorizontalReveal from "@/components/effects/HorizontalReveal";
import { gsap } from "@/utils/gsap";
import { Label } from "@/components/ui";

const IDENTITY_ITEMS = [
  {
    icon: "◉",
    label: "Nagpur",
    spec: "LAT 21.14°N",
  },
  {
    icon: "◇",
    label: "AI & ML",
    spec: "EDGE // RT",
  },
  {
    icon: "⬢",
    label: "IEEE Chair",
    spec: "DIRECTIVE",
  },
  {
    icon: "▣",
    label: "Builder",
    spec: "CRITICAL SYS",
  },
];

interface AboutProps {
  isIntroComplete?: boolean;
}

/**
 * Chapter 2 — Introduction
 * Act II: The Operator (Command Console)
 *
 * Strict Palette: #020814 / #061A3A / #0F4C81 / #5FA8FF / #F7FBFF
 * Fluid clamp typography, robust GSAP context, no DOM query polling.
 */
export default function About({ isIntroComplete = true }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set([".console-beam", "#operator-portrait-frame"], {
          opacity: 1,
          y: 0,
          scale: 1,
          clearProps: "transform",
        });
        return;
      }

      // Initial state
      gsap.set(".console-beam", { opacity: 0 });

      // Ambient lighting beam entrance
      gsap.to(".console-beam", {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Scroll-driven smooth vertical parallax effect
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      scrollTl
        .fromTo(
          "#operator-portrait-frame",
          { y: 30 },
          { y: -30, ease: "none" },
          0
        )
        .to(".console-beam", { y: 50, x: 20, ease: "none" }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-10 w-full overflow-x-clip px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10 sm:py-14 md:py-20 select-none flex items-center"
    >
      {/* Ambient subtle silver light wash without dark background blocking */}
      <div
        className="console-beam pointer-events-none absolute right-0 top-1/4 z-0 h-[600px] w-[700px] -translate-y-1/4 rotate-[-8deg] opacity-20 blur-3xl transition-transform duration-700"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 75% 45%, rgba(226, 232, 240, 0.05) 0%, rgba(148, 163, 184, 0.02) 45%, transparent 80%)",
        }}
      />

      {/* Main Editorial Content & Technical Inspection Frame stretched across left and right */}
      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-[1500px] mx-auto flex flex-col items-center justify-between gap-12 lg:flex-row lg:items-center lg:gap-16 xl:gap-24"
      >
        {/* Left Side: Story Layer encased in a sleek light-toned translucent grey glass card */}
        <div className="relative flex flex-col items-start w-full lg:w-[56%] xl:w-[58%] rounded-2xl border border-white/20 bg-slate-800/25 p-6 sm:p-7 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
          {/* Section Eyebrow Label */}
          <HorizontalReveal xOffset={40} skewAngle={-4} delay={0.05}>
            <div className="mb-4">
              <Label beacon beaconColor="bg-white/80">
                CHAPTER 02 // ABOUT ME
              </Label>
            </div>
          </HorizontalReveal>

          {/* Headline with Balanced Scale Horizontal Text Reveal */}
          <div className="intro-headline flex flex-col gap-1.5 sm:gap-2 w-full">
            {isIntroComplete ? (
              <>
                <HorizontalTextReveal
                  text="I build systems that learn,"
                  className="font-mono text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold leading-[1.3] tracking-tight"
                  wordClassName="text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
                  xOffset={50}
                  skewAngle={-6}
                  delay={0.12}
                  stagger={0.03}
                  duration={0.6}
                />
                <HorizontalTextReveal
                  text="and I build them for places where"
                  className="font-mono text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-[1.3] tracking-tight"
                  wordClassName="text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
                  xOffset={50}
                  skewAngle={-6}
                  delay={0.18}
                  stagger={0.03}
                  duration={0.6}
                />
                <HorizontalTextReveal
                  text="getting it wrong isn't an option."
                  className="font-mono text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold leading-[1.3] tracking-tight"
                  highlightWords={["getting", "wrong", "isn't", "option."]}
                  highlightColor="#ffffff"
                  wordClassName="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                  xOffset={50}
                  skewAngle={-6}
                  delay={0.24}
                  stagger={0.03}
                  duration={0.6}
                />
              </>
            ) : (
              <div className="opacity-0 pointer-events-none select-none" aria-hidden>
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold leading-[1.3] tracking-tight font-mono text-white">
                  I build systems that learn,
                </div>
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-[1.3] tracking-tight mt-2 font-mono text-white/90">
                  and I build them for places where
                </div>
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold leading-[1.3] tracking-tight mt-2 font-mono text-white">
                  getting it wrong isn&apos;t an option.
                </div>
              </div>
            )}
          </div>

          {/* Body Copy with Word-by-Word Horizontal Text Reveal */}
          <div className="mt-4 max-w-[58ch]">
            <HorizontalTextReveal
              text="Third-year AI/ML engineering student, focused on applying machine learning to defense and critical-infrastructure problems. Operating out of Nagpur, architecting edge-quantized models, resilient telemetry pipelines, and mission-ready autonomy."
              className="font-mono text-xs sm:text-sm leading-relaxed"
              wordClassName="text-white/90 font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
              highlightWords={["defense", "critical-infrastructure", "edge-quantized", "mission-ready"]}
              highlightColor="#ffffff"
              xOffset={50}
              skewAngle={-6}
              delay={0.28}
              stagger={0.02}
              duration={0.6}
            />
          </div>

          {/* Floating 2x2 Identity Matrix with Staggered Horizontal Reveal */}
          <div
            data-no-constellation
            className="mt-5 grid w-full max-w-lg grid-cols-1 sm:grid-cols-2 gap-2.5"
          >
            {IDENTITY_ITEMS.map((item, idx) => (
              <HorizontalReveal
                key={item.label}
                index={idx}
                xOffset={45}
                skewAngle={-5}
                delay={0.32}
                stagger={0.06}
              >
                <div
                  tabIndex={0}
                  className="group relative flex items-center justify-between gap-3 rounded-lg border border-white/15 bg-white/[0.08] px-3.5 py-2.5 font-mono text-caption text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/[0.14] hover:shadow-silver focus-ring shadow-glass"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <span className="font-bold text-white tracking-wide text-xs sm:text-sm">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-white/70 tracking-wider uppercase font-semibold text-[10px] sm:text-xs">
                    {item.spec}
                  </span>
                </div>
              </HorizontalReveal>
            ))}
          </div>
        </div>

        {/* Right Side: Command Console Portrait (occupies right space cleanly) */}
        <div
          data-no-constellation
          className="relative flex w-full lg:w-[44%] xl:w-[42%] items-center justify-center lg:justify-end"
        >
          <HorizontalReveal xOffset={60} skewAngle={-6} delay={0.2} duration={0.8}>
            <PortraitPlaceholder />
          </HorizontalReveal>
        </div>
      </div>
    </section>
  );
}