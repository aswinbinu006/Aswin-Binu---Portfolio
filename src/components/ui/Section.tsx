import React from 'react';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  isFullWidth?: boolean;
}

/**
 * Standard semantic section wrapper.
 * Enforces vertical section rhythm, responsive container padding,
 * and safeguards against horizontal scroll overflow.
 */
export default function Section({
  id,
  children,
  className = '',
  containerClassName = '',
  isFullWidth = false,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full overflow-x-clip section-padding ${className}`}
      {...props}
    >
      {isFullWidth ? (
        children
      ) : (
        <div className={`container-custom relative z-10 ${containerClassName}`}>
          {children}
        </div>
      )}
    </section>
  );
}
