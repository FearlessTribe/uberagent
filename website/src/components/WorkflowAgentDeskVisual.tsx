import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { fadeIn, slidePanel } from "../motion";
import styles from "./WorkflowAgentDeskVisual.module.css";

const STATES = [
  { id: "inbox", label: "Inbox" },
  { id: "triage", label: "Triage" },
  { id: "handoff", label: "Handoff" },
  { id: "done", label: "Done" },
] as const;

function Detail({ phase, reduce }: { phase: number; reduce: boolean }) {
  const variants = reduce ? fadeIn : slidePanel;
  if (phase === 0) return <motion.div key="inbox" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit"><span className={styles.kicker}>Eingang</span><div className={styles.queue}>{['E-Mail: Anfrage', 'Ticket: Eskalation', 'CRM: Renewal-Signal'].map((item) => <div key={item} className={styles.queueItem}>{item}</div>)}</div></motion.div>;
  if (phase === 1) return <motion.div key="triage" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit"><span className={styles.kicker}>Triage</span><div className={styles.decisionGrid}><div className={styles.decision}><strong>Support</strong><span>Antwortentwurf</span></div><div className={styles.decision}><strong>Sales</strong><span>Owner zuweisen</span></div><div className={styles.decision}><strong>Ops</strong><span>Freigabe nötig</span></div></div></motion.div>;
  if (phase === 2) return <motion.div key="handoff" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit"><span className={styles.kicker}>Mit Human-in-the-loop</span><div className={styles.approval}><span className={styles.avatar}>AM</span><div><strong>Freigabe angefragt</strong><span>CRM-Update + Mail-Entwurf</span></div><b>Review</b></div><p className={styles.insight}>Wo nötig mit Regeln, Logging und klaren Zuständigkeiten.</p></motion.div>;
  return <motion.div key="done" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit"><span className={styles.kicker}>Ausführung</span><div className={styles.doneGrid}>{['Ticket aktualisiert', 'CRM geschrieben', 'Mail vorbereitet', 'SLA eingehalten'].map((item) => <div key={item} className={styles.doneItem}><span className={styles.doneDot} />{item}</div>)}</div></motion.div>;
}

export function WorkflowAgentDeskVisual() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(reduce ? STATES.length - 1 : 0);
  useEffect(() => { if (reduce) return undefined; const id = window.setInterval(() => setPhase((current) => (current + 1) % STATES.length), 3200); return () => window.clearInterval(id); }, [reduce]);
  return <div className={styles.panel} role="img" aria-label="Animation: Ein Workflow Agent nimmt Eingänge an, triagiert, holt Freigaben und führt Aktionen in Systemen aus."><div className={styles.head}><span className={styles.live} aria-hidden="true" /><span className={styles.headLabel}>Operations Desk</span><span className={styles.headPhase}>{STATES[phase].label}</span></div><div className={styles.steps}>{STATES.map((item, index) => <div key={item.id} className={`${styles.step} ${index === phase ? styles.stepActive : index < phase ? styles.stepDone : ''}`}>{item.label}</div>)}</div><div className={styles.stage}><AnimatePresence mode="wait"><Detail key={STATES[phase].id} phase={phase} reduce={!!reduce} /></AnimatePresence></div></div>;
}
