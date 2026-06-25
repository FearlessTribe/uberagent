import { Modal } from "./Modal";
import { ModalContactFooter } from "./ModalContactFooter";
import { laurensProfile, teamMembers } from "../data/team";
import styles from "./Team.module.css";

interface LaurensModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const laurens = teamMembers.find((m) => m.id === "laurens")!;

export function LaurensModal({ isOpen, onClose }: LaurensModalProps) {
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
            width={160}
            height={165}
          />
          <div className={styles.modalHeroText}>
            {laurensProfile.bio.map((paragraph, i) => (
              <p key={i} className="body">{paragraph}</p>
            ))}
          </div>
        </div>

        <div className={styles.respTags}>
          {laurensProfile.responsibilities.map((r) => (
            <span key={r} className={styles.respTag}>{r}</span>
          ))}
        </div>

        <div className={styles.modalSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>Education</span>
            <h4 className={styles.sectionTitle}>Ausbildung</h4>
          </div>
          <div className={styles.timelineCards}>
            {laurensProfile.education.map((edu) => (
              <div key={edu.period + edu.institution} className={styles.timelineCard}>
                <span className={styles.timelinePeriod}>{edu.period}</span>
                <p className={styles.timelineTitle}>{edu.institution}</p>
                <p className={styles.timelineSub}>{edu.degree}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.modalSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>Experience</span>
            <h4 className={styles.sectionTitle}>Berufserfahrung</h4>
          </div>
          <div className={styles.timelineCards}>
            {laurensProfile.experience.map((exp) => (
              <div key={exp.period + exp.company} className={`${styles.timelineCard} ${styles.timelineCardDark}`}>
                <span className={styles.timelinePeriod}>{exp.period}</span>
                <p className={styles.timelineTitle}>{exp.company}</p>
                <p className={styles.timelineSub}>{exp.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
