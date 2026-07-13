import { SectionShell } from "./SectionShell";
import { ScrollReveal } from "./ScrollReveal";
import { MotionPressable } from "./MotionPressable";
import { caseStudies } from "../data/marketing";
import { useCardGlow } from "../hooks/useScrollReveal";
import styles from "./CaseStudies.module.css";

interface CaseStudiesProps {
  onOpenProject: (id: string) => void;
}

export function CaseStudies({ onOpenProject }: CaseStudiesProps) {
  const { handleMouseMove } = useCardGlow();

  return (
    <SectionShell
      id="projects"
      background="static-right"
      ariaLabelledBy="projects-heading"
    >
      <div className="container">
        <ScrollReveal className={styles.header}>
          <span className="eyebrow">Referenzen</span>
          <h2 id="projects-heading" className="display-md">
            Success Stories
          </h2>
          <p className={styles.sub}>
            Messbare Outcomes aus GTM, Agents und Strategy, nicht nur Demos.
          </p>
        </ScrollReveal>

        <ScrollReveal className={styles.grid} stagger>
          {caseStudies.map((study) => {
            const clickable = Boolean(study.openId);
            const body = (
              <>
                <span className={styles.industry}>{study.industry}</span>
                <div className={styles.tags}>
                  {study.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                <h3 className={styles.title}>{study.title}</h3>
                <blockquote className={styles.quote}>
                  <p>“{study.quote}”</p>
                  <footer>
                    <strong>{study.person}</strong>
                    <span>{study.role}</span>
                  </footer>
                </blockquote>
                <div className={styles.metrics}>
                  {study.metrics.map((m) => (
                    <div key={m.label} className={styles.metric}>
                      <span className={styles.metricValue}>{m.value}</span>
                      <span className={styles.metricLabel}>{m.label}</span>
                    </div>
                  ))}
                </div>
                {clickable && (
                  <span className={styles.readMore}>
                    Case Study lesen
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </>
            );

            if (clickable && study.openId) {
              return (
                <MotionPressable
                  key={study.id}
                  className={`card card-dark ${styles.card}`}
                  onClick={() => onOpenProject(study.openId!)}
                  onMouseMove={handleMouseMove}
                  aria-haspopup="dialog"
                >
                  {body}
                </MotionPressable>
              );
            }

            return (
              <article key={study.id} className={`card card-dark ${styles.card}`}>
                {body}
              </article>
            );
          })}
        </ScrollReveal>
      </div>
    </SectionShell>
  );
}
