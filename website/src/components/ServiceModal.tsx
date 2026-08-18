import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Modal } from "./Modal";
import { ModalContactFooter } from "./ModalContactFooter";
import { ProcessSlider } from "./ProcessSlider";
import {
  agentApproach,
  agentUseCases,
  mcpServices,
  mcpUseCases,
} from "../data/content";
import {
  agentBenefits,
  agentFit,
  agentImpact,
  agentPrinciples,
  businessExperiments,
  businessImpact,
  gtmBenefits,
  gtmIdealFor,
  gtmImpact,
  mcpImpact,
  mcpValueProps,
  revenueFaq,
  revenueFinalMeta,
  revenueFlow,
  revenueGains,
  revenueIdealFor,
  revenueImpact,
  revenueProofMetrics,
  revenueRoiLines,
  revenueTimeline,
  revenueTiers,
  revenueToday,
  revenueWithUeberagent,
  serviceModalMeta,
  strategyDecisions,
  strategyDeepDive,
  strategyFunnel,
  strategyGovernance,
  strategyIdeaSources,
  strategyImpact,
  strategyMvpChecks,
  strategyPortfolioZones,
  strategyRolloutLevers,
  strategyScalingLevers,
  strategyScoreDimensions,
  trainingImpact,
  trainingModules,
  type ImpactRow,
  type ServiceStat,
} from "../data/serviceModalContent";
import { services } from "../data/services";
import { fadeIn, slidePanel, DURATION, EASE } from "../motion";
import { trackCalendlyClick } from "../lib/analytics";
import { teamMembers } from "../data/team";
import { CtaButton } from "./CtaButton";
import { RevenueScanVisual } from "./RevenueScanVisual";
import { StrategyGuideDownload } from "./StrategyGuideDownload";
import styles from "./ServiceModal.module.css";

const CALENDLY_URL = "https://calendly.com/supraflow/30min";

interface ServiceModalProps {
  serviceId: string | null;
  onClose: () => void;
}

