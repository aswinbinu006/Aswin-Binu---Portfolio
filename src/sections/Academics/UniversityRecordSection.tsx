import React, { useState } from "react";
import { motion } from "framer-motion";
import type { AcademicRecord } from "@/lib/academics";
import SemesterPlate from "./SemesterPlate";

interface UniversityRecordSectionProps {
  record: AcademicRecord;
}

/**
 * University Section Centerpiece of the Academic Exhibition Wall
 * Matches the site's dark obsidian glass and tactical HUD design system with scroll reveals.
 */
export default function UniversityRecordSection({
  record,
}: UniversityRecordSectionProps) {
  const [expandedSemester, setExpandedSemester] = useState<number | null>(null);

  const semesters = record.semesters || [];

  const handleToggleSemester = (semNumber: number) => {
    setExpandedSemester((prev) => (prev === semNumber ? null : semNumber));
  };

  return (
    <div
      data-no-constellation
      className="relative w-full rounded-xl border border-white/10 bg-[#0a0a0c]/90 backdrop-blur-xl p-3.5 sm:p-4.5 md:p-5 transition-all duration-300 hover:border-white/25 hover:shadow-silver select-none"
    >
      {/* University Archival Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-3.5 border-b border-white/10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] text-white/50">
            <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-white font-semibold tracking-wider uppercase">
              {record.documentRef}
            </span>
            <span>PHASE {record.stageNumber} // HIGHER RESEARCH</span>
          </div>

          <h3 className="font-mono text-base sm:text-lg md:text-xl font-bold text-white tracking-tight">
            {record.institution}
          </h3>

          <div className="mt-0.5 font-mono text-[11px] text-white/80 font-semibold">
            {record.degree} • {record.specialization}
          </div>

          <p className="mt-2 font-mono text-xs text-white/70 leading-relaxed max-w-[65ch]">
            {record.summary}
          </p>
        </div>

        {/* Supporting CGPA Telemetry & Phase State */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white/[0.02] border border-white/10 p-3 sm:p-3.5 rounded-lg">
          <div>
            <span className="font-mono text-[9px] text-white/45 uppercase block">
              CUMULATIVE CGPA
            </span>
            <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white">
              {record.score}
            </span>
            <span className="font-mono text-[9px] text-white/40 block">
              SCALE 10.0 (SEM 1–4)
            </span>
          </div>

          <div className="hidden sm:block h-8 w-[1px] bg-white/10" />

          <div>
            <span className="font-mono text-[9px] text-white/45 uppercase block">
              ACTIVE PHASE
            </span>
            <span className="font-mono text-[11px] font-bold text-white block">
              SEM V // CURRENT
            </span>
            <span className="font-mono text-[9px] text-white/40 block">
              88 CREDITS COMPLETED
            </span>
          </div>
        </div>
      </div>

      {/* Academic SGPA Progression Circuit Track */}
      <div className="my-4 p-3 sm:p-3.5 rounded-lg border border-white/10 bg-white/[0.02]">
        <div className="flex items-center justify-between font-mono text-[10px] text-white/50 mb-2">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span className="font-semibold text-white/80">SGPA PROGRESSION TRAJECTORY</span>
          </span>
          <span className="text-white/40 font-mono text-[9px]">
            DOCUMENTED PERFORMANCE
          </span>
        </div>

        {/* Minimalist Visual SGPA Circuit */}
        <div className="grid grid-cols-5 gap-2 sm:gap-3 items-end h-12 pt-1">
          {semesters.map((sem, idx) => {
            const hasSgpa = sem.sgpa !== undefined;
            const heightPercent = hasSgpa
              ? Math.min(100, Math.max(30, ((sem.sgpa! - 6.0) / 4.0) * 100))
              : 65;
            const isSel = expandedSemester === sem.semester;
            const isCurr = sem.status === "Current";
            return (
              <div
                key={sem.semester}
                className="flex flex-col items-center gap-1 h-full justify-end cursor-pointer group"
                onClick={() => handleToggleSemester(sem.semester)}
              >
                <span
                  className={`font-mono text-[9px] transition-colors ${
                    isSel || isCurr
                      ? "text-white font-bold"
                      : "text-white/40 group-hover:text-white"
                  }`}
                >
                  {hasSgpa ? sem.sgpa!.toFixed(2) : "ACTIVE"}
                </span>
                <div className="w-full bg-white/[0.06] rounded-t overflow-hidden h-6">
                  <motion.div
                    className={`w-full rounded-t ${
                      isSel
                        ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                        : isCurr
                        ? "bg-white/80"
                        : "bg-white/20 group-hover:bg-white/40"
                    }`}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${heightPercent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.08, ease: "easeOut" }}
                  />
                </div>
                <span className="font-mono text-[8px] text-white/40">
                  S0{sem.semester}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Spatial Semester Record Plate Grid with Staggered Scroll Animation */}
      <div>
        <div className="flex items-center justify-between mb-3 font-mono text-caption text-white/70">
          <span className="font-semibold uppercase tracking-wider text-[11px]">
            SEMESTER RECORDS (1 — 5)
          </span>
          <span className="text-white/40 text-[10px]">
            Click to expand marks breakdown
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {semesters.map((sem, idx) => (
            <motion.div
              key={sem.semester}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <SemesterPlate
                semester={sem}
                isExpanded={expandedSemester === sem.semester}
                isAnyExpanded={expandedSemester !== null}
                onToggleExpand={() => handleToggleSemester(sem.semester)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
