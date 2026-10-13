import React, { useState } from 'react';
import { Building2, Calendar, Clock, MapPin, Users, Briefcase, FileText, Link2, Award, ExternalLink } from 'lucide-react';
import { Internship } from '../../data/types';
import { Modal } from '../ui/Modal';
import { isValidUrl } from '../../lib/url';

export interface InternshipModalProps {
  internship: Internship | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InternshipModal: React.FC<InternshipModalProps> = ({
  internship,
  isOpen,
  onClose,
}) => {
  const [activeDoc, setActiveDoc] = useState<'cert' | 'lor'>('cert');

  if (!internship) return null;

  const hasCertificate = Boolean(internship.certificateUrl && isValidUrl(internship.certificateUrl));
  const hasLOR = Boolean(internship.letterOfRecommendationUrl && isValidUrl(internship.letterOfRecommendationUrl));
  const hasWebsite = Boolean(internship.companyWebsiteUrl && isValidUrl(internship.companyWebsiteUrl));

  const hasDocuments = Boolean(internship.certificateImage || internship.letterOfRecommendationImage);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      hideDefaultHeader={true}
      maxWidth="3xl"
      contentClassName="p-5 sm:p-6 md:p-8 overflow-y-auto max-h-[90vh]"
    >
      <div className="flex flex-col space-y-6">
        {/* A. Internship Header */}
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 pr-8">
          {/* Logo Placeholder or Verified Image */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#dbe0e6]/70 border border-gold-border/40 flex flex-col items-center justify-center p-2.5 text-center shrink-0 shadow-xs">
            {internship.logo ? (
              <img
                src={internship.logo.src}
                alt={internship.company}
                className="w-full h-full object-contain select-none"
              />
            ) : (
              <>
                <Building2 className="w-8 h-8 sm:w-9 sm:h-9 text-navy/70 stroke-[1.5] mb-1" />
                <span className="text-[11px] font-mono text-midnight/70 font-medium truncate max-w-full">
                  {internship.company}
                </span>
              </>
            )}
          </div>

          {/* Role & Company Details */}
          <div className="flex-1 min-w-0">
            {internship.isCurrent ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-300/80 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Current
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-warm/70 text-navy border border-gold-border/60 mb-2">
                <Award className="w-3.5 h-3.5 text-gold-text" />
                Verified Completion &amp; Recommendation
              </span>
            )}
            <h3
              id="modal-title"
              className="text-2xl sm:text-[28px] font-heading font-bold text-navy leading-tight mb-1"
            >
              {internship.role}
            </h3>
            <div className="text-base font-serif text-gold-text mb-2 font-medium">
              {internship.company}
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-midnight/70 font-mono">
              <Calendar className="w-3.5 h-3.5 text-gold-text" />
              <span>{internship.period}</span>
            </div>
          </div>
        </div>

        {/* B. Metadata Row with Icons and Hairlines */}
        <div className="border-t border-b border-gold-border/40 py-3.5 my-1">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:divide-x md:divide-gold-border/40">
            {/* Duration */}
            <div className="flex items-start gap-2.5 md:px-2">
              <Clock className="w-4 h-4 text-gold-text mt-0.5 shrink-0" />
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-wider text-gold-text font-semibold">
                  DURATION
                </span>
                <span className="text-xs sm:text-sm font-medium text-midnight">
                  {internship.duration}
                </span>
              </div>
            </div>

            {/* Work Mode */}
            <div className="flex items-start gap-2.5 md:px-3">
              <Briefcase className="w-4 h-4 text-gold-text mt-0.5 shrink-0" />
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-wider text-gold-text font-semibold">
                  WORK MODE
                </span>
                <span className="text-xs sm:text-sm font-medium text-midnight">
                  {internship.workMode}
                </span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-2.5 md:px-3">
              <MapPin className="w-4 h-4 text-gold-text mt-0.5 shrink-0" />
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-wider text-gold-text font-semibold">
                  LOCATION
                </span>
                <span className="text-xs sm:text-sm font-medium text-midnight">
                  {internship.location || 'Remote'}
                </span>
              </div>
            </div>

            {/* Team Size */}
            <div className="flex items-start gap-2.5 md:px-3">
              <Users className="w-4 h-4 text-gold-text mt-0.5 shrink-0" />
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-wider text-gold-text font-semibold">
                  TEAM / ID
                </span>
                <span className="text-xs sm:text-sm font-medium text-midnight">
                  {internship.teamSize || 'AI/ML Team'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* C. Verified Documents Showcase (Certificate & Letter of Recommendation) */}
        {hasDocuments && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-gold-text font-semibold">
                VERIFIED CREDENTIALS &amp; DOCUMENTS
              </div>
              <div className="inline-flex items-center p-0.5 rounded-full bg-warm/60 border border-gold-border/50 text-xs font-medium">
                {internship.certificateImage && (
                  <button
                    type="button"
                    onClick={() => setActiveDoc('cert')}
                    className={`px-3 py-1 rounded-full transition-all ${
                      activeDoc === 'cert'
                        ? 'bg-midnight text-ivory shadow-xs'
                        : 'text-midnight/70 hover:text-navy'
                    }`}
                  >
                    Certificate of Internship
                  </button>
                )}
                {internship.letterOfRecommendationImage && (
                  <button
                    type="button"
                    onClick={() => setActiveDoc('lor')}
                    className={`px-3 py-1 rounded-full transition-all ${
                      activeDoc === 'lor'
                        ? 'bg-midnight text-ivory shadow-xs'
                        : 'text-midnight/70 hover:text-navy'
                    }`}
                  >
                    Letter of Recommendation
                  </button>
                )}
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-gold-border/60 bg-warm/30 shadow-sm max-h-[360px] flex items-center justify-center">
              {activeDoc === 'cert' && internship.certificateImage && (
                <div className="relative group w-full flex justify-center">
                  <img
                    src={internship.certificateImage.src}
                    alt={internship.certificateImage.alt}
                    className="max-h-[350px] w-auto object-contain py-2"
                  />
                  {hasCertificate && (
                    <a
                      href={internship.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-midnight/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-ivory font-medium text-sm gap-2 backdrop-blur-[2px]"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Open Full Certificate PDF</span>
                    </a>
                  )}
                </div>
              )}

              {activeDoc === 'lor' && internship.letterOfRecommendationImage && (
                <div className="relative group w-full flex justify-center">
                  <img
                    src={internship.letterOfRecommendationImage.src}
                    alt={internship.letterOfRecommendationImage.alt}
                    className="max-h-[350px] w-auto object-contain py-2"
                  />
                  {hasLOR && (
                    <a
                      href={internship.letterOfRecommendationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-midnight/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-ivory font-medium text-sm gap-2 backdrop-blur-[2px]"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Open Full Letter of Recommendation PDF</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* D. What I Worked On */}
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.18em] text-gold-text font-semibold mb-3">
            WHAT I WORKED ON
          </div>
          <ul className="space-y-2.5">
            {internship.bullets.map((bullet, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-sm sm:text-[15px] text-midnight/85 leading-relaxed"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* E. Tech Used */}
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.18em] text-gold-text font-semibold mb-2.5">
            TECH USED
          </div>
          <div className="flex flex-wrap gap-2">
            {internship.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg text-xs sm:text-sm font-medium bg-card border border-gold-border/60 text-midnight"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* F. Outcome */}
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.18em] text-gold-text font-semibold mb-1.5">
            OUTCOME
          </div>
          <p className="text-sm sm:text-[15px] text-midnight/85 leading-relaxed">
            {internship.outcome}
          </p>
        </div>

        {/* G. Action Buttons */}
        <div className="border-t border-gold-border/40 pt-4 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* View Certificate */}
            {hasCertificate ? (
              <a
                href={internship.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy hover:bg-[#071242] text-ivory font-medium text-xs sm:text-sm shadow-sm transition-all active:scale-[0.98]"
              >
                <FileText className="w-4 h-4 stroke-[1.75]" />
                <span>Certificate PDF</span>
                <span className="text-sm">→</span>
              </a>
            ) : null}

            {/* Letter of Recommendation */}
            {hasLOR ? (
              <a
                href={internship.letterOfRecommendationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-midnight hover:bg-navy text-ivory font-medium text-xs sm:text-sm shadow-sm transition-all active:scale-[0.98]"
              >
                <Award className="w-4 h-4 stroke-[1.75]" />
                <span>Recommendation Letter</span>
                <span className="text-sm">→</span>
              </a>
            ) : null}

            {/* Company Website */}
            {hasWebsite ? (
              <a
                href={internship.companyWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gold/70 hover:bg-warm/50 text-navy font-medium text-xs sm:text-sm transition-all active:scale-[0.98]"
              >
                <Link2 className="w-4 h-4 stroke-[1.75]" />
                <span>Company Website</span>
                <span className="text-sm">→</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </Modal>
  );
};
