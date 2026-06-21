import { SmokeBackground } from "@/components/ui/spooky-smoke-animation";
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
  type ImpactRow,
  type ServiceStat,
} from "../data/serviceModalContent";
import { services } from "../data/services";
import styles from "./ServiceModal.module.css";

interface ServiceModalProps {
  serviceId: string | null;
  onClose: () => void;
}

function ServiceBanner({ tag }: { tag: string }) {
  return (
    <div className={styles.smokeBanner}>
      <SmokeBackground />
      <div className={styles.smokeOverlay}>
        <span className={styles.smokeTag}>{tag}</span>
      </div>
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

function GtmContent() {
  return (
    <div className={styles.content}>
      <section className={styles.heroSection}>
        <p className={styles.lead}>
          Wir bauen AI-gestützte GTM-Infrastruktur: von ICP- und Signal-Logik über Research
          und Enrichment bis zu Routing, Personalisierung, QA und Reporting.
        </p>
        <div className={styles.statsRow}>
          {serviceModalMeta["gtm-engineering"].stats.map((s) => (
            <StatPill key={s.label} {...s} />
          ))}
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
  return (
    <div className={styles.content}>
      <section className={styles.heroSection}>
        <p className={styles.lead}>
          AI Agents werden nur produktiv, wenn sie sicher auf echte Systeme zugreifen können.
          MCP schliesst die Lücke zwischen Modellen und Ihrer operativen Infrastruktur.
        </p>
        <div className={styles.statsRow}>
          {serviceModalMeta.mcp.stats.map((s) => (
            <StatPill key={s.label} {...s} />
          ))}
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
  return (
    <div className={styles.content}>
      <section className={styles.heroSection}>
        <p className={styles.lead}>
          KI-Agenten sind wertvoll, wenn sie einen klar begrenzten Workflow besser, schneller
          und konsistenter ausführen als manuelle Koordination. Genau dort setzen wir an.
        </p>
        <div className={styles.statsRow}>
          {serviceModalMeta["workflow-agents"].stats.map((s) => (
            <StatPill key={s.label} {...s} />
          ))}
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
  return (
    <div className={styles.content}>
      <section className={styles.heroSection}>
        <p className={styles.lead}>
          Produktentwicklung und neue Geschäftsmodelle sind zeit-, kosten- und risikointensiv.
          Wir helfen Ihnen, die richtigen Entscheidungen zu treffen — bevor Sie skalieren.
        </p>
        <div className={styles.statsRow}>
          {serviceModalMeta["business-models"].stats.map((s) => (
            <StatPill key={s.label} {...s} />
          ))}
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

const contentByService: Record<string, () => React.ReactNode> = {
  "gtm-engineering": GtmContent,
  mcp: McpContent,
  "workflow-agents": WorkflowAgentsContent,
  "business-models": BusinessModelsContent,
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
      headerBanner={<ServiceBanner tag={meta.bannerTag} />}
      footer={
        <ModalContactFooter onClose={onClose} label={meta.ctaLabel} />
      }
    >
      <Content />
    </Modal>
  );
}
