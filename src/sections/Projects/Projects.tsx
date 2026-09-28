import React, { useRef, useState } from "react";
import { projects, type Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectDetailModal from "./ProjectDetailModal";
import HorizontalTextReveal from "@/components/effects/HorizontalTextReveal";
import HorizontalReveal from "@/components/effects/HorizontalReveal";

export default function Projects() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleScrollLeft = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="projects"
      className="relative z-10 mx-auto py-24 md:py-36 overflow-x-clip px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-[1500px]"
    >
      <div className="w-full">
        {/* Header with Title and Carousel Arrow Controls */}
        <div className="mb-10 md:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <HorizontalReveal xOffset={40} skewAngle={-4} delay={0.05}>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-wider text-white/60">
                  CASE STUDIES & ARCHITECTURE
                </span>
              </div>
            </HorizontalReveal>

            <HorizontalTextReveal
              text="Featured Projects"
              className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white"
              highlightWords={["Featured", "Projects"]}
              highlightColor="#ffffff"
              wordClassName="text-white"
              xOffset={60}
              skewAngle={-6}
              delay={0.15}
              stagger={0.05}
            />

            <HorizontalReveal xOffset={50} skewAngle={-5} delay={0.3}>
              <p className="mt-2.5 max-w-[65ch] font-mono text-xs sm:text-sm text-white/70 leading-relaxed">
                Selected autonomous systems, edge runtime optimizations, and telemetry engineering.
              </p>
            </HorizontalReveal>
          </div>

          {/* Carousel Arrow Controls (← →) */}
          <HorizontalReveal xOffset={40} skewAngle={-4} delay={0.35}>
            <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
              <button
                type="button"
                onClick={handleScrollLeft}
                aria-label="Scroll projects left"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/15 hover:border-white/35 text-white/80 hover:text-white transition-all cursor-pointer shadow-glass"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleScrollRight}
                aria-label="Scroll projects right"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/15 hover:border-white/35 text-white/80 hover:text-white transition-all cursor-pointer shadow-glass"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </HorizontalReveal>
        </div>

        {/* Carousel Grid Track - Scrollbar Completely Hidden */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-8 pb-4 no-scrollbar scrollbar-none scroll-smooth"
        >
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start"
            >
              <HorizontalReveal
                index={idx}
                xOffset={60}
                skewAngle={-4}
                stagger={0.1}
                delay={0.1}
                duration={0.75}
              >
                <ProjectCard project={project} onSelect={handleSelectProject} />
              </HorizontalReveal>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={handleCloseModal}
      />
    </section>
  );
}