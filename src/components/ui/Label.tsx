import React from 'react';

export interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  beacon?: boolean;
  beaconColor?: string;
  className?: string;
}

/**
 * Tactical monospace HUD label / eyebrow.
 * Used at the top of section headings, cards, and modal dialogs.
 */
export default function Label({
  children,
  beacon = true,
  beaconColor = 'bg-cyan',
  className = '',
  ...props
}: LabelProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-label uppercase tracking-widest text-luminous-muted ${className}`}
      {...props}
    >
      {beacon && (
        <span className="relative flex h-2 w-2 items-center justify-center">
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${beaconColor}`}
          />
          <span
            className={`relative inline-flex h-1.5 w-1.5 rounded-full ${beaconColor}`}
          />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
}
