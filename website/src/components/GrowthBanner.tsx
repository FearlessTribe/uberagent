import { SmokeBackground } from "@/components/ui/spooky-smoke-animation";
import { CtaButton } from "./CtaButton";
import { scrollToSection } from "../hooks/useScrollReveal";
import styles from "./GrowthBanner.module.css";

interface GrowthBannerProps {
  className?: string;
}

export function GrowthBanner({ className = "" }: GrowthBannerProps) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.smokeLayer}>
          <SmokeBackground />
        </div>
        <div className={styles.bgOverlay} />
      </div>

      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.textRow}>
            <span className={styles.line} aria-hidden="true" />
            <div className={styles.textBlock}>
              <p className={styles.headline}>
                Mehr Wachstum durch intelligente
                <span className={styles.accent}> &amp; automatisierte </span>
                Workflow Agenten.
              </p>
            </div>
          </div>

          <div className={styles.ctaBlock}>
            <CtaButton
              size="sm"
              surface="on-dark"
              onClick={() => scrollToSection("contact")}
            >
              Get in touch
            </CtaButton>
          </div>
        </div>
      </div>
    </div>
  );
}
