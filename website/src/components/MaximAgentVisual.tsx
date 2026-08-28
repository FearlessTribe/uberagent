import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { maximAgentPhases } from "../data/maximCalc";
import { DURATION, EASE, fadeIn, slidePanel } from "../motion";
import styles from "./MaximAgentVisual.module.css";

const PHASE_MS = 3200;

type PhaseData = (typeof maximAgentPhases)[number];

function PhaseDetail({ phase, reduce }: { phase: number; reduce: boolean }) {
  const data = maximAgentPhases[phase];
  const variants = reduce ? fadeIn : slidePanel;

  if (data.id === "prices") {
    return (
      <motion.div
        key={data.id}
        className={styles.detail}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <span className={styles.kicker}>{data.kicker}</span>
        <div className={styles.supplierRow}>
          <span className={styles.liveBadge}>Live</span>
          <span className={styles.supplierLabel}>Tagespreise</span>
          <div className={styles.supplierChips}>
            {data.suppliers.map((name) => (
              <span key={name} className={styles.chip}>
                {name}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.priceList}>
          {data.priceRows.map((row, index) => (
            <motion.div
              key={row.part}
              className={styles.priceRow}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DURATION.normal,
                ease: EASE.outSmooth,
                delay: reduce ? 0 : index * 0.08,
              }}
            >
              <div>
                <strong>{row.part}</strong>
                <span>{row.updated}</span>
              </div>
              <strong>{row.price}</strong>
            </motion.div>
          ))}
        </div>
        <p className={styles.insight}>{data.insight}</p>
      </motion.div>
    );
  }

  if (data.id === "logic") {
    return (
      <motion.div
        key={data.id}
        className={styles.detail}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <span className={styles.kicker}>{data.kicker}</span>
        <div className={styles.ruleGrid}>
          {data.rules.map((rule, index) => (
            <motion.span
              key={rule}
              className={styles.ruleChip}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DURATION.normal,
                ease: EASE.outSmooth,
                delay: reduce ? 0 : index * 0.06,
              }}
            >
              {rule}
            </motion.span>
          ))}
        </div>
        <p className={styles.insight}>{data.insight}</p>
      </motion.div>
    );
  }

  if (data.id === "clarify") {
    return (
      <motion.div
        key={data.id}
        className={styles.detail}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <span className={styles.kicker}>{data.kicker}</span>
        <div className={styles.chat}>
          {data.messages.map((message, index) => (
            <motion.div
              key={message.text}
              className={`${styles.bubble} ${message.from === "maxim" ? styles.bubbleMaxim : styles.bubbleTeam}`}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DURATION.normal,
                ease: EASE.outSmooth,
                delay: reduce ? 0 : index * 0.12,
              }}
            >
              <span className={styles.bubbleFrom}>
                {message.from === "maxim" ? "Maxim" : "Team"}
              </span>
              <p>{message.text}</p>
            </motion.div>
          ))}
        </div>
        <p className={styles.flagged}>{data.flagged}</p>
        <p className={styles.insight}>{data.insight}</p>
      </motion.div>
    );
  }

  if (data.id === "handoff") {
    return (
      <motion.div
        key={data.id}
        className={styles.detail}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <span className={styles.kicker}>{data.kicker}</span>
        <div className={styles.handoffCard}>
          <div>
            <strong>{data.openPoint}</strong>
            <span>{data.assignee}</span>
          </div>
          <motion.span
            className={styles.handoffStatus}
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: DURATION.slow, ease: EASE.outSmooth, delay: reduce ? 0 : 0.3 }}
          >
            {data.status}
          </motion.span>
        </div>
        <p className={styles.insight}>{data.insight}</p>
      </motion.div>
    );
  }

  const scheduleData = data as Extract<PhaseData, { id: "schedule" }>;
  return (
    <motion.div
      key={scheduleData.id}
      className={styles.detail}
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <span className={styles.kicker}>{scheduleData.kicker}</span>
      <div className={styles.appointmentList}>
        {scheduleData.appointments.map((item, index) => (
          <motion.div
            key={item.who}
            className={styles.appointment}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: DURATION.normal,
              ease: EASE.outSmooth,
              delay: reduce ? 0 : index * 0.1,
            }}
          >
            <strong>{item.who}</strong>
            <span>{item.slot}</span>
          </motion.div>
        ))}
      </div>
      <p className={styles.insight}>{scheduleData.insight}</p>
    </motion.div>
  );
}

export function MaximAgentVisual() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(reduce ? maximAgentPhases.length - 1 : 0);

  useEffect(() => {
    if (reduce) return undefined;
    const id = window.setInterval(() => {
      setPhase((current) => (current + 1) % maximAgentPhases.length);
    }, PHASE_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  const active = maximAgentPhases[phase];

  return (
    <div
      className={styles.panel}
      role="img"
      aria-label="Animation: Maxim holt tagesaktuelle Herstellerpreise, kennt Ihre Preisstruktur, fragt bei Unklarheiten nach, bindet Sie bei offenen Punkten ein und setzt Termine."
    >
      <div className={styles.head}>
        <span className={styles.live} aria-hidden="true" />
        <span className={styles.headLabel}>Kalkulations-Agent</span>
        <span className={styles.headPhase}>
          {String(phase + 1).padStart(2, "0")}/{String(maximAgentPhases.length).padStart(2, "0")}{" "}
          {active.label}
        </span>
      </div>

      <div className={styles.steps} aria-hidden="true">
        {maximAgentPhases.map((step, index) => {
          const stateClass =
            index < phase ? styles.stepDone : index === phase ? styles.stepActive : styles.stepIdle;
          return (
            <div key={step.id} className={`${styles.step} ${stateClass}`}>
              {step.label}
            </div>
          );
        })}
      </div>

      <div className={styles.stage}>
        <AnimatePresence mode="wait">
          <PhaseDetail key={phase} phase={phase} reduce={!!reduce} />
        </AnimatePresence>
      </div>
    </div>
  );
}
