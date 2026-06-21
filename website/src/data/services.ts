export interface ServiceStat {
  value: string;
  label: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  cardHook: string;
  icon: string;
  eyebrow: string;
  bannerTag: string;
  lead: string;
  tags: string[];
  stats: ServiceStat[];
  ctaLabel: string;
  featured?: boolean;
}

export const services: Service[] = [
  {
    id: "gtm-engineering",
    slug: "gtm-engineering",
    title: "AI GTM Engineering",
    shortDescription:
      "AI-gestützte GTM-Infrastruktur für B2B-SaaS-Teams: von ICP- und Signal-Logik bis zu Routing, Personalisierung und Reporting.",
    cardHook:
      "Aus fragmentierten CRM-Daten und Signalen wird eine skalierbare GTM-Pipeline — mit QA, Governance und messbarer Pipeline pro Kopf.",
    icon: "gtm",
    eyebrow: "Go-to-Market",
    bannerTag: "Von fragmentierten Daten zu skalierbarer Pipeline",
    lead: "Für RevOps, Marketing und Sales, die aus CRM, Signalen und Outreach endlich ein System machen wollen — nicht noch ein Tool.",
    tags: ["GTM", "CRM", "Pipeline"],
    stats: [
      { value: "6–8 Wo.", label: "Time-to-Value" },
      { value: "ICP + Signale", label: "Priorisierung" },
      { value: "QA + Governance", label: "Produktionsreif" },
    ],
    ctaLabel: "GTM-System besprechen",
    featured: true,
  },
  {
    id: "mcp",
    slug: "mcp",
    title: "End-to-End MCP Implementation",
    shortDescription:
      "Sichere MCP-Server und Integrationen, damit AI Agents strukturiert mit Ihren Unternehmensdaten und Workflows interagieren.",
    cardHook:
      "Ihre bestehenden Systeme werden AI-ready — standardisiert, sicher und erweiterbar statt fragiler Einzellösungen.",
    icon: "mcp",
    eyebrow: "Model Context Protocol",
    bannerTag: "Ihre Systeme, bereit für AI Agents",
    lead: "Wir entwickeln sichere MCP-Server und Integrationen, damit AI Agents strukturiert auf Ihre Unternehmensdaten und Workflows zugreifen können.",
    tags: ["MCP", "Integration", "Enterprise"],
    stats: [
      { value: "CRM · ERP · CMS", label: "Anbindungen" },
      { value: "Read + Write", label: "Kontrolliert" },
      { value: "OAuth + Audit", label: "Enterprise-ready" },
    ],
    ctaLabel: "MCP-Potenzial prüfen",
  },
  {
    id: "workflow-agents",
    slug: "workflow-agents",
    title: "AI Workflow Agents",
    shortDescription:
      "AI Agents für Workflows, die nicht nur antworten, sondern handeln — mit Regeln, Freigaben und voller Nachvollziehbarkeit.",
    cardHook:
      "Digitale Mitarbeitende für konkrete Prozesse — mit Human-in-the-loop, Systemintegration und kontrollierter Skalierung.",
    icon: "agents",
    eyebrow: "AI Workflow Agents",
    bannerTag: "Agenten, die handeln — nicht nur antworten",
    lead: "Digitale Mitarbeitende für konkrete Prozesse: Informationen sammeln, Entscheidungen im definierten Rahmen treffen und Aufgaben in Ihren Systemen ausführen.",
    tags: ["Agents", "Automation", "Operations"],
    stats: [
      { value: "Human-in-the-loop", label: "Kontrolle" },
      { value: "CRM · Tickets · Mail", label: "Integration" },
      { value: "Messbar", label: "Skalierung" },
    ],
    ctaLabel: "Workflow-Agent konzipieren",
  },
  {
    id: "business-models",
    slug: "business-models",
    title: "Validieren von neuen Geschäftsmodellen",
    shortDescription:
      "Strukturierte Validierung neuer Geschäftsmodelle — mit klaren Hypothesen, schnellen Experimenten und datenbasiertem Go/No-Go.",
    cardHook:
      "Von der Idee zum validierten Geschäftsmodell — bevor Sie Zeit und Budget in die falsche Richtung investieren.",
    icon: "validate",
    eyebrow: "Business Validation",
    bannerTag: "Validieren, bevor Sie Budget verbrennen",
    lead: "Neue Geschäftsmodelle sind teuer und riskant. Wir helfen Ihnen, Ideen strukturiert zu testen — mit klaren Hypothesen, schnellen Experimenten und messbaren Ergebnissen.",
    tags: ["Validation", "Strategy", "MVP"],
    stats: [
      { value: "↓ Risiko", label: "Vor Investition" },
      { value: "↑ Klarheit", label: "Durch Daten" },
      { value: "→ Go/No-Go", label: "Entscheidung" },
    ],
    ctaLabel: "Geschäftsmodell validieren",
  },
];

export const serviceIds = services.map((s) => s.id);
