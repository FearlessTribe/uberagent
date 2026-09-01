/** Eine harte Zahl im Problem-Beat – nicht dreifach wiederholen. */
export const maximTimeProof = {
  emphasis: "Tausende",
  text: "Stunden im Jahr summieren sich auf.",
} as const;

/** Drei Kernfolgen – Probleme einmal klar benennen. */
export const maximProblemCosts = [
  {
    title: "Aufträge",
    text: "Wer zuerst einen Preis nennt, bekommt den Job. Ihr Angebot vom Abend liest oft keiner mehr.",
  },
  {
    title: "Freiheit",
    text: "Krank, Urlaub, Baustelle: keine Angebote. Mitarbeiter trauen sich die Kalkulation nicht zu.",
  },
  {
    title: "Überblick",
    text: "Angebote in E-Mails, WhatsApp und Excel. Was Sie wem zu welcher Marge angeboten haben, weiß hinterher keiner.",
  },
] as const;

/** Mini-Demo: Anliegen → Kalkulation, branchenübergreifend. */
export const maximDemoIntro = {
  eyebrow: "So sieht es aus",
  title: "Anliegen tippen. In etwa 20 Sekunden steht die Kalkulation.",
  lead: "Maxim rechnet mit Ihren Stundensätzen, Aufschlägen und den Tagespreisen Ihres Lieferanten. Fehlt etwas, fragt er nach oder markiert die Position als „zu prüfen“.",
  inputLabel: "Anliegen",
  outputLabel: "Kalkulation · ~20 Sek.",
  totalLabel: "Angebotspreis brutto",
  note: "Beispielrechnung. Ihre echten Sätze und Lieferantenpreise nach der Kalibrierung.",
} as const;

export const maximDemoExamples = [
  {
    id: "kfz",
    industry: "KFZ-Werkstatt",
    input:
      "Golf VII, 2016 · Bremsen vorne quietschen, Scheiben prüfen, ggf. Beläge + Scheiben",
    lines: [
      { label: "Bremsbeläge VA (OE-Qualität)", value: "86,40 €" },
      { label: "Bremsscheiben VA", value: "142,00 €" },
      { label: "Arbeitszeit 1,4 h × 118 €", value: "165,20 €" },
      { label: "Aufschlag Teile", value: "34,26 €" },
    ],
    total: "427,86 €",
  },
  {
    id: "elektro",
    industry: "Elektriker",
    input:
      "Wohnung 3 Zimmer · 6 Steckdosen nachrüsten, 2 Deckenauslässe, FI prüfen",
    lines: [
      { label: "Material Steckdosen / Dosen", value: "94,80 €" },
      { label: "Kabel & Kleinteile", value: "48,50 €" },
      { label: "Arbeitszeit 3,5 h × 95 €", value: "332,50 €" },
      { label: "Anfahrt + Aufschlag", value: "67,20 €" },
    ],
    total: "543,00 €",
  },
  {
    id: "sanitaer",
    industry: "Sanitär",
    input:
      "Einfamilienhaus · Mischbatterie Dusche tauschen, Anschlüsse prüfen, Silikon neu",
    lines: [
      { label: "Mischbatterie (Kundenwunsch)", value: "189,00 €" },
      { label: "Dichtungen / Silikon / Fittinge", value: "28,40 €" },
      { label: "Arbeitszeit 1,8 h × 92 €", value: "165,60 €" },
      { label: "Anfahrt + Aufschlag", value: "54,80 €" },
    ],
    total: "437,80 €",
  },
  {
    id: "schreiner",
    industry: "Schreiner",
    input:
      "Einbauschrank Flur · 2,40 m × 0,60 m, 3 Türen, Eiche furniert, inkl. Montage",
    lines: [
      { label: "Platten + Kanten + Beschläge", value: "612,00 €" },
      { label: "Produktion 6,5 h × 78 €", value: "507,00 €" },
      { label: "Montage vor Ort 2,0 h × 78 €", value: "156,00 €" },
      { label: "Aufschlag Material", value: "122,40 €" },
    ],
    total: "1.397,40 €",
  },
  {
    id: "maler",
    industry: "Maler",
    input:
      "Wohnzimmer 28 m² · Wände 2× streichen, Decke 1×, Farbe matte weiß inkl.",
    lines: [
      { label: "Farbe + Spachtel + Abdeckmaterial", value: "86,00 €" },
      { label: "Vorbereitung 1,5 h × 68 €", value: "102,00 €" },
      { label: "Streichen 4,0 h × 68 €", value: "272,00 €" },
      { label: "Aufschlag Material", value: "17,20 €" },
    ],
    total: "477,20 €",
  },
  {
    id: "shk",
    industry: "Heizung / SHK",
    input:
      "EFH · Umwälzpumpe tauschen, Spülen, Entlüften, Funktionsprüfung",
    lines: [
      { label: "Umwälzpumpe (lieferantentagespreis)", value: "248,00 €" },
      { label: "Dichtungen / Kleinteile", value: "22,50 €" },
      { label: "Arbeitszeit 2,2 h × 98 €", value: "215,60 €" },
      { label: "Anfahrt + Aufschlag", value: "72,80 €" },
    ],
    total: "558,90 €",
  },
] as const;

