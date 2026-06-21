import { useState } from "react";
import { teamMembers, laurensProfile } from "../data/team";
import { useCardGlow } from "../hooks/useScrollReveal";
import { ScrollReveal } from "./ScrollReveal";
import { Modal } from "./Modal";
import { ModalContactFooter } from "./ModalContactFooter";
import styles from "./Team.module.css";

export function Team() {
  const [openId, setOpenId] = useState<string | null>(null);
  const { handleMouseMove } = useCardGlow();
  const member = teamMembers.find((m) => m.id === openId);

  return (
    <section id="team" className={`section ${styles.team}`} aria-labelledby="team-heading">
      <div className="container">
        <ScrollReveal className={styles.grid}>
          <div className={`sectionStart ${styles.left}`}>
            <span className="eyebrow">Team</span>
            <h2 id="team-heading" className={`display-md ${styles.headline}`}>
              Gebündelte Kompetenz, um intelligente Lösungen zu schaffen.
            </h2>
          </div>

          <div className={styles.members}>
            {teamMembers.map((m) => (
              <button
                key={m.id}
                className={`card ${styles.memberCard}`}
                onClick={() => setOpenId(m.id)}
                onMouseMove={handleMouseMove}
                aria-haspopup="dialog"
              >
                <div className={styles.imageWrap}>
                  <img
                    src={m.image}
                    alt={m.name}
                    className={styles.image}
                    loading="lazy"
                    width={535}
                    height={551}
                  />
                </div>
                <div className={styles.memberInfo}>
                  <h3 className={styles.memberName}>{m.name}</h3>
                  <span className={styles.memberRole}>{m.role}</span>
                </div>
              </button>
            ))}

            <div className={`card ${styles.staticCard}`} aria-label="Victor Loës, CTO">
              <div className={styles.staticAvatar} aria-hidden="true">
                <span>VL</span>
              </div>
              <div className={styles.memberInfo}>
                <h3 className={styles.memberName}>Victor Loës</h3>
                <span className={styles.memberRole}>CTO</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {member && member.id === "laurens" && (
        <Modal
          isOpen={!!openId}
          onClose={() => setOpenId(null)}
          title={member.name}
          eyebrow={member.role}
          footer={<ModalContactFooter onClose={() => setOpenId(null)} />}
        >
          <div className={styles.modalContent}>
            <div className={styles.modalHero}>
              <img
                src={member.image}
                alt=""
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
      )}
    </section>
  );
}
