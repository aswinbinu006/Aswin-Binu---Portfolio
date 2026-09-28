export const INTRO_TIMINGS = {
  blacknessDuration: 0.5,
  starsAdjustStart: 0.5,
  nebulaRevealStart: 1.0,
  depthReadableStart: 1.5,
  envStabilizeStart: 2.0,
  introContentStart: 2.3,
  autoForwardAt: 6.8,
  forwardTransitDuration: 1.4,
} as const;

export interface IntroOverlayProps {
  onComplete?: () => void;
}

