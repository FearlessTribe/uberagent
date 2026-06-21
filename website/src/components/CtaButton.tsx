import styles from "./CtaButton.module.css";

export type CtaSize = "sm" | "md" | "lg";
export type CtaSurface = "on-dark" | "on-dark-ghost" | "on-light" | "on-light-ghost";

interface CtaButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
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
  size = "md",
  surface = "on-light",
  fullWidth = false,
  type = "button",
}: CtaButtonProps) {
  return (
    <button
      type={type}
      className={[
        styles.btn,
        styles[size],
        surfaceClass[surface],
        fullWidth ? styles.fullWidth : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
    >
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
    </button>
  );
}
