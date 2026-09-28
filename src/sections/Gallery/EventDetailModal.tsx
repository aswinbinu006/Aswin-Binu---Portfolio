import React, { useEffect, useRef } from "react";
import type { EventItem } from "@/data/events";
import { pauseScroll, resumeScroll } from "@/utils/lenis";

interface EventDetailModalProps {
  event: EventItem | null;
  onClose: () => void;
}

/**
 * Redesigned Exhibition Event Detail Modal:
 * - Generous spacing, clean typographic hierarchy, and responsive 2-column layout
 * - Displays actual event image with polished overlay
 * - data-lenis-prevent enables smooth native scrolling inside the modal
 * - Zero chapter numbers or redundant placeholder badges
 */
export default function EventDetailModal({ event, onClose }: EventDetailModalProps) {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!event) return;

    // Pause background smooth scroll
    pauseScroll();

    // Focus close button on mount for accessibility
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
      resumeScroll();

      // Return focus to originating poster
      if (event) {
        const targetId = `poster-${event.id}`;
        requestAnimationFrame(() => {
          const origin = document.getElementById(targetId);
          origin?.focus();
        });
      }
    };
  }, [event, onClose]);

  if (!event) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      data-no-constellation
      aria-labelledby="exhibition-event-title"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div
        ref={modalContentRef}
        data-lenis-prevent="true"
        className="relative flex flex-col w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/15 bg-[#0e1017]/95 shadow-2xl backdrop-blur-2xl text-white select-none"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#12151f]/80 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full font-mono text-[11px] font-semibold bg-white/10 text-white border border-white/15">
              {event.year}
            </span>
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase text-white/90">
              Event Details
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] hover:bg-white/15 hover:border-white/30 px-3.5 py-1.5 font-mono text-xs text-white transition-colors cursor-pointer"
          >
            <span>Close</span>
            <span className="text-[10px] text-white/50">[ESC]</span>
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 ml-0.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12L12 4M4 4l8 8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div
          data-lenis-prevent="true"
          className="overflow-y-auto overscroll-contain p-6 sm:p-8 md:p-10 space-y-8 custom-scrollbar"
        >
          {/* 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Event Poster & Tags */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-white/15 bg-[#161922] shadow-lg group">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                  <h4 className="font-mono text-lg sm:text-xl font-bold text-white drop-shadow-md">
                    {event.title}
                  </h4>
                  <p className="font-mono text-xs text-white/70 mt-1">
                    {event.year} • Exhibition Archive
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/15 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-white/80"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Title, Role Stats, Narrative & Photo Records */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Event Title & Summary */}
              <div>
                <h3 id="exhibition-event-title" className="font-mono text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {event.title}
                </h3>
                <p className="mt-3 font-mono text-sm sm:text-base text-white/85 leading-relaxed">
                  {event.summary}
                </p>
              </div>

              {/* Impact & Leadership Metadata Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex flex-col justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/50">
                    Role & Directive
                  </span>
                  <span className="mt-2 font-mono text-xs sm:text-sm font-semibold text-white leading-snug">
                    {event.role}
                  </span>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex flex-col justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/50">
                    Team Size
                  </span>
                  <span className="mt-2 font-mono text-xs sm:text-sm font-semibold text-white leading-snug">
                    {event.teamSize}
                  </span>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex flex-col justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/50">
                    Participant Reach
                  </span>
                  <span className="mt-2 font-mono text-xs sm:text-sm font-semibold text-white leading-snug">
                    {event.participantCount}
                  </span>
                </div>
              </div>

              {/* Exhibition Narrative Story */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 space-y-2.5">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/60">
                  Event Narrative & Execution
                </span>
                <p className="font-mono text-sm sm:text-base text-white/80 leading-relaxed">
                  {event.story}
                </p>
              </div>

              {/* Photo Records Gallery */}
              {event.photoPlaceholders && event.photoPlaceholders.length > 0 && (
                <div className="space-y-3 pt-2">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/60">
                    Archival Records ({event.photoPlaceholders.length} Items)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {event.photoPlaceholders.map((photo) => (
                      <div
                        key={photo.id}
                        className="flex flex-col justify-between rounded-lg border border-white/10 bg-white/[0.02] p-3 hover:border-white/25 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-2 text-white/50">
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                          <span className="font-mono text-[10px] uppercase text-white/40">Record</span>
                        </div>
                        <span className="font-mono text-xs text-white/80 leading-snug">
                          {photo.caption}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
