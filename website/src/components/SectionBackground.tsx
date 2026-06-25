import styles from "./SectionBackground.module.css";

export type SectionBackgroundVariant =
  | "static"
  | "static-right"
  | "static-footer"
  | "static-hero";

interface SectionBackgroundProps {
  variant?: SectionBackgroundVariant;
}

const variantClass: Record<SectionBackgroundVariant, string> = {
  static: styles.staticBg,
  "static-right": styles.staticBgAccentRight,
  "static-footer": styles.staticBgFooter,
  "static-hero": styles.staticBgHero,
};

export function SectionBackground({ variant = "static" }: SectionBackgroundProps) {
  return (
    <div
      className={`layer-bg ${styles.layerBg} ${variantClass[variant]}`}
      aria-hidden="true"
    />
  );
}
