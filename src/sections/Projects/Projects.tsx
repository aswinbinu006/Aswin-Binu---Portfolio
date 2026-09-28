import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { Section, SectionHeading } from "@/components/ui";

/**
 * Chapter 4 — Projects
 * Strict Palette: #020814 / #061A3A / #0F4C81 / #5FA8FF / #F7FBFF
 * Minimalist editorial presentation - data-driven narrative with zero overflow.
 */
export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <Section id="projects" className="py-24 md:py-36">
      <div ref={sectionRef} className="max-w-5xl mx-auto">
        {/* Editorial Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading
            label="Featured Works // Act IV"
            title="Selected Systems & Architectures"
            description="Production-grade autonomous frameworks, edge quantization models, and critical infrastructure telemetry engines."
          />
        </motion.div>

        {/* Project Cards Stack */}
        <div className="flex flex-col gap-6 md:gap-8 mt-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: idx * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}