import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { fadeIn, slidePanel } from "../motion";
import styles from "./McpLayerVisual.module.css";

const PHASES = [
  { id: "systems", label: "Systems" },
  { id: "layer", label: "MCP Layer" },
  { id: "policy", label: "Policy" },
  { id: "actions", label: "Actions" },
] as const;

function Detail({ phase, reduce }: { phase: number; reduce: boolean }) {
  const variants = reduce ? fadeIn : slidePanel;
  if (phase === 0) return <motion.div key="systems" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit"><span className={styles.kicker}>Bestehende Systeme</span><div className={styles.systemGrid}>{['CRM', 'ERP', 'CMS', 'Tickets', 'Storage', 'Billing'].map((item) => <span key={item} className={styles.system}>{item}</span>)}</div><p className={styles.insight}>Heute oft verteilt, jeweils mit eigener Logik und eigener API.</p></motion.div>;
  if (phase === 1) return <motion.div key="layer" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit"><span className={styles.kicker}>Ein standardisierter Layer</span><div className={styles.stack}><span>Resources</span><span>Tools</span><span>Prompts</span><span>Auth</span></div><p className={styles.insight}>Ein Einstiegspunkt für Agents statt fragiler Einzelanbindungen.</p></motion.div>;
  if (phase === 2) return <motion.div key="policy" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit"><span className={styles.kicker}>Policy und Kontrolle</span><div className={styles.policyList}>{['Scopes', 'OAuth', 'Audit Log', 'Read / Write'].map((item) => <div key={item} className={styles.policyItem}><span className={styles.policyDot} />{item}</div>)}</div></motion.div>;
  return <motion.div key="actions" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit"><span className={styles.kicker}>Agentische Nutzung</span><div className={styles.actionFlow}><div><strong>Fragen</strong><span>read customer</span></div><div><strong>Prüfen</strong><span>policy + scope</span></div><div><strong>Schreiben</strong><span>ticket update</span></div></div><p className={styles.insight}>Kontrollierte Read- und Write-Operationen, auditierbar und erweiterbar.</p></motion.div>;
}

export function McpLayerVisual() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(reduce ? PHASES.length - 1 : 0);
  useEffect(() => { if (reduce) return undefined; const id = window.setInterval(() => setPhase((current) => (current + 1) % PHASES.length), 3200); return () => window.clearInterval(id); }, [reduce]);
  return <div className={styles.panel} role="img" aria-label="Animation: Unternehmenssysteme werden über einen MCP-Layer mit Auth, Policy und Actions für Agents zugänglich."><div className={styles.head}><span className={styles.live} aria-hidden="true" /><span className={styles.headLabel}>MCP</span><span className={styles.headPhase}>{PHASES[phase].label}</span></div><div className={styles.track}>{PHASES.map((item, index) => <div key={item.id} className={`${styles.step} ${index === phase ? styles.stepActive : index < phase ? styles.stepDone : ''}`}>{item.label}</div>)}</div><div className={styles.stage}><AnimatePresence mode="wait"><Detail key={PHASES[phase].id} phase={phase} reduce={!!reduce} /></AnimatePresence></div></div>;
}
