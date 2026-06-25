import { services, type ServiceStat } from "./services";

export type { ServiceStat };

export interface ImpactRow {
  before: string;
  after: string;
}

export interface ServiceModalContent {
  eyebrow: string;
  bannerTag: string;
  lead: string;
  stats: ServiceStat[];
  ctaLabel: string;
}

export const serviceModalMeta: Record<string, ServiceModalContent> = Object.fromEntries(
  services.map((s) => [
    s.id,
    {
      eyebrow: s.eyebrow,
      bannerTag: s.bannerTag,
      lead: s.lead,
      stats: s.stats,
      ctaLabel: s.ctaLabel,
    },
  ]),
);

export const gtmBenefits = [
  "Sauberere ICP-, TAM- und Signalmodelle für bessere Priorisierung",
  "Weniger manuelle Listenarbeit, Briefings und Handoffs zwischen Teams",
  "Schnellere Reaktion auf Kauf-, Nutzungs- und Markt-Signale",
  "Personalisierte Outbound- und Follow-up-Workflows über Ihren Stack",
  "Monitoring, QA und Ownership für nachhaltigen Betrieb im Team",
];

export const gtmImpact: ImpactRow[] = [
  { before: "Fragmentierte Tools & Tabellen", after: "Eine GTM-Ausführungsschicht" },
  { before: "Manuelle Account-Recherche", after: "Automatisiertes Enrichment" },
  { before: "Unklare Priorisierung", after: "Signal-basiertes Scoring" },
  { before: "Generische Outreach", after: "Kontextuelle Personalisierung" },
  { before: "Keine QA", after: "Governance & Monitoring" },
];

export const gtmIdealFor = [
  "Wachsender Tech-Stack mit fragmentierten Daten",
  "Zu viel manuelle Arbeit in Marketing, Sales und RevOps",
  "Unklare Signale und schwache Priorisierung",
  "Teams, die Pipeline pro Kopf steigern wollen",
];

export const mcpValueProps = [
  {
    title: "AI Agents mit echtem Datenzugriff",
    description:
      "Agents greifen auf Kundendaten, Tickets, Dokumente und Reports zu — kontextbezogen statt isoliert.",
  },
  {
    title: "Sichere Aktionen in Live-Systemen",
    description:
      "Nicht nur lesen: Datensätze anlegen, Status ändern, Workflows auslösen — mit klaren Grenzen.",
  },
  {
    title: "Standard statt Einzellösung",
    description:
      "MCP strukturiert Tools, Ressourcen und Aktionen — wartbar, erweiterbar, zukunftssicher.",
  },
  {
    title: "Bestehende Systeme nutzbar machen",
    description:
      "Kein Systemersatz nötig. CRM, ERP und Wissensdatenbanken werden AI-ready angebunden.",
  },
];

export const mcpImpact: ImpactRow[] = [
  { before: "Fragile Prompt-Basteleien", after: "Standardisierte MCP-Schnittstelle" },
  { before: "Unsichere API-Zugriffe", after: "OAuth, Rollen & Audit Logs" },
  { before: "Isolierte Chatbots", after: "Agents mit Systemkontext" },
  { before: "Schwer wartbar", after: "Erweiterbare Connector-Architektur" },
];

export const agentPrinciples = [
  {
    label: "Kontrolle",
    title: "Automatisieren, ohne Kontrolle abzugeben",
    description:
      "Wir definieren, was ein Agent selbst tun darf, wo er eskalieren muss und wann ein Mensch freigibt.",
  },
  {
    label: "Integration",
    title: "In bestehende Systeme eingebunden",
    description:
      "CRMs, Ticketsysteme, Postfächer und interne Workflows — der Agent arbeitet dort, wo Ihr Team arbeitet.",
  },
  {
    label: "Messbarkeit",
    title: "Kontrolliert skalieren",
    description:
      "Der Agent startet fokussiert auf einen Use Case, wird gemessen und Schritt für Schritt erweitert.",
  },
];

export const agentBenefits = [
  "Mehr Produktivität — Routine läuft automatisch",
  "Weniger Aufwand — weniger Copy-Paste und Rückfragen",
  "Schnellere Prozesse — Informationen fliessen automatisch",
  "Bessere Entscheidungen — strukturierte, aktuelle Daten",
  "Skalierbarkeit — mehr Volumen ohne mehr Personal",
];

