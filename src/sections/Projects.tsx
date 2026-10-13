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
                  {/* UI Preview / Repository Card */}
                  <div className="relative rounded-xl overflow-hidden shadow-sm border border-midnight/20 aspect-[16/10] bg-[#0c122c] mb-4">
                    {project.cardImage ? (
                      <img
                        src={project.cardImage.src}
                        alt={project.cardImage.alt || project.title}
                        className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-400 ease-out"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full p-4 sm:p-5 flex flex-col justify-between bg-gradient-to-br from-[#0c1330] via-[#090e24] to-[#060a1a] text-ivory">
                        {/* Terminal / Code Window Header */}
                        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block" />
                          </div>
                          <span className="text-[11px] font-mono text-ivory/60 truncate max-w-[180px]">
                            github.com/aswinbinu006
                          </span>
                        </div>

                        {/* Centered Repository Identifier */}
                        <div className="my-auto py-2">
                          <div className="flex items-center gap-2 text-gold mb-1">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            <span className="text-xs font-mono uppercase tracking-wider text-gold-text">GitHub Project</span>
                          </div>
                          <div className="font-heading font-bold text-lg sm:text-xl text-ivory tracking-tight group-hover:text-gold-light transition-colors">
                            {project.title}
                          </div>
                          <p className="text-xs text-ivory/70 line-clamp-1 mt-0.5 font-mono">
                            aswinbinu006/{project.githubUrl ? project.githubUrl.split('/').pop() : project.id}
                          </p>
                        </div>

                        {/* Bottom Tag Preview */}
                        <div className="flex items-center justify-between text-[11px] font-mono text-ivory/60 pt-2 border-t border-white/5">
                          <span>{project.year || '2025'}</span>
                          <span className="text-gold-light/90">View Details →</span>
                        </div>
                      </div>
                    )}
                    {project.featured && (
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold bg-gold text-navy shadow-sm">
                        Main Project
                      </span>
                    )}
                    {project.liveUrl && (
                      <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider font-medium bg-midnight/85 text-ivory backdrop-blur-xs border border-white/20 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live Demo
                      </span>
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
