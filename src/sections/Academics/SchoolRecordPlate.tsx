import React, { useState } from "react";
import type { AcademicRecord } from "@/lib/academics";

interface SchoolRecordPlateProps {
  record: AcademicRecord;
}

/**
 * Archival Exhibition Plate for Secondary & Higher Secondary Milestones
 * Matches the site's dark obsidian and silver design system.
 */
export default function SchoolRecordPlate({ record }: SchoolRecordPlateProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      data-no-constellation
      className="relative w-full rounded-xl border border-white/10 bg-[#0a0a0c]/90 backdrop-blur-xl p-3.5 sm:p-4.5 transition-all duration-300 hover:border-white/25 hover:shadow-silver select-none"
    >
      {/* Top Header Ribbon: Registry Reference + Period */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="inline-block px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[9px] text-white/75 tracking-wider uppercase">
            {record.documentRef}
          </span>
          <span className="font-mono text-[10px] text-white/40 uppercase">
            PHASE {record.stageNumber} // DOSSIER
          </span>
        </div>
        <div className="font-mono text-[11px] text-white/50">
          {record.period}
        </div>
      </div>

      {/* Main Record Content */}
      <div className="mt-3.5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Title, Institution & Context */}
        <div className="lg:col-span-8">
          <h3 className="font-mono text-base sm:text-lg font-bold text-white tracking-tight">
            {record.title}
          </h3>
          <p className="mt-0.5 font-mono text-[11px] text-white/60">
            {record.institution} • {record.location}
          </p>
          <p className="mt-2 font-mono text-xs text-white/70 leading-relaxed max-w-[65ch]">
            {record.summary}
          </p>

          {/* Metric Badges */}
          {record.metrics && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {record.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] font-mono text-[10px] text-white/80"
                >
                  <span className="text-white/45">{metric.label}:</span>
                  <span className="font-semibold text-white">{metric.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Telemetry Metric Score Card */}
        <div className="lg:col-span-4 w-full flex flex-col items-start lg:items-end justify-between p-3 sm:p-3.5 rounded-lg border border-white/10 bg-white/[0.02]">
          <span className="font-mono text-[9px] text-white/50 uppercase tracking-wider">
            {record.scoreLabel || "Aggregate Score"}
          </span>
          <div className="my-1 font-mono text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {record.score}
          </div>
          <div className="font-mono text-[9px] text-white/60 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span>AUTHENTICATED RECORD</span>
          </div>
        </div>
      </div>

      {/* In-Place Transcript Inspector Button */}
      {record.subjects && record.subjects.length > 0 && (
        <div className="mt-3.5 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30 text-white font-mono text-[11px] font-semibold transition-all focus-ring cursor-pointer group"
          >
            <span className="text-white transition-transform duration-300 group-hover:scale-110">
              {isExpanded ? "▾" : "▸"}
            </span>
            <span>
              {isExpanded
                ? "COLLAPSE CURRICULUM TRANSCRIPT"
                : `EXAMINE SUBJECT MARKS & GRADES (${record.subjects.length} DISCIPLINARY RECORDS)`}
            </span>
          </button>

          <span className="font-mono text-[9px] text-white/40">
            {isExpanded
              ? "Showing verified marks breakdown"
              : "Click to reveal granular subject performance"}
          </span>
        </div>
      )}

      {/* Expanded Transcript Drawer */}
      {isExpanded && record.subjects && (
        <div className="mt-3 rounded-lg border border-white/10 bg-[#06080c]/90 p-3 sm:p-4 transition-all duration-300">
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/[0.08] font-mono text-[9px] text-white/45 uppercase tracking-wider">
            <span>DISCIPLINE / SUBJECT</span>
            <div className="flex items-center gap-6">
              <span className="hidden sm:inline">CATEGORY</span>
              <span>MARKS / GRADE</span>
            </div>
          </div>

          <div className="space-y-1.5">
            {record.subjects.map((sub) => (
              <div
                key={sub.name}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 p-2 rounded-md border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
              >
                <span className="font-mono text-[11px] text-white/90 font-medium">
                  {sub.name}
                </span>

                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                  {sub.category && (
                    <span className="hidden sm:inline font-mono text-[9px] px-2 py-0.5 rounded-full bg-white/[0.04] text-white/60 border border-white/5">
                      {sub.category}
                    </span>
                  )}
                  <div className="flex items-center gap-2.5">
                    {sub.marks !== undefined && (
                      <div className="flex items-center gap-2">
                        <div className="w-14 h-1 bg-white/10 rounded-full overflow-hidden hidden xs:block">
                          <div
                            className="h-full bg-white/80 rounded-full"
                            style={{ width: `${sub.marks}%` }}
                          />
                        </div>
                        <span className="font-mono text-[11px] font-bold text-white">
                          {sub.marks}
                          <span className="text-white/40 text-[9px] font-normal">
                            /{sub.maxMarks || 100}
                          </span>
                        </span>
                      </div>
                    )}
                    {sub.grade && (
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border border-white/20 bg-white/10 text-white">
                        {sub.grade}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
