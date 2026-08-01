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
  {
    step: "01",
    title: "Collect Ideas",
    icon: "collect",
    phase: "Ideation",
    description:
      "Ein breites Spektrum relevanter AI-Use-Cases identifizieren und strategische Blind Spots vermeiden.",
    detail:
      "Ideen werden in Discovery-Workshops mit Stakeholdern konkretisiert: Problem, Anforderungen, Prozesse, Risiken, Auswirkungen, Abhängigkeiten. Danach liegen Zahlen für die quantitative Bewertung vor.",
    outcome: "Dynamisches Portfolio als Grundlage für die AI-Roadmap",
  },
  {
    step: "02",
    title: "Analysis & Scoring",
    icon: "score",
    phase: "Priorisierung",
    description:
      "Überführung in eine quantitative Bewertung, um jeden Use Case im Portfolio einzuordnen.",
    detail:
      "Fünf Dimensionen — Business Value, AI Fit, Feasibility & Cost, Time-to-Value, Risk & Compliance — liefern eine belastbare Entscheidungsgrundlage für die Investition.",
    outcome: "Transparente Ranking-Heatmap statt Bauchgefühl",
  },
  {
    step: "03",
    title: "Deep Dive",
    icon: "deepdive",
    phase: "Validierung",
    description:
      "Top-Kandidaten werden zu entscheidungsreifen Investment Cases verdichtet.",
    detail:
      "Lösungsbild (Scope, MVP, Architektur), Business Case (Nutzen, Kosten, Amortisation) und Machbarkeit & Risiken (Abhängigkeiten, Compliance, Betrieb) werden gemeinsam geschärft.",
    outcome: "Entscheidungsreifer Investment Case",
  },
  {
    step: "04",
    title: "Decide",
    icon: "decide",
    phase: "Portfolio",
    description:
      "Klare Portfolioentscheidung über Budget, Verantwortlichkeiten, Zeitplan und nächste Schritte.",
    detail:
      "Jedes Vorhaben landet in einer der Optionen Build, Buy, Pivot, Kill oder Defer — mit Commitment der Entscheider und nachvollziehbarer Begründung.",
    outcome: "Commitment, Budget und Owner sind gesetzt",
  },
  {
    step: "05",
    title: "MVP",
    icon: "build",
    phase: "Validierung in Produktion",
    description:
      "Den kleinsten nutzbaren Scope bauen — und mit echten Nutzungsdaten entscheiden, ob weiter oder Abbruch.",
    detail:
      "Kurze Sprints, priorisierte Features, frühe Tests. Erfolgskriterien und Monitoring sind vor dem Start klar. Quality- und Compliance-Gates sichern die Produktionsreife.",
    outcome: "Messbarer MVP: Go, Anpassen oder Stop",
  },
  {
    step: "06",
    title: "Roll Out",
    icon: "rollout",
    phase: "Einführung",
    description:
      "Gesteuertes Ausrollen in die Organisation — mit Enablement und klaren Verantwortlichkeiten.",
    detail:
      "Dokumentation, Basistraining, AI Champions und rollenspezifische Workshops. Nutzer werden segmentiert, Adoption wird aktiv gesteuert.",
    outcome: "Kontrollierte Einführung mit messbarer Adoption",
  },
  {
    step: "07",
    title: "Scaling",
    icon: "scale",
    phase: "Werthebel",
    description:
      "Nur skalieren, was den Impact belegt hat — Adoption, Retention und Nutzen systematisch steigern.",
    detail:
      "Hürden beseitigen, Produkt und Prozesse verbessern, Reichweite erhöhen. Skalierung ist kein Automatismus, sondern die Folge belegten Werts.",
    outcome: "Skalierter Impact mit klarer Governance",
  },
];

export const strategyIdeaSources = [
  {
    id: "research",
    title: "Research",
    description:
      "Branchenstudien & Industriereports, Technologie- und Markttrends, Wettbewerb und übertragbare Lösungen.",
  },
  {
    id: "crowd",
    title: "Crowd-Sourcing",
    description:
      "Kontinuierliche Ideeneinreichung durch Mitarbeitende sowie gezielte, incentivierte Challenges für priorisierte Geschäftsprobleme.",
  },
];

