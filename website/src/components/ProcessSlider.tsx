import { useState } from "react";
import { gtmProcessPhases } from "../data/content";
import styles from "./ProcessSlider.module.css";

export function ProcessSlider() {
  const [active, setActive] = useState(0);

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
        <div
          className={styles.trackFill}
          style={{ width: `${((active + 1) / gtmProcessPhases.length) * 100}%` }}
        />
      </div>

      {gtmProcessPhases.map((phase, i) => (
        <div
          key={phase.phase}
          role="tabpanel"
          id={`phase-panel-${i}`}
          aria-labelledby={`phase-tab-${i}`}
          hidden={active !== i}
          className={styles.panel}
        >
          <p className="body">{phase.description}</p>
        </div>
      ))}
    </div>
  );
}
