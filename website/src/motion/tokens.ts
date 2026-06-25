/** Motion design tokens – see design/design.md */

export const EASE = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  outSmooth: [0.4, 0, 0.2, 1] as const,
};

export const DURATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.55,
  hero: 0.75,
  modal: 0.35,
} as const;

export const DISTANCE = {
  sm: 12,
  md: 16,
  lg: 24,
} as const;

export const STAGGER = {
  section: 0.06,
  hero: 0.08,
  menu: 0.05,
} as const;

export const transitions = {
  fast: {
    duration: DURATION.fast,
    ease: EASE.outSmooth,
  },
  normal: {
    duration: DURATION.normal,
    ease: EASE.outExpo,
  },
  slow: {
    duration: DURATION.slow,
    ease: EASE.outExpo,
  },
  hero: {
    duration: DURATION.hero,
    ease: EASE.outExpo,
  },
  /** Stiff spring – precise, no bounce */
  spring: {
    type: "spring" as const,
    stiffness: 420,
    damping: 38,
    mass: 0.8,
  },
  /** Modal enter/exit */
  modal: {
    duration: DURATION.modal,
    ease: EASE.outExpo,
  },
};

export const viewport = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -40px 0px" as const,
};
