export type MaximIndustryIcon =
  | "moving"
  | "forwarding"
  | "office"
  | "furniture"
  | "workshop";

export type MaximIndustryPage = {
  variant: "agent" | "assistant" | "module";
  slug: string;
  icon: MaximIndustryIcon;
  navTitle: string;
  /** Kurzer Nutzen für die Branchenkacheln. */
  tileLead: string;
  title: string;
  eyebrow: string;
  seoTitle: string;
  seoDescription: string;
  hero: {
    title: string;
    lead: string;
    stats: { value: string; label: string }[];
  };
  scenario: {
    title: string;
    request: string;
    missing: string[];
    conclusion: string;
  };
  pains: { title: string; text: string }[];
  solutionTitle: string;
  solutionLead: string;
  workflow: { title: string; text: string }[];
  checks: { title: string; text: string }[];
  example: {
    request: string;
    sources?: string[];
    open: string[];
    result: string;
    note: string;
    labels: [string, string, string];
    visual: "draft" | "document" | "price";
  };
  integrations: { title: string; text: string }[];
  boundaries: string[];
  stages: { title: string; text: string }[];
  featuredStage?: number;
  timeline?: {
    title: string;
    steps: readonly { title: string; text: string; when?: string }[];
  };
  sectionCopy: {
    problemTitle: string;
    checksTitle: string;
    checksLead?: string;
    exampleTitle: string;
    integrationsTitle: string;
    stagesEyebrow: string;
    stagesTitle: string;
    trustTitle: string;
  };
  finalCta: {
    eyebrow: string;
    title: string;
    text: string;
    button: string;
  };
  trust?: { title: string; text: string }[];
  faq: { q: string; a: string }[];
};

const commonStages = [
  {
    title: "Für Ihr Innenteam",
    text: "Anfrage weiterleiten, Entwurf prüfen, freigeben. Hier startet jeder Betrieb.",
  },
  {
    title: "Auf Ihrer Website",
    text: "Standardfälle erhalten rund um die Uhr einen klar gekennzeichneten Richtpreis. Sie bekommen den Lead samt Vorkalkulation.",
  },
  {
    title: "Am Telefon",
    text: "Ein klar gekennzeichneter KI-Assistent nimmt die Anfrage strukturiert auf und bereitet Ihren Rückruf vor.",
  },
] as const;

const commonFaq = [
  {
    q: "Rechnet der Agent mit unseren Preisen?",
    a: "Ja. Er verwendet Ihre Stundensätze, Zeitansätze, Fahrzeugregeln, Zuschläge und Textbausteine. Fehlt eine Regel, markiert er die Position, statt einen Wert zu erfinden.",
  },
  {
    q: "Muss jedes Angebot kontrolliert werden?",
    a: "Ja. Ein Mensch prüft und gibt den Entwurf frei. Der Agent übernimmt Erfassung und Rechenarbeit, nicht die geschäftliche Entscheidung.",
  },
  {
    q: "Ersetzt der Agent unsere bestehende Software?",
    a: "Nein. Er kann eigenständig starten und Ergebnisse strukturiert übergeben. Eine direkte Anbindung prüfen wir nur, wenn Ihr vorhandenes System eine passende Schnittstelle bietet.",
  },
  {
    q: "Wie beginnt die Einführung?",
    a: "Mit Ihrer Preis- und Leistungsliste, Zeitansätzen, Angebotsvorlage und 20 bis 30 echten Beispielen. Danach wird parallel zu Ihrem heutigen Prozess kalibriert und getestet.",
  },
] as const;

const movingTimeline = {
  title: "In sechs Wochen vom Regelwerk zum kontrollierten Testbetrieb.",
  steps: [
    {
      when: "Woche 1",
      title: "Regeln aufnehmen",
      text: "Workshop zu Preislogik, Zeitansätzen, Vorlagen und Freigabegrenzen.",
    },
    {
      when: "Woche 2",
      title: "Konfigurieren",
      text: "Wir bilden Kalkulationslogik und branchenspezifische Prüfschritte ab.",
    },
    {
      when: "Woche 3–4",
      title: "Kalibrieren",
      text: "30 bis 50 echte Anfragen werden mit Ihren damaligen Angeboten verglichen.",
    },
    {
      when: "Woche 5",
      title: "Parallel testen",
      text: "Eine Woche läuft Maxim kontrolliert neben Ihrem heutigen Prozess.",
    },
    {
      when: "Woche 6",
      title: "Go-live",
      text: "Definierte Fälle gehen live; Genauigkeit und Regeln werden weiter gepflegt.",
    },
  ],
} as const;

