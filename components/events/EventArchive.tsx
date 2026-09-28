"use client";

import React, { useState } from "react";
import { events, EventItem } from "@/lib/events";
import EventPoster from "./EventPoster";
import EventDetailModal from "./EventDetailModal";

/**
 * Chapter 5 — Event Archive
 *
 * Implements strict spec:
 * - Museum exhibition wall aesthetic with intentional editorial imbalance
 * - Avoids uniform card grids and equal poster spacing
 * - Posters display title and year ONLY in rest state
 * - Smooth modal/sheet transition for expanded detail
 * - Accessible keyboard navigation and Lenis scroll synchronization
 */
export default function EventArchive() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const col1 = [events[0], events[1]]; // Tech Escape, Stranger Tech
  const col2 = [events[2], events[3], events[4]]; // SITNovate, IEEE Workshops, Blockchain = Money
  const col3 = [events[5], events[6]]; // Vibe to Reality, Doomsday Protocol

  const handleOpenEvent = (event: EventItem) => {
    setSelectedEvent(event);
  };

  const handleCloseEvent = () => {
    setSelectedEvent(null);
  };

  const handleKeyDown = (event: EventItem, e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpenEvent(event);
    }
  };

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-28 md:py-36">
      {/* Editorial Chapter Header */}
      <div className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="mb-3 inline-block font-mono text-xs tracking-widest text-soft-glow/80 uppercase">
            Chapter 05 // Event Archive
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Exhibition Wall
          </h2>
          <p className="mt-3 max-w-[65ch] font-mono text-xs leading-relaxed text-white/60 md:text-sm">
            Curated archive of technical hackathons, escape-room architectures,
            and engineering symposia orchestrated across collegiate and IEEE chapters.
            Select any poster to inspect archival records.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-white/40">
          <span className="h-1.5 w-1.5 rounded-full bg-soft-glow" />
          <span>7 CURATED ARTIFACTS</span>
        </div>
      </div>

      {/* Asymmetrical Museum Wall Display */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 items-start">
        {/* Column 1 — Resting Hang */}
        <div className="flex flex-col gap-6 md:gap-8">
          {col1.map((event) => (
            <EventPoster
              key={event.id}
              event={event}
              onClick={() => handleOpenEvent(event)}
              onKeyDown={(e) => handleKeyDown(event, e)}
            />
          ))}
        </div>

        {/* Column 2 — Staggered Vertical Offset Hang */}
        <div className="flex flex-col gap-6 md:gap-8 md:pt-14">
          {col2.map((event) => (
            <EventPoster
              key={event.id}
              event={event}
              onClick={() => handleOpenEvent(event)}
              onKeyDown={(e) => handleKeyDown(event, e)}
            />
          ))}
        </div>

        {/* Column 3 — Asymmetrical High-Hang */}
        <div className="flex flex-col gap-6 md:gap-8 md:pt-6">
          {col3.map((event) => (
            <EventPoster
              key={event.id}
              event={event}
              onClick={() => handleOpenEvent(event)}
              onKeyDown={(e) => handleKeyDown(event, e)}
            />
          ))}
        </div>
      </div>

      {/* Expanded Exhibition Detail Modal / Full-Screen Sheet */}
      <EventDetailModal
        event={selectedEvent}
        onClose={handleCloseEvent}
      />
    </section>
  );
}
