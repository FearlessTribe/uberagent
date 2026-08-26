export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Ideation Workshop",
    description:
      "Wir analysieren Ihr Unternehmen, Ihre Prozesse und Ihre bestehende Infrastruktur ganzheitlich. Nicht jeder Prozess braucht KI. Und genau das sagen wir Ihnen auch ehrlich. Wir identifizieren Engpässe, repetitive Aufgaben und konkrete Potenziale, bei denen intelligente Automatisierung echten operativen Mehrwert und messbaren ROI schafft.",
  },
  {
    number: "02",
    title: "Lösungsdesign & Planung",
    description:
      "Sobald die relevanten Potenziale identifiziert sind, entwickeln wir intelligente Workflows, die sich nahtlos in Ihre bestehende Infrastruktur einfügen. Wir schlagen Lösungen auf Basis bewährter Tools vor und erarbeiten gemeinsam den besten Ansatz für Ihre spezifische Ausgangssituation.",
  },
  {
    number: "03",
    title: "Implementierung & Integration",
    description:
      "Wir entwickeln und implementieren Ihre KI-Automatisierung auf einer sicheren, zuverlässigen Infrastruktur. Ob CRM-Anbindung, Dokumentenverarbeitung oder die intelligente Weiterleitung von Kundenanfragen: Wir sorgen dafür, dass alles reibungslos mit Ihren bestehenden Tools und Prozessen zusammenspielt.",
  },
  {
    number: "04",
    title: "Support & kontinuierliche Optimierung",
    description:
      "KI-Technologie entwickelt sich schnell, und Ihre Automatisierungen sollten das ebenfalls. Wir bieten laufenden Support, überwachen die Performance und optimieren Ihre Workflows kontinuierlich, damit sie dauerhaft zuverlässig funktionieren und messbaren Mehrwert liefern.",
  },
];

export interface GtmProcessPhase {
  phase: string;
  week: string;
  description: string;
}

export const gtmProcessPhases: GtmProcessPhase[] = [
  {
    phase: "Discovery",
    week: "Woche 1",
    description:
      "Ziele, KPIs, Tech-Stack, Stakeholder, Priorisierung der 1-2 wirkungsvollsten Use Cases",
  },
  {
    phase: "Audit",
    week: "Woche 2",
    description:
      "CRM-, Signal-, Daten- und Prozess-Audit; Engpässe und Integrationspunkte identifizieren",
  },
  {
    phase: "Build",
    week: "Woche 3-5",
    description:
      "Workflows, Scoring, Routing, Enrichment, Prompting, QA-Logik und Handoffs implementieren",
  },
  {
    phase: "Test & Governance",
    week: "Woche 5-6",
    description:
      "Shadow-Run, Freigabelogik, Fehlerpfade, Monitoring, Ownership",
  },
  {
    phase: "Rollout",
    week: "Woche 6-8",
    description:
      "Enablement, Dashboarding, Doku, Übergabe und Optimierungsschleife",
  },
];

export interface AgentUseCase {
  title: string;
  description: string;
}

export const agentUseCases: AgentUseCase[] = [
  {
    title: "Anfragen-Triage",
    description:
      "Der Agent liest eingehende Nachrichten, erkennt Thema und Dringlichkeit und leitet sie an die richtige Stelle weiter.",
  },
  {
    title: "Recherche-Assistent",
    description:
      "Vor Terminen oder Entscheidungen sammelt der Agent relevante Informationen aus CRM, Dokumenten, Web und internen Systemen.",
  },
  {
    title: "Datenpflege",
    description:
      "Der Agent erkennt Lücken, Dubletten und Widersprüche in Stammdaten und schlägt Korrekturen vor.",
  },
  {
    title: "Nachfass-Agent",
    description:
      "Offene Angebote, Leads oder Aufgaben werden automatisch überwacht und zum richtigen Zeitpunkt nachverfolgt.",
  },
];

