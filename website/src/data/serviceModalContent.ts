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
  footerNote?: string;
  ctaHref?: string;
}

const footerNotes: Record<string, string> = {
  "ai-revenue-engine": "Pilot für 1.000 €. Ergebnis in 10 Arbeitstagen.",
};

const ctaHrefs: Record<string, string> = {
  "ai-revenue-engine": "https://calendly.com/supraflow/30min",
};

export const serviceModalMeta: Record<string, ServiceModalContent> = Object.fromEntries(
  services.map((s) => [
    s.id,
    {
      eyebrow: s.eyebrow,
      bannerTag: s.bannerTag,
      lead: s.lead,
      stats: s.stats,
      ctaLabel: s.ctaLabel,
      ...(footerNotes[s.id] ? { footerNote: footerNotes[s.id] } : {}),
      ...(ctaHrefs[s.id] ? { ctaHref: ctaHrefs[s.id] } : {}),
    },
  ]),
);

export const revenueToday = [
  "Vertrieb jagt Neukunden, Bestand liegt brach",
  "Niemand weiß, wer gerade kaufbereit ist",
  "Kontaktanlass wird manuell zusammengesucht",
  "Abwanderung fällt erst bei der Kündigung auf",
];

export const revenueWithUeberagent = [
  "Priorisierte Opportunity-Liste statt Bauchgefühl",
  "Jede Opportunity mit belegtem Kaufsignal",
  "Mail und Call-Briefing fertig im CRM",
  "Churn-Risiken werden sichtbar, bevor sie eskalieren",
];

export const revenueFlow = [
  {
    step: "01",
    title: "CRM- und Kundendaten anbinden",
    description:
      "Lesender Zugriff auf HubSpot, Salesforce, Pipedrive, Zoho, ERP oder schlicht einen CSV-Export. Keine Migration, keine Umstellung Ihrer Prozesse.",
    outcome: false,
  },
  {
    step: "02",
    title: "Öffentliche und interne Signale anreichern",
    description:
      "Kundenwebsites, Stellenanzeigen, Tech-Stack, Firmenregister, News sowie Ihre eigenen Nutzungs-, Support- und Rechnungsdaten. Pro Kunde entsteht ein aktuelles Signalprofil.",
    outcome: false,
  },
  {
    step: "03",
    title: "Opportunities erkennen",
    description:
      "Upsell, Cross-Sell, Renewal und Churn-Risiko, jeweils als eigenes Modell auf Ihr Leistungsportfolio trainiert.",
    outcome: false,
  },
  {
    step: "04",
    title: "Opportunity Score vergeben",
    description:
      "Kaufwahrscheinlichkeit, geschätzter Wert und Dringlichkeit ergeben eine Rangfolge. Ihr Vertrieb arbeitet die Liste von oben ab, statt zu raten.",
    outcome: false,
  },
  {
    step: "05",
    title: "Konkreten Verkaufsgrund generieren",
    description:
      "Kein „passt gut zum Profil“, sondern ein belegter Anlass: „Kunde hat zwei Performance-Marketing-Stellen ausgeschrieben und nutzt Ihr SEO-Paket seit 14 Monaten ohne Erweiterung.“",
    outcome: false,
  },
  {
    step: "06",
    title: "Outreach fertig ausformulieren",
    description:
      "Personalisierte E-Mail in Ihrer Tonalität plus ein Call-Briefing auf einer Seite: Anlass, Argumente, erwartete Einwände, Preisrahmen.",
    outcome: false,
  },
  {
    step: "07",
    title: "Zurück ins CRM, direkt an Ihr Sales-Team",
    description:
      "Als Task, Deal oder Notiz am Kundendatensatz. Ihr Vertrieb muss kein neues Tool lernen und öffnet morgens einfach das, was er ohnehin öffnet.",
    outcome: true,
  },
];

