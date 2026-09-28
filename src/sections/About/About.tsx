import React, { useRef, useEffect } from "react";
import PortraitPlaceholder from "./PortraitPlaceholder";
import HorizontalTextReveal from "@/components/effects/HorizontalTextReveal";
import { gsap } from "@/utils/gsap";
import { Label, Tag } from "@/components/ui";

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
        gsap.set(
          [
            ".console-beam",
            ".console-eyebrow",
            ".console-body",
            ".identity-tag",
            ".portrait-card",
            ".portrait-rim",
            ".portrait-blueprint",
            ".portrait-labels",
          ],
          { opacity: 1, y: 0, scale: 1, clearProps: "transform" }
        );
        return;
      }

      // Initial state with horizontal offset and skew
      gsap.set(".console-beam", { opacity: 0 });
      gsap.set(".console-eyebrow", { opacity: 0, x: 40, skewX: -4 });
      gsap.set(".console-body", { opacity: 0, x: 50, skewX: -5 });
      gsap.set(".identity-tag", { opacity: 0, x: 60, skewX: -6 });
      gsap.set(".portrait-card", { opacity: 0, x: 70, skewX: -6, scale: 0.98 });
      gsap.set(".portrait-rim", { opacity: 0 });
      gsap.set(".portrait-blueprint, .portrait-labels", { opacity: 0 });

      // Coordinated Entrance Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
      });

      // 0ms: Ambient lighting beam
      tl.to(".console-beam", { opacity: 1, duration: 1.2, ease: "power2.out" }, 0.1)

        // 200ms: Eyebrow reveals from right with skew
        .to(".console-eyebrow", { opacity: 1, x: 0, skewX: 0, duration: 0.6, ease: "power2.out" }, 0.2)

        // 800ms: Body copy reveals from right with skew
        .to(
          ".console-body",
          {
            opacity: 1,
            x: 0,
            skewX: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          0.8
        )

        // 1100ms: Identity matrix equipment tags reveal from right with skew
        .to(
          ".identity-tag",
          {
            opacity: 1,
            x: 0,
            skewX: 0,
            duration: 0.6,
            stagger: 0.09,
            ease: "power2.out",
          },
          1.1
        )

        // 1300ms: Portrait reveals from right with skew
        .to(
          ".portrait-card",
          {
            opacity: 1,
            x: 0,
            skewX: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          1.3
        )

        // 1550ms: Rim light sweeps
        .to(
          ".portrait-rim",
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          1.55
        )

        // 1750ms: Blueprint overlay activates
        .to(
          ".portrait-blueprint, .portrait-labels",
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          1.75
        );

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
        .to(".console-beam", { y: 50, x: 20, ease: "none" }, 0)
        .to(".portrait-blueprint", { opacity: 0.85, ease: "none" }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-10 w-full min-h-screen overflow-x-clip px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-20 md:py-28 select-none flex items-center"
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
        {/* Left Side: Story Layer (occupies left space cleanly) */}
        <div className="relative flex flex-col items-start w-full lg:w-[56%] xl:w-[58%]">
          {/* Dossier Eyebrow Label */}
          <div className="console-eyebrow mb-5">
            <Label beacon beaconColor="bg-white/80">
              INTRODUCTION // ACT II
            </Label>
          </div>

          {/* Headline with Horizontal Text Reveal */}
          <div className="intro-headline flex flex-col gap-2.5 sm:gap-3.5 w-full">
            {isIntroComplete ? (
              <>
                <HorizontalTextReveal
                  text="I build systems that learn,"
                  className="font-mono text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.25] tracking-tight"
                  wordClassName="text-white"
                  xOffset={50}
                  skewAngle={-6}
                  delay={0.15}
                  stagger={0.045}
                  duration={0.75}
                  mode="viewport"
                />
                <HorizontalTextReveal
                  text="and I build them for places where"
                  className="font-mono text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.25] tracking-tight"
                  wordClassName="text-white/70"
                  xOffset={50}
                  skewAngle={-6}
                  delay={0.35}
                  stagger={0.04}
                  duration={0.75}
                  mode="viewport"
                />
                <HorizontalTextReveal
                  text="getting it wrong isn't an option."
                  className="font-mono text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.25] tracking-tight"
                  highlightWords={["getting", "wrong", "isn't", "option."]}
                  highlightColor="#ffffff"
                  wordClassName="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                  xOffset={50}
                  skewAngle={-6}
                  delay={0.55}
                  stagger={0.045}
                  duration={0.75}
                  mode="viewport"
                />
              </>
            ) : (
              <div className="opacity-0 pointer-events-none select-none" aria-hidden>
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.25] tracking-tight font-mono text-white">
                  I build systems that learn,
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.25] tracking-tight mt-3 font-mono text-white/70">
                  and I build them for places where
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.25] tracking-tight mt-3 font-mono text-white">
                  getting it wrong isn&apos;t an option.
                </div>
              </div>
            )}
          </div>

          {/* Body Copy */}
          <p className="console-body mt-7 max-w-[54ch] font-mono text-body leading-relaxed text-white/75">
            Third-year AI/ML engineering student, focused on applying machine
            learning to defense and critical-infrastructure problems. Operating out
            of Nagpur, architecting edge-quantized models, resilient telemetry
            pipelines, and mission-ready autonomy.
          </p>

          {/* Floating 2x2 Identity Matrix */}
          <div
            data-no-constellation
            className="mt-8 grid w-full max-w-lg grid-cols-1 sm:grid-cols-2 gap-3.5"
          >
            {IDENTITY_ITEMS.map((item) => (
              <div
                key={item.label}
                tabIndex={0}
                className="identity-tag group relative flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-caption text-white backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:shadow-silver focus-ring"
              >
                <div className="flex items-center gap-2">
                  <span className="text-white/80 text-caption group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span className="font-semibold text-white tracking-wide text-caption">
                    {item.label}
                  </span>
                </div>
                <span className="text-label text-white/45 tracking-wider uppercase font-normal">
                  {item.spec}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Command Console Portrait (occupies right space cleanly) */}
        <div
          data-no-constellation
          className="relative flex w-full lg:w-[44%] xl:w-[42%] items-center justify-center lg:justify-end"
        >
          <PortraitPlaceholder />
        </div>
      </div>
    </section>
  );
}