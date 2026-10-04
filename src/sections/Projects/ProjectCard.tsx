import React from "react";
import type { Project } from "@/data/projects";
import { Bot, Cpu, Database, ExternalLink, Globe, Layers, Sparkles, Terminal } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

/**
 * Compact Cosmic Obsidian & Silver Project Card matching Chapter 05 CertificateCard layout
 */
export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const getBadgeStyle = (type: Project["badgeType"]) => {
    switch (type) {
      case "Live System":
        return "border-emerald-400/30 bg-emerald-400/10 text-emerald-200";
      case "Agentic Engine":
        return "border-purple-400/30 bg-purple-400/10 text-purple-200";
      case "Full Stack":
        return "border-sky-400/30 bg-sky-400/10 text-sky-200";
      case "GovTech AI":
        return "border-indigo-400/30 bg-indigo-400/10 text-indigo-200";
      case "ML Benchmark":
        return "border-amber-400/30 bg-amber-400/10 text-amber-200";
      case "Predictive Model":
        return "border-rose-400/30 bg-rose-400/10 text-rose-200";
      case "Lab Work":
        return "border-teal-400/30 bg-teal-400/10 text-teal-200";
      default:
        return "border-white/20 bg-white/5 text-white/80";
    }
  };

  const getCategoryIcon = () => {
    if (project.type === "lab-work") {
      return <Terminal className="size-3 text-teal-300" />;
    }
    switch (project.badgeType) {
      case "Agentic Engine":
      case "Live System":
        return <Bot className="size-3 text-purple-300" />;
      case "Full Stack":
      case "GovTech AI":
        return <Globe className="size-3 text-sky-300" />;
      case "ML Benchmark":
      case "Predictive Model":
        return <Cpu className="size-3 text-amber-300" />;
      default:
        return <Sparkles className="size-3 text-white" />;
    }
  };

  return (
    <div
      data-no-constellation
      id={`project-card-${project.id}`}
      tabIndex={0}
      role="button"
      aria-label={`Inspect ${project.title}`}
      onClick={() => onSelect(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(project);
        }
      }}
      className="group relative flex flex-col justify-between rounded-xl border border-white/20 bg-[#0c121e]/90 p-3.5 transition-all duration-300 hover:border-white/40 hover:bg-[#111a2b]/95 hover:shadow-silver focus-ring cursor-pointer select-none h-full"
    >
      <div>
        {/* Card Header: Role/Category, Badge Type & Year */}
        <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-white/15 font-mono text-[9px]">
          <span className="font-semibold text-white/70 uppercase truncate max-w-[18ch]">
            {project.role}
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className={`px-2 py-0.5 rounded-full border font-semibold tracking-wider ${getBadgeStyle(
                project.badgeType
              )}`}
            >
              {project.badgeType}
            </span>
            <span className="text-white/50">{project.year}</span>
          </div>
        </div>

        {/* Embedded Project Preview Box Inside the Card */}
        <div className="mt-2.5 relative w-full aspect-[16/8.5] rounded-lg overflow-hidden border border-white/10 bg-slate-900/60">
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c121e] via-transparent to-black/25" />

          {/* Watermark Category Pill & Icon Overlay */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
            <span className="px-2 py-0.5 rounded bg-black/80 border border-white/15 font-mono text-[8.5px] text-white font-medium truncate max-w-[22ch]">
              {project.category}
            </span>
            <span className="p-1 rounded-full bg-black/80 border border-white/20 text-white">
              {getCategoryIcon()}
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="mt-2.5">
          <h3 className="font-mono text-sm font-bold text-white group-hover:text-silver-bright transition-colors line-clamp-1">
            {project.title}
          </h3>

          <p className="mt-1 font-mono text-[11px] leading-relaxed text-white/80 font-medium line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] font-mono text-[8.5px] text-white/70"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="px-1.5 py-0.5 rounded bg-white/[0.02] border border-white/[0.04] font-mono text-[8.5px] text-white/40">
              +{project.stack.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Status & Links */}
      <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between font-mono text-[9px] text-white/40">
        <div className="flex items-center gap-2">
          {project.demoUrl ? (
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span>LIVE DEMO</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-white/50">
              <Terminal className="size-2.5 text-white/60" />
              <span>OPEN SOURCE</span>
            </span>
          )}

          {project.contributors && project.contributors.length > 1 && (
            <span className="px-1.5 py-0.2 rounded bg-purple-500/10 border border-purple-400/20 text-purple-300 font-mono text-[8px] flex items-center gap-1">
              <span>👥 Team</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <div className="flex items-center gap-1.5">
              <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[8px] font-semibold">
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                <span>CI PASSING</span>
              </span>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub source and CI for ${project.title}`}
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded border border-white/10 bg-white/[0.04] hover:bg-white/20 text-white/70 hover:text-white transition-all flex items-center gap-1"
                title="GitHub Repo & CI status"
              >
                <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 fill-current">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            </div>
          )}
          <div className="flex items-center gap-1 text-white/60 group-hover:text-white transition-colors shrink-0">
            <span>INSPECT</span>
            <ExternalLink className="size-2.5" />
          </div>
        </div>
      </div>
    </div>
  );
}