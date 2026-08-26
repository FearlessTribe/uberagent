export interface ServiceStat {
  value: string;
  label: string;
}

export type ServiceCategoryId = "neu" | "engineering" | "strategy";

export const serviceCategories = [
  { id: "neu" as const, label: "Neu" },
  { id: "engineering" as const, label: "Engineering" },
  { id: "strategy" as const, label: "Beratung" },
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
  seoTitle?: string;
  seoDescription?: string;
}


export const services: Service[] = [
  {
    id: "corporate-gifting",
    slug: "anlassgeschenke",
    title: "Werbegeschenke zum Anlass",
    shortDescription:
      "Für Werbeartikelhersteller: planbare Aufträge aus Ihrem Sortiment. App im HubSpot Ihres Kunden. Er legt Budget fest. Nach Freigabe Bestellung in Ihren Systemen.",
    cardHook:
      "Anlässe bei Ihren Kunden werden zu Aufträgen aus Ihrem Sortiment.",
    icon: "gifting",
    eyebrow: "Für Werbeartikelhersteller",
    bannerTag: "Jetzt in HubSpot",
    lead: "Planbare Aufträge über das Jahr, aus Ihrem eigenen Sortiment. Anlässe finden wir. Der Account Manager Ihres Kunden gibt jede Bestellung frei.",
    tags: ["Werbeartikel", "HubSpot", "Anlässe"],
    stats: [
      { value: "HubSpot", label: "Marketplace live" },
      { value: "Kundenbudget", label: "Ostern und Weihnachten höher" },
      { value: "10%", label: "vom Warenwert" },
    ],
    ctaLabel: "15-Minuten-Demo buchen",
    category: "neu",
    featured: true,
    seoTitle: "Werbegeschenke zum Anlass | Für Werbeartikelhersteller",
    seoDescription:
      "Für Werbeartikelhersteller: planbare Aufträge aus Ihrem Sortiment. App im HubSpot Ihres Kunden. Budget vom Kunden. Bestellung landet in Ihren Systemen.",
  },
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
    id: "kalkulations-agent",
    slug: "kalkulations-agent",
    title: "KI-Kalkulationsagent",
    shortDescription:
      "Angebote in 20 Sekunden statt in 15 Minuten. Maxim rechnet nach Ihren Stundensätzen, Aufschlägen und Lieferantenpreisen – für Werkstätten und Handwerk.",
    cardHook:
      "Ihr Team tippt das Anliegen ein, das Angebot steht. Mit Ihren Regeln, Ihren Preisen, Ihrer Marge.",
    icon: "calc",
    eyebrow: "Für Werkstätten & Handwerk",
    bannerTag: "Angebote in ~20 Sekunden",
    lead: "Ihr Betrieb kalkuliert jeden Tag Dutzende Preisanfragen. Maxim rechnet nach Ihren Stundensätzen, Ihren Aufschlägen und den aktuellen Preisen Ihres Lieferanten. Ihr Team gibt das Anliegen ein, das Angebot steht.",
    tags: ["Kalkulation", "Handwerk", "Angebote"],
    stats: [
      { value: "~20 Sek.", label: "pro Kalkulation" },
      { value: "6 Wochen", label: "bis Go-live" },
      { value: "3 Stufen", label: "Team · Web · Telefon" },
    ],
    ctaLabel: "Kalkulations-Check anfragen",
    category: "neu",
    featured: true,
    seoTitle: "KI-Kalkulationsagent | Angebote in Sekunden",
    seoDescription:
      "Maxim kalkuliert nach Ihrer Preislogik: Stundensätze, Aufschläge, Lieferantenpreise. Für KFZ-Werkstätten und Handwerksbetriebe. Kostenloser Kalkulations-Check.",
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
      "Aus fragmentierten CRM-Daten und Signalen wird eine skalierbare GTM-Pipeline, mit QA, Governance und messbarer Pipeline pro Kopf.",
    icon: "gtm",
    eyebrow: "Go-to-Market",
    bannerTag: "Von fragmentierten Daten zu skalierbarer Pipeline",
    lead: "Für RevOps, Marketing und Sales, die aus CRM, Signalen und Outreach endlich ein System machen wollen, nicht noch ein Tool.",
    tags: ["GTM", "CRM", "Pipeline"],
    stats: [
      { value: "6-8 Wo.", label: "Time-to-Value" },
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
      "Ihre bestehenden Systeme werden AI-ready, standardisiert, sicher und erweiterbar statt fragiler Einzellösungen.",
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
      "AI Agents für Workflows, die nicht nur antworten, sondern handeln, mit Regeln, Freigaben und voller Nachvollziehbarkeit.",
    cardHook:
      "Digitale Mitarbeitende für konkrete Prozesse, mit Human-in-the-loop, Systemintegration und kontrollierter Skalierung.",
    icon: "agents",
    eyebrow: "AI Workflow Agents",
    bannerTag: "Agenten, die handeln, nicht nur antworten",
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
      "Strukturierte Validierung neuer Geschäftsmodelle, mit klaren Hypothesen, schnellen Experimenten und datenbasiertem Go/No-Go.",
    cardHook:
      "Von der Idee zum validierten Geschäftsmodell, bevor Sie Zeit und Budget in die falsche Richtung investieren.",
    icon: "validate",
    eyebrow: "Business Validation",
    bannerTag: "Validieren, bevor Sie Budget verbrennen",
    lead: "Neue Geschäftsmodelle sind teuer und riskant. Wir helfen Ihnen, Ideen strukturiert zu testen, mit klaren Hypothesen, schnellen Experimenten und messbaren Ergebnissen.",
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
      "Es braucht eine klare Strategie, nicht ein paar Cases, bei denen unklar bleibt, wie viel sie bringen. Wir machen AI planbar und messbar.",
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
      { value: "1-2 Tage", label: "Workshop" },
      { value: "Hands-on", label: "an echten Cases" },
      { value: "Docs", label: "für den Betrieb" },
    ],
    ctaLabel: "Enablement planen",
    category: "strategy",
  },
];


