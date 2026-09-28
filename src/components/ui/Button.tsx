import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  variant = 'glass',
  size = 'md',
  href,
  target,
  rel,
  icon,
  iconPosition = 'right',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'group relative inline-flex items-center justify-center font-mono font-medium tracking-wider uppercase transition-all duration-300 focus-ring cursor-pointer select-none';

  const sizeStyles = {
    sm: 'text-label px-3.5 py-1.5 gap-2 rounded-full',
    md: 'text-caption px-5 py-2.5 gap-2.5 rounded-full',
    lg: 'text-body px-7 py-3.5 gap-3 rounded-full',
  }[size];

  const variantStyles = {
    primary:
      'bg-cyan text-void hover:bg-cyan-bright hover:shadow-cyan border border-cyan/40 font-semibold',
    secondary:
      'bg-navy-surface text-luminous border border-stellar/40 hover:border-cyan/50 hover:bg-navy/80 hover:shadow-stellar',
    ghost:
      'bg-transparent text-luminous-muted hover:text-luminous border border-transparent hover:border-luminous-faint',
    glass:
      'frosted-glass text-luminous border border-luminous-faint hover:border-cyan/40 hover:text-white',
  }[variant];

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : rel}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
}
