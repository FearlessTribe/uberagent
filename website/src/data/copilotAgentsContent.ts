export const copilotHeroEyebrow = "Copilot-Agenten für Microsoft 365";

export const copilotHeroHeadline =
  "Copilot-Agenten, die in Ihrem Microsoft 365 arbeiten. Nicht nur antworten.";

export const copilotHeroLead =
  "Ein klar begrenzter Workflow – Posteingang, Anfragen, Belege – wird von einem Agenten in Copilot Studio übernommen: sortieren, anlegen, entwerfen, Freigabe einholen. In Teams, Outlook und SharePoint, mit den Rechten, die Ihr Team ohnehin hat.";

export const copilotHeroNote =
  "1 Workflow · 10–15 Arbeitstage ab Zugang · Festpreis";

export const copilotProblemTitle = "Copilot ist da. Die Arbeit auch.";

export const copilotProblemBody = [
  "Viele Unternehmen haben Microsoft 365 Copilot eingeführt oder prüfen die Lizenzen. Copilot Chat fasst zusammen, schreibt Entwürfe, beantwortet Fragen. Was er nicht tut: das geteilte Service-Postfach abarbeiten, aus einer Anfrage ein Angebot vorbereiten, eine Rechnung mit der Bestellung abgleichen. Diese Arbeit liegt weiter bei Ihrem Team – Vorgang für Vorgang, mit Copy-and-paste zwischen Outlook, SharePoint und dem Fachsystem.",
  "Erste eigene Agenten, mit Agent Builder oder Copilot Studio geklickt, beantworten Fragen zu Richtlinien. Sobald sie handeln sollen – ein Ticket anlegen, ein Feld im CRM schreiben, eine Mail versenden – fehlen Regeln, Freigaben, Fehlerpfade und jemand, der den Agenten betreibt. Die IT sieht Agenten entstehen, die niemand freigegeben hat.",
  "Ein Copilot-Agent ist wertvoll, wenn er einen abgegrenzten Ablauf besser, schneller und nachvollziehbarer erledigt als manuelle Koordination – und wenn ein Mensch an den Stellen entscheidet, an denen Regeln enden. Genau diesen Agenten bauen wir.",
];

export type CopilotWorkflowIcon = "inbox" | "document" | "receipt";

export const copilotWorkflows = [
  {
    num: "01",
    title: "Service-Postfach",
    icon: "inbox" as CopilotWorkflowIcon,
    summary:
      "Kein Vorgang bleibt unbeantwortet im Postfach liegen, jede Antwort hat einen Ticketbezug, und Ihr Team bearbeitet Ausnahmen statt Routine.",
    steps: [
      {
        label: "Eingang",
        text: "Anfragen im geteilten Postfach (Outlook) oder als Formular in Teams.",
      },
      {
        label: "Agent",
        text: "Erkennt Thema und Dringlichkeit, prüft Kundendaten und Vorgangshistorie, legt den Vorgang im Ticketsystem an oder aktualisiert ihn, schreibt den Antwortentwurf auf Basis Ihrer Wissensquellen in SharePoint.",
      },
      {
        label: "Freigabe",
        text: "Standardfälle gehen nach definierter Regel raus; alles andere landet mit Entwurf, Quellen und Vorschlag bei der zuständigen Person in Teams – ein Klick, versendet, protokolliert.",
      },
    ],
  },
  {
    num: "02",
    title: "Angebots- und Auftragsvorbereitung",
    icon: "document" as CopilotWorkflowIcon,
    summary:
      "Der erste Entwurf steht, bevor jemand suchen muss; jede Anfrage ist im CRM sichtbar; Nachfassen läuft nach Regel statt nach Erinnerung.",
    steps: [
      { label: "Eingang", text: "Anfrage per Mail oder Webformular." },
      {
        label: "Agent",
        text: "Gleicht den Absender mit dem CRM ab (Dynamics 365, HubSpot oder Salesforce per Connector), zieht Konditionen und Preisliste aus SharePoint, füllt Ihre Angebotsvorlage in Word und legt eine Opportunity mit Anlass und Fristen an.",
      },
      {
        label: "Freigabe",
        text: "Der Vertrieb sieht Entwurf, Marge und offene Fragen in Teams, korrigiert, gibt frei.",
      },
    ],
  },
  {
    num: "03",
    title: "Rechnungs- und Bestellabgleich",
    icon: "receipt" as CopilotWorkflowIcon,
    summary:
      "Niemand tippt Rechnungsdaten ab, Abweichungen fallen am Tag des Eingangs auf, und die Buchhaltung erhält geprüfte Vorschläge statt Rohbelege.",
    steps: [
      { label: "Eingang", text: "Lieferantenrechnung per Mail als PDF." },
      {
        label: "Agent",
        text: "Liest Rechnungsdaten aus, sucht die zugehörige Bestellung im ERP (z. B. Business Central per Connector; andere Systeme über eine kontrollierte MCP-Anbindung), markiert Abweichungen bei Menge, Preis und Lieferdatum.",
      },
      {
        label: "Freigabe",
        text: "Abweichungsfreie Rechnungen werden zur Buchung vorgeschlagen; jede Abweichung geht mit Begründung an den zuständigen Einkäufer in Teams.",
      },
    ],
  },
] as const;

