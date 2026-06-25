import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { gtmProcessPhases } from "../data/content";
import { slidePanel, transitions } from "../motion";
import styles from "./ProcessSlider.module.css";

export function ProcessSlider() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <div className={styles.slider}>
      <div className={styles.tabs} role="tablist" aria-label="Prozess-Phasen">
        {gtmProcessPhases.map((phase, i) => (
          <button
            key={phase.phase}
            role="tab"
            aria-selected={active === i}
            aria-controls={`phase-panel-${i}`}
            id={`phase-tab-${i}`}
            className={`${styles.tab} ${active === i ? styles.tabActive : ""}`}
            onClick={() => setActive(i)}
          >
            <span className={styles.tabPhase}>{phase.phase}</span>
            <span className={styles.tabWeek}>{phase.week}</span>
          </button>
        ))}
      </div>

      <div className={styles.track} aria-hidden="true">
        <motion.div
          className={styles.trackFill}
          animate={{ width: `${((active + 1) / gtmProcessPhases.length) * 100}%` }}
          transition={transitions.normal}
        />
      </div>

      <AnimatePresence mode="wait">
        {gtmProcessPhases.map((phase, i) =>
          active === i ? (
            <motion.div
              key={phase.phase}
              role="tabpanel"
              id={`phase-panel-${i}`}
              aria-labelledby={`phase-tab-${i}`}
              className={styles.panel}
              variants={reduce ? undefined : slidePanel}
              initial={reduce ? false : "hidden"}
              animate="visible"
              exit="exit"
            >
              <p className="body">{phase.description}</p>
            </motion.div>
          ) : null,
        )}
      </AnimatePresence>
    </div>
  );
}
