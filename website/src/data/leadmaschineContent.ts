import type { LeadmaschineRegion } from "../hooks/useLeadmaschineRoute";

export const LEADMASCHINE_CALENDLY =
  "https://calendly.com/supraflow/30min";

export const LIVE_FINANZNOMADE = "https://auslandsvergleich.finanznoma.de";
export const LIVE_LST = "https://krankenkassen-angebote24.ch";
export const CASE_FINANZNOMADE =
  "/case/finanznomade-versicherungsrechner";
export const CASE_LST =
  "/case/lst-finance-versicherungskonfigurator";

export type AnfrageField = {
  label: string;
  value: string;
  status?: "complete" | "open" | "na";
  highlight?: "priority" | "prepare" | "schedule";
};

export type ComparisonCell = "yes" | "no" | "partial" | "na";

type Shared = {
  nav: {
    area: string;
    links: { id: string; label: string }[];
    cta: string;
  };
  hero: {
    eyebrow: string;
    h1: string;
    subline: string;
    points: string[];
    cta: string;
    micro: string;
    secondary: string;
  };
  proof: {
    label: string;
    logos: { name: string; href: string; src: string; caption: string }[];
    badge: string;
    aside: string;
  };
  problem: {
    eyebrow: string;
    h2: string;
    intro: string;
    cards: { title: string; text: string }[];
    closing: string;
    footnote: string;
  };
  perspective: {
    eyebrow: string;
    h2: string;
    intro: string;
    columns: string[];
    rows: { criterion: string; cells: ComparisonCell[] }[];
    closing: string;
    link: string;
  };
  solution: {
    eyebrow: string;
    h2: string;
    intro: string;
    tiles: { title: string; text: string }[];
    result: string;
    traffic: string;
    partner: string;
    cta: string;
    link: string;
  };
  process: {
    eyebrow: string;
    h2: string;
    steps: { title: string; text: string }[];
    role: string;
  };
  forWhom: {
    eyebrow: string;
    h2: string;
    intro: string;
    cards: {
      id: "a" | "b" | "b2";
      title: string;
      text: string;
      cta: string;
    }[];
    notFor: string;
  };
  handoff: {
    eyebrow: string;
    h2: string;
    intro: string;
    explains: { id: "priority" | "prepare" | "schedule"; title: string; text: string }[];
    targets: string[];
    ownership: string;
  };
  legal: {
    eyebrow: string;
    h2: string;
    intro: string;
    tiles: { title: string; text: string }[];
    disclaimer: string;
  };
  offer: {
    eyebrow: string;
    h2: string;
    intro: string;
    components: { title: string; text: string; optional?: boolean }[];
    rules: string[];
    cta: string;
    micro: string;
  };
  about: {
    eyebrow: string;
    h2: string;
    text: string;
    person: string;
    facts: string[];
    link: string;
  };
  faq: { q: string; a: string }[];
  final: {
    h2: string;
    text: string;
    checks: string[];
    cta: string;
    secondary: string;
  };
  form: {
    micro: string;
    next: string;
    fields: {
      name: string;
      company: string;
      email: string;
      country: string;
      segment: string;
      sources: string;
      budget: string;
      phone: string;
      website: string;
      social: string;
      notes: string;
      privacy: string;
      newsletter: string;
    };
    countries: string[];
    segments: string[];
    sourceOptions: string[];
    budgetOptions: string[];
  };
  sticky: { cta: string; examples: string };
  footer: {
    note: string;
    sources: string;
  };
};

type RegionBits = {
  heroCard: AnfrageField[];
  handoffCard: AnfrageField[];
  problemNote?: string;
  processSeason?: string;
  caseOrder: ("finanznomade" | "lst")[];
  highlightSegment: "a" | "b" | "b2";
  leadPriceRange: string;
};