export const maximCapabilitiesSection = {
  eyebrow: "Was Maxim kann",
  title: "Anliegen tippen. In etwa 20 Sekunden steht die Kalkulation.",
  subtitle: "Mehr als schnell rechnen.",
  lead: "Maxim kennt Ihre Preislogik, holt aktuelle Herstellerpreise und bleibt transparent, wenn etwas offen ist.",
} as const;

export const maximAgentPhases = [
  {
    id: "prices",
    label: "Preise",
    kicker: "Tagesaktuelle Herstellerpreise",
    insight: "Lieferantenpreise werden täglich abgeglichen, nicht aus alter Excel.",
    suppliers: ["Bosch", "Valeo", "Febi"],
    priceRows: [
      { part: "Bremsbeläge VA", price: "86,40 €", updated: "heute 06:12" },
      { part: "Bremsscheiben VA", price: "142,00 €", updated: "heute 06:12" },
    ],
  },
  {
    id: "logic",
    label: "Preislogik",
    kicker: "Ihre gesamte Preisstruktur",
    insight: "Stundensätze, Aufschläge und Margen kommen aus Ihrer freigegebenen Logik.",
    rules: ["Stundensatz Werkstatt 118 €", "Aufschlag Teile 18 %", "Marge Mindest 22 %", "Lieferantenrabatt −4 %"],
  },
  {
    id: "clarify",
    label: "Rückfrage",
    kicker: "Bei Unklarheiten fragt Maxim nach",
    insight: "Lieber eine Rückfrage als eine falsche Position in der Kalkulation.",
    messages: [
      { from: "team", text: "Golf VII, Bremsen vorne quietschen, Scheiben prüfen" },
      { from: "maxim", text: "Welche Scheibengröße VA? 288 mm oder 312 mm?" },
    ],
    flagged: "Position „Bremsscheiben VA“ als zu prüfen markiert",
  },
  {
    id: "handoff",
    label: "Einbindung",
    kicker: "Offene Punkte mit Ihnen klären",
    insight: "Maxim zieht Sie oder Ihr Team ein, wenn eine Entscheidung fehlt.",
    openPoint: "Sonderfarbe: Metallic-Lackcode unklar",
    assignee: "M. Keller, Werkstattleitung",
    status: "Freigabe angefragt",
  },
  {
    id: "schedule",
    label: "Termine",
    kicker: "Termine für Sie oder Ihr Team",
    insight: "Kundentermine und interne Slots direkt aus dem laufenden Anliegen.",
    appointments: [
      { who: "Kunde Müller GmbH", slot: "Do 14:30 · Werkstatttermin" },
      { who: "Intern · Team B", slot: "Fr 08:00 · Einbau Fenster" },
    ],
  },
] as const;

/**
 * Drei Cluster statt 8er-Matrix.
 * Einwände (Haftung, Technik, Daten, Samstag) sitzen in der jeweiligen Lösung.
 */
