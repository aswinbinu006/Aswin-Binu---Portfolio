import React from 'react';
import { cn } from '../../lib/utils';

export interface IconLinkProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  className?: string;
  external?: boolean;
}

export const IconLink: React.FC<IconLinkProps> = ({
  icon,
  label,
  href,
  className,
  external = true,
}) => {
  return (
    <a
      href={href}
      aria-label={label}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(
        'inline-flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg text-navy border border-gold-border/60 bg-card hover:bg-warm hover:border-gold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2',
        className
      )}
    >
      <span className="shrink-0">{icon}</span>
      <span className="sr-only">{label}</span>
    </a>
  );
};
