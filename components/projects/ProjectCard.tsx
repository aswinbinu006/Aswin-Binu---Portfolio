"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/data/projects";
import WireframeMockup from "./WireframeMockup";
import ProjectAvatar from "./ProjectAvatar";

interface ProjectCardProps {
  project: Project;
  forceOpen?: boolean;
}

/**
 * Morph Pill Card
 *
 * An avatar pill that grows into a full profile/product card on hover.
 * It is ONE single unified surface moving between two measured layouts,
 * so the pill visibly morphs into the card instead of an overlay appearing.
 */
export default function ProjectCard({ project, forceOpen = false }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const isExpanded = forceOpen || isLocked || isHovered;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleToggleLock = (e: React.MouseEvent) => {
    // If clicking a link or button inside, let it proceed
    const target = e.target as HTMLElement | null;
    if (target?.closest("a, button:not(.lock-toggle)")) return;

    setIsLocked((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsLocked((prev) => !prev);
    }
  };

  return (
    <motion.div
      layout
      data-no-constellation
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 28,
        mass: 0.8,
      }}
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleToggleLock}
      onKeyDown={handleKeyDown}
      className={`focus-ring reflection-edge group relative w-full overflow-hidden border backdrop-blur-xl transition-colors duration-300 select-none ${
        isExpanded
          ? "rounded-2xl border-soft-glow/50 bg-[#040E20]/95 p-6 shadow-[0_16px_50px_rgba(2,8,20,0.95),0_0_30px_rgba(95,168,255,0.12)] md:p-8"
          : "rounded-full border-white/15 bg-[#040E20]/80 px-4 py-3 shadow-[0_8px_24px_rgba(2,8,20,0.6)] hover:border-soft-glow/40 hover:bg-[#061A3A]/90 hover:shadow-[0_0_25px_rgba(95,168,255,0.2)] md:px-6 md:py-3.5"
      }`}
    >
      {/* Dynamic rim light glow on hover/expanded */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
          isExpanded
            ? "opacity-100 shadow-[inset_0_0_35px_rgba(95,168,255,0.08)]"
            : "opacity-0 group-hover:opacity-100 group-hover:shadow-[inset_0_0_20px_rgba(95,168,255,0.1)]"
        }`}
      />

      {/* Unified Header & Morph Anchor */}
      <motion.div layout className="relative z-10 flex items-center justify-between gap-4">
        {/* Left: Avatar + Title block */}
        <div className="flex min-w-0 items-center gap-3.5 md:gap-4">
          <ProjectAvatar type={project.mockupType} isExpanded={isExpanded} />

          <motion.div layout className="flex min-w-0 flex-col">
            <div className="flex items-center gap-2 font-mono text-[10px] md:text-xs">
              <span className="font-bold text-soft-glow">// {project.index}</span>
              <span className="text-white/40">•</span>
              <span className="truncate tracking-wider text-white/60 uppercase">
                {project.category}
              </span>
            </div>

            <motion.h3
              layout
              className={`font-bold tracking-tight text-white transition-all ${
                isExpanded
                  ? "mt-1 text-xl md:text-2xl"
                  : "truncate text-sm md:text-base font-semibold"
              }`}
            >
              {project.title}
            </motion.h3>

            {/* Pill-state subtitle hint */}
            {!isExpanded && (
              <span className="hidden truncate font-mono text-xs text-white/50 md:inline-block">
                {project.subtitle}
              </span>
            )}
          </motion.div>
        </div>

        {/* Right side controls in Pill State vs Expanded Card State */}
        <motion.div layout className="flex shrink-0 items-center gap-3">
          {!isExpanded ? (
            /* Pill state: Quick tags & expand prompt */
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-1.5 lg:flex">
                {project.stack.slice(0, 2).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-soft-glow/20 bg-soft-glow/10 px-2.5 py-0.5 font-mono text-[10px] text-soft-glow"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.05] px-3 py-1 font-mono text-[10px] text-white/70 transition-colors group-hover:border-soft-glow/50 group-hover:bg-soft-glow/20 group-hover:text-white">
                <span className="hidden sm:inline">HOVER TO</span> EXPAND
                <svg
                  viewBox="0 0 16 16"
                  className="h-3 w-3 text-soft-glow transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          ) : (
            /* Expanded state: Year + Pin/Lock indicator */
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-white/50">
                {project.year}
              </span>
              <button
                type="button"
                className="lock-toggle flex items-center gap-1 rounded-full border border-soft-glow/30 bg-soft-glow/10 px-2.5 py-1 text-[10px] text-soft-glow transition-all hover:bg-soft-glow/25"
                title={isLocked ? "Click to unlock" : "Click to pin open"}
              >
                <span>{isLocked ? "PINNED" : "COLLAPSE"}</span>
                <svg
                  viewBox="0 0 16 16"
                  className={`h-3 w-3 transition-transform ${isLocked ? "rotate-45" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 12L12 4M4 4l8 8" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Expanded Surface Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25, delay: 0.05 }}
            className="relative z-10 mt-6 border-t border-white/10 pt-6"
          >
            <p className="font-mono text-xs text-soft-glow md:text-sm">
              {project.subtitle}
            </p>

            {/* Wireframe Mockup */}
            <div className="mt-5 overflow-hidden rounded-xl">
              <WireframeMockup type={project.mockupType} isSharpened={true} />
            </div>

            {/* Engineering Telemetry & Specs */}
            <div className="mt-5 grid grid-cols-2 gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 font-mono text-xs text-white/70 sm:grid-cols-4">
              <div>
                <span className="block text-[10px] text-white/40 uppercase">Role</span>
                <span className="font-semibold text-white">{project.role}</span>
              </div>
              <div>
                <span className="block text-[10px] text-white/40 uppercase">Timeline</span>
                <span className="font-semibold text-white">{project.duration}</span>
              </div>
              <div>
                <span className="block text-[10px] text-white/40 uppercase">Architecture</span>
                <span className="font-semibold text-white">Edge-Inference</span>
              </div>
              <div>
                <span className="block text-[10px] text-white/40 uppercase">Status</span>
                <span className="font-semibold text-soft-glow">Active Mission</span>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="mt-5">
              <p className="text-xs leading-relaxed text-white/80 md:text-sm">
                {project.description}
              </p>
            </div>

            {/* Complete Toolchain Pills */}
            <div className="mt-5">
              <span className="block font-mono text-[10px] tracking-wider text-white/40 uppercase">
                Complete Toolchain
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-soft-glow/30 bg-soft-glow/10 px-3 py-1 font-mono text-[11px] font-medium text-soft-glow transition-colors hover:border-soft-glow/60 hover:bg-soft-glow/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="focus-ring flex items-center gap-2 rounded-lg border border-white/20 bg-white/[0.05] px-4 py-2 font-mono text-xs font-medium text-white transition-all hover:border-soft-glow/60 hover:bg-white/[0.1] hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  Repository
                </a>
              )}

              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="focus-ring flex items-center gap-2 rounded-lg border border-soft-glow/50 bg-soft-glow/20 px-4 py-2 font-mono text-xs font-medium text-soft-glow transition-all hover:bg-soft-glow/30"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-soft-glow opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-soft-glow" />
                  </span>
                  Live Telemetry
                </a>
              ) : project.caseStudyUrl ? (
                <a
                  href={project.caseStudyUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="focus-ring flex items-center gap-2 rounded-lg border border-soft-glow/50 bg-soft-glow/20 px-4 py-2 font-mono text-xs font-medium text-soft-glow transition-all hover:bg-soft-glow/30"
                >
                  Engineering Log
                </a>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
