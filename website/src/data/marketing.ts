export const trustTools = [
  { name: "Salesforce", icon: "salesforce" },
  { name: "HubSpot", icon: "hubspot" },
  { name: "Claude", icon: "claude" },
  { name: "OpenAI", icon: "openai" },
  { name: "n8n", icon: "n8n" },
  { name: "MCP", icon: "mcp" },
  { name: "Notion", icon: "notion" },
  { name: "Slack", icon: "slack" },
  { name: "PostgreSQL", icon: "postgres" },
  { name: "SAP", icon: "sap" },
] as const;

export const painPoints = [
  {
    id: "manual",
    label: "Zeitfresser",
    title: "Manuelle Prozesse verschlingen Stunden",
    description:
      "Ihr Team verbringt wertvolle Zeit mit repetitiven Aufgaben, die längst automatisiert sein könnten. E-Mails sortieren, Daten übertragen, Reports erstellen – immer wieder das Gleiche.",
    visual: "manual" as const,
  },
  {
    id: "fragmented",
    label: "Daten-Chaos",
    title: "Daten ohne Entscheidungsgrundlage",
    description:
      "Sie sammeln Daten in verschiedenen Tools, aber es fehlt die Struktur, um daraus strategische Erkenntnisse abzuleiten. Informationen liegen verstreut – ohne klares Bild.",
    visual: "chaos" as const,
  },
  {
    id: "poc",
    label: "Wettbewerbsdruck",
    title: "Wettbewerber setzen bereits auf AI",
    description:
      "Andere automatisieren bereits ihre Prozesse und gewinnen an Geschwindigkeit. Je länger Sie warten, desto größer wird der Rückstand – und desto schwieriger wird es aufzuholen.",
    visual: "gap" as const,
  },
];

export const kickstartOffer = {
  eyebrow: "Low-Friction Einstieg",
  title: "Kickstart Sprint",
  tagline: "Einen funktionierenden Ablauf. Nicht „AI-Beratung“.",
  description:
    "Schnell genug, um nicht im Strategie-Sumpf zu sterben. Absichtlich eng. Sonst wird es wieder ein endloses IT-Projekt.",
  pillars: [
    {
      label: "Dauer",
      value: "7–14 Tage",
      text: "Schnell genug, um nicht im Strategie-Sumpf zu sterben.",
    },
    {
      label: "Scope",
      value: "1 Workflow",
      text: "Absichtlich eng. Sonst wird es wieder ein endloses IT-Projekt.",
    },
    {
      label: "Ergebnis",
      value: "Live Prototype",
      text: "Ein Ablauf, der echte Arbeit vorbereitet oder übernimmt.",
    },
  ],
  cta: "Kickstart Sprint besprechen",
};

export interface CaseStudyCard {
  id: string;
  industry: string;
  title: string;
  quote: string;
  person: string;
  role: string;
  metrics: { value: string; label: string }[];
  tags: string[];
  openId?: string;
}

