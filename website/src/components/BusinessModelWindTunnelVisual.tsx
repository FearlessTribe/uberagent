import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { fadeIn, slidePanel } from "../motion";
import styles from "./BusinessModelWindTunnelVisual.module.css";

const PHASES = [
  { id: "hypothesis", label: "Hypothese" },
  { id: "experiment", label: "Experiment" },
  { id: "evidence", label: "Evidenz" },
  { id: "decision", label: "Go / No-Go" },
] as const;

function Detail({ phase, reduce }: { phase: number; reduce: boolean }) {
  const variants = reduce ? fadeIn : slidePanel;
  if (phase === 0) return <motion.div key="hypothesis" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit"><span className={styles.kicker}>Annahme</span><div className={styles.card}><strong>B2B AI-Coach als Add-on</strong><p>Hoher Wunsch, aber noch keine Evidenz zu Zahlungsbereitschaft.</p></div></motion.div>;
  if (phase === 1) return <motion.div key="experiment" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit"><span className={styles.kicker}>Windkanal</span><div className={styles.tunnel}><span>Landing Page</span><span>Interviews</span><span>Pretotype</span></div><p className={styles.insight}>Mehrere kleine Experimente statt ein großer Blindflug.</p></motion.div>;
  if (phase === 2) return <motion.div key="evidence" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit"><span className={styles.kicker}>Messung</span><div className={styles.metricGrid}><div><strong>18%</strong><span>Terminrate</span></div><div><strong>7/10</strong><span>Kaufinteresse</span></div><div><strong>3</strong><span>Red flags</span></div></div></motion.div>;
  return <motion.div key="decision" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit"><span className={styles.kicker}>Entscheidung</span><div className={styles.decisionRow}><div className={styles.decisionGood}><strong>Go</strong><span>Preis testbar</span></div><div className={styles.decisionBad}><strong>No-Go</strong><span>Segment B</span></div></div><p className={styles.insight}>Skalieren erst dann, wenn die Lernkurve sichtbar ist.</p></motion.div>;
}

export function BusinessModelWindTunnelVisual() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(reduce ? PHASES.length - 1 : 0);
  useEffect(() => { if (reduce) return undefined; const id = window.setInterval(() => setPhase((current) => (current + 1) % PHASES.length), 3200); return () => window.clearInterval(id); }, [reduce]);
  return <div className={styles.panel} role="img" aria-label="Animation: Eine Geschäftsidee durchläuft Hypothese, Experimente, Messung und Go-No-Go-Entscheidung."><div className={styles.head}><span className={styles.live} aria-hidden="true" /><span className={styles.headLabel}>Wind Tunnel</span><span className={styles.headPhase}>{PHASES[phase].label}</span></div><div className={styles.steps}>{PHASES.map((item, index) => <div key={item.id} className={`${styles.step} ${index === phase ? styles.stepActive : index < phase ? styles.stepDone : ''}`}>{item.label}</div>)}</div><div className={styles.stage}><AnimatePresence mode="wait"><Detail key={PHASES[phase].id} phase={phase} reduce={!!reduce} /></AnimatePresence></div></div>;
}
