import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DURATION, EASE, fadeIn, slidePanel } from "../motion";
import styles from "./RevenueScanVisual.module.css";

const ACCOUNTS = [
  { name: "Silberfuchs Studio", domain: "silberfuchs.studio", crm: "HubSpot", mark: "S" },
  { name: "Kieferrot", domain: "kieferrot.ch", crm: "Pipedrive", mark: "K" },
  { name: "Papierwolf", domain: "papierwolf.de", crm: "Salesforce", mark: "P" },
  { name: "Lumenatelier", domain: "lumenatelier.com", crm: "HubSpot", mark: "L" },
];

const MODULES = [
  { id: "crm", label: "CRM-Scan" },
  { id: "seo", label: "SEO" },
  { id: "tech", label: "Technical" },
  { id: "perf", label: "Performance" },
  { id: "funnel", label: "Funnel" },
  { id: "design", label: "Design Audit" },
] as const;

const KEYWORDS = [
  { query: "branding agentur zürich", you: 12, rival: 2, rivalName: "Echoatelier" },
  { query: "corporate design kmu", you: 7, rival: 1, rivalName: "Nachtgold" },
  { query: "markenworkshop", you: 24, rival: 4, rivalName: "Echoatelier" },
];

const CAMPAIGNS = [
  { channel: "Google", name: "Brand Search", roas: 4.2, cpa: 38, ctr: 5.1, share: 88, weak: false },
  { channel: "Meta", name: "Lead Ads", roas: 1.1, cpa: 92, ctr: 0.8, share: 28, weak: true },
  { channel: "LinkedIn", name: "Thought Leadership", roas: 0.6, cpa: 140, ctr: 0.4, share: 14, weak: true },
];

const FUNNEL = [
  { label: "Besuch", value: 100 },
  { label: "Angebot", value: 54 },
  { label: "Formular", value: 19 },
  { label: "Abschluss", value: 7 },
];

const TECH_CHECKS = [
  { label: "HTTPS & Headers", ok: true },
  { label: "Sitemap", ok: true },
  { label: "Schema Markup", ok: false },
  { label: "Broken Links", ok: false },
];

const PHASE_MS = 3200;
const SCAN_MS = 700;
const TARGET_INDEX = 0;

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

