import type { ReactNode } from "react";
import { CtaButton } from "./CtaButton";
import { BrandMark } from "./BrandMark";
import { scrollToContact } from "../hooks/useScrollReveal";
import { ScrollReveal } from "./ScrollReveal";
import styles from "./GrowthBanner.module.css";

interface GrowthBannerProps {
  className?: string;
  headline?: ReactNode;
  ctaLocation?: string;
}

export function GrowthBanner({
  className = "",
  headline,
  ctaLocation = "growth_banner",
}: GrowthBannerProps) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.bg} aria-hidden="true" />

      <div className={styles.container}>
        <ScrollReveal className={styles.inner}>
          <div className={styles.textRow}>
            <BrandMark tone="on-dark" size="sm" decorative className={styles.brand} />
            <div className={styles.textBlock}>
              <p className={styles.headline}>
                {headline ?? (
                  <>
                    Vom Use Case zum Kickstart:
                    <span className={styles.accent}> 7-14 Tage </span>
                    bis zum Live Prototype.
                  </>
                )}
              </p>
            </div>
          </div>

          <div className={styles.ctaBlock}>
            <CtaButton
              size="sm"
              surface="accent"
              showCalendar
              onClick={() => scrollToContact(ctaLocation)}
            >
              Jetzt Erstgespräch sichern
            </CtaButton>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
