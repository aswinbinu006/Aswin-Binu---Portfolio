import React, { useState, useRef, useEffect } from "react";
import { events, type EventItem } from "@/data/events";
import EventPoster from "./EventPoster";
import EventDetailModal from "./EventDetailModal";
import { Label } from "@/components/ui";
import HorizontalTextReveal from "@/components/effects/HorizontalTextReveal";
import HorizontalReveal from "@/components/effects/HorizontalReveal";
import { ChevronDown } from "lucide-react";
import { ScrollTrigger } from "@/utils/gsap";
import { scrollTo } from "@/utils/lenis";

const MOBILE_GALLERY_LIMIT = 3;

/**
 * Chapter 5 — Event Archive / Exhibition Gallery
 * Strict Palette: #020814 / #061A3A / #0F4C81 / #5FA8FF / #F7FBFF
 * Fluid clamp typography, zero horizontal overflow, accessible modal.
 */
export default function Gallery() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showAllMobile, setShowAllMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      if (!e.matches) setShowAllMobile(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

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

  const handleToggle = () => {
    if (showAllMobile) {
      if (sectionRef.current) {
        scrollTo(sectionRef.current, { offset: -20 });
      }
      setShowAllMobile(false);
      setTimeout(() => {
        if (typeof window !== "undefined") {
          ScrollTrigger.refresh();
        }
      }, 150);
    } else {
      setShowAllMobile(true);
      setTimeout(() => {
        if (typeof window !== "undefined") {
          ScrollTrigger.refresh();
        }
      }, 150);
    }
  };

  // On desktop, 3 columns:
  const col1 = [events[0], events[1]]; // Tech Escape, Stranger Tech
  const col2 = [events[2], events[3], events[4]]; // SITNovate, IEEE Workshops, Blockchain = Money
  const col3 = [events[5], events[6]]; // Vibe to Reality, Doomsday Protocol

  // On mobile, sequential list:
  const mobileEvents = isMobile && !showAllMobile ? events.slice(0, MOBILE_GALLERY_LIMIT) : events;

  return (
    <section
      ref={sectionRef}
      id="events"
      className="relative z-10 mx-auto max-w-5xl px-4 sm:px-8 md:px-12 py-16 md:py-24 overflow-x-clip select-none"
    >
      {/* Editorial Header with Horizontal Reveal */}
      <div className="mb-6 md:mb-8 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
        <div>
          <HorizontalReveal xOffset={40} skewAngle={-4} delay={0.05}>
            <div className="mb-2">
              <Label beacon beaconColor="bg-white/80">
                CHAPTER 05 // EXHIBITIONS & EVENTS
              </Label>
            </div>
          </HorizontalReveal>

          <HorizontalTextReveal
            text="Exhibition Gallery"
            className="font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white"
            highlightWords={["Exhibition", "Gallery"]}
            highlightColor="#ffffff"
            wordClassName="text-white"
            xOffset={60}
            skewAngle={-8}
            delay={0.1}
          />

          <HorizontalReveal xOffset={50} skewAngle={-5} delay={0.2}>
            <p className="mt-2 max-w-[62ch] font-mono text-xs sm:text-caption leading-relaxed text-white/70">
              Curated archive of technical hackathons, escape-room architectures,
              and engineering symposia orchestrated across collegiate and IEEE chapters.
            </p>
          </HorizontalReveal>
        </div>

        <HorizontalReveal xOffset={40} skewAngle={-4} delay={0.25}>
          <div className="flex items-center gap-2 font-mono text-[10px] text-white/70 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03]">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span>{events.length} CURATED ARTIFACTS</span>
          </div>
        </HorizontalReveal>
      </div>

      {/* Desktop 3-Column Exhibition Poster Grid (MD and UP) */}
      <div className="relative z-10 hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4.5">
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
          offset="lg:mt-3"
        />
        <ScrollColumn
          index={2}
          delay={0.12}
          events={col3}
          onOpenEvent={handleOpenEvent}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Mobile Stacked Exhibition Posters List (< MD) */}
      <div className="relative z-10 flex flex-col gap-4 md:hidden">
        {mobileEvents.map((event, i) => (
          <HorizontalReveal
            key={event.id}
            index={i}
            delay={0.04}
            stagger={0.08}
            xOffset={70}
            skewAngle={-5}
            duration={0.65}
          >
            <EventPoster
              event={event}
              onClick={() => handleOpenEvent(event)}
              onKeyDown={(e) => handleKeyDown(event, e)}
            />
          </HorizontalReveal>
        ))}
      </div>

      {/* Mobile-Only See More Button */}
      {isMobile && events.length > MOBILE_GALLERY_LIMIT && (
        <div className="mt-6 flex justify-center md:hidden">
          <button
            type="button"
            onClick={handleToggle}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/25 bg-slate-800/50 hover:bg-slate-700/60 active:scale-95 font-mono text-xs font-bold text-white shadow-glass transition-all cursor-pointer"
          >
            <span>
              {showAllMobile
                ? "SHOW LESS"
                : `SEE MORE (${events.length - MOBILE_GALLERY_LIMIT} MORE EVENTS)`}
            </span>
            <ChevronDown
              className={`size-3.5 text-white/80 transition-transform duration-300 ${
                showAllMobile ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      )}

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
    <div className={`flex flex-col gap-5 sm:gap-6 ${offset}`}>
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