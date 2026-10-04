import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ACADEMIC_RECORDS } from "@/lib/academics";
import SchoolRecordPlate from "./SchoolRecordPlate";
import UniversityRecordSection from "./UniversityRecordSection";

/**
 * The Academic Wall — Continuous Scroll-Driven Exhibition
 * Seamless chronological progression from secondary foundations to university AI & ML research.
 */
export default function AcademicWall() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  });

  const schoolRecord = ACADEMIC_RECORDS.find((r) => r.stage === "school")!;
  const hscRecord = ACADEMIC_RECORDS.find((r) => r.stage === "higher-secondary")!;
  const uniRecord = ACADEMIC_RECORDS.find((r) => r.stage === "university")!;

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto select-none">
      {/* Outer Exhibition Wall Mounting Frame */}
      <div className="relative z-10 w-full rounded-2xl border border-white/20 bg-slate-800/25 backdrop-blur-xl p-3.5 sm:p-5 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        
        {/* Wall Masthead Telemetry */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-6 border-b border-white/10 font-mono text-[10px] text-white/50">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-white font-semibold tracking-wider uppercase">
              EXHIBITION ARCHIVE // COMPLETE ACADEMIC DOSSIER
            </span>
          </div>

          <div className="flex items-center gap-3 text-[10px] text-white/60">
            <span>CHRONOLOGICAL CONTINUUM</span>
            <span className="text-white/30">•</span>
            <span>3 PHASES</span>
            <span className="text-white/30">•</span>
            <span className="text-white font-medium">2019 — 2027</span>
          </div>
        </div>

        {/* Continuous Story-Driven Timeline Stream */}
        <div className="relative">
          {/* Vertical Illuminated Timeline Spine */}
          <div className="hidden md:block absolute left-4 top-4 bottom-8 w-[1px] bg-white/10 z-0">
            <motion.div
              className="w-full bg-gradient-to-b from-white/20 via-white to-white origin-top"
              style={{ scaleY: smoothProgress, height: "100%" }}
            />
          </div>

          <div className="space-y-6 md:space-y-8">
            
            {/* Phase 01: Secondary School (10th) */}
            <motion.div
              id="academic-phase-01"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative md:pl-10"
            >
              {/* Timeline Waypoint Node */}
              <div className="hidden md:flex absolute left-4 top-5 -translate-x-1/2 items-center justify-center">
                <span className="h-3.5 w-3.5 rounded-full border border-white/30 bg-[#090a0f] flex items-center justify-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
              </div>

              {/* Phase Header Eyebrow */}
              <div className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-white/50">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">PHASE 01 // FOUNDATION</span>
                  <span className="text-white/30">•</span>
                  <span>MATHEMATICS & PHYSICAL SCIENCES</span>
                </div>
                <span className="text-white/40 font-mono text-[10px]">2019 — 2020</span>
              </div>

              <SchoolRecordPlate record={schoolRecord} />
            </motion.div>

            {/* Phase 02: Senior Secondary (12th) */}
            <motion.div
              id="academic-phase-02"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative md:pl-10"
            >
              {/* Timeline Waypoint Node */}
              <div className="hidden md:flex absolute left-4 top-5 -translate-x-1/2 items-center justify-center">
                <span className="h-3.5 w-3.5 rounded-full border border-white/30 bg-[#090a0f] flex items-center justify-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
              </div>

              {/* Phase Header Eyebrow */}
              <div className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-white/50">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">PHASE 02 // SPECIALIZATION</span>
                  <span className="text-white/30">•</span>
                  <span>PURE SCIENCES & COMPUTER SCIENCE</span>
                </div>
                <span className="text-white/40 font-mono text-[10px]">2020 — 2022</span>
              </div>

              <SchoolRecordPlate record={hscRecord} />
            </motion.div>

            {/* Phase 03: University (B.Tech SIT) */}
            <motion.div
              id="academic-phase-03"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative md:pl-10"
            >
              {/* Timeline Waypoint Node */}
              <div className="hidden md:flex absolute left-4 top-5 -translate-x-1/2 items-center justify-center">
                <span className="h-4 w-4 rounded-full border border-white/40 bg-[#090a0f] flex items-center justify-center shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                </span>
              </div>

              {/* Phase Header Eyebrow */}
              <div className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-white/70">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  <span className="font-bold text-white">PHASE 03 // HIGHER ENGINEERING RESEARCH (CURRENT)</span>
                  <span className="text-white/30">•</span>
                  <span>AI & AUTONOMOUS SYSTEMS</span>
                </div>
                <span className="text-white font-mono text-[10px]">2023 — 2027</span>
              </div>

              <UniversityRecordSection record={uniRecord} />
            </motion.div>

          </div>
        </div>

      </div>
    </div>
  );
}
