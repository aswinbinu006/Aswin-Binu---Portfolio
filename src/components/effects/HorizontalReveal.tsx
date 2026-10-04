import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export interface HorizontalRevealProps {
  /** Content/Card to animate */
  children: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Initial horizontal offset in px (default: 60) */
  xOffset?: number;
  /** Skew angle in degrees (default: -6) */
  skewAngle?: number;
  /** Delay before animation starts in seconds (default: 0) */
  delay?: number;
  /** Stagger multiplier when used in a list (default: 0.08) */
  stagger?: number;
  /** Item index in a list to automatically compute stagger delay */
  index?: number;
  /** Animation duration in seconds (default: 0.7) */
  duration?: number;
  /** Margin for viewport trigger (default: "-40px") */
  viewMargin?: string;
  /** Whether animation should trigger only once (default: false for full bidirectional reverse scrolling) */
  once?: boolean;
  /** Custom easing curve (default: [0.22, 1, 0.36, 1]) */
  ease?: [number, number, number, number] | any;
}

/**
 * Responsive Bidirectional Horizontal Reveal Component:
 * - Supports forward and reverse scrolling animations (once: false)
 * - Kinetic skew, right-to-center horizontal slide, and depth blur
 * - Smoothly resets and re-reveals when scrolling up or down
 */
export default function HorizontalReveal({
  children,
  className = "",
  xOffset = 60,
  delay = 0,
  stagger = 0.06,
  index = 0,
  duration = 0.6,
  once = false,
  ease = [0.22, 1, 0.36, 1],
}: HorizontalRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once,
    margin: "0px 0px -50px 0px",
  });

  const totalDelay = delay + index * stagger;

  return (
    <div ref={containerRef} className={`overflow-visible ${className}`}>
      <motion.div
        className="w-full h-full"
        initial={{
          opacity: 0,
          x: xOffset,
        }}
        animate={
          isInView
            ? {
                opacity: 1,
                x: 0,
              }
            : {
                opacity: 0,
                x: xOffset,
              }
        }
        transition={{
          duration,
          delay: isInView ? totalDelay : 0,
          ease,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
