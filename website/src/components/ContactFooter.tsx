import { SectionShell } from "./SectionShell";
import { teamMembers } from "../data/team";
import { services } from "../data/services";
import { ScrollReveal } from "./ScrollReveal";
import { CtaButton } from "./CtaButton";
import { MotionPressable } from "./MotionPressable";
import styles from "./ContactFooter.module.css";

interface ContactFooterProps {
  onOpenService: (id: string) => void;
  onOpenLaurens?: () => void;
}

export function ContactFooter({ onOpenService, onOpenLaurens }: ContactFooterProps) {
  const laurens = teamMembers[0];

  return (
    <SectionShell
      as="footer"
      id="contact"
      role="contentinfo"
      background="static-footer"
      className={styles.footer}
      contentClassName={styles.footerInner}
    >
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

          <MotionPressable
            className={styles.profileColumn}
            onClick={onOpenLaurens}
            aria-haspopup="dialog"
            aria-label="Profil von Laurens Lang öffnen"
          >
            <img
              src={laurens.image}
              alt={laurens.name}
              className={styles.profileImage}
              loading="eager"
              decoding="async"
              width={320}
              height={330}
            />
            <div className={styles.profileInfo}>
              <p className={styles.profileName}>Laurens Lang, M.Sc. MBA</p>
              <p className={styles.profileRole}>CEO · überagent</p>
            </div>
          </MotionPressable>
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
    </SectionShell>
  );
}