export const maximSolutionClusters = [
  {
    id: "zeit",
    title: "Zeit & Aufträge",
    pain: "Zwei bis drei Stunden täglich für Angebote. Wer zu spät kommt, verliert den Job.",
    solution:
      "Etwa 20 Sekunden pro Kalkulation. Mit Stufe 2 Sofortpreis auf der Website auch um 21 Uhr.",
    proof: "Kalibriert an Ihren echten Angeboten · Sofortpreis rund um die Uhr",
  },
  {
    id: "team",
    title: "Team & Chef-Engpass",
    pain: "Nur Sie trauen sich die Kalkulation zu. Sind Sie weg, gehen keine Angebote raus.",
    solution:
      "Jeder im Team kalkuliert so wie Sie. Fehlt etwas, fragt Maxim nach oder markiert „zu prüfen“.",
    proof: "Stufe 01 fürs Team · FAQ: Rechnet die KI wirklich so wie ich?",
  },
  {
    id: "vertrauen",
    title: "Vertrauen",
    pain: "Angst vor falschen Preisen, Haftung, Technik-Chaos und Daten, die irgendwo landen.",
    solution:
      "30 bis 50 echte Anfragen zur Kalibrierung, eine Woche Parallelbetrieb, EU-Hosting ohne Trainingsnutzung. Keine Schnittstelle nötig. Zwei Stunden Workshop reichen zum Start.",
    proof: "Testbetrieb parallel · AV-Vertrag · interne Zahlen technisch unsichtbar",
  },
] as const;

export const maximStages = [
  {
    stage: "01",
    title: "Kalkulation für Ihr Team",
    lead: "Mitarbeiter gibt Fahrzeug oder Objekt ein und beschreibt das Anliegen in normaler Sprache. Maxim liefert in etwa 20 Sekunden die komplette Kalkulation.",
    result: "Jeder in Ihrem Team kalkuliert so wie Sie. Auch wenn Sie nicht da sind.",
  },
  {
    stage: "02",
    title: "Sofortpreis auf Ihrer Website",
    lead: "Interessenten fragen rund um die Uhr selbst einen Preis an. Sie sehen nur den Endpreis. Jede Anfrage landet als Lead mit kompletter Kalkulation bei Ihnen.",
    result: "Anfragen um 21 Uhr gehen nicht mehr an den Wettbewerb.",
  },
  {
    stage: "03",
    title: "Preisauskunft am Telefon",
    lead: "Ein KI-Telefonassistent an derselben Kalkulation. Nimmt das Anliegen auf, nennt einen Richtpreis, bietet Termin oder Rückruf an, klar als KI gekennzeichnet.",
    result: "Kein Anruf ohne Antwort. Auch samstags.",
  },
] as const;

export const maximTimeline = [
  {
    step: "01",
    title: "Datenaufnahme",
    text: "Zwei Stunden Workshop zu Ihrer Preislogik. Sie bringen Preisliste, Stundensätze und 20 bis 30 echte Angebote mit.",
  },
  {
    step: "02",
    title: "Aufbau",
    text: "Wir richten die Wissensbasis ein und binden Lieferant und CRM an oder arbeiten mit Preisliste und Katalog.",
  },
  {
    step: "03",
    title: "Kalibrierung",
    text: "Maxim rechnet 30 bis 50 Ihrer echten Anfragen nach. Sie vergleichen, wir justieren, bis es stimmt.",
  },
  {
    step: "04",
    title: "Testbetrieb",
    text: "Ihr Team arbeitet eine Woche parallel zum alten Prozess.",
  },
  {
    step: "05",
    title: "Go-live",
    text: "Einweisung, Übergabe, fertig. Danach: monatliche Genauigkeitsprüfung und Support.",
  },
] as const;

export const MAXIM_ROI_DEFAULTS = {
  requestsPerDay: 15,
  minutesPerQuote: 10,
  workDays: 220,
  hourlyRate: 75,
  extraOrdersWeek: 1,
  /** 1 Auftrag/Woche × 52 × ~385 € ≈ 20.000 € Deckungsbeitrag */
  marginPerOrder: 385,
} as const;

