import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project, type ProjectType } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectDetailModal from "./ProjectDetailModal";
import { Label } from "@/components/ui";
import HorizontalTextReveal from "@/components/effects/HorizontalTextReveal";
import HorizontalReveal from "@/components/effects/HorizontalReveal";

const CATEGORIES: { key: ProjectType; label: string }[] = [
  { key: "project", label: "PROJECTS" },
  { key: "lab-work", label: "LAB WORK" },
];

/**
 * Chapter 4 — Featured Projects & Lab Work
 * Cosmic obsidian glass aesthetic matching Chapter 5 Certificates layout with Projects and Lab Work tabs.
 */
export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectType>("project");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredProjects = projects.filter((p) => p.type === activeCategory);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative z-10 mx-auto max-w-[1500px] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10 sm:py-14 md:py-20 lg:py-24 overflow-x-clip select-none"
    >
      {/* Chapter Ambient Beam */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-15 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(226, 232, 240, 0.05) 0%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* Editorial Header */}
      <div className="mb-6 sm:mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <HorizontalReveal xOffset={40} skewAngle={-4} delay={0.05}>
            <div className="mb-3">
              <Label beacon beaconColor="bg-white/80">
                CHAPTER 03 // PROJECTS & LAB WORK
              </Label>
            </div>
          </HorizontalReveal>

          <HorizontalTextReveal
            text="Projects & Lab Work"
            className="font-mono text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white"
            highlightWords={["Projects", "Lab", "Work"]}
            highlightColor="#ffffff"
            wordClassName="text-white"
            xOffset={60}
            skewAngle={-8}
            delay={0.1}
          />

          <HorizontalReveal xOffset={50} skewAngle={-5} delay={0.2}>
            <p className="mt-2.5 max-w-[70ch] font-mono text-xs sm:text-sm leading-relaxed text-white/80 font-medium">
              Selected autonomous full-stack systems, multi-agent AI platforms, predictive ML pipelines, and core computer science laboratory implementations.
            </p>
          </HorizontalReveal>
        </div>

        <HorizontalReveal xOffset={40} skewAngle={-4} delay={0.25}>
          <div className="flex items-center gap-2 font-mono text-caption text-white/90 px-3.5 py-2 rounded-xl border border-white/20 bg-slate-800/25 backdrop-blur-md shadow-glass">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span className="tracking-wider uppercase font-bold text-xs">{projects.length} TOTAL REPOSITORIES</span>
          </div>
        </HorizontalReveal>
      </div>

      {/* Category Filter Navigation Bar: Exactly 2 Options */}
      <div className="mb-6 flex flex-wrap gap-2.5 border-b border-white/10 pb-4 font-mono text-caption">
        {CATEGORIES.map((cat) => {
          const count = projects.filter((p) => p.type === cat.key).length;
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-lg border text-xs sm:text-sm font-semibold tracking-wider transition-all cursor-pointer ${
                isActive
                  ? "border-white/40 bg-white/15 text-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                  : "border-white/15 bg-white/[0.05] text-white/70 hover:border-white/30 hover:bg-white/[0.1] hover:text-white"
              }`}
            >
              {cat.label} <span className="opacity-60 ml-1">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Responsive Grid Across Layout */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard
                project={project}
                onSelect={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Interactive Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}