/** Guided example flow for the Workflow Agents page (mirrors Operations Desk). */
export const agentWorkflowDemo = [
  {
    label: "Inbox",
    title: "Eingang",
    text: "E-Mails, Tickets und CRM-Signale landen in einer Warteschlange statt in fünf Postfächern.",
  },
  {
    label: "Triage",
    title: "Klassifizieren",
    text: "Der Agent erkennt Thema und Dringlichkeit und routet an Support, Sales oder Ops.",
  },
  {
    label: "Handoff",
    title: "Human-in-the-loop",
    text: "Wo Regeln enden, holt er Freigabe ein – mit Entwurf, Kontext und klarem Owner.",
  },
  {
    label: "Done",
    title: "Ausführen",
    text: "Ticket aktualisiert, CRM geschrieben, Mail vorbereitet – nachvollziehbar und im Scope.",
  },
] as const;

export interface AgentApproach {
  number: string;
  title: string;
  description: string;
}

export const agentApproach: AgentApproach[] = [
  {
    number: "01",
    title: "Aufgaben verstehen",
    description:
      "Wir identifizieren Prozesse, bei denen ein KI-Agent echten operativen Hebel erzeugt.",
  },
  {
    number: "02",
    title: "Regeln definieren",
    description:
      "Wir legen fest, was der Agent selbstständig erledigt und wo Freigaben nötig sind.",
  },
  {
    number: "03",
    title: "Systeme anbinden",
    description:
      "Wir verbinden den Agenten mit bestehenden Tools, Datenquellen und Workflows.",
  },
  {
    number: "04",
    title: "Kontrolliert skalieren",
    description:
      "Der Agent startet fokussiert, wird gemessen und Schritt für Schritt erweitert.",
  },
];

export interface McpService {
  id: string;
  title: string;
  description: string;
  items?: string[];
}

/** Verdichtet auf Assess · Build · Operate (statt 6 Katalog-Karten). */
export const mcpServices: McpService[] = [
  {
    id: "assess",
    title: "Assess",
    description:
      "Wir klären Systeme, Datengrenzen und den Use Case mit dem höchsten operativen Nutzen – inklusive Security-Rahmen.",
    items: [
      "Welche Systeme sollen Agents nutzen können?",
      "Lesen vs. Schreiben: was ist erlaubt?",
      "Rollen, Rechte und Audit-Anforderungen",
      "Business Value statt technischer Spielerei",
    ],
  },
  {
    id: "build",
    title: "Build",
    description:
      "Produktionsreife MCP-Server und Connectoren für die Systeme, die in Ihrem Unternehmen zählen.",
    items: [
      "MCP-Server-Setup und Tool-Definitionen",
      "CRM, ERP, Tickets, CMS, interne APIs",
      "Auth, Logging und Fehlerbehandlung",
      "Deployment in Ihre Infrastruktur",
    ],
  },
  {
    id: "operate",
    title: "Operate",
    description:
      "MCP bleibt Teil Ihrer AI-Infrastruktur: Monitoring, Updates und gezielte Erweiterung.",
    items: [
      "Monitoring und Fehleranalyse",
      "Connector-Updates",
      "Neue Tools und Systeme anbinden",
      "Laufende Advisory für den Stack",
    ],
  },
];

export interface McpUseCase {
  title: string;
  description: string;
}

export const mcpUseCases: McpUseCase[] = [
  {
    title: "Interner Wissensagent",
    description:
      "Greift auf Docs, Prozesswissen und Richtlinien zu und beantwortet Mitarbeiterfragen kontextbezogen.",
  },
  {
    title: "Sales & CRM Agent",
    description:
      "Liest Kundendaten, bereitet Opportunities vor und schlägt nächste Schritte im CRM vor – kontrolliert.",
  },
  {
    title: "Support Agent",
    description:
      "Liest Tickets, erkennt ähnliche Fälle, schlägt Antworten vor und aktualisiert Systeme nur innerhalb klarer Rechte.",
  },
];

export const mcpSecurityHighlights = [
  { label: "OAuth / OIDC", text: "Identität und Tokens statt Shared Keys" },
  { label: "Scopes", text: "Lesen und Schreiben getrennt freigeben" },
  { label: "Audit Log", text: "Jede Agent-Aktion nachvollziehbar" },
  { label: "Read + Write", text: "Grenzen pro Tool und Umgebung" },
] as const;

export const mcpExampleFlow = [
  { label: "Systeme", text: "HubSpot · Tickets · Docs" },
  { label: "MCP Layer", text: "Resources · Tools · Auth" },
  { label: "Policy", text: "Scope prüfen · Audit" },
  { label: "Agent", text: "Lesen · Vorschlagen · Schreiben" },
] as const;