export const copilotWorkflowPatternSteps = [
  "Inbox",
  "Triage",
  "Handoff",
  "Done",
] as const;

export const copilotWorkflowPatternNote =
  "Alle drei Workflows folgen demselben Muster. Wo Regeln enden, holt der Agent Freigabe ein – mit Entwurf, Kontext und klarem Owner.";

export const copilotFit = {
  good: [
    "Der Ablauf kommt jede Woche mehrfach vor",
    "Informationen aus mehreren Quellen müssen zusammengeführt werden",
    "Ihr Team arbeitet in Microsoft 365",
    "Sie wollen Entlastung, ohne die Kontrolle über Schreibvorgänge abzugeben",
  ],
  bad: [
    "Jede Entscheidung braucht individuelles Urteil",
    "Es gibt keine Regeln und keine Prozessgrenzen",
    "Datenquellen liegen außerhalb Ihres Tenants und dürfen nicht angebunden werden",
    "Sie suchen einen unternehmensweiten Copilot-Rollout mit Schulungen",
  ],
};

export const copilotFitNote =
  "Wenn Copilot Studio für Ihren Workflow nicht das richtige Werkzeug ist, sagen wir das im Blueprint. Wir verkaufen keine Microsoft-Lizenzen und erhalten keine Partnervergütung.";

export const copilotBenefitsIntro =
  "Der Vorgang beginnt nicht mehr bei null: Wenn ein Mensch den Fall sieht, liegen Zuordnung, Daten und Entwurf bereits vor. Nichts wird geschrieben, was nicht freigegeben ist – und jeder Schreibvorgang ist im Protokoll nachvollziehbar.";

export const copilotKpiMetrics = [
  {
    value: "Korrekte Zuordnung",
    label: "Anteil der Fälle ohne Fehlzuordnung am Testset",
  },
  {
    value: "Zeit bis Freigabe",
    label: "Vom Eingang bis zum Freigabe-Entwurf in Teams",
  },
  {
    value: "Credits/Vorgang",
    label: "Microsoft-Copilot-Kosten pro abgeschlossenem Vorgang",
  },
] as const;

export const copilotKpiNote =
  "Im Blueprint legen wir diese Kennzahlen fest. Im Sprint messen wir sie an 20 oder mehr echten Fällen und nehmen den Agenten nur ab, wenn das vereinbarte Kriterium erreicht ist.";

export const copilotOfferIntro =
  "Drei Stufen. Sie entscheiden nach jeder anhand von Ergebnissen.";

