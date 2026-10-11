import React from 'react';
import {
  Code,
  Brain,
  Monitor,
  BarChart2,
  Database,
  Settings,
} from 'lucide-react';
import { skillGroups } from '../data/skills';
import { Container } from '../components/layout/Container';
import { Reveal } from '../components/ui/Reveal';
import { TechIcon } from '../components/ui/TechIcon';

const categoryBadges: Record<string, React.ReactNode> = {
  'programming-languages': <Code className="w-5 h-5 text-gold-text stroke-[1.75]" />,
  'machine-learning-ai': <Brain className="w-5 h-5 text-gold-text stroke-[1.75]" />,
  'web-development': <Monitor className="w-5 h-5 text-gold-text stroke-[1.75]" />,
  'data-visualization': <BarChart2 className="w-5 h-5 text-gold-text stroke-[1.75]" />,
  'databases-cloud': <Database className="w-5 h-5 text-gold-text stroke-[1.75]" />,
  'tools-others': <Settings className="w-5 h-5 text-gold-text stroke-[1.75]" />,
};

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-16 sm:py-20 md:py-24 border-t border-gold-border/30">
      <Container>
        {/* Section Header */}
        <Reveal direction="up" duration={500}>
          <div className="space-y-3 mb-10 md:mb-12">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-gold-text font-semibold block">
              SKILLS &amp; TOOLS
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-heading font-bold text-navy tracking-tight leading-[1.1]">
              Tools I work with<span className="text-gold">.</span>
            </h2>
          </div>
        </Reveal>

        {/* 3x2 Expansive Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 xl:gap-8">
          {skillGroups.map((group, idx) => (
            <Reveal key={group.id} direction="up" delay={idx * 60} duration={500}>
              <div className="flex flex-col justify-between h-full bg-card rounded-2xl p-6 sm:p-7 border border-gold-border/60 hover:border-gold hover:shadow-card-hover transition-all duration-300">
                {/* Top: Round Badge + Title + Description */}
                <div>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full border border-gold/40 bg-warm/40 flex items-center justify-center shrink-0">
                      {categoryBadges[group.id] || <Code className="w-5 h-5 text-gold-text" />}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-heading font-bold text-navy">
                        {group.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-midnight/75 mt-1 leading-relaxed">
                        {group.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom: Row of Brand Icons with Labels */}
                <div className="pt-4 border-t border-gold-border/30">
                  <div className="grid grid-cols-5 gap-2 text-center items-end">
                    {group.tools?.map((tool) => (
                      <div
                        key={tool.name}
                        className="flex flex-col items-center justify-end group/tool"
                      >
                        <div className="w-10 h-10 flex items-center justify-center transition-transform duration-200 group-hover/tool:scale-110">
                          <TechIcon name={tool.icon || tool.name} className="w-8 h-8" />
                        </div>
                        <span className="text-[11px] font-medium text-midnight/80 mt-1.5 leading-tight truncate w-full">
                          {tool.name}
                        </span>
                      </div>
                    ))}
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