const sharedBase = {
  nav: {
    area: "Leadmaschine",
    links: [
      { id: "loesung", label: "So funktioniert’s" },
      { id: "referenzen", label: "Referenzen" },
      { id: "angebot", label: "Angebot" },
      { id: "faq", label: "FAQ" },
    ],
    cta: "Funnel-Check buchen",
  },
  hero: {
    eyebrow: "Beratungsreife Anfragen.",
    h1: "Eine Leadmaschine, die wirklich konvertiert.",
    subline:
      "Konfigurator mit Ihrer Tariflogik, Traffic und Übergabe an die Beratung. Jede Anfrage kommt mit Kontext, exklusiv für Sie.",
    points: [
      "Vergleich mit echter Tariflogik, nicht der Standardrechner vom Pool",
      "Übergabe mit Wohnort, Familie, Budget und Bedarf, nicht nur Name und E-Mail",
      "Instagram, Google und SEO als Teil des Systems, nicht als Projekt daneben",
    ],
    cta: "Funnel-Check buchen",
    micro: "30 Minuten, kostenlos, auch wenn die Antwort „noch nicht“ lautet.",
    secondary: "Live-Beispiele ansehen",
  },
  proof: {
    label: "Makler, die uns vertrauen",
    logos: [
      {
        name: "Finanznomade",
        href: LIVE_FINANZNOMADE,
        src: "/cases/finanznomade/logo.png",
        caption: "Internationale Krankenversicherungsvergleich",
      },
      {
        name: "Schweizer Krankenkassenrechner",
        href: LIVE_LST,
        src: "/cases/lst-finance/krankenkassen-angebote24.png",
        caption: "Schweizer Krankenversicherungsvergleich",
      },
    ],
    badge: "Bewertet auf ProvenExpert, 5 von 5 Sternen",
    aside: "",
  },
  perspective: {
    eyebrow: "Der Unterschied",
    h2: "Warum der Standardrechner nicht reicht und Lead-Kauf keine Strategie ist.",
    intro:
      "Ein Vergleichsrechner vom Pool kennt Standardsparten. Eine Lead-Börse kennt Kontakte. Eine Agentur kennt Design. Keiner kennt Ihre Zielgruppe.",
    columns: [
      "Standardrechner vom Pool",
      "Gekaufte Leads",
      "Agentur-Website",
      "Leadmaschine",
    ],
    rows: [
      {
        criterion: "Tariflogik Ihrer Nische",
        cells: ["no", "no", "no", "yes"] as ComparisonCell[],
      },
      {
        criterion: "Anfrage mit Kontext",
        cells: ["no", "partial", "no", "yes"] as ComparisonCell[],
      },
      {
        criterion: "Exklusiv für Sie",
        cells: ["yes", "no", "yes", "yes"] as ComparisonCell[],
      },
      {
        criterion: "Traffic inklusive",
        cells: ["no", "yes", "no", "yes"] as ComparisonCell[],
      },
      {
        criterion: "Datenpflege inklusive",
        cells: ["yes", "na", "no", "yes"] as ComparisonCell[],
      },
      {
        criterion: "Ihre Marke wächst",
        cells: ["no", "no", "yes", "yes"] as ComparisonCell[],
      },
      {
        criterion: "In Ihrem Design",
        cells: ["no", "na", "yes", "yes"] as ComparisonCell[],
      },
    ],
    closing:
      "Die Leadmaschine ersetzt nicht Ihre Beratung. Sie sorgt dafür, dass das erste Gespräch mit Substanz beginnt.",
    link: "So funktioniert das System",
  },
  solution: {
    eyebrow: "Die Lösung",
    h2: "Die Leadmaschine: drei Bausteine, ein System.",
    intro:
      "Wir bauen keinen Rechner und keine Website. Wir bauen die Strecke von der ersten Frage Ihrer Zielgruppe bis zur Anfrage auf dem Tisch Ihrer Beratung, und betreiben sie.",
    tiles: [
      {
        title: "Datenprodukt",
        text: "Alle relevanten Tarife Ihrer Sparte einheitlich strukturiert, quellenbelegt und vergleichbar. Aus PDF-Chaos wird ein Datenmodell, das Vergleich und Beratung trägt.",
      },
      {
        title: "Konfigurator",
        text: "Eine geführte Strecke für Ihre Zielgruppe: in wenigen Schritten vom Bedarf zum passenden Schutz. Verständlich, mobil, in Ihrem Design, mit Ihrer Erstinformation.",
      },
      {
        title: "Lead-Übergabe",
        text: "Jede Anfrage kommt als strukturierter Datensatz in Ihr CRM, Ihre Inbox oder Ihr Tool: Lebenssituation, Bedarf, Budget, Wunschtermin. Ihre Beratung startet mit Substanz.",
      },
    ],
    result: "Beratungsreife Anfragen, exklusiv für Sie.",
    traffic:
      "Dazu gehört: Traffic als Teil des Systems. Instagram- und Google-Kampagnen, SEO und GEO werden für die Strecke aufgesetzt und laufend optimiert.",
    partner:
      "Optional: ein Affiliate-Netzwerk, in dem Partner Anfragen bringen und vom Click bis zur Provision messbar beteiligt werden.",
    cta: "Funnel-Check buchen",
    link: "Ablauf ansehen",
  },
  process: {
    eyebrow: "Der Ablauf",
    h2: "Von der ersten Einschätzung zur ersten Anfrage.",
    steps: [
      {
        title: "Funnel-Check (30 Minuten)",
        text: "Wir prüfen Zielgruppe, Sparte, Datenlage und Traffic. Sie bekommen eine ehrliche Einschätzung und einen Vorschlag, oder eine Absage mit Begründung.",
      },
      {
        title: "Datenmodell und Logik",
        text: "Wir arbeiten uns in Ihre Tarife, Regeln und die Fragen Ihrer Kunden ein und bauen daraus das Datenprodukt und die Fragenstrecke. Sie prüfen die Logik, bevor eine Zeile Code entsteht.",
      },
      {
        title: "Konfigurator und Übergabe",
        text: "Design in Ihrem CI, Anbindung an Ihr CRM oder Ihre Inbox, Tracking, Erstinformation und Datenschutz-Bausteine.",
      },
      {
        title: "Go-Live und Traffic",
        text: "Prototyp in wenigen Wochen. Kampagnen und SEO werden für die Strecke aufgesetzt, Ihr Werbekonto bleibt Ihres.",
      },
      {
        title: "Betrieb",
        text: "Datenpflege, Conversion-Optimierung, Nachfassen bei Abbrechern, Reporting je Kanal. Die Leadmaschine wird mit jeder Saison besser.",
      },
    ],
    role: "Ihre Rolle: zwei Abstimmungen, ein Freigabetermin, danach Beratung.",
  },
  offer: {
    eyebrow: "Das Angebot",
    h2: "Ein Preis, der sich an Anfragen orientiert, nicht an Stunden.",
    intro: "",
    components: [
      {
        title: "Setup, einmalig",
        text: "Datenprodukt für Ihre Sparte, Konfigurator in Ihrem Design, Übergabe in Ihr CRM, Compliance-Bausteine, Tracking, Go-Live.",
      },
      {
        title: "Betrieb, monatlich",
        text: "Hosting, Datenpflege, Optimierung der Strecke, Nachfassen bei Abbrechern, Reporting je Kanal.",
      },
      {
        title: "Reichweite-Paket",
        text: "SEO, GEO und Meta Ads, die auf Ihren Konfigurator einzahlen. Wir setzen Kampagnen auf und optimieren laufend. Ihr Werbekonto bleibt Ihres.",
        optional: true,
      },
    ],
    rules: [
      "Daten, Konfigurator und Anfragen gehören Ihnen.",
      "Keine Vergütung je Abschluss, wir vermitteln nicht.",
      "Betrieb mit Mindestlaufzeit bis nach Ihrer ersten Saison, danach monatlich kündbar.",
    ],
    cta: "Funnel-Check buchen",
    micro:
      "Sie bekommen nach dem Gespräch ein Angebot mit festen Beträgen, oder eine ehrliche Absage.",
  },
  about: {
    eyebrow: "Wer das baut",
    h2: "Erst in die Sparte einarbeiten, dann bauen.",
    text: "supragent baut Systeme, die im Alltag laufen: Datenmodelle, Konfiguratoren, Automationen und die Kampagnen dazu. Für jede Leadmaschine arbeiten wir uns in die Tarife, Regeln und die Sprache Ihrer Kunden ein, bevor die erste Zeile Code entsteht. Das ist langsamer als eine Vorlage und der Grund, warum die Anfragen am Ende Kontext haben.",
    person: "Laurens Lang, M.Sc. MBA, Gründer supragent · Zürich",
    facts: [
      "Zwei Live-Systeme für Versicherungsvertrieb",
      "Bewertet auf ProvenExpert, 5 von 5",
      "Stack: React, TypeScript, Cloudflare",
    ],
    link: "Mehr über supragent",
  },
  final: {
    h2: "Prüfen wir in 30 Minuten, ob sich eine Leadmaschine für Ihre Zielgruppe lohnt.",
    text: "Im Funnel-Check schauen wir auf drei Dinge: Ihre Zielgruppe und Sparte, Ihre Datenlage und Tariflogik, Ihren Traffic und das Ziel an Anfragen. Sie bekommen eine ehrliche Einschätzung, auch wenn die Antwort „noch nicht“ lautet.",
    checks: [
      "Kostenlos und unverbindlich",
      "Mit Laurens Lang persönlich",
      "Ergebnis: Vorschlag mit festen Beträgen oder Absage mit Begründung",
    ],
    cta: "Funnel-Check buchen",
    secondary: "Lieber erst Beispiele ansehen?",
  },
  sticky: { cta: "Funnel-Check buchen", examples: "Beispiele" },
  footer: {
    note: "supragent baut Technik und Abläufe und leistet keine Rechtsberatung.",
    sources:
      "Quellen Lead-Preise: cash-online / finanzen.de, ImmoScout24; CH: HelloSafe. Kaltakquise-Verbot: Branchenvereinbarung Vermittler.",
  },
};

