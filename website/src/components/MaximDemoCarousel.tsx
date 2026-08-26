import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AgentLottie } from "./AgentLottie";
import {
  maximDemoExamples,
  maximDemoIntro,
} from "../data/maximCalc";
import { DURATION, EASE } from "../motion";
import styles from "./ServiceModal.module.css";

function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

export function MaximDemoCarousel() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const count = maximDemoExamples.length;
  const example = maximDemoExamples[index];

  const goPrev = useCallback(() => {
    setIndex((current) => wrapIndex(current - 1, count));
  }, [count]);

  const goNext = useCallback(() => {
    setIndex((current) => wrapIndex(current + 1, count));
  }, [count]);

  return (
    <div
      className={styles.maximDemoCarousel}
      role="region"
      aria-roledescription="carousel"
      aria-label="Beispielkalkulationen nach Branche"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          goNext();
        }
      }}
    >
      <div className={styles.maximDemoTabs} role="tablist" aria-label="Branche wählen">
        {maximDemoExamples.map((item, itemIndex) => {
          const active = itemIndex === index;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              className={`${styles.maximDemoTab} ${active ? styles.maximDemoTabActive : ""}`}
              onClick={() => setIndex(itemIndex)}
            >
              {item.industry}
            </button>
          );
        })}
      </div>

      <div className={styles.maximDemo}>
        <div className={styles.maximDemoStage} aria-hidden="true">
          <AgentLottie
            src="/lottie/maxim-agent.json"
            poster="/lottie/maxim-agent.png"
            alt=""
            playing={false}
            className={styles.maximDemoLottie}
          />
        </div>

        <div className={styles.maximDemoPanelWrap}>
          <div className={styles.maximDemoControls}>
            <button
              type="button"
              className={styles.maximDemoArrow}
              onClick={goPrev}
              aria-label="Vorherige Branche"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M10 3 5 8l5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <span className={styles.maximDemoCounter}>
              {index + 1} / {count}
            </span>
            <button
              type="button"
              className={styles.maximDemoArrow}
              onClick={goNext}
              aria-label="Nächste Branche"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M6 3l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className={styles.maximDemoPanel} aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={example.id}
                className={styles.maximDemoSlide}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: DURATION.normal, ease: EASE.outExpo }}
              >
                <div className={styles.maximDemoBlock}>
                  <span className={styles.maximDemoLabel}>
                    {maximDemoIntro.inputLabel} · {example.industry}
                  </span>
                  <p className={styles.maximDemoInput}>{example.input}</p>
                </div>
                <div className={styles.maximDemoBlock}>
                  <span className={styles.maximDemoLabel}>{maximDemoIntro.outputLabel}</span>
                  <ul className={styles.maximDemoLines}>
                    {example.lines.map((line) => (
                      <li key={line.label}>
                        <span>{line.label}</span>
                        <strong>{line.value}</strong>
                      </li>
                    ))}
                  </ul>
                  <div className={styles.maximDemoTotal}>
                    <span>{maximDemoIntro.totalLabel}</span>
                    <strong>{example.total}</strong>
                  </div>
                  <p className={styles.maximDemoNote}>{maximDemoIntro.note}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