export const copilotTiers = [
  {
    id: "blueprint",
    cap: "Stufe 1 · Copilot Agent Blueprint",
    price: "2.400 € / CHF 2'400",
    note: "Preis-Hypothese · 5 Arbeitstage · ohne Tenant-Zugang",
    featured: false,
    items: [
      "Workflow-Karte mit Regeln, Ausnahmen und Freigabepunkten",
      "Rechte- und Datenkonzept für Ihre IT",
      "Kostenrechnung mit Microsoft-Listenpreisen",
      "Klick-Demo mit anonymisierten Beispielfällen",
      "Festpreisangebot für Stufe 2 – oder begründete Absage",
      "Vollständig angerechnet auf Stufe 2 innerhalb von 60 Tagen",
    ],
  },
  {
    id: "sprint",
    cap: "Stufe 2 · Kickstart Sprint · Copilot",
    price: "9.800–16.000 €",
    note: "Preis-Hypothese · Festpreis nach Blueprint · 10–15 AT ab Zugang",
    featured: true,
    gate: "Nachbesserung inklusive, wenn das Abnahmekriterium nicht erreicht wird.",
    items: [
      "Produktiver Agent in Microsoft Copilot Studio",
      "Bereitstellung in Teams (und M365 Copilot, falls lizenziert)",
      "1–3 Quellen: SharePoint, Postfach, Fachsystem per Connector oder MCP",
      "Freigabeschritt in Teams vor jedem Schreibvorgang",
      "Logging, 20+ Testfälle, Runbook und 2 h Übergabe",
      "30 Tage Nachbetreuung",
    ],
  },
  {
    id: "ops",
    cap: "Stufe 3 · Agent Ops",
    price: "900–2.400 €",
    note: "Preis-Hypothese · pro Monat · monatlich kündbar",
    featured: false,
    items: [
      "Reporting: Nutzung, Freigabequote, Eskalationen, Credits",
      "Pflege von Wissensquellen, Regeln und Prompts",
      "Anpassung an Microsoft-Plattformänderungen",
      "Regressionstests nach Änderungen",
      "Quartals-Review mit Backlog weiterer Workflows",
    ],
  },
];

export const copilotTiersFootnote =
  "Preise zzgl. MwSt. (Preis-Hypothesen zum Testen). Microsoft-Lizenzen und Copilot-Credits werden von Microsoft direkt abgerechnet und im Blueprint transparent ausgewiesen; wir verkaufen keine Lizenzen.";

export const copilotProcess = [
  {
    title: "Erstgespräch",
    when: "30 Minuten",
    detail:
      "Sie beschreiben den Workflow, wir prüfen Eingang, Regeln, Quellen und Schreibvorgänge – oder sagen, dass es sich nicht lohnt.",
  },
  {
    title: "Blueprint",
    when: "5 Arbeitstage",
    detail:
      "Zwei Termine mit Prozessverantwortlichen und IT. Danach: Workflow-Karte, Rechtekonzept, Kostenrechnung, Demo und Festpreisangebot.",
  },
  {
    title: "Zugang",
    when: "Ihre IT",
    detail:
      "Umgebung und Berechtigungen nach unserer Checkliste. Erst danach beginnt die Sprint-Uhr.",
  },
  {
    title: "Sprint",
    when: "10–15 Arbeitstage",
    detail:
      "Bau, Anbindung, Freigabe, Testfälle, Abnahme am Testset, Übergabe an Ihren Owner.",
  },
  {
    title: "Nachbetreuung",
    when: "30 Tage",
    detail:
      "Begleitung, dann Ihre Entscheidung: Betrieb durch uns, durch Ihr Team oder nächster Workflow.",
  },
];

export const copilotProcessFootnote =
  "Ihr Aufwand: rund zwei Stunden im Blueprint, rund vier Stunden im Sprint für Testfälle und Übergabe, plus Zugangs-Einrichtung durch Ihre IT.";

export const copilotWhyLead = {
  title: "Agenten mit Schreibrechten sind unser Handwerk",
  text: "Für ein führendes Schweizer Digitalmarketing-Unternehmen haben wir einen Agenten gebaut, der Kundendatensätze analysiert, Verkaufsanlässe ableitet und Ergebnisse in Deutsch, Französisch und Italienisch ins CRM zurückschreibt – produktiv, nicht als Demo.",
};

export const copilotWhyTiles = [
  {
    title: "Freigabe und Protokoll sind Lieferumfang",
    text: "Rechteumfang, Freigabeschritt, Logging und Fehlerpfade stehen im Blueprint, bevor gebaut wird. Unser MCP-Service bindet Fachsysteme außerhalb von Microsoft 365 mit OAuth, Scopes und Audit Log an.",
  },
  {
    title: "Sie sprechen mit dem, der baut",
    text: "Blueprint, Sprint und Übergabe macht der Gründer persönlich. Keine Übergabe an ein Juniorteam nach dem Kickoff.",
  },
  {
    title: "Microsoft-Plattform, mit Quellen statt Versprechen",
    text: "Ihr Agent läuft in Ihrem Tenant. Copilot zeigt nur Daten, für die der Nutzer Leserechte hat; Prompts und Graph-Daten werden laut Microsoft nicht zum Training der Basismodelle verwendet.",
  },
  {
    title: "Wir sagen ab, wenn es nicht passt",
    text: "Im Blueprint steht auch: nicht mit Copilot Studio oder nicht jetzt – Sie behalten Workflow-Karte, Konzept und Kostenrechnung.",
  },
] as const;