const de = {
  ...sharedBase,
  leadPriceRange: "50 bis 300 Euro",
  highlightSegment: "b",
  caseOrder: ["finanznomade", "lst"],
  heroCard: [
    { label: "Zielland", value: "Portugal", status: "complete" },
    { label: "Status", value: "selbstständig", status: "complete" },
    { label: "Alter", value: "38", status: "complete" },
    { label: "Familie", value: "Partnerin und 1 Kind", status: "complete" },
    { label: "Budget", value: "bis 400 €/Monat", status: "complete", highlight: "prepare" },
    { label: "Vorerkrankungen", value: "keine Angabe", status: "open" },
    { label: "Wunschtermin", value: "Dienstag 10:00", status: "complete", highlight: "schedule" },
  ],
  handoffCard: [
    { label: "Situation", value: "Auswanderung nach Portugal, geplant März", status: "complete", highlight: "priority" },
    { label: "Status", value: "selbstständig", status: "complete" },
    { label: "Alter", value: "38", status: "complete" },
    { label: "Familie", value: "Partnerin (36), Kind (6)", status: "complete" },
    { label: "Bisherige Versicherung", value: "GKV", status: "complete", highlight: "prepare" },
    { label: "Budget", value: "bis 400 €/Monat", status: "complete", highlight: "prepare" },
    { label: "Wunsch", value: "weltweiter Schutz inkl. Deutschland-Aufenthalte", status: "complete", highlight: "prepare" },
    { label: "Wunschtermin", value: "Dienstag 10:00", status: "complete", highlight: "schedule" },
    { label: "Quelle", value: "Instagram, Partner-Link", status: "complete" },
    { label: "Erstinformation", value: "angezeigt und bestätigt", status: "complete" },
    { label: "Einwilligung", value: "ja", status: "complete" },
  ],
  problem: {
    eyebrow: "Das Problem",
    h2: "Reichweite bringt Interesse. Interesse ist noch keine Anfrage.",
    intro:
      "Ihre Zielgruppe findet Sie: über Instagram, Google, Empfehlungen, Ihre Website. Dann passiert eines von drei Dingen.",
    cards: [
      {
        title: "Das Leerformular.",
        text: "Name, E-Mail, Nachricht. Ihre Beratung ruft zurück, stellt zwanzig Fragen und erfährt im dritten Satz, dass es nicht passt. Die Vorqualifizierung findet im teuersten Moment statt: im Gespräch.",
      },
      {
        title: "Der gekaufte Lead.",
        text: "Für 50 bis 300 Euro bekommen Sie einen Kontakt. Denselben Kontakt bekommen oft noch andere Vermittler. Die Marke, die wächst, ist die der Lead-Börse.",
      },
      {
        title: "Die Agentur-Website.",
        text: "Schön gebaut, gut geschrieben, aber ohne Weg vom Vergleich zum Angebot. Der Funnel bleibt Stückwerk: Rechner hier, Formular dort, Werbung woanders.",
      },
    ],
    closing:
      "Das Ergebnis ist in allen drei Fällen gleich: Anfragen sind nicht planbar, die Beratung arbeitet als Vorqualifizierer, und die Spezialisierung, die Sie stark macht, ist online unsichtbar.",
    footnote:
      "Lead-Preise DE: cash-online 2020 (finanzen.de), ImmoScout24 2026.",
  },
  forWhom: {
    eyebrow: "Für wen",
    h2: "Gebaut für Beratung mit eigener Zielgruppe.",
    intro:
      "Die Leadmaschine lohnt sich, wenn Ihre Kunden eine erkennbare Situation teilen und ein Standardrechner diese Situation nicht abbildet.",
    cards: [
      {
        id: "b",
        title: "Spezialmakler DE/AT: Expats, Auswanderer, Selbstständige, Berufsgruppen",
        text: "Ihre Nische hat eigene Tarife, eigene Fragen, eigene Sprache. Der Standardrechner vom Pool kennt sie nicht; Ihre Leadmaschine schon. Jede Anfrage kommt mit Zielland, Status, Familie und Budget.",
        cta: "Funnel-Check für Spezialmakler",
      },
      {
        id: "a",
        title: "Schweizer Broker: Krankenkasse und Zusatzversicherung",
        text: "Kanton, Franchise, Modell, Unfall: Der Konfigurator kennt die Schweizer Prämienlogik und übergibt Offertanfragen mit Kontext. Für Zuwanderer, Wechsler und Familien, vor und in der Wechselsaison.",
        cta: "Funnel-Check für Schweizer Broker",
      },
      {
        id: "b2",
        title: "Marken und Communities mit Partner-Makler",
        text: "Ihr Publikum fragt nach Versicherung. Ein Konfigurator in Ihrem Auftritt plus ein lizenzierter Partner macht daraus messbare Anfragen, vom Click bis zur Provision. Sie bleiben Tippgeber, die Beratung macht der Partner.",
        cta: "Funnel-Check für Marken",
      },
    ],
    notFor:
      "Nicht geeignet für: Allrounder ohne Zielgruppe, reine Bestandsverwaltung, Vertrieb ohne Budget für Traffic. Das sagen wir Ihnen im Funnel-Check offen.",
  },
  handoff: {
    eyebrow: "Die Übergabe",
    h2: "So kommt eine Anfrage bei Ihnen an.",
    intro:
      "Kein Leerformular, sondern ein Datensatz, mit dem Ihre Beratung sofort arbeiten kann. Beispiel (Beispieldaten):",
    explains: [
      {
        id: "priority",
        title: "Priorisieren",
        text: "Fristen und Zusatzbedarf stehen oben, Ihre Beratung sieht sofort, wer zuerst dran ist.",
      },
      {
        id: "prepare",
        title: "Vorbereiten",
        text: "Der Tarifvorschlag ist vor dem Gespräch fertig.",
      },
      {
        id: "schedule",
        title: "Terminieren",
        text: "Der Wunschtermin landet im Kalender, Erinnerungen laufen automatisch.",
      },
    ],
    targets: ["CRM", "E-Mail", "Notion", "Google Sheets", "Webhook/API"],
    ownership:
      "Daten, Konfigurator und Anfragen gehören Ihnen. Hosting und Datenschutz werden für Ihren Markt eingerichtet.",
  },
  legal: {
    eyebrow: "Vertrauen",
    h2: "Vergleichen und beraten, ohne sich angreifbar zu machen.",
    intro:
      "Sie bleiben der Vermittler. Wir bauen die Strecke so, dass sie zu Ihren Pflichten passt, und stimmen die Bausteine mit Ihrem Compliance-Verantwortlichen ab.",
    tiles: [
      {
        title: "Erstinformation im Ablauf",
        text: "Ihre Erstinformation nach §15 VersVermV wird beim ersten Kontakt angezeigt und die Anzeige protokolliert.",
      },
      {
        title: "Transparente Auswahlbasis",
        text: "Welche Anbieter und Tarife der Vergleich umfasst, steht sichtbar im Konfigurator (§60 VVG).",
      },
      {
        title: "Keine unzulässigen Anreize",
        text: "Keine Rabatte oder Cashbacks als Köder (§48b VAG); der Anreiz ist der Vergleich selbst.",
      },
      {
        title: "Datenschutz",
        text: "Einwilligung mit Zeitstempel, Auftragsverarbeitung, Hosting für Ihren Markt, Löschkonzept.",
      },
    ],
    disclaimer:
      "Wir bauen Technik und Abläufe. Rechtsberatung leisten wir nicht; die Freigabe der Texte liegt bei Ihnen oder Ihrer Rechtsberatung.",
  },
  faq: [
    {
      q: "Wir haben schon einen Vergleichsrechner vom Pool. Warum noch einen?",
      a: "Der Pool-Rechner deckt Standardsparten ab und übergibt eine Anfrage ohne Kontext. Die Leadmaschine bildet die Logik Ihrer Zielgruppe ab, übergibt Lebenssituation, Bedarf und Budget und bringt den Traffic dazu. Beides kann nebeneinander laufen.",
    },
    {
      q: "Nimmt der Konfigurator uns die Beratung weg?",
      a: "Nein. Er ersetzt das Leerformular, nicht das Gespräch. Jede Strecke endet bei Ihrer Beratung, mit einem vorbereiteten Termin statt einem Kaltanruf.",
    },
    {
      q: "Was unterscheidet das von gekauften Leads?",
      a: "Gekaufte Leads sind Kontakte, die oft mehrere Vermittler bekommen. Anfragen aus Ihrer Leadmaschine gehören nur Ihnen, kommen mit Kontext und bauen Ihre Marke statt die der Lead-Börse.",
    },
    {
      q: "Wer pflegt die Tarifdaten?",
      a: "Wir, als Teil des Betriebs. Tarife ändern sich jährlich; das Datenprodukt wird gepflegt, bevor die Saison beginnt. Die Daten gehören Ihnen.",
    },
    {
      q: "Wie lange dauert es bis zum Start?",
      a: "Der Prototyp steht in wenigen Wochen; den genauen Plan bekommen Sie im Funnel-Check.",
    },
    {
      q: "Was kostet das?",
      a: "Setup einmalig, Betrieb monatlich, optional eine Erfolgskomponente je beratungsreifer Anfrage. Die Beträge hängen von Sparte, Datenlage und Traffic-Ziel ab und stehen nach dem Funnel-Check fest.",
    },
    {
      q: "Funktioniert das ohne eigene Reichweite?",
      a: "Nur mit Media-Budget. Traffic-Aufbau ist Teil des Systems, aber ohne Budget für Kampagnen entsteht keine Anfrage. Das prüfen wir im Funnel-Check ehrlich.",
    },
    {
      q: "Was ist mit Datenschutz und Hosting?",
      a: "Einwilligung mit Zeitstempel, Auftragsverarbeitung, Hosting für Ihren Markt (Schweiz oder EU), Löschkonzept. Die Freigabe der Texte liegt bei Ihnen oder Ihrer Rechtsberatung.",
    },
    {
      q: "Was passiert, wenn wir kündigen?",
      a: "Konfigurator, Daten und Anfragen bleiben bei Ihnen; die Übergabe des Hostings ist geregelt.",
    },
    {
      q: "Für welche Sparten gibt es das?",
      a: "Laufend für Schweizer Krankenkasse (Grund- und Zusatzversicherung) und internationale Krankenversicherung. Andere Sparten mit eigener Zielgruppe prüfen wir im Funnel-Check.",
    },
  ],
  form: {
    micro: "Drei Minuten, dann wählen Sie den Termin.",
    next: "Weiter zur Terminwahl",
    fields: {
      name: "Name",
      company: "Firma",
      email: "E-Mail (geschäftlich)",
      country: "Land",
      segment: "Zielgruppe oder Sparte",
      sources: "Woher kommen Ihre Anfragen heute?",
      budget: "Eigene Reichweite oder Media-Budget vorhanden?",
      phone: "Telefon",
      website: "Website-URL",
      social: "Social-Media-Profil / Link",
      notes: "Was sollen wir vorab wissen?",
      privacy: "Ich willige in die Verarbeitung meiner Daten gemäß Datenschutzerklärung ein.",
      newsletter: "Ich möchte gelegentlich Updates zu Leadmaschinen erhalten (optional).",
    },
    countries: ["Deutschland", "Österreich", "Schweiz"],
    segments: [
      "Internationale Krankenversicherung / Expats",
      "PKV und Selbstständige",
      "Berufsgruppe",
      "Marke oder Community mit Partner-Makler",
      "Krankenkasse Schweiz (Grund/Zusatz)",
      "andere",
    ],
    sourceOptions: [
      "Empfehlung",
      "Website-Formular",
      "Social Media",
      "Google/Meta Ads",
      "gekaufte Leads",
      "Partner/Tippgeber",
      "Kaltakquise",
    ],
    budgetOptions: ["ja", "teilweise", "nein", "weiß nicht"],
  },
  problemNote:
    "Seit September 2024 ist telefonische Kaltakquise in der Krankenversicherung verboten, gekaufte Leads aus Kaltakquise ebenso. Wer bisher mit Listen gearbeitet hat, braucht jetzt Anfragen, die von selbst kommen.",
} as Shared & RegionBits;

