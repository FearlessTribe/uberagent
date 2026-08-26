import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DURATION, EASE, fadeIn, slidePanel } from "../motion";
import styles from "./GiftingAgentVisual.module.css";

const STEPS = [
  { id: "install", label: "Installieren" },
  { id: "budget", label: "Budget" },
  { id: "detect", label: "Anlässe" },
  { id: "suggest", label: "Vorschlagen" },
  { id: "approve", label: "Bestätigen" },
] as const;

const BUDGETS = [
  { label: "Standard", value: "2.400 €", width: "32%" },
  { label: "Ostern", value: "4.800 €", width: "52%" },
  { label: "Weihnachten", value: "9.600 €", width: "100%" },
];

const RULES = ["Sortiment vom Hersteller", "Unter 50 €", "Ausnahmen mit Bestätigung"];

const OCCASIONS = [
  { mark: "25", company: "Müller GmbH", type: "Jubiläum", when: "12.09.", gift: "Leder-Notizbuch", price: "48 €" },
  { mark: "NW", company: "Nordwind AG", type: "Projekt", when: "18.09.", gift: "Espresso-Set", price: "39 €" },
  { mark: "CK", company: "C. Keller", type: "Geburtstag", when: "22.09.", gift: "Füllhalter", price: "44 €" },
];

const PHASE_MS = 3200;
const TARGET_INDEX = 0;

function PhaseDetail({ phase, reduce }: { phase: number; reduce: boolean }) {
  const variants = reduce ? fadeIn : slidePanel;
  const occasion = OCCASIONS[TARGET_INDEX];

  if (phase === 0) {
    return (
      <motion.div key="install" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit">
        <span className={styles.detailKicker}>Marketplace beim Kunden</span>
        <div className={styles.hubSpotLive}>
          <img src="/logos/hubspot.svg" alt="" width={88} height={26} />
          <div>
            <strong>HubSpot</strong>
            <p>App freigeben · nichts vor Ort</p>
          </div>
          <span className={styles.hubSpotBadge}>Live</span>
        </div>
        <p className={styles.insight}>Salesforce, Pipedrive und Dynamics folgen.</p>
      </motion.div>
    );
  }

  if (phase === 1) {
    return (
      <motion.div key="budget" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit">
        <span className={styles.detailKicker}>Budget und Regeln vom Kunden</span>
        <div className={styles.budgetList}>
          {BUDGETS.map((item, index) => (
            <motion.div
              key={item.label}
              className={styles.budgetRow}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.normal, ease: EASE.outExpo, delay: reduce ? 0 : index * 0.08 }}
            >
              <span>{item.label}</span>
              <span className={styles.budgetBarTrack}>
                <span className={styles.budgetBar} style={{ width: item.width }} />
              </span>
              <strong>{item.value}</strong>
            </motion.div>
          ))}
        </div>
        <div className={styles.ruleRow}>
          {RULES.map((rule) => (
            <span key={rule} className={styles.ruleChip}>{rule}</span>
          ))}
        </div>
      </motion.div>
    );
  }

  if (phase === 2) {
    return (
      <motion.div key="detect" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit">
        <span className={styles.detailKicker}>Anlässe im Monat</span>
        <div className={styles.occasionList}>
          {OCCASIONS.map((item, index) => (
            <motion.div
              key={item.company}
              className={`${styles.occasion} ${index === TARGET_INDEX ? styles.occasionHot : ""}`}
              initial={reduce ? false : { opacity: 0.4 }}
              animate={{ opacity: 1 }}
              transition={{ duration: DURATION.normal, ease: EASE.outExpo, delay: reduce ? 0 : index * 0.08 }}
            >
              <span className={styles.occasionType}>{item.type}</span>
              <strong>{item.company}</strong>
              <span>{item.when}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (phase === 3) {
    return (
      <motion.div key="suggest" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit">
        <span className={styles.detailKicker}>Vorschlag aus Ihrem Sortiment</span>
        <div className={styles.giftCard}>
          <span className={styles.giftThumb} aria-hidden="true">
            <span className={styles.giftThumbSpine} />
            <span className={styles.giftThumbCover} />
          </span>
          <div>
            <strong>{occasion.gift}</strong>
            <p>
              {occasion.company} · {occasion.type}
            </p>
          </div>
          <span className={styles.giftPrice}>{occasion.price}</span>
        </div>
        <p className={styles.insight}>Im Budget, unter 50 Euro. Nur in Ausnahmen darüber.</p>
      </motion.div>
    );
  }

  return (
    <motion.div key="approve" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit">
      <span className={styles.detailKicker}>Account Manager Ihres Kunden</span>
      <div className={styles.approveRow}>
        <div className={styles.approveWho}>
          <span className={styles.approveAvatar}>SB</span>
          <div>
            <strong>S. Berger, Müller GmbH</strong>
            <p>Bestätigung ausstehend</p>
          </div>
        </div>
        <motion.span
          className={styles.approveSeal}
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: DURATION.slow, ease: EASE.outExpo, delay: reduce ? 0 : 0.35 }}
        >
          Bestätigt
        </motion.span>
      </div>
      <p className={styles.insight}>Bestätigt: Bestellung landet in Ihren Systemen.</p>
    </motion.div>
  );
}

export function GiftingAgentVisual() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(reduce ? STEPS.length - 1 : 0);

  useEffect(() => {
    if (reduce) return undefined;
    const id = window.setInterval(() => {
      setPhase((current) => (current + 1) % STEPS.length);
    }, PHASE_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  const active = STEPS[phase];

  return (
    <div
      className={styles.panel}
      role="img"
      aria-label="Animation: HubSpot-App installieren, Kundenbudget festlegen, Anlässe finden, Geschenk vorschlagen, Account Manager bestätigt, Bestellung in Ihren Systemen."
    >
      <div className={styles.head}>
        <span className={styles.live} aria-hidden="true" />
        <span className={styles.headLabel}>Monatslauf</span>
        <span className={styles.headPhase}>
          {String(phase + 1).padStart(2, "0")}/{String(STEPS.length).padStart(2, "0")} {active.label}
        </span>
      </div>

      <div className={styles.steps} aria-hidden="true">
        {STEPS.map((step, index) => {
          const stateClass =
            index < phase ? styles.stepDone : index === phase ? styles.stepActive : styles.stepIdle;
          return (
            <div key={step.id} className={`${styles.step} ${stateClass}`}>
              {step.label}
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
