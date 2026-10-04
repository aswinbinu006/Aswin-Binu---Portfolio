import React, { useRef } from "react";
import { Label } from "@/components/ui";
import HorizontalTextReveal from "@/components/effects/HorizontalTextReveal";
import HorizontalReveal from "@/components/effects/HorizontalReveal";
import AcademicCard from "./AcademicCard";
import { ACADEMIC_RECORDS } from "@/lib/academics";

/**
 * Chapter 06 — Academic Archive
 * Spread-out minimalist grid layout displaying Class 10th, Class 12th, and B.Tech records with subject-level marks inspection.
 */
export default function Academics() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="academics"
      className="relative z-10 mx-auto max-w-[1500px] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10 sm:py-14 md:py-20 select-none overflow-x-clip"
    >
      {/* Chapter Ambient Lighting Beam */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-15 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(226, 232, 240, 0.05) 0%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* ── CHAPTER HEADER ── */}
      <div className="mb-6 sm:mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <HorizontalReveal xOffset={40} skewAngle={-4} delay={0.05}>
            <div className="mb-3">
              <Label beacon beaconColor="bg-white/80">
                CHAPTER 06 // ACADEMIC ARCHIVE
              </Label>
            </div>
          </HorizontalReveal>

          <HorizontalTextReveal
            text="Academic Archive"
            className="font-mono text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white"
            highlightWords={["Academic", "Archive"]}
            highlightColor="#ffffff"
            wordClassName="text-white"
            xOffset={60}
            skewAngle={-8}
            delay={0.1}
          />

          <HorizontalReveal xOffset={50} skewAngle={-5} delay={0.2}>
            <p className="mt-2.5 max-w-[70ch] font-mono text-xs sm:text-sm leading-relaxed text-white/80 font-medium">
              Academic progression across secondary education, higher secondary science stream, and undergraduate B.Tech Computer Science (AI & ML).
            </p>
          </HorizontalReveal>
        </div>

        {/* Current Academic Status Badge */}
        <HorizontalReveal xOffset={40} skewAngle={-4} delay={0.25}>
          <div className="flex items-center gap-2 font-mono text-caption text-white/90 px-3.5 py-2 rounded-xl border border-white/20 bg-slate-800/25 backdrop-blur-md shadow-glass">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span className="tracking-wider uppercase font-bold text-xs">
              CURRENT: B.TECH CSE (AI/ML) • SEM V
            </span>
          </div>
        </HorizontalReveal>
      </div>

      {/* ── SPREAD-OUT 3-COLUMN ACADEMIC CARDS GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-start">
        {ACADEMIC_RECORDS.map((record, index) => (
          <HorizontalReveal
            key={record.id}
            index={index}
            xOffset={60}
            skewAngle={-5}
            stagger={0.08}
            delay={0.12}
            className="w-full"
          >
            <AcademicCard record={record} index={index} />
          </HorizontalReveal>
        ))}
      </div>
    </section>
  );
}
