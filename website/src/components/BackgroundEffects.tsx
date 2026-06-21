import styles from "./BackgroundEffects.module.css";

interface BackgroundEffectsProps {
  variant?: "hero" | "subtle";
}

export function BackgroundEffects({ variant = "hero" }: BackgroundEffectsProps) {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      {variant === "hero" && (
        <>
          <div className={styles.gradientBg} />
          <div className={`glow-orb glow-orb-1 ${styles.orb1}`} />
          <div className={`glow-orb glow-orb-2 ${styles.orb2}`} />
          <div className={`glow-orb glow-orb-3 ${styles.orb3}`} />
        </>
      )}
      <div className="grid-pattern" />
    </div>
  );
}