export const revenueGains = [
  {
    title: "Eine priorisierte Opportunity-Liste",
    text: "über 200 Ihrer Bestandskunden, sortiert nach Score und geschätztem Umsatzpotenzial.",
  },
  {
    title: "Pro Opportunity einen belegten Vertriebsanlass",
    text: "nachvollziehbar, mit Quelle, nicht generisch.",
  },
  {
    title: "Fertige Erstansprache",
    text: "je Opportunity: personalisierte E-Mail plus einseitiges Call-Briefing.",
  },
  {
    title: "Eine Potenzialschätzung für Ihren gesamten Kundenstamm",
    text: "hochgerechnet aus der Pilot-Stichprobe.",
  },
  {
    title: "Ein 45-minütiges Review",
    text: "in dem wir die Ergebnisse mit Ihrem Vertrieb durchgehen und die Treffer markieren.",
  },
  {
    title: "Eine klare Empfehlung",
    text: "ob und in welcher Ausbaustufe sich die Vollautomatisierung für Sie rechnet. Inklusive ehrlichem „lohnt sich nicht“, wenn die Daten das hergeben.",
  },
];

export const revenueRoiLines = [
  { label: "Investment Pilot", value: "1.000 €" },
  { label: "Analysierte Bestandskunden", value: "200" },
  { label: "Gelieferte Opportunities (Minimum)", value: "20" },
  { label: "Konservative Abschlussquote", value: "10 %" },
  { label: "Erwartete Abschlüsse", value: "2" },
  { label: "Annahme Zusatzumsatz je Abschluss", value: "3.000 €" },
  { label: "Zusatzumsatz aus dem Piloten", value: "6.000 €", total: true },
];

export const revenueIdealFor = [
  "mehrere hundert bis zehntausende Bestandskunden führen",
  "ein Portfolio mit mehreren Leistungen oder Produkten haben",
  "deren Vertrieb überwiegend reaktiv arbeitet",
  "deren CRM gepflegt, aber ungenutzt ist",
  "wachsen wollen, ohne den Vertrieb zu vergrößern",
  "Churn erst bemerken, wenn er passiert ist",
];

export const revenueImpact: ImpactRow[] = [
  { before: "Kundenstamm als Karteileiche", after: "Kundenstamm als Pipeline" },
  { before: "Vertrieb nach Bauchgefühl", after: "Priorisierung nach Opportunity Score" },
  { before: "Generische Ansprache", after: "Belegter Anlass pro Kunde" },
  { before: "Recherche vor jedem Call", after: "Fertiges Call-Briefing im CRM" },
  { before: "Churn als Überraschung", after: "Frühwarnung mit Handlungsempfehlung" },
  { before: "Wachstum über mehr Köpfe", after: "Wachstum über mehr Umsatz pro Kopf" },
];

export const revenueTimeline = [
  {
    title: "Kickoff",
    when: "Tag 1",
    detail:
      "45 Minuten Kickoff: Portfolio, Wunsch-Opportunity-Typ, Definition eines guten Kunden.",
  },
  {
    title: "Datenanbindung",
    when: "Tag 1–2",
    detail: "Sie exportieren 200 Kundendatensätze oder geben lesenden CRM-Zugriff.",
  },
  {
    title: "Signalanalyse",
    when: "Tag 3–6",
    detail: "Anreicherung, Scoring und Generierung der Verkaufsgründe.",
  },
  {
    title: "Briefings",
    when: "Tag 7–9",
    detail: "Erstellung von Mail und Call-Briefing je Opportunity, Qualitätsprüfung durch uns.",
  },
  {
    title: "Review",
    when: "Tag 10",
    detail: "45 Minuten Review mit Ihrem Vertrieb, Übergabe aller Materialien und Empfehlung.",
  },
];

export const revenueProofMetrics = [
  {
    value: "Produktionsreif",
    label: "Kein Prototyp. Laufende Systeme mit Monitoring, QA und Ownership im Kundenteam.",
  },
  {
    value: "DSGVO-konform",
    label: "Verarbeitung in der EU bzw. Schweiz, AV-Vertrag, keine Trainingsnutzung Ihrer Daten.",
  },
  {
    value: "Ihr Stack",
    label: "HubSpot, Salesforce, Pipedrive, Zoho, MS Dynamics, ERP oder CSV. Anbindung statt Ablösung.",
  },
  {
    value: "Ihr Ton",
    label: "Outreach wird auf Ihre bestehenden Gewinner-Mails kalibriert, nicht auf einen Standard.",
  },
];

