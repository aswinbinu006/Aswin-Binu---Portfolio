import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project, type ProjectCategory } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectDetailModal from "./ProjectDetailModal";
import { Label } from "@/components/ui";
import HorizontalTextReveal from "@/components/effects/HorizontalTextReveal";
import HorizontalReveal from "@/components/effects/HorizontalReveal";

const CATEGORIES: { key: ProjectCategory; label: string }[] = [
  { key: "all", label: "ALL PROJECTS" },
  { key: "ai-agentic", label: "AI & AGENTIC" },
  { key: "fullstack-web", label: "FULL STACK & WEB" },
  { key: "ml-datascience", label: "ML & DATA SCIENCE" },
];

/**
 * Chapter 4 — Featured Projects
 * Cosmic obsidian glass aesthetic matching Chapter 5 Certificates layout with category filtering and interactive inspection modal.
 */
export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.filterCategory === activeCategory);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative z-10 mx-auto max-w-[1500px] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-24 md:py-36 overflow-x-clip select-none"
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
      <div className="mb-10 md:mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <HorizontalReveal xOffset={40} skewAngle={-4} delay={0.05}>
            <div className="mb-3">
              <Label beacon beaconColor="bg-white/80">
                CHAPTER 04 // CASE STUDIES & ARCHITECTURE
              </Label>
            </div>
          </HorizontalReveal>

          <HorizontalTextReveal
            text="Featured Projects"
            className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white"
            highlightWords={["Featured", "Projects"]}
            highlightColor="#ffffff"
            wordClassName="text-white"
            xOffset={60}
            skewAngle={-8}
            delay={0.1}
          />

          <HorizontalReveal xOffset={50} skewAngle={-5} delay={0.2}>
            <p className="mt-3 max-w-[70ch] font-mono text-body leading-relaxed text-white/70">
              Selected autonomous systems, agentic telemetry engines, AI platforms, and predictive machine learning models.
            </p>
          </HorizontalReveal>
        </div>

        <HorizontalReveal xOffset={40} skewAngle={-4} delay={0.25}>
          <div className="flex items-center gap-2 font-mono text-caption text-white/70 px-3.5 py-2 rounded-xl border border-white/10 bg-white/[0.03]">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span>{projects.length} FEATURED PROJECTS</span>
          </div>
        </HorizontalReveal>
      </div>

      {/* Category Filter Navigation Bar */}
      <div className="mb-8 flex flex-wrap gap-2.5 border-b border-white/10 pb-4 font-mono text-caption">
        {CATEGORIES.map((cat) => {
          const count =
            cat.key === "all"
              ? projects.length
              : projects.filter((p) => p.filterCategory === cat.key).length;
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                isActive
                  ? "border-white/40 bg-white/15 text-white font-bold shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                  : "border-white/5 bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white/80"
              }`}
            >
              {cat.label} <span className="opacity-40">({count})</span>
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