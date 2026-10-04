import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { certificates, type CertificateItem } from "@/data/certificates";
import CertificateCard from "./CertificateCard";
import CertificateDetailModal from "./CertificateDetailModal";
import { Label } from "@/components/ui";
import HorizontalTextReveal from "@/components/effects/HorizontalTextReveal";
import HorizontalReveal from "@/components/effects/HorizontalReveal";

type CategoryFilter = "all" | "ai-ml" | "cloud" | "software" | "honors";

const CATEGORIES: { key: CategoryFilter; label: string }[] = [
  { key: "all", label: "ALL CREDENTIALS" },
  { key: "ai-ml", label: "AI & ML" },
  { key: "cloud", label: "CLOUD & SYSTEMS" },
  { key: "software", label: "SOFTWARE" },
  { key: "honors", label: "HONORS & BADGES" },
];

/**
 * Chapter 5 — Certifications & Badges
 * Cosmic obsidian glass aesthetic with category filter and credential inspection.
 */
export default function Certificates() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredCertificates =
    activeCategory === "all"
      ? certificates
      : certificates.filter((c) => c.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative z-10 mx-auto max-w-[1500px] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10 sm:py-14 md:py-20 overflow-x-clip select-none"
    >
      {/* Chapter Ambient Beam */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-15 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(226, 232, 240, 0.05) 0%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* Editorial Header */}
      <div className="mb-6 sm:mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <HorizontalReveal xOffset={40} skewAngle={-4} delay={0.05}>
            <div className="mb-3">
              <Label beacon beaconColor="bg-white/80">
                CHAPTER 05 // CERTIFICATIONS & BADGES
              </Label>
            </div>
          </HorizontalReveal>

          <HorizontalTextReveal
            text="Certificates & Badges"
            className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white"
            highlightWords={["Certificates", "Badges"]}
            highlightColor="#ffffff"
            wordClassName="text-white"
            xOffset={60}
            skewAngle={-8}
            delay={0.1}
          />

          <HorizontalReveal xOffset={50} skewAngle={-5} delay={0.2}>
            <p className="mt-3 max-w-[70ch] font-mono text-body leading-relaxed text-white/70">
              Verified industry credentials, competitive algorithm rankings, and specialized machine learning accreditations.
            </p>
          </HorizontalReveal>
        </div>

        <HorizontalReveal xOffset={40} skewAngle={-4} delay={0.25}>
          <div className="flex items-center gap-2 font-mono text-caption text-white/70 px-3.5 py-2 rounded-xl border border-white/10 bg-white/[0.03]">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span>{certificates.length} VERIFIED CREDENTIALS</span>
          </div>
        </HorizontalReveal>
      </div>

      {/* Category Filter Navigation Bar */}
      <div className="mb-8 flex flex-wrap gap-2.5 border-b border-white/10 pb-4 font-mono text-caption">
        {CATEGORIES.map((cat) => {
          const count =
            cat.key === "all"
              ? certificates.length
              : certificates.filter((c) => c.category === cat.key).length;
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                isActive
                  ? "border-white/40 bg-white/15 text-white font-bold shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                  : "border-white/5 bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white/80"
              }`}
            >
              {cat.label} <span className="opacity-40">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Responsive Grid Across Layout */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filteredCertificates.map((cert) => (
            <motion.div
              key={cert.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <CertificateCard
                item={cert}
                onClick={() => setSelectedCert(cert)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Inspection Modal */}
      <CertificateDetailModal
        item={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
}