const ch = {
  ...de,
  leadPriceRange: "50 bis 180 Franken",
  highlightSegment: "a",
  caseOrder: ["lst", "finanznomade"],
  processSeason: "Vor der Wechselsaison live: Start bis spätestens August.",
  heroCard: [
    { label: "Wohnort", value: "Zürich (ZH)", status: "complete" },
    { label: "Franchise", value: "2’500 CHF", status: "complete", highlight: "prepare" },
    { label: "Modell", value: "Hausarzt", status: "complete", highlight: "prepare" },
    { label: "Unfalldeckung", value: "über Arbeitgeber", status: "complete" },
    { label: "Personen", value: "2 Erwachsene, 1 Kind", status: "complete" },
    {
      label: "Zusatzversicherung",
      value: "Interesse an Halbprivat",
      status: "complete",
      highlight: "priority",
    },
    {
      label: "Wunschtermin",
      value: "Donnerstag 16:00",
      status: "complete",
      highlight: "schedule",
    },
  ],
  handoffCard: [
    {
      label: "Situation",
      value: "Zuwanderung aus Deutschland, Ankunft 1. Dezember",
      status: "complete",
      highlight: "priority",
    },
    { label: "Wohnort", value: "Zürich (ZH)", status: "complete" },
    { label: "Personen", value: "2 Erwachsene, 1 Kind (4)", status: "complete" },
    {
      label: "Franchise",
      value: "2’500 CHF (Erwachsene), 0 CHF (Kind)",
      status: "complete",
      highlight: "prepare",
    },
    { label: "Modell", value: "Hausarzt", status: "complete", highlight: "prepare" },
    { label: "Unfalldeckung", value: "über Arbeitgeber", status: "complete" },
    {
      label: "Zusatzversicherung",
      value: "Interesse an Halbprivat und Zahn",
      status: "complete",
      highlight: "priority",
    },
    {
      label: "Priorität",
      value: "Pflichtanmeldung binnen 3 Monaten",
      status: "complete",
      highlight: "priority",
    },
    {
      label: "Wunschtermin",
      value: "Donnerstag 16:00, Video",
      status: "complete",
      highlight: "schedule",
    },
    { label: "Quelle", value: "Google Ads, Kampagne Zuwanderer", status: "complete" },
    { label: "Erstinformation", value: "angezeigt und bestätigt", status: "complete" },
    { label: "Einwilligung Datenschutz", value: "ja, 28.10.2026 14:32", status: "complete" },
  ],
  problem: {
    ...de.problem,
    cards: [
      de.problem.cards[0],
      {
        title: "Der gekaufte Lead.",
        text: "Für 50 bis 180 Franken bekommen Sie einen Kontakt. Denselben Kontakt bekommen oft noch andere Vermittler. Die Marke, die wächst, ist die der Lead-Börse.",
      },
      {
        title: "Die Agentur-Website.",
        text: "Schön gebaut, gut geschrieben, aber ohne Weg vom Vergleich zur Offerte. Der Funnel bleibt Stückwerk: Rechner hier, Formular dort, Werbung woanders.",
      },
    ],
    footnote:
      "Lead-Preise CH: HelloSafe. Kaltakquise-Verbot: Branchenvereinbarung Vermittler.",
  },
  forWhom: {
    ...de.forWhom,
    cards: [
      {
        id: "a",
        title: "Schweizer Broker: Krankenkasse und Zusatzversicherung",
        text: "Kanton, Franchise, Modell, Unfall: Der Konfigurator kennt die Schweizer Prämienlogik und übergibt Offertanfragen mit Kontext. Für Zuwanderer, Wechsler und Familien, vor und in der Wechselsaison. Kaltakquise ist verboten; die Leadmaschine ist Inbound.",
        cta: "Funnel-Check für Schweizer Broker",
      },
      {
        id: "b",
        title: "Spezialmakler DE/AT: Expats, Auswanderer, Selbstständige, Berufsgruppen",
        text: "Ihre Nische hat eigene Tarife, eigene Fragen, eigene Sprache. Der Standardrechner vom Pool kennt sie nicht; Ihre Leadmaschine schon. Jede Anfrage kommt mit Zielland, Status, Familie und Budget.",
        cta: "Funnel-Check für Spezialmakler",
      },
      {
        id: "b2",
        title: "Marken und Communities mit Partner-Makler",
        text: "Ihr Publikum fragt nach Versicherung. Ein Konfigurator in Ihrem Auftritt plus ein lizenzierter Partner macht daraus messbare Anfragen, vom Click bis zur Provision. Sie bleiben Tippgeber, die Beratung macht der Partner.",
        cta: "Funnel-Check für Marken",
      },
    ],
  },
  handoff: {
    ...de.handoff,
    intro:
      "Kein Leerformular, sondern ein Datensatz, mit dem Ihre Beratung sofort arbeiten kann. Beispiel einer Offertanfrage (Beispieldaten):",
    explains: [
      {
        id: "priority",
        title: "Priorisieren",
        text: "Fristen und Zusatzbedarf stehen oben, Ihre Beratung sieht sofort, wer zuerst dran ist.",
      },
      {
        id: "prepare",
        title: "Vorbereiten",
        text: "Die Offerte ist vor dem Gespräch fertig.",
      },
      {
        id: "schedule",
        title: "Terminieren",
        text: "Der Wunschtermin landet im Kalender, Erinnerungen laufen automatisch.",
      },
    ],
  },
  legal: {
    ...de.legal,
    tiles: [
      {
        title: "Offenlegung der Entschädigung",
        text: "Die Hinweise zur Entschädigung und zum Registereintrag sind Teil der Strecke.",
      },
      {
        title: "Beratungsprotokoll vorbereitet",
        text: "Die Angaben aus dem Konfigurator füllen das Protokoll vor; die Unterschrift bleibt im Gespräch.",
      },
      {
        title: "Inbound statt Kaltakquise",
        text: "Jede Anfrage trägt einen Opt-in-Nachweis mit Zeitstempel.",
      },
      {
        title: "Datenschutz",
        text: "Einwilligung, Hosting in der Schweiz oder EU nach Wahl, Auftragsverarbeitung.",
      },
    ],
  },
  faq: de.faq.map((item, i) =>
    i === 2
      ? {
          ...item,
          a: `${item.a} In der Schweiz sind Leads aus Kaltakquise seit 2024 ohnehin nicht mehr zulässig.`,
        }
      : item,
  ),
  form: {
    ...de.form,
    countries: ["Schweiz", "Deutschland", "Österreich"],
    segments: [
      "Krankenkasse Schweiz (Grund/Zusatz)",
      "Internationale Krankenversicherung / Expats",
      "PKV und Selbstständige",
      "Berufsgruppe",
      "Marke oder Community mit Partner-Makler",
      "andere",
    ],
    sourceOptions: [
      "Empfehlung",
      "Website-Formular",
      "Social Media",
      "Google/Meta Ads",
      "gekaufte Leads",
      "Partner/Tippgeber",
    ],
  },
} as Shared & RegionBits;

export function getLeadmaschineCopy(region: LeadmaschineRegion): Shared & RegionBits {
  return region === "ch" ? ch : de;
}

export const FINANZNOMADE_QUOTE =
  "Besonders stark fand ich, dass er nicht einfach nur Anforderungen umgesetzt hat, sondern sich intensiv in das Thema eingearbeitet […] Die Zusammenarbeit war unkompliziert, schnell und sehr lösungsorientiert.";

export const FINANZNOMADE_QUOTE_ATTR = "Kim Elsholz, CEO finanznoma.de";