export interface ProductizedAgent {
  serviceId: string;
  name: string;
  role: string;
  tagline: string;
  personality: string;
  bio: string;
  audience: string;
  traits: string[];
  lottieSrc: string;
  posterSrc: string;
}

/** Productized agents shown as personas (not as category mascots). */
export const productizedAgents: ProductizedAgent[] = [
  {
    serviceId: "ai-revenue-engine",
    name: "Leopold",
    role: "Revenue Agent",
    tagline: "Analytisches Schwergewicht für Ihren Bestand.",
    personality:
      "Ruhig, präzise, unbestechlich. Leopold denkt in Daten, nicht in Bauchgefühl – und bleibt höflich, wenn der Vertrieb das nicht tut.",
    bio: "Leopold analysiert Ihren Kundenstamm, entdeckt Pain Points und Kaufsignale und leitet daraus konkrete Sales-Opportunities ab – inklusive Anlass und Outreach, zurück ins CRM.",
    audience: "Für Agenturen",
    traits: ["Analytisch", "Opportunity Scout", "CRM-native"],
    lottieSrc: "/lottie/leopold-agent.json",
    posterSrc: "/lottie/leopold-agent.png",
  },
  {
    serviceId: "corporate-gifting",
    name: "Helena",
    role: "Geschenk-Agentin",
    tagline: "Empathisch. Merkt jeden Anlass – und Ihr Sortiment.",
    personality:
      "Warm, aufmerksam, nie aufdringlich. Helena kennt Geburtstage und Jubiläen besser als der Kalender und schlägt nur vor, was wirklich passt.",
    bio: "Helena lebt im HubSpot Ihrer Kunden, erkennt Anlässe und verwandelt sie in freigegebene Bestellungen aus Ihrem Sortiment – planbar über das Jahr.",
    audience: "Für Werbemittelhersteller und Vertriebe",
    traits: ["Empathisch", "Anlass-Radar", "Sortiment first"],
    lottieSrc: "/lottie/gifting-agent.json",
    posterSrc: "/lottie/gifting-agent.png",
  },
  {
    serviceId: "kalkulations-agent",
    name: "Maxim",
    role: "Kalkulations-Agent",
    tagline: "Rechnet wie Sie. Nur in 20 Sekunden.",
    personality:
      "Klar, zuverlässig, kein Show-off. Maxim erfindet keine Preise – er rechnet mit Ihren Regeln und sagt ehrlich, wenn etwas fehlt.",
    bio: "Maxim kalkuliert Angebote nach Ihren Stundensätzen, Aufschlägen und Lieferantenpreisen. Ihr Team tippt das Anliegen ein – Teile, Arbeitszeit, Marge und Endpreis stehen.",
    audience: "Für KMU",
    traits: ["Präzise", "Preislogik-treu", "Team-ready"],
    lottieSrc: "/lottie/maxim-agent.json",
    posterSrc: "/lottie/maxim-agent.png",
  },
];

