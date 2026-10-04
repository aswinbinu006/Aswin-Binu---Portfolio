import React, { useEffect, useRef } from "react";
import type { CertificateItem } from "@/data/certificates";
import { pauseScroll, resumeScroll } from "@/utils/lenis";
import { X, ExternalLink, ShieldCheck, Award, CheckCircle2, FileCheck } from "lucide-react";

interface CertificateDetailModalProps {
  item: CertificateItem | null;
  onClose: () => void;
}

/**
 * Accessible Modal for inspecting full certificate details and verification hashes
 */
export default function CertificateDetailModal({
  item,
  onClose,
}: CertificateDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!item) return;

    pauseScroll();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      resumeScroll();
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      data-lenis-prevent="true"
      aria-labelledby="cert-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn touch-none"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        data-no-constellation
        data-lenis-prevent="true"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-2xl border border-white/20 bg-[#090a0f]/95 p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-all touch-auto overscroll-contain max-h-[90vh] overflow-y-auto custom-scrollbar"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close certificate inspection"
          className="absolute right-4 top-4 p-2 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all focus-ring"
        >
          <X className="size-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 font-mono text-[10px] text-white/50 mb-2">
          <FileCheck className="size-3.5 text-white/70" />
          <span>CREDENTIAL DOSSIER // AUTHENTIC RECORD</span>
        </div>

        <h2
          id="cert-modal-title"
          className="font-mono text-lg sm:text-xl font-bold text-white tracking-tight pr-8"
        >
          {item.title}
        </h2>

        <div className="mt-1 font-mono text-xs text-white/70">
          Issued by <span className="font-semibold text-white">{item.issuer}</span> • {item.issueDate}
        </div>

        {/* Certificate Image Box Inside Modal */}
        <div className="mt-3 relative w-full aspect-[16/7.5] rounded-xl overflow-hidden border border-white/10 bg-[#12151c]">
          <img
            src={item.image}
            alt={`${item.title} certificate badge preview`}
            className="w-full h-full object-cover grayscale opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-transparent to-black/20" />
          <div className="absolute bottom-2 left-3 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-black/80 border border-white/20 font-mono text-[9px] text-white">
              {item.categoryLabel}
            </span>
            <span className="px-2 py-0.5 rounded bg-white/10 border border-white/20 font-mono text-[9px] text-white">
              {item.badgeType}
            </span>
          </div>
        </div>

        {/* Verification Summary Box */}
        <div className="mt-3.5 p-3.5 rounded-xl border border-white/10 bg-white/[0.02] space-y-2 font-mono">
          <div className="flex items-center justify-between text-[11px] pb-2 border-b border-white/[0.06]">
            <span className="text-white/45">Badge Tier:</span>
            <span className="font-semibold text-white">{item.badgeType}</span>
          </div>

          <div className="flex items-center justify-between text-[11px] pb-2 border-b border-white/[0.06]">
            <span className="text-white/45">Category:</span>
            <span className="text-white/90">{item.categoryLabel}</span>
          </div>

          {item.credentialId && (
            <div className="flex items-center justify-between text-[11px] pb-2 border-b border-white/[0.06]">
              <span className="text-white/45">Credential ID:</span>
              <span className="font-mono text-white/90 text-[10px]">{item.credentialId}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-white/45">Status:</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[10px]">
              <CheckCircle2 className="size-3" />
              AUTHENTICATED & ACTIVE
            </span>
          </div>
        </div>

        {/* Curriculum & Competencies */}
        <div className="mt-4">
          <div className="font-mono text-[10px] text-white/50 uppercase tracking-wider mb-1.5">
            Verified Competencies & Skills
          </div>
          <div className="flex flex-wrap gap-1.5">
            {item.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 font-mono text-[10px] text-white/85"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="mt-3.5 font-mono text-xs text-white/70 leading-relaxed">
          {item.description}
        </p>

        {/* Action Button */}
        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
          <span className="font-mono text-[9px] text-white/40">
            Press ESC to return
          </span>

          {item.verificationUrl ? (
            <a
              href={item.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 bg-white/10 hover:bg-white hover:text-black text-white font-mono text-xs font-semibold transition-all focus-ring"
            >
              <span>VERIFY CREDENTIAL</span>
              <ExternalLink className="size-3.5" />
            </a>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-white/20 bg-white/10 text-white font-mono text-xs font-semibold hover:bg-white hover:text-black transition-all"
            >
              DISMISS
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
