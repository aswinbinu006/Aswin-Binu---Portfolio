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
            ".console-vignette",
            ".console-beam",
            ".console-eyebrow",
            ".console-body",
            ".identity-tag",
            ".portrait-card",
            ".portrait-rim",
            ".portrait-blueprint",
            ".portrait-labels",
            ".story-guide-line",
          ],
          { opacity: 1, y: 0, scale: 1, clearProps: "transform" }
        );
        return;
      }

      // Initial state
      gsap.set(".console-vignette", { opacity: 0 });
      gsap.set(".console-beam", { opacity: 0 });
      gsap.set(".console-eyebrow", { opacity: 0, y: 15 });
      gsap.set(".story-guide-line", { opacity: 0, scaleY: 0 });
      gsap.set(".console-body", { opacity: 0, y: 20 });
      gsap.set(".identity-tag", { opacity: 0, y: 18 });
      gsap.set(".portrait-card", { opacity: 0, scale: 0.96 });
      gsap.set(".portrait-rim", { opacity: 0 });
      gsap.set(".portrait-blueprint, .portrait-labels", { opacity: 0 });

      // Coordinated Entrance Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // 0ms: Ambient background integrates smoothly
      tl.to(".console-vignette", { opacity: 1, duration: 0.6, ease: "power2.out" }, 0)
        .to(".console-beam", { opacity: 1, duration: 1.2, ease: "power2.out" }, 0.1)

        // 200ms: Eyebrow fades in & vertical story line unfolds
        .to(".console-eyebrow", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.2)
        .to(".story-guide-line", { opacity: 1, scaleY: 1, duration: 0.8, ease: "power2.out" }, 0.25)

        // 1000ms: Body copy appears
        .to(
          ".console-body",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          1.0
        )

        // 1400ms: Identity matrix equipment tags settle
        .to(
          ".identity-tag",
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
          },
          1.4
        )

        // 1600ms: Portrait powers on
        .to(
          ".portrait-card",
          {
            opacity: 1,
            scale: 1,
            duration: 0.75,
            ease: "power3.out",
          },
          1.6
        )

        // 1850ms: Rim light sweeps
        .to(
          ".portrait-rim",
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          1.85
        )

        // 2100ms: Blueprint overlay activates
        .to(
          ".portrait-blueprint, .portrait-labels",
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          2.1
        );

      // Scroll-driven subtle environmental changes
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
        .to("#operator-portrait-frame", { rotateY: 3, rotateX: -2, ease: "none" }, 0)
        .to(".console-beam", { rotate: 5, x: 25, ease: "none" }, 0)
        .to(".portrait-blueprint", { opacity: 0.8, ease: "none" }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-10 mx-auto min-h-screen max-w-7xl overflow-x-clip px-4 sm:px-6 lg:px-12 py-24 md:py-36 select-none"
    >
      {/* LAYER 1: Seamless atmospheric radial vignette */}
      <div
        className="console-vignette pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 100% at 30% 50%, rgba(2, 8, 20, 0.94) 0%, rgba(6, 26, 58, 0.5) 45%, rgba(2, 8, 20, 0.2) 70%, transparent 100%)",
        }}
      />

      {/* LAYER 2: Ambient stellar cyan light wash */}
      <div
        className="console-beam pointer-events-none absolute right-0 top-1/4 z-0 h-[650px] w-[750px] -translate-y-1/4 rotate-[-8deg] opacity-40 blur-3xl transition-transform duration-700"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 75% 45%, rgba(95, 168, 255, 0.08) 0%, rgba(15, 76, 129, 0.03) 45%, transparent 80%)",
        }}
      />

      {/* LAYER 3: Main Editorial Content & Technical Inspection Frame */}
      <div
        ref={containerRef}
        className="relative z-10 flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-center lg:gap-14"
      >
        {/* Left Side: Story Layer */}
        <div className="relative flex flex-col items-start lg:w-[55%] pl-0 sm:pl-7">
          {/* Vertical Story Guide Line */}
          <div
            className="story-guide-line pointer-events-none absolute left-0 top-1 bottom-4 hidden w-[1px] sm:block origin-top"
            style={{
              background:
                "linear-gradient(180deg, rgba(95, 168, 255, 0.6) 0%, rgba(15, 76, 129, 0.3) 40%, rgba(247, 251, 255, 0.08) 75%, transparent 100%)",
            }}
          >
            <div className="absolute top-1 -left-[2.5px] h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_6px_rgba(95,168,255,0.8)]" />
            <div className="absolute top-16 -left-[1px] h-2.5 w-[3px] bg-luminous-faint" />
            <div className="absolute top-[52%] -left-[1px] h-2.5 w-[3px] bg-luminous-faint" />
            <div className="absolute bottom-6 -left-[2.5px] h-1.5 w-1.5 rounded-full bg-cyan/50" />
          </div>

          {/* Dossier Eyebrow Label */}
          <div className="console-eyebrow mb-6">
            <Label beacon beaconColor="bg-cyan">
              INTRODUCTION // ACT II
            </Label>
          </div>

          {/* Headline with Horizontal Text Reveal */}
          <div className="intro-headline flex flex-col gap-3 sm:gap-4 w-full">
            {isIntroComplete ? (
              <>
                <HorizontalTextReveal
                  text="I build systems that learn,"
                  className="font-mono text-2xl sm:text-4xl md:text-5xl font-bold leading-[1.12] tracking-tight"
                  wordClassName="text-luminous"
                  xOffset={60}
                  skewAngle={-8}
                  delay={0.15}
                  stagger={0.05}
                  duration={0.8}
                  mode="viewport"
                />
                <HorizontalTextReveal
                  text="and I build them for places where"
                  className="font-mono text-2xl sm:text-4xl md:text-5xl font-bold leading-[1.12] tracking-tight"
                  wordClassName="text-luminous-muted"
                  xOffset={60}
                  skewAngle={-8}
                  delay={0.4}
                  stagger={0.04}
                  duration={0.8}
                  mode="viewport"
                />
                <HorizontalTextReveal
                  text="getting it wrong isn't an option."
                  className="font-mono text-2xl sm:text-4xl md:text-5xl font-bold leading-[1.12] tracking-tight"
                  highlightWords={["getting", "wrong", "isn't", "option."]}
                  highlightColor="#5FA8FF"
                  wordClassName="text-luminous"
                  xOffset={60}
                  skewAngle={-8}
                  delay={0.65}
                  stagger={0.05}
                  duration={0.8}
                  mode="viewport"
                />
              </>
            ) : (
              <div className="opacity-0 pointer-events-none select-none" aria-hidden>
                <div className="text-2xl sm:text-4xl md:text-5xl font-bold leading-[1.12] tracking-tight font-mono">
                  I build systems that learn,
                </div>
                <div className="text-2xl sm:text-4xl md:text-5xl font-bold leading-[1.12] tracking-tight mt-4 font-mono">
                  and I build them for places where
                </div>
                <div className="text-2xl sm:text-4xl md:text-5xl font-bold leading-[1.12] tracking-tight mt-4 font-mono">
                  getting it wrong isn&apos;t an option.
                </div>
              </div>
            )}
          </div>

          {/* Body Copy */}
          <p className="console-body mt-8 max-w-[50ch] font-mono text-body leading-relaxed text-luminous-muted">
            Third-year AI/ML engineering student, focused on applying machine
            learning to defense and critical-infrastructure problems. Operating out
            of Nagpur, architecting edge-quantized models, resilient telemetry
            pipelines, and mission-ready autonomy.
          </p>

          {/* Floating 2x2 Identity Matrix */}
          <div
            data-no-constellation
            className="mt-10 grid w-full max-w-md grid-cols-2 gap-3"
          >
            {IDENTITY_ITEMS.map((item) => (
              <div
                key={item.label}
                tabIndex={0}
                className="identity-tag group relative flex items-center justify-between gap-3 rounded-lg border border-luminous-faint bg-navy-surface px-4 py-3 font-mono text-caption text-luminous backdrop-blur-md transition-all duration-300 hover:border-cyan/40 hover:bg-navy/80 hover:shadow-cyan focus-ring"
              >
                <div className="flex items-center gap-2">
                  <span className="text-cyan text-caption group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span className="font-semibold text-luminous tracking-wide text-caption">
                    {item.label}
                  </span>
                </div>
                <span className="text-label text-luminous-dim tracking-wider uppercase font-normal">
                  {item.spec}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Command Console Portrait */}
        <div
          data-no-constellation
          className="relative flex w-full items-center justify-center lg:w-[45%]"
        >
          <PortraitPlaceholder />
        </div>
      </div>
    </section>
  );
}