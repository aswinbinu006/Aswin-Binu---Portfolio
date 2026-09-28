import React, { useRef } from "react";
import type { Project } from "@/data/projects";
import { Tag, Button } from "@/components/ui";

/**
 * Editorial Project Card
 * Strict Palette: #020814 / #061A3A / #0F4C81 / #5FA8FF / #F7FBFF
 * Focuses on project narrative + live links with glassmorphism styling.
 */
export default function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className="project-card group relative w-full overflow-hidden rounded-2xl border border-luminous-faint bg-navy-surface p-6 sm:p-8 md:p-10 backdrop-blur-xl transition-all duration-300 hover:border-cyan/40 hover:-translate-y-1 hover:shadow-stellar select-none"
    >
      {/* Corner targeting reticles */}
      <div className="corner-bracket pointer-events-none absolute inset-4 opacity-40 group-hover:opacity-100 transition-opacity" />

      {/* Project Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <Tag variant="cyan" size="sm">
              {project.category}
            </Tag>
            <span className="font-mono text-label text-luminous-dim">
              {project.duration}
            </span>
          </div>
          <h3 className="font-mono text-h2 font-bold tracking-tight text-luminous transition-colors group-hover:text-cyan-bright">
            {project.title}
          </h3>
          <p className="mt-1 font-mono text-caption text-cyan uppercase tracking-wider">
            {project.role}
          </p>
        </div>

        <div className="sm:text-right">
          <span className="font-mono text-label text-luminous-dim uppercase tracking-wider">
            {project.year}
          </span>
        </div>
      </div>

      {/* Project Description */}
      <p className="font-mono text-body leading-relaxed text-luminous-muted mt-3 mb-6 max-w-[70ch]">
        {project.description}
      </p>

      {/* Tech Stack Chips */}
      {project.stack && project.stack.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tech) => (
            <Tag key={tech} variant="outline" size="sm">
              {tech}
            </Tag>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-luminous-faint">
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
            Repository
          </Button>
        )}

        {project.demoUrl ? (
          <Button
            href={project.demoUrl}
            target="_blank"
            variant="secondary"
            size="sm"
            icon={
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
              </span>
            }
            iconPosition="left"
          >
            Live Demo
          </Button>
        ) : project.caseStudyUrl ? (
          <Button
            href={project.caseStudyUrl}
            target="_blank"
            variant="ghost"
            size="sm"
          >
            Engineering Log →
          </Button>
        ) : null}
      </div>
    </div>
  );
}