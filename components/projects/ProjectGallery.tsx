"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

/**
 * Chapter 4 — Project Gallery
 *
 * Morph Pill Exhibition:
 * - Avatar pills that grow into full project cards on hover
 * - Single surface moving between two measured layouts without DOM tearing
 * - Optional Expand All toggle for comprehensive side-by-side review
 */
export default function ProjectGallery() {
  const [expandAll, setExpandAll] = useState(false);

  return (
    <section id="chapter-4" className="relative z-10 mx-auto max-w-5xl px-6 py-32">
      {/* Editorial Section Header */}
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <span className="mb-3 inline-block font-mono text-xs tracking-widest text-soft-glow/80 uppercase">
            Chapter 04 // Project Gallery
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Selected Systems &amp; Architectures
          </h2>
          <p className="mt-3 max-w-[65ch] font-mono text-xs leading-relaxed text-white/60 md:text-sm">
            Hover any avatar pill below to morph it into its complete engineering card.
            Click to pin open for deep inspection.
          </p>
        </div>

        {/* View Mode Switcher */}
        <button
          type="button"
          data-no-constellation
          onClick={() => setExpandAll((prev) => !prev)}
          className="focus-ring flex shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-xs text-white/70 backdrop-blur-md transition-all hover:border-soft-glow/50 hover:bg-soft-glow/10 hover:text-white"
        >
          <span
            className={`h-2 w-2 rounded-full transition-colors ${
              expandAll ? "bg-soft-glow shadow-[0_0_8px_#5FA8FF]" : "bg-white/40"
            }`}
          />
          <span>{expandAll ? "Collapse to Pills" : "Expand All Cards"}</span>
        </button>
      </div>

      {/* Morph Pill Cards Stack */}
      <div data-no-constellation className="flex flex-col gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            forceOpen={expandAll}
          />
        ))}
      </div>
    </section>
  );
}
