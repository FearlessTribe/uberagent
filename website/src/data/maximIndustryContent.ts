export type MaximIndustryIcon = "moving" | "workshop" | "hvac";

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
  /** Optional stacked benefit cards (same pattern as KFZ). */
  stack?: readonly {
    icon: "orders" | "time" | "service";
    titleAccent: string;
    titleRest: string;
    text: string;
    lottieSrc: string;
  }[];
  /** Optional continuation after „…schreibt automatisiert Angebote“. */
  agentIntroRest?: string;
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
    agentIntroRest: " für Ihre Werkstatt",
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
    eyebrow: "Für Umzug, Möbelspedition, Firmenumzug und Möbeltransport",
    seoTitle: "KI-Kalkulationsagent für Umzugsunternehmen | uberagent",
    seoDescription:
      "Aus unvollständigen Umzugsanfragen werden prüfbare Angebotsentwürfe – für Privatumzug, Möbelspedition, Firmenumzug und Möbeltransport, nach Ihren Zeitansätzen und Zuschlägen.",
    hero: {
      title: "Das Angebot ist fertig, bevor der Wettbewerb zurückruft.",
      lead: "Der Kalkulations-Agent macht aus jeder Anfrage in Minuten einen prüfbaren Angebotsentwurf – ob Privatumzug, Möbelspedition, Firmenumzug oder Möbeltransport. Kalkuliert nach Ihren Sätzen, Zeitansätzen und Zuschlägen. Sie prüfen und geben frei.",
      stats: [
        { value: "Minuten", label: "bis zum Entwurf" },
        { value: "2 Adressen", label: "getrennt geprüft" },
        { value: "6 Wochen", label: "bis zum Go-live" },
      ],
    },
    stack: [
      {
        icon: "orders",
        titleAccent: "Mehr Aufträge",
        titleRest: " für Ihren Betrieb",
        text: "Sie gewinnen den Auftrag, weil Ihr Angebot schneller raus ist als bei der Konkurrenz.",
        lottieSrc: "/lottie/kfz/mehr-auftraege.json",
      },
      {
        icon: "time",
        titleAccent: "Tausende Stunden im Jahr sparen",
        titleRest: ", Angebote zu schreiben",
        text: "Mehrere Aufträge am Tag summieren sich schnell zu tausend Stunden Angebotserstellung im Jahr zusammen, die Ihnen keiner bezahlt.",
        lottieSrc: "/lottie/kfz/stunden-sparen.json",
      },
      {
        icon: "service",
        titleAccent: "Besserer Kundenservice",
        titleRest: " und bessere Ergebnisse",
        text: "Der Agent fragt nach bei Unklarheiten und kalkuliert mit Ihren Regeln und Zeitansätzen.",
        lottieSrc: "/lottie/kfz/kundenservice.json",
      },
    ],
    agentIntroRest: " für Umzugsunternehmen",
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
      "Maxim strukturiert die Anfrage, prüft Abhol- und Lieferort separat und kalkuliert erst, wenn Ihre Regeln eine belastbare Grundlage ergeben – für Privatumzug ebenso wie für Spedition, Firmenumzug oder Einzeltransport.",
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
        text: "Klavier, Tresor, Firmenumzug oder komplexe Tragewege gehen zur manuellen Prüfung.",
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
        q: "Für welche Betriebe gilt diese Seite?",
        a: "Für Umzugsunternehmen, Möbelspeditionen, Firmenumzüge und Möbeltransporte. Dieselbe Kalkulationslogik, angepasst an Ihre Leistungen, Fahrzeuge und Zuschläge.",
      },
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
    slug: "sanitaer-heizung",
    icon: "hvac",
    navTitle: "Sanitär & Heizung",
    tileLead: "Prüfbarer Angebotsentwurf in Minuten statt zwischen zwei Baustellen.",
    title: "Kalkulations-Agent für Sanitär, Heizung, Lüftung und Klima",
    eyebrow: "Für SHK, Sanitär, Heizung, Lüftung und Klima",
    seoTitle: "KI-Kalkulationsagent für Sanitär, Heizung, Lüftung und Klima | uberagent",
    seoDescription:
      "Aus unvollständigen SHK-Anfragen werden prüfbare Angebotsentwürfe – nach Ihren Stundensätzen, Materialregeln, Anfahrten und Zuschlägen.",
    hero: {
      title: "Das Angebot ist fertig, bevor der Wettbewerb zurückruft.",
      lead: "Der Kalkulations-Agent macht aus jeder Anfrage in Minuten einen prüfbaren Angebotsentwurf – für Sanitär, Heizung, Lüftung und Klima. Kalkuliert nach Ihren Sätzen, Zeitansätzen und Materialregeln. Sie prüfen und geben frei.",
      stats: [
        { value: "Minuten", label: "bis zum Entwurf" },
        { value: "Ihre Sätze", label: "Stunden, Material, Anfahrt" },
        { value: "6 Wochen", label: "bis zum Go-live" },
      ],
    },
    stack: [
      {
        icon: "orders",
        titleAccent: "Mehr Aufträge",
        titleRest: " für Ihren Betrieb",
        text: "Sie gewinnen den Auftrag, weil Ihr Angebot schneller raus ist als bei der Konkurrenz.",
        lottieSrc: "/lottie/kfz/mehr-auftraege.json",
      },
      {
        icon: "time",
        titleAccent: "Tausende Stunden im Jahr sparen",
        titleRest: ", Angebote zu schreiben",
        text: "Mehrere Aufträge am Tag summieren sich schnell zu tausend Stunden Angebotserstellung im Jahr zusammen, die Ihnen keiner bezahlt.",
        lottieSrc: "/lottie/kfz/stunden-sparen.json",
      },
      {
        icon: "service",
        titleAccent: "Besserer Kundenservice",
        titleRest: " und bessere Ergebnisse",
        text: "Der Agent fragt nach bei Unklarheiten und kalkuliert mit Ihren Regeln, Zeitansätzen und Materiallisten.",
        lottieSrc: "/lottie/kfz/kundenservice.json",
      },
    ],
    agentIntroRest: " für Sanitär, Heizung, Lüftung und Klima",
    scenario: {
      title: "Sie kennen diese Anfrage.",
      request:
        "„Die Dusche tropft, die Mischbatterie muss neu. Was kostet das inklusive Montage?“",
      missing: [
        "Fabrikat, Anschlussmaß und Zugänglichkeit",
        "Wandaufbau, Fliesen und Altgerät-Demontage",
        "Anfahrt, Notdienstzuschlag und Entsorgung",
      ],
      conclusion:
        "Während Sie zurückfragen und übertragen, liegt dieselbe Anfrage oft schon bei mehreren Wettbewerbern.",
    },
    pains: [
      {
        title: "Anfragen altern schnell",
        text: "Telefon, E-Mail und WhatsApp liefern unvollständige Angaben. Zwei Tage später ist der Auftrag häufig vergeben.",
      },
      {
        title: "Der Meister ist der Kalkulator",
        text: "Stundensätze, Materialaufschläge und Anfahrten stecken in wenigen Köpfen. Baustelle oder Notdienst stauen die Angebote.",
      },
      {
        title: "Vergessenes kostet Marge",
        text: "Kernbohrung, Altgerät, Gerüst oder Notdienstzuschlag werden erst vor Ort sichtbar – als Nachtrag oder Verlust.",
      },
    ],
    solutionTitle: "Vollständigkeit zuerst. Geschwindigkeit als Ergebnis.",
    solutionLead:
      "Maxim strukturiert die Anfrage, prüft Leistung, Objekt und Zugänglichkeit und kalkuliert erst, wenn Ihre Regeln eine belastbare Grundlage ergeben.",
    workflow: [
      {
        title: "Anfrage erfassen",
        text: "E-Mail, Formular oder WhatsApp werden zu einem strukturierten Vorgang.",
      },
      {
        title: "Lücken erkennen",
        text: "Objekt, Fabrikat, Zugänglichkeit, Altgerät, Material und Zuschläge werden geprüft.",
      },
      {
        title: "Rückfrage vorbereiten",
        text: "Ihr Team erhält eine fertige, freundliche Rückfrage statt einer losen Checkliste.",
      },
      {
        title: "Nach Ihren Regeln kalkulieren",
        text: "Stunden, Material, Anfahrt, Zuschläge und Zusatzleistungen nach Ihrer Preisliste.",
      },
      {
        title: "Freigeben und übergeben",
        text: "Angebotsentwurf für Sie, strukturierte Zusammenfassung für die Disposition.",
      },
    ],
    checks: [
      {
        title: "Leistung und Objekt",
        text: "Sanitär, Heizung, Lüftung oder Klima werden getrennt erfasst – nicht als eine vage Baustelle.",
      },
      {
        title: "Stunden und Material",
        text: "Ihre Verrechnungssätze, Aufschläge und Mindestpreise – keine erfundenen Listenpreise.",
      },
      {
        title: "Festpreis oder Richtpreis",
        text: "Fehlen Daten, bleibt die Unsicherheit sichtbar und der Festpreis gesperrt.",
      },
      {
        title: "Sonderfälle",
        text: "Gas, Druckprüfung, Kernbohrung oder Gerüst gehen zur manuellen Prüfung.",
      },
      {
        title: "Anfahrt und Vorlauf",
        text: "Entfernung, Notdienst, Abend- und Wochenendzuschläge werden gegengeprüft.",
      },
      {
        title: "Zugänglichkeit und Bestand",
        text: "Stockwerk, Schacht, Altgerät, Fliesen und Wandaufbau werden auf Lücken geprüft.",
      },
      {
        title: "Zusatzleistungen",
        text: "Demontage, Entsorgung, Dichtheitsprüfung und Inbetriebnahme werden als eigene Positionen erfasst.",
      },
      {
        title: "Doppelte Kostenpositionen",
        text: "Anfahrt, Material oder Montage werden nicht gleichzeitig in Pauschale und Einzelposition berechnet.",
      },
      {
        title: "Ihre eigenen Prüfregeln",
        text: "Zusätzlich bildet Maxim die betriebsspezifischen Prüfpunkte ab, die für Ihre Angebote entscheidend sind.",
      },
    ],
    example: {
      request: "Mischbatterie Dusche · EFH · Montage inkl. Altgerät",
      open: [
        "Fabrikat und Anschlussmaß",
        "Fliesen und Wandaufbau",
        "Anfahrt und Entsorgung",
      ],
      result:
        "Nach der Antwort: Stunden, Material, Anfahrt und Zusatzleistungen als nachvollziehbarer Entwurf – jede Position mit Regel-Herkunft.",
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
        title: "Preislisten und Zeitansätze",
        text: "Ihre Stunden-, Material- und Anfahrtsregeln werden in den Angebotsprozess übernommen.",
      },
      {
        title: "Angebot und Disposition",
        text: "Entwurf und Übergabe werden strukturiert ausgegeben; direkte Schnittstellen prüfen wir ehrlich.",
      },
    ],
    boundaries: [
      "Kein Angebot verlässt das Haus ohne Ihre Freigabe.",
      "Besichtigung wird bei unklaren Bestandsanlagen empfohlen, nicht ersetzt.",
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
      title: "Fünf echte SHK-Anfragen. Ein konkreter Vergleich.",
      text: "Sie schicken uns fünf bereits beantwortete Anfragen – gern anonymisiert. Wir zeigen, was Maxim erfasst, nachgefragt und nach Ihren Regeln vorbereitet hätte.",
      button: "Kalkulations-Check starten",
    },
    faq: [
      {
        q: "Für welche Betriebe gilt diese Seite?",
        a: "Für Sanitär, Heizung, Lüftung und Klima – vom Installationsbetrieb bis zum SHK-Meisterbetrieb. Dieselbe Kalkulationslogik, angepasst an Ihre Leistungen, Stundensätze und Zuschläge.",
      },
      {
        q: "Was passiert bei einer unvollständigen Anfrage?",
        a: "Maxim zeigt die fehlenden Angaben zu Objekt, Material und Zugänglichkeit und formuliert die passende Rückfrage. Ein Festpreis-Entwurf entsteht erst mit ausreichender Datengrundlage.",
      },
      {
        q: "Kann der Agent Fotos auswerten?",
        a: "Fotos können Hinweise auf Bestand, Zugänglichkeit oder Sonderfälle liefern. Maße, Fabrikat und Vollständigkeit müssen weiterhin strukturiert erfasst oder vor Ort geprüft werden.",
      },
      ...commonFaq,
    ],
  },
];

export const maximIndustryAliases: Record<string, string> = {
  moebelspeditionen: "umzugsunternehmen",
  firmenumzuege: "umzugsunternehmen",
  moebeltransporte: "umzugsunternehmen",
  shk: "sanitaer-heizung",
  lueftung: "sanitaer-heizung",
  klima: "sanitaer-heizung",
};

export function getMaximIndustryBySlug(slug: string | null | undefined) {
  if (!slug) return undefined;
  const resolved = maximIndustryAliases[slug] ?? slug;
  return maximIndustryPages.find((page) => page.slug === resolved);
}
