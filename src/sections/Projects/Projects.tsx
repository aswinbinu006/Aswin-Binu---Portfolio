import React, { useRef } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import HorizontalTextReveal from "@/components/effects/HorizontalTextReveal";
import HorizontalReveal from "@/components/effects/HorizontalReveal";

/**
 * Chapter 4 — Projects
 * Strict Palette: #020814 / #061A3A / #0F4C81 / #5FA8FF / #F7FBFF
 * Minimalist editorial presentation - data-driven narrative with zero overflow.
 */
export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="projects"
      className="relative z-10 mx-auto py-24 md:py-36 overflow-x-clip px-4 sm:px-6 lg:px-12"
    >
      <div ref={sectionRef} className="max-w-5xl mx-auto">
        {/* Editorial Section Heading with Horizontal Text Reveal */}
        <div className="mb-10">
          <HorizontalReveal xOffset={40} skewAngle={-4} delay={0.05}>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              <span className="font-mono text-xs text-caption uppercase tracking-wider text-white/70">
                Featured Works // Act IV
              </span>
            </div>
          </HorizontalReveal>

          <HorizontalTextReveal
            text="Selected Systems & Architectures"
            className="font-mono text-h1 font-bold tracking-tight text-white"
            highlightWords={["Systems", "Architectures"]}
            highlightColor="#ffffff"
            wordClassName="text-white"
            xOffset={60}
            skewAngle={-6}
            delay={0.15}
            stagger={0.05}
          />

          <HorizontalReveal xOffset={50} skewAngle={-5} delay={0.35}>
            <p className="mt-3 max-w-[65ch] font-mono text-caption sm:text-body leading-relaxed text-white/70">
              Production-grade autonomous frameworks, edge quantization models, and
              critical infrastructure telemetry engines.
            </p>
          </HorizontalReveal>
        </div>

        {/* Project Cards Stack - Staggered horizontal reveal with skew */}
        <div className="flex flex-col gap-6 md:gap-8">
          {projects.map((project, idx) => (
            <HorizontalReveal
              key={project.id}
              index={idx}
              xOffset={80}
              skewAngle={-5}
              stagger={0.12}
              delay={0.1}
              duration={0.8}
            >
              <ProjectCard project={project} />
            </HorizontalReveal>
          ))}
        </div>
      </div>
    </section>
  );
}