function PhaseDetail({
  phase,
  reduce,
  scanIndex,
}: {
  phase: number;
  reduce: boolean;
  scanIndex: number;
}) {
  const variants = reduce ? fadeIn : slidePanel;
  const target = ACCOUNTS[TARGET_INDEX];
  const scanning = ACCOUNTS[scanIndex] ?? target;

  if (phase === 0) {
    return (
      <motion.div key="crm" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit">
        <span className={styles.detailKicker}>CRM-Scan</span>
        <div className={styles.crmFocus}>
          <span className={styles.mark}>{scanning.mark}</span>
          <div>
            <strong>{scanning.name}</strong>
            <span>{scanning.domain} · {scanning.crm}</span>
          </div>
        </div>
        <div className={styles.crmFields}>
          <span>Kontakt</span>
          <span>Pipeline</span>
          <span>Letzter Deal</span>
          <span>Retainer</span>
        </div>
      </motion.div>
    );
  }

  if (phase === 1) {
    return (
      <motion.div key="seo" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit">
        <span className={styles.detailKicker}>SEO · Keyword, Ranking, Konkurrenz</span>
        <div className={styles.keywordTable}>
          {KEYWORDS.map((row, i) => (
            <motion.div
              key={row.query}
              className={styles.keywordRow}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.normal, ease: EASE.outExpo, delay: i * 0.06 }}
            >
              <span className={styles.keywordQuery}>{row.query}</span>
              <div className={styles.rankPair}>
                <span className={styles.rankYou}>#{row.you}</span>
                <span className={styles.rankRival}>
                  {row.rivalName} #{row.rival}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        <p className={styles.insight}>Lücke: 3 Keywords, bei denen die Konkurrenz auf Seite 1 steht.</p>
      </motion.div>
    );
  }

  if (phase === 2) {
    return (
      <motion.div key="tech" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit">
        <span className={styles.detailKicker}>Technical Scan</span>
        <div className={styles.checkGrid}>
          {TECH_CHECKS.map((item, i) => (
            <motion.div
              key={item.label}
              className={`${styles.check} ${item.ok ? styles.checkOk : styles.checkFail}`}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.fast, ease: EASE.outExpo, delay: i * 0.06 }}
            >
              <span className={styles.checkDot} />
              {item.label}
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (phase === 3) {
    return (
      <motion.div key="perf" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit">
        <span className={styles.detailKicker}>Performance Marketing</span>
        <div className={styles.campaigns}>
          {CAMPAIGNS.map((camp, i) => (
            <motion.div
              key={camp.name}
              className={`${styles.campaign} ${camp.weak ? styles.campaignWeak : ""}`}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.normal, ease: EASE.outExpo, delay: i * 0.06 }}
            >
              <div className={styles.campaignHead}>
                <span className={styles.campaignChannel}>{camp.channel}</span>
                <span className={styles.campaignName}>{camp.name}</span>
              </div>
              <div className={styles.campaignBar}>
                <motion.div
                  className={styles.campaignFill}
                  initial={reduce ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: DURATION.slow, ease: EASE.outExpo, delay: 0.08 + i * 0.06 }}
                  style={{ width: `${camp.share}%` }}
                />
              </div>
              <div className={styles.campaignKpis}>
                <span>ROAS {camp.roas.toFixed(1)}</span>
                <span>CPA {camp.cpa} €</span>
                <span>CTR {camp.ctr}%</span>
              </div>
            </motion.div>
          ))}
        </div>
        <p className={styles.insight}>68% des Budgets sitzt auf Kampagnen unter ROAS 1.2.</p>
      </motion.div>
    );
  }

  if (phase === 4) {
    return (
      <motion.div key="funnel" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit">
        <span className={styles.detailKicker}>Funnel · wo der Verlust sitzt</span>
        <div className={styles.funnelVisual} aria-hidden="true">
          {FUNNEL.map((stage, i) => {
            const width = 100 - i * 16;
            const isLeak = i === 2;
            return (
              <motion.div
                key={stage.label}
                className={`${styles.funnelStage} ${isLeak ? styles.funnelStageLeak : ""}`}
                initial={reduce ? false : { opacity: 0, scaleX: 0.84 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: DURATION.slow, ease: EASE.outExpo, delay: i * 0.07 }}
                style={{ width: `${width}%` }}
              >
                <span>{stage.label}</span>
                <b>{stage.value}%</b>
              </motion.div>
            );
          })}
        </div>
        <p className={styles.insight}>Größter Verlust: Angebot zu Formular, minus 35 Punkte.</p>
      </motion.div>
    );
  }

  return (
    <motion.div key="design" className={styles.detail} variants={variants} initial="hidden" animate="visible" exit="exit">
      <span className={styles.detailKicker}>Design Audit</span>
      <div className={styles.designRow}>
        <div className={styles.page} aria-hidden="true">
          <div className={styles.pageChrome}>
            <span /><span /><span />
          </div>
          <div className={styles.pageNav} />
          <div className={styles.pageHero} />
          <div className={`${styles.pageCta} ${styles.pageHot}`}>
            <span className={styles.pin}>1</span>
          </div>
          <div className={styles.pageForm}>
            <span className={styles.pin}>2</span>
          </div>
        </div>
        <ul className={styles.auditList}>
          <li><b>1</b> Primär-CTA unter dem Fold</li>
          <li><b>2</b> Formular-Kontrast zu schwach</li>
          <li><b>3</b> Mobile Nav verdeckt das Formular</li>
        </ul>
      </div>
    </motion.div>
  );
}

export function RevenueScanVisual() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(reduce ? MODULES.length - 1 : 0);
  const [scanIndex, setScanIndex] = useState(TARGET_INDEX);

  useEffect(() => {
    if (reduce) return undefined;
    const id = window.setInterval(() => {
      setPhase((current) => (current + 1) % MODULES.length);
    }, PHASE_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  useEffect(() => {
    if (reduce) return undefined;
    if (phase !== 0) {
      setScanIndex(TARGET_INDEX);
      return undefined;
    }
    setScanIndex(0);
    const id = window.setInterval(() => {
      setScanIndex((current) => (current + 1) % ACCOUNTS.length);
    }, SCAN_MS);
    return () => window.clearInterval(id);
  }, [phase, reduce]);

  const activeModule = MODULES[phase];
  const focused = phase === 0 ? ACCOUNTS[scanIndex] : ACCOUNTS[TARGET_INDEX];
  const highlightIndex = phase === 0 ? scanIndex : TARGET_INDEX;

  return (
    <div
      className={styles.panel}
      role="img"
      aria-label="Animation: CRM-Datensätze von Fantasie-Agenturen werden gescannt und um SEO, Technical Scan, Performance Marketing, Funnel-Verlust und Design Audit angereichert."
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
            const isTarget = index === highlightIndex;
            return (
              <div
                key={account.domain}
                className={`${styles.account} ${isTarget ? styles.accountActive : ""}`}
              >
                <span className={styles.accountMark}>{account.mark}</span>
                <span className={styles.accountName}>{account.name}</span>
                <span className={styles.accountMeta}>{account.domain}</span>
              </div>
            );
          })}
          {!reduce && phase === 0 && (
            <motion.div
              className={styles.scanLine}
              initial={{ x: "-8%", opacity: 0 }}
              animate={{ x: "108%", opacity: [0, 1, 1, 0] }}
              transition={{ duration: DURATION.hero + DURATION.slow, ease: EASE.outSmooth }}
              aria-hidden="true"
            />
          )}
        </div>
      </div>

      <div className={styles.lockBar}>
        <span className={styles.mark}>{focused.mark}</span>
        <span className={styles.lockName}>{focused.name}</span>
        <span className={styles.lockMeta}>{focused.crm}</span>
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
        <PhaseDetail key={phase} phase={phase} reduce={!!reduce} scanIndex={scanIndex} />
      </AnimatePresence>
    </div>
  );
}
