import React from 'react';
import { Building2, Calendar, Clock, MapPin, Users, Briefcase, FileText, Link2 } from 'lucide-react';
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
  if (!internship) return null;

  const hasCertificate = Boolean(internship.certificateUrl && isValidUrl(internship.certificateUrl));
  const hasWebsite = Boolean(internship.companyWebsiteUrl && isValidUrl(internship.companyWebsiteUrl));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      hideDefaultHeader={true}
      maxWidth="3xl"
      contentClassName="p-5 sm:p-6 md:p-8 overflow-y-auto"
    >
      <div className="flex flex-col space-y-5">
        {/* A. Internship Header */}
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 pr-8">
          {/* Logo Placeholder or Verified Image */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#dbe0e6]/70 border border-gold-border/40 flex flex-col items-center justify-center p-2.5 text-center shrink-0">
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
            {internship.isCurrent && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-300/80 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Current
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
                  TEAM SIZE
                </span>
                <span className="text-xs sm:text-sm font-medium text-midnight">
                  {internship.teamSize || '4 members'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* C. What I Worked On */}
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

        {/* D. Tech Used */}
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

        {/* E. Outcome */}
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.18em] text-gold-text font-semibold mb-1.5">
            OUTCOME
          </div>
          <p className="text-sm sm:text-[15px] text-midnight/85 leading-relaxed">
            {internship.outcome}
          </p>
        </div>

        {/* F. Action Buttons */}
        <div className="border-t border-gold-border/40 pt-4 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* View Certificate */}
            {hasCertificate ? (
              <a
                href={internship.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-navy hover:bg-[#071242] text-ivory font-medium text-sm sm:text-base shadow-sm transition-all active:scale-[0.98]"
              >
                <FileText className="w-4 h-4 stroke-[1.75]" />
                <span>View certificate</span>
                <span className="text-base">→</span>
              </a>
            ) : (
              <button
                type="button"
                disabled
                title="Certificate will be linked upon verification"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-navy/80 text-ivory/70 font-medium text-sm sm:text-base opacity-75 cursor-not-allowed"
              >
                <FileText className="w-4 h-4 stroke-[1.75]" />
                <span>View certificate</span>
                <span className="text-base">→</span>
              </button>
            )}

            {/* Company Website */}
            {hasWebsite ? (
              <a
                href={internship.companyWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gold/70 hover:bg-warm/50 text-navy font-medium text-sm sm:text-base transition-all active:scale-[0.98]"
              >
                <Link2 className="w-4 h-4 stroke-[1.75]" />
                <span>Company website</span>
                <span className="text-base">→</span>
              </a>
            ) : (
              <button
                type="button"
                disabled
                title="Company website link will be added upon verification"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gold/40 text-navy/60 font-medium text-sm sm:text-base opacity-75 cursor-not-allowed"
              >
                <Link2 className="w-4 h-4 stroke-[1.75]" />
                <span>Company website</span>
                <span className="text-base">→</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
