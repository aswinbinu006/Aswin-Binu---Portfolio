import React from 'react';
import { Building2, Calendar, Clock, MapPin } from 'lucide-react';
import { Internship } from '../data/types';
import { internships } from '../data/internships';
import { Container } from '../components/layout/Container';
import { Reveal } from '../components/ui/Reveal';

export interface InternshipsProps {
  onOpenInternship: (internship: Internship) => void;
}

export const Internships: React.FC<InternshipsProps> = ({ onOpenInternship }) => {
  return (
    <section id="internships" className="py-16 sm:py-20 md:py-24 border-t border-gold-border/30">
      <Container>
        {/* Section Header */}
        <Reveal direction="up" duration={500}>
          <div className="space-y-3 mb-10 md:mb-12">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-gold-text font-semibold block">
              INTERNSHIPS
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-heading font-bold text-navy tracking-tight leading-[1.1]">
              Internship experience<span className="text-gold">.</span>
            </h2>
            <p className="text-base sm:text-lg text-midnight/80 max-w-2xl leading-relaxed">
              Real-world experience where I apply my skills, solve practical problems, and contribute to meaningful projects.
            </p>
          </div>
        </Reveal>

        {/* Stack of Wide Editorial Internship Cards */}
        <div className="space-y-6 sm:space-y-7 md:space-y-8">
          {internships.map((internship, idx) => (
            <Reveal key={internship.id} direction="up" delay={idx * 80} duration={500}>
              <div
                onClick={() => onOpenInternship(internship)}
                className="group bg-card rounded-2xl md:rounded-[22px] border border-gold-border/60 hover:border-gold hover:shadow-card-hover transition-all duration-300 p-5 sm:p-6 md:p-7 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 cursor-pointer"
              >
                {/* Left: Neutral Company Logo Placeholder */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl bg-[#dbe0e6]/70 border border-gold-border/30 flex flex-col items-center justify-center p-3 text-center shrink-0 group-hover:scale-[1.02] transition-transform">
                  {internship.logo ? (
                    <img
                      src={internship.logo.src}
                      alt={internship.company}
                      className="w-full h-full object-contain select-none"
                    />
                  ) : (
                    <>
                      <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-navy/60 stroke-[1.5] mb-1.5" />
                      <span className="text-xs font-mono text-midnight/70 font-medium truncate max-w-full">
                        {internship.company}
                      </span>
                    </>
                  )}
                </div>

                {/* Center / Content Details */}
                <div className="flex-1 min-w-0 space-y-3">
                  {/* Role Title, Status & Company */}
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-1">
                      <h3 className="text-2xl sm:text-[26px] font-heading font-bold text-navy group-hover:text-[#0a1445] transition-colors leading-tight">
                        {internship.role}
                      </h3>
                      {internship.isCurrent && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-300/80">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          Current
                        </span>
                      )}
                    </div>
                    <div className="text-sm sm:text-base font-serif text-gold-text font-medium">
                      {internship.company}
                    </div>
                  </div>

                  {/* Metadata Row: Dates, Duration, Work Mode */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-midnight/80">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-warm/50 border border-gold-border/30">
                      <Calendar className="w-3.5 h-3.5 text-gold-text" />
                      <span>{internship.period}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-warm/50 border border-gold-border/30">
                      <Clock className="w-3.5 h-3.5 text-gold-text" />
                      <span>{internship.duration}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-warm/50 border border-gold-border/30">
                      <MapPin className="w-3.5 h-3.5 text-gold-text" />
                      <span>{internship.workMode}</span>
                    </span>
                  </div>

                  {/* Concise Description */}
                  <p className="text-sm text-midnight/80 leading-relaxed max-w-3xl">
                    {internship.shortDescription}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap items-center gap-2 pt-0.5">
                    {internship.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-card border border-gold-border/60 text-midnight"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Divider & View Details Button */}
                <div className="md:border-l md:border-gold-border/40 md:pl-6 md:self-stretch flex items-center justify-end shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-gold-border/30">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenInternship(internship);
                    }}
                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-gold/70 text-navy font-medium text-sm hover:border-gold hover:bg-warm/60 group-hover:bg-warm/40 transition-all duration-200 cursor-pointer"
                  >
                    <span>View details</span>
                    <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