export const strategyScoreDimensions = [
  {
    id: "value",
    title: "Business Value",
    short: "Value",
    question: "Wie groß ist der messbare Nutzen?",
    detail: "Effizienz, Umsatz, strategischer Beitrag und Reichweite.",
  },
  {
    id: "fit",
    title: "AI Fit",
    short: "AI Fit",
    question: "Wie gut eignet sich AI zur Lösung?",
    detail: "Lösungsgrad, Datenqualität, AI-Eignung und Human-in-the-Loop.",
  },
  {
    id: "feasibility",
    title: "Feasibility & Cost",
    short: "Feasibility",
    question: "Wie realistisch ist die Umsetzung?",
    detail: "Komplexität, Integration, Entwicklungs-, Betriebs- und Change-Aufwand.",
  },
  {
    id: "ttv",
    title: "Time-to-Value",
    short: "TTV",
    question: "Wie schnell entsteht produktiver Nutzen?",
    detail: "Zeit bis MVP, produktivem Einsatz, Break-even und Skalierung.",
  },
  {
    id: "risk",
    title: "Risk & Compliance",
    short: "Risk",
    question: "Welche Risiken begrenzen den Einsatz?",
    detail: "Qualität, Sicherheit, Transparenz, Datenschutz und Regulierung.",
  },
];

export const strategyPortfolioZones = [
  {
    id: "build",
    title: "Build",
    label: "Hoher Value · tragbares Risiko",
    description: "Priorisierte Umsetzungen mit klarem Business Case und machbarer Delivery.",
  },
  {
    id: "derisk",
    title: "De-Risk",
    label: "Hoher Value · erhöhtes Risiko",
    description: "Potenzial hoch, aber erst Risiken, Daten oder Abhängigkeiten absichern.",
  },
  {
    id: "pivot",
    title: "Pivot",
    label: "Mittlerer Value · offen",
    description: "Richtung stimmt, Scope oder Ansatz muss angepasst werden.",
  },
  {
    id: "kill",
    title: "Kill",
    label: "Niedriger Value · hohes Risiko",
    description: "Bewusst stoppen — Kapazität für wirkungsvollere Cases freimachen.",
  },
];

export const strategyDeepDive = [
  {
    title: "Lösungsbild",
    question: "Was bauen wir?",
    description: "Scope, MVP, Architektur und Roadmap.",
  },
  {
    title: "Business Case",
    question: "Lohnt es sich?",
    description: "Nutzen, Kosten, Amortisation und Skalierung.",
  },
  {
    title: "Machbarkeit & Risiken",
    question: "Können wir es umsetzen?",
    description: "Architektur, Abhängigkeiten, Compliance und Betrieb.",
  },
];

export const strategyDecisions = [
  {
    id: "build",
    title: "Build",
    muted: false,
    description: "Hoher Value, guter AI Fit, tragbare Risiken — intern oder mit Partner umsetzen.",
  },
  {
    id: "buy",
    title: "Buy",
    muted: false,
    description: "Marktstandard deckt den Need ab; schneller Time-to-Value ohne Eigenbau.",
  },
  {
    id: "pivot",
    title: "Pivot",
    muted: false,
    description: "Kernidee stimmt, Scope oder Ansatz muss angepasst werden.",
  },
  {
    id: "kill",
    title: "Kill",
    muted: false,
    description: "Value zu niedrig oder Risiko/Komplexität zu hoch — bewusst stoppen.",
  },
  {
    id: "defer",
    title: "Defer",
    muted: true,
    description: "Potenzial vorhanden, aber Abhängigkeiten oder Timing sprechen gegen jetzt.",
  },
];

export const strategyGovernance = [
  {
    title: "Steuerbar & planbar",
    description:
      "Durch klare Governance steuerbar. Frühzeitig Risiken minimieren und Abhängigkeiten erfassen — und so planbar bleiben.",
  },
  {
    title: "Vertrauen & Ressourcen",
    description:
      "Schafft Vertrauen in der Organisation und setzt damit Ressourcen auch langfristig frei.",
  },
  {
    title: "Quality & Compliance",
    description:
      "Quality- & Compliance-Gates sichern hohe Umsetzungsqualität und gewährleisten regulatorische Exzellenz.",
  },
];

export const strategyMvpChecks = [
  {
    title: "Nutzungsdaten lesen",
    description: "Adoption, Aufgabenerfolg und Feedback zeigen, ob der MVP trägt.",
  },
  {
    title: "Go / Anpassen / Stop",
    description: "Entscheidung auf Evidenz: weiter investieren, Scope ändern oder abbrechen.",
  },
  {
    title: "Gates einhalten",
    description: "Erfolgskriterien, Monitoring, Human-in-the-Loop und Compliance vor dem Scale.",
  },
];

export const strategyRolloutLevers = [
  {
    title: "Enablement aufbauen",
    description: "Dokumentation, Basistraining, AI Champions und klare Verantwortlichkeiten.",
  },
  {
    title: "Nutzer segmentieren",
    description: "Rollenspezifische Trainings, Workshops und reale Use Cases.",
  },
  {
    title: "Adoption steuern",
    description: "Einführung in Wellen, Support-Pfade und sichtbare Ownership je Segment.",
  },
];

