import React from 'react';
import { cn } from '../../lib/utils';

export interface ChipProps {
  label: string;
  tone?: 'default' | 'status' | 'outline';
  dot?: boolean;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  tone = 'default',
  dot = false,
  className,
}) => {
  const baseStyles =
    'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-medium select-none';

  const toneStyles = {
    default: 'bg-warm text-midnight border border-gold-border/40',
    status: 'bg-warm/80 text-midnight border border-status-green/30',
    outline: 'bg-transparent text-midnight border border-gold-border',
  };

  return (
    <span className={cn(baseStyles, toneStyles[tone], className)}>
      {dot && (
        <span
          className="inline-block w-2 h-2 rounded-full bg-status-green shrink-0 animate-pulse"
          aria-hidden="true"
        />
      )}
      <span>{label}</span>
    </span>
  );
};
