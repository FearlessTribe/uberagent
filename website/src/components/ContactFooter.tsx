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
      <div className="container">
        <ScrollReveal className={styles.top}>
          <div className={`sectionStart ${styles.intro}`}>
            <span className="eyebrow">Ihr Ansprechpartner</span>
            <h2 className="display-md">
              Wir sind für dich da, um dir zu helfen.
            </h2>
          </div>

          <div className={styles.profile}>
            <img
              src="/laurens.jpg"
              alt="Laurens Lang, CEO von überagent"
              className={styles.profileImage}
              loading="lazy"
              width={200}
              height={206}
            />
            <div className={styles.profileInfo}>
              <p className={styles.profileName}>Laurens Lang, M.Sc. MBA</p>
              <p className={styles.profileRole}>CEO · überagent</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className={styles.calendly}>
          <div className={styles.calendlyPlaceholder} aria-label="Terminbuchung">
            <div className={styles.calendlyInner}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <rect x="4" y="6" width="24" height="22" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4 12h24M10 4v4M22 4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <p className={styles.calendlyText}>
                Calendly-Terminbuchung wird hier eingebettet.
              </p>
              <CtaButton size="md" surface="on-dark" onClick={() => { window.location.href = "mailto:hello@ueberagent.com"; }}>
                E-Mail schreiben
              </CtaButton>
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
          <img src="/logo-white.jpg" alt="" className={styles.footerLogo} width={100} height={28} aria-hidden="true" />
          <p className={styles.copyright}>© überagent. 2026</p>
        </div>
      </div>
    </footer>
  );
}
