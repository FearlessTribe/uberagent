import { Modal } from "./Modal";
import { ModalContactFooter } from "./ModalContactFooter";
import { ProcessSlider } from "./ProcessSlider";
import {
  agentApproach,
  agentUseCases,
  mcpServices,
  mcpUseCases,
} from "../data/content";
import { services } from "../data/services";
import styles from "./ServiceModal.module.css";

interface ServiceModalProps {
  serviceId: string | null;
  onClose: () => void;
}

const serviceEyebrows: Record<string, string> = {
  "gtm-engineering": "Go-to-Market",
  mcp: "Model Context Protocol",
  "workflow-agents": "AI Workflow Agents",
  "business-models": "Business Validation",
};

export function ServiceModal({ serviceId, onClose }: ServiceModalProps) {
  const service = services.find((s) => s.id === serviceId);
  if (!service) return null;

  return (
    <Modal
      isOpen={!!serviceId}
      onClose={onClose}
      title={service.title}
      eyebrow={serviceEyebrows[serviceId ?? ""] ?? "Service"}
      footer={<ModalContactFooter onClose={onClose} />}
    >
      {serviceId === "business-models" && <BusinessModelsContent />}
      {serviceId === "gtm-engineering" && <GtmContent />}
      {serviceId === "workflow-agents" && <WorkflowAgentsContent />}
      {serviceId === "mcp" && <McpContent />}
    </Modal>
  );
}

function FeatureCard({
  label,
  title,
  children,
}: {
  label?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.featureCard}>
      {label && <span className={styles.featureLabel}>{label}</span>}
      <h3 className={styles.featureTitle}>{title}</h3>
      {children}
    </div>
  );
}

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className={styles.statPill}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

