import React from 'react';
import { projects } from '../data/projects';
import { Project } from '../data/types';
import { Container } from '../components/layout/Container';
import { Reveal } from '../components/ui/Reveal';

export interface ProjectsProps {
  onOpenProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenProject }) => {
  return (
    <section id="projects" className="py-16 sm:py-20 md:py-24 border-t border-gold-border/30">
      <Container>
        {/* Section Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-4">
          <Reveal direction="up" duration={500}>
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-gold-text font-semibold block">
                PROJECTS
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-heading font-bold text-navy tracking-tight leading-[1.1]">
                Projects that solve real problems
                <span className="text-gold">.</span>
              </h2>
            </div>
          </Reveal>

          <Reveal direction="up" delay={100} duration={500}>
            <a
              href="https://github.com/aswinbinu006"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-navy hover:text-gold-text transition-colors group self-start md:self-auto"
            >
              <span>View all projects</span>
              <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </Reveal>
        </div>

        {/* 3x2 Expansive Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 xl:gap-8">
          {projects.map((project, idx) => (
            <Reveal key={project.id} direction="up" delay={idx * 60} duration={500}>
              <div
                onClick={() => onOpenProject(project)}
                className="group flex flex-col justify-between h-full bg-card rounded-2xl p-4 sm:p-5 border border-gold-border/60 hover:border-gold hover:shadow-card-hover transition-all duration-300 cursor-pointer"
              >
                <div>
                  {/* Dark UI Mockup Preview */}
                  <div className="relative rounded-xl overflow-hidden shadow-sm border border-midnight/20 aspect-[16/10] bg-[#0c122c] mb-4">
                    {project.cardImage ? (
                      <img
                        src={project.cardImage.src}
                        alt={project.cardImage.alt || project.title}
                        className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-400 ease-out"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-heading text-xl font-bold text-ivory">
                        {project.title}
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-navy group-hover:text-[#0a1445] transition-colors mb-2">
                    {project.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-sm text-midnight/80 leading-relaxed mb-4 line-clamp-2">
                    {project.summary}
                  </p>
                </div>

                {/* Bottom Row: Tags & Circular Gold Arrow Button */}
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-gold-border/30 mt-auto">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-warm/50 text-midnight border border-gold-border/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="w-9 h-9 rounded-full border border-gold/70 flex items-center justify-center text-midnight group-hover:bg-midnight group-hover:text-ivory group-hover:border-midnight transition-all duration-200 shrink-0">
                    <span className="text-base leading-none">→</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
