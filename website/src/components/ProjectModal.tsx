import { useState } from "react";
import { SmokeBackground } from "@/components/ui/spooky-smoke-animation";
import { Modal } from "./Modal";
import { ModalContactFooter } from "./ModalContactFooter";
import styles from "./ProjectModal.module.css";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const stats = [
  { value: "Tausende", label: "KMU-Kunden" },
  { value: "DE / FR / IT", label: "Sprachen" },
  { value: "Minuten", label: "statt Wochen" },
];

const crmRows = [
  { kunde: "Bäckerei Meier", vertrag: "Q2 2026", produkt: "Hosting", status: "Aktiv" },
  { kunde: "Garage Brunner", vertrag: "Q1 2026", produkt: "Website", status: "Läuft aus" },
  { kunde: "Coiffure Lumière", vertrag: "Q4 2025", produkt: "SEO", status: "Inaktiv" },
];

const locationRows = [
  { website: "baeckerei-meier.ch", google: "4.2 ★", bewertungen: "38", standort: "Bern", branche: "Gastronomie" },
  { website: "garage-brunner.ch", google: "3.1 ★", bewertungen: "12", standort: "Luzern", branche: "Automotive" },
  { website: "coiffure-lumiere.ch", google: "—", bewertungen: "0", standort: "Zürich", branche: "Beauty" },
];

const pipelineSteps = [
  "CRM-Daten",
  "Standortdaten",
  "Daten-Matching",
  "Segmentierung",
  "Website-Analyse",
  "Audit-Bericht",
  "Mail-Sequenz",
  "Sales-Gespräch",
];

const auditCategories = [
  { name: "Website-Qualität", detail: "Struktur, Vertrauen, Inhalt, Nutzerführung", score: "mittel", level: "warn" },
  { name: "Mobile Experience", detail: "Darstellung, Lesbarkeit, Bedienbarkeit", score: "schwach", level: "bad" },
  { name: "Performance", detail: "Ladezeit, technische Reibung, Core Web Vitals", score: "schwach", level: "bad" },
  { name: "SEO-Basis", detail: "Titles, Meta, Indexierung, lokale Keywords", score: "mittel", level: "warn" },
  { name: "Local Visibility", detail: "Google Business, Standort, Auffindbarkeit", score: "mittel", level: "warn" },
  { name: "Bewertungen", detail: "Anzahl, Durchschnitt, Aktualität, Antworten", score: "niedrig", level: "bad" },
  { name: "Conversion", detail: "Kontaktwege, CTAs, Formulare, Buchung", score: "hoch", level: "good" },
  { name: "Tracking-Reife", detail: "Analytics, Pixel, Messbarkeit", score: "niedrig", level: "bad" },
  { name: "Wettbewerb", detail: "Digitale Stärke regionaler Anbieter", score: "hoch", level: "good" },
  { name: "Sales-Kontext", detail: "Laufzeit, Produktnutzung, Upsell-Fit", score: "sehr hoch", level: "good" },
];

const impactRows = [
  { before: "Manuelle Recherche", after: "Automatisierte Analyse" },
  { before: "Generische Kampagnen", after: "Individuelle Gesprächsanlässe" },
  { before: "Unklare Priorisierung", after: "Segmentierte Sales-Pipeline" },
  { before: "Wochen Aufwand", after: "Minuten Laufzeit" },
  { before: "Bauchgefühl", after: "Datenbasierte Empfehlungen" },
  { before: "Einzelaktionen", after: "Wiederholbares System" },
];

