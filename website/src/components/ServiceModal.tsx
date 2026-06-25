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
  serviceModalMeta,
  strategyDecision,
  strategyDeepDive,
  strategyDiscoveryAreas,
  strategyFrameworks,
  strategyFunnel,
  strategyGovernance,
  strategyImpact,
  strategyKpiLayers,
  strategyScoreIndices,
  type ImpactRow,
  type ServiceStat,
} from "../data/serviceModalContent";
import { services } from "../data/services";
import styles from "./ServiceModal.module.css";

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
  scale: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 17l5-8 4 5 5-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 19h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

function StrategyProcessFlow() {
  return (
    <div className={styles.processTrack}>
      <div className={styles.processHeader}>
        <span className={styles.processEyebrow}>6-Phasen-Prozess</span>
        <p className={styles.processIntro}>
          Jeder Use Case durchläuft denselben Funnel. Stage-Gates verhindern, dass Initiativen
          ohne Evidenz weiterrollen.
        </p>
      </div>
      <ol className={styles.processFlow}>
        {strategyFunnel.map((step, index) => (
          <li key={step.title} className={styles.processNode}>
            <div className={styles.processCard}>
              <div className={styles.processIconWrap}>
                {funnelStepIcons[step.icon]}
              </div>
              <span className={styles.processStep}>{step.step}</span>
              <span className={styles.processTitle}>{step.title}</span>
              <p className={styles.processDesc}>{step.description}</p>
            </div>
            {index < strategyFunnel.length - 1 && (
              <span className={styles.processConnector} aria-hidden="true">
                <svg viewBox="0 0 24 12" fill="none">
                  <path d="M0 6h18M14 2l6 4-6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </li>
        ))}
      </ol>
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
        <SectionTitle>Das Problem: viele Tools, wenig Execution</SectionTitle>
        <div className={styles.compareVisual}>
          <div className={styles.compareCard}>
            <span className={styles.compareLabel}>Heute</span>
            <ul className={styles.compareList}>
              <li>CRM, Sheets, Outreach-Tools — getrennt</li>
              <li>Manuelle Recherche & Briefings</li>
              <li>Unklare Signale, schwache Priorisierung</li>
            </ul>
          </div>
          <div className={styles.compareArrow} aria-hidden="true">→</div>
          <div className={`${styles.compareCard} ${styles.compareCardGood}`}>
            <span className={styles.compareLabel}>Mit überagent</span>
            <ul className={styles.compareList}>
              <li>Eine GTM-Ausführungsschicht</li>
              <li>Automatisiertes Enrichment & Routing</li>
              <li>Signal-basierte Priorisierung</li>
            </ul>
          </div>
        </div>
        <p className={styles.bodyText}>
          Statt weitere Einzellösungen auf den Stack zu setzen, verbinden wir CRM, Produktdaten,
          externe Signale und Workflows zu einem System — bei dem ICP, Priorisierung, Research,
          Personalisierung und Reporting zusammenhängen.
        </p>
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
        <SectionTitle>Warum MCP jetzt relevant wird</SectionTitle>
        <div className={styles.problemVisual}>
          <div className={styles.problemSide}>
            <span className={styles.problemLabel}>Ohne MCP</span>
            <div className={styles.chaosDots} aria-hidden="true">
              <span /><span /><span /><span /><span />
            </div>
            <p>APIs, DBs, SaaS, Docs — verstreut, fragil, unsicher</p>
          </div>
          <div className={styles.problemBridge}>
            <span className={styles.mcpBadge}>MCP Layer</span>
          </div>
          <div className={styles.problemSide}>
            <span className={styles.problemLabel}>Mit MCP</span>
            <div className={styles.agentStack}>
              <span>Agent</span>
              <span>Tools</span>
              <span>Resources</span>
            </div>
            <p>Standardisiert, kontrolliert, erweiterbar</p>
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
          AI-Initiativen scheitern selten an der Technologie, sondern an fehlender Priorisierung,
          unklarer Governance und zu vielen parallelen PoCs. Wir strukturieren Ihr AI-Portfolio
          von der ersten Idee bis zur skalierbaren Umsetzung.
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
              <li>Viele parallele PoCs</li>
              <li>Kein gemeinsames Scoring</li>
              <li>Unklare Stage-Gates</li>
            </ul>
          </div>
          <FlowArrow />
          <div className={styles.heroPanelAccent}>
            <span className={styles.panelLabel}>Portfolio</span>
            <div className={styles.miniStack}>
              <span>Discovery</span>
              <span>Priority Score</span>
              <span>Lighthouse Bets</span>
            </div>
            <ul className={styles.panelList}>
              <li>1–2 fokussierte Umsetzungen</li>
              <li>Governance &amp; KPIs</li>
            </ul>
          </div>
        </div>
        <p className={styles.inlineCta}>
          <strong>Nächster Schritt:</strong> In einem Strategie-Workshop kartieren wir Ihren
          Ist-Stand, sammeln Use Cases und leiten die ersten Lighthouse-Bets ab, mit einem
          Score-Modell, das Ihr Management live justieren kann.
        </p>
      </section>

      <section className={styles.strategyPanel}>
        <SectionTitle>Operating Model: iterativer Funnel</SectionTitle>
        <StrategyProcessFlow />
        <div className={styles.governancePanel}>
          <span className={styles.governanceLabel}>Governance</span>
          <div className={styles.benefitGrid}>
            {strategyGovernance.map((item) => (
              <div key={item} className={styles.benefitItem}>
                <span className={styles.benefitDot} aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.strategyPanel}>
        <SectionTitle>Use-Case-Discovery</SectionTitle>
        <p className={styles.bodyText}>
          Systematische Sammlung über Funktionen hinweg, von Revenue-Hebeln über Operations
          bis zu internen Quick Wins mit niedrigem Risiko.
        </p>
        <div className={styles.discoveryGrid}>
          {strategyDiscoveryAreas.map((area, i) => (
            <div key={area.title} className={styles.discoveryCard}>
              <div className={styles.discoveryHead}>
                <span className={styles.discoveryIcon} aria-hidden="true">
                  {i === 0 && (
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M4 6h16v12H4V6z" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                  {i === 1 && (
                    <svg viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                  {i === 2 && (
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <h4 className={styles.discoveryTitle}>{area.title}</h4>
              </div>
              <ul className={styles.compactList}>
                {area.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.strategyPanel}>
        <SectionTitle>Grobbewertung: ein verbundener Priority Score</SectionTitle>
        <p className={styles.bodyText}>
          Kein getrenntes Ranking je Metrik. Eine Formel bündelt Value, Feasibility und Risk
          multiplikativ. Hoher Value bei niedriger Machbarkeit oder hohem Risiko fällt automatisch zurück.
        </p>
        <div className={styles.scoreVisual}>
          {strategyScoreIndices.flatMap((row, i) => {
            const nodes: React.ReactNode[] = [];
            if (i > 0) {
              nodes.push(
                <span key={`op-${i}`} className={styles.scoreOp} aria-hidden="true">×</span>,
              );
            }
            nodes.push(
              <div key={row.index} className={styles.scoreCard}>
                <span className={styles.scoreBadge}>{row.index}</span>
                <p className={styles.scoreCardText}>{row.metrics}</p>
              </div>,
            );
            return nodes;
          })}
        </div>
        <div className={styles.formulaBox}>
{`Value-Index   = Σ (Gewicht × V)           (1–5)
Feas.-Index   = Σ (Gewicht × F)           (1–5)
Risk-Index    = Σ (Gewicht × R)           (1–5)
Risk-Faktor   = 1 − 0,5 × (Risk − 1) / 4  (1,0 … 0,5)

Priority Score = (Value/5) × (Feasibility/5) × Risk-Faktor × 100`}
        </div>
        <Callout>
          Max. Risiko halbiert den Score, eliminiert ihn aber nicht. Das Ergebnis ist eine
          Diskussionsgrundlage mit klarem Ranking und Heatmap, nicht ein K.-o.-Kriterium.
        </Callout>
      </section>

      <section>
        <SectionTitle>Feinbewertung: Top-Kandidaten</SectionTitle>
        <div className={styles.experimentGrid}>
          {strategyDeepDive.map((item, i) => (
            <div key={item.title} className={styles.experimentCard}>
              <span className={styles.experimentNum}>{String(i + 1).padStart(2, "0")}</span>
              <h4 className={styles.experimentTitle}>{item.title}</h4>
              <p className={styles.bodyText}>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.strategyPanel}>
        <SectionTitle>KPI-Framework</SectionTitle>
        <p className={styles.bodyText}>
          Baseline vor jedem PoC fixieren, per A/B oder Vorher-Nachher. Jeder PoC hat eine
          definierte Erfolgs-Schwelle für Go/No-Go.
        </p>
        <div className={styles.kpiStack}>
          {strategyKpiLayers.map((kpi, i) => (
            <div key={kpi.layer} className={styles.kpiLayer}>
              <div className={styles.kpiLayerMarker}>
                <span className={styles.kpiLayerNum}>{String(i + 1).padStart(2, "0")}</span>
                {i < strategyKpiLayers.length - 1 && <span className={styles.kpiLayerLine} />}
              </div>
              <div className={styles.kpiLayerBody}>
                <span className={styles.kpiLayerTitle}>{kpi.layer}</span>
                <p className={styles.kpiLayerDesc}>{kpi.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Entscheidung &amp; MVP-Shaping</SectionTitle>
        <div className={styles.decisionGrid}>
          {strategyDecision.map((item) => (
            <div key={item.title} className={styles.decisionCard}>
              <h4 className={styles.decisionTitle}>{item.title}</h4>
              <p className={styles.bodyText}>{item.description}</p>
            </div>
          ))}
        </div>
        <p className={styles.bodyText}>
          MVP: kleinster nutzbarer Scope, klare Hypothese, Time-box (typisch 6 bis 8 Wochen)
          und definierter Nutzerkreis, bevor Budget in die Breite fließt.
        </p>
      </section>

      <section className={styles.strategyPanel}>
        <SectionTitle>Bewährte Frameworks, adaptiert statt neu erfunden</SectionTitle>
        <div className={styles.frameworkGrid}>
          {strategyFrameworks.map((fw) => (
            <div key={fw.title} className={styles.frameworkCard}>
              <span className={styles.frameworkTag}>{fw.tag}</span>
              <h4 className={styles.frameworkTitle}>{fw.title}</h4>
              <p className={styles.frameworkDesc}>{fw.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Die Transformation</SectionTitle>
        <ImpactTable rows={strategyImpact} />
        <Callout>
          Portfolio statt Projektliste, mit wenigen gut begründeten Bets und messbarer Skalierung.
        </Callout>
        <p className={styles.inlineCta}>
          <strong>Bereit für Klarheit?</strong> Wir moderieren den Strategie-Workshop, liefern
          das Scoring-Modell und begleiten Sie bis zur ersten Lighthouse-Entscheidung.
        </p>
      </section>
    </div>
  );
}

const contentByService: Record<string, () => React.ReactNode> = {
  "gtm-engineering": GtmContent,
  mcp: McpContent,
  "workflow-agents": WorkflowAgentsContent,
  "business-models": BusinessModelsContent,
  "ai-strategy": AiStrategyContent,
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
        <ModalContactFooter onClose={onClose} label={meta.ctaLabel} />
      }
    >
      <Content />
    </Modal>
  );
}
