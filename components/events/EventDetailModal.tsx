"use client";

import React, { useEffect, useRef } from "react";
import { EventItem } from "@/lib/events";
import { pauseScroll, resumeScroll } from "@/lib/lenis";

interface EventDetailModalProps {
  event: EventItem | null;
  onClose: () => void;
}

/**
 * Chapter 5 — Event Archive Expanded Exhibition Detail
 *
 * Implements strict spec:
 * - Full detail: hero poster, story, role, participant info, team info, photo placeholders
 * - Keyboard accessible: Escape closes, focus returns to originating poster
 * - Outside click closes
 * - Lenis paused on open, resumed on close; body scroll locked
 * - Mobile: full-screen touch-friendly sheet
 * - All photos remain clean placeholder tiles
 */
export default function EventDetailModal({ event, onClose }: EventDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!event) return;

    // Pause Lenis smooth scrolling and lock body scroll
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
      // Resume Lenis smooth scroll and unlock body scroll
      resumeScroll();

      // Return focus to originating poster on the next animation frame
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
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      data-no-constellation
      aria-labelledby="exhibition-event-title"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overscroll-contain bg-black-void/90 p-0 md:p-10 backdrop-blur-2xl"
    >
      <div className="relative flex h-full max-h-screen md:max-h-[92vh] w-full max-w-4xl flex-col overflow-y-auto overscroll-contain rounded-none md:rounded-2xl border-0 md:border border-white/15 bg-[#040E20] p-5 shadow-[0_25px_60px_rgba(2,8,20,0.95),0_0_40px_rgba(95,168,255,0.15)] md:p-10">
        {/* Top Navigation & Close Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-soft-glow">
              EXHIBITION ARCHIVE // {event.year}
            </span>
            <span className="text-white/30">•</span>
            <span className="font-mono text-xs text-white/50 uppercase">
              ID: {event.id}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close exhibition record"
            className="focus-ring flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-4 py-1.5 font-mono text-xs text-white transition-all hover:border-soft-glow/60 hover:bg-soft-glow/20 hover:text-white"
          >
            <span>CLOSE</span>
            <span className="text-[10px] text-white/50">[ESC]</span>
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12L12 4M4 4l8 8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Main Content Layout */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Left Column: Hero Poster Plaque (4 cols) */}
          <div className="md:col-span-5">
            <div className="relative flex aspect-[3/4] w-full flex-col justify-between overflow-hidden rounded-xl border border-white/15 bg-[#061A3A]/70 p-6 shadow-[0_10px_30px_rgba(2,8,20,0.8)]">
              <span className="font-mono text-xs font-semibold text-soft-glow">
                HERO POSTER // {event.year}
              </span>

              {/* Handcrafted Graphic Motif Artwork */}
              <div className="my-auto flex items-center justify-center p-4">
                <svg viewBox="0 0 120 120" className="h-32 w-32 stroke-soft-glow fill-none" strokeWidth="1">
                  <circle cx="60" cy="60" r="50" strokeDasharray="3 3" />
                  <circle cx="60" cy="60" r="30" />
                  <circle cx="60" cy="60" r="8" fill="#5FA8FF" />
                  <line x1="60" y1="10" x2="60" y2="110" strokeDasharray="2 4" />
                  <line x1="10" y1="60" x2="110" y2="60" strokeDasharray="2 4" />
                </svg>
              </div>

              <div>
                <h4 className="text-xl font-bold tracking-tight text-white">
                  {event.title}
                </h4>
                <p className="mt-1 font-mono text-[11px] text-white/50">
                  Curated Archive Exhibition
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Specs & Placeholders (7 cols) */}
          <div className="flex flex-col justify-between md:col-span-7">
            <div>
              <h3 id="exhibition-event-title" className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                {event.title}
              </h3>
              <p className="mt-2 font-mono text-xs text-soft-glow/90 leading-relaxed md:text-sm">
                {event.summary}
              </p>

              {/* Role & Leadership Metadata */}
              <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4 font-mono text-xs text-white/70">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div>
                    <span className="block text-[10px] text-white/40 uppercase">Aswin&apos;s Role</span>
                    <span className="font-semibold text-white">{event.role}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-white/40 uppercase">Team Size</span>
                    <span className="font-semibold text-white">{event.teamSize}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-white/40 uppercase">Reach</span>
                    <span className="font-semibold text-soft-glow">{event.participantCount}</span>
                  </div>
                </div>
              </div>

              {/* Event Story Narrative */}
              <div className="mt-6">
                <span className="block font-mono text-[10px] tracking-wider text-white/40 uppercase">
                  Exhibition Narrative
                </span>
                <p className="mt-2 text-xs leading-relaxed text-white/80 md:text-sm">
                  {event.story}
                </p>
              </div>
            </div>

            {/* Photo Placeholders Gallery */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <span className="block font-mono text-[10px] tracking-wider text-white/40 uppercase">
                Photo Archive Placeholders ({event.photoPlaceholders.length} Records)
              </span>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {event.photoPlaceholders.map((photo) => (
                  <div
                    key={photo.id}
                    className="group relative flex aspect-[16/10] flex-col items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-[#061A3A]/40 p-3 text-center transition-colors hover:border-soft-glow/40"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-soft-glow/50 transition-colors group-hover:text-soft-glow" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span className="mt-2 block truncate font-mono text-[9px] text-white/60">
                      {photo.caption}
                    </span>
                    <span className="font-mono text-[8px] text-soft-glow/50">
                      // PLACEHOLDER
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
