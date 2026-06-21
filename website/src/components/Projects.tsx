import { useState } from "react";
import { projects, projectDetails } from "../data/projects";
import { useCardGlow } from "../hooks/useScrollReveal";
import { ScrollReveal } from "./ScrollReveal";
import { Modal } from "./Modal";
import { ModalContactFooter } from "./ModalContactFooter";
import styles from "./Projects.module.css";

export function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);
  const { handleMouseMove } = useCardGlow();
  const project = projects.find((p) => p.id === openId);
  const details = openId ? projectDetails[openId as keyof typeof projectDetails] : null;

  return (
    <section id="projects" className={`section ${styles.projects}`} aria-labelledby="projects-heading">
      <div className="container">
        <ScrollReveal className={`sectionStart ${styles.header}`}>
          <span className="eyebrow">Referenzen</span>
          <h2 id="projects-heading" className="display-md">
            Success Stories
          </h2>
        </ScrollReveal>

        <ScrollReveal className={styles.list} stagger>
          {projects.map((p) => (
            <button
              key={p.id}
              className={`card card-dark ${styles.projectCard}`}
              onClick={() => setOpenId(p.id)}
              onMouseMove={handleMouseMove}
              aria-haspopup="dialog"
            >
              <div className={styles.tags}>
                {p.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
              <h3 className={styles.projectTitle}>{p.title}</h3>
              <p className="body">{p.shortDescription}</p>
              <span className={styles.readMore}>
                Case Study lesen
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          ))}
        </ScrollReveal>
      </div>

      {project && details && (
        <Modal
          isOpen={!!openId}
          onClose={() => setOpenId(null)}
          title={project.title}
          eyebrow="Success Story"
          footer={<ModalContactFooter onClose={() => setOpenId(null)} label="Get in touch" />}
        >
          <div className={styles.modalContent}>
            <section>
              <h3 className={styles.modalHeading}>Die Ausgangslage</h3>
              <p className="body">{details.situation}</p>
            </section>
            <section>
              <h3 className={styles.modalHeading}>Die Lösung: ein KI-Sales-Agent</h3>
              <p className="body">{details.solution}</p>
            </section>
            <section>
              <h3 className={styles.modalHeading}>Das Prinzip dahinter</h3>
              <p className="body">{details.principle}</p>
            </section>
            <section>
              <h3 className={styles.modalHeading}>Die Wirkung</h3>
              <p className="body">{details.impact}</p>
            </section>

            <div className={styles.metaGrid}>
              <div>
                <h4 className={styles.metaLabel}>Phasen</h4>
                <ul className={styles.metaList}>
                  {details.phases.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className={styles.metaLabel}>Tech Stack</h4>
                <div className={styles.tags}>
                  {details.tech.map((t) => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className={styles.metaLabel}>Client</h4>
                <p className="body">{details.client}</p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
