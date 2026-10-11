import React from 'react';
import { School, GraduationCap, Landmark, ChevronRight } from 'lucide-react';
import { academicRows, keySubjects } from '../data/academics';
import { Container } from '../components/layout/Container';
import { Reveal } from '../components/ui/Reveal';

export interface AcademicsProps {
  onOpenRecord: (id: 'btech' | '12th' | '10th') => void;
}

const stageIcons: Record<string, React.ReactNode> = {
  '10th': <School className="w-5 h-5 text-gold-text stroke-[1.75]" />,
  '12th': <GraduationCap className="w-5 h-5 text-gold-text stroke-[1.75]" />,
  'btech': <Landmark className="w-5 h-5 text-gold-text stroke-[1.75]" />,
};

export const Academics: React.FC<AcademicsProps> = ({ onOpenRecord }) => {
  return (
    <section id="academics" className="py-16 sm:py-20 md:py-24 border-t border-gold-border/30">
      <Container>
        {/* Section Header */}
        <Reveal direction="up" duration={500}>
          <div className="space-y-3 mb-10 md:mb-12">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-gold-text font-semibold block">
              ACADEMIC JOURNEY
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-heading font-bold text-navy tracking-tight leading-[1.1]">
              A consistent path of learning<span className="text-gold">.</span>
            </h2>
          </div>
        </Reveal>

        {/* Academic Journey Table Card */}
        <Reveal direction="up" delay={80} duration={500}>
          <div className="rounded-2xl border border-gold-border/60 bg-card overflow-hidden shadow-card mb-10">
            {/* Table Header */}
            <div className="hidden md:grid md:grid-cols-12 px-6 py-4 border-b border-gold-border/40 text-[11px] font-mono uppercase tracking-[0.18em] text-gold-text font-semibold">
              <div className="col-span-4">STAGE</div>
              <div className="col-span-4">INSTITUTION</div>
              <div className="col-span-2">YEAR</div>
              <div className="col-span-2 text-right">SCORE</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-gold-border/30">
              {academicRows.map((row) => (
                <div
                  key={row.id}
                  onClick={() => onOpenRecord(row.id)}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-0 items-start md:items-center p-6 hover:bg-warm/30 transition-colors duration-200 cursor-pointer group"
                >
                  {/* Stage with Round Icon */}
                  <div className="col-span-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-gold/40 bg-warm/40 flex items-center justify-center shrink-0">
                      {stageIcons[row.id]}
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-heading font-bold text-navy group-hover:text-[#0a1445] transition-colors">
                        {row.stage}
                      </h4>
                      <span className="text-xs text-midnight/70 block">
                        {row.stageSub}
                      </span>
                    </div>
                  </div>

                  {/* Institution */}
                  <div className="col-span-4 pl-0 md:pl-2">
                    <span className="text-base font-medium text-navy block">
                      {row.institution}
                    </span>
                    <span className="text-xs text-midnight/70 block">
                      {row.location}
                    </span>
                  </div>

                  {/* Year */}
                  <div className="col-span-2">
                    <span className="text-base font-medium text-navy block">
                      {row.year}
                    </span>
                    {row.yearSub && (
                      <span className="text-xs text-midnight/70 block">
                        {row.yearSub}
                      </span>
                    )}
                  </div>

                  {/* Score & View details */}
                  <div className="col-span-2 flex items-center justify-between md:justify-end gap-4">
                    <div className="text-left md:text-right">
                      <span className="text-lg sm:text-xl font-heading font-bold text-navy block">
                        {row.score}
                      </span>
                      {row.scoreSub && (
                        <span className="text-xs text-midnight/70 block">
                          {row.scoreSub}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-midnight/70 group-hover:text-navy transition-colors shrink-0">
                      <span className="hidden sm:inline">View details</span>
                      <ChevronRight className="w-4 h-4 text-gold-text group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Key Subjects Card */}
        <Reveal direction="up" delay={160} duration={500}>
          <div className="rounded-2xl border border-gold-border/60 bg-card p-6 sm:p-8 shadow-card">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-gold-text font-semibold block mb-4">
              KEY SUBJECTS
            </span>
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {keySubjects.map((subject) => (
                <span
                  key={subject}
                  className="px-4 py-2 rounded-xl bg-card border border-gold-border/60 text-midnight text-xs sm:text-sm font-medium hover:border-gold hover:bg-warm/40 transition-colors shadow-2xs"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
