import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Certificate } from '../../data/types';
import { Modal } from '../ui/Modal';

export interface CertificateModalProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!certificate) return null;

  const handleCopyId = () => {
    if (certificate.credentialId) {
      navigator.clipboard.writeText(certificate.credentialId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const imageSrc =
    certificate.id === 'google-ml-engineer'
      ? '/assets/cert-google-full.png'
      : certificate.image?.src;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Certificate Display Graphic */}
        {imageSrc && (
          <div className="relative rounded-2xl overflow-hidden border border-gold-border/60 bg-warm/30 shadow-md">
            <img
              src={imageSrc}
              alt={certificate.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Title & Issuer */}
        <div className="space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-navy">
            {certificate.title}
          </h2>
          <div className="text-sm font-medium text-gold-text">
            <span>{certificate.issuer}</span> &bull; <span>Issued: {certificate.issueDate}</span>
          </div>
        </div>

        {/* Description */}
        {certificate.description && (
          <p className="text-sm sm:text-base text-midnight/85 leading-relaxed font-normal">
            {certificate.description}
          </p>
        )}

        {/* SKILLS COVERED */}
        {certificate.skills && certificate.skills.length > 0 && (
          <div className="space-y-2.5 pt-1">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-gold-text font-semibold block">
              SKILLS COVERED
            </span>
            <div className="flex flex-wrap gap-2">
              {certificate.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3.5 py-1 rounded-full text-xs sm:text-sm font-medium bg-warm/50 text-midnight border border-gold-border/40"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Credential ID */}
        {certificate.credentialId && (
          <div className="pt-2">
            <span className="text-xs text-midnight/70 block mb-1">
              Credential ID
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-navy font-semibold">
                {certificate.credentialId}
              </span>
              <button
                type="button"
                onClick={handleCopyId}
                aria-label="Copy credential ID"
                className="p-1 rounded text-midnight/70 hover:text-navy transition-colors"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-status-green" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* Verify Credential Button */}
        <div className="pt-3">
          <a
            href={certificate.credentialUrl || 'https://www.credential.net'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-6 rounded-full bg-midnight hover:bg-navy text-ivory font-medium text-sm text-center flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span>Verify credential</span>
            <span className="text-base leading-none">→</span>
          </a>
        </div>
      </div>
    </Modal>
  );
};