const industries = [
  {
    id: "restaurant",
    label: "Restaurant",
    output:
      "Schwache mobile Darstellung, veraltete Speisekarte online, kein Reservierungs-CTA — hohes Potenzial für Website-Relaunch + Google-Profil.",
  },
  {
    id: "zahnarzt",
    label: "Zahnarzt",
    output:
      "Langsame Ladezeit mobil, wenige aktuelle Bewertungen, kein Online-Termin — Empfehlung: Performance + Local SEO + Buchungssystem.",
  },
  {
    id: "coiffeur",
    label: "Coiffeur",
    output:
      "Schwache mobile Darstellung, wenige aktuelle Bewertungen, kein klarer Buchungs-CTA — hohes Potenzial für Website-Relaunch + Google-Profil-Optimierung.",
  },
  {
    id: "handwerker",
    label: "Handwerker",
    output:
      "Kein strukturiertes Angebots-CTA, schwache lokale Sichtbarkeit, veraltete Referenzprojekte — Fokus: Conversion + Local Visibility.",
  },
  {
    id: "physio",
    label: "Physiotherapie",
    output:
      "Gute Inhalte, aber schwaches Tracking und kein Online-Termin — Upsell-Fit für Conversion-Optimierung und CRM-Anbindung.",
  },
];

const agentTabs = {
  segment: {
    title: "Segmentierung",
    lines: [
      "Segment: Website-Relaunch-Potenzial",
      "Priorität: Hoch",
      "Sprache: Französisch",
      "Vertragsstatus: Ablauf in 90 Tagen",
    ],
  },
  audit: {
    title: "Audit",
    lines: [
      "Mobile Performance: Schwach",
      "Local SEO: Mittel",
      "Conversion-Potenzial: Hoch",
      "Bewertungsprofil: Unterdurchschnittlich",
    ],
  },
  mail: {
    title: "Mail-Sequenz",
    lines: [
      "E-Mail 1: Audit-Anlass",
      "E-Mail 2: Lokaler Vergleich",
      "E-Mail 3: Konkrete Verbesserungschance",
    ],
  },
} as const;

type AgentTab = keyof typeof agentTabs;

const techStack = [
  { name: "Salesforce", logo: "/logos/salesforce.svg" },
  { name: "Claude", logo: "/logos/claude.svg" },
  { name: "n8n", logo: "/logos/n8n.svg" },
];

