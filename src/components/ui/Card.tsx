import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  interactive = false,
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-card border border-gold-border rounded-lg p-5 md:p-6 shadow-card transition-all duration-200',
        interactive &&
          'hover:border-gold hover:-translate-y-0.5 hover:shadow-card-hover cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
