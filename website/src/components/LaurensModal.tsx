import { Modal } from "./Modal";
import { ModalContactFooter } from "./ModalContactFooter";
import { CtaButton } from "./CtaButton";
import { useOverlayOptional } from "../context/OverlayContext";
import { trackCalendlyClick } from "../lib/analytics";
import { laurensProfile, teamMembers } from "../data/team";
import styles from "./Team.module.css";

interface LaurensModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CALENDLY_URL = "https://calendly.com/supraflow/30min";
const laurens = teamMembers.find((m) => m.id === "laurens")!;

export function LaurensModal({ isOpen, onClose }: LaurensModalProps) {
  const overlay = useOverlayOptional();

  const openCase = () => {
    onClose();
    overlay?.openProject(laurensProfile.caseProof.projectId);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={laurens.name}
      eyebrow={laurens.role}
      footer={<ModalContactFooter onClose={onClose} />}
    >
      <div className={styles.modalContent}>
        <div className={styles.modalHero}>
          <img
            src={laurens.image}
            alt={laurens.name}
            className={styles.modalHeroImage}
            width={200}
            height={200}
          />
          <div className={styles.modalHeroText}>
            <h3 className={styles.modalHeadline}>{laurensProfile.headline}</h3>
            <p className={styles.modalBio}>{laurensProfile.bio}</p>
            <ul className={styles.proofPoints}>
              {laurensProfile.proofPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.timelineBlock}>
          <section className={styles.modalSection}>
            <div className={styles.sectionHeader}>
              <h4 className={styles.sectionTitle}>
                <span className={styles.sectionIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3.5 10.5 12 6l8.5 4.5L12 15 3.5 10.5z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 12.5v3.2c0 .4.7 1.3 5 2.3 4.3-1 5-1.9 5-2.3v-3.2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.5 10.5V16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                Ausbildung
              </h4>
            </div>
            <div className={styles.timelineGrid}>
              {laurensProfile.education.map((edu) => (
                <div key={edu.institution} className={styles.timelineCard}>
                  <div className={styles.timelineLogo} aria-hidden="true">
                    <img src={edu.logoSrc} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className={styles.timelineBody}>
                    <p className={styles.timelineTitle}>{edu.institution}</p>
                    <p className={styles.timelineSub}>{edu.degree}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.modalSection}>
            <div className={styles.sectionHeader}>
              <h4 className={styles.sectionTitle}>
                <span className={styles.sectionIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3.5"
                      y="7"
                      width="17"
                      height="12.5"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8 7V5.8A1.8 1.8 0 0 1 9.8 4h4.4A1.8 1.8 0 0 1 16 5.8V7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3.5 12.5h17"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                Erfahrung
              </h4>
            </div>
            <div className={styles.timelineGrid}>
              {laurensProfile.experience.map((exp) => (
                <div key={exp.period + exp.company} className={styles.timelineCard}>
                  <div className={styles.timelineLogo} aria-hidden="true">
                    <img src={exp.logoSrc} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className={styles.timelineBody}>
                    <span className={styles.timelinePeriod}>{exp.period}</span>
                    <p className={styles.timelineTitle}>{exp.company}</p>
                    <p className={styles.timelineSub}>{exp.role}</p>
                    <p className={styles.timelineLocation}>{exp.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className={styles.modalSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>Arbeitsweise</span>
            <h4 className={styles.sectionTitle}>So arbeite ich</h4>
          </div>
          <div className={styles.principleList}>
            {laurensProfile.principles.map((item) => (
              <div key={item.title} className={styles.principleItem}>
                <h5>{item.title}</h5>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.caseProof}>
          <span className={styles.sectionEyebrow}>Case</span>
          <p className={styles.caseQuote}>„{laurensProfile.caseProof.quote}“</p>
          <button type="button" className={styles.caseLink} onClick={openCase}>
            Case {laurensProfile.caseProof.client} ansehen
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </section>

        <div className={styles.modalCta}>
          <p>Kurz sprechen, ob ein Agent in Ihrem Betrieb Sinn ergibt.</p>
          <CtaButton
            size="md"
            surface="accent"
            showCalendar
            href={CALENDLY_URL}
            onClick={() => trackCalendlyClick("laurens_modal")}
          >
            Gespräch buchen
          </CtaButton>
        </div>
      </div>
    </Modal>
  );
}