export const revenueTiers = [
  {
    id: "pilot",
    cap: "Schritt 1 · Sofort verfügbar",
    price: "1.000 €",
    note: "Festpreis · 10 Arbeitstage",
    featured: true,
    items: [
      "200 Bestandskunden analysiert",
      "1 Opportunity-Typ Ihrer Wahl",
      "Mind. 20 Opportunities mit Anlass",
      "Mail + Call-Briefing je Opportunity",
      "Potenzialhochrechnung Gesamtbestand",
      "Ergebnisgarantie",
    ],
  },
  {
    id: "implementation",
    cap: "Schritt 2 · Implementation",
    price: "20.000–50.000 €",
    note: "Einmalig · 6–10 Wochen",
    featured: false,
    items: [
      "Gesamter Kundenstamm angebunden",
      "Mehrere Opportunity-Modelle parallel",
      "Automatisierter Rückschrieb ins CRM",
      "Scoring auf Ihre historischen Abschlüsse trainiert",
      "Governance, QA und Monitoring",
      "Enablement für Ihr Vertriebsteam",
    ],
  },
  {
    id: "ops",
    cap: "Schritt 3 · Betrieb",
    price: "2.000–6.000 €",
    note: "Pro Monat · monatlich kündbar",
    featured: false,
    items: [
      "Laufende Signal- und Datenaktualisierung",
      "Modellpflege und Nachschärfung",
      "Neue Opportunity-Typen auf Zuruf",
      "Monatliches Performance-Reporting",
      "Support und Weiterentwicklung",
    ],
  },
];

export const revenueFaq = [
  {
    question: "Wie viel Aufwand entsteht bei uns?",
    answer:
      "Rund zwei Stunden über die gesamten zehn Tage: 45 Minuten Kickoff, ein Datenexport oder ein lesender CRM-Zugang, 45 Minuten Review. Den Rest übernehmen wir.",
  },
  {
    question: "Was passiert mit unseren Kundendaten?",
    answer:
      "Verarbeitung ausschließlich in der EU beziehungsweise der Schweiz, auf Basis eines Auftragsverarbeitungsvertrags. Ihre Daten werden nicht zum Training von Modellen verwendet und nach dem Piloten auf Wunsch vollständig gelöscht. Für den Piloten reicht in der Regel ein pseudonymisierter Export.",
  },
  {
    question: "Unser CRM ist nicht besonders sauber gepflegt.",
    answer:
      "Das ist der Normalfall und selten ein Hindernis. Ein Großteil der Signale stammt aus öffentlichen Quellen. Firmenname und Website genügen als Ausgangspunkt. Wo Ihre internen Daten dünn sind, sagen wir Ihnen im Review genau, welche Felder den größten Hebel hätten.",
  },
  {
    question: "Welchen Opportunity-Typ sollten wir für den Piloten wählen?",
    answer:
      "Meist Upsell oder Cross-Sell, weil sich der Umsatz dort am schnellsten zeigt. Wenn Sie ein Abo- oder Retainer-Modell fahren, ist Churn-Frühwarnung häufig der wertvollere Einstieg. Wir entscheiden das im Kickoff gemeinsam.",
  },
  {
    question: "Ersetzt das unser Vertriebsteam?",
    answer:
      "Nein. Es ersetzt die Recherche, die Priorisierung und das Schreiben der Erstansprache. Das Gespräch, die Beziehung und der Abschluss bleiben bei Ihren Leuten. Sie führen nur deutlich mehr Gespräche, die Substanz haben.",
  },
  {
    question: "Und wenn der Pilot zeigt, dass sich das für uns nicht lohnt?",
    answer:
      "Dann sagen wir Ihnen das im Review und Sie haben für 1.000 € eine belastbare Antwort statt eines Projekts, das nach sechs Monaten versandet. Nicht jeder Kundenstamm trägt diese Mechanik. Genau dafür gibt es den Piloten.",
  },
];

export const revenueFinalMeta = [
  "Start innerhalb von 5 Tagen",
  "Festpreis 1.000 €",
  "Ergebnisgarantie",
  "Keine Vertragsbindung",
];

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
