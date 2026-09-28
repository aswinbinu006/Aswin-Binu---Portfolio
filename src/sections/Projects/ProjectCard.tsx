import React, { useRef, useEffect } from "react";
import type { Project } from "@/data/projects";
import { gsap } from "@/utils/gsap";

/**
 * Editorial Project Card - Minimalist, data-driven, mockup-free.
 *
 * Focuses on project narrative + GitHub/Live Demo links only.
 * - No wireframe mockups, no engineering specs, no tech stack tags
 * - Clean typographic hierarchy
 * - Easy to add new projects - just add to data/projects.ts
 * - Consistent with editorial theme across the site
 */
export default function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Magnetic hover with GSAP
  useEffect(() => {
    if (!cardRef.current || typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const card = cardRef.current;
      if (card) {
        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);
      }
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, { y: -4, duration: 0.3, ease: "power3.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { y: 0, duration: 0.5, ease: "power3.out" });
  };

  return (
    <div
      ref={cardRef}
      className="project-card group relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#12141a]/90 p-6 md:p-8 backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)] select-none cursor-pointer"
    >
      {/* Project Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <h3
            className="text-xl md:text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-[#F6C343]"
          >
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-slate-400 uppercase tracking-wider">
            {project.category}
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-500 uppercase tracking-wider">
            {project.year}
          </span>
        </div>
      </div>

      {/* Project Description - Short Intro */}
      <p
        className="text-base sm:text-lg leading-relaxed text-slate-300 transition-colors hover:text-[#F6C343]"
      >
        {project.description}
      </p>

      {/* Action Buttons - GitHub & Live Demo */}
      <div className="mt-5 flex flex-wrap gap-3">
        {/* GitHub Repository */}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg border border-[#F6C343]/40 bg-[#F6C343]/10 px-4 py-2.5 font-mono text-xs font-medium text-[#F6C343] transition-all hover:bg-[#F6C343]/20 hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current"
            >
              <path
                d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
              />
            </svg>
            Repository
          </a>
        )}

        {/* Live Demo / Telemetry */}
        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg border border-[#F6C343]/40 bg-[#F6C343]/10 px-4 py-2.5 font-mono text-xs font-medium text-[#F6C343] transition-all hover:bg-[#F6C343]/20 hover:text-white"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F6C343] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F6C343]" />
            </span>
            Live Demo
          </a>
        ) : project.caseStudyUrl ? (
          <a
            href={project.caseStudyUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg border border-[#F6C343]/40 bg-[#F6C343]/10 px-4 py-2.5 font-mono text-xs font-medium text-[#F6C343] transition-all hover:bg-[#F6C343]/20 hover:text-white"
          >
            Engineering Log
          </a>
        ) : null}
      </div>
    </div>
  );
}