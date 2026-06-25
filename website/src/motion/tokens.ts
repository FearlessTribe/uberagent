/** Motion design tokens – see design/design.md */

export const DURATION = {
  instant: 0,
  tap: 0.1,
  fast: 0.2,
  normal: 0.4,
  slow: 0.55,
  hero: 0.75,
  modal: 0.35,
  ambient: 18,
} as const;

export const EASE = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  outSmooth: [0.4, 0, 0.2, 1] as const,
  inOutSmooth: [0.65, 0, 0.35, 1] as const,
};

export const STAGGER = {
  section: 0.06,
  hero: 0.08,
  menu: 0.05,
  logos: 0.035,
  process: 0.07,
} as const;

export const DISTANCE = {
  micro: 4,
  small: 8,
  normal: 16,
  section: 24,
  hero: 32,
} as const;

export const SPRING = {
  precise: {
    type: "spring" as const,
    stiffness: 420,
    damping: 42,
    mass: 0.8,
  },
  stiff: {
    type: "spring" as const,
    stiffness: 520,
    damping: 48,
    mass: 0.75,
  },
};

export const viewport = {
  once: true,
  amount: 0.25,
  margin: "0px 0px -40px 0px" as const,
};

/** @deprecated Use DURATION + EASE directly */
export const transitions = {
  tap: { duration: DURATION.tap, ease: EASE.outSmooth },
  fast: { duration: DURATION.fast, ease: EASE.outSmooth },
  normal: { duration: DURATION.normal, ease: EASE.outExpo },
  slow: { duration: DURATION.slow, ease: EASE.outExpo },
  hero: { duration: DURATION.hero, ease: EASE.outExpo },
  modal: { duration: DURATION.modal, ease: EASE.outExpo },
  spring: SPRING.precise,
};
