import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PageBreadcrumb, PageShell } from "./PageShell";
import { ModalContactFooter } from "./ModalContactFooter";
import { ProcessSlider } from "./ProcessSlider";
import { TypedHeadline } from "./TypedHeadline";
import { LighthouseOffer } from "./LighthouseOffer";
import { RoiCalculator } from "./RoiCalculator";
import { useOverlay } from "../context/OverlayContext";
import { scrollToContact } from "../hooks/useScrollReveal";
import {
  agentWorkflowDemo,
  mcpExampleFlow,
  mcpSecurityHighlights,
  mcpServices,
  mcpUseCases,
} from "../data/content";
import {
  agentFit,
  businessExperiments,
  businessImpact,
  giftingFaq,
  giftingFinalMeta,
  giftingFlow,
  giftingHowIntro,
  giftingPricing,
  giftingRoles,
  giftingRolesIntro,
  gtmBenefits,
  gtmIdealFor,
  gtmImpact,
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
  revenuePathLead,
  revenueDrivers,
  revenueProductionRoi,
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
  vibeAfterFlow,
  vibeAfterIntro,
  vibeCallout,
  vibeCriteria,
  vibeFaq,
  vibeFinalLead,
  vibeFinalMeta,
  vibeFlow,
  vibeFlowIntro,
  vibeGovernance,
  vibeGuarantee,
  vibeIdealFor,
  vibeImpact,
  vibeMatrix,
  vibeMatrixIntro,
  vibePrizeBody,
  vibePrizeIntro,
  vibeReasons,
  vibeReasonsIntro,
  vibeRoiFootnote,
  vibeRoiIntro,
  vibeRoiLines,
  vibeRoiPanel,
  vibeTiers,
  vibeTiersFootnote,
  vibeTiersIntro,
  vibeTimeline,
  vibeTimelineNote,
  type ImpactRow,
  type ServiceStat,
} from "../data/serviceModalContent";
import { services } from "../data/services";
import { fadeIn, slidePanel, DURATION, EASE } from "../motion";
import { trackCalendlyClick } from "../lib/analytics";
import { useDocumentSeo } from "../hooks/useDocumentSeo";
import { teamMembers } from "../data/team";
import { CtaButton } from "./CtaButton";
import { RevenueScanVisual } from "./RevenueScanVisual";
import { VibeChallengeVisual } from "./VibeChallengeVisual";
import { GiftingAgentVisual } from "./GiftingAgentVisual";
import { GtmControlTowerVisual } from "./GtmControlTowerVisual";
import { McpLayerVisual } from "./McpLayerVisual";
import { WorkflowAgentDeskVisual } from "./WorkflowAgentDeskVisual";
import { BusinessModelWindTunnelVisual } from "./BusinessModelWindTunnelVisual";
import { StrategyCommandRoomVisual } from "./StrategyCommandRoomVisual";
import { TrainingAcademyVisual } from "./TrainingAcademyVisual";
import { AgentLottie } from "./AgentLottie";
import { GiftingCrmLogos, GiftingGlyph } from "./GiftingMarks";
import { GiftingRevenueCalc } from "./GiftingRevenueCalc";
import {
  maximDemoIntro,
  maximFaq,
  maximHeroAudience,
  maximPricing,
  maximPricingNote,
  maximProblemCosts,
  maximSolutionClusters,
  maximStages,
  maximTimeline,
  maximTimeProof,
  maximTrust,
} from "../data/maximCalc";
import { MaximRoiCalc } from "./MaximRoiCalc";
import { MaximDemoCarousel } from "./MaximDemoCarousel";
import { StrategyGuideDownload } from "./StrategyGuideDownload";
import { SectionBackground } from "./SectionBackground";
import { HeroTermRain } from "./HeroTermRain";
import styles from "./ServiceModal.module.css";

const CALENDLY_URL = "https://calendly.com/supraflow/30min";

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

