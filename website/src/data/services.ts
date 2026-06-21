export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: "gtm-engineering",
    title: "AI GTM Engineering",
    shortDescription:
      "AI-gestützte GTM-Infrastruktur für B2B-SaaS-Teams: von ICP- und Signal-Logik bis zu Routing, Personalisierung und Reporting.",
    icon: "gtm",
  },
  {
    id: "mcp",
    title: "End-to-End MCP Implementation",
    shortDescription:
      "Sichere MCP-Server und Integrationen, damit AI Agents strukturiert mit Ihren Unternehmensdaten und Workflows interagieren.",
    icon: "mcp",
  },
  {
    id: "workflow-agents",
    title: "AI Workflow Agents",
    shortDescription:
      "AI Agents für Workflows, die nicht nur antworten, sondern handeln — mit Regeln, Freigaben und voller Nachvollziehbarkeit.",
    icon: "agents",
  },
  {
    id: "business-models",
    title: "Validieren von neuen Geschäftsmodellen",
    shortDescription:
      "Produktentwicklung und Ausrollen von neuen Geschäftsmodellen ist etwas sehr Zeit-, Kosten- und risikointensives.",
    icon: "validate",
  },
];

export const serviceIds = services.map((s) => s.id);
