import styles from "./BrandMark.module.css";

type BrandMarkTone = "on-dark" | "on-light";
type BrandMarkSize = "sm" | "md" | "lg";

interface BrandMarkProps {
  tone?: BrandMarkTone;
  size?: BrandMarkSize;
  withWordmark?: boolean;
  className?: string;
  /** Decorative when a nearby heading already names the brand */
  decorative?: boolean;
}

const SIZE_PX: Record<BrandMarkSize, number> = {
  sm: 22,
  md: 32,
  lg: 44,
};

export function BrandMark({
  tone = "on-light",
  size = "md",
  withWordmark = false,
  className = "",
  decorative = false,
}: BrandMarkProps) {
  const px = SIZE_PX[size];
  const src = tone === "on-dark" ? "/logowhite.svg" : "/logoblack.svg";

  return (
    <span
      className={`${styles.mark} ${styles[size]} ${withWordmark ? styles.withWordmark : ""} ${className}`}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : "uberagent"}
      role={decorative ? undefined : "img"}
    >
      <img src={src} alt="" width={px} height={px} className={styles.icon} decoding="async" />
      {withWordmark && <span className={`${styles.wordmark} ${styles[`tone-${tone}`]}`}>uberagent</span>}
    </span>
  );
}
