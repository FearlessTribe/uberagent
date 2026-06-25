import type { ReactNode } from "react";
import { SectionBackground, type SectionBackgroundVariant } from "./SectionBackground";
import styles from "./SectionShell.module.css";

interface SectionShellProps {
  id?: string;
  as?: "section" | "footer";
  role?: string;
  variant?: "dark" | "light";
  background?: SectionBackgroundVariant;
  hero?: boolean;
  bottomFade?: boolean;
  className?: string;
  contentClassName?: string;
  ariaLabelledBy?: string;
  children: ReactNode;
}

export function SectionShell({
  id,
  as: Tag = "section",
  variant = "dark",
  background = "static",
  hero = false,
  bottomFade = false,
  className = "",
  contentClassName = "",
  ariaLabelledBy,
  role,
  children,
}: SectionShellProps) {
  const shellClass = [
    styles.shell,
    variant === "dark" ? styles.shellDark : styles.shellLight,
    hero ? styles.shellHero : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const labelledByProps = ariaLabelledBy ? { "aria-labelledby": ariaLabelledBy } : {};

  return (
    <Tag id={id} className={shellClass} role={role} {...labelledByProps}>
      <SectionBackground variant={background} />
      {bottomFade && <div className={styles.bottomFade} aria-hidden="true" />}
      <div className={`layer-content ${styles.content} ${contentClassName}`}>
        {children}
      </div>
    </Tag>
  );
}