export const maximKalkulationscheck = {
  title: "Kostenloser Check: Wieviel sparen Sie damit?",
  lead:
    "Zuerst Anfragen und Zeit pro Angebot, dann Ihre Kontaktdaten. Danach Schritt für Schritt die restlichen Zahlen. Am Ende sehen Sie Ihr Potenzial.",
} as const;

/** Stufe 1: 9.900 € Setup + 12 × 990 € */
export const MAXIM_STAGE1_YEAR1_COST = 9900 + 990 * 12;

export const maximPricing = [
  {
    name: "Stufe 1",
    detail: "Kalkulation für Ihr Team",
    setup: "9.900 €",
    monthly: "990 €",
    featured: true,
  },
  {
    name: "Stufe 1 + 2",
    detail: "plus Website",
    setup: "14.800 €",
    monthly: "1.490 €",
    featured: false,
  },
  {
    name: "Stufe 1 + 2 + 3",
    detail: "plus Telefon",
    setup: "19.900 €",
    monthly: "1.990 €",
    featured: false,
  },
] as const;

export const maximPricingNote =
  "Alle Preise netto. Einrichtung: 50 % bei Auftrag, 50 % bei Go-live. Betrieb: 12 Monate Mindestlaufzeit, danach monatlich kündbar. Enthalten: EU-Hosting, KI-Lizenzkosten, monatliche Genauigkeitsprüfung, Anpassungen Ihrer Preislogik, Support.";

export const maximTrust = [
  {
    title: "EU-Hosting",
    text: "Ihre Daten bleiben in der EU. Auftragsverarbeitungsvertrag nach Art. 28 DSGVO.",
  },
  {
    title: "Keine Trainingsnutzung",
    text: "Ihre Preise und Kalkulationen trainieren keine fremden KI-Modelle.",
  },
  {
    title: "Interne Zahlen unsichtbar",
    text: "Website und Telefon sehen nur, was freigegeben ist. Nie Ihre Margenlogik.",
  },
  {
    title: "Als KI gekennzeichnet",
    text: "Chat und Telefonassistent sind als KI erkennbar (EU-KI-Verordnung).",
  },
] as const;

export const maximFaq = [
  {
    q: "Rechnet die KI wirklich so wie ich?",
    a: "Nach der Kalibrierung ja. Wir lassen Maxim Ihre echten Angebote nachrechnen und justieren, bis die Abweichung im vereinbarten Rahmen liegt. Fehlt etwas, fragt er nach oder markiert die Position als „zu prüfen“. Er schätzt nie ins Blaue.",
  },
  {
    q: "Was, wenn sich meine Preise ändern?",
    a: "Stundensätze, Aufschläge und neue Leistungen passen wir im laufenden Betrieb an. Das ist im Monatspreis enthalten.",
  },
  {
    q: "Mein Lieferant hat keine Schnittstelle.",
    a: "Dann arbeiten wir mit Ihrer Preisliste oder dem Online-Katalog. Eine Schnittstelle ist praktisch, aber keine Voraussetzung.",
  },
  {
    q: "Muss ich technisch etwas können?",
    a: "Nein. Ihr Team tippt das Anliegen ein wie eine Nachricht. Alles andere übernehmen wir.",
  },
  {
    q: "Wer haftet für den Preis im Angebot?",
    a: "Maxim rechnet nach Ihren freigegebenen Regeln. Die Verantwortung für verbindliche Angebote bleibt bei Ihnen. Er nimmt Ihnen die Rechenarbeit ab, nicht die Entscheidung.",
  },
  {
    q: "Was, wenn die Preise nicht stimmen?",
    a: "Maxim rechnet nach Ihren freigegebenen Regeln und genau nach Ihrer Preisstruktur. Er erfindet nichts dazu, sondern übernimmt die Rechenarbeit. Entscheidungen bleiben bei Ihnen. Bei Unklarheiten greifen klare Regeln: Maxim zieht Sie ein, statt zu raten.",
  },
] as const;

export const maximClosingCta = {
  title: "Lohnt es sich für mich?",
  lead: "Machen Sie den Kalkulationscheck und finden Sie heraus, wie viel Geld und Zeit Sie sparen.",
} as const;
