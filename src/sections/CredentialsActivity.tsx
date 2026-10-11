import React, { useState } from 'react';
import { certificates } from '../data/certificates';
import { events } from '../data/events';
import { leadershipRoles } from '../data/leadership';
import { Certificate, EventItem } from '../data/types';
import { Container } from '../components/layout/Container';
import { Reveal } from '../components/ui/Reveal';

export interface CredentialsActivityProps {
  onOpenCertificate: (cert: Certificate) => void;
  onOpenEvent: (event: EventItem) => void;
}

export const CredentialsActivity: React.FC<CredentialsActivityProps> = ({
  onOpenCertificate,
  onOpenEvent,
}) => {
  const [activeTab, setActiveTab] = useState<'certificates' | 'events'>('certificates');

  return (
    <section id="credentials" className="py-16 sm:py-20 md:py-24 border-t border-gold-border/30">
      <Container>
        {/* Header Row with Segmented Pill Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-5">
          <Reveal direction="up" duration={500}>
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-gold-text font-semibold block">
                CERTIFICATES &amp; ACTIVITY
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-heading font-bold text-navy tracking-tight leading-[1.1]">
                Certificates &amp; Activity<span className="text-gold">.</span>
              </h2>
            </div>
          </Reveal>

          {/* Segmented Pill Switcher */}
          <Reveal direction="up" delay={80} duration={500}>
            <div className="inline-flex items-center p-1 rounded-full bg-warm/50 border border-gold-border/50 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab('certificates')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === 'certificates'
                    ? 'bg-midnight text-ivory shadow-sm'
                    : 'text-midnight/80 hover:text-navy'
                }`}
              >
                Certificates
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('events')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === 'events'
                    ? 'bg-midnight text-ivory shadow-sm'
                    : 'text-midnight/80 hover:text-navy'
                }`}
              >
                Events &amp; Leadership
              </button>
            </div>
          </Reveal>
        </div>

        {/* Tab 1: Certificates View */}
        {activeTab === 'certificates' && (
          <div className="space-y-4 sm:space-y-5 animate-fadeIn">
            {certificates.map((cert, idx) => (
              <Reveal key={cert.id} direction="up" delay={idx * 60} duration={500}>
                <div
                  onClick={() => onOpenCertificate(cert)}
                  className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-5 p-5 sm:p-6 lg:p-7 rounded-2xl bg-card border border-gold-border/60 hover:border-gold hover:shadow-card-hover transition-all duration-300 cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 lg:gap-6 flex-1">
                    {/* Certificate Thumbnail */}
                    <div className="w-full sm:w-56 md:w-64 aspect-[16/10] shrink-0 rounded-xl overflow-hidden border border-gold-border/50 bg-warm/30 shadow-xs">
                      {cert.image && (
                        <img
                          src={cert.image.src}
                          alt={cert.image.alt}
                          className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-300"
                          loading="lazy"
                        />
                      )}
                    </div>

                    {/* Meta & Description */}
                    <div className="space-y-1.5">
                      <h3 className="text-xl sm:text-2xl font-heading font-bold text-navy group-hover:text-[#0a1445] transition-colors">
                        {cert.title}
                      </h3>
                      <div className="text-xs sm:text-sm font-medium text-gold-text">
                        <span>{cert.issuer}</span> &bull; <span>Issued: {cert.issueDate}</span>
                      </div>
                      <p className="text-sm text-midnight/80 leading-relaxed pt-1 max-w-2xl">
                        {cert.description}
                      </p>
                    </div>
                  </div>

                  {/* Verify Action Button */}
                  <div className="shrink-0 self-end md:self-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenCertificate(cert);
                      }}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gold/70 text-navy hover:bg-midnight hover:text-ivory hover:border-midnight transition-all duration-200 text-sm font-medium"
                    >
                      <span>Verify</span>
                      <span className="text-base leading-none">→</span>
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {/* Tab 2: Events & Leadership View */}
        {activeTab === 'events' && (
          <div className="space-y-10 sm:space-y-12 animate-fadeIn">
            {/* Leadership Section */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-gold-text font-semibold mb-4">
                LEADERSHIP
              </h3>
              <div className="space-y-4">
                {leadershipRoles.map((role) => (
                  <div
                    key={role.id}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 p-5 sm:p-6 rounded-2xl bg-card border border-gold-border/60 hover:border-gold hover:shadow-card-hover transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 sm:gap-5 md:w-1/3">
                      {role.logo ? (
                        <div className="w-14 h-14 rounded-full border border-gold/40 bg-warm/30 p-1 flex items-center justify-center shrink-0">
                          <img
                            src={role.logo}
                            alt={role.organization}
                            className="w-full h-full object-contain rounded-full"
                          />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-full border border-gold/40 bg-warm/30 flex items-center justify-center font-bold text-navy shrink-0">
                          {role.organization.slice(0, 3)}
                        </div>
                      )}
                      <div>
                        <h4 className="text-lg sm:text-xl font-heading font-bold text-navy">
                          {role.title}
                        </h4>
                        <span className="text-xs sm:text-sm text-midnight/80 block">
                          {role.organization}
                        </span>
                      </div>
                    </div>

                    <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-gold-border/40 pt-3 md:pt-0 md:pl-6 space-y-1">
                      <span className="text-xs font-mono font-semibold text-navy uppercase tracking-wider block">
                        {role.period}
                      </span>
                      <p className="text-sm text-midnight/80 leading-relaxed">
                        {role.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Events Grid Section */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-gold-text font-semibold mb-5">
                EVENTS I HELPED ORGANIZE
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 xl:gap-8">
                {events.map((evt, idx) => (
                  <Reveal key={evt.id} direction="up" delay={idx * 60} duration={500}>
                    <div
                      onClick={() => onOpenEvent(evt)}
                      className="group flex flex-col justify-between h-full bg-card rounded-2xl p-4 sm:p-5 border border-gold-border/60 hover:border-gold hover:shadow-card-hover transition-all duration-300 cursor-pointer"
                    >
                      <div>
                        {/* Event Banner */}
                        <div className="relative rounded-xl overflow-hidden shadow-xs border border-midnight/20 aspect-[16/8] bg-midnight mb-4">
                          {evt.poster && (
                            <img
                              src={evt.poster.src}
                              alt={evt.poster.alt || evt.title}
                              className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-300"
                              loading="lazy"
                            />
                          )}
                        </div>

                        {/* Title & Meta */}
                        <h4 className="text-xl font-heading font-bold text-navy group-hover:text-[#0a1445] transition-colors mb-1">
                          {evt.title}
                        </h4>
                        <span className="text-xs text-midnight/70 font-mono block mb-3">
                          {evt.meta || evt.period}
                        </span>

                        {/* Description */}
                        <p className="text-sm text-midnight/80 leading-relaxed mb-4 line-clamp-2">
                          {evt.description}
                        </p>
                      </div>

                      {/* Bottom Row: Tags + Circular Arrow */}
                      <div className="flex items-center justify-between gap-3 pt-3 border-t border-gold-border/30 mt-auto">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {evt.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-warm/50 text-midnight border border-gold-border/40"
                            >
                              {tag}
                            </span>
                          ))}
                          {evt.badge && (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold/15 text-gold-text border border-gold/30">
                              {evt.badge}
                            </span>
                          )}
                        </div>

                        <div className="w-9 h-9 rounded-full border border-gold/70 flex items-center justify-center text-midnight group-hover:bg-midnight group-hover:text-ivory group-hover:border-midnight transition-all duration-200 shrink-0">
                          <span className="text-base leading-none">→</span>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};
