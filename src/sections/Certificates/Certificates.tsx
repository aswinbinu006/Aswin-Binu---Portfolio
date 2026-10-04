import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { certificates, type CertificateItem } from "@/data/certificates";
import CertificateCard from "./CertificateCard";
import CertificateDetailModal from "./CertificateDetailModal";
import { Label } from "@/components/ui";
import HorizontalTextReveal from "@/components/effects/HorizontalTextReveal";
import HorizontalReveal from "@/components/effects/HorizontalReveal";
import { ChevronDown } from "lucide-react";
import { ScrollTrigger } from "@/utils/gsap";
import { scrollTo } from "@/utils/lenis";

const MOBILE_CERTIFICATES_LIMIT = 3;

/**
 * Chapter 5 — Certifications & Badges
 * Cosmic obsidian glass aesthetic with clean grid and credential inspection modal.
 */
export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showAllMobile, setShowAllMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const displayedCertificates =
    isMobile && !showAllMobile
      ? certificates.slice(0, MOBILE_CERTIFICATES_LIMIT)
      : certificates;

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
            className="font-mono text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white"
            highlightWords={["Certificates", "Badges"]}
            highlightColor="#ffffff"
            wordClassName="text-white"
            xOffset={60}
            skewAngle={-8}
            delay={0.1}
          />

          <HorizontalReveal xOffset={50} skewAngle={-5} delay={0.2}>
            <p className="mt-2.5 max-w-[70ch] font-mono text-xs sm:text-sm leading-relaxed text-white/80 font-medium">
              Verified industry credentials, competitive algorithm rankings, and specialized machine learning accreditations.
            </p>
          </HorizontalReveal>
        </div>

        <HorizontalReveal xOffset={40} delay={0.25}>
          <div className="flex items-center gap-2 font-mono text-caption text-white/90 px-3.5 py-2 rounded-xl border border-white/20 bg-[#0c121e]/90 shadow-glass">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span className="tracking-wider uppercase font-bold text-xs">{certificates.length} VERIFIED CREDENTIALS</span>
          </div>
        </HorizontalReveal>
      </div>

      {/* Responsive Grid Across Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        <AnimatePresence mode="popLayout">
          {displayedCertificates.map((cert, idx) => (
            <HorizontalReveal
              key={cert.id}
              index={idx}
              xOffset={60}
              skewAngle={-5}
              stagger={0.06}
              delay={0.1}
              className="h-full"
            >
              <CertificateCard
                item={cert}
                onClick={() => setSelectedCert(cert)}
              />
            </HorizontalReveal>
          ))}
        </AnimatePresence>
      </div>

      {/* Mobile-Only See More Button */}
      {isMobile && certificates.length > MOBILE_CERTIFICATES_LIMIT && (
        <div className="mt-6 flex justify-center md:hidden">
          <button
            type="button"
            onClick={handleToggle}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/25 bg-slate-800/50 hover:bg-slate-700/60 active:scale-95 font-mono text-xs font-bold text-white shadow-glass transition-all cursor-pointer"
          >
            <span>
              {showAllMobile
                ? "SHOW LESS"
                : `SEE MORE (${certificates.length - MOBILE_CERTIFICATES_LIMIT} MORE)`}
            </span>
            <ChevronDown
              className={`size-3.5 text-white/80 transition-transform duration-300 ${
                showAllMobile ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      )}

      {/* Inspection Modal */}
      <CertificateDetailModal
        item={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
}
