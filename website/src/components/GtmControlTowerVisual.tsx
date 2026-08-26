import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DURATION, EASE, fadeIn, slidePanel } from "../motion";
import styles from "./GtmControlTowerVisual.module.css";

const LANES = [
  { id: "signal", label: "Signals" },
  { id: "enrich", label: "Enrichment" },
  { id: "route", label: "Routing" },
  { id: "qa", label: "QA" },
] as const;

const ACCOUNTS = [
  { name: "Northstar", fit: "ICP A", signal: "Hiring" },
  { name: "Polarbyte", fit: "ICP B", signal: "Review" },
  { name: "JuniperOS", fit: "ICP A", signal: "Intent" },
];

const PHASE_MS = 3200;

function Detail({ phase, reduce }: { phase: number; reduce: boolean }) {
  const variants = reduce ? fadeIn : slidePanel;

  if (phase === 0) {
    return (
      <motion.div key="signal" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit">
        <span className={styles.kicker}>Signal-Board</span>
        <div className={styles.signalList}>
          {ACCOUNTS.map((item, index) => (
            <motion.div
              key={item.name}
              className={`${styles.signalRow} ${index === 0 ? styles.signalHot : ""}`}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.normal, ease: EASE.outExpo, delay: reduce ? 0 : index * 0.06 }}
            >
              <strong>{item.name}</strong>
              <span>{item.fit}</span>
              <b>{item.signal}</b>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (phase === 1) {
    return (
      <motion.div key="enrich" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit">
        <span className={styles.kicker}>Research und Enrichment</span>
        <div className={styles.chips}>
          {['CRM', 'Jobs', 'Tech-Stack', 'Usage', 'Firmendaten'].map((item, index) => (
            <motion.span
              key={item}
              className={styles.chip}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: DURATION.fast, ease: EASE.outExpo, delay: reduce ? 0 : index * 0.05 }}
            >
              {item}
            </motion.span>
          ))}
        </div>
        <p className={styles.insight}>Jeder Account bekommt Kontext, bevor jemand outreach baut.</p>
      </motion.div>
    );
  }

  if (phase === 2) {
    return (
      <motion.div key="route" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit">
        <span className={styles.kicker}>Routing</span>
        <div className={styles.routeGrid}>
          <div className={styles.routeCard}><strong>SDR</strong><span>ICP A · High intent</span></div>
          <div className={styles.routeCard}><strong>AE</strong><span>Renewal · Expansion</span></div>
          <div className={styles.routeCard}><strong>Ops</strong><span>Data gap · Review</span></div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div key="qa" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit">
      <span className={styles.kicker}>QA und Governed Output</span>
      <div className={styles.auditRow}>
        {['Prompt QA', 'Fallbacks', 'Brand fit', 'CRM write-back'].map((item) => (
          <div key={item} className={styles.auditItem}>
            <span className={styles.auditDot} />
            <span>{item}</span>
          </div>
        ))}
      </div>
      <p className={styles.insight}>Keine isolierten Tools, sondern eine operative GTM-Leitwarte.</p>
    </motion.div>
  );
}

export function GtmControlTowerVisual() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(reduce ? LANES.length - 1 : 0);

  useEffect(() => {
    if (reduce) return undefined;
    const id = window.setInterval(() => setPhase((current) => (current + 1) % LANES.length), PHASE_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div className={styles.panel} role="img" aria-label="Animation: GTM-Signale werden angereichert, geroutet und per QA als operative Leitwarte organisiert.">
      <div className={styles.head}>
        <span className={styles.live} aria-hidden="true" />
        <span className={styles.headLabel}>Control Tower</span>
        <span className={styles.headPhase}>{LANES[phase].label}</span>
      </div>
      <div className={styles.lanes}>
        {LANES.map((lane, index) => (
          <div key={lane.id} className={`${styles.lane} ${index === phase ? styles.laneActive : index < phase ? styles.laneDone : ''}`}>{lane.label}</div>
        ))}
      </div>
      <div className={styles.stage}>
        <AnimatePresence mode="wait">
          <Detail key={LANES[phase].id} phase={phase} reduce={!!reduce} />
        </AnimatePresence>
      </div>
    </div>
  );
}
