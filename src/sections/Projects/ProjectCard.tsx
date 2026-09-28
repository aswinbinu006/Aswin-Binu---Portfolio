import React, { useRef, useEffect } from "react";
import type { Project } from "@/data/projects";
import { gsap } from "@/utils/gsap";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

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
    gsap.to(cardRef.current, { y: -4, duration: 0.25, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { y: 0, duration: 0.35, ease: "power2.out" });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(project);
    }
  };

  return (
    <div
      ref={cardRef}
      id={`project-card-${project.id}`}
      tabIndex={0}
      role="button"
      aria-label={`Inspect ${project.title}`}
      onClick={() => onSelect(project)}
      onKeyDown={handleKeyDown}
      className="project-card group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0a0a0c]/90 p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-[#121215]/95 hover:shadow-silver focus-ring select-none cursor-pointer h-full"
    >
      <div>
        {/* Top Visual Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-[#111114] mb-5">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Top Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-mono text-[10px] font-semibold tracking-wider uppercase bg-black/60 text-white/90 border border-white/15 backdrop-blur-md">
              {project.category}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 font-mono text-[11px] text-white/70">
            <span>{project.role}</span>
          </div>
        </div>

        {/* Project Title */}
        <h3 className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-accent-gold leading-snug">
          {project.title}
        </h3>

        {/* Project Description */}
        <p className="mt-2.5 font-mono text-xs sm:text-sm text-white/70 leading-relaxed line-clamp-2">
          {project.description}
        </p>
      </div>

      {/* Read More Link */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-white/80 group-hover:text-white transition-colors">
        <span className="font-semibold tracking-wider uppercase text-[11px]">
          Read more
        </span>
        <span className="transform group-hover:translate-x-1.5 transition-transform text-accent-gold">
          →
        </span>
      </div>
    </div>
  );
}