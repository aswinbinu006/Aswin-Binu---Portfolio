export const INTRO_TIMINGS = {
  pingStart: 0.2,
  terminalStart: 0.4,
  hookLine1Start: 1.0,
  hookLine2Start: 2.0,
  ctaStart: 3.2,
  autoExitAt: 5.4,
  exitFadeDuration: 0.8,
} as const;

export interface IntroOverlayProps {
  onComplete?: () => void;
}