export const strategyScalingLevers = [
  {
    title: "Reichweite erhöhen",
    description: "Von Pilotgruppen zu Organisationseinheiten — nur wo Nutzen belegt ist.",
  },
  {
    title: "Wert maximieren",
    description: "Retention, Zufriedenheit und Aufgabenerfolg systematisch steigern.",
  },
  {
    title: "Kontinuierlich optimieren",
    description: "Hürden beseitigen, Produkt und Prozesse verbessern, Run-Kosten im Blick behalten.",
  },
];

export const strategyExampleAgents = [
  {
    id: "presentation",
    title: "Presentation Agent",
    problem:
      "Präsentationen sind zeitaufwändig, inkonsistent und oft nicht auf dem neuesten Stand.",
    promise:
      "Vom generischen Foliensatz zur aktuellen, kundenspezifischen und datenbasierten Vertriebsstory.",
    outcomes: [
      "Deutlich weniger Zeit für Recherche und Folienaufbau",
      "Kundenspezifisch statt Standard-Pitches",
      "Aktuelle, belastbare Inhalte direkt aus den Systemen",
    ],
    system: [
      { role: "Research", task: "Interne & externe Quellen erschließen" },
      { role: "Storyline", task: "Narrative Struktur und Slide-Logik" },
      { role: "Content", task: "Assets, Visuals und Medien finden" },
      { role: "Design", task: "CI, Layout und visuelle Hierarchie" },
      { role: "Review", task: "Konsistenz, Qualität, Markenkonformität" },
    ],
  },
  {
    id: "crm",
    title: "CRM Enrichment Agent",
    problem:
      "Kundendaten liegen verteilt in verschiedenen Systemen und werden nicht konsistent im CRM gepflegt.",
    promise:
      "Von fragmentierten Daten zum vollständigen, aktuellen und verlässlichen Kundenprofil.",
    outcomes: [
      "Vollständigere und aktuellere CRM-Daten",
      "Automatische Erkennung relevanter Kundeninformationen",
      "Quellen, Aktualität und Confidence Score je Information",
    ],
    system: [
      { role: "Collect", task: "CRM, ERP, PIM und externe Quellen" },
      { role: "Match", task: "Kunden, Kontakte, Projekte zuordnen" },
      { role: "Validate", task: "Aktualität und Confidence bewerten" },
      { role: "Write-back", task: "Profil im CRM konsistent pflegen" },
    ],
  },
  {
    id: "sales",
    title: "Sales Agent",
    problem:
      "Im CRM liegen viele Informationen, aber der Vertrieb hat wenig Zeit, daraus relevante Chancen abzuleiten.",
    promise:
      "Vom Kundenprofil zur evidenzbasierten Next Best Sales Action.",
    outcomes: [
      "Priorisierte Chancen mit Bedarf und Evidenz",
      "Bewertung nach Dringlichkeit, Wahrscheinlichkeit und Deal-Potenzial",
      "Upgrade, Upselling, Cross-Selling und Retention als klare Opportunity-Typen",
    ],
    system: [
      { role: "Signals", task: "CRM-, Projekt-, Markt- und Verhaltenssignale" },
      { role: "Score", task: "Dringlichkeit, Wahrscheinlichkeit, Potenzial" },
      { role: "Recommend", task: "Max. fünf priorisierte Next Actions" },
      { role: "Evidence", task: "Jede Empfehlung nachvollziehbar begründen" },
    ],
  },
];

export const strategyImpact: ImpactRow[] = [
  { before: "Ein paar Cases ohne Klarheit zum Impact", after: "Priorisiertes AI-Portfolio mit messbarem Nutzen" },
  { before: "Bauchtentscheidungen & Lobbying", after: "Fünf Dimensionen, ein transparentes Ranking" },
  { before: "PoCs ohne Exit-Kriterien", after: "Build · Buy · Pivot · Kill · Defer" },
  { before: "Skalieren ohne Evidenz", after: "MVP → Messen → Roll-out → Scale-Gate" },
];

export const trainingModules = [
  {
    title: "Operating Model",
    description: "Rollen, Freigaben, Escalation Paths und Ownership für produktive AI-Systeme.",
  },
  {
    title: "Hands-on Workflows",
    description: "Ihr Team übt an realen Cases: Prompting, QA, Monitoring und Fehlerpfade.",
  },
  {
    title: "Systemverständnis",
    description: "MCP, Agents und Integrationen so erklären, dass Fach- und Tech-Teams dieselbe Sprache sprechen.",
  },
  {
    title: "Übergabe & Docs",
    description: "Runbooks, Checklisten und Dashboards, damit Wissen nicht an Einzelpersonen hängt.",
  },
];

export const trainingImpact: ImpactRow[] = [
  { before: "Abhängigkeit vom Builder", after: "Team kann Systeme betreiben" },
  { before: "Ad-hoc Prompting", after: "Klare Guardrails und QA" },
  { before: "Unklare Ownership", after: "Definierte Rollen und Escalation" },
  { before: "Einmalige Demo", after: "Nachhaltiges Enablement" },
];