export const productizedAgentIds = new Set(
  productizedAgents.map((agent) => agent.serviceId),
);

export interface NavServiceItem {
  serviceId: string;
  title: string;
  blurb: string;
  icon: string;
  avatarSrc?: string;
  subtitle?: string;
}

export interface NavServiceGroup {
  id: "engineering" | "beratung" | "agents";
  label: string;
  description: string;
  items: NavServiceItem[];
}

function navItemFromService(
  serviceId: string,
  blurb: string,
  extras?: Pick<NavServiceItem, "avatarSrc" | "subtitle" | "title">,
): NavServiceItem {
  const service = services.find((entry) => entry.id === serviceId);
  if (!service) {
    throw new Error(`Unknown service for nav: ${serviceId}`);
  }
  return {
    serviceId,
    title: extras?.title ?? service.title,
    blurb,
    icon: service.icon,
    avatarSrc: extras?.avatarSrc,
    subtitle: extras?.subtitle,
  };
}

export const navServiceGroups: NavServiceGroup[] = [
  {
    id: "engineering",
    label: "Engineering",
    description: "Systeme, die im Stack produktiv laufen",
    items: [
      navItemFromService(
        "workflow-agents",
        "Digitale Mitarbeitende für konkrete Prozesse",
      ),
      navItemFromService("mcp", "Sichere Anbindung Ihrer Systeme an AI Agents"),
      navItemFromService(
        "gtm-engineering",
        "Skalierbare Pipeline aus CRM, Signalen und Outreach",
      ),
    ],
  },
  {
    id: "beratung",
    label: "Beratung",
    description: "Entscheidungen vor dem Bau",
    items: [
      navItemFromService(
        "ai-strategy",
        "Vom Case-Chaos zum priorisierten AI-Portfolio",
      ),
      navItemFromService(
        "business-models",
        "Hypothesen testen, bevor Budget verbrennt",
      ),
      navItemFromService(
        "trainings",
        "Teams befähigen, Systeme zu betreiben",
      ),
      navItemFromService(
        "vibe-coding-challenge",
        "Mitarbeiter bauen die Prototypen selbst",
      ),
    ],
  },
  {
    id: "agents",
    label: "Unsere suprahumanistischen Agents",
    description: "Fertige Agenten mit klarem Job",
    items: [
      navItemFromService(
        "ai-revenue-engine",
        "Analysiert Bestand und findet Sales-Opportunities",
        {
          title: "Leopold",
          subtitle: "Revenue Agent",
          avatarSrc: "/lottie/leopold-agent.png",
        },
      ),
      navItemFromService(
        "corporate-gifting",
        "Anlässe werden zu Aufträgen aus Ihrem Sortiment",
        {
          title: "Helena",
          subtitle: "Geschenk-Agentin",
          avatarSrc: "/lottie/gifting-agent.png",
        },
      ),
      navItemFromService(
        "kalkulations-agent",
        "Angebote in Sekunden nach Ihrer Preislogik",
        {
          title: "Maxim",
          subtitle: "Kalkulations-Agent",
          avatarSrc: "/lottie/maxim-agent.png",
        },
      ),
    ],
  },
];

export const serviceIds = services.map((s) => s.id);

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

