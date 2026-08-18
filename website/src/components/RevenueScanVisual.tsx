import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DURATION, EASE, fadeIn, slidePanel } from "../motion";
import styles from "./RevenueScanVisual.module.css";

const ACCOUNTS = [
  { name: "Nordwerk AG", domain: "nordwerk.de", crm: "HubSpot" },
  { name: "Helio Media", domain: "heliomedia.ch", crm: "Salesforce" },
  { name: "Quanta Labs", domain: "quantalabs.io", crm: "Pipedrive" },
];

const MODULES = [
  { id: "crm", label: "CRM-Scan" },
  { id: "seo", label: "SEO" },
  { id: "tech", label: "Technical" },
  { id: "perf", label: "Performance" },
  { id: "funnel", label: "Funnel" },
  { id: "design", label: "Design Audit" },
] as const;

const FUNNEL = [
  { label: "Besuch", value: 100 },
  { label: "Angebot", value: 54 },
  { label: "Formular", value: 19 },
  { label: "Abschluss", value: 7 },
];

const PHASE_MS = 2200;
const TARGET_INDEX = 1;

function ModuleIcon({ id }: { id: string }) {
  switch (id) {
    case "crm":
      return (
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M5 7h6M5 10h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "seo":
      return (
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="7" cy="7" r="4" stroke="currentColor" strokeWidth="1.2" />
          <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "tech":
      return (
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 5l-2 3 2 3M12 5l2 3-2 3M9 3L7 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "perf":
      return (
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 12l3.5-5 2.5 3L13 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "funnel":
      return (
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 3h10l-3.2 5.2v4.3L7.2 14V8.2L3 3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M6 9l1.5 1.5L10 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

function PhaseDetail({ phase, reduce }: { phase: number; reduce: boolean }) {
  const variants = reduce ? fadeIn : slidePanel;

  if (phase === 0) {
    return (
      <motion.div key="crm" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit">
        <span className={styles.detailKicker}>CRM-Scan</span>
        <p>Lesender Zugriff auf Datensatz, Pipeline und letzte Aktivitäten. Keine Migration.</p>
      </motion.div>
    );
  }

  if (phase === 1) {
    return (
      <motion.div key="seo" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit">
        <span className={styles.detailKicker}>SEO-Analyse</span>
        <ul>
          <li>Title-Tag identisch auf 14 Seiten</li>
          <li>Preisseite ohne H1</li>
        </ul>
      </motion.div>
    );
  }

  if (phase === 2) {
    return (
      <motion.div key="tech" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit">
        <span className={styles.detailKicker}>Technical Scan</span>
        <ul>
          <li>3 kaputte Canonicals</li>
          <li>JS-Bundle blockiert First Paint</li>
        </ul>
      </motion.div>
    );
  }

  if (phase === 3) {
    return (
      <motion.div key="perf" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit">
        <span className={styles.detailKicker}>Performance</span>
        <div className={styles.metricRow}>
          <div>
            <strong>4.8s</strong>
            <span>LCP Mobile</span>
          </div>
          <div>
            <strong>0.21</strong>
            <span>CLS</span>
          </div>
        </div>
      </motion.div>
    );
  }

  if (phase === 4) {
    return (
      <motion.div key="funnel" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit">
        <span className={styles.detailKicker}>Funnel</span>
        <div className={styles.funnel}>
          {FUNNEL.map((stage, i) => {
            const prev = FUNNEL[i - 1];
            const drop = prev ? prev.value - stage.value : 0;
            const isLeak = i === 2;
            return (
              <div key={stage.label} className={`${styles.funnelRow} ${isLeak ? styles.funnelLeak : ""}`}>
                <span className={styles.funnelLabel}>{stage.label}</span>
                <div className={styles.funnelTrack}>
                  <motion.div
                    className={styles.funnelFill}
                    initial={reduce ? false : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: DURATION.slow, ease: EASE.outExpo, delay: i * 0.06 }}
                    style={{ width: `${stage.value}%` }}
                  />
                </div>
                <span className={styles.funnelValue}>
                  {stage.value}%
                  {isLeak && <em> −{drop} Punkte</em>}
                </span>
              </div>
            );
          })}
        </div>
        <p className={styles.leakNote}>Größter Verlust: Angebot zu Formular.</p>
      </motion.div>
    );
  }

  return (
    <motion.div key="design" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit">
      <span className={styles.detailKicker}>Design Audit</span>
      <ul>
        <li>Primär-CTA unter dem Fold</li>
        <li>Kontrast auf Buttons zu schwach</li>
        <li>Mobile Nav verdeckt das Formular</li>
      </ul>
    </motion.div>
  );
}

export function RevenueScanVisual() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(reduce ? MODULES.length - 1 : 0);

  useEffect(() => {
    if (reduce) return undefined;
    const id = window.setInterval(() => {
      setPhase((current) => (current + 1) % MODULES.length);
    }, PHASE_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  const activeModule = MODULES[phase];

  return (
    <div
      className={styles.panel}
      role="img"
      aria-label="Animation: Ein CRM-Datensatz wird gescannt und um SEO, Technical Scan, Performance, Funnel-Verlust und Design Audit angereichert."
    >
      <div className={styles.head}>
        <span className={styles.live} aria-hidden="true" />
        <span className={styles.headLabel}>Signal-Scan</span>
        <span className={styles.headPhase}>
          {String(phase + 1).padStart(2, "0")}/{String(MODULES.length).padStart(2, "0")} {activeModule.label}
        </span>
      </div>

      <div className={styles.crm}>
        <div className={styles.crmList}>
          {ACCOUNTS.map((account, index) => {
            const isTarget = index === TARGET_INDEX;
            return (
              <div
                key={account.domain}
                className={`${styles.account} ${isTarget ? styles.accountActive : ""}`}
              >
                <span className={styles.accountName}>{account.name}</span>
                <span className={styles.accountMeta}>{account.domain}</span>
                <span className={styles.accountCrm}>{account.crm}</span>
              </div>
            );
          })}
          {!reduce && phase === 0 && (
            <motion.div
              className={styles.scanLine}
              initial={{ y: 6, opacity: 0 }}
              animate={{ y: 92, opacity: [0, 1, 1, 0] }}
              transition={{ duration: DURATION.hero + DURATION.slow, ease: EASE.outSmooth }}
              aria-hidden="true"
            />
          )}
        </div>
      </div>

      <div className={styles.modules} aria-hidden="true">
        {MODULES.map((mod, index) => {
          const stateClass =
            index < phase ? styles.module_done : index === phase ? styles.module_active : styles.module_idle;
          return (
            <div key={mod.id} className={`${styles.module} ${stateClass}`}>
              <ModuleIcon id={mod.id} />
              <span>{mod.label}</span>
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
