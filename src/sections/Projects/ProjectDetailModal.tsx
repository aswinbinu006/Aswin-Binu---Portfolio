import React, { useEffect, useRef } from "react";
import type { Project } from "@/data/projects";
import { pauseScroll, resumeScroll } from "@/utils/lenis";
import { Button, Tag } from "@/components/ui";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    pauseScroll();

    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
      resumeScroll();

      if (project) {
        const targetId = `project-card-${project.id}`;
        requestAnimationFrame(() => {
          const origin = document.getElementById(targetId);
          origin?.focus();
        });
      }
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      data-no-constellation
      aria-labelledby="project-modal-title"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div
        ref={modalContentRef}
        data-lenis-prevent="true"
        className="relative flex flex-col w-full max-w-3xl max-h-[88vh] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c] shadow-[0_25px_70px_rgba(0,0,0,0.9)] text-white select-none"
      >
        {/* Top Sticky Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-white/10 bg-[#0e0e11] shrink-0">
          <div className="flex items-center gap-2.5">
            <Tag variant="gold" size="sm">
              {project.category}
            </Tag>
            <span className="font-mono text-[11px] text-white/50">
              {project.year} • {project.duration}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/10 hover:border-white/25 px-3 py-1 font-mono text-xs text-white transition-colors cursor-pointer"
          >
            <span>Close</span>
            <span className="text-[10px] text-white/40">[ESC]</span>
            <svg viewBox="0 0 16 16" className="h-3 w-3 ml-0.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12L12 4M4 4l8 8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div
          data-lenis-prevent="true"
          className="overflow-y-auto overscroll-contain p-5 sm:p-7 md:p-8 space-y-6 custom-scrollbar"
        >
          {/* Title & Role */}
          <div>
            <h3
              id="project-modal-title"
              className="font-mono text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug"
            >
              {project.title}
            </h3>
            <p className="mt-1.5 font-mono text-xs font-semibold text-accent-gold uppercase tracking-wider">
              {project.role}
            </p>
            <p className="mt-2.5 font-mono text-xs sm:text-sm text-white/80 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Key Metrics Grid */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-[#131316] p-3.5 flex flex-col justify-between"
                >
                  <span className="font-mono text-[9px] uppercase tracking-wider text-white/45">
                    {metric.label}
                  </span>
                  <span className="mt-1.5 font-mono text-xs sm:text-sm font-bold text-white">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Full Engineering Narrative */}
          {project.fullStory && (
            <div className="rounded-xl border border-white/10 bg-[#131316] p-4 sm:p-5 space-y-2">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-white/50">
                Engineering Blueprint & Narrative
              </span>
              <p className="font-mono text-xs sm:text-sm text-white/75 leading-relaxed">
                {project.fullStory}
              </p>
            </div>
          )}

          {/* Architecture Highlights */}
          {project.architectureHighlights && project.architectureHighlights.length > 0 && (
            <div className="space-y-2.5">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-white/50">
                Architectural Highlights
              </span>
              <ul className="space-y-2 font-mono text-xs text-white/75">
                {project.architectureHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-accent-gold text-xs mt-0.5">✦</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          {project.stack && project.stack.length > 0 && (
            <div className="space-y-2.5 pt-1">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-white/50">
                Technology Stack
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-white/10 bg-[#131316] px-2.5 py-1 font-mono text-[11px] text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-white/10">
            {project.githubUrl && (
              <Button
                href={project.githubUrl}
                target="_blank"
                variant="glass"
                size="sm"
                icon={
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                }
                iconPosition="left"
              >
                GitHub Repository
              </Button>
            )}

            {project.demoUrl && (
              <Button
                href={project.demoUrl}
                target="_blank"
                variant="secondary"
                size="sm"
                icon={
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                  </span>
                }
                iconPosition="left"
              >
                Launch Demo
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
