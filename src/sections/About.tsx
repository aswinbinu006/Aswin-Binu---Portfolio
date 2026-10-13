import React from 'react';
import { MapPin, GraduationCap, Laptop } from 'lucide-react';
import { siteConfig } from '../data/site';
import { projects } from '../data/projects';
import { Project } from '../data/types';
import { Container } from '../components/layout/Container';
import { Reveal } from '../components/ui/Reveal';

export interface AboutProps {
  onOpenProject: (project: Project) => void;
}

export const About: React.FC<AboutProps> = ({ onOpenProject }) => {
  const featuredProject = projects.find((p) => p.featured) || projects[0];

  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 border-t border-gold-border/30">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">
          {/* Left Column: Bio & 3 Fact Rows */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6 md:space-y-7">
            <Reveal direction="up" duration={500}>
              <div className="space-y-3">
                <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-gold-text font-semibold block">
                  ABOUT ME
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-heading font-bold text-navy tracking-tight leading-[1.1]">
                  A student, builder and problem solver
                  <span className="text-gold">.</span>
                </h2>
              </div>
            </Reveal>

            <Reveal direction="up" delay={120} duration={500}>
              <div className="space-y-4 text-base sm:text-lg text-midnight/85 leading-relaxed font-normal">
                <p>
                  {siteConfig.aboutParagraphs[0]}
                </p>
                <p>
                  {siteConfig.aboutParagraphs[1]}
                </p>
              </div>
            </Reveal>

            {/* 3 Iconic Fact Rows with Dividers */}
            <Reveal direction="up" delay={200} duration={500}>
              <div className="pt-2 border-t border-gold-border/40 divide-y divide-gold-border/30">
                {/* 1. Location */}
                <div className="py-3.5 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full border border-gold/40 bg-warm/40 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-gold-text stroke-[1.75]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-gold-text font-semibold block">
                      LOCATION
                    </span>
                    <span className="text-base sm:text-lg font-medium text-navy">
                      {siteConfig.locationFact || "Nagpur, India"}
                    </span>
                  </div>
                </div>

                {/* 2. Education */}
                <div className="py-3.5 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full border border-gold/40 bg-warm/40 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5 text-gold-text stroke-[1.75]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-gold-text font-semibold block">
                      EDUCATION
                    </span>
                    <span className="text-base sm:text-lg font-medium text-navy">
                      {siteConfig.educationFact}
                    </span>
                  </div>
                </div>

                {/* 3. Focus Area */}
                <div className="py-3.5 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full border border-gold/40 bg-warm/40 flex items-center justify-center shrink-0">
                    <Laptop className="w-5 h-5 text-gold-text stroke-[1.75]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-gold-text font-semibold block">
                      FOCUS AREA
                    </span>
                    <span className="text-base sm:text-lg font-medium text-navy">
                      {siteConfig.focusFact}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Featured Project Card */}
          <div className="lg:col-span-6 xl:col-span-6">
            <Reveal direction="scale" delay={150} duration={600}>
              <div className="rounded-2xl bg-card border border-gold-border/70 p-5 sm:p-7 shadow-card hover:shadow-card-hover transition-all duration-300">
                {/* Header row: FEATURED PROJECT + 3 Dots */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-[0.18em] text-gold-text font-semibold">
                    FEATURED PROJECT
                  </span>
                  <div className="flex items-center gap-1.5 text-navy/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  </div>
                </div>

                {/* CareerPilot UI Dashboard Preview */}
                <div className="relative rounded-xl overflow-hidden shadow-md border border-midnight/30 mb-5 bg-[#0a1128] aspect-[16/10]">
                  <img
                    src={featuredProject.cardImage?.src || "/assets/careerpilot-live.png"}
                    alt={featuredProject.cardImage?.alt || `${featuredProject.title} Live Platform Showcase`}
                    width={650}
                    height={420}
                    className="w-full h-full object-cover select-none transform hover:scale-[1.01] transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Title and Description */}
                <div className="space-y-2 mb-5">
                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-navy">
                    {featuredProject.title}
                  </h3>
                  <p className="text-midnight/80 text-sm sm:text-base leading-relaxed">
                    {featuredProject.summary}
                  </p>
                </div>

                {/* Tags and Action Button */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-gold-border/30">
                  <div className="flex flex-wrap items-center gap-2">
                    {featuredProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-warm/50 text-midnight border border-gold-border/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenProject(featuredProject)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-midnight text-ivory hover:bg-navy transition-all duration-200 text-sm font-medium shadow-sm hover:shadow active:scale-95"
                  >
                    <span>View project</span>
                    <span className="text-base leading-none">→</span>
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};
