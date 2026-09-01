import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { fadeIn, slidePanel } from "../motion";
import styles from "./CopilotAgentVisual.module.css";

const STATES = [
  { id: "inbox", label: "Inbox" },
  { id: "triage", label: "Triage" },
  { id: "handoff", label: "Handoff" },
  { id: "done", label: "Done" },
] as const;

function Detail({ phase, reduce }: { phase: number; reduce: boolean }) {
  const variants = reduce ? fadeIn : slidePanel;

  if (phase === 0) {
    return (
      <motion.div
        key="inbox"
        className={styles.detail}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <span className={styles.kicker}>Teams · Outlook</span>
        <div className={styles.queue}>
          {["Outlook: Service-Anfrage", "Teams: Formular", "CRM: Renewal-Signal"].map(
            (item) => (
              <div key={item} className={styles.queueItem}>
                {item}
              </div>
            ),
          )}
        </div>
      </motion.div>
    );
  }

  if (phase === 1) {
    return (
      <motion.div
        key="triage"
        className={styles.detail}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <span className={styles.kicker}>Copilot Studio</span>
        <div className={styles.decisionGrid}>
          <div className={styles.decision}>
            <strong>Support</strong>
            <span>Antwortentwurf</span>
          </div>
          <div className={styles.decision}>
            <strong>Sales</strong>
            <span>Owner zuweisen</span>
          </div>
          <div className={styles.decision}>
            <strong>Ops</strong>
            <span>Freigabe nötig</span>
          </div>
        </div>
      </motion.div>
    );
  }

  if (phase === 2) {
    return (
      <motion.div
        key="handoff"
        className={styles.detail}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <span className={styles.kicker}>Freigabe in Teams</span>
        <div className={styles.approval}>
          <div className={styles.approvalTop}>
            <span className={styles.avatar}>AM</span>
            <div>
              <strong>CRM-Update + Mail-Entwurf</strong>
              <span>Owner · Service-Leitung</span>
            </div>
          </div>
          <div className={styles.chipRow}>
            <span className={styles.chip}>SharePoint</span>
            <span className={styles.chip}>Outlook</span>
          </div>
          <div className={styles.actionRow}>
            <span className={`${styles.actionBtn} ${styles.actionPrimary}`}>Freigeben</span>
            <span className={styles.actionBtn}>Ablehnen</span>
          </div>
        </div>
        <p className={styles.insight}>Nichts wird geschrieben ohne menschliche Freigabe.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="done"
      className={styles.detail}
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <span className={styles.kicker}>Ausführung</span>
      <div className={styles.doneGrid}>
        {["Ticket aktualisiert", "CRM geschrieben", "Mail vorbereitet", "Protokoll"].map(
          (item) => (
            <div key={item} className={styles.doneItem}>
              <span className={styles.doneDot} />
              {item}
            </div>
          ),
        )}
      </div>
    </motion.div>
  );
}

export function CopilotAgentVisual() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(reduce ? 2 : 0);

  useEffect(() => {
    if (reduce) return undefined;
    const id = window.setInterval(
      () => setPhase((current) => (current + 1) % STATES.length),
      3500,
    );
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div
      className={styles.panel}
      role="img"
      aria-label="Animation: Copilot-Studio-Agent in Microsoft 365 mit Freigabe in Teams vor Schreibvorgängen."
    >
      <div className={styles.head}>
        <span className={styles.live} aria-hidden="true" />
        <span className={styles.headLabel}>Copilot Studio</span>
        <span className={styles.headPhase}>{STATES[phase].label}</span>
      </div>
      <div className={styles.steps}>
        {STATES.map((item, index) => (
          <div
            key={item.id}
            className={`${styles.step} ${
              index === phase
                ? styles.stepActive
                : index < phase
                  ? styles.stepDone
                  : ""
            }`}
          >
            {item.label}
          </div>
        ))}
      </div>
      <div className={styles.stage}>
        <AnimatePresence mode="wait">
          <Detail key={STATES[phase].id} phase={phase} reduce={!!reduce} />
        </AnimatePresence>
      </div>
    </div>
  );
}