function BusinessModelsContent() {
  return (
    <div className={styles.content}>
      <p className={styles.lead}>
        Produktentwicklung und Ausrollen von neuen Geschäftsmodellen ist etwas
        sehr Zeit-, Kosten- und risikointensives.
      </p>

      <div className={styles.statsRow}>
        <StatPill value="↓" label="Risiko" />
        <StatPill value="↑" label="Validierung" />
        <StatPill value="→" label="Marktreife" />
      </div>

      <FeatureCard title="Von der Idee zum validierten Geschäftsmodell">
        <p className="body">
          Wir helfen Ihnen, neue Geschäftsideen strukturiert zu validieren — bevor
          Sie Zeit und Budget in die falsche Richtung investieren. Mit klaren
          Hypothesen, schnellen Experimenten und messbaren Ergebnissen.
        </p>
      </FeatureCard>

      <div className={styles.phaseGrid}>
        {["Hypothese", "Experiment", "Validierung", "Skalierung"].map((phase, i) => (
          <div key={phase} className={styles.phaseItem}>
            <span className={styles.phaseNum}>{String(i + 1).padStart(2, "0")}</span>
            <span className={styles.phaseName}>{phase}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GtmContent() {
  return (
    <div className={styles.content}>
      <p className={styles.lead}>
        Für RevOps, Marketing und Sales, die CRM, Signale und Outreach sauber
        verbinden wollen.
      </p>

      <div className={styles.statsRow}>
        <StatPill value="ICP" label="Signal-Logik" />
        <StatPill value="CRM" label="Integration" />
        <StatPill value="QA" label="Governance" />
      </div>

      <FeatureCard label="Kernleistung" title="AI GTM Engineering für B2B-SaaS-Teams">
        <p className="body">
          Wir bauen AI-gestützte GTM-Infrastruktur: von ICP- und Signal-Logik über
          Research- und Enrichment-Workflows bis zu Routing, Personalisierung, QA
          und Reporting.
        </p>
      </FeatureCard>

      <ul className={styles.list}>
        <li>Sauberere ICP-, TAM- und Signalmodelle für bessere Priorisierung</li>
        <li>Weniger manuelle Listenarbeit, Briefings und Handoffs</li>
        <li>Schnellere Reaktion auf Kauf-, Nutzungs- und Markt-Signale</li>
        <li>Personalisierte Outbound- und Follow-up-Workflows über Ihren Stack</li>
        <li>Monitoring, QA und Ownership für nachhaltigen Betrieb im Team</li>
      </ul>

      <FeatureCard label="Timeline" title="Prozess und Timeline">
        <ProcessSlider />
      </FeatureCard>
    </div>
  );
}

function WorkflowAgentsContent() {
  return (
    <div className={styles.content}>
      <p className={styles.lead}>
        AI Agents für Workflows, die nicht nur antworten, sondern handeln — mit
        Regeln, Freigaben und voller Nachvollziehbarkeit.
      </p>

      <FeatureCard label="Kernprinzip" title="Das Wichtigste zu AI-Agents">
        <p className="body">
          Digitale Mitarbeitende für konkrete Prozesse. KI-Agenten sind dann
          wertvoll, wenn sie einen klar begrenzten Workflow besser, schneller
          und konsistenter ausführen als manuelle Koordination.
        </p>
      </FeatureCard>

      <div className={styles.twoCol}>
        <div className={styles.miniCard}>
          <span className={styles.featureLabel}>Kontrolle</span>
          <h4 className={styles.miniTitle}>Automatisieren, ohne Kontrolle abzugeben</h4>
          <p className="body">
            Wir definieren, was ein Agent selbst tun darf, wo er eskalieren muss
            und wann ein Mensch freigibt.
          </p>
        </div>
        <div className={styles.miniCard}>
          <span className={styles.featureLabel}>Integration</span>
          <h4 className={styles.miniTitle}>In bestehende Systeme integriert</h4>
          <p className="body">
            Wir verbinden Ihre Agenten mit CRMs, Ticketsystemen, Dokumenten und
            internen Workflows.
          </p>
        </div>
      </div>

      <h3 className={styles.sectionTitle}>Was AI Agents leisten</h3>
      <div className={styles.benefitGrid}>
        {[
          "Mehr Produktivität",
          "Weniger Aufwand",
          "Schnellere Prozesse",
          "Bessere Entscheidungen",
          "Skalierbarkeit",
        ].map((b) => (
          <div key={b} className={styles.benefitItem}>
            <span className={styles.benefitDot} aria-hidden="true" />
            {b}
          </div>
        ))}
      </div>

      <h3 className={styles.sectionTitle}>Wo KI-Agenten wirken</h3>
      <div className={styles.useCaseGrid}>
        {agentUseCases.map((uc) => (
          <div key={uc.title} className={styles.useCase}>
            <h4 className={styles.useCaseTitle}>{uc.title}</h4>
            <p className="body">{uc.description}</p>
          </div>
        ))}
      </div>

      <h3 className={styles.sectionTitle}>Unser Vorgehen</h3>
      <div className={styles.approachGrid}>
        {agentApproach.map((step) => (
          <div key={step.number} className={styles.approachStep}>
            <span className={styles.approachNum}>{step.number}</span>
            <h4 className={styles.useCaseTitle}>{step.title}</h4>
            <p className="body">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function McpContent() {
  return (
    <div className={styles.content}>
      <p className={styles.lead}>
        Machen Sie Ihre Systeme bereit für AI Agents. Wir entwickeln sichere
        MCP-Server und Integrationen für kontrollierten Datenzugriff.
      </p>

      <FeatureCard label="Warum jetzt" title="MCP schließt die Integrationslücke">
        <p className="body">
          AI Agents werden nur dann wirklich produktiv, wenn sie sicher auf echte
          Systeme zugreifen können. MCP schafft einen standardisierten Layer
          zwischen AI-Modellen und Ihren operativen Systemen.
        </p>
      </FeatureCard>

      <h3 className={styles.sectionTitle}>Unsere MCP Services</h3>
      {mcpServices.map((svc, i) => (
        <div key={svc.title} className={styles.mcpService}>
          <div className={styles.mcpServiceHeader}>
            <span className={styles.mcpNum}>{String(i + 1).padStart(2, "0")}</span>
            <h4 className={styles.useCaseTitle}>{svc.title}</h4>
          </div>
          <p className="body">{svc.description}</p>
          {svc.items && (
            <ul className={styles.list}>
              {svc.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <h3 className={styles.sectionTitle}>Typische MCP Use Cases</h3>
      <div className={styles.useCaseGrid}>
        {mcpUseCases.map((uc) => (
          <div key={uc.title} className={styles.useCase}>
            <h4 className={styles.useCaseTitle}>{uc.title}</h4>
            <p className="body">{uc.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
