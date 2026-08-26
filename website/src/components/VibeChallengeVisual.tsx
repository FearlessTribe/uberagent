import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DURATION, EASE, fadeIn, slidePanel } from "../motion";
import styles from "./VibeChallengeVisual.module.css";

const WEEKS = [
  { id: "rahmen", label: "Woche 0", short: "Rahmen" },
  { id: "ideen", label: "Woche 1", short: "Ideen" },
  { id: "build", label: "Woche 2-3", short: "Build" },
  { id: "jury", label: "Woche 4", short: "Jury" },
] as const;

const TEAMS = [
  { mark: "E", name: "Team Einkauf", case: "Bestellabgleich", saving: "47.000 €" },
  { mark: "C", name: "Team Controlling", case: "Monatsreport", saving: "31.000 €" },
  { mark: "S", name: "Team Service", case: "Ticket-Triage", saving: "22.000 €" },
];

const CHECKS = [
  { label: "IT-Freigabe", state: "Sandbox bereit" },
  { label: "Compliance", state: "AVV unterzeichnet" },
  { label: "Betriebsrat", state: "Mitbestimmung ok" },
  { label: "Tool-Liste", state: "3 Werkzeuge frei" },
];

const IDEAS = [
  { team: "Einkauf", text: "Bestellungen doppelt erfassen" },
  { team: "Controlling", text: "Monatsreport zusammenkopieren" },
  { team: "Service", text: "Standardtickets manuell triagieren" },
];

const SCORES = [
  { name: "Wirtschaft", value: 38 },
  { name: "Umsetzbarkeit", value: 22 },
  { name: "Transfer", value: 18 },
  { name: "Reife", value: 12 },
];

const PHASE_MS = 3400;
const WINNER = TEAMS[0];

function PhaseDetail({ phase, reduce }: { phase: number; reduce: boolean }) {
  const variants = reduce ? fadeIn : slidePanel;

  if (phase === 0) {
    return (
      <motion.div key="rahmen" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit">
        <span className={styles.detailKicker}>Rahmen setzen</span>
        <div className={styles.checks}>
          {CHECKS.map((item, index) => (
            <motion.div
              key={item.label}
              className={styles.check}
              initial={reduce ? false : { opacity: 0.35 }}
              animate={{ opacity: 1 }}
              transition={{ duration: DURATION.normal, ease: EASE.outExpo, delay: reduce ? 0 : index * 0.12 }}
            >
              <span className={styles.checkMark} aria-hidden="true" />
              <strong>{item.label}</strong>
              <span>{item.state}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (phase === 1) {
    return (
      <motion.div key="ideen" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit">
        <span className={styles.detailKicker}>Was nervt Sie jeden Montag?</span>
        <div className={styles.ideas}>
          {IDEAS.map((idea, index) => (
            <motion.div
              key={idea.team}
              className={styles.idea}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.normal, ease: EASE.outExpo, delay: reduce ? 0 : index * 0.1 }}
            >
              <span>{idea.team}</span>
              <strong>{idea.text}</strong>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (phase === 2) {
    return (
      <motion.div key="build" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit">
        <span className={styles.detailKicker}>Build in der Sandbox</span>
        <div className={styles.builds}>
          {TEAMS.map((team, index) => {
            const progress = [86, 64, 71][index];
            return (
              <div key={team.name} className={styles.build}>
                <div className={styles.buildTop}>
                  <strong>{team.case}</strong>
                  <span>{progress}%</span>
                </div>
                <div className={styles.track}>
                  <motion.span
                    className={styles.fill}
                    initial={reduce ? { scaleX: progress / 100 } : { scaleX: 0 }}
                    animate={{ scaleX: progress / 100 }}
                    transition={{ duration: DURATION.slow, ease: EASE.outExpo, delay: reduce ? 0 : 0.08 + index * 0.08 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div key="jury" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit">
      <span className={styles.detailKicker}>Jury & Innovationspreis</span>
      <div className={styles.winner}>
        <span className={styles.winnerMark}>{WINNER.mark}</span>
        <div>
          <strong>{WINNER.name}</strong>
          <span>{WINNER.case} · {WINNER.saving}/Jahr</span>
        </div>
      </div>
      <div className={styles.scores}>
        {SCORES.map((score, index) => (
          <div key={score.name} className={styles.score}>
            <span>{score.name}</span>
            <div className={styles.track}>
              <motion.span
                className={styles.fill}
                initial={reduce ? { scaleX: score.value / 40 } : { scaleX: 0 }}
                animate={{ scaleX: score.value / 40 }}
                transition={{ duration: DURATION.slow, ease: EASE.outExpo, delay: reduce ? 0 : 0.06 + index * 0.06 }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function VibeChallengeVisual() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(reduce ? WEEKS.length - 1 : 0);

  useEffect(() => {
    if (reduce) return undefined;
    const id = window.setInterval(() => {
      setPhase((current) => (current + 1) % WEEKS.length);
    }, PHASE_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  const week = WEEKS[phase];

  return (
    <div
      className={styles.panel}
      role="img"
      aria-label="Animation: Die Vibe Coding Challenge in vier Wochen, von Rahmen und Ideen über den Build bis zur Jury."
    >
      <div className={styles.head}>
        <span className={styles.live} aria-hidden="true" />
        <span className={styles.headLabel}>Challenge</span>
        <span className={styles.headPhase}>
          {week.label} · {week.short}
        </span>
      </div>

      <div className={styles.weeks} aria-hidden="true">
        {WEEKS.map((item, index) => {
          const stateClass =
            index < phase ? styles.weekDone : index === phase ? styles.weekActive : styles.weekIdle;
          return (
            <div key={item.id} className={`${styles.week} ${stateClass}`}>
              {item.short}
            </div>
          );
        })}
      </div>

      <div className={styles.teams} aria-hidden="true">
        {TEAMS.map((team, index) => {
          const isWinner = phase === 3 && index === 0;
          const isActive = phase === 1 || phase === 2 || isWinner;
          return (
            <div
              key={team.name}
              className={`${styles.team} ${isActive ? styles.teamActive : ""} ${isWinner ? styles.teamWinner : ""}`}
            >
              <span className={styles.teamMark}>{team.mark}</span>
              <span className={styles.teamName}>{team.name}</span>
              <span className={styles.teamMeta}>{team.case}</span>
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <PhaseDetail key={phase} phase={phase} reduce={!!reduce} />
      </AnimatePresence>
    </div>
  );
}
