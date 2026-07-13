import { ScrollReveal } from "./ScrollReveal";
import { CtaButton } from "./CtaButton";
import { beforeAfter } from "../data/marketing";
import { scrollToSection } from "../hooks/useScrollReveal";
import styles from "./BeforeAfter.module.css";

export function BeforeAfter() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="compare-heading">
      <div className="container">
        <ScrollReveal className={`sectionStart ${styles.header}`}>
          <span className="eyebrow">Der Unterschied</span>
          <h2 id="compare-heading" className="display-md">
            Von Fragmentierung zu intelligenter Automation
          </h2>
        </ScrollReveal>

        <ScrollReveal className={styles.compare}>
          <div className={styles.panel}>
            <span className={styles.panelLabel}>{beforeAfter.before.label}</span>
            <ul className={styles.list}>
              {beforeAfter.before.items.map((item) => (
                <li key={item} className={styles.itemBad}>
                  <span className={styles.mark} aria-hidden="true">×</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.bridge} aria-hidden="true">
            <span className={styles.bridgeLine} />
            <span className={styles.bridgeBadge}>überagent</span>
            <span className={styles.bridgeLine} />
          </div>

          <div className={`${styles.panel} ${styles.panelGood}`}>
            <span className={styles.panelLabelGood}>{beforeAfter.after.label}</span>
            <ul className={styles.list}>
              {beforeAfter.after.items.map((item) => (
                <li key={item} className={styles.itemGood}>
                  <span className={styles.markGood} aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal className={styles.ctaRow}>
          <CtaButton size="md" surface="on-light" onClick={() => scrollToSection("offer")}>
            Kickstart Sprint ansehen
          </CtaButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
