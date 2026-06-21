import { SmokeBackground } from "@/components/ui/spooky-smoke-animation";
import { projects } from "../data/projects";
import { useCardGlow } from "../hooks/useScrollReveal";
import { useCaseRoute } from "../hooks/useCaseRoute";
import { ScrollReveal } from "./ScrollReveal";
import { ProjectModal } from "./ProjectModal";
import styles from "./Projects.module.css";

export function Projects() {
  const { openProjectId, setOpenProjectId } = useCaseRoute();
  const { handleMouseMove } = useCardGlow();

  return (
    <section id="projects" className={`section ${styles.projects}`} aria-labelledby="projects-heading">
      <div className={styles.smokeLayer} aria-hidden="true">
        <SmokeBackground />
      </div>
      <div className={styles.bgOverlay} aria-hidden="true" />

      <div className={styles.projectsContent}>
        <div className="container">
          <ScrollReveal className={styles.header}>
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
                onClick={() => setOpenProjectId(p.id)}
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
              </button>
            ))}
          </ScrollReveal>
        </div>
      </div>

      <ProjectModal
        isOpen={openProjectId === "ai-sales-agent"}
        onClose={() => setOpenProjectId(null)}
      />
    </section>
  );
}