export const caseStudies: CaseStudyCard[] = [
  {
    id: "digital-agency",
    industry: "Digitalagentur · Schweiz",
    title: "AI Sales Agent für Bestandskunden-Aktivierung",
    quote:
      "Statt generischer Outreach bekommen wir für jeden Account einen datenbasierten Audit und eine personalisierte Ansprache, in Minuten statt Wochen.",
    person: "Head of Growth",
    role: "Führende Schweizer Digitalagentur",
    metrics: [
      { value: "Minuten", label: "statt Wochen" },
      { value: "DE/FR/IT", label: "Personalisierung" },
      { value: "revDSG", label: "konform" },
    ],
    tags: ["AI Sales Agent", "Salesforce", "n8n"],
    openId: "ai-sales-agent",
  },
  {
    id: "b2b-saas",
    industry: "B2B SaaS · RevOps",
    title: "GTM-Pipeline aus CRM-Signalen und ICP-Scoring",
    quote:
      "Priorisierung war vorher Bauchgefühl. Jetzt steuern wir Outreach über Signale, Scoring und klare Ownership, mit messbarer Pipeline pro Kopf.",
    person: "VP Revenue Operations",
    role: "Wachsendes B2B-SaaS-Unternehmen",
    metrics: [
      { value: "6–8 Wo.", label: "Time-to-Value" },
      { value: "ICP+", label: "Signal-Scoring" },
      { value: "QA", label: "Governance" },
    ],
    tags: ["GTM Engineering", "CRM", "Pipeline"],
  },
  {
    id: "industrial",
    industry: "Industrie · Leadership",
    title: "AI Strategy: klare Roadmap statt Cases ohne Impact",
    quote:
      "Wir hatten ein paar Cases und keine Klarheit, was sie wirklich bringen. Das Scoring und die Stage-Gates haben uns zu einem priorisierten Portfolio gebracht.",
    person: "CTO",
    role: "Mittelständisches Industrieunternehmen",
    metrics: [
      { value: "5 Achsen", label: "Scoring" },
      { value: "Portfolio", label: "statt Bauchgefühl" },
      { value: "Gates", label: "vor Scale" },
    ],
    tags: ["AI Strategy", "Portfolio", "Governance"],
  },
];

export const faqItems = [
  {
    question: "Für wen ist überagent geeignet?",
    answer:
      "Für B2B-Teams mit echten Systemen und Prozessen: RevOps, Sales, Operations und Leadership, die AI produktiv machen wollen, nicht nur demonstrieren. Ideal, wenn CRM, Tickets oder ERP bereits existieren und klare Ownership möglich ist.",
  },
  {
    question: "Wie schnell sehe ich erste Ergebnisse?",
    answer:
      "Ein Kickstart Sprint liefert typischerweise in 7–14 Tagen einen Live Prototype für einen klar begrenzten Workflow. Größere Enterprise-Integrationen planen wir danach in klaren Stage-Gates.",
  },
  {
    question: "Was kostet eine Zusammenarbeit?",
    answer:
      "Das Erstgespräch ist kostenlos. Danach erhalten Sie ein transparentes Angebot nach Scope, Systemen und Delivery-Modell. Typisch starten wir mit Kickstart Sprint oder Workshop, bevor Budget in die Breite geht.",
  },
  {
    question: "Brauche ich technisches Vorwissen?",
    answer:
      "Nein. Wir übernehmen Architektur, Integration und Guardrails. Ihr Team bringt Prozesswissen und Freigaben; wir liefern Enablement, Dokumentation und klare Operating Models.",
  },
  {
    question: "Wie stellt ihr Datenschutz und Compliance sicher?",
    answer:
      "Jede Lösung wird mit Data-Access-Grenzen, Audit-Logs und Human-in-the-loop designed. Wir klassifizieren Use Cases früh (inkl. EU AI Act / DSGVO-Relevanz) und bauen nur, was betrieblich und rechtlich tragfähig ist.",
  },
  {
    question: "Build, Buy oder Configure?",
    answer:
      "Je Case entscheiden wir Make-or-Buy: Hyperscaler-Plattform, bestehende Tools oder Eigenentwicklung über MCP und Agents. Entscheidend ist Wartbarkeit, Kontrolle und Time-to-Value, nicht Technologie um der Technologie willen.",
  },
];

export const roiDefaults = {
  teamSize: 12,
  hoursPerWeek: 8,
  hourlyRate: 85,
  automationRate: 0.75,
};

export type RoiCurrency = "CHF" | "EUR" | "USD";

export const roiCurrencies: { code: RoiCurrency; label: string; locale: string }[] = [
  { code: "CHF", label: "CHF", locale: "de-CH" },
  { code: "EUR", label: "EUR", locale: "de-DE" },
  { code: "USD", label: "USD", locale: "en-US" },
];
