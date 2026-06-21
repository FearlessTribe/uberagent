import { SmokeBackground } from "@/components/ui/spooky-smoke-animation";
import { services } from "../data/services";
import { ScrollReveal } from "./ScrollReveal";
import { CtaButton } from "./CtaButton";
import styles from "./ContactFooter.module.css";

interface ContactFooterProps {
  onOpenService: (id: string) => void;
}

export function ContactFooter({ onOpenService }: ContactFooterProps) {
  return (
    <footer id="contact" className={styles.footer} role="contentinfo">
      <div className={styles.smokeLayer} aria-hidden="true">
        <SmokeBackground />
      </div>
      <div className={styles.bgOverlay} aria-hidden="true" />

      <div className={styles.footerContent}>
        <div className="container">
        <ScrollReveal className={styles.hero}>
          <div className={`sectionStart ${styles.intro}`}>
            <span className="eyebrow">Ihr Ansprechpartner</span>
            <h2 className="display-md">
              Wir sind für dich da, um dir zu helfen.
            </h2>
            <CtaButton
              size="lg"
              surface="on-dark"
              href="https://calendly.com/supraflow/30min"
            >
              Kostenloses Erstgespräch
            </CtaButton>
          </div>

          <div className={styles.profileColumn}>
            <img
              src="/laurens.jpg"
              alt="Laurens Lang, CEO von überagent"
              className={styles.profileImage}
              loading="lazy"
              width={320}
              height={330}
            />
            <div className={styles.profileInfo}>
              <p className={styles.profileName}>Laurens Lang, M.Sc. MBA</p>
              <p className={styles.profileRole}>CEO · überagent</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className={styles.details}>
          <div className={styles.detailBlock}>
            <h3 className={styles.detailLabel}>Adresse</h3>
            <address className={styles.address}>
              überagent<br />
              Eugen-Huber-Strasse 127<br />
              8048 Zürich
            </address>
          </div>

          <div className={styles.detailBlock}>
            <h3 className={styles.detailLabel}>Telefon</h3>
            <a href="tel:+41795103025" className={styles.phone}>
              +41 79 510 30 25
            </a>
          </div>

          <div className={styles.detailBlock}>
            <h3 className={styles.detailLabel}>Services</h3>
            <ul className={styles.serviceLinks} role="list">
              {services.map((s) => (
                <li key={s.id}>
                  <button
                    className={styles.serviceLink}
                    onClick={() => onOpenService(s.id)}
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <div className={styles.bottom}>
          <img src="/logowhite.svg" alt="" className={styles.footerLogo} width={32} height={32} aria-hidden="true" />
          <p className={styles.copyright}>© überagent. 2026</p>
        </div>
        </div>
      </div>
    </footer>
  );
}
