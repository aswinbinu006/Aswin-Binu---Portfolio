import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AcademicRecord, SemesterRecord } from "@/lib/academics";
import { ChevronDown, GraduationCap, School, BookOpen, MapPin, Calendar } from "lucide-react";
import { ScrollTrigger } from "@/utils/gsap";

interface AcademicCardProps {
  record: AcademicRecord;
  index: number;
}

export default function AcademicCard({ record, index }: AcademicCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<number>(
    record.semesters ? record.semesters[0].semester : 1
  );

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
    setTimeout(() => {
      if (typeof window !== "undefined") {
        ScrollTrigger.refresh();
      }
    }, 220);
  };

  const getStageIcon = () => {
    switch (record.stage) {
      case "university":
        return <GraduationCap className="size-3.5 text-sky-300" />;
      case "higher-secondary":
        return <BookOpen className="size-3.5 text-purple-300" />;
      default:
        return <School className="size-3.5 text-emerald-300" />;
    }
  };

  const getStageBadgeLabel = () => {
    switch (record.stage) {
      case "university":
        return "B.TECH • CSE (AI & ML)";
      case "higher-secondary":
        return "CLASS XII • HSC SCIENCE";
      default:
        return "CLASS X • CBSE";
    }
  };

  const activeSemData: SemesterRecord | undefined = record.semesters?.find(
    (s) => s.semester === selectedSemester
  );

  return (
    <motion.div
      layout
      className="group relative flex flex-col rounded-xl border border-white/20 bg-[#0c121e]/90 p-3.5 sm:p-4 transition-all duration-300 hover:border-white/40 hover:bg-[#111a2b]/95 shadow-glass self-start w-full select-none"
    >
      <div>
        {/* Top Header: Badge on Left, Score Pill on Right (Zero Clipping) */}
        <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-white/15 font-mono">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="p-1 rounded bg-white/10 border border-white/15 shrink-0">
              {getStageIcon()}
            </span>
            <span className="font-bold text-[10px] sm:text-[11px] tracking-wider uppercase text-white/90 truncate">
              {getStageBadgeLabel()}
            </span>
          </div>

          {/* Compact Score Pill */}
          <div className="shrink-0 flex items-center gap-1 px-2.5 py-0.5 rounded-lg border border-white/25 bg-white/10 backdrop-blur-md">
            <span className="font-mono text-xs sm:text-sm font-extrabold text-white">
              {record.score}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-white/70">
              {record.stage === "university" ? "CGPA" : "%"}
            </span>
          </div>
        </div>

        {/* Institution, Location & Duration Details */}
        <div className="mt-2.5 min-h-[64px] flex flex-col justify-between">
          <h3 className="font-mono text-xs sm:text-sm font-bold text-white tracking-tight leading-snug line-clamp-2">
            {record.institution}
          </h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10.5px] text-white/65">
            <div className="flex items-center gap-1">
              <MapPin className="size-3 text-white/40 shrink-0" />
              <span>{record.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="size-3 text-white/40 shrink-0" />
              <span>{record.period}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Marks Section */}
      <div className="mt-3.5 pt-2.5 border-t border-white/10">
        <button
          type="button"
          onClick={handleToggleExpand}
          className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] hover:border-white/30 font-mono text-[11px] font-semibold text-white transition-all cursor-pointer"
        >
          <span>
            {isExpanded
              ? "Hide Subject Marks"
              : record.semesters
              ? "View Semester Marks & SGPA"
              : `View Subject Marks (${record.subjects?.length || 0})`}
          </span>
          <ChevronDown
            className={`size-3.5 text-white/70 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {/* College Semesters Tabs */}
              {record.semesters && record.semesters.length > 0 ? (
                <div className="mt-2.5 space-y-2">
                  {/* Semester selector pills */}
                  <div className="flex flex-wrap gap-1 pb-1.5 border-b border-white/10">
                    {record.semesters.map((sem) => {
                      const isSelected = selectedSemester === sem.semester;
                      return (
                        <button
                          key={sem.semester}
                          type="button"
                          onClick={() => setSelectedSemester(sem.semester)}
                          className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold transition-all ${
                            isSelected
                              ? "bg-white text-slate-900 shadow-sm"
                              : "bg-white/10 text-white/70 hover:bg-white/15 hover:text-white"
                          }`}
                        >
                          Sem {sem.semester}
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Semester SGPA Header */}
                  {activeSemData && (
                    <div className="flex items-center justify-between text-[10.5px] font-mono pb-0.5">
                      <span className="text-white/60">{activeSemData.academicYear}</span>
                      {activeSemData.sgpa ? (
                        <span className="font-bold text-white bg-white/10 px-1.5 py-0.5 rounded border border-white/15">
                          SGPA: {activeSemData.sgpa.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-amber-300 text-[10px]">{activeSemData.status}</span>
                      )}
                    </div>
                  )}

                  {/* Active Semester Subjects Table */}
                  <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                    {activeSemData?.subjects.map((sub, sIdx) => (
                      <div
                        key={`${sub.name}-${sIdx}`}
                        className="flex items-center justify-between gap-2 px-2 py-1 rounded bg-white/[0.04] border border-white/10 font-mono text-[10px]"
                      >
                        <span className="text-white/90 truncate max-w-[22ch]">
                          {sub.name}
                        </span>
                        <span className="font-bold text-white shrink-0 px-1.5 py-0.5 rounded bg-white/10">
                          {sub.grade || `${sub.marks}/${sub.maxMarks}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* School & High School Subjects List */
                <div className="mt-2.5 space-y-1 max-h-52 overflow-y-auto pr-1">
                  {record.subjects?.map((sub, sIdx) => (
                    <div
                      key={`${sub.name}-${sIdx}`}
                      className="flex items-center justify-between gap-2 px-2 py-1 rounded bg-white/[0.04] border border-white/10 font-mono text-[10px]"
                    >
                      <span className="text-white/90 truncate max-w-[22ch]">
                        {sub.name}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {sub.marks !== undefined && (
                          <span className="text-white/80 font-semibold">
                            {sub.marks}/{sub.maxMarks || 100}
                          </span>
                        )}
                        {sub.grade && (
                          <span className="px-1.5 py-0.5 rounded bg-white/10 text-white font-bold text-[9.5px]">
                            {sub.grade}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
