import { CtaButton } from "./CtaButton";
import { scrollToContact } from "../hooks/useScrollReveal";
import { ScrollReveal } from "./ScrollReveal";
import styles from "./GrowthBanner.module.css";

interface GrowthBannerProps {
  className?: string;
}

export function GrowthBanner({ className = "" }: GrowthBannerProps) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.bg} aria-hidden="true" />

      <div className={styles.container}>
        <ScrollReveal className={styles.inner}>
          <div className={styles.textRow}>
            <span className={styles.line} aria-hidden="true" />
            <div className={styles.textBlock}>
              <p className={styles.headline}>
                Vom Use Case zum Kickstart:
                <span className={styles.accent}> 7–14 Tage </span>
                bis zum Live Prototype.
              </p>
            </div>
          </div>

          <div className={styles.ctaBlock}>
            <CtaButton
              size="sm"
              surface="on-dark"
              onClick={() => scrollToContact("growth_banner")}
            >
              Erstgespräch vereinbaren
            </CtaButton>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
