import { motion, useReducedMotion } from "motion/react";
import { ctaHover, ctaTap } from "../motion";
import styles from "./CtaButton.module.css";

export type CtaSize = "sm" | "md" | "lg";
export type CtaSurface =
  | "accent"
  | "on-dark"
  | "on-dark-ghost"
  | "on-light"
  | "on-light-ghost";

interface CtaButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  size?: CtaSize;
  surface?: CtaSurface;
  fullWidth?: boolean;
  type?: "button" | "submit";
  sublabel?: boolean;
  showCalendar?: boolean;
  centerSublabel?: boolean;
}

const surfaceClass: Record<CtaSurface, string> = {
  accent: styles.accent,
  "on-dark": styles.onDark,
  "on-dark-ghost": styles.onDarkGhost,
  "on-light": styles.onLight,
  "on-light-ghost": styles.onLightGhost,
};

function CalendarIcon({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 1.5v3M11 1.5v3M2 6.5h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function CtaButton({
  children,
  onClick,
  href,
  size = "md",
  surface = "on-light",
  fullWidth = false,
  type = "button",
  sublabel,
  showCalendar = false,
  centerSublabel = false,
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
        whileHover: ctaHover,
        whileTap: ctaTap,
      };

  const isDarkContext =
    surface === "accent" || surface === "on-dark" || surface === "on-dark-ghost";

  const content = (
    <>
      {showCalendar && <CalendarIcon className={styles.calendar} />}
      <span className={styles.label}>{children}</span>
      {!showCalendar && (
        <svg className={styles.arrow} viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path
            d="M5 13L13 5M13 5H6M13 5V12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  );

  const button =
    href != null ? (
      <motion.a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        {...motionProps}
      >
        {content}
      </motion.a>
    ) : (
      <motion.button type={type} className={className} onClick={onClick} {...motionProps}>
        {content}
      </motion.button>
    );

  if (!sublabel) {
    return button;
  }

  return (
    <div
      className={`${styles.wrap} ${centerSublabel ? styles.wrapCenter : ""} ${fullWidth ? styles.fullWidth : ""}`}
    >
      {button}
      <p className={`${styles.sublabel} ${isDarkContext ? styles.sublabelOnDark : ""}`}>
        <span className={styles.sublabelStrong}>Kostenlos</span> und unverbindlich
      </p>
    </div>
  );
}
