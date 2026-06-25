import type { Variants } from "motion/react";
import { DISTANCE, STAGGER, transitions } from "./tokens";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: DISTANCE.md },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.slow,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.normal,
  },
};

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: DISTANCE.sm },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.slow,
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER.section,
      delayChildren: 0.04,
    },
  },
};

export const heroContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER.hero,
      delayChildren: 0.1,
    },
  },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: DISTANCE.lg },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.hero,
  },
};

export const menuContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER.menu, delayChildren: 0.08 },
  },
};

export const menuItem: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.normal,
  },
};

export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.modal },
  exit: { opacity: 0, transition: transitions.fast },
};

export const modalDialog: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: transitions.modal,
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.98,
    transition: transitions.fast,
  },
};

export const slidePanel: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.normal,
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: transitions.fast,
  },
};

export const offCanvasPanel: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: transitions.normal,
  },
  exit: {
    x: "100%",
    transition: transitions.fast,
  },
};

export const pressableHover = {
  y: -2,
  transition: transitions.fast,
};

export const pressableTap = {
  scale: 0.99,
  transition: transitions.fast,
};
