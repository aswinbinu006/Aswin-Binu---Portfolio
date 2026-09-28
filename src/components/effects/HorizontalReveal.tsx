import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export interface HorizontalRevealProps {
  /** Content/Card to animate */
  children: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Initial horizontal offset from the right in px (default: 60) */
  xOffset?: number;
  /** Skew angle in degrees (default: -6) */
  skewAngle?: number;
  /** Delay before animation starts in seconds (default: 0) */
  delay?: number;
  /** Stagger multiplier when used in a list (default: 0.1) */
  stagger?: number;
  /** Item index in a list to automatically compute stagger delay */
  index?: number;
  /** Animation duration in seconds (default: 0.75) */
  duration?: number;
  /** Margin for viewport trigger (default: "-60px") */
  viewMargin?: string;
  /** Custom easing curve (default: [0.22, 1, 0.36, 1]) */
  ease?: [number, number, number, number] | any;
}

/**
 * HorizontalReveal Component
 *
 * Provides horizontal reveal animation with scroll-triggered animations.
 * Features smooth transitions, opacity changes, and skew effects as cards
 * and UI elements move from right to center.
 */
export default function HorizontalReveal({
  children,
  className = "",
  xOffset = 60,
  skewAngle = -6,
  delay = 0,
  stagger = 0.1,
  index = 0,
  duration = 0.75,
  viewMargin = "-60px",
  ease = [0.22, 1, 0.36, 1],
}: HorizontalRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: viewMargin as any,
  });

  const totalDelay = delay + index * stagger;

  return (
    <div
      ref={containerRef}
      className={`overflow-visible ${className}`}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="w-full h-full"
        style={{
          transformOrigin: "center left",
          transformStyle: "preserve-3d",
        }}
        initial={{
          opacity: 0,
          x: xOffset,
          skewX: skewAngle,
          filter: "blur(6px)",
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
                filter: "blur(6px)",
              }
        }
        transition={{
          duration,
          delay: totalDelay,
          ease,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
