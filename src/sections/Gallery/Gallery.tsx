import React, { useState, useRef } from "react";
import { events, type EventItem } from "@/data/events";
import EventPoster from "./EventPoster";
import EventDetailModal from "./EventDetailModal";
import { Label } from "@/components/ui";
import HorizontalTextReveal from "@/components/effects/HorizontalTextReveal";
import HorizontalReveal from "@/components/effects/HorizontalReveal";

/**
 * Chapter 5 — Event Archive / Exhibition Gallery
 * Strict Palette: #020814 / #061A3A / #0F4C81 / #5FA8FF / #F7FBFF
 * Fluid clamp typography, zero horizontal overflow, accessible modal.
 */
export default function Gallery() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section
      ref={sectionRef}
      id="events"
      className="relative z-10 mx-auto max-w-[1500px] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-24 md:py-36 overflow-x-clip"
    >
      {/* Editorial Header with Horizontal Reveal */}
      <div className="mb-10 md:mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <HorizontalReveal xOffset={40} skewAngle={-4} delay={0.05}>
            <div className="mb-3">
              <Label beacon beaconColor="bg-white/80">
                EXHIBITIONS & EVENTS
              </Label>
            </div>
          </HorizontalReveal>

          <HorizontalTextReveal
            text="Exhibition Gallery"
            className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white"
            highlightWords={["Exhibition", "Gallery"]}
            highlightColor="#ffffff"
            wordClassName="text-white"
            xOffset={60}
            skewAngle={-8}
            delay={0.1}
          />

          <HorizontalReveal xOffset={50} skewAngle={-5} delay={0.2}>
            <p className="mt-3 max-w-[70ch] font-mono text-body leading-relaxed text-white/70">
              Curated archive of technical hackathons, escape-room architectures,
              and engineering symposia orchestrated across collegiate and IEEE chapters.
              Select any poster to inspect archival records.
            </p>
          </HorizontalReveal>
        </div>

        <HorizontalReveal xOffset={40} skewAngle={-4} delay={0.25}>
          <div className="flex items-center gap-2 font-mono text-caption text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span>{events.length} CURATED ARTIFACTS</span>
          </div>
        </HorizontalReveal>
      </div>

      {/* 3-Column Exhibition Poster Grid with Staggered Horizontal Reveal */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <ScrollColumn
          index={0}
          delay={0.04}
          events={col1}
          onOpenEvent={handleOpenEvent}
          onKeyDown={handleKeyDown}
        />
        <ScrollColumn
          index={1}
          delay={0.08}
          events={col2}
          onOpenEvent={handleOpenEvent}
          onKeyDown={handleKeyDown}
          offset="lg:mt-8"
        />
        <ScrollColumn
          index={2}
          delay={0.12}
          events={col3}
          onOpenEvent={handleOpenEvent}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Expanded Exhibition Detail Modal */}
      <EventDetailModal
        event={selectedEvent}
        onClose={handleCloseEvent}
      />
    </section>
  );
}

/**
 * Individual column with staggered horizontal poster reveals
 */
interface ScrollColumnProps {
  index: number;
  delay: number;
  events: EventItem[];
  onOpenEvent: (event: EventItem) => void;
  onKeyDown: (event: EventItem, e: React.KeyboardEvent) => void;
  offset?: string;
}

function ScrollColumn({ delay, events, onOpenEvent, onKeyDown, offset = "" }: ScrollColumnProps) {
  return (
    <div className={`flex flex-col gap-6 md:gap-8 ${offset}`}>
      {events.map((event, i) => (
        <HorizontalReveal
          key={event.id}
          index={i}
          delay={delay}
          stagger={0.15}
          xOffset={70}
          skewAngle={-5}
          duration={0.75}
        >
          <EventPoster
            event={event}
            onClick={() => onOpenEvent(event)}
            onKeyDown={(e) => onKeyDown(event, e)}
          />
        </HorizontalReveal>
      ))}
    </div>
  );
}