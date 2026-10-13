import React, { useState } from 'react';
import { User, Calendar, Clock, Lightbulb, CreditCard, Target, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project, ProjectHighlight } from '../../data/types';
import { Modal } from '../ui/Modal';

export interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const highlightIcons: React.ReactNode[] = [
  <Lightbulb className="w-5 h-5 text-gold-text stroke-[1.75]" />,
  <CreditCard className="w-5 h-5 text-gold-text stroke-[1.75]" />,
  <Target className="w-5 h-5 text-gold-text stroke-[1.75]" />,
];

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!project) return null;

  // Compile list of available screenshots / mockups (guarantee 4 thumbnails as requested)
  let screenshots = project.screenshots && project.screenshots.length > 0
    ? [...project.screenshots]
    : project.cardImage
      ? [project.cardImage]
      : [];

  // Guarantee 4 thumbnails per user request so the gallery spans full width and balances the layout
  if (screenshots.length > 0 && screenshots.length < 4) {
    while (screenshots.length < 4) {
      screenshots.push({
        ...screenshots[0],
        alt: `${project.title} Preview ${screenshots.length + 1}`,
      });
    }
  }
  if (screenshots.length > 4) {
    screenshots = screenshots.slice(0, 4);
  }

  const totalImages = screenshots.length;
  const currentImage = screenshots[activeImageIdx] || screenshots[0];

  const handlePrev = () => {
    setActiveImageIdx((prev) => (prev > 0 ? prev - 1 : totalImages - 1));
  };

  const handleNext = () => {
    setActiveImageIdx((prev) => (prev < totalImages - 1 ? prev + 1 : 0));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      hideDefaultHeader={true}
      maxWidth="6xl"
      contentClassName="p-5 sm:p-6 md:p-7 lg:p-8 overflow-y-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center">
        {/* Left Column: Vertically Centered Main Dashboard Preview & 4-Thumbnail Gallery OR GitHub Architecture Card */}
        {totalImages > 0 ? (
          <div className="lg:col-span-7 flex flex-col justify-center my-auto space-y-3 sm:space-y-3.5 w-full">
            {/* Main Dark UI Dashboard Preview with Carousel Navigation */}
            <div className="relative rounded-2xl overflow-hidden border border-midnight/30 bg-[#0a1128] aspect-[16/10] shadow-md group w-full">
              {currentImage && (
                <img
                  src={currentImage.src}
                  alt={currentImage.alt || project.title}
                  className="w-full h-full object-cover select-none"
                />
              )}

              {/* Left & Right Carousel Arrows */}
              {totalImages > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous preview"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-ivory/90 hover:bg-ivory text-midnight flex items-center justify-center shadow-md transition-all active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next preview"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-ivory/90 hover:bg-ivory text-midnight flex items-center justify-center shadow-md transition-all active:scale-95"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                  </button>
                </>
              )}
            </div>

            {/* 4 Gallery Thumbnails perfectly aligned in 4-column subgrid spanning full width */}
            <div className="grid grid-cols-4 gap-2 sm:gap-2.5 w-full pt-0.5">
              {screenshots.map((shot, idx) => {
                const isActive = activeImageIdx === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIdx(idx)}
                    aria-label={`View preview image ${idx + 1}`}
                    className={`rounded-xl overflow-hidden transition-all aspect-[16/10] bg-[#0c122c] w-full block ${
                      isActive
                        ? 'border-2 border-gold ring-2 ring-gold/40 shadow-sm scale-[1.02]'
                        : 'border border-gold-border/60 opacity-70 hover:opacity-100 hover:border-gold/50'
                    }`}
                  >
                    <img
                      src={shot.src}
                      alt={shot.alt || `Preview ${idx + 1}`}
                      className="w-full h-full object-cover select-none pointer-events-none"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="lg:col-span-7 flex flex-col justify-center my-auto w-full">
            <div className="rounded-2xl border border-midnight/30 bg-gradient-to-br from-[#0c1330] via-[#090e24] to-[#060a1a] p-6 sm:p-7 text-ivory shadow-lg flex flex-col justify-between min-h-[340px]">
              <div>
                {/* Code Window Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block" />
                    <span className="ml-2 text-xs font-mono text-ivory/60">bash - github/aswinbinu006</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-gold/15 text-gold-light border border-gold/30">
                    Source Code
                  </span>
                </div>

                {/* Terminal clone block */}
                <div className="font-mono text-xs sm:text-[13px] bg-black/40 rounded-xl p-4 border border-white/5 space-y-2 text-ivory/90 mb-5">
                  <p className="text-emerald-400 font-medium flex items-center gap-2">
                    <span className="text-gold">$</span> git clone {project.githubUrl || `https://github.com/aswinbinu006/${project.id}`}.git
                  </p>
                  <p className="text-ivory/70 flex items-center gap-2">
                    <span className="text-gold">$</span> cd {project.githubUrl ? project.githubUrl.split('/').pop() : project.id}
                  </p>
                  <p className="text-ivory/50 text-[11px] pt-1">
                    # Repository verified on GitHub &bull; Branch: main
                  </p>
                </div>
              </div>

              {/* Engineering Summary */}
              <div className="space-y-3 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ivory/60 font-mono">Architecture</span>
                  <span className="font-medium text-ivory">{project.role || 'Full Stack Engineer'}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ivory/60 font-mono">Core Technologies</span>
                  <span className="font-medium text-gold-light text-right">{project.tags.slice(0, 4).join(', ')}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ivory/60 font-mono">Status</span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active Repository
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Right Column: Project Title, Subtitle, Tags, Metadata, Highlights, Action CTAs */}
        <div className="lg:col-span-5 flex flex-col space-y-3 sm:space-y-3.5">
          {/* Title & Subtitle */}
          <div className="space-y-1 pr-6">
            <h2 className="text-3xl sm:text-4xl lg:text-[38px] font-heading font-bold text-navy leading-[1.12]">
              {project.title}
            </h2>
            <p className="text-sm sm:text-[15px] text-midnight/85 leading-relaxed font-normal">
              {project.summary}
            </p>
          </div>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-0.5 rounded-full text-xs font-medium bg-warm/50 text-midnight border border-gold-border/40"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Metadata Row: Role / Year / Duration with Icons */}
          {(project.role || project.year || project.duration) && (
            <div className="grid grid-cols-3 gap-2.5 p-2.5 sm:p-3 rounded-xl bg-warm/30 border border-gold-border/40">
              {project.role && (
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 text-gold-text stroke-[1.75] mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-gold-text font-semibold">
                      Role
                    </span>
                    <span className="font-medium text-navy text-xs sm:text-[13px] block truncate">
                      {project.role}
                    </span>
                  </div>
                </div>
              )}
              {project.year && (
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-gold-text stroke-[1.75] mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-gold-text font-semibold">
                      Year
                    </span>
                    <span className="font-medium text-navy text-xs sm:text-[13px] block truncate">
                      {project.year}
                    </span>
                  </div>
                </div>
              )}
              {project.duration && (
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-gold-text stroke-[1.75] mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-gold-text font-semibold">
                      Duration
                    </span>
                    <span className="font-medium text-navy text-xs sm:text-[13px] block truncate">
                      {project.duration}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Description Paragraph */}
          {project.description && (
            <p className="text-xs sm:text-sm text-midnight/85 leading-relaxed">
              {project.description}
            </p>
          )}

          {/* KEY HIGHLIGHTS: 3 Horizontal Cards in 3-column subgrid */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-1.5 pt-0.5">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-gold-text font-semibold block">
                KEY HIGHLIGHTS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                {project.highlights.map((hl, idx) => {
                  const isObj = typeof hl === 'object';
                  const title = isObj ? (hl as ProjectHighlight).title : hl;
                  const desc = isObj ? (hl as ProjectHighlight).description : '';
                  return (
                    <div
                      key={idx}
                      className="p-2.5 sm:p-3 rounded-xl bg-card border border-gold-border/60 flex flex-col justify-start"
                    >
                      <div className="mb-1.5">
                        {highlightIcons[idx % highlightIcons.length]}
                      </div>
                      <h4 className="font-heading font-bold text-navy text-xs sm:text-[13px] mb-0.5 leading-snug">
                        {title}
                      </h4>
                      {desc && (
                        <p className="text-[10.5px] sm:text-[11px] text-midnight/75 leading-relaxed">
                          {desc}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-1.5 flex flex-col sm:flex-row gap-3">
            {project.liveUrl ? (
              <>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 sm:py-3 px-6 rounded-full bg-midnight hover:bg-navy text-ivory font-medium text-xs sm:text-sm text-center flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <span>View Live</span>
                  <span className="text-base leading-none">→</span>
                </a>

                <a
                  href={project.githubUrl || 'https://github.com/aswinbinu006'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 sm:py-3 px-6 rounded-full border border-midnight/50 hover:border-navy text-midnight hover:text-navy font-medium text-xs sm:text-sm text-center flex items-center justify-center gap-2 transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GitHub</span>
                </a>
              </>
            ) : (
              <a
                href={project.githubUrl || 'https://github.com/aswinbinu006'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 sm:py-3 px-6 rounded-full bg-midnight hover:bg-navy text-ivory font-medium text-xs sm:text-sm text-center flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>View on GitHub</span>
                <span className="text-base leading-none">→</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
