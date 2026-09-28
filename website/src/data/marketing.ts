export const trustClients = [
  { name: "LST Finance Groupe AG", logo: "/cases/lst-finance/logo.svg" },
  { name: "Finanznomade", logo: "/cases/finanznomade/logo.png" },
  { name: "B2B SaaS", logo: null },
  { name: "Digitalagentur CH", logo: null },
] as const;

export const finanznomadeCaseVideo = {
  src: "/cases/finanznomade/walkthrough.mp4",
  poster: "/cases/finanznomade/poster.jpg",
} as const;

export const finanznomadeIphoneVideo = {
  src: "/cases/finanznomade/iphone.mp4",
  poster: "/cases/finanznomade/poster.jpg",
} as const;

export const lstFinanceCaseVideo = {
  src: "/cases/lst-finance/walkthrough.mp4",
  poster: "/cases/lst-finance/poster.jpg",
} as const;

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

export type CaseStudyCategory = "konfiguratoren" | "agenten" | "gtm";

export const caseStudyFilters: {
  id: "all" | CaseStudyCategory;
  label: string;
}[] = [
  { id: "all", label: "Alle" },
  { id: "konfiguratoren", label: "Konfiguratoren" },
  { id: "agenten", label: "Agenten" },
  { id: "gtm", label: "GTM" },
];

export interface CaseStudyCard {
  id: string;
  category: CaseStudyCategory;
  industry: string;
  title: string;
  quote: string;
  person: string;
  role: string;
  personPhoto?: string;
  openId?: string;
  preview?: {
    src: string;
    alt: string;
  };
  video?: {
    src: string;
    poster: string;
  };
}

export const caseStudies: CaseStudyCard[] = [
  {
    id: "finanznomade",
    category: "konfiguratoren",
    industry: "Finanznomade · Expat",
    title: "Affiliate System für Internationale Krankenversicherungen",
    quote:
      "Besonders stark fand ich, dass er nicht einfach nur Anforderungen umgesetzt hat, sondern sich intensiv in das Thema eingearbeitet […] Die Zusammenarbeit war unkompliziert, schnell und sehr lösungsorientiert.",
    person: "Kim Elsholz",
    role: "CEO, finanznoma.de",
    personPhoto: "/cases/finanznomade/kim-maurice.jpg",
    openId: "finanznomade-kv",
    video: finanznomadeCaseVideo,
  },
  {
    id: "lst-finance",
    category: "konfiguratoren",
    industry: "in die Schweiz · LST Finance",
    title: "Leadmaschine für Schweizer Versicherungen",
    quote:
      "Wir hatten schon Agenturen beauftragt. Was fehlte, war ein Konfigurator, der den Weg bis zum beratungsreifen Lead zu Ende denkt – nicht nur eine schöne Oberfläche.",
    person: "Frank Lopp",
    role: "CEO, LST Finance Groupe AG",
    personPhoto: "/cases/lst-finance/frank-lopp.png",
    openId: "lst-finance-kv",
    video: lstFinanceCaseVideo,
  },
  {
    id: "digital-agency",
    category: "agenten",
    industry: "Digitalagentur · Schweiz",
    title: "AI Sales Agent für Bestandskunden-Aktivierung",
    quote:
      "Statt generischer Outreach bekommen wir für jeden Account einen datenbasierten Audit und eine personalisierte Ansprache, in Minuten statt Wochen.",
    person: "Head of Growth",
    role: "Führende Schweizer Digitalagentur",
    openId: "ai-sales-agent",
  },
  {
    id: "b2b-saas",
    category: "gtm",
    industry: "B2B SaaS · RevOps",
    title: "GTM-Pipeline aus CRM-Signalen und ICP-Scoring",
    quote:
      "Priorisierung war vorher Bauchgefühl. Jetzt steuern wir Outreach über Signale, Scoring und klare Ownership, mit messbarer Pipeline pro Kopf.",
    person: "VP Revenue Operations",
    role: "Wachsendes B2B-SaaS-Unternehmen",
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
