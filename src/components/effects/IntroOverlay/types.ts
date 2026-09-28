export const INTRO_TIMINGS = {
  initialBlack: 0.8,
  nameStart: 0.8,
  nameDuration: 1.4,
  subtitleStart: 2.2,
  subtitleDuration: 1.6,
  nebulaStart: 3.8,
  nebulaDuration: 1.7,
  autoExitAt: 5.5,
  exitFadeDuration: 0.8,
} as const;

export interface IntroOverlayProps {
  onComplete?: () => void;
}
