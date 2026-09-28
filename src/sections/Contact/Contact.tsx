import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";

// PLACEHOLDER: confirm final links before shipping
const CONTACT_LINKS = [
  { label: "GitHub", href: "https://github.com/aswinbinu" },
  { label: "LinkedIn", href: "https://linkedin.com/in/aswinbinu" },
  { label: "Resume", href: "/resume.pdf" },
  { label: "Email", href: "mailto:aswinbinu@proton.me" },
];

/**
 * Chapter 6 — Contact
 *
 * Redesigned with cinematic scroll-driven storytelling:
 * - Ambient backdrop that responds to scroll
 * - Final message reveals with dramatic timing
 * - Buttons with magnetic hover and spring physics
 * - Particles that flow with scroll direction
 */
export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-150px" });

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex min-h-[75vh] flex-col items-center justify-center px-6 py-32 text-center select-none"
    >
      {/* Dynamic Scroll Parallax Background */}
      <ScrollContactBackground isInView={isInView} />

      <motion.div
        className="mb-4 flex items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-[#F6C343]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="font-mono text-xs tracking-widest text-slate-400 uppercase">
          Transmission
        </span>
      </motion.div>

      {/* Main Message - Dramatic Reveal */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <motion.p
          className="max-w-xl text-3xl font-bold tracking-tight text-white md:text-5xl"
          initial={{ opacity: 0, y: 30, letterSpacing: "-0.05em" }}
          whileInView={{ opacity: 1, y: 0, letterSpacing: "0em" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        >
          Let&apos;s build something memorable.
        </motion.p>

        <motion.p
          className="mt-4 max-w-[50ch] font-mono text-xs text-white/60 md:text-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Open for high-impact AI/ML research collaborations, critical systems
          engineering, and architectural discussions.
        </motion.p>
      </motion.div>

      {/* Restrained Action Buttons - Magnetic Spring */}
      <motion.div
        data-no-constellation
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        {CONTACT_LINKS.map((link, i) => (
          <MagneticContactButton key={link.label} link={link} index={i} />
        ))}
      </motion.div>

      {/* Footer Copyright - Subtle Reveal */}
      <motion.div
        className="mt-20 font-mono text-[11px] tracking-wider text-white/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 2 }}
      >
        ASWIN BINU © {new Date().getFullYear()} // ALL SYSTEMS NOMINAL
      </motion.div>
    </section>
  );
}

/**
 * Dynamic parallax background for contact section
 */
function ScrollContactBackground({ isInView }: { isInView: boolean }) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [0.08, 0.03]);
  const y = useTransform(scrollY, [0, 1000], [0, -40]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.1]);
  const rotation = useTransform(scrollY, [0, 1000], [0, 2]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[-1]"
      style={{ opacity, y, scale, rotate: rotation }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      {/* Central warm glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          width: "520px",
          height: "360px",
          background:
            "radial-gradient(circle, rgba(246, 195, 67, 0.12) 0%, rgba(18, 20, 26, 0.2) 50%, transparent 70%)",
        }}
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.3 }}
      />

      {/* Orbiting rings */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#F6C343]/5"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1, rotate: [0, 360] }}
        transition={{
          duration: 2,
          delay: 0.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#F6C343]/3"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1, rotate: [360, 0] }}
        transition={{
          duration: 3,
          delay: 0.7,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Flowing particles that respond to scroll */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 20%, #F6C343 1px, transparent 1px),
            radial-gradient(circle at 70% 80%, #F6C343 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, #F6C343 0.5px, transparent 0.5px)
          `,
          backgroundSize: "150px 150px, 200px 200px, 100px 100px",
        }}
        initial={{ backgroundSize: "100px 100px, 150px 150px, 80px 80px" }}
        animate={{ backgroundSize: ["100px 100px, 150px 150px, 80px 80px", "200px 200px, 300px 300px, 150px 150px", "100px 100px, 150px 150px, 80px 80px"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* Scan line effect */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(90deg, transparent 50%, rgba(246, 195, 67, 0.3) 50%)",
          backgroundSize: "4px 100%",
        }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}

/**
 * Magnetic contact button with spring physics
 */
function MagneticContactButton({ link, index }: { link: typeof CONTACT_LINKS[0]; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollY } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollY, [-100, 100], [1, 0.98]);
  const glow = useTransform(scrollY, [-100, 100], [0, 0.15]);

  return (
    <motion.a
      ref={ref}
      href={link.href}
      target={link.label !== "Email" ? "_blank" : undefined}
      rel="noreferrer"
      className="frosted-glass group relative overflow-hidden rounded-full px-6 py-2.5 font-mono text-xs font-btn text-white/80 transition-all duration-300 hover:border-[#F6C343]/50 hover:bg-white/[0.06] hover:text-white"
      style={{ scale }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <span className="relative z-10">{link.label}</span>
      {/* Subtle gold rim highlight on hover and scroll */}
      <motion.span
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{ opacity: glow, boxShadow: `inset 0 0 12px rgba(246, 195, 67, ${glow})` }}
        transition={{ duration: 0.3 }}
      />
      {/* Flowing border */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-full border border-[#F6C343]/20"
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: [1, 1.2, 1], opacity: [0, 0.3, 0] }}
        transition={{ duration: 3, delay: index * 0.3, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.a>
  );
}