import React from "react";
import type { AcademicStage } from "@/lib/academics";

interface AcademicTrajectoryProps {
  activeStage: AcademicStage;
  onSelectStage: (stage: AcademicStage) => void;
}

const TRAJECTORY_STAGES: {
  id: AcademicStage;
  number: string;
  label: string;
  period: string;
  status: string;
  metric: string;
  isCurrent?: boolean;
}[] = [
  {
    id: "school",
    number: "01",
    label: "SECONDARY SCHOOL (X)",
    period: "2019 — 2020",
    status: "CBSE • NAGPUR",
    metric: "91.2% AGGREGATE",
  },
  {
    id: "higher-secondary",
    number: "02",
    label: "SENIOR SECONDARY (XII)",
    period: "2020 — 2022",
    status: "HSC PCM + CS",
    metric: "87.4% (CS: 96/100)",
  },
  {
    id: "university",
    number: "03",
    label: "B.TECH CSE (AI & ML)",
    period: "2023 — 2027",
    status: "SYMBIOSIS INST. OF TECH",
    metric: "CGPA 7.58 • SEM V",
    isCurrent: true,
  },
];

/**
 * Academic Trajectory Line / Tactical Conduit
 * Matches the site's identity chips and project card design tokens.
 */
export default function AcademicTrajectory({
  activeStage,
  onSelectStage,
}: AcademicTrajectoryProps) {
  return (
    <div
      data-no-constellation
      className="relative w-full mb-8 sm:mb-10 select-none"
    >
      {/* Background Mounting Conduit Line on Desktop */}
      <div className="hidden md:block absolute top-1/2 left-4 right-4 -translate-y-1/2 h-[1px] bg-white/10 z-0">
        <div
          className="h-full bg-gradient-to-r from-white/30 via-white/80 to-white transition-all duration-500 ease-out"
          style={{
            width:
              activeStage === "school"
                ? "33%"
                : activeStage === "higher-secondary"
                ? "66%"
                : "100%",
          }}
        />
      </div>

      {/* Trajectory Phase Selectors */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {TRAJECTORY_STAGES.map((stage) => {
          const isActive = activeStage === stage.id;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => onSelectStage(stage.id)}
              aria-pressed={isActive}
              aria-label={`View stage ${stage.number}: ${stage.label}`}
              className={`group relative text-left p-4 sm:p-5 rounded-xl border transition-all duration-300 focus-ring cursor-pointer backdrop-blur-md ${
                isActive
                  ? "border-white/40 bg-white/[0.08] shadow-silver text-white"
                  : "border-white/10 bg-[#0a0a0c]/80 text-white/70 hover:border-white/30 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              {/* Top Header: Phase Badge & Status Indicator */}
              <div className="flex items-center justify-between gap-2 mb-2 font-mono text-label">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block h-1.5 w-1.5 rounded-full transition-all ${
                      isActive
                        ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] scale-110"
                        : stage.isCurrent
                        ? "bg-white/60 animate-pulse"
                        : "bg-white/30"
                    }`}
                  />
                  <span
                    className={`font-semibold uppercase tracking-wider ${
                      isActive ? "text-white" : "text-white/50"
                    }`}
                  >
                    PHASE {stage.number}
                  </span>
                </div>

                {stage.isCurrent ? (
                  <span className="px-2 py-0.5 rounded-full border border-white/20 bg-white/10 text-white font-mono text-[9px] sm:text-[10px] tracking-widest uppercase">
                    CURRENT
                  </span>
                ) : (
                  <span className="text-white/40 font-mono text-[10px]">
                    {stage.period}
                  </span>
                )}
              </div>

              {/* Title / Stage Name */}
              <div
                className={`font-mono text-xs sm:text-sm font-bold tracking-tight transition-colors ${
                  isActive ? "text-white" : "text-white/90 group-hover:text-white"
                }`}
              >
                {stage.label}
              </div>

              {/* Metric & Status Subline */}
              <div className="mt-2 pt-2 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px] text-white/50">
                <span className="truncate max-w-[20ch]">{stage.status}</span>
                <span
                  className={`font-semibold ${
                    isActive ? "text-white" : "text-white/70"
                  }`}
                >
                  {stage.metric}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