export const agentFit = {
  good: [
    "Wiederkehrende Aufgaben binden viel Zeit",
    "Informationen aus mehreren Quellen müssen zusammen",
    "Teams sollen entlastet werden ohne Kontrollverlust",
  ],
  bad: [
    "Jede Entscheidung braucht stark individuelles Urteil",
    "Keine klaren Regeln oder Prozessgrenzen vorhanden",
  ],
};

export const agentImpact: ImpactRow[] = [
  { before: "Manuelle Triage & Routing", after: "Automatische Weiterleitung" },
  { before: "Recherche vor jedem Termin", after: "Vorbereitete Briefings" },
  { before: "Unsaubere Stammdaten", after: "Proaktive Datenpflege" },
  { before: "Vergessene Follow-ups", after: "Überwachte Nachverfolgung" },
];

export const businessExperiments = [
  {
    title: "Problem validieren",
    description: "Existiert das Problem wirklich? Zahlen Kunden dafür?",
    metric: "Interviews · Landing Pages · Wartelisten",
  },
  {
    title: "Lösung testen",
    description: "Löst unser Ansatz das Problem messbar?",
    metric: "Prototyp · Concierge MVP · Pilotkunden",
  },
  {
    title: "Kanal prüfen",
    description: "Wie erreichen wir die Zielgruppe wirtschaftlich?",
    metric: "CAC · Conversion · Channel-Tests",
  },
  {
    title: "Unit Economics",
    description: "Trägt das Modell bei Skalierung?",
    metric: "LTV · Margen · Payback",
  },
];

export const businessImpact: ImpactRow[] = [
  { before: "Bauen und hoffen", after: "Hypothesen getestet" },
  { before: "Monate Entwicklung", after: "Wochen bis zur Klarheit" },
  { before: "Intuitions-Entscheidungen", after: "Datenbasiertes Go/No-Go" },
  { before: "Hohes Investitionsrisiko", after: "Gestufte Validierung" },
];

export const strategyFunnel = [
  { step: "01", title: "Collect", icon: "collect", description: "Use Cases systematisch sammeln, über Teams, Systeme und Funktionen hinweg." },
  { step: "02", title: "Score", icon: "score", description: "Grobbewertung mit einem verbundenen Priority Score statt isolierter Metriken." },
  { step: "03", title: "Deep-Dive", icon: "deepdive", description: "Top-Kandidaten mit Business Case, Datenreife und Compliance-Vorprüfung." },
  { step: "04", title: "Decide", icon: "decide", description: "Portfolio-Entscheid: Lighthouse-Bets plus Quick Wins mit klaren Ownern." },
  { step: "05", title: "Build", icon: "build", description: "MVP mit Time-box, Hypothese und definierter Erfolgsmetrik, typisch 6 bis 8 Wochen." },
  { step: "06", title: "Scale", icon: "scale", description: "Nur skalieren, wenn KPI-Schwelle, Adoption und Run-Kosten tragfähig sind." },
];

export const strategyGovernance = [
  "Zentrales AI-Backlog mit klaren Ownern je Use Case (Business + IT)",
  "Stage-Gates zwischen jeder Phase, kein automatisches Weiterrollen",
  "Portfolio statt Projektliste: wenige Bets mit hohem Impact",
  "Gewichte im Scoring-Modell sind explizit und für Management justierbar",
];

export const strategyDiscoveryAreas = [
  {
    title: "Sales, Marketing & GTM",
    items: [
      "Lead-Scoring & ICP-Matching, personalisierte Erstansprache",
      "Churn- und Schlummerkunden-Erkennung, Win-back-Sequenzen",
      "Next-Best-Offer aus Kauf- und CRM-Historie",
      "GenAI für Markt-/Wettbewerbsanalyse und segment-spezifisches Messaging",
      "Auto-Generierung von Angeboten und Verträgen aus CPQ/CRM/PIM",
    ],
  },
  {
    title: "Production & Operations",
    items: [
      "Automatisierte Shift-, Qualitäts- und OEE-Reports aus MES/Sensordaten",
      "Root-Cause-Assistenz bei Reklamationen und Ausschuss",
      "Visual Quality Control und Predictive Maintenance",
      "Prozess-, Energie- und Yield-Optimierung mit ML",
      "Demand Forecasting und S&OP-Unterstützung",
    ],
  },
  {
    title: "Support-Funktionen",
    items: [
      "Interner Knowledge-Assistant über HR, IT und QM-Dokumente",
      "Übersetzung und Dokumenten-Automatisierung",
      "Procurement: Spend-Analyse und Vertragsauswertung",
      "Low-Risk Quick Wins mit schneller Sichtbarkeit",
    ],
  },
];

