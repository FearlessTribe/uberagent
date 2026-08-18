export interface ServiceStat {
  value: string;
  label: string;
}

export type ServiceCategoryId = "neu" | "engineering" | "strategy";

export const serviceCategories = [
  { id: "neu" as const, label: "Neu" },
  { id: "engineering" as const, label: "Engineering" },
  { id: "strategy" as const, label: "Strategy" },
];

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
  category: ServiceCategoryId;
  featured?: boolean;
}

export const services: Service[] = [
  {
    id: "ai-revenue-engine",
    slug: "ai-revenue-engine",
    title: "AI Revenue Engine",
    shortDescription:
      "Wir analysieren Ihren bestehenden Kundenstamm und identifizieren automatisch, welcher Kunde gerade welches Produkt kaufen könnte. Inklusive Vertriebsanlass und fertigem Outreach.",
    cardHook:
      "Ihr größter ungenutzter Vertriebskanal ist Ihr bestehender Kundenstamm: priorisierte Opportunities mit belegtem Anlass, fertigem Outreach und Rückschrieb ins CRM.",
    icon: "revenue",
    eyebrow: "Revenue Intelligence",
    bannerTag: "Pilot für 1.000 € · Start innerhalb von 5 Tagen",
    lead: "Wir analysieren Ihren bestehenden Kundenstamm und identifizieren automatisch, welcher Kunde gerade welches Produkt kaufen könnte. Inklusive konkretem Vertriebsanlass und fertigem Outreach, direkt zurück in Ihr CRM.",
    tags: ["Revenue", "Upsell", "CRM"],
    stats: [
      { value: "1.000 €", label: "Festpreis Pilot" },
      { value: "10 Arbeitstage", label: "Bis zur Opportunity-Liste" },
      { value: "200 Kunden", label: "Analysiert im Pilot" },
    ],
    ctaLabel: "Pilot-Termin buchen",
    category: "neu",
    featured: true,
  },
  {
    id: "vibe-coding-challenge",
    slug: "vibe-coding-challenge",
    title: "AI Vibe Coding Challenge",
    shortDescription:
      "Ihre Mitarbeiter kennen die Prozesse, die Geld kosten. In vier Wochen bauen sie selbst die Prototypen, bewertet nach Einsparpotenzial und prämiert mit einem Innovationspreis.",
    cardHook:
      "Ihr größtes Automatisierungspotenzial kennt längst ein Mitarbeiter. Gefragt hat ihn nur nie jemand.",
    icon: "vibe",
    eyebrow: "Innovation Enablement",
    bannerTag: "Vibe coding challenge",
    lead: "Wer einen Prozess jeden Tag bearbeitet, weiß genau, wo er Zeit und Geld verbrennt. In der AI Vibe Coding Challenge bauen Ihre Mitarbeiter in vier Wochen selbst die Prototypen. Bewertet nach Einsparpotenzial, prämiert mit einem internen Innovationspreis. Die tragfähigen Fälle setzen wir anschließend produktiv um.",
    tags: ["Enablement", "Innovation", "Prototyp"],
    stats: [
      { value: "4 Wochen", label: "Kickoff bis Preis" },
      { value: "4.900 €", label: "Pilot-Challenge" },
      { value: "bis 25", label: "Mitarbeitende" },
    ],
    ctaLabel: "Gespräch starten",
    category: "neu",
    featured: true,
  },
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
    category: "engineering",
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
    category: "engineering",
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
    category: "engineering",
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
    category: "strategy",
  },
  {
    id: "ai-strategy",
    slug: "ai-strategy",
    title: "AI Strategy",
    shortDescription:
      "Klare AI-Strategie statt isolierter Cases: Portfolio aufbauen, quantitativ bewerten, entscheiden und messbar skalieren.",
    cardHook:
      "Es braucht eine klare Strategie — nicht ein paar Cases, bei denen unklar bleibt, wie viel sie bringen. Wir machen AI planbar und messbar.",
    icon: "strategy",
    eyebrow: "AI Strategy",
    bannerTag: "Von Ideen zum priorisierten AI-Portfolio",
    lead: "Wie Ihr Unternehmen PowerPoint-Folien bricht, langwierige Strategie-Diskussionen verkürzt und produktive AI-Agenten entwickelt, die operative Kosten senken und Wachstum maximieren. Messbar und planbar.",
    tags: ["Strategy", "Portfolio", "Governance"],
    stats: [
      { value: "Portfolio", label: "statt Cases" },
      { value: "Messbar", label: "Impact" },
      { value: "Planbar", label: "Governance" },
    ],
    ctaLabel: "AI-Strategie besprechen",
    category: "strategy",
  },
  {
    id: "trainings",
    slug: "trainings",
    title: "Schulungen & Workshops",
    shortDescription:
      "Praxisnahe Enablement-Sessions, damit Ihr Team AI-Systeme versteht, steuert und weiterentwickelt, ohne Abhängigkeit von Einzelpersonen.",
    cardHook:
      "Vom ersten Shadow-Run bis zum Operating Model: Ihr Team lernt Prompting, Guardrails, Monitoring und Ownership an echten Use Cases.",
    icon: "train",
    eyebrow: "Enablement",
    bannerTag: "Teams befähigen, Systeme betreiben",
    lead: "Produktionstaugliche AI braucht Enablement. Wir schulen Fach- und Tech-Teams an Ihren Workflows, damit Wissen, Kontrolle und Verbesserung im Unternehmen bleiben.",
    tags: ["Enablement", "Workshops", "Operating Model"],
    stats: [
      { value: "1–2 Tage", label: "Workshop" },
      { value: "Hands-on", label: "an echten Cases" },
      { value: "Docs", label: "für den Betrieb" },
    ],
    ctaLabel: "Enablement planen",
    category: "strategy",
  },
];

export const serviceIds = services.map((s) => s.id);
