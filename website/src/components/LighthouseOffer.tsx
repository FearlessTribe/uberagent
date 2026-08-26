import { ScrollReveal } from "./ScrollReveal";
import { CtaButton } from "./CtaButton";
import { kickstartOffer } from "../data/marketing";
import { scrollToContact } from "../hooks/useScrollReveal";
import styles from "./LighthouseOffer.module.css";

interface LighthouseOfferProps {
  onCta?: () => void;
}

export function LighthouseOffer({ onCta }: LighthouseOfferProps) {
  return (
    <section id="offer" className={styles.section} aria-labelledby="offer-heading">
      <div className={styles.bg} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <ScrollReveal className={styles.content}>
          <span className={styles.eyebrow}>{kickstartOffer.eyebrow}</span>
          <h2 id="offer-heading" className={styles.title}>
            {kickstartOffer.title}
          </h2>
          <p className={styles.tagline}>{kickstartOffer.tagline}</p>
          <p className={styles.description}>{kickstartOffer.description}</p>
          <CtaButton
            size="md"
            surface="on-dark"
            onClick={() => {
              if (onCta) onCta();
              else scrollToContact("kickstart_offer");
            }}
          >
            {kickstartOffer.cta}
          </CtaButton>
        </ScrollReveal>

        <ScrollReveal className={styles.steps} stagger>
          {kickstartOffer.pillars.map((pillar) => (
            <div key={pillar.label} className={styles.step}>
              <span className={styles.stepNum}>{pillar.label}</span>
              <h3 className={styles.stepTitle}>{pillar.value}</h3>
              <p className={styles.stepText}>{pillar.text}</p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
