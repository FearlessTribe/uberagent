import { SectionShell } from "./SectionShell";
import { projects } from "../data/projects";
import { useCardGlow } from "../hooks/useScrollReveal";
import { ScrollReveal } from "./ScrollReveal";
import { MotionPressable } from "./MotionPressable";
import styles from "./Projects.module.css";

interface ProjectsProps {
  onOpenProject: (id: string) => void;
}

export function Projects({ onOpenProject }: ProjectsProps) {
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
        </ScrollReveal>

        <ScrollReveal className={styles.list} stagger>
          {projects.map((p) => (
            <MotionPressable
              key={p.id}
              className={`card card-dark ${styles.projectCard}`}
              onClick={() => onOpenProject(p.id)}
              onMouseMove={handleMouseMove}
              aria-haspopup="dialog"
            >
              <div className={styles.tags}>
                {p.tags.map((tag) => (
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
            </MotionPressable>
          ))}
        </ScrollReveal>
      </div>
    </SectionShell>
  );
}
