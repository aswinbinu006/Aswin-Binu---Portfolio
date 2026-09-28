import React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'cyan' | 'stellar' | 'outline';
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
      'bg-navy-surface border border-luminous-faint text-luminous-muted',
    cyan:
      'bg-cyan-dim border border-cyan/30 text-cyan-bright',
    stellar:
      'bg-stellar-subtle border border-stellar/40 text-luminous',
    outline:
      'bg-transparent border border-luminous-faint text-luminous-dim',
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