export const maximIndustryPages: MaximIndustryPage[] = [
  {
    variant: "agent",
    slug: "kfz",
    icon: "workshop",
    navTitle: "KFZ-Werkstätten",
    tileLead: "Von der Kundenanfrage zum Kalkulationsvorschlag.",
    title: "Kalkulations-Agent für KFZ-Werkstätten",
    eyebrow: "Für KFZ-Werkstätten",
    seoTitle: "Kalkulations-Agent für KFZ-Werkstätten | Maxim | uberagent",
    seoDescription:
      "Maxim nimmt Werkstattanfragen strukturiert auf, bereitet Kalkulationen nach Ihren Regeln vor und liefert prüfbare Angebotsvorschläge für Ihre KFZ-Werkstatt.",
    hero: {
      title: "Werkstattanfragen in Minuten statt zwischen zwei Hebebühnen kalkulieren.",
      lead: "Kunden geben Fahrzeug und gewünschte Arbeiten an. Maxim sammelt die relevanten Informationen, bereitet die Kalkulation vor und erstellt einen Angebotsvorschlag. Ihre Mitarbeiter prüfen und geben frei.",
      stats: [
        { value: "Ihre Regeln", label: "Ihre Preise & Aufschläge" },
        { value: "Mit Prüfung", label: "Freigabe durch die Werkstatt" },
        { value: "Strukturiert", label: "Anfrageaufnahme & Vorbereitung" },
      ],
    },
    scenario: {
      title: "Eine typische Anfrage.",
      request: "„Meine Bremsen vorne müssen gemacht werden. Was kostet das?“",
      missing: [
        "Vollständige Fahrzeugdaten",
        "Teile- und Materialbedarf",
        "Arbeitszeit bzw. hinterlegte AW",
      ],
      conclusion:
        "Maxim fragt fehlende Angaben strukturiert ab und bereitet den Kalkulationsvorschlag für Ihre Freigabe vor.",
    },
    pains: [
      {
        title: "Unvollständige Anfragen",
        text: "Telefon, E-Mail oder Formular liefern oft nicht genug Angaben für eine belastbare Kalkulation.",
      },
      {
        title: "Kalkulation zwischen dem Alltag",
        text: "Angebote entstehen zwischen Telefonaten und laufendem Werkstattbetrieb – statt am ruhigen Schreibtisch.",
      },
      {
        title: "Wiederkehrende Routine",
        text: "Bei einfachen oder wiederkehrenden Leistungen entsteht immer wieder ähnliche Kalkulationsarbeit.",
      },
    ],
    solutionTitle: "Vorbereitung automatisieren. Freigabe behalten.",
    solutionLead:
      "Maxim übernimmt Anfrageaufnahme und Kalkulationsvorbereitung nach Ihren Regeln. Die Werkstatt prüft den Vorschlag und entscheidet.",
    workflow: [
      {
        title: "Anfrage",
        text: "Der Kunde beschreibt Fahrzeug und gewünschte Reparatur bzw. Leistung.",
      },
      {
        title: "Informationen",
        text: "Maxim fragt die für die Kalkulation notwendigen Informationen ab.",
      },
      {
        title: "Kalkulation",
        text: "Maxim verarbeitet die Daten anhand Ihrer Regeln und verfügbaren Daten.",
      },
      {
        title: "Freigabe",
        text: "Die Werkstatt prüft den Vorschlag und sendet das Angebot an den Kunden.",
      },
    ],
    checks: [
      {
        title: "Stundenverrechnungssätze",
        text: "Ihre eigenen Sätze fließen in die Vorbereitung ein.",
      },
      {
        title: "Arbeitswerte",
        text: "Hinterlegte Zeiten bzw. AW können berücksichtigt werden.",
      },
      {
        title: "Teile und Material",
        text: "Vorhandene Preise, Aufschläge und Mindestpreise werden einbezogen.",
      },
      {
        title: "Freigabe durch Menschen",
        text: "Kein Angebot geht ohne Prüfung durch die Werkstatt raus.",
      },
    ],
    example: {
      request: "Bremsen vorne · Kostenanfrage",
      open: [
        "Fahrzeug / Modell",
        "Baujahr oder HSN-TSN",
        "Teile, Arbeitszeit, Aufschläge",
      ],
      result:
        "Strukturierter Kalkulationsvorschlag mit Positionen wie Beläge, Scheiben, Arbeitszeit, Kleinmaterial und MwSt. – zur Prüfung durch die Werkstatt.",
      note: "Illustrative Positionen ohne konkrete Beispielpreise. Welche Systeme angebunden werden, prüfen wir gemeinsam.",
      labels: ["Kundenanfrage", "Maxim verarbeitet", "Angebotsvorschlag"],
      visual: "draft",
    },
    integrations: [
      {
        title: "Ihre Kalkulationsregeln",
        text: "Maxim bildet Ihre bestehende Logik ab – kein Standard-Preisrechner mit festen Preisen.",
      },
      {
        title: "Vorhandene Daten",
        text: "Preislisten, Arbeitszeiten und Aufschläge, soweit sie verfügbar sind.",
      },
      {
        title: "Systeme",
        text: "Welche Datenquellen und Systeme angebunden werden können, wird gemeinsam geprüft.",
      },
    ],
    boundaries: [
      "Die finale Entscheidung und Freigabe bleiben bei der Werkstatt.",
      "Maxim ersetzt weder Serviceberater noch KFZ-Meister.",
      "Keine erfundenen Preise – nur nach Ihren Regeln und verfügbaren Daten.",
    ],
    stages: [...commonStages],
    featuredStage: 0,
    sectionCopy: {
      problemTitle: "Anfragen kommen rein. Die Kalkulation muss dazwischenpassen.",
      checksTitle: "Was Maxim berücksichtigen kann",
      checksLead:
        "Je nach vorhandenen Daten und Systemen. Anbindungen prüfen wir ehrlich.",
      exampleTitle: "Von der Bremsenanfrage zum prüfbaren Vorschlag",
      integrationsTitle: "Passt sich Ihrer Werkstatt an",
      stagesEyebrow: "Ausbaustufen",
      stagesTitle: "Start im Innenteam. Später Website und Telefon.",
      trustTitle: "Ihre Regeln. Ihre Freigabe.",
    },
    finalCta: {
      eyebrow: "Nächster Schritt",
      title: "Kostenlose Anfrage stellen",
      text: "Wir schauen uns gemeinsam an, wie Ihre Werkstatt heute kalkuliert und ob sich der Prozess sinnvoll automatisieren lässt.",
      button: "Kostenlose Anfrage stellen",
    },
    faq: [
      {
        q: "Ersetzt Maxim meinen Serviceberater oder KFZ-Meister?",
        a: "Zunächst nicht. Maxim übernimmt am Anfang die strukturierbare Arbeit rund um Auftragannahme, Kalkulation, Recherche und Rückfragen. Am Anfang übergibt Maxim das an den Berater. Nach einer Testphase werden die meisten Fragen allerdings direkt von Maxim übernommen, aber der Berater wird kontaktiert bei speziellen Fällen.",
      },
      {
        q: "Woher kennt Maxim unsere Preise?",
        a: "Maxim wird anhand der verfügbaren Daten, Preislisten und Kalkulationsregeln der jeweiligen Werkstatt eingerichtet.",
      },
      {
        q: "Kann Maxim mit unserer Werkstattsoftware verbunden werden?",
        a: "Das hängt vom eingesetzten System und den verfügbaren Schnittstellen ab. Das wird vor der Umsetzung geprüft.",
      },
      {
        q: "Müssen wir unsere Kalkulation ändern?",
        a: "Ziel ist möglichst das Gegenteil: Maxim soll die bestehende Kalkulationslogik digital abbilden und vereinfachen.",
      },
      {
        q: "Ist die erste Anfrage kostenlos?",
        a: "Ja. Die Analyse des Anwendungsfalls bzw. das Erstgespräch ist unverbindlich und kostenlos.",
      },
    ],
  },
  {
    variant: "agent",
    slug: "umzugsunternehmen",
    icon: "moving",
    navTitle: "Umzugsunternehmen",
    tileLead: "Prüfbarer Angebotsentwurf in Minuten statt Tagen.",
    title: "Kalkulations-Agent für Umzugsunternehmen",
    eyebrow: "Für Umzugsunternehmen und Umzugsservices",
    seoTitle: "KI-Kalkulationsagent für Umzugsunternehmen | uberagent",
    seoDescription:
      "Aus unvollständigen Umzugsanfragen werden prüfbare Angebotsentwürfe – nach Ihren Zeitansätzen, Zuschlägen und Betriebsregeln.",
    hero: {
      title: "Das Angebot ist fertig, bevor der Wettbewerb zurückruft.",
      lead: "Der Kalkulations-Agent macht aus jeder Umzugsanfrage in Minuten einen prüfbaren Angebotsentwurf – kalkuliert nach Ihren Sätzen, Zeitansätzen und Zuschlägen. Sie prüfen und geben frei.",
      stats: [
        { value: "Minuten", label: "bis zum Entwurf" },
        { value: "2 Adressen", label: "getrennt geprüft" },
        { value: "6 Wochen", label: "bis zum Go-live" },
      ],
    },
    scenario: {
      title: "Sie kennen diese Anfrage.",
      request:
        "„Wir ziehen Ende Oktober von Pankow nach Leipzig, 3 Zimmer, 68 m². Was kostet das?“",
      missing: [
        "Etage und Aufzug an beiden Adressen",
        "Keller, Dachboden und Kartonmenge",
        "Montage, Trageweg und Halteverbotszone",
      ],
      conclusion:
        "Während Sie zurückfragen und übertragen, liegt dieselbe Anfrage oft schon bei mehreren Wettbewerbern.",
    },
    pains: [
      {
        title: "Anfragen altern schnell",
        text: "Telefon, E-Mail, WhatsApp und Portale liefern unvollständige Angaben. Zwei Tage später ist der Auftrag häufig vergeben.",
      },
      {
        title: "Der Chef ist der Kalkulator",
        text: "Zeitansätze und Zuschläge stecken in wenigen Köpfen. Urlaub, Baustelle oder Saisonspitze stauen die Angebote.",
      },
      {
        title: "Vergessenes kostet Marge",
        text: "Zieletage, Nebenflächen oder Halteverbotszone werden erst am Umzugstag sichtbar – als Nachtrag oder Verlust.",
      },
    ],
    solutionTitle: "Vollständigkeit zuerst. Geschwindigkeit als Ergebnis.",
    solutionLead:
      "Maxim strukturiert die Anfrage, prüft Abhol- und Lieferort separat und kalkuliert erst, wenn Ihre Regeln eine belastbare Grundlage ergeben.",
    workflow: [
      {
        title: "Anfrage erfassen",
        text: "E-Mail, Formular oder Portaltext werden zu einem strukturierten Vorgang.",
      },
      {
        title: "Lücken erkennen",
        text: "Etage, Aufzug, Trageweg, Nebenflächen, Kartons und Sondergegenstände werden geprüft.",
      },
      {
        title: "Rückfrage vorbereiten",
        text: "Ihr Team erhält eine fertige, freundliche Rückfrage statt einer losen Checkliste.",
      },
      {
        title: "Nach Ihren Regeln kalkulieren",
        text: "Volumen, Personal, Zeit, Fahrzeug, Kilometer, Zuschläge und Zusatzleistungen.",
      },
      {
        title: "Freigeben und übergeben",
        text: "Angebotsentwurf für Sie, strukturierte Zusammenfassung für die Disposition.",
      },
    ],
    checks: [
      {
        title: "Abhol- und Lieferort",
        text: "Zwei getrennte Checklisten statt einer unvollständigen Gesamtangabe.",
      },
      {
        title: "Volumen und Nutzlast",
        text: "Fahrzeugvorschläge prüfen beide Grenzen – nicht nur Kubikmeter.",
      },
      {
        title: "Festpreis oder Richtpreis",
        text: "Fehlen Daten, bleibt die Unsicherheit sichtbar und der Festpreis gesperrt.",
      },
      {
        title: "Sonderfälle",
        text: "Klavier, Tresor, Ausland oder komplexe Tragewege gehen zur manuellen Prüfung.",
      },
      {
        title: "Termin und Vorlauf",
        text: "Wunschtermin, Flexibilität und Fristen für Halteverbotszonen werden gegengeprüft.",
      },
      {
        title: "Inventar und Nebenflächen",
        text: "Wohnfläche, Gutliste, Kartonmenge, Keller, Dachboden und Garage werden auf Lücken und Widersprüche geprüft.",
      },
      {
        title: "Montage und Zusatzleistungen",
        text: "Demontage, Packservice, Entsorgung, Lagerung und Möbellift werden als eigene Leistungen erfasst.",
      },
      {
        title: "Doppelte Kostenpositionen",
        text: "Anfahrt, Material, Montage oder Halteverbot werden nicht gleichzeitig in Pauschale und Einzelposition berechnet.",
      },
      {
        title: "Ihre eigenen Prüfregeln",
        text: "Zusätzlich bildet Maxim die betriebsspezifischen Prüfpunkte ab, die für Ihre Angebote und Abläufe entscheidend sind.",
      },
    ],
    example: {
      request: "68 m² · Berlin → Leipzig · 3. OG · Ende Oktober",
      open: [
        "Aufzug und Zieletage",
        "Keller und Kartons",
        "Montage und Halteverbot beidseitig",
      ],
      result:
        "Nach der Antwort: Volumen, Team, Fahrzeug, Strecke und Zusatzleistungen als nachvollziehbarer Entwurf – jede Position mit Regel-Herkunft.",
      note: "Solange Angaben fehlen, bleibt der Festpreis gesperrt. Termin und Kolonne bestätigt immer Ihre Disposition.",
      labels: ["Eingang", "Festpreis noch gesperrt", "Nach Klärung"],
      visual: "draft",
    },
    integrations: [
      {
        title: "E-Mail und Website-Formular",
        text: "Start ohne Systemumbau: Anfragen weiterleiten oder strukturiert erfassen.",
      },
      {
        title: "Umzugsgutlisten",
        text: "Vorhandene Listen und Vorlagen werden in Ihren Angebotsprozess übernommen.",
      },
      {
        title: "Angebot und Disposition",
        text: "Entwurf und Übergabe werden strukturiert ausgegeben; direkte Schnittstellen prüfen wir ehrlich.",
      },
    ],
    boundaries: [
      "Kein Angebot verlässt das Haus ohne Ihre Freigabe.",
      "Besichtigung wird bei großen oder unklaren Umzügen empfohlen, nicht ersetzt.",
      "Kapazitäten, Fahrzeuge und Termine sagt ausschließlich Ihre Disposition zu.",
      "Ihre Rechtstexte und Haftungshinweise werden als freigegebene Bausteine verwendet.",
    ],
    stages: [...commonStages],
    featuredStage: 0,
    timeline: movingTimeline,
    sectionCopy: {
      problemTitle: "Was Sie heute Zeit, Aufträge und Marge kostet.",
      checksTitle: "Was Maxim prüft, bevor überhaupt ein Preis entsteht.",
      checksLead:
        "Erst wenn die entscheidenden Angaben vollständig sind, wird aus der Anfrage ein Kalkulationsentwurf.",
      exampleTitle: "Unvollständig rein. Erst nach Klärung zum Entwurf.",
      integrationsTitle: "Passt sich Ihrem Prozess an – nicht umgekehrt.",
      stagesEyebrow: "Kontrollierter Ausbau",
      stagesTitle: "Intern starten. Website und Telefon erst später ergänzen.",
      trustTitle: "Ihre Regeln bleiben Ihre Regeln.",
    },
    finalCta: {
      eyebrow: "Kostenloser Einstieg",
      title: "Fünf echte Umzugsanfragen. Ein konkreter Vergleich.",
      text: "Sie schicken uns fünf bereits beantwortete Anfragen – gern anonymisiert. Wir zeigen, was Maxim erfasst, nachgefragt und nach Ihren Regeln vorbereitet hätte.",
      button: "Kalkulations-Check starten",
    },
    faq: [
      {
        q: "Was passiert bei einer unvollständigen Anfrage?",
        a: "Maxim zeigt die fehlenden Angaben getrennt für Abhol- und Lieferort und formuliert die passende Rückfrage. Ein Festpreis-Entwurf entsteht erst mit ausreichender Datengrundlage.",
      },
      {
        q: "Kann der Agent Fotos auswerten?",
        a: "Fotos können Hinweise auf Engstellen oder Sondergegenstände liefern. Maße, Gewicht und Vollständigkeit müssen weiterhin strukturiert erfasst oder besichtigt werden.",
      },
      ...commonFaq,
    ],
  },
  {
    variant: "agent",
    slug: "moebelspeditionen",
    icon: "forwarding",
    navTitle: "Möbelspeditionen",
    tileLead: "Ein Regelwerk für alle Berater und die Disposition.",
    title: "Kalkulations-Agent für Möbelspeditionen",
    eyebrow: "Für Möbelspeditionen mit Beratung und Disposition",
    seoTitle: "Kalkulations-Agent für Möbelspeditionen | uberagent",
    seoDescription:
      "Einheitliche Angebotsentwürfe, weniger Erfassungsarbeit und eine saubere Übergabe an die Disposition – nach Ihrem Regelwerk.",
    hero: {
      title: "Beraterzeit für Beratung. Nicht fürs Abtippen.",
      lead: "Maxim übernimmt Erfassung, Vollständigkeitsprüfung und Kalkulationsentwurf. Ihre Umzugsberater behalten Kundenkontakt und Freigabe; die Disposition erhält eine saubere Übergabe.",
      stats: [
        { value: "1 Regelwerk", label: "über alle Berater" },
        { value: "Weniger", label: "Doppelerfassung" },
        { value: "Koexistenz", label: "mit Ihrer Software" },
      ],
    },
    scenario: {
      title: "Drei Berater. Drei Kalkulationsstile.",
      request:
        "Besichtigungsnotiz, Gutliste und Kundenmail enthalten dieselben Daten – aber in verschiedenen Formaten.",
      missing: [
        "Einheitliche Zeit- und Zuschlagsregeln",
        "Nachvollziehbare Abweichungsfreigaben",
        "Vollständige Übergabe an die Disposition",
      ],
      conclusion:
        "Der Agent standardisiert die Zuarbeit, ohne Erfahrung, Beratung oder vorhandene Branchensoftware zu ersetzen.",
    },
    pains: [
      {
        title: "Teure Beraterzeit",
        text: "Gutlisten übertragen und Positionen zusammensuchen bindet Zeit, die im Kundengespräch wertvoller wäre.",
      },
      {
        title: "Regeln driften",
        text: "Standorte und Mitarbeiter wenden Zeitansätze, Rabatte und Zuschläge unterschiedlich an.",
      },
      {
        title: "Bruch zur Disposition",
        text: "Besonderheiten aus Beratung und Kalkulation werden nach Auftrag erneut übertragen oder nachtelefoniert.",
      },
    ],
    solutionTitle: "Einheitliche Zuarbeit vom Erstkontakt bis zur Disposition.",
    solutionLead:
      "Maxim bringt Informationen in eine gemeinsame Struktur, wendet das freigegebene Regelwerk an und markiert Abweichungen für Ihre Berater.",
    workflow: [
      {
        title: "Quellen zusammenführen",
        text: "Anfrage, Gutliste und Besichtigungsnotiz werden zu einem Vorgang.",
      },
      {
        title: "Standorte prüfen",
        text: "Belade- und Entladestelle werden separat auf Zugänge, Aufzüge und Auflagen geprüft.",
      },
      {
        title: "Regelwerk anwenden",
        text: "Zeitansätze, Rollen, Fuhrpark, Zuschläge und Standortregeln bleiben konsistent.",
      },
      {
        title: "Abweichungen eskalieren",
        text: "Sonderfälle und Kalkulationen außerhalb Ihrer Korridore gehen zum Berater.",
      },
      {
        title: "Dispo-Paket erzeugen",
        text: "Volumen, Team, Fahrzeug, Zeiten und Besonderheiten liegen strukturiert vor.",
      },
    ],
    checks: [
      {
        title: "Standort-Konsistenz",
        text: "Ein zentral gepflegtes Regelwerk statt Kalkulation nach Haus-Art.",
      },
      {
        title: "Rollen und Freigaben",
        text: "Berater, Niederlassungsleitung und Disposition erhalten definierte Aufgaben.",
      },
      {
        title: "Korridor-Prüfung",
        text: "Ungewöhnliche Preise oder Aufwände werden sichtbar, bevor das Angebot rausgeht.",
      },
      {
        title: "Software-Koexistenz",
        text: "Der Agent ergänzt Ihre Prozesse; Schnittstellen werden nicht pauschal versprochen.",
      },
      {
        title: "Gutliste und Besichtigung",
        text: "Angaben aus beiden Quellen werden zusammengeführt und Widersprüche für den Berater markiert.",
      },
      {
        title: "Niederlassungsregeln",
        text: "Zentrale Standards und lokale Preis- oder Fuhrparkregeln bleiben klar getrennt.",
      },
      {
        title: "Dispo-Pflichtfelder",
        text: "Volumen, Team, Fahrzeug, Zeiten und Besonderheiten werden vor der Übergabe geprüft.",
      },
      {
        title: "Nachvollziehbare Abweichung",
        text: "Jede manuelle Änderung bleibt mit Grund und verantwortlicher Freigabe sichtbar.",
      },
      {
        title: "Ihre eigenen Prüfregeln",
        text: "Zusätzlich bildet Maxim die Prüfpunkte ab, die in Ihrem Haus über eine saubere Kalkulation entscheiden.",
      },
    ],
    example: {
      request: "Fernumzug · zwei Niederlassungen",
      sources: ["Kundenmail", "Umzugsgutliste", "Videonotiz"],
      open: [
        "Standortregel für Zuschläge",
        "Nutzlast bei hohem Aktenanteil",
        "Freigabe unter Zielmarge",
      ],
      result:
        "Ein konsistenter Kalkulationsentwurf für den Berater und dieselbe strukturierte Datengrundlage für die Disposition.",
      note: "Ihre Branchensoftware bleibt führend, wenn sie das heute bereits ist.",
      labels: ["Drei Quellen", "Abgleich und Freigaben", "Berater + Disposition"],
      visual: "draft",
    },
    integrations: [
      {
        title: "Postfach und Dokumente",
        text: "Anfragen, Gutlisten und freigegebene Vorlagen bilden den Einstieg.",
      },
      {
        title: "Movingstar, Xlado und CRM",
        text: "Eine Anbindung wird erst nach Prüfung der verfügbaren Schnittstelle zugesagt.",
      },
      {
        title: "Disposition und Reporting",
        text: "Strukturierte Übergabe sowie Plan-Ist-Auswertung für Ihre bestehenden Abläufe.",
      },
    ],
    boundaries: [
      "Beratung und Besichtigung bleiben beim Umzugsberater.",
      "Sondertransporte und komplexe Projekte werden nicht autonom kalkuliert.",
      "Die Disposition bestätigt Kapazität, Fahrzeug und Termin.",
      "Der Agent ersetzt keine bestehende Branchensoftware.",
    ],
    stages: [
      {
        title: "Postfach und Unterlagen",
        text: "Anfragen, Gutlisten und Notizen werden zu einem strukturierten Vorgang zusammengeführt.",
      },
      {
        title: "Einheitliches Regelwerk",
        text: "Zentrale Standards, Standortregeln und Freigabekorridore werden konsistent angewandt.",
      },
      {
        title: "Übergabe an die Disposition",
        text: "Freigegebene Ergebnisse kommen vollständig in Ihren bestehenden Prozess oder Export.",
      },
    ],
    featuredStage: 0,
    timeline: {
      title: "Einführung parallel zu Ihrer vorhandenen Software.",
      steps: [
        {
          title: "Systeme und Rollen",
          text: "Wir klären führendes System, Beraterrollen, Standorte und Freigabewege.",
        },
        {
          title: "Regeln abbilden",
          text: "Zentrale und lokale Kalkulationsregeln werden dokumentiert und konfiguriert.",
        },
        {
          title: "Bestandsfälle prüfen",
          text: "Reale Anfragen werden gegen Ihre Originalangebote und Dispo-Daten verglichen.",
        },
        {
          title: "Parallelbetrieb",
          text: "Maxim läuft neben Ihrer heutigen Software, ohne den laufenden Prozess zu ersetzen.",
        },
        {
          title: "Kontrolliert übergeben",
          text: "Definierte Fälle und Übergabeformate gehen nach Ihrer Freigabe live.",
        },
      ],
    },
    sectionCopy: {
      problemTitle: "Wo Beraterzeit verloren geht und Standards auseinanderlaufen.",
      checksTitle: "Was vor Beraterfreigabe und Dispo-Übergabe geprüft wird.",
      exampleTitle: "Drei Quellen werden zu einem belastbaren Vorgang.",
      integrationsTitle: "Ergänzt Ihre Software, statt sie zu verdrängen.",
      stagesEyebrow: "Prozessausbau",
      stagesTitle: "Vom Postfach bis zur sauberen Dispo-Übergabe.",
      trustTitle: "Ihre Regeln und Rollen bleiben unter Ihrer Kontrolle.",
    },
    finalCta: {
      eyebrow: "Kostenloser Prozess-Check",
      title: "Fünf echte Vorgänge. Ein direkter Vergleich.",
      text: "Wir prüfen an anonymisierten Anfragen, Gutlisten und Übergaben, wo Maxim Erfassungsarbeit reduziert und Standards konsistenter macht.",
      button: "Prozess-Check starten",
    },
    trust: [
      {
        title: "EU-Hosting",
        text: "Anfragen, Gutlisten und Kalkulationsdaten bleiben in der EU; ein AV-Vertrag gehört zum Setup.",
      },
      {
        title: "Keine Trainingsnutzung",
        text: "Ihre Preise, Standortregeln und Kundendaten trainieren keine fremden KI-Modelle.",
      },
      {
        title: "Rollen und Freigaben",
        text: "Berater, Niederlassungsleitung und Disposition sehen nur die für sie bestimmten Schritte.",
      },
      {
        title: "Ihre Software bleibt führend",
        text: "Maxim ergänzt Erfassung und Kalkulationsvorbereitung, ohne Ihre Branchensoftware zu verdrängen.",
      },
    ],
    faq: [
      {
        q: "Wir haben bereits eine Umzugssoftware. Wozu noch ein Agent?",
        a: "Software stellt Werkzeuge bereit. Der Agent übernimmt die vorbereitende Arbeit: Informationen konsolidieren, Lücken erkennen, Regeln anwenden und die Übergabe vorbereiten. Ob er direkt in Ihr System schreibt, hängt von dessen Schnittstelle ab.",
      },
      {
        q: "Funktioniert das über mehrere Standorte?",
        a: "Ja, wenn zentrale und lokale Regeln klar dokumentiert sind. Der Agent kann Standortregeln anwenden und Abweichungen zur Freigabe markieren.",
      },
      ...commonFaq,
    ],
  },
  {
    variant: "assistant",
    slug: "firmenumzuege",
    icon: "office",
    navTitle: "Firmenumzüge",
    tileLead: "Fehlende LV-Positionen sehen, bevor Sie abgeben.",
    title: "Kalkulations-Assistent für Firmenumzüge",
    eyebrow: "Für Anbieter von Büro- und Firmenumzügen",
    seoTitle: "Firmenumzüge kalkulieren mit KI-Zuarbeit | uberagent",
    seoDescription:
      "Leistungsverzeichnisse prüfen, Positionen vorbereiten und Lücken vor der Abgabe erkennen. Die Projektkalkulation bleibt beim Menschen.",
    hero: {
      title: "Vor der Abgabe sehen, welche Position noch fehlt.",
      lead: "Der Kalkulations-Assistent liest Anfrage und Leistungsverzeichnis, gleicht sie mit Ihrem Positionskatalog ab und bereitet Standardpositionen vor. Begehung und Projektkalkulation bleiben bei Ihrem Projektleiter.",
      stats: [
        { value: "LV-Check", label: "gegen Ihren Katalog" },
        { value: "Lückenliste", label: "vor der Abgabe" },
        { value: "Menschlich", label: "final kalkuliert" },
      ],
    },
    scenario: {
      title: "85 Arbeitsplätze sind nicht 85 gleiche Positionen.",
      request:
        "Akten, IT, Rollwagen, Aufzugsverkleidung, Gebäudeschutz, Parkraum und mehrere Umzugsetappen stehen verteilt im Leistungsverzeichnis.",
      missing: [
        "Positionen ohne Preiszuordnung",
        "Auflagen ohne Zeit- oder Materialansatz",
        "Abhängigkeiten zwischen Etappen und Gewerken",
      ],
      conclusion:
        "Hier automatisieren wir nicht die Projektentscheidung, sondern die mühsame Vollständigkeits- und Vorbereitungsarbeit.",
    },
    pains: [
      {
        title: "Lange Leistungsverzeichnisse",
        text: "Anforderungen stehen in Anhängen, Tabellen und Fließtext – eine übersehene Position kostet Marge.",
      },
      {
        title: "Jedes Projekt beginnt bei null",
        text: "Standardpositionen werden gesucht, kopiert und erneut gegen interne Sätze gerechnet.",
      },
      {
        title: "Fristdruck",
        text: "Bietefristen lassen wenig Zeit für Vollständigkeitsprüfung und interne Freigaben.",
      },
    ],
    solutionTitle: "Der Projektleiter startet mit einem Positionsentwurf, nicht mit leerem Papier.",
    solutionLead:
      "Der Assistent zerlegt Anforderungen, ordnet sie Ihrem Katalog zu und zeigt offen, was eine Begehung oder Fachentscheidung braucht.",
    workflow: [
      {
        title: "Unterlagen einlesen",
        text: "Anfrage, LV und Anlagen werden in eine gemeinsame Projektstruktur gebracht.",
      },
      {
        title: "Positionen abgleichen",
        text: "Geforderte Leistungen werden Ihrem freigegebenen Positionskatalog zugeordnet.",
      },
      {
        title: "Lücken markieren",
        text: "Nicht bepreiste Auflagen und fehlende Mengen landen in einer klaren Liste.",
      },
      {
        title: "Standardteile vorkalkulieren",
        text: "Wiederkehrende Positionen erhalten Ihre Zeit- und Kostensätze.",
      },
      {
        title: "Projektleiter übergeben",
        text: "Offene Entscheidungen, Risiken und Entwurf stehen für Begehung und finale Kalkulation bereit.",
      },
    ],
    checks: [
      {
        title: "Arbeitsplätze und Akten",
        text: "Mengen, laufende Meter, Rollwagen und Kennzeichnung werden getrennt geführt.",
      },
      {
        title: "IT und Fremdgewerke",
        text: "Abbau, Aufbau und Fachleistungen werden sichtbar statt still vorausgesetzt.",
      },
      {
        title: "Gebäudeauflagen",
        text: "Aufzugsverkleidung, Schutzmaterial und Ausnahmegenehmigungen werden zu Positionen.",
      },
      {
        title: "Etappen und Zuschläge",
        text: "Nacht-, Wochenend- und Mehrphasenarbeit wird zur Prüfung vorgelegt.",
      },
      {
        title: "Fristen und Abgabetermin",
        text: "Bietefrist, Rückfragefrist und Ausführungszeitraum werden gegen den Projektplan gehalten.",
      },
      {
        title: "Parkraum und Genehmigungen",
        text: "Halteverbot, Ladezonen und Vorlauffristen der Behörden werden als eigene Positionen geführt.",
      },
      {
        title: "Abhängigkeiten der Etappen",
        text: "Reihenfolge, Zwischenlagerung und Wartezeiten zwischen Bauabschnitten werden sichtbar gemacht.",
      },
      {
        title: "Doppelte Positionen",
        text: "Material, Schutz oder Anfahrt werden nicht gleichzeitig in Pauschale und Einzelposition geführt.",
      },
      {
        title: "Ihre eigenen Prüfregeln",
        text: "Zusätzlich prüft der Assistent die Punkte, an denen Ihre Projekte erfahrungsgemäß Marge verlieren.",
      },
    ],
    example: {
      request: "85 Arbeitsplätze · 520 lfm Akten · 2 Etappen · 7 Arbeitstage",
      open: [
        "IT-Verantwortung und Fremdgewerke",
        "Park- und Aufzugsgenehmigungen",
        "Nacht- und Wochenendanteile",
      ],
      result:
        "Positionsentwurf mit Katalogabgleich, fehlenden Mengen und einer priorisierten Begehungsliste.",
      note: "Kein automatischer Endpreis: Firmenumzüge bleiben Projektgeschäft.",
      labels: ["LV-Auszug", "Offene Positionen", "Positionsentwurf"],
      visual: "document",
    },
    integrations: [
      {
        title: "PDF, Excel und LV",
        text: "Projektunterlagen werden für den Positionsabgleich strukturiert.",
      },
      {
        title: "Ihr Positionskatalog",
        text: "Nur freigegebene Standardpositionen und Sätze werden verwendet.",
      },
      {
        title: "Projekt- und Angebotsprozess",
        text: "Export und Systemanbindung werden an Ihren tatsächlichen Prozess angepasst.",
      },
    ],
    boundaries: [
      "Firmenumzüge werden nie ohne Begehung und Projektleitung final bepreist.",
      "Der Assistent liefert Zuarbeit, keine autonome Angebotsentscheidung.",
      "Maschinen, IT und Fachgewerke brauchen benannte Verantwortliche.",
      "Bietestrategie, Risikoaufschlag und Kapazität bleiben beim Menschen.",
    ],
    featuredStage: 1,
    stages: [
      {
        title: "LV- und Positionscheck",
        text: "Unterlagen strukturieren, Lücken erkennen und Standardpositionen vorbereiten.",
      },
      {
        title: "Begehungsunterstützung",
        text: "Offene Punkte werden als konkrete Fragen und Prüfliste für den Projektleiter ausgegeben.",
      },
      {
        title: "Projektübergabe",
        text: "Nach Freigabe stehen Angebots- und Ausführungsdaten strukturiert bereit.",
      },
    ],
    timeline: {
      title: "Vom Positionskatalog zum belastbaren LV-Check.",
      steps: [
        {
          title: "Katalog aufnehmen",
          text: "Standardpositionen, Rollen und Freigabegrenzen werden gemeinsam strukturiert.",
        },
        {
          title: "Alte LVs abgleichen",
          text: "Zwei bis drei abgeschlossene Projekte zeigen typische Positionen und Lücken.",
        },
        {
          title: "Projektleiter testen",
          text: "Der Assistent liefert parallel Lückenlisten und Positionsentwürfe zur Prüfung.",
        },
        {
          title: "Für neue LVs einsetzen",
          text: "Nach Freigabe startet der Check bei ausgewählten Ausschreibungen und Projekten.",
        },
      ],
    },
    sectionCopy: {
      problemTitle: "Wo Leistungsverzeichnisse Zeit und Marge kosten.",
      checksTitle: "Was gegen Leistungsverzeichnis und Positionskatalog geprüft wird.",
      exampleTitle: "Vom LV-Auszug zum Positionsentwurf für den Projektleiter.",
      integrationsTitle: "Fügt sich in Projekt- und Angebotsprozess ein.",
      stagesEyebrow: "Projekt-Zuarbeit",
      stagesTitle: "Prüfen, für die Begehung vorbereiten, strukturiert übergeben.",
      trustTitle: "Projektunterlagen und interne Sätze bleiben kontrolliert.",
    },
    finalCta: {
      eyebrow: "Kostenloser LV-Check",
      title: "Ein altes Leistungsverzeichnis. Eine konkrete Lückenliste.",
      text: "Sie schicken uns ein anonymisiertes abgeschlossenes Projekt. Wir zeigen, welche Positionen der Assistent strukturiert, abgeglichen und zur Begehung markiert hätte.",
      button: "LV-Check anfragen",
    },
    trust: [
      {
        title: "EU-Hosting",
        text: "Projektunterlagen und Kalkulationsdaten bleiben in der EU; ein AV-Vertrag gehört zum Setup.",
      },
      {
        title: "Keine Trainingsnutzung",
        text: "Leistungsverzeichnisse, Preise und Projektdaten trainieren keine fremden KI-Modelle.",
      },
      {
        title: "Interne Sätze geschützt",
        text: "Positionskatalog, Zuschläge und Risikologik bleiben intern und rollenbasiert zugänglich.",
      },
      {
        title: "Projektleiter entscheidet",
        text: "Der Assistent bereitet vor. Begehung, Bietestrategie und finale Freigabe bleiben beim Menschen.",
      },
    ],
    faq: [
      {
        q: "Kann der Assistent einen Firmenumzug vollständig kalkulieren?",
        a: "Nein. Er bereitet Positionen vor, prüft Vollständigkeit und markiert offene Punkte. Begehung, Bietestrategie und finale Projektkalkulation bleiben beim Projektleiter.",
      },
      {
        q: "Kann er Leistungsverzeichnisse prüfen?",
        a: "Ja, als strukturierte Zuarbeit: geforderte Leistungen extrahieren, mit Ihrem Positionskatalog abgleichen und Lücken aufzeigen. Der technische Umfang wird anhand Ihrer echten Dokumente im Check bestätigt.",
      },
      {
        q: "Wer entscheidet über den finalen Projektpreis?",
        a: "Immer Ihr Projektleiter. Der Assistent bereitet Standardpositionen und offene Punkte vor, trifft aber keine Bietestrategie und gibt kein Projektangebot autonom frei.",
      },
      {
        q: "Ersetzt der Assistent die Begehung?",
        a: "Nein. Er macht die Begehung zielgerichteter, indem er fehlende Mengen, Auflagen und Fachentscheidungen vorher als Prüfliste zusammenstellt.",
      },
      {
        q: "Welche Unterlagen braucht der erste Check?",
        a: "Ein anonymisiertes Leistungsverzeichnis, Ihren Positionskatalog und das damalige Angebot reichen für einen ersten belastbaren Vergleich.",
      },
      {
        q: "Rechnet der Assistent mit unseren Sätzen?",
        a: "Ja. Er verwendet ausschließlich Ihren freigegebenen Positionskatalog, Ihre Stunden- und Materialsätze und Ihre Zuschläge. Fehlt ein Satz, markiert er die Position, statt einen Wert zu erfinden.",
      },
      {
        q: "Ersetzt der Assistent unsere bestehende Software?",
        a: "Nein. Er kann eigenständig starten und Positionsentwürfe strukturiert übergeben. Eine direkte Anbindung an Ihr Projekt- oder Angebotssystem prüfen wir nur, wenn dort eine passende Schnittstelle existiert.",
      },
    ],
  },
  {
    variant: "module",
    slug: "moebeltransporte",
    icon: "furniture",
    navTitle: "Möbeltransporte",
    tileLead: "Richtpreise auf Ihrer Website, rund um die Uhr.",
    title: "Sofort-Richtpreis für Möbeltransporte",
    eyebrow: "Für Möbeltaxis und Kleintransport-Anbieter",
    seoTitle: "Sofort-Richtpreis für Möbeltransporte | uberagent",
    seoDescription:
      "Richtpreise für standardisierte Möbeltransporte direkt auf Ihrer Website – nach Distanz, Etagen, Maßen und Ihren Zuschlägen.",
    hero: {
      title: "Die 23-Uhr-Anfrage wartet nicht bis morgen.",
      lead: "Ein schlankes Preis-Modul beantwortet standardisierte Möbeltransport-Anfragen auf Ihrer Website – nach Ihren Regeln, klar als Richtpreis und mit vollständiger Vorkalkulation für Sie.",
      stats: [
        { value: "24/7", label: "Richtpreise anfragen" },
        { value: "Wenige", label: "klare Parameter" },
        { value: "1 Modul", label: "statt Agentenprojekt" },
      ],
    },
    scenario: {
      title: "„Was kostet ein Sofa von A nach B?“",
      request:
        "Der Kunde hat gerade ein Möbelstück gekauft und fragt abends mehrere Anbieter gleichzeitig an.",
      missing: [
        "Maße und Gewicht",
        "Etagen und Aufzug",
        "Entfernung und benötigte Träger",
      ],
      conclusion:
        "Für diese Anfrage braucht es keinen komplexen Agenten – sondern Ihr Preisraster als schnelle, saubere Strecke.",
    },
    pains: [
      {
        title: "Viele kleine Anfragen",
        text: "Jede Preisauskunft dauert nur Minuten – in Summe blockiert sie trotzdem den Tag.",
      },
      {
        title: "Kleiner Auftragswert",
        text: "Lange Qualifizierung lohnt sich nicht. Der Kunde erwartet sofort eine belastbare Orientierung.",
      },
      {
        title: "Anfragen außerhalb der Bürozeit",
        text: "Kleinanzeigenkäufe passieren abends und am Wochenende – dann gewinnt der schnellere Anbieter.",
      },
    ],
    solutionTitle: "Ihr Preisraster, direkt auf Ihrer Website.",
    solutionLead:
      "Das Modul fragt nur die Faktoren ab, die Ihren Preis tatsächlich bestimmen, und stoppt bei Sonderfällen.",
    workflow: [
      {
        title: "Transportgut wählen",
        text: "Möbeltyp, Anzahl, Maße und besondere Handhabung.",
      },
      {
        title: "Adressen erfassen",
        text: "Strecke, Etagen, Aufzug und Trageweg an beiden Orten.",
      },
      {
        title: "Richtpreis berechnen",
        text: "Grundpreis, Kilometerstaffel, Etagen-, Träger- und Mindestpreisregeln werden angewandt.",
      },
      {
        title: "Richtpreis und Lead",
        text: "Der Kunde erhält Orientierung; Sie bekommen Kontakt, Angaben und Vorkalkulation.",
      },
    ],
    checks: [
      {
        title: "Maße und Gewicht",
        text: "Übermaß, schwere Stücke, Klavier oder Tresor verlassen automatisch den Standardpfad und kommen als normale Anfrage zu Ihnen.",
      },
      {
        title: "Etagen und Aufzug",
        text: "Abholung und Lieferung werden getrennt bepreist.",
      },
      {
        title: "Distanz und Tourtyp",
        text: "Direktfahrt, Mindeststrecke und Ihre Kilometerstaffel bleiben konfigurierbar.",
      },
    ],
    example: {
      request: "2-Sitzer-Sofa · 2. OG ohne Aufzug → EG · 40 km",
      open: ["genaue Maße", "Parkdistanz", "zweiter Träger erforderlich"],
      result:
        "Nach vollständiger Angabe: Richtpreis aus Grundpreis, Strecke, Etage und Personal – plus Lead mit Rechenweg für Sie.",
      note: "Kein verbindlicher Festpreis und keine automatische Terminzusage.",
      labels: ["Kundenangaben", "Parameter-Check", "Sofort-Richtpreis"],
      visual: "price",
    },
    integrations: [
      {
        title: "Ihre Website",
        text: "Das Modul wird als schlanke Anfrage- und Preisstrecke eingebunden.",
      },
      {
        title: "E-Mail oder CRM",
        text: "Jeder Lead kommt mit Angaben und Vorkalkulation bei Ihnen an.",
      },
      {
        title: "Ihre Preisregeln",
        text: "Grundpreis, Kilometer, Etagen, Personal und Mindestauftrag bleiben unter Ihrer Kontrolle.",
      },
    ],
    boundaries: [
      "Richtpreis statt verbindlichem Endpreis.",
      "Sondertransporte verlassen automatisch den Standardpfad.",
      "Termin und Kapazität werden nicht automatisch zugesagt.",
      "Ihre internen Margen und Regeln bleiben für Kunden unsichtbar.",
    ],
    stages: [
      {
        title: "Preisraster aufnehmen",
        text: "Ihre wenigen Kernparameter und Ausschlussregeln werden dokumentiert.",
      },
      {
        title: "Website-Modul testen",
        text: "Typische und grenzwertige Fälle laufen gegen Ihre bisherigen Preise.",
      },
      {
        title: "Leads empfangen",
        text: "Nach Freigabe geht die Strecke live und liefert strukturierte Anfragen.",
      },
    ],
    featuredStage: 1,
    sectionCopy: {
      problemTitle: "Warum kleine Preisanfragen trotzdem den ganzen Tag unterbrechen.",
      checksTitle: "Drei Parametergruppen entscheiden über den Richtpreis.",
      exampleTitle: "Vollständige Angaben rein. Richtpreis und Lead direkt raus.",
      integrationsTitle: "Eine schlanke Strecke für Ihre Website.",
      stagesEyebrow: "In drei Schritten live",
      stagesTitle: "Preisraster aufnehmen, testen, veröffentlichen.",
      trustTitle: "Ihre Preisregeln bleiben im Hintergrund.",
    },
    finalCta: {
      eyebrow: "Kostenloser Raster-Check",
      title: "Zehn typische Transporte gegen Ihr Preisraster.",
      text: "Wir prüfen Standard- und Grenzfälle mit Ihren heutigen Preisen und zeigen, wie die Richtpreis-Strecke auf Ihrer Website funktionieren würde.",
      button: "Sofortpreis-Modul prüfen",
    },
    trust: [
      {
        title: "EU-Hosting",
        text: "Kundenanfragen und Leads bleiben in der EU; ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO gehört zum Setup.",
      },
      {
        title: "Keine Trainingsnutzung",
        text: "Kontaktdaten, Adressen und Ihr Preisraster trainieren keine fremden KI-Modelle.",
      },
      {
        title: "Margen unsichtbar",
        text: "Der Kunde sieht den Richtpreis. Grundpreise, Staffeln und Zuschläge bleiben intern.",
      },
    ],
    faq: [
      {
        q: "Warum Richtpreis statt Festpreis?",
        a: "Der Preis basiert auf Kundeneingaben. Ein Richtpreis gibt schnelle Orientierung, ohne Maße, Zugänglichkeit oder Sonderfälle als garantiert anzunehmen.",
      },
      {
        q: "Lohnt sich das bei kleinen Auftragswerten?",
        a: "Genau deshalb ist es ein schlankes Modul statt eines vollständigen Agentenprojekts. Im kostenlosen Check rechnen wir mit Ihrem Anfragevolumen und Mindestauftragswert.",
      },
      {
        q: "Welche Preisregeln lassen sich abbilden?",
        a: "Zum Beispiel Grundpreis, Kilometerstaffel, Etagen, Aufzug, zweiter Träger, Mindestauftragswert und klar definierte Zuschläge.",
      },
      {
        q: "Was passiert bei Klavier, Tresor oder Übermaß?",
        a: "Der Sofortpreis stoppt. Statt eines Richtpreises erhalten Sie eine strukturierte Anfrage zur manuellen Prüfung.",
      },
      {
        q: "Sagt das Modul einen Termin zu?",
        a: "Nein. Es zeigt einen Richtpreis und nimmt den Lead auf. Verfügbarkeit und Termin bestätigen weiterhin Sie.",
      },
      {
        q: "Ersetzt das Modul unsere bestehende Software?",
        a: "Nein. Es sitzt vor Ihrem Prozess: Der Lead kommt per E-Mail oder in Ihr CRM, alles Weitere läuft wie heute.",
      },
      {
        q: "Was brauchen wir für den Start?",
        a: "Ihr Preisraster mit Grundpreis, Kilometerstaffel, Etagen- und Personalregeln, Ihren Mindestauftragswert und eine Handvoll typischer Fälle zum Gegenrechnen.",
      },
    ],
  },
];

export function getMaximIndustryBySlug(slug: string | null | undefined) {
  return maximIndustryPages.find((page) => page.slug === slug);
}
