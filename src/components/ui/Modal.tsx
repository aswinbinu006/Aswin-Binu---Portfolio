import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useScrollLock } from '../../hooks/useScrollLock';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  hideDefaultHeader?: boolean;
  contentClassName?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  maxWidth = '3xl',
  hideDefaultHeader = false,
  contentClassName,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useScrollLock(isOpen);

  // Focus management & Escape key handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Trap focus inside modal
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'md:max-w-md',
    md: 'md:max-w-lg',
    lg: 'md:max-w-xl',
    xl: 'md:max-w-2xl',
    '2xl': 'md:max-w-3xl',
    '3xl': 'md:max-w-4xl',
    '4xl': 'md:max-w-5xl',
    '5xl': 'md:max-w-5xl lg:max-w-[1060px]',
    '6xl': 'md:max-w-5xl lg:max-w-[1140px] xl:max-w-[1200px]',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end md:justify-center md:items-center p-0 md:p-4 lg:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Flat translucent Midnight backdrop */}
      <div
        className="fixed inset-0 bg-midnight/60 transition-opacity animate-fadeIn"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-hidden="true"
      />

      {/* Modal / Bottom Sheet Panel */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'relative w-full z-10 bg-card border border-gold-border rounded-t-[24px] md:rounded-3xl shadow-modal flex flex-col max-h-[96dvh] md:max-h-[94dvh] overflow-hidden animate-sheetEnter md:animate-modalEnter',
          maxWidthClasses[maxWidth]
        )}
      >
        {/* Mobile decorative drag handle */}
        <div className="flex justify-center pt-2.5 pb-1 md:hidden" aria-hidden="true">
          <div className="w-12 h-1 rounded-full bg-gold/50" />
        </div>

        {/* Header - standard or seamless */}
        {!hideDefaultHeader ? (
          <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-6 py-4 bg-card border-b border-gold-border/40">
            <div>
              {subtitle && (
                <span className="block text-xs font-mono uppercase tracking-widest text-gold-text mb-1">
                  {subtitle}
                </span>
              )}
              <h2 id="modal-title" className="text-xl md:text-2xl font-heading text-navy font-bold leading-snug">
                {title}
              </h2>
            </div>
            <button
              type="button"
              data-modal-close
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label="Close dialog"
              className="inline-flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg text-midnight/80 hover:text-navy hover:bg-warm/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy active:scale-95 cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            data-modal-close
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close dialog"
            className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-5 md:right-5 z-20 inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full text-midnight/70 hover:text-navy hover:bg-warm/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy active:scale-95 cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[1.75]" />
          </button>
        )}

        {/* Scrollable Content Body with safe area padding */}
        <div className={cn(
          "flex-1 overflow-y-auto overscroll-contain text-midnight",
          contentClassName
            ? contentClassName
            : hideDefaultHeader ? "p-4 sm:p-5 md:p-6 lg:p-7" : "px-6 py-5 pb-8 md:pb-6"
        )}>
          {children}
        </div>
      </div>
    </div>
  );
};
