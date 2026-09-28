import React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'cyan' | 'stellar' | 'outline' | 'gold';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function Tag({
  variant = 'default',
  size = 'sm',
  icon,
  children,
  className = '',
  ...props
}: TagProps) {
  const sizeStyles = {
    sm: 'text-label px-2.5 py-0.5 gap-1.5',
    md: 'text-caption px-3.5 py-1 gap-2',
  }[size];

  const variantStyles = {
    default:
      'bg-surface-subtle border border-white/10 text-luminous-muted',
    cyan:
      'bg-white/10 border border-white/20 text-white',
    stellar:
      'bg-surface-panel border border-white/10 text-luminous',
    outline:
      'bg-transparent border border-white/10 text-luminous-dim',
    gold:
      'bg-[rgba(246,195,67,0.1)] border border-[rgba(246,195,67,0.3)] text-[var(--color-accent-gold)]',
  }[variant];

  return (
    <span
      className={`inline-flex items-center rounded-full font-mono font-normal tracking-wide ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {icon && <span className="opacity-80">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
