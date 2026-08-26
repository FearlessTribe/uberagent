export const trustClients = [
  { name: "Finanznomade", logo: "/cases/finanznomade/logo.png" },
  { name: "B2B SaaS", logo: null },
  { name: "Digitalagentur CH", logo: null },
] as const;

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
      "Ihr Team verbringt wertvolle Zeit mit repetitiven Aufgaben, die längst automatisiert sein könnten. E-Mails sortieren, Daten übertragen, Reports erstellen, immer wieder das Gleiche.",
    visual: "manual" as const,
  },
  {
    id: "fragmented",
    label: "Daten-Chaos",
    title: "Daten ohne Entscheidungsgrundlage",
    description:
      "Sie sammeln Daten in verschiedenen Tools, aber es fehlt die Struktur, um daraus strategische Erkenntnisse abzuleiten. Informationen liegen verstreut, ohne klares Bild.",
    visual: "chaos" as const,
  },
  {
    id: "poc",
    label: "Wettbewerbsdruck",
    title: "Wettbewerber setzen bereits auf AI",
    description:
      "Andere automatisieren bereits ihre Prozesse und gewinnen an Geschwindigkeit. Je länger Sie warten, desto größer wird der Rückstand, und desto schwieriger wird es aufzuholen.",
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
      value: "7-14 Tage",
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
  primaryOutcome: { value: string; label: string };
  metrics: { value: string; label: string }[];
  tags: string[];
  openId?: string;
  preview?: {
    src: string;
    alt: string;
  };
}

export const caseStudies: CaseStudyCard[] = [
  {
    id: "finanznomade",
    industry: "Finanzen · Insurance · Expat",
    title: "Internationaler KV-Konfigurator für Finanznomade",
    quote:
      "Besonders stark fand ich, dass er nicht einfach nur Anforderungen umgesetzt hat, sondern sich intensiv in das Thema eingearbeitet […] Die Zusammenarbeit war unkompliziert, schnell und sehr lösungsorientiert.",
    person: "Kim Elsholz",
    role: "CEO von finanznoma.de der FINO Media LLC",
    primaryOutcome: { value: "5 Schritte", label: "Konfigurator live" },
    metrics: [
      { value: "5 Schritte", label: "Konfigurator" },
      { value: "5 Anbieter", label: "vergleichbar" },
      { value: "Funnel", label: "Affiliate-ready" },
    ],
    tags: ["Konfigurator", "Insurance Tech", "Affiliate"],
    openId: "finanznomade-kv",
    preview: {
      src: "/cases/finanznomade/screenshots/05-vergleich.png",
      alt: "Finanznomade Konfigurator, Tarifvergleich",
    },
  },
  {
    id: "digital-agency",
    industry: "Digitalagentur · Schweiz",
    title: "AI Sales Agent für Bestandskunden-Aktivierung",
    quote:
      "Statt generischer Outreach bekommen wir für jeden Account einen datenbasierten Audit und eine personalisierte Ansprache, in Minuten statt Wochen.",
    person: "Head of Growth",
    role: "Führende Schweizer Digitalagentur",
    primaryOutcome: { value: "Minuten", label: "statt Wochen" },
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
    primaryOutcome: { value: "6-8 Wo.", label: "Time-to-Value" },
    metrics: [
      { value: "6-8 Wo.", label: "Time-to-Value" },
      { value: "ICP+", label: "Signal-Scoring" },
      { value: "QA", label: "Governance" },
    ],
    tags: ["GTM Engineering", "CRM", "Pipeline"],
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
