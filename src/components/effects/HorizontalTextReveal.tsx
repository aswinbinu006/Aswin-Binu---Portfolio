import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export interface HorizontalTextRevealProps {
  /** The text string to animate */
  text: string;
  /** Additional container CSS classes */
  className?: string;
  /** Additional CSS classes for each individual word */
  wordClassName?: string;
  /** Words that should receive special highlight coloring */
  highlightWords?: string[];
  /** Highlight color for highlighted words (default: #ffffff) */
  highlightColor?: string;
  /** Initial horizontal offset in pixels from the right (default: 60) */
  xOffset?: number;
  /** Initial skew angle in degrees (default: -10) */
  skewAngle?: number;
  /** Delay before animation starts in seconds (default: 0) */
  delay?: number;
  /** Stagger between each word in seconds (default: 0.035) */
  stagger?: number;
  /** Animation duration per word in seconds (default: 0.65) */
  duration?: number;
  /** Whether animation should trigger only once (default: false for bidirectional reverse scrolling) */
  once?: boolean;
  /** Mode: 'viewport' (plays on scroll into view) or 'scrub' (tied to scroll position) */
  mode?: "viewport" | "scrub";
}

/**
 * Bidirectional Horizontal Text Reveal Component
 * - Staggered kinetic word reveal on forward and reverse scrolling
 * - once: false ensures text re-animates smoothly when scrolling back
 */
export default function HorizontalTextReveal({
  text,
  className = "",
  wordClassName = "",
  highlightWords = [],
  highlightColor = "#ffffff",
  xOffset = 60,
  skewAngle = -10,
  delay = 0,
  stagger = 0.035,
  duration = 0.65,
  once = false,
  mode = "viewport",
}: HorizontalTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once, margin: "-40px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "center 55%"],
  });

  const words = text.split(" ");

  const isHighlighted = (word: string) => {
    const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()?'"’]/g, "").toLowerCase();
    return highlightWords.some(
      (hw) => hw.toLowerCase() === cleanWord || word.toLowerCase().includes(hw.toLowerCase())
    );
  };

  if (mode === "scrub") {
    return (
      <div
        ref={containerRef}
        className={`flex flex-wrap items-baseline gap-x-[0.3em] gap-y-1 ${className}`}
        style={{ perspective: "1000px" }}
      >
        {words.map((word, index) => {
          const step = 1 / words.length;
          const start = Math.max(0, (index - 1) * step * 0.6);
          const end = Math.min(1, start + step * 1.4);

          return (
            <ScrubWord
              key={`${word}-${index}`}
              word={word}
              progress={scrollYProgress}
              range={[start, end]}
              xOffset={xOffset}
              skewAngle={skewAngle}
              isHighlight={isHighlighted(word)}
              highlightColor={highlightColor}
              className={wordClassName}
            />
          );
        })}
      </div>
    );
  }

  // Viewport-triggered mode
  return (
    <div
      ref={containerRef}
      className={`flex flex-wrap items-baseline gap-x-[0.3em] gap-y-1 overflow-visible ${className}`}
      style={{ perspective: "1000px" }}
    >
      {words.map((word, index) => {
        const highlighted = isHighlighted(word);

        return (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-visible"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.span
              className={`inline-block ${wordClassName}`}
              style={{
                color: highlighted ? highlightColor : undefined,
                transformOrigin: "center left",
              }}
              initial={{
                opacity: 0,
                x: xOffset,
                skewX: skewAngle,
                filter: "blur(4px)",
              }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      x: 0,
                      skewX: 0,
                      filter: "blur(0px)",
                    }
                  : {
                      opacity: 0,
                      x: xOffset,
                      skewX: skewAngle,
                      filter: "blur(4px)",
                    }
              }
              transition={{
                duration,
                delay: isInView ? delay + index * stagger : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </div>
  );
}

function ScrubWord({
  word,
  progress,
  range,
  xOffset,
  skewAngle,
  isHighlight,
  highlightColor,
  className,
}: {
  word: string;
  progress: any;
  range: [number, number];
  xOffset: number;
  skewAngle: number;
  isHighlight: boolean;
  highlightColor: string;
  className: string;
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  const x = useTransform(progress, range, [xOffset, 0]);
  const skewX = useTransform(progress, range, [skewAngle, 0]);

  return (
    <span className="inline-block overflow-visible">
      <motion.span
        className={`inline-block ${className}`}
        style={{
          opacity,
          x,
          skewX,
          color: isHighlight ? highlightColor : undefined,
          transformOrigin: "center left",
        }}
      >
        {word}
      </motion.span>
    </span>
  );
}
