import { motion, useReducedMotion } from "motion/react";
import { pressableHover, pressableTap } from "../motion";
import styles from "./CtaButton.module.css";

export type CtaSize = "sm" | "md" | "lg";
export type CtaSurface = "on-dark" | "on-dark-ghost" | "on-light" | "on-light-ghost";

interface CtaButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  size?: CtaSize;
  surface?: CtaSurface;
  fullWidth?: boolean;
  type?: "button" | "submit";
}

const surfaceClass: Record<CtaSurface, string> = {
  "on-dark": styles.onDark,
  "on-dark-ghost": styles.onDarkGhost,
  "on-light": styles.onLight,
  "on-light-ghost": styles.onLightGhost,
};

export function CtaButton({
  children,
  onClick,
  href,
  size = "md",
  surface = "on-light",
  fullWidth = false,
  type = "button",
}: CtaButtonProps) {
  const reduce = useReducedMotion();
  const className = [
    styles.btn,
    styles[size],
    surfaceClass[surface],
    fullWidth ? styles.fullWidth : "",
  ]
    .filter(Boolean)
    .join(" ");

  const motionProps = reduce
    ? {}
    : {
        whileHover: pressableHover,
        whileTap: pressableTap,
      };

  const content = (
    <>
      <span className={styles.label}>{children}</span>
      <svg className={styles.arrow} viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M5 13L13 5M13 5H6M13 5V12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} className={className} onClick={onClick} {...motionProps}>
      {content}
    </motion.button>
  );
}