function FlowArrow() {
  return (
    <div className={styles.flowArrow} aria-hidden="true">
      <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
        <path
          d="M0 8h28M24 3l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function StatPill({ value, label }: ServiceStat) {
  return (
    <div className={styles.statPill}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className={styles.sectionTitle}>{children}</h3>;
}

function ImpactTable({ rows }: { rows: ImpactRow[] }) {
  return (
    <div className={styles.impactTable}>
      <div className={styles.impactHeader}>
        <span>Vorher</span>
        <span>Nachher</span>
      </div>
      {rows.map((row) => (
        <div key={row.before} className={styles.impactRow}>
          <span className={styles.impactBefore}>{row.before}</span>
          <span className={styles.impactArrow} aria-hidden="true">→</span>
          <span className={styles.impactAfter}>{row.after}</span>
        </div>
      ))}
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return <p className={styles.callout}>{children}</p>;
}

const funnelStepIcons: Record<string, React.ReactNode> = {
  collect: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16v12H4V6z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 10h16M9 14h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  score: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 18V8M10 18V5M15 18v-7M20 18V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  deepdive: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  decide: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 12l4 4 8-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  build: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 18l8-12 8 12H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  rollout: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12h12M12 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 18h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  scale: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 17l5-8 4 5 5-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 19h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

function StrategyStageExtras({ index }: { index: number }) {
  switch (index) {
    case 0:
      return (
        <div className={styles.ideaSourceGrid}>
          {strategyIdeaSources.map((source) => (
            <div key={source.id} className={styles.ideaSourceCardDark}>
              <span className={styles.embedIcon} aria-hidden="true">
                {source.id === "research" ? (
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="16" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="12" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                )}
              </span>
              <h4 className={styles.ideaSourceTitleDark}>{source.title}</h4>
              <p>{source.description}</p>
            </div>
          ))}
        </div>
      );
    case 1:
      return <StrategyScoreExplorer />;
    case 2:
      return (
        <div className={styles.deepDiveGrid}>
          {strategyDeepDive.map((item, i) => (
            <div key={item.title} className={styles.deepDiveCardDark}>
              <span className={styles.deepDiveNum}>{String(i + 1).padStart(2, "0")}</span>
              <h4 className={styles.deepDiveTitleDark}>{item.title}</h4>
              <p className={styles.deepDiveQuestion}>{item.question}</p>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      );
    case 3:
      return <StrategyDecisionBoard />;
    case 4:
      return (
        <div className={styles.scaleGrid}>
          {strategyMvpChecks.map((item) => (
            <div key={item.title} className={styles.scaleCardDark}>
              <span className={styles.embedIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M5 17l5-8 4 5 5-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 19h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <h4 className={styles.scaleTitleDark}>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      );
    case 5:
      return (
        <div className={styles.scaleGrid}>
          {strategyRolloutLevers.map((item) => (
            <div key={item.title} className={styles.scaleCardDark}>
              <span className={styles.embedIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 12h12M12 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h4 className={styles.scaleTitleDark}>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      );
    case 6:
      return (
        <div className={styles.scaleGrid}>
          {strategyScalingLevers.map((item) => (
            <div key={item.title} className={styles.scaleCardDark}>
              <span className={styles.embedIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 18V8M10 18V5M16 18v-7M20 18V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <h4 className={styles.scaleTitleDark}>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

function StrategyProcessFlow() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const step = strategyFunnel[active];
  const total = strategyFunnel.length;

  // Evenly scattered idea-dots (percent positions)
  const caseDots = [
    [10, 28], [22, 62], [34, 18], [46, 70], [58, 32],
    [70, 58], [82, 22], [16, 48], [40, 42], [64, 14],
    [88, 46], [52, 54],
  ] as const;

  return (
    <div className={styles.funnelTrack}>
      <div className={styles.processHeader}>
        <span className={styles.processEyebrow}>7-Phasen-Funnel</span>
        <p className={styles.processIntro}>
          Jeder Use Case durchläuft denselben Funnel. Stage-Gates verhindern, dass Initiativen
          ohne Evidenz weiterrollen — von der Idee bis zur Skalierung.
        </p>
      </div>

      <div className={styles.funnelSplit}>
        <div className={styles.funnelColumn}>
          <div className={styles.funnelCases}>
            {caseDots.map(([left, top], i) => (
              <button
                key={i}
                type="button"
                className={styles.funnelCaseDot}
                style={{ left: `${left}%`, top: `${top}%` }}
                title="AI Use Case Ideen"
                aria-label="AI Use Case Ideen"
              />
            ))}
          </div>

          <div className={styles.funnelVisual} role="tablist" aria-label="Strategie-Phasen">
            {strategyFunnel.map((item, index) => {
              const topInset = (index / total) * 28;
              const bottomInset = ((index + 1) / total) * 28;
              const fill = 0.08 + (index / Math.max(total - 1, 1)) * 0.16;
              const isActive = active === index;
              return (
                <motion.button
                  key={item.step}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.funnelStage} ${isActive ? styles.funnelStageActive : ""}`}
                  style={{
                    clipPath: `polygon(${topInset}% 0, ${100 - topInset}% 0, ${100 - bottomInset}% 100%, ${bottomInset}% 100%)`,
                    paddingLeft: `calc(${Math.max(topInset, bottomInset)}% + 12px)`,
                    paddingRight: `calc(${Math.max(topInset, bottomInset)}% + 8px)`,
                    background: isActive
                      ? `rgba(204, 128, 102, ${0.28 + fill * 0.4})`
                      : `rgba(204, 128, 102, ${fill})`,
                  }}
                  onClick={() => setActive(index)}
                  whileHover={reduceMotion ? undefined : { filter: "brightness(1.04)" }}
                  whileTap={reduceMotion ? undefined : { scale: 0.995 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                >
                  <span className={styles.funnelStageIcon}>{funnelStepIcons[item.icon]}</span>
                  <span className={styles.funnelStageText}>
                    <span className={styles.funnelStageNum}>{item.step}</span>
                    <span className={styles.funnelStageTitle}>{item.title}</span>
                  </span>
                </motion.button>
              );
            })}
          </div>

          <div className={styles.funnelDiamonds}>
            {Array.from({ length: 3 }).map((_, i) => (
              <button
                key={i}
                type="button"
                className={styles.funnelDiamondBtn}
                title="AI Use Cases, die den Gesamtimpact der Strategie erhöhen"
                aria-label="AI Use Cases, die den Gesamtimpact der Strategie erhöhen"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 2.5L21 9.2 12 21.5 3 9.2 12 2.5z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.4 9.2h17.2M12 2.5l-3.2 6.7L12 21.5l3.2-12.3L12 2.5z"
                    stroke="currentColor"
                    strokeWidth="1.1"
                    strokeLinejoin="round"
                    opacity="0.55"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step.step}
            className={styles.phaseDetail}
            role="tabpanel"
            variants={reduceMotion ? fadeIn : slidePanel}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.phaseDetailHead}>
              <div className={styles.processIconWrap}>{funnelStepIcons[step.icon]}</div>
              <div>
                <span className={styles.phaseMeta}>{step.phase}</span>
                <h4 className={styles.phaseTitle}>{step.title}</h4>
              </div>
            </div>
            <p className={styles.phaseLead}>{step.description}</p>
            <p className={styles.phaseBody}>{step.detail}</p>
            <div className={styles.phaseOutcome}>
              <span className={styles.phaseOutcomeLabel}>Ergebnis</span>
              <span>{step.outcome}</span>
            </div>
            <div className={styles.phaseExtras}>
              <StrategyStageExtras index={active} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function StrategyPortfolioDiagram() {
  const [hovered, setHovered] = useState<string | null>(null);
  const zone = strategyPortfolioZones.find((z) => z.id === hovered) ?? null;

  return (
    <div className={styles.portfolioBlock}>
      <div className={styles.portfolioHead}>
        <span className={styles.portfolioEyebrow}>Portfolio-Diagramm</span>
        <p>Value vs. Risiko/Komplexität — Flächen zeigen die typische Einordnung.</p>
      </div>
      <div className={styles.portfolioMatrix} onMouseLeave={() => setHovered(null)}>
        <span className={styles.portfolioAxisY}>Business Value</span>
        <span className={styles.portfolioAxisX}>Risiko &amp; Komplexität</span>
        {strategyPortfolioZones.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`${styles.portfolioCell} ${styles[`portfolioCell_${item.id}`]} ${
              hovered === item.id ? styles.portfolioCellActive : ""
            }`}
            onMouseEnter={() => setHovered(item.id)}
            onFocus={() => setHovered(item.id)}
            onClick={() => setHovered(item.id)}
          >
            <strong>{item.title}</strong>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
      <div className={styles.portfolioHint} aria-live="polite">
        {zone ? (
          <>
            <strong>{zone.title}</strong>
            <span>{zone.description}</span>
          </>
        ) : (
          <span>Über eine Fläche hoveren, um die Bedeutung zu sehen.</span>
        )}
      </div>
    </div>
  );
}

function StrategyScoreExplorer() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const dim = strategyScoreDimensions[active];

  return (
    <div className={styles.scoreStack}>
      <div className={styles.scoreExplorer}>
        <div className={styles.scoreAxis} role="tablist" aria-label="Scoring-Dimensionen">
          {strategyScoreDimensions.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active === index}
              className={`${styles.scoreAxisBtn} ${active === index ? styles.scoreAxisBtnActive : ""}`}
              onClick={() => setActive(index)}
            >
              <span className={styles.scoreAxisIndex}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.scoreAxisShort}>{item.short}</span>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={dim.id}
            className={styles.scoreFocus}
            role="tabpanel"
            variants={reduceMotion ? fadeIn : slidePanel}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <p className={styles.scoreQuestion}>{dim.question}</p>
            <p className={styles.scoreAnswer}>{dim.detail}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <StrategyPortfolioDiagram />
    </div>
  );
}

const decisionIcons: Record<string, React.ReactNode> = {
  build: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 18l8-12 8 12H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  buy: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 7h12l-1 12H7L6 7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 7a3 3 0 016 0" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  pivot: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 7h7v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 17H10V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  kill: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 7l10 10M17 7L7 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  defer: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

function StrategyDecisionBoard() {
  const [active, setActive] = useState("build");
  const reduceMotion = useReducedMotion();
  const current = strategyDecisions.find((d) => d.id === active) ?? strategyDecisions[0];

  return (
    <div className={styles.decisionBoard}>
      <div className={styles.decisionChips} role="tablist" aria-label="Portfolio-Entscheidungen">
        {strategyDecisions.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active === item.id}
            className={`${styles.decisionChip} ${styles[`decisionChip_${item.id}`]} ${
              item.muted ? styles.decisionChipMuted : ""
            } ${active === item.id ? styles.decisionChipActive : ""}`}
            onClick={() => setActive(item.id)}
          >
            <span className={styles.decisionChipIcon}>{decisionIcons[item.id]}</span>
            {item.title}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={current.id}
          className={styles.decisionExplain}
          role="tabpanel"
          variants={reduceMotion ? fadeIn : slidePanel}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {current.description}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function RevenueEngineContent() {
  const meta = serviceModalMeta["ai-revenue-engine"];
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const reduceMotion = useReducedMotion();
  const timelineStep = revenueTimeline[activeTimeline];

  return (
    <div className={styles.content}>
      <section className={styles.heroSection}>
        <span className={styles.heroTag}>
          <span className={styles.liveDot} aria-hidden="true" />
          {meta.bannerTag}
        </span>
        <p className={styles.lead}>
          Ihr größter ungenutzter Vertriebskanal ist Ihr{" "}
          <strong>bestehender Kundenstamm</strong>. {meta.lead}
        </p>
        <div className={styles.statsRow}>
          {meta.stats.map((s) => (
            <StatPill key={s.label} {...s} />
          ))}
        </div>
        <p className={styles.heroNote}>Festpreis · Keine Software-Lizenz · Keine Vertragsbindung</p>
        <div className={styles.heroVisual}>
          <div className={styles.heroPanel}>
            <span className={styles.panelLabel}>Heute</span>
            <ul className={styles.panelList}>
              {revenueToday.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <FlowArrow />
          <div className={styles.heroPanelAccent}>
            <span className={styles.panelLabel}>Mit überagent</span>
            <ul className={styles.panelList}>
              {revenueWithUeberagent.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle>Wie die Engine arbeitet</SectionTitle>
        <p className={styles.bodyText}>
          Sieben Schritte, vollständig automatisiert. Sie liefern die Kundendaten, Ihr Vertrieb
          bekommt fertige Gespräche. Alles dazwischen läuft im System.
        </p>
        <div className={styles.engineSplit}>
          <RevenueScanVisual />
          <div className={styles.engineFlow}>
            {revenueFlow.map((step) => (
              <div
                key={step.step}
                className={`${styles.engineFlowRow} ${step.outcome ? styles.engineFlowRowOut : ""}`}
              >
                <div className={styles.engineFlowNum}>{step.step}</div>
                <div className={styles.engineFlowBody}>
                  <div className={styles.engineFlowTitle}>{step.title}</div>
                  <p className={styles.engineFlowDesc}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionTitle>Was Sie im Piloten konkret bekommen</SectionTitle>
        <ul className={styles.list}>
          {revenueGains.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong> {item.text}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionTitle>Die Rechnung, die Sie selbst nachprüfen können</SectionTitle>
        <p className={styles.bodyText}>
          Der Pilot ist der einzige Service, dessen Ertrag Sie nach zwei Wochen gegen eine reale
          Zahl stellen können: den Umsatz, der aus den identifizierten Opportunities entsteht.
        </p>
        <div className={styles.roiGrid}>
          <div className={styles.roiTable}>
            {revenueRoiLines.map((line) => (
              <div
                key={line.label}
                className={`${styles.roiLine} ${line.total ? styles.roiLineTotal : ""}`}
              >
                <span>{line.label}</span>
                <span>{line.value}</span>
              </div>
            ))}
          </div>
          <div className={styles.roiPanel}>
            <span className={styles.roiK}>Break-even</span>
            <span className={styles.roiV}>1 Deal</span>
            <p>
              Ein einziger zusätzlicher Abschluss zahlt den Piloten mehrfach zurück. Alles darüber
              ist Marge. Die Engine hat den Kundenstamm dann bereits einmal vollständig kartiert.
            </p>
          </div>
        </div>
        <p className={styles.footnote}>
          Beispielrechnung mit bewusst konservativen Annahmen. Ihre echten Werte
          (durchschnittlicher Auftragswert, Abschlussquote, Kundenanzahl) setzen wir im
          Erstgespräch ein und rechnen die Kalkulation gemeinsam durch. Wenn sie nicht aufgeht,
          sagen wir das.
        </p>
      </section>

      <section>
        <div className={styles.guarantee}>
          <div className={styles.guaranteeSeal}>
            Kein
            <br />
            Ergebnis
            <br />
            keine
            <br />
            Rechnung
          </div>
          <div>
            <h4 className={styles.guaranteeTitle}>Ergebnisgarantie auf den Piloten</h4>
            <p className={styles.bodyText}>
              Wenn wir aus Ihren 200 analysierten Bestandskunden nicht mindestens 20 vertriebsreife
              Opportunities mit belegtem Anlass liefern, stellen wir den Piloten nicht in Rechnung.
              Die Analyse und alle erstellten Materialien behalten Sie trotzdem.
            </p>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle>Ideal für Unternehmen, die …</SectionTitle>
        <div className={styles.benefitGrid}>
          {revenueIdealFor.map((item) => (
            <div key={item} className={styles.benefitItem}>
              <span className={styles.benefitDot} aria-hidden="true" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Die Transformation</SectionTitle>
        <ImpactTable rows={revenueImpact} />
        <Callout>
          Mehr Umsatz aus Kunden, die Sie längst gewonnen haben. Ohne zusätzliche Leadkosten,
          ohne zusätzliche Vertriebler, ohne neues Tool für Ihr Team.
        </Callout>
      </section>

      <section>
        <SectionTitle>Ablauf des Piloten</SectionTitle>
        <p className={styles.bodyText}>
          Zehn Arbeitstage von der Datenübergabe bis zum Review. Ihr Aufwand liegt bei rund zwei
          Stunden, verteilt auf zwei Termine.
        </p>
        <div className={styles.timeline} role="tablist" aria-label="Pilot-Ablauf">
          {revenueTimeline.map((step, index) => (
            <button
              key={step.title}
              type="button"
              role="tab"
              aria-selected={activeTimeline === index}
              className={`${styles.tl} ${activeTimeline === index ? styles.tlActive : ""}`}
              onMouseEnter={() => setActiveTimeline(index)}
              onFocus={() => setActiveTimeline(index)}
              onClick={() => setActiveTimeline(index)}
            >
              <span className={styles.tlTitle}>{step.title}</span>
              <span className={styles.tlDate}>{step.when}</span>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={timelineStep.title}
            className={styles.tlDetail}
            role="tabpanel"
            variants={reduceMotion ? fadeIn : slidePanel}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <strong>{timelineStep.when}</strong> {timelineStep.detail}
          </motion.p>
        </AnimatePresence>
      </section>

      <section>
        <SectionTitle>Woher wir das können</SectionTitle>
        <div className={styles.proof}>
          <div className={styles.proofCard}>
            <span className={styles.panelLabel}>Referenzprojekt</span>
            <p>
              Für eine Schweizer Agentur mit einem Bestand im fünfstelligen KMU-Bereich haben wir
              genau diese Mechanik gebaut: Kundendaten und öffentliche Signale zusammengeführt,
              Upsell-Potenziale gescored und die Vertriebsanlässe automatisiert in die tägliche
              Arbeit des Sales-Teams gespielt. Diese Architektur ist die Grundlage der AI Revenue
              Engine.
            </p>
          </div>
          <div className={styles.proofMetrics}>
            {revenueProofMetrics.map((metric) => (
              <div key={metric.value} className={styles.metric}>
                <div className={styles.metricV}>{metric.value}</div>
                <div className={styles.metricL}>{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionTitle>Einstieg und Ausbaustufen</SectionTitle>
        <p className={styles.bodyText}>
          Sie starten mit dem Piloten. Alles danach ist eine Entscheidung, die Sie auf Basis echter
          Zahlen treffen, nicht auf Basis einer Präsentation.
        </p>
        <div className={styles.tiers}>
          {revenueTiers.map((tier) => (
            <div
              key={tier.id}
              className={`${styles.tier} ${tier.featured ? styles.tierHero : ""}`}
            >
              <span className={styles.tierCap}>{tier.cap}</span>
              <div className={styles.tierPrice}>
                {tier.price}
                <small>{tier.note}</small>
              </div>
              <ul className={styles.tierList}>
                {tier.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {tier.featured && (
                <div className={styles.tierFoot}>
                  <CtaButton
                    size="sm"
                    surface="on-dark"
                    href={CALENDLY_URL}
                    onClick={() => trackCalendlyClick("revenue_engine_pilot")}
                  >
                    Pilot starten
                  </CtaButton>
                </div>
              )}
            </div>
          ))}
        </div>
        <p className={styles.footnote}>
          Preise zzgl. MwSt. Bei Konzernen und Beständen jenseits von 100.000 Kunden erstellen wir
          ein individuelles Angebot. Der Pilot ist in jedem Fall der Einstieg. Er verpflichtet zu
          nichts.
        </p>
      </section>

      <section>
        <SectionTitle>Häufige Fragen</SectionTitle>
        <div className={styles.engineFaq}>
          {revenueFaq.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={item.question} className={styles.engineFaqItem}>
                <button
                  type="button"
                  className={styles.engineFaqTrigger}
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                >
                  {item.question}
                  <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className={styles.engineFaqPanel}
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{
                        duration: reduceMotion ? 0 : DURATION.normal,
                        ease: EASE.outExpo,
                      }}
                    >
                      <p className={styles.engineFaqAnswer}>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div className={styles.engineFinal}>
          <div className={styles.engineFinalCopy}>
            <h3>In 30 Minuten wissen Sie, ob Ihr Kundenstamm das hergibt.</h3>
            <p>
              Im Erstgespräch rechnen wir Ihre Zahlen durch: Kundenanzahl, Portfolio,
              durchschnittlicher Auftragswert. Danach legen wir fest, welcher Opportunity-Typ im
              Piloten den größten Hebel hat. Ohne Pitch-Deck.
            </p>
            <CtaButton
              size="md"
              surface="on-dark"
              href={CALENDLY_URL}
              onClick={() => trackCalendlyClick("revenue_engine_final")}
            >
              Kostenloses Erstgespräch
            </CtaButton>
            <div className={styles.engineFinalMeta}>
              {revenueFinalMeta.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className={styles.engineFinalProfile}>
            <img
              src={teamMembers[0].image}
              alt={teamMembers[0].name}
              className={styles.engineFinalPhoto}
              width={320}
              height={330}
            />
            <p className={styles.engineFinalName}>Laurens Lang, M.Sc. MBA</p>
            <p className={styles.engineFinalRole}>CEO · überagent</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function GtmContent() {
  const meta = serviceModalMeta["gtm-engineering"];

  return (
    <div className={styles.content}>
      <section className={styles.heroSection}>
        <span className={styles.heroTag}>{meta.bannerTag}</span>
        <p className={styles.lead}>
          Wir bauen AI-gestützte GTM-Infrastruktur: von ICP- und Signal-Logik über Research
          und Enrichment bis zu Routing, Personalisierung, QA und Reporting.
        </p>
        <div className={styles.statsRow}>
          {meta.stats.map((s) => (
            <StatPill key={s.label} {...s} />
          ))}
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroPanel}>
            <span className={styles.panelLabel}>Heute</span>
            <ul className={styles.panelList}>
              <li>CRM, Sheets, Outreach — getrennt</li>
              <li>Manuelle Recherche &amp; Briefings</li>
              <li>Unklare Signale, schwache Priorisierung</li>
            </ul>
          </div>
          <FlowArrow />
          <div className={styles.heroPanelAccent}>
            <span className={styles.panelLabel}>Mit überagent</span>
            <ul className={styles.panelList}>
              <li>Eine GTM-Ausführungsschicht</li>
              <li>Automatisiertes Enrichment &amp; Routing</li>
              <li>Signal-basierte Priorisierung</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle>Was Sie konkret gewinnen</SectionTitle>
        <ul className={styles.list}>
          {gtmBenefits.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </section>

      <section>
        <SectionTitle>Ideal für Teams, die …</SectionTitle>
        <div className={styles.benefitGrid}>
          {gtmIdealFor.map((item) => (
            <div key={item} className={styles.benefitItem}>
              <span className={styles.benefitDot} aria-hidden="true" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Die Transformation</SectionTitle>
        <ImpactTable rows={gtmImpact} />
        <Callout>
          Mehr Pipeline pro Kopf — ohne zusätzliche operative Last in Marketing, Sales und RevOps.
        </Callout>
      </section>

      <section>
        <SectionTitle>Prozess und Timeline</SectionTitle>
        <p className={styles.bodyText}>
          In 6–8 Wochen von Discovery bis Rollout — mit Shadow-Runs, Governance und Enablement für Ihr Team.
        </p>
        <div className={styles.processWrap}>
          <ProcessSlider />
        </div>
      </section>
    </div>
  );
}

function McpContent() {
  const meta = serviceModalMeta.mcp;

  return (
    <div className={styles.content}>
      <section className={styles.heroSection}>
        <span className={styles.heroTag}>{meta.bannerTag}</span>
        <p className={styles.lead}>
          AI Agents werden nur produktiv, wenn sie sicher auf echte Systeme zugreifen können.
          MCP schliesst die Lücke zwischen Modellen und Ihrer operativen Infrastruktur.
        </p>
        <div className={styles.statsRow}>
          {meta.stats.map((s) => (
            <StatPill key={s.label} {...s} />
          ))}
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroPanel}>
            <span className={styles.panelLabel}>Ohne MCP</span>
            <div className={styles.chaosDots} aria-hidden="true">
              <span /><span /><span /><span /><span />
            </div>
            <ul className={styles.panelList}>
              <li>APIs, DBs, SaaS — verstreut</li>
              <li>Fragile Einzellösungen</li>
            </ul>
          </div>
          <FlowArrow />
          <div className={styles.heroPanelAccent}>
            <span className={styles.panelLabel}>MCP Layer</span>
            <div className={styles.miniStack}>
              <span>Agent</span>
              <span>Tools</span>
              <span>Resources</span>
            </div>
            <ul className={styles.panelList}>
              <li>Standardisiert &amp; kontrolliert</li>
              <li>Erweiterbar &amp; auditierbar</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle>Was MCP für Ihr Unternehmen möglich macht</SectionTitle>
        <div className={styles.valueGrid}>
          {mcpValueProps.map((prop) => (
            <div key={prop.title} className={styles.valueCard}>
              <h4 className={styles.valueTitle}>{prop.title}</h4>
              <p className={styles.valueDesc}>{prop.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Unsere MCP Services</SectionTitle>
        {mcpServices.map((svc, i) => (
          <div key={svc.title} className={styles.serviceCard}>
            <div className={styles.serviceCardHeader}>
              <span className={styles.serviceNum}>{String(i + 1).padStart(2, "0")}</span>
              <h4 className={styles.serviceCardTitle}>{svc.title}</h4>
            </div>
            <p className={styles.bodyText}>{svc.description}</p>
            {svc.items && (
              <ul className={styles.compactList}>
                {svc.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      <section>
        <SectionTitle>Typische Use Cases</SectionTitle>
        <div className={styles.useCaseGrid}>
          {mcpUseCases.map((uc) => (
            <div key={uc.title} className={styles.useCase}>
              <h4 className={styles.useCaseTitle}>{uc.title}</h4>
              <p className={styles.bodyText}>{uc.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Die Transformation</SectionTitle>
        <ImpactTable rows={mcpImpact} />
        <Callout>
          Ihre Systeme müssen nicht ersetzt werden — sie werden AI-ready angebunden.
        </Callout>
      </section>
    </div>
  );
}

function WorkflowAgentsContent() {
  const meta = serviceModalMeta["workflow-agents"];

  return (
    <div className={styles.content}>
      <section className={styles.heroSection}>
        <span className={styles.heroTag}>{meta.bannerTag}</span>
        <p className={styles.lead}>
          KI-Agenten sind wertvoll, wenn sie einen klar begrenzten Workflow besser, schneller
          und konsistenter ausführen als manuelle Koordination. Genau dort setzen wir an.
        </p>
        <div className={styles.statsRow}>
          {meta.stats.map((s) => (
            <StatPill key={s.label} {...s} />
          ))}
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroPanel}>
            <span className={styles.panelLabel}>Eingang</span>
            <ul className={styles.panelList}>
              <li>E-Mail, Ticket, CRM-Signal</li>
              <li>Mehrere Quellen, manuelle Triage</li>
            </ul>
          </div>
          <FlowArrow />
          <div className={styles.heroPanelAccent}>
            <span className={styles.panelLabel}>Workflow Agent</span>
            <div className={styles.miniStack}>
              <span>Analysieren</span>
              <span>Entscheiden</span>
              <span>Ausführen</span>
            </div>
            <ul className={styles.panelList}>
              <li>Mit Freigaben &amp; Logging</li>
              <li>Direkt in Ihren Systemen</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle>Das Prinzip: operatives System, kein Chatbot</SectionTitle>
        <div className={styles.principleGrid}>
          {agentPrinciples.map((p) => (
            <div key={p.title} className={styles.miniCard}>
              <span className={styles.featureLabel}>{p.label}</span>
              <h4 className={styles.miniTitle}>{p.title}</h4>
              <p className={styles.miniBody}>{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Was AI Agents leisten</SectionTitle>
        <div className={styles.benefitGrid}>
          {agentBenefits.map((b) => (
            <div key={b} className={styles.benefitItem}>
              <span className={styles.benefitDot} aria-hidden="true" />
              {b}
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Wo KI-Agenten wirken</SectionTitle>
        <div className={styles.useCaseGrid}>
          {agentUseCases.map((uc) => (
            <div key={uc.title} className={styles.useCase}>
              <h4 className={styles.useCaseTitle}>{uc.title}</h4>
              <p className={styles.bodyText}>{uc.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Wann es passt — und wann nicht</SectionTitle>
        <div className={styles.fitGrid}>
          <div className={styles.fitCard}>
            <span className={styles.fitLabelGood}>Geeignet</span>
            <ul className={styles.compactList}>
              {agentFit.good.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.fitCard}>
            <span className={styles.fitLabelBad}>Weniger geeignet</span>
            <ul className={styles.compactList}>
              {agentFit.bad.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle>Unser Vorgehen</SectionTitle>
        <div className={styles.pipeline}>
          {agentApproach.map((step) => (
            <div key={step.number} className={styles.pipelineStep}>
              <span className={styles.pipelineNum}>{step.number}</span>
              <span className={styles.pipelineLabel}>{step.title}</span>
              <p className={styles.pipelineDesc}>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Die Transformation</SectionTitle>
        <ImpactTable rows={agentImpact} />
        <Callout>
          Weniger Copy-Paste, schnellere Abläufe und mehr Fokus auf wertschöpfende Arbeit.
        </Callout>
      </section>
    </div>
  );
}

function BusinessModelsContent() {
  const meta = serviceModalMeta["business-models"];

  return (
    <div className={styles.content}>
      <section className={styles.heroSection}>
        <span className={styles.heroTag}>{meta.bannerTag}</span>
        <p className={styles.lead}>
          Produktentwicklung und neue Geschäftsmodelle sind zeit-, kosten- und risikointensiv.
          Wir helfen Ihnen, die richtigen Entscheidungen zu treffen — bevor Sie skalieren.
        </p>
        <div className={styles.statsRow}>
          {meta.stats.map((s) => (
            <StatPill key={s.label} {...s} />
          ))}
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroPanel}>
            <span className={styles.panelLabel}>Hypothese</span>
            <ul className={styles.panelList}>
              <li>Annahmen statt Evidenz</li>
              <li>Hoher Invest vor Validierung</li>
            </ul>
          </div>
          <FlowArrow />
          <div className={styles.heroPanelAccent}>
            <span className={styles.panelLabel}>Validiert</span>
            <div className={styles.miniStack}>
              <span>Experiment</span>
              <span>Messung</span>
              <span>Go / No-Go</span>
            </div>
            <ul className={styles.panelList}>
              <li>Klare Entscheidungsgrundlage</li>
              <li>Skalierung mit Daten</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle>Von der Idee zum validierten Geschäftsmodell</SectionTitle>
        <div className={styles.phaseGrid}>
          {["Hypothese", "Experiment", "Validierung", "Skalierung"].map((phase, i) => (
            <div key={phase} className={styles.phaseItem}>
              <span className={styles.phaseNum}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.phaseName}>{phase}</span>
            </div>
          ))}
        </div>
        <p className={styles.bodyText}>
          Mit klaren Hypothesen, schnellen Experimenten und messbaren Ergebnissen — statt Monate
          in die falsche Richtung zu investieren.
        </p>
      </section>

      <section>
        <SectionTitle>Was wir validieren</SectionTitle>
        <div className={styles.experimentGrid}>
          {businessExperiments.map((exp, i) => (
            <div key={exp.title} className={styles.experimentCard}>
              <span className={styles.experimentNum}>{String(i + 1).padStart(2, "0")}</span>
              <h4 className={styles.experimentTitle}>{exp.title}</h4>
              <p className={styles.bodyText}>{exp.description}</p>
              <span className={styles.experimentMetric}>{exp.metric}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Die Transformation</SectionTitle>
        <ImpactTable rows={businessImpact} />
        <Callout>
          Validierung ist kein Bremsklotz — sie ist der schnellste Weg zu einem tragfähigen Geschäftsmodell.
        </Callout>
      </section>
    </div>
  );
}

function AiStrategyContent() {
  const meta = serviceModalMeta["ai-strategy"];

  return (
    <div className={styles.content}>
      <section className={styles.heroSection}>
        <span className={styles.heroTag}>{meta.bannerTag}</span>
        <p className={styles.lead}>
          Wie Ihr Unternehmen <strong>PowerPoint-Folien bricht</strong>,{" "}
          <strong>langwierige Strategie-Diskussionen verkürzt</strong> und{" "}
          <strong>produktive AI-Agenten entwickelt</strong>, die{" "}
          <strong>operative Kosten senken</strong> und{" "}
          <strong>Wachstum maximieren</strong>. Messbar und planbar.
        </p>

        <div className={styles.strategyPromise}>
          <span className={styles.strategyPromiseIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16v12H4V6z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M12 18v3M9 21h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <div>
            <h3 className={styles.strategyPromiseTitle}>
              Von Ideen zum priorisierten AI-Portfolio
            </h3>
            <p className={styles.strategyPromiseText}>
              Die wirkungsvollsten Use Cases werden gezielt selektiert, der Gesamtimpact der
              AI Strategy messbar maximiert.
            </p>
          </div>
        </div>

        <div className={styles.strategyPillarGrid}>
          {strategyGovernance.map((item, i) => (
            <div key={item.title} className={styles.strategyPillar}>
              <span className={styles.strategyPillarIcon} aria-hidden="true">
                {i === 0 && (
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7l8-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {i === 1 && (
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="16" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M4 19c.8-2.4 2.8-4 5-4s4.2 1.6 5 4M14 19c.5-1.5 1.7-2.6 3.2-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
                {i === 2 && (
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M6 12l4 4 8-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                )}
              </span>
              <h4 className={styles.strategyPillarTitle}>{item.title}</h4>
              <p className={styles.strategyPillarText}>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.strategyPanel}>
        <SectionTitle>AI Strategy: von Ideen zum priorisierten Portfolio</SectionTitle>
        <StrategyProcessFlow />
      </section>

      <StrategyGuideDownload />

      <section>
        <SectionTitle>Die Transformation</SectionTitle>
        <ImpactTable rows={strategyImpact} />
        <Callout>
          Portfolio statt Projektliste: wenige gut begründete Bets, messbare Stage-Gates
          und Skalierung nur mit Evidenz.
        </Callout>
        <p className={styles.inlineCta}>
          <strong>Bereit für Klarheit?</strong> Wir moderieren den Strategie-Workshop,
          liefern das Scoring-Modell und begleiten Sie bis zur ersten Portfolio-Entscheidung.
        </p>
      </section>
    </div>
  );
}

function TrainingsContent() {
  const meta = serviceModalMeta.trainings;

  return (
    <div className={styles.content}>
      <section className={styles.heroSection}>
        <span className={styles.heroTag}>{meta.bannerTag}</span>
        <p className={styles.lead}>
          AI-Systeme bleiben nur produktiv, wenn Teams sie verstehen und steuern können.
          Wir machen Enablement praxisnah: an Ihren Cases, mit klaren Rollen und dokumentiertem Betrieb.
        </p>
        <div className={styles.statsRow}>
          {meta.stats.map((s) => (
            <StatPill key={s.label} {...s} />
          ))}
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroPanel}>
            <span className={styles.panelLabel}>Ohne Enablement</span>
            <ul className={styles.panelList}>
              <li>Wissen hängt an Einzelpersonen</li>
              <li>Unklare Freigaben und Fehlerpfade</li>
            </ul>
          </div>
          <FlowArrow />
          <div className={styles.heroPanelAccent}>
            <span className={styles.panelLabel}>Mit Workshop</span>
            <div className={styles.miniStack}>
              <span>Rollen</span>
              <span>QA &amp; Monitoring</span>
              <span>Runbooks</span>
            </div>
            <ul className={styles.panelList}>
              <li>Team kann Systeme betreiben</li>
              <li>Klarer Operating Model</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle>Was wir vermitteln</SectionTitle>
        <div className={styles.experimentGrid}>
          {trainingModules.map((mod, i) => (
            <div key={mod.title} className={styles.experimentCard}>
              <span className={styles.experimentNum}>{String(i + 1).padStart(2, "0")}</span>
              <h4 className={styles.experimentTitle}>{mod.title}</h4>
              <p className={styles.bodyText}>{mod.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Die Transformation</SectionTitle>
        <ImpactTable rows={trainingImpact} />
        <Callout>
          Enablement ist kein Add-on, sondern die Voraussetzung für skalierbare AI im Unternehmen.
        </Callout>
      </section>
    </div>
  );
}

const contentByService: Record<string, () => React.ReactNode> = {
  "ai-revenue-engine": RevenueEngineContent,
  "gtm-engineering": GtmContent,
  mcp: McpContent,
  "workflow-agents": WorkflowAgentsContent,
  "business-models": BusinessModelsContent,
  "ai-strategy": AiStrategyContent,
  trainings: TrainingsContent,
};

export function ServiceModal({ serviceId, onClose }: ServiceModalProps) {
  const service = services.find((s) => s.id === serviceId);
  const meta = serviceId ? serviceModalMeta[serviceId] : null;
  const Content = serviceId ? contentByService[serviceId] : null;

  if (!service || !meta || !Content) return null;

  return (
    <Modal
      isOpen={!!serviceId}
      onClose={onClose}
      title={service.title}
      eyebrow={meta.eyebrow}
      footer={
        <ModalContactFooter
          onClose={onClose}
          label={meta.ctaLabel}
          note={meta.footerNote}
          href={meta.ctaHref}
        />
      }
    >
      <Content />
    </Modal>
  );
}