export const strategyScoreIndices = [
  {
    index: "Value (V)",
    metrics: "Revenue-Impact · Kosten-/Effizienz · Qualität/Risiko · Strategic Fit",
  },
  {
    index: "Feasibility (F)",
    metrics: "Datenreife · Tech-Reife · System-Integration · Change-Readiness · Time-to-Value",
  },
  {
    index: "Risk (R)",
    metrics: "Technisch · Rechtlich (DSGVO, EU AI Act) · Kommerziell · Organisatorisch",
  },
];

export const strategyDeepDive = [
  { title: "Business Case", description: "Quantifizierter ROI, Annahmen und Sensitivitätsanalyse." },
  { title: "Solution Design", description: "Build vs. Buy vs. Configure; Datenfluss; Foundation-Model + RAG vs. Fine-Tuning." },
  { title: "Datenreife-Check", description: "Verfügbarkeit, Qualität, Zugriff und Labeling." },
  { title: "Compliance-Vorprüfung", description: "EU AI Act-Risikoklasse, DSGVO, IP und Vertraulichkeit." },
  { title: "Delivery-Plan", description: "Meilensteine, Owner, Abhängigkeiten und PoC-Exit-Kriterien." },
];

export const strategyKpiLayers = [
  { layer: "North-Star", description: "Business-Outcome je Case, z. B. Conversion, Qualität, Durchsatz oder Zeitersparnis." },
  { layer: "Value / Outcome", description: "€-Impact, ROI und Time-to-Value." },
  { layer: "Adoption", description: "Aktive Nutzer, Nutzungsfrequenz und Anteil automatisierter Vorgänge." },
  { layer: "Qualität & Trust", description: "Accuracy, Halluzinationsrate und Human-Override-Quote." },
  { layer: "Cost / Run", description: "Kosten pro Vorgang, Token/Infra und Latenz." },
];

export const strategyDecision = [
  {
    title: "Lighthouse-Cases",
    description: "1 bis 2 Initiativen mit hohem Value und solider Machbarkeit, sichtbarer strategischer Hebel.",
  },
  {
    title: "Quick Wins",
    description: "1 bis 2 low-risk Cases für schnelle Sichtbarkeit und Adoption im Unternehmen.",
  },
  {
    title: "Scale-Gate",
    description: "Skalierung nur bei erreichten KPI-Schwellen und tragfähigen Run-Kosten.",
  },
];

export const strategyFrameworks = [
  {
    title: "Value/Feasibility-Matrix",
    description: "Impact vs. Machbarkeit als Standard für die Portfolio-Auswahl.",
    tag: "Priorisierung",
  },
  {
    title: "Three Horizons",
    description: "Quick Wins, neue Capabilities und transformative Bets im Gleichgewicht.",
    tag: "Portfolio",
  },
  {
    title: "AI Maturity Models",
    description: "Standortbestimmung von Awareness bis Transformational.",
    tag: "Reifegrad",
  },
  {
    title: "CRISP-DM",
    description: "Strukturiertes Vorgehen für Daten- und ML-Use-Cases.",
    tag: "Delivery",
  },
  {
    title: "People + AI",
    description: "Human-in-the-loop und Trust-KPIs als Qualitätsanker.",
    tag: "Responsible AI",
  },
  {
    title: "Build vs. Buy vs. Configure",
    description: "Make-or-buy-Entscheidung je Case und Kontext.",
    tag: "Architektur",
  },
  {
    title: "EU AI Act",
    description: "Risikoklassen und Compliance-Anforderungen pro Use Case.",
    tag: "Compliance",
  },
];

export const strategyImpact: ImpactRow[] = [
  { before: "Viele parallele PoCs", after: "Priorisiertes AI-Portfolio" },
  { before: "Intuition & Lobbying", after: "Transparenter Priority Score" },
  { before: "Unklare Ownership", after: "Stage-Gates mit klaren Ownern" },
  { before: "Skalieren ohne Evidenz", after: "MVP → Messen → Scale-Gate" },
];