export const copilotFaq = [
  {
    question: "Brauchen wir Microsoft 365 Copilot-Lizenzen für alle Nutzer?",
    answer:
      "Nein. Ein Copilot-Studio-Agent kann in Teams auch von Nutzern ohne Copilot-Lizenz verwendet werden; die Nutzung wird über Copilot-Credits abgerechnet. Nutzer mit Copilot-Lizenz können den Agenten zusätzlich in Microsoft 365 Copilot ansprechen. Welche Variante günstiger ist, rechnen wir im Blueprint aus.",
  },
  {
    question: "Was kostet der Betrieb bei Microsoft?",
    answer:
      "Copilot Studio wird über Copilot-Credits abgerechnet: Packs zu 25.000 Credits für 200 US-Dollar pro Monat oder Pay-as-you-go. Im Blueprint erhalten Sie eine Rechnung pro Vorgang und Monat, bevor Sie sich entscheiden.",
  },
  {
    question: "Was passiert mit unseren Daten?",
    answer:
      "Der Agent läuft in Ihrem Microsoft-365-Tenant und sieht nur Daten, für die der jeweilige Nutzer Leserechte hat. Im Blueprint arbeiten wir mit anonymisierten Beispielfällen; im Sprint greifen wir als Gastnutzer mit dem von Ihrer IT freigegebenen Rechteumfang zu.",
  },
  {
    question: "Was darf der Agent ohne Freigabe tun?",
    answer:
      "Nur, was im Rechte- und Datenkonzept steht: lesen, zuordnen, Entwürfe erstellen und für Standardfälle definierte Aktionen ausführen. Jeder Schreibvorgang außerhalb dieser Regeln geht als Freigabeanfrage mit Entwurf und Kontext an eine benannte Person in Teams.",
  },
  {
    question: "Unsere IT gibt nicht so schnell Zugänge frei.",
    answer:
      "Deshalb braucht das Blueprint keinen Tenant-Zugriff. Es liefert Ihrer IT ein Rechte- und Datenkonzept und eine Checkliste für Umgebung, Berechtigungen und Credits. Die Sprint-Uhr startet erst, wenn der Zugang steht.",
  },
  {
    question: "Warum nicht selbst mit Agent Builder bauen?",
    answer:
      "Für Richtlinien-Fragen ist Agent Builder der richtige Weg. Sobald der Agent Vorgänge anlegen, Systeme beschreiben, Freigaben einholen und Fehler abfangen soll, wird es Engineering: Agent Flows, Connectoren, Berechtigungen, Testfälle, Betrieb.",
  },
  {
    question: "Sind Sie Microsoft-Partner?",
    answer:
      "Wir sind ein Engineering-Unternehmen, kein Lizenzhändler: keine Partnerdesignation, keine Lizenzvergütung. Sie bekommen eine Empfehlung ohne Lizenzinteresse – einschließlich der Aussage, wenn ein Workflow außerhalb von Copilot Studio besser läuft.",
  },
  {
    question: "Können wir mehrere Workflows auf einmal starten?",
    answer:
      "Nein – absichtlich. Der erste Agent zeigt, wie Rechte, Freigaben und Betrieb in Ihrem Haus funktionieren. Danach ist jeder weitere Workflow ein Sprint zum Festpreis, mit deutlich kürzerem Vorlauf.",
  },
];

export const copilotFinalTitle =
  "In 30 Minuten wissen Sie, ob Ihr Workflow einen Copilot-Agenten trägt.";

export const copilotFinalLead =
  "Wir gehen Eingang, Regeln, Quellen und Schreibvorgänge durch und sagen Ihnen, was das Blueprint für Ihren Fall liefert – oder dass es sich nicht lohnt. Ohne Pitch-Deck.";

export const copilotFinalMeta = [
  "Kostenlos",
  "Blueprint zum Festpreis",
  "Sprint ab Tenant-Zugang",
  "Keine Vertragsbindung",
];
