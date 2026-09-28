import React from 'react';
import Label from './Label';

export interface SectionHeadingProps {
  label?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Standardized Section Heading with consistent hierarchy:
 * 1. Monospace Eyebrow Label with beacon
 * 2. Fluid clamp title
 * 3. Max-width narrative description
 */
export default function SectionHeading({
  label,
  title,
  description,
  action,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const isCentered = align === 'center';

  return (
    <div
      className={`mb-12 md:mb-16 flex flex-col ${
        isCentered ? 'items-center text-center' : 'items-start text-left'
      } ${action ? 'md:flex-row md:items-end md:justify-between' : ''} ${className}`}
    >
      <div className={`flex flex-col ${isCentered ? 'items-center' : 'items-start'}`}>
        {label && (
          <div className="mb-3">
            <Label>{label}</Label>
          </div>
        )}
        <h2 className="font-mono text-h1 font-bold text-luminous tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-4 max-w-[65ch] font-mono text-body text-luminous-muted leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="mt-6 md:mt-0 flex-shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}
