export interface ServiceStat {
  value: string;
  label: string;
}

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

export const serviceModalMeta: Record<string, ServiceModalContent> = {
  "gtm-engineering": {
    eyebrow: "Go-to-Market",
    bannerTag: "Von fragmentierten Daten zu skalierbarer Pipeline",
    lead: "Für RevOps, Marketing und Sales, die aus CRM, Signalen und Outreach endlich ein System machen wollen — nicht noch ein Tool.",
    stats: [
      { value: "6–8 Wo.", label: "Time-to-Value" },
      { value: "ICP + Signale", label: "Priorisierung" },
      { value: "QA + Governance", label: "Produktionsreif" },
    ],
    ctaLabel: "GTM-System besprechen",
  },
  mcp: {
    eyebrow: "Model Context Protocol",
    bannerTag: "Ihre Systeme, bereit für AI Agents",
    lead: "Wir entwickeln sichere MCP-Server und Integrationen, damit AI Agents strukturiert auf Ihre Unternehmensdaten und Workflows zugreifen können.",
    stats: [
      { value: "CRM · ERP · CMS", label: "Anbindungen" },
      { value: "Read + Write", label: "Kontrolliert" },
      { value: "OAuth + Audit", label: "Enterprise-ready" },
    ],
    ctaLabel: "MCP-Potenzial prüfen",
  },
  "workflow-agents": {
    eyebrow: "AI Workflow Agents",
    bannerTag: "Agenten, die handeln — nicht nur antworten",
    lead: "Digitale Mitarbeitende für konkrete Prozesse: Informationen sammeln, Entscheidungen im definierten Rahmen treffen und Aufgaben in Ihren Systemen ausführen.",
    stats: [
      { value: "Human-in-the-loop", label: "Kontrolle" },
      { value: "CRM · Tickets · Mail", label: "Integration" },
      { value: "Messbar", label: "Skalierung" },
    ],
    ctaLabel: "Workflow-Agent konzipieren",
  },
  "business-models": {
    eyebrow: "Business Validation",
    bannerTag: "Validieren, bevor Sie Budget verbrennen",
    lead: "Neue Geschäftsmodelle sind teuer und riskant. Wir helfen Ihnen, Ideen strukturiert zu testen — mit klaren Hypothesen, schnellen Experimenten und messbaren Ergebnissen.",
    stats: [
      { value: "↓ Risiko", label: "Vor Investition" },
      { value: "↑ Klarheit", label: "Durch Daten" },
      { value: "→ Go/No-Go", label: "Entscheidung" },
    ],
    ctaLabel: "Geschäftsmodell validieren",
  },
};

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
