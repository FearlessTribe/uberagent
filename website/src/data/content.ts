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
      "KI-Technologie entwickelt sich schnell — und Ihre Automatisierungen sollten das ebenfalls. Wir bieten laufenden Support, überwachen die Performance und optimieren Ihre Workflows kontinuierlich, damit sie dauerhaft zuverlässig funktionieren und messbaren Mehrwert liefern.",
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
      "Ziele, KPIs, Tech-Stack, Stakeholder, Priorisierung der 1–2 wirkungsvollsten Use Cases",
  },
  {
    phase: "Audit",
    week: "Woche 2",
    description:
      "CRM-, Signal-, Daten- und Prozess-Audit; Engpässe und Integrationspunkte identifizieren",
  },
  {
    phase: "Build",
    week: "Woche 3–5",
    description:
      "Workflows, Scoring, Routing, Enrichment, Prompting, QA-Logik und Handoffs implementieren",
  },
  {
    phase: "Test & Governance",
    week: "Woche 5–6",
    description:
      "Shadow-Run, Freigabelogik, Fehlerpfade, Monitoring, Ownership",
  },
  {
    phase: "Rollout",
    week: "Woche 6–8",
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
  title: string;
  description: string;
  items?: string[];
}

export const mcpServices: McpService[] = [
  {
    title: "MCP Strategy & Use Case Assessment",
    description:
      "Wir analysieren Ihre Systeme, Datenquellen und Geschäftsprozesse und identifizieren die MCP-Use-Cases mit dem höchsten operativen Nutzen.",
    items: [
      "Welche Systeme sollen AI Agents nutzen können?",
      "Welche Daten dürfen gelesen werden?",
      "Welche Aktionen dürfen ausgeführt werden?",
      "Welche Rollen, Rechte und Sicherheitsgrenzen sind nötig?",
      "Wo entsteht echter Business Value statt nur technischer Spielerei?",
    ],
  },
  {
    title: "MCP Server Entwicklung",
    description: "Wir entwickeln produktionsreife MCP-Server für Ihre internen und externen Systeme.",
    items: [
      "MCP-Server-Setup",
      "API- und Datenquellen-Anbindung",
      "Tool-Definitionen für AI Agents",
      "Authentifizierung und Rechtekonzept",
      "Logging, Monitoring und Fehlerbehandlung",
      "Deployment in Ihre bestehende Infrastruktur",
    ],
  },
  {
    title: "Connectoren für Ihre Systeme",
    description:
      "Wir verbinden MCP mit den Systemen, die in Ihrem Unternehmen wirklich zählen.",
    items: [
      "CRM-, ERP- und E-Commerce-Systeme",
      "Wissensdatenbanken & CMS",
      "Support- und Ticketing-Systeme",
      "Interne APIs, Datenbanken & Dokumentenablagen",
    ],
  },
  {
    title: "Security, Governance & Compliance",
    description:
      "MCP-Integrationen müssen sicher, nachvollziehbar und kontrollierbar sein.",
    items: [
      "OAuth2 / OIDC Integration",
      "Rollen- und Rechtekonzepte",
      "Audit Logs & Rate Limits",
      "Umgebungstrennung für Dev, Staging und Production",
    ],
  },
  {
    title: "Conversational & Agent Design",
    description:
      "Technische Anbindung allein reicht nicht. AI Agents brauchen klare Aufgabenlogik, Kontext und Grenzen.",
    items: [
      "Agent-Use-Case-Design",
      "Prompt- und Tool-Design",
      "Fallbacks und Eskalationen",
      "Testfälle und Evaluierung",
    ],
  },
  {
    title: "Betrieb, Monitoring & Weiterentwicklung",
    description: "MCP ist kein einmaliges Setup, sondern Teil Ihrer AI-Infrastruktur.",
    items: [
      "Monitoring & Fehleranalyse",
      "Connector-Updates",
      "Erweiterung neuer Tools",
      "Strategische AI-Advisory",
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
      "Ein AI Agent greift auf interne Dokumentationen, Prozesswissen und Richtlinien zu und beantwortet Mitarbeiterfragen kontextbezogen.",
  },
  {
    title: "Sales & CRM Agent",
    description:
      "Ein Agent kann Kundendaten abrufen, Opportunities vorbereiten und nächste Schritte im CRM vorschlagen.",
  },
  {
    title: "Support Agent",
    description:
      "Ein Agent liest Tickets, erkennt ähnliche Fälle, schlägt Antworten vor und aktualisiert Support-Systeme kontrolliert.",
  },
  {
    title: "Workflow Agent",
    description:
      "Ein Agent löst definierte Aktionen aus: Aufgaben erstellen, Daten aktualisieren, Status ändern oder Freigabeprozesse vorbereiten.",
  },
];
