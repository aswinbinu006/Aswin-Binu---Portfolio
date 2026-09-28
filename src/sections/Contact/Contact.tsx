import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Section, Label } from "@/components/ui";
import LiquidMetalButton from "@/components/ui/liquid-metal-button";
import HorizontalTextReveal from "@/components/effects/HorizontalTextReveal";
import HorizontalReveal from "@/components/effects/HorizontalReveal";

// PLACEHOLDER: Verify external links and resume asset before final deployment
const CONTACT_LINKS = [
  { label: "GitHub", href: "https://github.com/aswinbinu", isExternal: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/aswinbinu", isExternal: true },
  { label: "Resume [PDF]", href: "/resume.pdf", isExternal: true },
  { label: "Email", href: "mailto:aswinbinu@proton.me", isEmail: true },
];

/**
 * Chapter 8 — Tactical Contact & Transmission
 * Strict Palette: #020814 / #061A3A / #0F4C81 / #5FA8FF / #F7FBFF
 */
export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "0px" });
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e?: React.MouseEvent) => {
    e?.preventDefault();
    navigator.clipboard.writeText("aswinbinu@proton.me");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <Section
      id="contact"
      className="flex min-h-[75vh] flex-col items-center justify-center text-center select-none py-28 md:py-36 overflow-x-clip"
    >
      <div ref={sectionRef} className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Eyebrow Label */}
        <HorizontalReveal xOffset={40} skewAngle={-4} delay={0.05}>
          <div className="mb-4">
            <Label beacon beaconColor="bg-white/80">
              GET IN TOUCH
            </Label>
          </div>
        </HorizontalReveal>

        {/* Main Statement with Horizontal Text Reveal */}
        <div className="w-full flex flex-col items-center">
          <HorizontalTextReveal
            text="Let's Build Something Memorable"
            className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white justify-center text-center"
            highlightWords={["Build", "Memorable"]}
            highlightColor="#ffffff"
            wordClassName="text-white"
            xOffset={60}
            skewAngle={-8}
            delay={0.1}
          />

          <HorizontalReveal xOffset={50} skewAngle={-5} delay={0.2}>
            <p className="mt-4 max-w-[50ch] font-mono text-body text-white/70 leading-relaxed mx-auto">
              Open for high-impact AI/ML research collaborations, critical systems
              engineering, and architectural discussions.
            </p>
          </HorizontalReveal>
        </div>

        {/* Action Buttons with Liquid Metal & Horizontal Stagger */}
        <div
          data-no-constellation
          className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          {CONTACT_LINKS.map((link, idx) => (
            <HorizontalReveal
              key={link.label}
              index={idx}
              xOffset={40}
              skewAngle={-4}
              stagger={0.08}
              delay={0.25}
            >
              {link.isEmail ? (
                <LiquidMetalButton
                  label={copied ? "COPIED TO CLIPBOARD" : "aswinbinu@proton.me"}
                  onClick={handleCopyEmail}
                  icon={
                    copied ? (
                      <span className="text-white font-bold text-sm">✓</span>
                    ) : (
                      <span className="text-white text-sm">✉</span>
                    )
                  }
                />
              ) : (
                <LiquidMetalButton
                  label={link.label}
                  href={link.href}
                  target={link.isExternal ? "_blank" : undefined}
                  rel="noreferrer"
                />
              )}
            </HorizontalReveal>
          ))}
        </div>

        {/* Subtle HUD Transmission Telemetry Footer */}
        <motion.div
          className="mt-20 font-mono text-label tracking-widest text-white/40 uppercase flex flex-col sm:flex-row items-center gap-2 sm:gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span>© 2026 ASWIN BINU</span>
          <span className="hidden sm:inline">•</span>
          <span>NAGPUR, INDIA [LAT 21.14°N]</span>
          <span className="hidden sm:inline">•</span>
          <span>ALL SYSTEMS NOMINAL</span>
        </motion.div>
      </div>

      {/* Local Ambient Background Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] rounded-full bg-white/[0.03] blur-3xl transition-opacity duration-1000"
          style={{ opacity: isInView ? 0.7 : 0 }}
        />
      </div>
    </Section>
  );
}