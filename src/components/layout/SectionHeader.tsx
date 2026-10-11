import React from 'react';
import { cn } from '../../lib/utils';

export interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  description,
  align = 'left',
  className,
}) => {
  return (
    <div
      className={cn(
        'mb-8 md:mb-12',
        align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-3xl',
        className
      )}
    >
      <div className="inline-block text-xs md:text-sm font-mono uppercase tracking-widest text-gold-text font-semibold mb-2">
        {label}
      </div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-navy font-bold tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base md:text-lg text-midnight/80 font-normal leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
