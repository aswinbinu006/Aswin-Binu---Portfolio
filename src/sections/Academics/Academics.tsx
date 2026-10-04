import React, { useRef, useEffect } from "react";
import { Label } from "@/components/ui";
import HorizontalTextReveal from "@/components/effects/HorizontalTextReveal";
import HorizontalReveal from "@/components/effects/HorizontalReveal";
import AcademicWall from "./AcademicWall";
import { gsap } from "@/utils/gsap";

/**
 * Chapter 6 — Academic Archive / The Academic Wall
 *
 * An exhibition archive containing the verified evidence of technical and intellectual development.
 * Redesigned with the site's cosmic obsidian & silver monochrome design system.
 */
export default function Academics() {
  const sectionRef = useRef<HTMLElement>(null);
  const wallContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !wallContainerRef.current || typeof window === "undefined")
      return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(wallContainerRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          clearProps: "transform",
        });
        return;
      }

      // Initial resting state before entering
      gsap.set(wallContainerRef.current, {
        opacity: 0.85,
        scale: 0.98,
        y: 30,
      });

      // Subtle Camera Approach Animation on Scroll Entry
      gsap.to(wallContainerRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Spatial depth parallax travel through the chapter
      gsap.fromTo(
        wallContainerRef.current,
        { y: 20 },
        {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="academics"
      className="relative z-10 w-full overflow-x-clip px-4 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-14 md:py-20 select-none flex flex-col items-center justify-center"
    >
      {/* Chapter Ambient Lighting Beam (Matching About & Hero Silver Tone) */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 z-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-20 blur-3xl transition-transform duration-700"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(226, 232, 240, 0.05) 0%, rgba(148, 163, 184, 0.02) 45%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Editorial Section Header */}
        <div className="mb-6 md:mb-8 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
          <div>
            <HorizontalReveal xOffset={40} skewAngle={-4} delay={0.05}>
              <div className="mb-2">
                <Label beacon beaconColor="bg-white/80">
                  CHAPTER 06 // ACADEMIC DOSSIER
                </Label>
              </div>
            </HorizontalReveal>

            <HorizontalTextReveal
              text="Academic Archive"
              className="font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white"
              highlightWords={["Academic", "Archive"]}
              highlightColor="#ffffff"
              wordClassName="text-white"
              xOffset={60}
              skewAngle={-8}
              delay={0.1}
            />

            <HorizontalReveal xOffset={50} skewAngle={-5} delay={0.2}>
              <p className="mt-2 max-w-[62ch] font-mono text-xs sm:text-caption text-white/70 leading-relaxed">
                The documented progression of technical foundations and intellectual rigor — from secondary mathematics to autonomous systems and edge intelligence.
              </p>
            </HorizontalReveal>
          </div>

          {/* Archival Status Beacon */}
          <HorizontalReveal xOffset={40} skewAngle={-4} delay={0.25}>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] font-mono text-[10px] text-white/70 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              <span>CURRENT: B.TECH CSE (AI/ML) • SEM V</span>
            </div>
          </HorizontalReveal>
        </div>

        {/* Spatial Exhibition Wall Container with Approach Motion */}
        <div ref={wallContainerRef} className="w-full">
          <AcademicWall />
        </div>
      </div>
    </section>
  );
}