function ServiceHeroLayout({
  tag,
  title,
  lead,
  note,
  stats,
  mark,
  ctas,
  visual,
  leadClassName,
  titleClassName,
  centerCopy,
}: {
  tag: React.ReactNode;
  title?: React.ReactNode;
  lead: React.ReactNode;
  note?: React.ReactNode;
  stats?: ServiceStat[];
  mark?: React.ReactNode;
  ctas?: React.ReactNode;
  visual: React.ReactNode;
  leadClassName?: string;
  titleClassName?: string;
  centerCopy?: boolean;
}) {
  return (
    <>
      <section className={`${styles.heroSection} ${styles.serviceHero}`}>
        <SectionBackground variant="static-hero" />
        <HeroTermRain variant="section" />
        <div className={styles.serviceHeroInner}>
          <PageBreadcrumb tone="dark" />
          <div className={styles.heroIntro}>
            {tag}
            {title ? (
              <TypedHeadline
                as="h3"
                className={`${styles.heroHeadline} ${titleClassName ?? ""}`.trim()}
              >
                {title}
              </TypedHeadline>
            ) : null}
          </div>
          <div
            className={`${styles.heroBody} ${centerCopy ? styles.heroBodyCenter : ""}`.trim()}
          >
            <div className={styles.heroCopy}>
              <p className={`${styles.lead} ${leadClassName ?? ""}`.trim()}>{lead}</p>
              {note ? <p className={styles.heroNote}>{note}</p> : null}
              {mark ? <div className={styles.heroMark}>{mark}</div> : null}
              {!mark && stats?.length ? (
                <div className={styles.statsRow}>
                  {stats.map((s) => (
                    <StatPill key={s.label} {...s} />
                  ))}
                </div>
              ) : null}
              {ctas ? <div className={styles.heroCtas}>{ctas}</div> : null}
            </div>
            <div className={styles.heroStage}>{visual}</div>
          </div>
        </div>
      </section>
      <div className={styles.contentGrid} aria-hidden="true" />
    </>
  );
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
          ohne Evidenz weiterrollen, von der Idee bis zur Skalierung.
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
        <p>Value vs. Risiko/Komplexität, Flächen zeigen die typische Einordnung.</p>
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
      <ServiceHeroLayout
        tag={
          <span className={styles.heroTag}>
            <span className={styles.liveDot} aria-hidden="true" />
            {meta.bannerTag}
          </span>
        }
        title={
          <>
            Ihr größter ungenutzter Vertriebskanal ist Ihr{" "}
            <em>bestehender Kundenstamm</em>.
          </>
        }
        lead={meta.lead}
        note="Proof: 200 Bestandskunden im Pilot, Ergebnis in 10 Arbeitstagen."
        stats={meta.stats}
        visual={<RevenueScanVisual />}
        centerCopy
      />

      <section>
        <SectionTitle>Wie die Engine arbeitet</SectionTitle>
        <p className={styles.bodyText}>
          Sieben Schritte, vollständig automatisiert. Sie liefern die Kundendaten, Ihr Vertrieb
          bekommt fertige Gespräche. Alles dazwischen läuft im System.
        </p>
        <div className={styles.heroProofStrip}>
          <span>CRM</span>
          <span>Signale</span>
          <span>Scoring</span>
          <span>Outreach</span>
          <span>CRM Write-back</span>
        </div>
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
        <p className={styles.productionRoi}>{revenueProductionRoi}</p>
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
        <p className={styles.bodyText}>{revenuePathLead}</p>
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
                  {"gate" in tier && tier.gate && (
                    <p className={styles.tierGate}>{tier.gate}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.tierDrivers}>
          <span className={styles.tierDriversLabel}>Die Spanne hängt ab von</span>
          {revenueDrivers.map((driver) => (
            <span key={driver} className={styles.tierDriver}>
              {driver}
            </span>
          ))}
        </div>
        <p className={styles.footnote}>
          Preise zzgl. MwSt. Produktions- und Betriebspreis richten sich nach Kundenanzahl, CRM und
          Anzahl der Opportunity-Typen. Der Pilot ist in jedem Fall der Einstieg. Er verpflichtet zu
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
            <p className={styles.engineFinalRole}>CEO · uberagent</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function VibeChallengeContent() {
  const meta = serviceModalMeta["vibe-coding-challenge"];
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const reduceMotion = useReducedMotion();
  const timelineStep = vibeTimeline[activeTimeline];

  return (
    <div className={styles.content}>
      <ServiceHeroLayout
        tag={
          <span className={styles.heroTag}>
            <span className={styles.liveDot} aria-hidden="true" />
            {meta.bannerTag}
          </span>
        }
        title={
          <>
            Ihr größtes Automatisierungspotenzial kennt längst ein Mitarbeiter.{" "}
            <em>Gefragt hat ihn nur nie jemand.</em>
          </>
        }
        lead={meta.lead}
        stats={meta.stats}
        visual={<VibeChallengeVisual />}
      />

      <section>
        <SectionTitle>Warum Mitarbeiter die besseren Ideen haben</SectionTitle>
        <p className={styles.bodyText}>{vibeReasonsIntro}</p>
        <ul className={styles.list}>
          {vibeReasons.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong> {item.text}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionTitle>Warum das weder Schulung noch Hackathon ist</SectionTitle>
        <p className={styles.bodyText}>{vibeMatrixIntro}</p>
        <div className={styles.matrix}>
          {vibeMatrix.map((col) => (
            <div key={col.id} className={`${styles.mx} ${col.win ? styles.mxWin : ""}`}>
              <span className={styles.mxCap}>{col.cap}</span>
              <div className={styles.mxTitle}>{col.title}</div>
              <ul className={styles.mxList}>
                {col.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className={styles.mxPrice}>{col.price}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Wie die Challenge abläuft</SectionTitle>
        <p className={styles.bodyText}>{vibeFlowIntro}</p>
        <div className={styles.heroProofStrip}>
          <span>Kickoff</span>
          <span>Ideen</span>
          <span>Build</span>
          <span>Jury</span>
          <span>Produktisierung</span>
        </div>
        <div className={`${styles.engineFlow} ${styles.engineFlowWide}`}>
          {vibeFlow.map((step) => (
            <div
              key={step.step}
              className={`${styles.engineFlowRow} ${step.outcome ? styles.engineFlowRowOut : ""}`}
            >
              <div className={styles.engineFlowNum}>
                {step.step}
                <span className={styles.engineFlowWhen}>{step.when}</span>
              </div>
              <div className={styles.engineFlowBody}>
                <div className={styles.engineFlowTitle}>{step.title}</div>
                <p className={styles.engineFlowDesc}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Der Innovationspreis und wie bewertet wird</SectionTitle>
        <p className={styles.bodyText}>{vibePrizeIntro}</p>
        <div className={styles.prize}>
          <div className={styles.prizeMain}>
            <h4>Sichtbarkeit statt Gutschein</h4>
            {vibePrizeBody.map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
          </div>
          <div className={styles.crit}>
            {vibeCriteria.map((item) => (
              <div key={item.name} className={styles.critRow}>
                <div className={styles.critTop}>
                  <span className={styles.critName}>{item.name}</span>
                  <span className={styles.critW}>{item.weight}</span>
                </div>
                <div className={styles.critTrack}>
                  <motion.span
                    className={styles.critFill}
                    initial={reduceMotion ? { scaleX: item.width / 40 } : { scaleX: 0 }}
                    whileInView={{ scaleX: item.width / 40 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{
                      duration: reduceMotion ? 0 : DURATION.slow,
                      ease: EASE.outExpo,
                    }}
                  />
                </div>
                <div className={styles.critDesc}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionTitle>Die Rechnung dahinter</SectionTitle>
        <p className={styles.bodyText}>{vibeRoiIntro}</p>
        <div className={styles.roiGrid}>
          <div className={styles.roiTable}>
            {vibeRoiLines.map((line) => (
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
            <span className={styles.roiK}>Der eigentliche Hebel</span>
            <span className={styles.roiV}>5-10 Cases</span>
            <p>{vibeRoiPanel}</p>
          </div>
        </div>
        <p className={styles.footnote}>{vibeRoiFootnote}</p>
      </section>

      <section>
        <div className={styles.guarantee}>
          <div className={styles.guaranteeSeal}>
            Kein
            <br />
            Case
            <br />
            keine
            <br />
            Rechnung
          </div>
          <div>
            <h4 className={styles.guaranteeTitle}>Ergebnisgarantie auf die Pilot-Challenge</h4>
            <p className={styles.bodyText}>{vibeGuarantee}</p>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle>Was nach der Preisverleihung passiert</SectionTitle>
        <p className={styles.bodyText}>{vibeAfterIntro}</p>
        <div className={`${styles.engineFlow} ${styles.engineFlowWide}`}>
          {vibeAfterFlow.map((step) => (
            <div
              key={step.step}
              className={`${styles.engineFlowRow} ${step.outcome ? styles.engineFlowRowOut : ""}`}
            >
              <div className={styles.engineFlowNum}>
                {step.step}
                <span className={styles.engineFlowWhen}>{step.when}</span>
              </div>
              <div className={styles.engineFlowBody}>
                <div className={styles.engineFlowTitle}>{step.title}</div>
                <p className={styles.engineFlowDesc}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Ideal für Organisationen, die …</SectionTitle>
        <div className={styles.benefitGrid}>
          {vibeIdealFor.map((item) => (
            <div key={item} className={styles.benefitItem}>
              <span className={styles.benefitDot} aria-hidden="true" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Die Transformation</SectionTitle>
        <ImpactTable rows={vibeImpact} />
        <Callout>{vibeCallout}</Callout>
      </section>

      <section>
        <SectionTitle>Vier Wochen im Überblick</SectionTitle>
        <div className={styles.timeline} role="tablist" aria-label="Challenge-Ablauf">
          {vibeTimeline.map((step, index) => (
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
        <p className={styles.footnote}>{vibeTimelineNote}</p>
      </section>

      <section>
        <SectionTitle>Konzerntauglich von Tag null</SectionTitle>
        <div className={styles.proofMetrics}>
          {vibeGovernance.map((item) => (
            <div key={item.value} className={styles.metric}>
              <div className={`${styles.metricV} ${styles.metricVLong}`}>{item.value}</div>
              <div className={styles.metricL}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Einstieg und Ausbaustufen</SectionTitle>
        <p className={styles.bodyText}>{vibeTiersIntro}</p>
        <div className={styles.tiers}>
          {vibeTiers.map((tier) => (
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
                    onClick={() => trackCalendlyClick("vibe_challenge_pilot")}
                  >
                    Challenge starten
                  </CtaButton>
                </div>
              )}
            </div>
          ))}
        </div>
        <p className={styles.footnote}>{vibeTiersFootnote}</p>
      </section>

      <section>
        <SectionTitle>Häufige Fragen</SectionTitle>
        <div className={styles.engineFaq}>
          {vibeFaq.map((item, index) => {
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
            <h3>Fragen Sie einmal die Leute, die den Prozess wirklich machen.</h3>
            <p>{vibeFinalLead}</p>
            <CtaButton
              size="md"
              surface="on-dark"
              href={CALENDLY_URL}
              onClick={() => trackCalendlyClick("vibe_challenge_final")}
            >
              Gespräch starten
            </CtaButton>
            <div className={styles.engineFinalMeta}>
              {vibeFinalMeta.map((item) => (
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
            <p className={styles.engineFinalRole}>CEO · uberagent</p>
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
      <ServiceHeroLayout
        tag={<span className={styles.heroTag}>{meta.bannerTag}</span>}
        title={
          <>
            Aus fragmentierten Signalen wird ein <em>operatives GTM-System</em>.
          </>
        }
        lead={
          <>
            Wir bauen AI-gestützte GTM-Infrastruktur: von ICP- und Signal-Logik über Research
            und Enrichment bis zu Routing, Personalisierung, QA und Reporting.
          </>
        }
        stats={meta.stats}
        visual={<GtmControlTowerVisual />}
      />

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
          Mehr Pipeline pro Kopf, ohne zusätzliche operative Last in Marketing, Sales und RevOps.
        </Callout>
      </section>

      <section>
        <SectionTitle>Prozess und Timeline</SectionTitle>
        <p className={styles.bodyText}>
          In 6-8 Wochen von Discovery bis Rollout, mit Shadow-Runs, Governance und Enablement für Ihr Team.
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
  const { openService, navigateHome } = useOverlay();
  const [openAccordionId, setOpenAccordionId] = useState(mcpServices[0]?.id ?? "assess");
  const reduceMotion = useReducedMotion();

  return (
    <div className={styles.content}>
      <ServiceHeroLayout
        tag={<span className={styles.heroTag}>{meta.bannerTag}</span>}
        title={
          <>
            Ihre Systeme werden <em>AI-ready</em>, nicht ersetzt.
          </>
        }
        lead={
          <>
            AI Agents werden nur produktiv, wenn sie sicher auf echte Systeme zugreifen können.
            MCP schließt die Lücke zwischen Modellen und Ihrer operativen Infrastruktur.
          </>
        }
        stats={meta.stats}
        visual={<McpLayerVisual />}
        centerCopy
      />

      <section>
        <SectionTitle>Vom fragmentierten Stack zum kontrollierten Layer</SectionTitle>
        <p className={styles.bodyText}>
          Fragile Einzel-APIs und Prompt-Basteleien skalieren nicht. MCP standardisiert,
          wie Agents lesen, prüfen und schreiben – ohne Ihre Systeme auszutauschen.
        </p>
        <div className={styles.mcpFlow}>
          {mcpExampleFlow.map((step, index) => (
            <div key={step.label} className={styles.mcpFlowStep}>
              <span className={styles.mcpFlowNum}>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step.label}</strong>
              <span>{step.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Security by Design</SectionTitle>
        <p className={styles.bodyText}>
          Enterprise-tauglich von Anfang an: Identität, Rechte und Nachvollziehbarkeit
          sind Teil des Layers – nicht ein Nachtrag.
        </p>
        <div className={styles.mcpSecurity}>
          {mcpSecurityHighlights.map((item) => (
            <div key={item.label} className={styles.mcpSecurityCard}>
              <span className={styles.mcpSecurityLabel}>{item.label}</span>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Assess · Build · Operate</SectionTitle>
        <p className={styles.bodyText}>
          Drei Phasen statt Service-Katalog. Agent-Design und Workflow-Logik liegen bei{" "}
          <button
            type="button"
            className={styles.inlineLink}
            onClick={() => openService("workflow-agents")}
          >
            AI Workflow Agents
          </button>
          .
        </p>
        <div className={styles.mcpAccordion}>
          {mcpServices.map((svc) => {
            const isOpen = openAccordionId === svc.id;
            return (
              <div
                key={svc.id}
                className={`${styles.mcpAccordionItem} ${isOpen ? styles.mcpAccordionItemOpen : ""}`}
              >
                <button
                  type="button"
                  className={styles.mcpAccordionTrigger}
                  aria-expanded={isOpen}
                  onClick={() => setOpenAccordionId(svc.id)}
                >
                  <span className={styles.mcpAccordionTitle}>{svc.title}</span>
                  <span className={styles.mcpAccordionHint}>{svc.description}</span>
                  <span className={styles.mcpAccordionChevron} aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className={styles.mcpAccordionPanel}
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className={styles.mcpAccordionBody}>
                        {svc.items && (
                          <ul className={styles.compactList}>
                            {svc.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <SectionTitle>Wo MCP produktiv wird</SectionTitle>
        <div className={styles.useCaseGrid}>
          {mcpUseCases.map((uc) => (
            <div key={uc.title} className={styles.useCase}>
              <h4 className={styles.useCaseTitle}>{uc.title}</h4>
              <p className={styles.bodyText}>{uc.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.mcpCtaBand}>
        <div>
          <h3 className={styles.sectionTitle}>MCP-Potenzial prüfen</h3>
          <p className={styles.bodyText}>
            In einem kurzen Gespräch klären wir, welche Systeme zuerst AI-ready werden
            und welcher Connector den schnellsten Hebel hat.
          </p>
        </div>
        <CtaButton
          size="md"
          surface="accent"
          showCalendar
          onClick={() => {
            navigateHome();
            window.setTimeout(() => scrollToContact("mcp_inline"), 0);
          }}
        >
          {meta.ctaLabel}
        </CtaButton>
      </section>
    </div>
  );
}

function WorkflowAgentsContent() {
  const meta = serviceModalMeta["workflow-agents"];
  const { navigateHome } = useOverlay();

  return (
    <>
      <div className={styles.content}>
        <ServiceHeroLayout
          tag={<span className={styles.heroTag}>{meta.bannerTag}</span>}
          title={
            <>
              Agenten, die nicht chatten, sondern <em>operative Arbeit</em> erledigen.
            </>
          }
          lead={
            <>
              KI-Agenten sind wertvoll, wenn sie einen klar begrenzten Workflow besser, schneller
              und konsistenter ausführen als manuelle Koordination. Genau dort setzen wir an.
            </>
          }
          stats={meta.stats}
          visual={<WorkflowAgentDeskVisual />}
          centerCopy
        />

        <section>
          <SectionTitle>Ein Workflow, konkret</SectionTitle>
          <p className={styles.bodyText}>
            Statt abstrakter Pain-Points: so arbeitet ein Operations-Agent von Inbox bis Done –
            mit Regeln, Freigabe und Schreibrechten in Ihren Systemen.
          </p>
          <div className={styles.mcpFlow}>
            {agentWorkflowDemo.map((step, index) => (
              <div key={step.label} className={styles.mcpFlowStep}>
                <span className={styles.mcpFlowNum}>{String(index + 1).padStart(2, "0")}</span>
                <strong>
                  {step.label} · {step.title}
                </strong>
                <span>{step.text}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle>Wann es passt, und wann nicht</SectionTitle>
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
      </div>

      <LighthouseOffer
        onCta={() => {
          navigateHome();
          window.setTimeout(() => scrollToContact("kickstart_offer_workflow"), 0);
        }}
      />

      <RoiCalculator
        onCta={() => {
          navigateHome();
          window.setTimeout(() => scrollToContact("roi_calculator"), 0);
        }}
      />
    </>
  );
}

function BusinessModelsContent() {
  const meta = serviceModalMeta["business-models"];

  return (
    <div className={styles.content}>
      <ServiceHeroLayout
        tag={<span className={styles.heroTag}>{meta.bannerTag}</span>}
        title={
          <>
            <span className="mark">Derisking</span> your business models
          </>
        }
        lead={
          <>
            Produktentwicklung und neue Geschäftsmodelle sind zeit-, kosten- und risikointensiv.
            Wir helfen Ihnen, die richtigen Entscheidungen zu treffen, bevor Sie skalieren.
          </>
        }
        stats={meta.stats}
        visual={<BusinessModelWindTunnelVisual />}
      />

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
          Mit klaren Hypothesen, schnellen Experimenten und messbaren Ergebnissen, statt Monate
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
          Validierung ist kein Bremsklotz, sie ist der schnellste Weg zu einem tragfähigen Geschäftsmodell.
        </Callout>
      </section>
    </div>
  );
}

function AiStrategyContent() {
  const meta = serviceModalMeta["ai-strategy"];

  return (
    <div className={styles.content}>
      <ServiceHeroLayout
        tag={<span className={styles.heroTag}>{meta.bannerTag}</span>}
        title={
          <>
            Von Ideen zum <em>priorisierten AI-Portfolio</em>.
          </>
        }
        lead={
          <>
            Statt isolierter Use Cases bauen wir einen Entscheidungsrahmen, mit dem Sie
            AI-Initiativen bewerten, priorisieren und nur dort skalieren, wo Impact, Machbarkeit
            und Governance zusammenpassen.
          </>
        }
        stats={meta.stats}
        visual={<StrategyCommandRoomVisual />}
      />

      <section>
        <SectionTitle>Governance-Rahmen</SectionTitle>
        <p className={styles.bodyText}>
          Damit aus AI nicht eine lose Sammlung von Ideen wird, braucht es klare
          Entscheidungsregeln, Verantwortlichkeiten und Stage-Gates.
        </p>
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
      <ServiceHeroLayout
        tag={<span className={styles.heroTag}>{meta.bannerTag}</span>}
        title={
          <>
            Enablement für Teams, die AI <em>nicht nur testen</em>, sondern betreiben wollen.
          </>
        }
        lead={
          <>
            AI-Systeme bleiben nur produktiv, wenn Teams sie verstehen und steuern können.
            Wir machen Enablement praxisnah: an Ihren Cases, mit klaren Rollen und dokumentiertem
            Betrieb.
          </>
        }
        stats={meta.stats}
        visual={<TrainingAcademyVisual />}
      />

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

function GiftingAgentContent() {
  const meta = serviceModalMeta["corporate-gifting"];
  const [openFaq, setOpenFaq] = useState(0);
  const reduceMotion = useReducedMotion();

  const scrollToHow = () => {
    document.getElementById("gifting-how")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div className={styles.content}>
      <ServiceHeroLayout
        tag={
          <span className={styles.heroTag}>
            <span className={styles.liveDot} aria-hidden="true" />
            {meta.bannerTag}
          </span>
        }
        title={
          <>
            Anlässe bei Ihren Kunden werden zu <em>Aufträgen</em> aus Ihrem Sortiment.
          </>
        }
        titleClassName={styles.heroHeadlineWide}
        lead={meta.lead}
        leadClassName={styles.leadFlush}
        mark={
          <img
            src="/logos/hubspot.svg"
            alt="HubSpot"
            width={36}
            height={36}
            className={styles.heroMarkLogo}
          />
        }
        ctas={
          <>
            <CtaButton
              size="md"
              surface="accent"
              showCalendar
              href={CALENDLY_URL}
              onClick={() => trackCalendlyClick("gifting_hero")}
            >
              15-Minuten-Demo buchen
            </CtaButton>
            <CtaButton size="md" surface="on-dark-ghost" onClick={scrollToHow}>
              So funktioniert&apos;s ansehen
            </CtaButton>
          </>
        }
        visual={<GiftingAgentVisual />}
      />

      <section>
        <SectionTitle>Was das bedeuten kann</SectionTitle>
        <p className={styles.bodyText}>
          Annahme: Ihre Kunden (HubSpot), darunter deren Kontakte als Empfänger,
          Anlässe und Durchschnittswert unter 50 Euro. Daraus Warenwert und 10%
          für überagent. Keine gemessenen Ergebnisse.
        </p>
        <GiftingRevenueCalc />
      </section>

      <section id="gifting-how" className={styles.giftingAnchor}>
        <SectionTitle>So funktioniert&apos;s</SectionTitle>
        <p className={styles.bodyText}>{giftingHowIntro}</p>
        <div className={styles.engineSplit}>
          <GiftingAgentVisual />
          <div className={`${styles.engineFlow} ${styles.giftingFlow}`}>
            {giftingFlow.map((step) => (
              <div
                key={step.step}
                className={`${styles.engineFlowRow} ${step.outcome ? styles.engineFlowRowOut : ""}`}
              >
                <div className={styles.engineFlowNum}>
                  <GiftingGlyph name={step.icon} onDark={step.outcome} />
                  {step.step}
                </div>
                <div className={styles.engineFlowBody}>
                  <div className={styles.engineFlowTitle}>{step.title}</div>
                  <p className={styles.engineFlowDesc}>{step.description}</p>
                  {step.logos && <GiftingCrmLogos tone={step.outcome ? "dark" : "light"} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionTitle>Ihr Kunde steuert Budget, Sie das Sortiment</SectionTitle>
        <p className={styles.bodyText}>{giftingRolesIntro}</p>
        <div className={styles.giftingRoleGrid}>
          {giftingRoles.map((role) => (
            <div key={role.who} className={styles.giftingRole}>
              <span className={styles.giftingRoleWho}>{role.who}</span>
              <h4 className={styles.giftingRoleTitle}>{role.title}</h4>
              <p>{role.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Preise</SectionTitle>
        <p className={styles.bodyText}>{giftingPricing.intro}</p>
        <div className={styles.giftingPriceCard}>
          <div className={styles.giftingPriceHead}>
            <span className={styles.giftingPriceRate}>{giftingPricing.rate}</span>
            <span className={styles.giftingPriceNote}>{giftingPricing.note}</span>
          </div>
          <ul className={styles.giftingPriceList}>
            {giftingPricing.items.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <div className={styles.giftingPriceFoot}>
            <CtaButton
              size="sm"
              surface="on-dark"
              href={CALENDLY_URL}
              onClick={() => trackCalendlyClick("gifting_pricing")}
            >
              15-Minuten-Demo buchen
            </CtaButton>
          </div>
        </div>
        <p className={styles.footnote}>{giftingPricing.footnote}</p>
      </section>

      <section>
        <SectionTitle>Häufige Fragen</SectionTitle>
        <div className={styles.engineFaq}>
          {giftingFaq.map((item, index) => {
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
            <h3>Bereit für planbaren Umsatz?</h3>
            <p>
              In 15 Minuten zeigen wir den Ablauf mit Ihrem Sortiment: HubSpot
              beim Kunden, sein Budget, Freigabe, Bestellung in Ihren Systemen.
            </p>
            <CtaButton
              size="md"
              surface="on-dark"
              href={CALENDLY_URL}
              onClick={() => trackCalendlyClick("gifting_final")}
            >
              15-Minuten-Demo buchen
            </CtaButton>
            <div className={styles.engineFinalMeta}>
              {giftingFinalMeta.map((item) => (
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
            <p className={styles.engineFinalRole}>CEO · uberagent</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function MaximCalcContent() {
  const meta = serviceModalMeta["kalkulations-agent"];
  const [openFaq, setOpenFaq] = useState(0);
  const reduce = useReducedMotion();

  const scrollToHow = () => {
    document.getElementById("maxim-how")?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div className={styles.content}>
      <ServiceHeroLayout
        tag={
          <span className={styles.heroTag}>
            <span className={styles.liveDot} aria-hidden="true" />
            {meta.bannerTag}
          </span>
        }
        title={
          <>
            Angebote in <em>20 Sekunden</em> statt in 15 Minuten.
          </>
        }
        lead={meta.lead}
        note={maximHeroAudience}
        stats={meta.stats}
        centerCopy
        ctas={
          <>
            <CtaButton
              size="md"
              surface="accent"
              showCalendar
              href={CALENDLY_URL}
              onClick={() => trackCalendlyClick("maxim_hero")}
            >
              Kostenlosen Kalkulations-Check anfragen
            </CtaButton>
            <CtaButton size="md" surface="on-dark-ghost" onClick={scrollToHow}>
              So funktioniert es
            </CtaButton>
          </>
        }
        visual={
          <div className={styles.maximHeroStage}>
            <AgentLottie
              src="/lottie/maxim-agent.json"
              poster="/lottie/maxim-agent.png"
              alt="Maxim, der Kalkulations-Agent"
              className={styles.maximHeroLottie}
            />
          </div>
        }
      />

      <section className={styles.maximProblemBand}>
        <p className={styles.maximSectionEyebrow}>Das Problem</p>
        <SectionTitle>
          Sie verlieren jeden Tag zwei bis drei Stunden an Angebote, die Sie nie bezahlt bekommen.
        </SectionTitle>
        <p className={styles.bodyText}>
          Kunde ruft an. Sie suchen Teile, schlagen auf, schätzen Arbeitszeit, tippen die Vorlage und
          schicken raus. Zwanzig bis dreißig Mal am Tag.
        </p>

        <div className={styles.maximTimeHit}>
          <strong>
            {maximTimeProof.value}
            <span>{maximTimeProof.unit}</span>
          </strong>
          <p>{maximTimeProof.detail}</p>
        </div>

        <div className={styles.maximCostGrid}>
          {maximProblemCosts.map((item) => (
            <div key={item.title} className={styles.maximCostCard}>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <p className={styles.maximSectionEyebrow}>{maximDemoIntro.eyebrow}</p>
        <SectionTitle>{maximDemoIntro.title}</SectionTitle>
        <p className={styles.bodyText}>{maximDemoIntro.lead}</p>
        <MaximDemoCarousel />
      </section>

      <section>
        <p className={styles.maximSectionEyebrow}>Schmerz und Lösung</p>
        <SectionTitle>Drei Engpässe. Drei praktische Antworten.</SectionTitle>
        <div className={styles.maximClusterList}>
          {maximSolutionClusters.map((cluster) => (
            <article key={cluster.id} className={styles.maximCluster}>
              <h4>{cluster.title}</h4>
              <p className={styles.maximClusterPain}>{cluster.pain}</p>
              <p className={styles.maximClusterSolution}>{cluster.solution}</p>
              <span className={styles.maximClusterProof}>{cluster.proof}</span>
            </article>
          ))}
        </div>

        <div className={styles.maximMidCta}>
          <p>Passt das zu Ihrem Betrieb? Fünf echte Anfragen reichen für den Check.</p>
          <CtaButton
            size="md"
            surface="accent"
            showCalendar
            href={CALENDLY_URL}
            onClick={() => trackCalendlyClick("maxim_mid")}
          >
            Kalkulations-Check starten
          </CtaButton>
        </div>
      </section>

      <section id="maxim-how" className={styles.giftingAnchor}>
        <p className={styles.maximSectionEyebrow}>So arbeitet Maxim</p>
        <SectionTitle>Ein Agent, der so kalkuliert wie Sie. Nur schneller.</SectionTitle>
        <p className={styles.bodyText}>
          Maxim erfindet keine Zahlen. Er rechnet mit Ihren Regeln. Jede Position ist
          nachvollziehbar, jede Kalkulation wird gespeichert.
        </p>
        <div className={styles.maximStageList}>
          {maximStages.map((stage) => (
            <div key={stage.stage} className={styles.maximStageCard}>
              <span className={styles.maximStageNum}>Stufe {stage.stage}</span>
              <h4>{stage.title}</h4>
              <p>{stage.lead}</p>
              <p className={styles.maximStageResult}>
                <strong>Ergebnis:</strong> {stage.result}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>In sechs Wochen von der Preisliste zum laufenden Agenten.</SectionTitle>
        <div className={`${styles.mcpFlow} ${styles.maximTimeline}`}>
          {maximTimeline.map((step) => (
            <div key={step.step} className={styles.mcpFlowStep}>
              <span className={styles.mcpFlowNum}>{step.step}</span>
              <strong>{step.title}</strong>
              <span>{step.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Ihre Daten bleiben Ihre Daten.</SectionTitle>
        <div className={styles.maximTrustGrid}>
          {maximTrust.map((item) => (
            <div key={item.title} className={styles.maximTrustItem}>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Rechnet sich das? Rechnen Sie selbst.</SectionTitle>
        <p className={styles.bodyText}>
          Stellen Sie Ihre Realität ein. Die Rechnung aktualisiert sich sofort – inklusive Extra-Aufträge
          durch schnellere Angebote.
        </p>
        <MaximRoiCalc />
      </section>

      <section>
        <SectionTitle>Klare Preise. Keine Überraschungen.</SectionTitle>
        <div className={styles.maximPriceGrid}>
          {maximPricing.map((tier) => (
            <div
              key={tier.name}
              className={`${styles.maximPriceCard} ${tier.featured ? styles.maximPriceFeatured : ""}`}
            >
              <span className={styles.maximPriceName}>{tier.name}</span>
              <h4>{tier.detail}</h4>
              <div className={styles.maximPriceMeta}>
                <div>
                  <span>Einrichtung</span>
                  <strong>{tier.setup}</strong>
                </div>
                <div>
                  <span>Betrieb / Monat</span>
                  <strong>{tier.monthly}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className={styles.maximPriceNote}>{maximPricingNote}</p>
      </section>

      <section>
        <SectionTitle>Häufige Fragen</SectionTitle>
        <div className={styles.maximFaq}>
          {maximFaq.map((item, index) => {
            const open = openFaq === index;
            return (
              <div key={item.q} className={styles.maximFaqItem}>
                <button
                  type="button"
                  className={styles.maximFaqTrigger}
                  aria-expanded={open}
                  onClick={() => setOpenFaq(open ? -1 : index)}
                >
                  {item.q}
                  <span aria-hidden="true">{open ? "−" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={styles.maximFaqPanel}
                    >
                      <p className={styles.bodyText}>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.mcpCtaBand}>
        <div>
          <h3 className={styles.sectionTitle}>Fünf Anfragen. Eine Woche. Null Risiko.</h3>
          <p className={styles.bodyText}>
            Sie schicken uns fünf echte Preisanfragen. Maxim kalkuliert sie. Sie vergleichen. Wenn es
            nicht passt, hören Sie nie wieder von uns.
          </p>
        </div>
        <CtaButton
          size="md"
          surface="accent"
          showCalendar
          href={CALENDLY_URL}
          onClick={() => trackCalendlyClick("maxim_cta")}
        >
          Kalkulations-Check starten
        </CtaButton>
      </section>
    </div>
  );
}

const contentByService: Record<string, () => React.ReactNode> = {
  "corporate-gifting": GiftingAgentContent,
  "ai-revenue-engine": RevenueEngineContent,
  "kalkulations-agent": MaximCalcContent,
  "vibe-coding-challenge": VibeChallengeContent,
  "gtm-engineering": GtmContent,
  mcp: McpContent,
  "workflow-agents": WorkflowAgentsContent,
  "business-models": BusinessModelsContent,
  "ai-strategy": AiStrategyContent,
  trainings: TrainingsContent,
};

export function ServicePage({ serviceId, onClose }: { serviceId: string; onClose: () => void }) {
  const service = services.find((s) => s.id === serviceId);
  const meta = serviceModalMeta[serviceId];
  const Content = contentByService[serviceId];
  const seo = useMemo(() => {
    if (!service?.seoTitle || !service.seoDescription) return null;
    return {
      title: service.seoTitle,
      description: service.seoDescription,
      canonical: `${window.location.origin}/service/${service.slug}`,
    };
  }, [service]);

  useDocumentSeo(seo);

  if (!service || !meta || !Content) return null;

  return (
    <PageShell
      title={service.title}
      eyebrow={meta.eyebrow}
      onBack={onClose}
      variant="flush"
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
    </PageShell>
  );
}

/** @deprecated Use ServicePage */
export const ServiceModal = ServicePage;
