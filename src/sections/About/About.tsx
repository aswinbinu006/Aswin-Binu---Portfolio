import React, { useRef, useEffect, useState } from "react";
import PortraitPlaceholder from "./PortraitPlaceholder";
import HorizontalTextReveal from "@/components/effects/HorizontalTextReveal";
import { gsap, ScrollTrigger } from "@/utils/gsap";

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

/**
 * Chapter 2 — Introduction
 * Act II: The Operator (Command Console)
 *
 * - Seamless radial vignette (no hard split)
 * - Warm gold palette throughout
 * - HorizontalTextReveal headline (deferred until intro overlay completes)
 * - Floating portrait with no card frame
 * - Coordinated GSAP timeline and scroll-scrubbed tilt
 */
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Defer HorizontalTextReveal until the intro overlay has unmounted.
  // This prevents the animation from playing invisibly behind the intro.
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    // Poll until the intro overlay (z-[100] fixed element) is gone from the DOM.
    const check = () => {
      const overlay = document.querySelector('[aria-label="Cinematic Universe Introduction"]');
      if (!overlay) {
        setIntroComplete(true);
      } else {
        requestAnimationFrame(check);
      }
    };
    check();
  }, []);

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

        // 1000ms: Body copy appears after headline completes
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
      className="relative z-10 mx-auto min-h-screen max-w-7xl overflow-hidden px-6 py-28 md:py-36 select-none"
    >
      {/* LAYER 1: Full-width seamless atmospheric scrim — no harsh vertical split */}
      <div
        className="console-vignette pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 100% at 30% 50%, rgba(9, 10, 13, 0.92) 0%, rgba(9, 10, 13, 0.6) 45%, rgba(9, 10, 13, 0.2) 70%, transparent 100%)",
        }}
      />

      {/* LAYER 2: Warm ambient light wash (connects text side to portrait side) */}
      <div
        className="console-beam pointer-events-none absolute right-0 top-1/4 z-0 h-[650px] w-[750px] -translate-y-1/4 rotate-[-8deg] opacity-50 blur-3xl transition-transform duration-700"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 75% 45%, rgba(246, 195, 67, 0.06) 0%, rgba(255, 170, 0, 0.02) 45%, transparent 80%)",
        }}
      />

      {/* LAYER 3: Main Editorial Content & Technical Inspection Frame */}
      <div
        ref={containerRef}
        className="relative z-10 flex flex-col items-start justify-between gap-16 lg:flex-row lg:items-center lg:gap-14"
      >
        {/* Left Side: 55% Story Layer */}
        <div className="relative flex flex-col items-start lg:w-[55%] pl-0 sm:pl-7">
          {/* Vertical Story Line (Warm gold guide line running down the left side) */}
          <div
            className="story-guide-line pointer-events-none absolute left-0 top-1 bottom-4 hidden w-[1px] sm:block origin-top"
            style={{
              background:
                "linear-gradient(180deg, rgba(246, 195, 67, 0.5) 0%, rgba(246, 195, 67, 0.2) 40%, rgba(255, 255, 255, 0.08) 75%, transparent 100%)",
            }}
          >
            {/* Eyebrow marker node */}
            <div className="absolute top-1 -left-[2.5px] h-1.5 w-1.5 rounded-full bg-soft-glow/90 shadow-[0_0_6px_rgba(246,195,67,0.7)]" />
            {/* Headline alignment tick */}
            <div className="absolute top-16 -left-[1px] h-2.5 w-[3px] bg-white/25" />
            {/* Body alignment tick */}
            <div className="absolute top-[52%] -left-[1px] h-2.5 w-[3px] bg-white/25" />
            {/* Identity matrix alignment node */}
            <div className="absolute bottom-6 -left-[2.5px] h-1.5 w-1.5 rounded-full bg-soft-glow/50" />
          </div>

          {/* Dossier Eyebrow Label */}
          <div className="console-eyebrow mb-6 flex items-center gap-2.5">
            <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] text-soft-glow uppercase">
              INTRODUCTION // 02
            </span>
          </div>

          {/* Headline with Horizontal Text Reveal — deferred until intro overlay completes */}
          <div className="intro-headline flex flex-col gap-4">
            {introComplete ? (
              <>
                <HorizontalTextReveal
                  text="I build systems that learn,"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.12] tracking-tight"
                  wordClassName="text-white"
                  xOffset={75}
                  skewAngle={-10}
                  delay={0.15}
                  stagger={0.05}
                  duration={0.8}
                  mode="viewport"
                />
                <HorizontalTextReveal
                  text="and I build them for places where"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.12] tracking-tight"
                  wordClassName="text-slate-100/90"
                  xOffset={75}
                  skewAngle={-10}
                  delay={0.45}
                  stagger={0.04}
                  duration={0.8}
                  mode="viewport"
                />
                <HorizontalTextReveal
                  text="getting it wrong isn't an option."
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.12] tracking-tight"
                  highlightWords={["getting", "wrong", "isn't", "option."]}
                  highlightColor="#FFAA00"
                  wordClassName="text-white"
                  xOffset={75}
                  skewAngle={-10}
                  delay={0.7}
                  stagger={0.05}
                  duration={0.8}
                  mode="viewport"
                />
              </>
            ) : (
              /* Invisible placeholder preserves layout height while waiting */
              <div className="opacity-0 pointer-events-none select-none" aria-hidden>
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.12] tracking-tight">
                  I build systems that learn,
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.12] tracking-tight mt-4">
                  and I build them for places where
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.12] tracking-tight mt-4">
                  getting it wrong isn&apos;t an option.
                </div>
              </div>
            )}
          </div>

          {/* Body Copy - Reduced Readable Width (45–55 chars/line) */}
          <p className="console-body mt-8 max-w-[48ch] font-mono text-xs sm:text-sm leading-relaxed text-slate-300/90">
            Third-year AI/ML engineering student, focused on applying machine
            learning to defense and critical-infrastructure problems. Operating out
            of Nagpur, architecting edge-quantized models, resilient telemetry
            pipelines, and mission-ready autonomy.
          </p>

          {/* Floating 2x2 Identity Matrix (Equipment Tags) */}
          <div
            data-no-constellation
            className="mt-10 grid w-full max-w-md grid-cols-2 gap-3"
          >
            {IDENTITY_ITEMS.map((item) => (
              <div
                key={item.label}
                tabIndex={0}
                className="identity-tag group relative flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-[#12141a]/80 px-4 py-3 font-mono text-xs text-white/90 backdrop-blur-md transition-all duration-300 hover:border-soft-glow/40 hover:bg-[#181b24] hover:shadow-[0_0_15px_rgba(246,195,67,0.1)] focus:outline-none focus:border-soft-glow/60"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-soft-glow text-[11px] group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span className="font-semibold text-white tracking-wide text-xs">
                    {item.label}
                  </span>
                </div>
                <span className="text-[9px] text-white/40 tracking-wider uppercase font-normal">
                  {item.spec}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: 45% Command Console Portrait & Technical Inspection Zone */}
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