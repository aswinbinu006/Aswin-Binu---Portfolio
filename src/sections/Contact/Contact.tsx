import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Section, Label, Button } from "@/components/ui";
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
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("aswinbinu@proton.me");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <Section
      id="contact"
      className="flex min-h-[75vh] flex-col items-center justify-center text-center select-none py-28 md:py-36 overflow-x-clip"
    >
      <div ref={sectionRef} className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Eyebrow Label */}
        <HorizontalReveal xOffset={40} skewAngle={-4} delay={0.1}>
          <div className="mb-4">
            <Label beacon beaconColor="bg-white/80">
              Transmission // Act VIII
            </Label>
          </div>
        </HorizontalReveal>

        {/* Main Statement with Horizontal Text Reveal */}
        <div className="w-full flex flex-col items-center">
          <HorizontalTextReveal
            text="Let's build something memorable."
            className="font-mono text-h1 font-bold tracking-tight text-white justify-center"
            highlightWords={["build", "memorable."]}
            highlightColor="#ffffff"
            wordClassName="text-white"
            xOffset={60}
            skewAngle={-6}
            delay={0.2}
            stagger={0.06}
          />

          <HorizontalReveal xOffset={50} skewAngle={-5} delay={0.4}>
            <p className="mt-4 max-w-[50ch] font-mono text-body text-white/70 leading-relaxed mx-auto">
              Open for high-impact AI/ML research collaborations, critical systems
              engineering, and architectural discussions.
            </p>
          </HorizontalReveal>
        </div>

        {/* Action Buttons with Horizontal Stagger */}
        <div
          data-no-constellation
          className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {CONTACT_LINKS.map((link, idx) => (
            <HorizontalReveal
              key={link.label}
              index={idx}
              xOffset={60}
              skewAngle={-6}
              stagger={0.1}
              delay={0.45}
            >
              {link.isEmail ? (
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleCopyEmail}
                  icon={
                    copied ? (
                      <span className="text-black font-bold">✓</span>
                    ) : (
                      <span className="text-black">✉</span>
                    )
                  }
                  iconPosition="left"
                >
                  {copied ? "COPIED TO CLIPBOARD" : "aswinbinu@proton.me"}
                </Button>
              ) : (
                <Button
                  variant="glass"
                  size="md"
                  href={link.href}
                  target={link.isExternal ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  {link.label}
                </Button>
              )}
            </HorizontalReveal>
          ))}
        </div>

        {/* Subtle HUD Transmission Telemetry Footer */}
        <motion.div
          className="mt-20 font-mono text-label tracking-widest text-white/40 uppercase flex flex-col sm:flex-row items-center gap-2 sm:gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
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