function StatPill({ value, label }: { value: string; label: string }) {
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

export function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
  const [activeIndustry, setActiveIndustry] = useState(industries[2].id);
  const [activeTab, setActiveTab] = useState<AgentTab>("segment");

  const industry = industries.find((i) => i.id === activeIndustry) ?? industries[0];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="KI-Sales-Agent für datenbasierte Kundenaktivierung"
      eyebrow="Success Story"
      headerBanner={
        <div className={styles.smokeBanner}>
          <SmokeBackground />
          <div className={styles.smokeOverlay}>
            <span className={styles.smokeTag}>Vom Kundenstamm zum Sales-System</span>
          </div>
        </div>
      }
      footer={
        <ModalContactFooter
          onClose={onClose}
          label="Datenbasierte Aktivierung besprechen"
        />
      }
    >
      <div className={styles.content}>
        {/* Hero */}
        <section className={styles.heroSection}>
          <p className={styles.lead}>
            Wie aus verstreuten CRM- und Standortdaten personalisierte Verkaufschancen
            für tausende KMU-Kunden wurden.
          </p>
          <div className={styles.statsRow}>
            {stats.map((s) => (
              <StatPill key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.dataChaos}>
              <span className={styles.dataDot} />
              <span className={styles.dataDot} />
              <span className={styles.dataDot} />
              <span className={styles.dataDot} />
              <span className={styles.dataDot} />
              <span className={styles.dataLabel}>Rohdaten</span>
            </div>
            <div className={styles.flowArrow} aria-hidden="true">
              <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
                <path d="M0 8h28M24 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className={styles.auditPreview}>
              <span className={styles.previewLabel}>Audit + Outreach</span>
              <p className={styles.previewSubject}>Ihre Website verliert lokal Sichtbarkeit</p>
              <p className={styles.previewBody}>
                Konkreter Anlass, lokaler Vergleich, niedrigschwelliger Gesprächseinstieg.
              </p>
            </div>
          </div>
        </section>

        {/* Ausgangslage */}
        <section>
          <SectionTitle>Das eigentliche Problem war nicht der Vertrieb. Es waren die Daten.</SectionTitle>
          <p className={styles.bodyText}>
            Eine führende Schweizer Digital-Agentur wollte ihren bestehenden KMU-Kundenstamm gezielt
            aktivieren: Kunden vor Vertragsablauf rechtzeitig binden, ungenutztes Website-Potenzial
            sichtbar machen und Vertriebsgespräche mit konkreten, datenbasierten Gründen eröffnen.
          </p>
          <div className={styles.chaosGrid}>
            <div className={styles.dataTable}>
              <span className={styles.tableLabel}>CRM-Liste</span>
              <table>
                <thead>
                  <tr>
                    <th>Kunde</th>
                    <th>Vertragsende</th>
                    <th>Produkt</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {crmRows.map((row) => (
                    <tr key={row.kunde}>
                      <td>{row.kunde}</td>
                      <td>{row.vertrag}</td>
                      <td>{row.produkt}</td>
                      <td>{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={styles.warningBridge} aria-hidden="true">
              <span className={styles.warningIcon}>⚠</span>
              <p>Keine Verbindung. Keine Priorisierung. Keine skalierbare Personalisierung.</p>
            </div>
            <div className={styles.dataTable}>
              <span className={styles.tableLabel}>Öffentliche Standortdaten</span>
              <table>
                <thead>
                  <tr>
                    <th>Website</th>
                    <th>Google</th>
                    <th>Bewertungen</th>
                    <th>Standort</th>
                  </tr>
                </thead>
                <tbody>
                  {locationRows.map((row) => (
                    <tr key={row.website}>
                      <td>{row.website}</td>
                      <td>{row.google}</td>
                      <td>{row.bewertungen}</td>
                      <td>{row.standort}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyTextMuted}>
            Manuell hätte jede Analyse Recherche, Bewertung, Segmentierung und individuelle Ansprache
            erfordert. Für tausende Kunden war das wirtschaftlich nicht abbildbar.
          </p>
        </section>

        {/* Lösung */}
        <section>
          <SectionTitle>Ein Agent, der nicht nur schreibt, sondern Verkaufschancen erkennt.</SectionTitle>
          <p className={styles.bodyText}>
            Der Agent verbindet Datenquellen, erkennt Kundensegmente, analysiert digitale Schwachstellen
            und erzeugt daraus konkrete Gesprächsanlässe für den Vertrieb — in Deutsch, Französisch oder Italienisch.
          </p>
          <div className={styles.pipeline}>
            {pipelineSteps.map((step, i) => (
              <div key={step} className={styles.pipelineStep}>
                <span className={styles.pipelineNum}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.pipelineLabel}>{step}</span>
                {i < pipelineSteps.length - 1 && (
                  <span className={styles.pipelineConnector} aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Analysemodell */}
        <section>
          <SectionTitle>Was der Agent pro Kunde bewertet</SectionTitle>
          <div className={styles.auditGrid}>
            {auditCategories.map((cat) => (
              <div key={cat.name} className={styles.auditCard}>
                <div className={styles.auditCardHeader}>
                  <span className={styles.auditName}>{cat.name}</span>
                  <span className={`${styles.auditScore} ${styles[`score_${cat.level}`]}`}>
                    {cat.score}
                  </span>
                </div>
                <p className={styles.auditDetail}>{cat.detail}</p>
              </div>
            ))}
          </div>
          <div className={styles.auditSummary}>
            <div className={styles.summaryRow}>
              <span>Website-Potenzial</span>
              <strong className={styles.score_good}>Hoch</strong>
            </div>
            <div className={styles.summaryRow}>
              <span>Retention-Risiko</span>
              <strong className={styles.score_warn}>Mittel</strong>
            </div>
            <div className={styles.summaryRow}>
              <span>Upsell-Fit</span>
              <strong className={styles.score_good}>Sehr hoch</strong>
            </div>
            <div className={styles.summaryRow}>
              <span>Empfohlener Gesprächsanlass</span>
              <strong>Website-Relaunch + lokale Sichtbarkeit</strong>
            </div>
          </div>
        </section>

        {/* Personalisierung */}
        <section>
          <SectionTitle>Von generischer Kampagne zu individuellem Anlass</SectionTitle>
          <div className={styles.mailCompare}>
            <div className={`${styles.mailCard} ${styles.mailBad}`}>
              <span className={styles.mailTag}>Generisch</span>
              <p className={styles.mailSubject}>Betreff: Verbessern Sie Ihre Website</p>
              <p className={styles.mailBody}>
                Sehr geehrte Damen und Herren, wir bieten moderne Websites für KMU...
              </p>
            </div>
            <div className={`${styles.mailCard} ${styles.mailGood}`}>
              <span className={styles.mailTag}>KI-generiert</span>
              <p className={styles.mailSubject}>
                Betreff: Ihre Website verliert lokal Sichtbarkeit in Zürich
              </p>
              <p className={styles.mailBody}>
                Guten Tag [Name], bei der Analyse Ihres digitalen Auftritts ist aufgefallen, dass
                Ihre Website mobil langsam lädt, während mehrere Wettbewerber in Zürich sichtbarer auftreten...
              </p>
            </div>
          </div>
          <p className={styles.callout}>
            Der Agent schreibt nicht einfach personalisierte Mails. Er erzeugt einen echten Anlass für das Gespräch.
          </p>
        </section>

        {/* Interaktive Demo */}
        <section>
          <SectionTitle>Agent-Output pro Branche</SectionTitle>
          <div className={styles.industryPicker}>
            {industries.map((ind) => (
              <button
                key={ind.id}
                type="button"
                className={`${styles.industryBtn} ${activeIndustry === ind.id ? styles.industryBtnActive : ""}`}
                onClick={() => setActiveIndustry(ind.id)}
              >
                {ind.label}
              </button>
            ))}
          </div>
          <div className={styles.demoOutput}>
            <p>
              <strong>Für {industry.label} in Zürich:</strong> {industry.output}
            </p>
          </div>

          <div className={styles.agentTabs}>
            {(Object.keys(agentTabs) as AgentTab[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`${styles.tabBtn} ${activeTab === key ? styles.tabBtnActive : ""}`}
                onClick={() => setActiveTab(key)}
              >
                {agentTabs[key].title}
              </button>
            ))}
          </div>
          <div className={styles.tabPanel}>
            {agentTabs[activeTab].lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </section>

        {/* Impact */}
        <section>
          <SectionTitle>Was sich dadurch verändert</SectionTitle>
          <div className={styles.impactTable}>
            <div className={styles.impactHeader}>
              <span>Vorher</span>
              <span>Nachher</span>
            </div>
            {impactRows.map((row) => (
              <div key={row.before} className={styles.impactRow}>
                <span className={styles.impactBefore}>{row.before}</span>
                <span className={styles.impactArrow} aria-hidden="true">→</span>
                <span className={styles.impactAfter}>{row.after}</span>
              </div>
            ))}
          </div>
          <p className={styles.callout}>
            Der Vertrieb startet nicht mehr bei null. Jeder Kontakt beginnt mit einem konkreten,
            nachvollziehbaren Grund.
          </p>
          <p className={styles.bodyText}>
            Aus zwei unverbundenen Datenquellen wurde ein systematischer Sales-Prozess. Retention,
            Upselling und Website-Neugeschäft werden in einem automatisierten Prozess verbunden —
            präzise, mehrsprachig und skalierbar.
          </p>
        </section>

        {/* Tech Stack */}
        <section className={styles.techSection}>
          <SectionTitle>Tech Stack</SectionTitle>
          <div className={styles.techLogos}>
            {techStack.map((tech) => (
              <div key={tech.name} className={styles.techLogo}>
                <img src={tech.logo} alt={tech.name} width={40} height={40} />
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
          <p className={styles.clientNote}>
            Client: Führendes Schweizer Digitalmarketing-Unternehmen
          </p>
        </section>
      </div>
    </Modal>
  );
}
