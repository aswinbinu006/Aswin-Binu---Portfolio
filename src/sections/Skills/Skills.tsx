import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '@/data/skills';
import SkillCard from './SkillCard';
import { Label } from '@/components/ui';
import HorizontalTextReveal from '@/components/effects/HorizontalTextReveal';
import HorizontalReveal from '@/components/effects/HorizontalReveal';

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative z-10 mx-auto max-w-[1500px] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10 sm:py-14 md:py-18 overflow-x-clip select-none"
    >
      {/* Chapter Ambient Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[450px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-15 blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(226, 232, 240, 0.05) 0%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      {/* ── CHAPTER HEADER ── */}
      <div className="mb-6 sm:mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <HorizontalReveal xOffset={40} skewAngle={-4} delay={0.05}>
            <div className="mb-3">
              <Label beacon beaconColor="bg-white/80">
                CHAPTER 04 // TECH STACK & ECOSYSTEM
              </Label>
            </div>
          </HorizontalReveal>

          <HorizontalTextReveal
            text="Languages & Technologies"
            className="font-mono text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white"
            highlightWords={['Languages', 'Technologies']}
            highlightColor="#ffffff"
            wordClassName="text-white"
            xOffset={60}
            skewAngle={-8}
            delay={0.1}
          />

          <HorizontalReveal xOffset={50} skewAngle={-5} delay={0.2}>
            <p className="mt-2.5 max-w-[70ch] font-mono text-xs sm:text-sm leading-relaxed text-white/80 font-medium">
              Verified languages, frameworks, and developer libraries utilized directly across
              production applications, AI state machines, and core CS laboratories.
            </p>
          </HorizontalReveal>
        </div>

        {/* Global Technology Counter */}
        <HorizontalReveal xOffset={40} skewAngle={-4} delay={0.25}>
          <div className="flex items-center gap-2 font-mono text-caption text-white/90 px-3.5 py-2 rounded-xl border border-white/20 bg-slate-800/25 backdrop-blur-md shadow-glass">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span className="tracking-wider uppercase font-bold text-xs">
              {skillsData.length} TECHNOLOGIES // PROJECT-VERIFIED
            </span>
          </div>
        </HorizontalReveal>
      </div>

      {/* ── MINIMALIST SMALL BOX GRID (ALL DIRECT) ── */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4"
      >
        {skillsData.map((item, idx) => (
          <SkillCard key={item.id} item={item} index={idx} />
        ))}
      </motion.div>
    </section>
  );
}