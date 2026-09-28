import React, { useState, useRef } from "react";
import { events, type EventItem } from "@/data/events";
import EventPoster from "./EventPoster";
import EventDetailModal from "./EventDetailModal";
import { useInView } from "framer-motion";
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
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
      className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-24 md:py-36 overflow-x-clip"
    >
      {/* Dynamic Ambient Background */}
      <ScrollGalleryBackground isInView={isInView} />

      {/* Editorial Header with Horizontal Reveal */}
      <div className="mb-12 md:mb-16 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <HorizontalReveal xOffset={40} skewAngle={-4} delay={0.05}>
            <div className="mb-3">
              <Label beacon beaconColor="bg-white/80">
                Curated Records // Act V
              </Label>
            </div>
          </HorizontalReveal>

          <HorizontalTextReveal
            text="Exhibition Wall"
            className="font-mono text-h1 font-bold tracking-tight text-white"
            highlightWords={["Exhibition", "Wall"]}
            highlightColor="#ffffff"
            wordClassName="text-white"
            xOffset={60}
            skewAngle={-6}
            delay={0.15}
            stagger={0.05}
          />

          <HorizontalReveal xOffset={50} skewAngle={-5} delay={0.3}>
            <p className="mt-3 max-w-[65ch] font-mono text-body leading-relaxed text-white/70">
              Curated archive of technical hackathons, escape-room architectures,
              and engineering symposia orchestrated across collegiate and IEEE chapters.
              Select any poster to inspect archival records.
            </p>
          </HorizontalReveal>
        </div>

        <HorizontalReveal xOffset={40} skewAngle={-4} delay={0.4}>
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
          delay={0.1}
          events={col1}
          onOpenEvent={handleOpenEvent}
          onKeyDown={handleKeyDown}
        />
        <ScrollColumn
          index={1}
          delay={0.25}
          events={col2}
          onOpenEvent={handleOpenEvent}
          onKeyDown={handleKeyDown}
          offset="lg:mt-8"
        />
        <ScrollColumn
          index={2}
          delay={0.4}
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
 * Ambient background for gallery section (constrained within section)
 */
function ScrollGalleryBackground({ isInView }: { isInView: boolean }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#12151c]/40 to-transparent transition-opacity duration-1000"
        style={{ opacity: isInView ? 1 : 0 }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full bg-white/[0.03] blur-3xl transition-opacity duration-1000"
        style={{ opacity: isInView ? 0.6 : 0 }}
      />
    </div>
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