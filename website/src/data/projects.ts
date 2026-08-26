export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: "finanznomade-kv",
    slug: "finanznomade-versicherungsrechner",
    title: "Internationaler Krankenversicherungs-Konfigurator für Finanznomade",
    shortDescription:
      "Internationalen KV-Vergleich von der PDF-Welt in einen 5-Schritt-Konfigurator überführt, plus Architektur für Affiliate-Tracking, Provision und Funnel-Performance.",
    tags: ["Konfigurator", "Insurance Tech", "Affiliate System", "Datenprodukte"],
  },
  {
    id: "ai-sales-agent",
    slug: "sales-ai-agent",
    title: "AI Sales Agent für führende Digitalagentur der Schweiz",
    shortDescription:
      "Vollautomatische, personalisierte Verkaufsstrategie aus digitalem Potenzial durch elaborierte Kundenanalyse und massgeschneiderte Lösungen.",
    tags: ["Strategy", "AI Sales Agent", "Salesforce"],
  },
];

export const projectDetails = {
  "finanznomade-kv": {
    situation:
      "Finanznomade berät Unternehmer und Perpetual Traveler bei der Wahl internationaler Krankenversicherungen, der Markt liefert PDFs und inkompatible Tarifwerke statt fairen Vergleich.",
    solution:
      "Ein 5-Schritt-Konfigurator auf schema-validierter Multi-Anbieter-Datenbasis: Ampel-Vergleich, Detailmatrix mit Quellenpflicht und Broker-/Affiliate-Deep-Links, Fundament für Sales Tracking und Partnernetzwerk.",
    principle:
      "Providertreu und vergleichbar: Originalwortlaut bleibt, Vergleichbarkeit entsteht über Katalog-Mapping. Fehlende Information ist nie „nicht versichert“.",
    impact:
      "Auslandsversicherung wird konfigurierbar, Vergleich vertrauenswürdig, und Affiliate-Wachstum bekommt eine messbare Pipeline von der Quelle bis zum Abschluss.",
    phases: [
      "Analyse",
      "Datenmodellierung",
      "Produktkonzeption",
      "UX/UI",
      "Frontend",
      "Affiliate-/Tracking-Architektur",
    ],
    tech: ["React", "TypeScript", "Vite", "Python", "JSON Schema", "Cloudflare Pages"],
    client: "Finanznomade / Finance Masters",
  },
  "ai-sales-agent": {
    situation:
      "Eine führende Schweizer Digital-Agentur wollte ihren KMU-Kundenstamm aktivieren: Bestandskunden vor Vertragsablauf halten und bei den übrigen erkennen, wer Potenzial für eine neue Website hat. Die Datengrundlage waren zwei unverbundene Listen aus CRM- und öffentlichen Standortdaten. Von Hand nicht skalierbar.",
    solution:
      "Ich konzipierte einen KI-Agenten, der den gesamten Weg übernimmt, von der Datenzusammenführung bis zur fertigen, personalisierten Verkaufs-Mail in der jeweiligen Landessprache (DE / FR / IT). Der Agent führt die Datenquellen zusammen, segmentiert Kunden automatisch, analysiert für jede Website das echte digitale Potenzial und macht daraus einen ehrlichen, kostenlosen Audit-Bericht.",
    principle:
      "Deterministisches bleibt deterministisch, Sprache übernimmt die KI. Datenjoins und Segmentierung laufen regelbasiert und fehlerfrei; das Sprachmodell kommt nur dort zum Einsatz, wo Urteil und Personalisierung gefragt sind. Das macht das System verlässlich, datenschutzkonform (revDSG) und extrem günstig im Betrieb.",
    impact:
      "Tausende Kunden werden individuell statt generisch angesprochen in Minuten statt Wochen. Jeder Lead erhält einen glaubwürdigen, datenbasierten Grund für ein Gespräch, und die Betriebskosten der KI bleiben im Promillebereich des erzielten Umsatzes.",
    phases: [
      "Strategy",
      "AI Sales Agent Concept",
      "Use Case Development",
      "Cost- & Revenue Analysis",
      "Implementation",
      "Design",
    ],
    tech: ["n8n", "Claude", "Salesforce"],
    client: "Führendes Schweizer Digitalmarketing-Unternehmen",
  },
};
