import React, { useState, useRef } from "react";
import { events, type EventItem } from "@/data/events";
import EventPoster from "./EventPoster";
import EventDetailModal from "./EventDetailModal";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

/**
 * Chapter 5 — Event Archive / Exhibition Gallery
 *
 * Redesigned with cinematic scroll-driven storytelling:
 * - Asymmetrical museum wall with parallax scroll
 * - Posters reveal with staggered animations
 * - Dynamic ambient glow between columns
 * - Smooth modal transitions with spring physics
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
      className="relative z-10 mx-auto max-w-6xl px-6 py-28 md:py-36"
    >
      {/* Dynamic Scroll Parallax Background */}
      <ScrollGalleryBackground isInView={isInView} />

      {/* Editorial Header - Scroll Reveal */}
      <motion.div
        className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div>
          <motion.div
            className="mb-3 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-[#F6C343]"
              animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="font-mono text-xs tracking-widest text-slate-400 uppercase">
              Curated Records
            </span>
          </motion.div>
          <motion.h2
            className="text-3xl font-bold tracking-tight text-white md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Exhibition Wall
          </motion.h2>
          <motion.p
            className="mt-3 max-w-[65ch] font-mono text-xs leading-relaxed text-white/60 md:text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Curated archive of technical hackathons, escape-room architectures,
            and engineering symposia orchestrated across collegiate and IEEE chapters.
            Select any poster to inspect archival records.
          </motion.p>
        </div>

        <motion.div
          className="flex items-center gap-2 font-mono text-xs text-white/40"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-[#F6C343]"
            animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <span>{events.length} CURATED ARTIFACTS</span>
        </motion.div>
      </motion.div>

      {/* Asymmetrical Museum Wall Display - Parallax Columns */}
      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 items-start"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {/* Column 1 — Resting Hang */}
        <ScrollColumn
          index={0}
          delay={0.6}
          events={col1}
          onOpenEvent={handleOpenEvent}
          onKeyDown={handleKeyDown}
        />

        {/* Column 2 — Staggered Vertical Offset Hang */}
        <ScrollColumn
          index={1}
          delay={0.7}
          events={col2}
          onOpenEvent={handleOpenEvent}
          onKeyDown={handleKeyDown}
          offset="md:pt-14"
        />

        {/* Column 3 — Asymmetrical High-Hang */}
        <ScrollColumn
          index={2}
          delay={0.8}
          events={col3}
          onOpenEvent={handleOpenEvent}
          onKeyDown={handleKeyDown}
          offset="md:pt-6"
        />
      </motion.div>

      {/* Expanded Exhibition Detail Modal / Full-Screen Sheet */}
      <EventDetailModal
        event={selectedEvent}
        onClose={handleCloseEvent}
      />
    </section>
  );
}

/**
 * Dynamic parallax background for gallery section
 */
function ScrollGalleryBackground({ isInView }: { isInView: boolean }) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [0.04, 0.015]);
  const y = useTransform(scrollY, [0, 1000], [0, -30]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.08]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[-1]"
      style={{ opacity, y, scale }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      {/* Central ambient glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-gradient-to-tr from-[#F6C343]/4 via-transparent to-transparent"
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
      {/* Ambient particles */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, #F6C343 1px, transparent 1px),
            radial-gradient(circle at 80% 70%, #F6C343 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, #F6C343 0.5px, transparent 0.5px)
          `,
          backgroundSize: "120px 120px, 180px 180px, 80px 80px",
        }}
        initial={{ backgroundSize: "80px 80px, 120px 120px, 50px 50px" }}
        animate={{ backgroundSize: ["80px 80px, 120px 120px, 50px 50px", "160px 160px, 240px 240px, 100px 100px", "80px 80px, 120px 120px, 50px 50px"] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />
      {/* Museum spotlights */}
      <motion.div
        className="absolute top-20 left-1/4 -translate-x-1/2 w-[200px] h-[300px] rounded-full bg-gradient-to-b from-[#F6C343]/3 to-transparent rotate-12"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      />
      <motion.div
        className="absolute bottom-20 right-1/4 translate-x-1/2 w-[200px] h-[300px] rounded-full bg-gradient-to-t from-[#F6C343]/3 to-transparent -rotate-12"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
      />
    </motion.div>
  );
}

/**
 * Individual column with scroll parallax and staggered poster reveals
 */
interface ScrollColumnProps {
  index: number;
  delay: number;
  events: EventItem[];
  onOpenEvent: (event: EventItem) => void;
  onKeyDown: (event: EventItem, e: React.KeyboardEvent) => void;
  offset?: string;
}

function ScrollColumn({ index, delay, events, onOpenEvent, onKeyDown, offset = "" }: ScrollColumnProps) {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1000], [0, index % 2 === 0 ? -40 : 40]);
  const opacity = useTransform(scrollY, [0, 1000], [1, 0.8]);

  return (
    <motion.div
      className={`flex flex-col gap-6 md:gap-8 ${offset}`}
      style={{ y: parallaxY, opacity }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay }}
    >
      {events.map((event, i) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: delay + i * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <EventPoster
            event={event}
            onClick={() => onOpenEvent(event)}
            onKeyDown={(e) => onKeyDown(event, e)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}