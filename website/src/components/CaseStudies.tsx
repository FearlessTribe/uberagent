import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SectionShell } from "./SectionShell";
import { ScrollReveal } from "./ScrollReveal";
import { MotionPressable } from "./MotionPressable";
import { ProofRow } from "./ProofRow";
import { caseStudies, type CaseStudyCard } from "../data/marketing";
import { useCardGlow } from "../hooks/useScrollReveal";
import { resolveVariants, slidePanel } from "../motion";
import styles from "./CaseStudies.module.css";

interface CaseStudiesProps {
  onOpenProject: (id: string) => void;
}

function CaseMedia({ study }: { study: CaseStudyCard }) {
  if (study.video) {
    return (
      <div className={styles.preview}>
        <div className={styles.previewChrome} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className={`${styles.previewViewport} ${styles.previewViewportVideo}`}>
          <video
            className={styles.previewVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={study.video.poster}
          >
            <source src={study.video.src} type="video/mp4" />
          </video>
        </div>
      </div>
    );
  }

  if (!study.preview) return null;

  return (
    <div className={styles.preview}>
      <div className={styles.previewChrome} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className={styles.previewViewport}>
        <img
          src={study.preview.src}
          alt={study.preview.alt}
          width={640}
          height={400}
          loading="lazy"
        />
      </div>
    </div>
  );
}

export function CaseStudies({ onOpenProject }: CaseStudiesProps) {
  const [active, setActive] = useState(0);
  const { handleMouseMove } = useCardGlow();
  const reduce = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % caseStudies.length);
  }, []);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  }, []);

  const handleTabKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      const lastIndex = caseStudies.length - 1;
      let nextIndex: number | null = null;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        nextIndex = index === lastIndex ? 0 : index + 1;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        nextIndex = index === 0 ? lastIndex : index - 1;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = lastIndex;
      }

      if (nextIndex === null) return;

      event.preventDefault();
      setActive(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    },
    [],
  );

  const study = caseStudies[active];
  const clickable = Boolean(study.openId);
  const secondaryMetrics = study.primaryOutcome
    ? study.metrics.filter(
        (m) =>
          m.value !== study.primaryOutcome!.value ||
          m.label !== study.primaryOutcome!.label,
      )
    : study.metrics;

  const content = (
    <div className={styles.content}>
      {study.primaryOutcome && (
        <div className={styles.outcome}>
          <span className={styles.outcomeValue}>{study.primaryOutcome.value}</span>
          <span className={styles.outcomeLabel}>{study.primaryOutcome.label}</span>
        </div>
      )}

      <span className={styles.industry}>{study.industry}</span>
      <div className={styles.tags}>
        {study.tags.map((tag) => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>
      <h3 className={`${styles.title} ${!study.primaryOutcome ? styles.titleLarge : ""}`}>
        {study.title}
      </h3>
      <blockquote className={styles.quote}>
        <p>“{study.quote}”</p>
        <footer>
          <strong>{study.person}</strong>
          <span>{study.role}</span>
        </footer>
      </blockquote>
      {secondaryMetrics.length > 0 && (
        <div className={styles.metrics}>
          {secondaryMetrics.map((m) => (
            <div key={m.label} className={styles.metric}>
              <span className={styles.metricValue}>{m.value}</span>
              <span className={styles.metricLabel}>{m.label}</span>
            </div>
          ))}
        </div>
      )}
      {clickable && (
        <span className={styles.readMore}>
          Case Study lesen
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </div>
  );

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
            <span className="mark">Success Stories</span>
          </h2>
          <p className={styles.sub}>
            Messbare Outcomes aus GTM, Agents und Strategy, nicht nur Demos.
          </p>
        </ScrollReveal>

        <ScrollReveal className={styles.proofWrap}>
          <ProofRow />
        </ScrollReveal>

        <ScrollReveal className={styles.carouselWrap}>
          <div className={styles.carousel}>
            <div className={styles.carouselTop}>
              <p className={styles.carouselMeta}>
                <span>{String(active + 1).padStart(2, "0")}</span>
                <span className={styles.metaDivider} />
                <span>{String(caseStudies.length).padStart(2, "0")}</span>
              </p>
              <div className={styles.navButtons}>
                <button
                  type="button"
                  className={styles.navBtn}
                  onClick={prev}
                  aria-label="Vorherige Success Story"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  className={styles.navBtn}
                  onClick={next}
                  aria-label="Nächste Success Story"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.article
                key={study.id}
                id={`case-study-panel-${study.id}`}
                role="tabpanel"
                aria-labelledby={`case-study-tab-${study.id}`}
                className={`card card-dark ${styles.card}`}
                variants={resolveVariants(Boolean(reduce), slidePanel)}
                initial={reduce ? false : "hidden"}
                animate="visible"
                exit="exit"
              >
                <div className={styles.cardInner}>
                  <CaseMedia study={study} />
                  {clickable && study.openId ? (
                    <MotionPressable
                      className={styles.contentPress}
                      onClick={() => onOpenProject(study.openId!)}
                      onMouseMove={handleMouseMove}
                      aria-haspopup="dialog"
                    >
                      {content}
                    </MotionPressable>
                  ) : (
                    content
                  )}
                </div>
              </motion.article>
            </AnimatePresence>

            <div className={styles.tabs} role="tablist" aria-label="Success Stories">
              {caseStudies.map((item, index) => {
                const isActive = index === active;
                return (
                  <button
                    key={item.id}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`case-study-tab-${item.id}`}
                    aria-selected={isActive}
                    aria-controls={`case-study-panel-${item.id}`}
                    tabIndex={isActive ? 0 : -1}
                    className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
                    onClick={() => setActive(index)}
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
                  >
                    <span className={styles.tabTop}>
                      <span className={styles.tabIndex}>{String(index + 1).padStart(2, "0")}</span>
                      <span className={styles.tabIndustry}>{item.industry}</span>
                    </span>
                    <span className={styles.tabTitle}>{item.title}</span>
                    {item.primaryOutcome && (
                      <span className={styles.tabOutcome}>
                        {item.primaryOutcome.value} · {item.primaryOutcome.label}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </SectionShell>
  );
}
