import React, { useRef, useEffect } from "react";
import type { SemesterRecord } from "@/lib/academics";
import { gsap } from "@/utils/gsap";

interface SemesterPlateProps {
  semester: SemesterRecord;
  isExpanded: boolean;
  isAnyExpanded: boolean;
  onToggleExpand: () => void;
}

/**
 * Semester Record Plate
 * Matches the site's dark glass project card and identity matrix styling.
 */
export default function SemesterPlate({
  semester,
  isExpanded,
  isAnyExpanded,
  onToggleExpand,
}: SemesterPlateProps) {
  const plateRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isCurrent = semester.status === "Current";
  const isDimmed = isAnyExpanded && !isExpanded;

  useEffect(() => {
    if (!plateRef.current || typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      if (isExpanded) {
        gsap.set(plateRef.current, { scale: 1, y: 0 });
      }
      return;
    }

    if (isExpanded) {
      gsap.to(plateRef.current, {
        scale: 1.02,
        y: -4,
        duration: 0.25,
        ease: "power2.out",
      });
    } else {
      gsap.to(plateRef.current, {
        scale: 1,
        y: 0,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  }, [isExpanded]);

  return (
    <div
      ref={plateRef}
      data-no-constellation
      onClick={onToggleExpand}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggleExpand();
        }
      }}
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
      aria-label={`Semester ${semester.semester} record, SGPA ${semester.sgpa}, ${
        isExpanded ? "Expanded" : "Collapsed"
      }`}
      className={`group relative w-full rounded-xl border transition-all duration-300 select-none cursor-pointer focus-ring overflow-hidden ${
        isExpanded
          ? "border-white/40 bg-[#12151f]/95 shadow-silver z-20"
          : isDimmed
          ? "border-white/5 bg-[#0a0a0c]/40 opacity-40 hover:opacity-80"
          : isCurrent
          ? "border-white/25 bg-[#0e111a]/85 hover:border-white/40 hover:bg-[#12151f] hover:shadow-silver"
          : "border-white/10 bg-[#0a0a0c]/85 hover:border-white/30 hover:bg-[#12151c]/90 hover:shadow-silver"
      }`}
    >
      {/* Plate Header (Always Visible) */}
      <div className="p-3 sm:p-3.5">
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-mono text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full border transition-colors ${
                isExpanded || isCurrent
                  ? "border-white/30 bg-white/10 text-white"
                  : "border-white/10 bg-white/[0.04] text-white/80"
              }`}
            >
              SEM 0{semester.semester}
            </span>

            {isCurrent && (
              <span className="px-1.5 py-0.2 rounded-full border border-white/20 bg-white/10 text-white font-mono text-[8px] uppercase tracking-widest animate-pulse">
                ACTIVE
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <span className="font-mono text-[8.5px] text-white/70 uppercase block font-semibold">
                {semester.sgpa !== undefined ? "SGPA" : "STATUS"}
              </span>
              <span
                className={`font-mono text-xs sm:text-sm font-extrabold ${
                  isExpanded || isCurrent ? "text-white" : "text-white/90"
                }`}
              >
                {semester.sgpa !== undefined
                  ? semester.sgpa.toFixed(2)
                  : "IN PROGRESS"}
              </span>
            </div>

            <span
              className={`font-mono text-[10px] transition-transform duration-300 ${
                isExpanded
                  ? "rotate-180 text-white"
                  : "text-white/70 group-hover:text-white"
              }`}
            >
              ▾
            </span>
          </div>
        </div>

        {/* Focus Subtitle in Rest State */}
        <div className="mt-1.5 flex items-center justify-between gap-2 font-mono text-[10px] text-white/75">
          <span className="truncate max-w-[24ch] sm:max-w-[32ch]">
            {semester.focus}
          </span>
          <span className="shrink-0 text-white/70 text-[9px] font-semibold">
            {semester.credits} Cr
          </span>
        </div>
      </div>

      {/* In-Place Expanded Artifact Content */}
      {isExpanded && (
        <div
          ref={contentRef}
          className="border-t border-white/10 bg-[#06080c]/95 p-3 sm:p-3.5 space-y-2 animate-fadeIn"
        >
          <div className="flex items-center justify-between font-mono text-[8.5px] text-white/75 uppercase tracking-wider pb-1 border-b border-white/[0.08] font-semibold">
            <span>COURSE / CODE</span>
            <div className="flex items-center gap-3">
              <span>CR</span>
              <span>GRADE</span>
            </div>
          </div>

          <div className="space-y-1 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
            {semester.subjects.map((sub) => (
              <div
                key={sub.name}
                className="flex items-center justify-between gap-2 py-1 px-1.5 rounded-md bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] transition-colors"
              >
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] text-white font-semibold leading-tight">
                    {sub.name}
                  </span>
                  {sub.code && (
                    <span className="font-mono text-[8.5px] text-white/70">
                      {sub.code} {sub.category ? `• ${sub.category}` : ""}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-[10px] text-white/80 font-medium">
                    {sub.credits}
                  </span>
                  <span
                    className={`font-mono text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      sub.grade === "O"
                        ? "bg-white/20 text-white border border-white/40 shadow-sm"
                        : sub.grade === "A+"
                        ? "bg-white/15 text-white border border-white/30"
                        : sub.grade === "Current"
                        ? "bg-white/15 text-white border border-white/30 italic"
                        : "bg-white/10 text-white border border-white/20"
                    }`}
                  >
                    {sub.grade || "PASS"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-1.5 flex items-center justify-between font-mono text-[9px] text-white/70">
            <span>Term: {semester.academicYear}</span>
            <span className="text-white hover:text-white underline underline-offset-2 font-semibold">
              ESC / click to collapse
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
