import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DURATION, EASE, fadeIn, slidePanel } from "../motion";
import styles from "./StrategyCommandRoomVisual.module.css";

const PHASES = [
  { id: "intake", label: "Intake" },
  { id: "scoring", label: "Scoring" },
  { id: "governance", label: "Governance" },
  { id: "portfolio", label: "Portfolio" },
] as const;

function Detail({ phase, reduce }: { phase: number; reduce: boolean }) {
  const variants = reduce ? fadeIn : slidePanel;
  if (phase === 0) return <motion.div key="intake" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit"><span className={styles.kicker}>Use-Case Intake</span><div className={styles.funnel}>{['Ideen 24', 'Shortlist 11', 'Cases 5', 'Bets 2'].map((item, i) => <div key={item} className={styles.funnelStage} style={{ width: `${100 - i * 16}%` }}>{item}</div>)}</div></motion.div>;
  if (phase === 1) return <motion.div key="scoring" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit"><span className={styles.kicker}>Scoring-Modell</span><div className={styles.scoreGrid}>{['Impact', 'Machbarkeit', 'Datenlage', 'Risk'].map((item, i) => <div key={item} className={styles.score}><span>{item}</span><div className={styles.track}><motion.b initial={reduce ? { scaleX: [0.86,0.72,0.64,0.58][i] } : { scaleX: 0 }} animate={{ scaleX: [0.86,0.72,0.64,0.58][i] }} transition={{ duration: DURATION.slow, ease: EASE.outExpo, delay: reduce ? 0 : i * 0.06 }} /></div></div>)}</div></motion.div>;
  if (phase === 2) return <motion.div key="governance" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit"><span className={styles.kicker}>Governance</span><div className={styles.govList}>{['Owner klar', 'Security Review', 'Stage Gate', 'KPI-Plan'].map((item) => <div key={item} className={styles.govItem}><span className={styles.govDot} />{item}</div>)}</div></motion.div>;
  return <motion.div key="portfolio" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit"><span className={styles.kicker}>Portfolio Command Room</span><div className={styles.portfolio}><div><strong>Bet 01</strong><span>Customer Ops Agent</span></div><div><strong>Bet 02</strong><span>Sales Intelligence</span></div><div><strong>Later</strong><span>Knowledge Copilot</span></div></div><p className={styles.insight}>Am Ende steht ein priorisiertes AI-Portfolio statt einer langen Ideenliste.</p></motion.div>;
}

export function StrategyCommandRoomVisual() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(reduce ? PHASES.length - 1 : 0);
  useEffect(() => { if (reduce) return undefined; const id = window.setInterval(() => setPhase((current) => (current + 1) % PHASES.length), 3400); return () => window.clearInterval(id); }, [reduce]);
  return <div className={styles.panel} role="img" aria-label="Animation: AI-Strategie wird von Intake über Scoring und Governance in ein priorisiertes Portfolio überführt."><div className={styles.head}><span className={styles.live} aria-hidden="true" /><span className={styles.headLabel}>Command Room</span><span className={styles.headPhase}>{PHASES[phase].label}</span></div><div className={styles.steps}>{PHASES.map((item, index) => <div key={item.id} className={`${styles.step} ${index === phase ? styles.stepActive : index < phase ? styles.stepDone : ''}`}>{item.label}</div>)}</div><div className={styles.stage}><AnimatePresence mode="wait"><Detail key={PHASES[phase].id} phase={phase} reduce={!!reduce} /></AnimatePresence></div></div>;
}
