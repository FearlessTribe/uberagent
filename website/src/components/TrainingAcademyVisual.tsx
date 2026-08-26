import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { fadeIn, slidePanel } from "../motion";
import styles from "./TrainingAcademyVisual.module.css";

const PHASES = [
  { id: "roles", label: "Rollen" },
  { id: "shadow", label: "Shadow Run" },
  { id: "qa", label: "QA" },
  { id: "runbooks", label: "Runbooks" },
] as const;

function Detail({ phase, reduce }: { phase: number; reduce: boolean }) {
  const variants = reduce ? fadeIn : slidePanel;
  if (phase === 0) return <motion.div key="roles" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit"><span className={styles.kicker}>Operator Academy</span><div className={styles.roleGrid}>{['Owner', 'Reviewer', 'Operator'].map((item) => <div key={item} className={styles.role}><strong>{item}</strong><span>klare Verantwortung</span></div>)}</div></motion.div>;
  if (phase === 1) return <motion.div key="shadow" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit"><span className={styles.kicker}>Shadow Run</span><div className={styles.shadowRow}><div><strong>Live</strong><span>Mensch arbeitet</span></div><div><strong>AI</strong><span>läuft parallel</span></div></div><p className={styles.insight}>Teams lernen am echten Prozess statt an abstrakten Slides.</p></motion.div>;
  if (phase === 2) return <motion.div key="qa" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit"><span className={styles.kicker}>Quality Gates</span><div className={styles.checks}>{['Prompt Review', 'Fallbacks', 'Monitoring', 'Escalation Path'].map((item) => <div key={item} className={styles.check}><span className={styles.dot} />{item}</div>)}</div></motion.div>;
  return <motion.div key="runbooks" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit"><span className={styles.kicker}>Betrieb dokumentiert</span><div className={styles.docs}><div><strong>Runbook</strong><span>Wenn X, dann Y</span></div><div><strong>SOP</strong><span>Owner, SLA, Fallback</span></div><div><strong>Review</strong><span>monatliche Checks</span></div></div></motion.div>;
}

export function TrainingAcademyVisual() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(reduce ? PHASES.length - 1 : 0);
  useEffect(() => { if (reduce) return undefined; const id = window.setInterval(() => setPhase((current) => (current + 1) % PHASES.length), 3200); return () => window.clearInterval(id); }, [reduce]);
  return <div className={styles.panel} role="img" aria-label="Animation: Trainings machen Rollen, Shadow Runs, QA und Runbooks für produktive AI-Systeme sichtbar."><div className={styles.head}><span className={styles.live} aria-hidden="true" /><span className={styles.headLabel}>Academy</span><span className={styles.headPhase}>{PHASES[phase].label}</span></div><div className={styles.steps}>{PHASES.map((item, index) => <div key={item.id} className={`${styles.step} ${index === phase ? styles.stepActive : index < phase ? styles.stepDone : ''}`}>{item.label}</div>)}</div><div className={styles.stage}><AnimatePresence mode="wait"><Detail key={PHASES[phase].id} phase={phase} reduce={!!reduce} /></AnimatePresence></div></div>;
}
