import { useEffect, useState, useCallback } from "react";
import { processSteps } from "../data/content";
import { ScrollReveal } from "./ScrollReveal";
import { GrowthBanner } from "./GrowthBanner";
import styles from "./Process.module.css";

const AUTO_INTERVAL = 8000;

export function Process() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % processSteps.length);
  }, []);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + processSteps.length) % processSteps.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const timer = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(timer);
  }, [paused, next]);

  const step = processSteps[active];

  return (
    <section className={`section ${styles.process}`} aria-labelledby="process-heading">
      <div className={styles.gradientBg} aria-hidden="true" />
      <div className="container">
        <ScrollReveal className={`sectionStart ${styles.header}`}>
          <span className="eyebrow">End-to-End: Vom Use Case zum produktiven System</span>
          <h2 id="process-heading" className="display-md">
            Unser bewährter Prozess
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <div
            className={styles.carousel}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <article className={`card ${styles.stepBox}`} key={active}>
              <div className={styles.boxTop}>
                <span className={styles.number}>{step.number}</span>
                <div className={styles.navButtons}>
                  <button
                    type="button"
                    className={styles.navBtn}
                    onClick={prev}
                    aria-label="Vorheriger Schritt"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className={styles.navBtn}
                    onClick={next}
                    aria-label="Nächster Schritt"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.description}</p>
            </article>

            <div className={styles.tabs} role="tablist" aria-label="Prozessschritte">
              {processSteps.map((s, i) => (
                <button
                  key={s.number}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Schritt ${s.number}: ${s.title}`}
                  className={`${styles.tab} ${i === active ? styles.tabActive : ""}`}
                  onClick={() => setActive(i)}
                >
                  <span className={styles.tabNumber}>{s.number}</span>
                  <span className={styles.tabLabel}>{s.title}</span>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className={styles.bannerWrap}>
          <GrowthBanner />
        </ScrollReveal>
      </div>
    </section>
  );
}
