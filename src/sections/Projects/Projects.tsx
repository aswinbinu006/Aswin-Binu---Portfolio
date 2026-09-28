import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

/**
 * Chapter 4 — Projects
 *
 * Minimalist editorial presentation - mockup-free, data-driven.
 * - Short project intros + GitHub + Live Demo links
 * - No wireframe mockups or engineering specs (keeps focus on narrative)
 * - Easy to add new projects - just add entry to data/projects.ts
 * - Intentionally themed differently from rest of website
 * - Each card feels "one-of-a-kind" with unique content
 */
export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative z-10 mx-auto max-w-5xl px-6 py-28"
    >
      {/* Editorial Header */}
      <motion.div
        className="mb-12 flex flex-col items-start gap-3"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#F6C343]" />
          <span className="font-mono text-xs tracking-widest text-slate-500 uppercase">
            Featured Works
          </span>
        </motion.div>
        <motion.h2
          className="text-3xl md:text-5xl font-bold tracking-tight text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Selected Systems & Architectures
        </motion.h2>
        <motion.p
          className="mt-2 max-w-[65ch] text-xs sm:text-sm leading-relaxed text-slate-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Curated collection of machine learning deployments, edge inference
          runtimes, and critical mission telemetry architectures.
        </motion.p>
      </motion.div>

      {/* Projects Grid - No Mockups, Pure Editorial */}
      <motion.div
        className="flex flex-col gap-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </section>
  );
}