import type { Variants } from "motion/react";
import { DURATION, DISTANCE, EASE, STAGGER } from "./tokens";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: DISTANCE.normal },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.outExpo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.normal, ease: EASE.outExpo },
  },
};

export const fadeBlurUp: Variants = {
  hidden: { opacity: 0, y: DISTANCE.section, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: DURATION.hero, ease: EASE.outExpo },
  },
};

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: DISTANCE.small },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.normal, ease: EASE.outExpo },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.section,
      delayChildren: 0.05,
    },
  },
};

export const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.hero,
      delayChildren: 0.08,
    },
  },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: DISTANCE.hero, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: DURATION.hero, ease: EASE.outExpo },
  },
};

export const heroFeatureContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.hero,
      delayChildren: 0,
    },
  },
};

export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.fast, ease: EASE.outSmooth },
  },
  exit: {
    opacity: 0,
    transition: { duration: DURATION.fast, ease: EASE.outSmooth },
  },
};

export const modalDialog: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 12, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: DURATION.modal, ease: EASE.outExpo },
  },
  exit: {
    opacity: 0,
    scale: 0.985,
    y: 8,
    filter: "blur(4px)",
    transition: { duration: DURATION.fast, ease: EASE.outSmooth },
  },
};

export const slidePanel: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: DURATION.normal, ease: EASE.outExpo },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: "blur(4px)",
    transition: { duration: DURATION.fast, ease: EASE.outSmooth },
  },
};

export const menuContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.menu,
    },
  },
};

export const mobilePanel: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.normal, ease: EASE.outExpo },
  },
  exit: {
    opacity: 0,
    x: 16,
    transition: { duration: DURATION.fast, ease: EASE.outSmooth },
  },
};

export const menuItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.fast, ease: EASE.outExpo },
  },
};

export const pressableHover = {
  y: -3,
  scale: 1.005,
  transition: { duration: DURATION.fast, ease: EASE.outSmooth },
};

export const pressableTap = {
  scale: 0.985,
  transition: { duration: DURATION.tap, ease: EASE.outSmooth },
};

export const lineDraw: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: DURATION.slow, ease: EASE.outExpo },
  },
};

export const reducedFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};
