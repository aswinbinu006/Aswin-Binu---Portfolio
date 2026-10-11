import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../lib/utils';

export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number; // milliseconds for entrance
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'mask' | 'scale' | 'none';
  triggerOnce?: boolean;
  children: React.ReactNode;
}

export const Reveal: React.FC<RevealProps> = ({
  delay = 0,
  duration = 500,
  direction = 'up',
  triggerOnce = false,
  children,
  className,
  style,
  ...props
}) => {
  const { ref, isRevealed } = useScrollReveal({ triggerOnce });

  const getTransitionStyles = () => {
    switch (direction) {
      case 'up':
        return isRevealed
          ? 'translate-y-0 opacity-100'
          : 'translate-y-8 opacity-0';
      case 'down':
        return isRevealed
          ? 'translate-y-0 opacity-100'
          : '-translate-y-8 opacity-0';
      case 'left':
        return isRevealed
          ? 'translate-x-0 opacity-100'
          : 'translate-x-8 opacity-0';
      case 'right':
        return isRevealed
          ? 'translate-x-0 opacity-100'
          : '-translate-x-8 opacity-0';
      case 'scale':
        return isRevealed
          ? 'scale-100 opacity-100'
          : 'scale-[0.96] opacity-0';
      case 'mask':
        return isRevealed
          ? 'translate-y-0 opacity-100'
          : 'translate-y-full opacity-0';
      case 'none':
      default:
        return isRevealed ? 'opacity-100' : 'opacity-0';
    }
  };

  // Apply entrance delay only when revealing; reset immediately on exit for crisp bidirectional motion
  const delayStyle = isRevealed && delay > 0 ? { transitionDelay: `${delay}ms` } : { transitionDelay: '0ms' };
  const durationStyle = { transitionDuration: `${duration}ms` };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-500 ease-out will-change-[transform,opacity]',
        direction === 'mask' && 'overflow-hidden',
        getTransitionStyles(),
        className
      )}
      style={{
        ...durationStyle,
        ...delayStyle,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
