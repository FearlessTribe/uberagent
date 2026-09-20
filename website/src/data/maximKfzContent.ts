/** Copy & Struktur für Maxim / KFZ-Werkstätten – ohne erfundene ROI-Zahlen. */

export const maximKfzSeo = {
  title: "Kalkulations-Agent für KFZ-Werkstätten | Maxim | uberagent",
  description:
    "Maxim nimmt Werkstattanfragen strukturiert auf, bereitet Kalkulationen nach Ihren Regeln vor und liefert prüfbare Angebotsvorschläge für Ihre KFZ-Werkstatt.",
} as const;

export const maximKfzHero = {
  eyebrow: "Für KFZ-Werkstätten",
  primaryCta: "Kostenlose Anfrage stellen",
  secondaryCta: "So funktioniert es",
  lead:
    "Kunden geben Fahrzeug und gewünschte Arbeiten an. Maxim sammelt die relevanten Informationen, arbeitet automatisch tagesaktuelle Händlerpreise ein, bereitet die Kalkulation auf Basis der Regeln und Daten Ihrer Werkstatt vor und erstellt einen Angebotsvorschlag. Ihre Mitarbeiter prüfen ihn und geben ihn frei.",
} as const;

export const maximKfzStack = [
  {
    icon: "orders" as const,
    titleAccent: "Mehr Aufträge",
    titleRest: " für Ihre Werkstatt",
    text: "Sie gewinnen den Auftrag, weil Ihr Angebot schneller raus ist als bei der Konkurrenz.",
    lottieSrc: "/lottie/kfz/mehr-auftraege.json",
  },
  {
    icon: "time" as const,
    titleAccent: "Tausende Stunden im Jahr sparen",
    titleRest: ", Angebote zu schreiben",
    text: "Mehrere Aufträge am Tag summieren sich schnell zu tausend Stunden Angebotserstellung im Jahr zusammen, die Ihnen keiner bezahlt.",
    lottieSrc: "/lottie/kfz/stunden-sparen.json",
  },
  {
    icon: "service" as const,
    titleAccent: "Besserer Kundenservice",
    titleRest: " und bessere Ergebnisse",
    text: "Der Agent fragt nach bei Unklarheiten und kalkuliert mit Ihren Regeln und tagesaktuellen Preisen.",
    lottieSrc: "/lottie/kfz/kundenservice.json",
  },
] as const;

export const maximKfzCompare = {
  eyebrow: "Heute vs. mit Maxim",
  title: "Weniger Hin und Her. Klarere Vorbereitung.",
  today: {
    title: "Heute",
    lead: "Anfrage kommt rein – Telefon, E-Mail oder Formular.",
    steps: [
      "Mitarbeiter liest die Anfrage",
      "Fehlende Informationen nachfordern",
      "Fahrzeug und Leistung einordnen",
      "Teile, Material und Arbeitszeit prüfen",
      "Preis kalkulieren und Angebot schreiben",
      "Kunde kontaktieren",
    ],
  },
  withMaxim: {
    title: "Mit Maxim",
    lead: "Maxim übernimmt die Vorbereitung.",
    steps: [
      "Fragt die notwendigen Informationen strukturiert ab",
      "Erkennt Fahrzeug und gewünschte Leistung",
      "Verarbeitet hinterlegte Kalkulationsregeln",
      "Erstellt einen Kalkulations- bzw. Angebotsvorschlag",
      "Mitarbeiter prüft und gibt frei",
      "Kunde erhält schneller eine Antwort",
    ],
  },
} as const;

export const maximKfzExample = {
  eyebrow: "Konkretes Beispiel",
  title: "„Meine Bremsen vorne müssen gemacht werden. Was kostet das?“",
  lead:
    "Eine typische Anfrage – oft unvollständig. Maxim macht daraus einen nachvollziehbaren Kalkulationsvorschlag.",
  stages: [
    {
      icon: "request" as const,
      label: "Kundenanfrage",
      items: [
        "Bremsen vorne",
        "Kostenanfrage",
        "Noch ohne vollständige Fahrzeugdaten",
      ],
    },
    {
      icon: "process" as const,
      label: "Maxim verarbeitet",
      items: [
        "Fahrzeug / Modell",
        "Baujahr oder HSN-TSN, falls nötig",
        "Gewünschte Arbeit",
        "Relevante Fahrzeugdaten",
        "Teile- und Materialbedarf",
        "Arbeitszeit bzw. hinterlegte AW",
        "Werkstattspezifische Preise und Aufschläge",
      ],
    },
    {
      icon: "calc" as const,
      label: "Kalkulation",
      items: [
        "Bremsbeläge",
        "Bremsscheiben",
        "Arbeitszeit",
        "Kleinmaterial",
        "MwSt.",
      ],
      note: "Illustrative Positionen – ohne konkrete Beispielpreise.",
    },
    {
      icon: "offer" as const,
      label: "Angebotsvorschlag",
      items: [
        "Strukturierter Entwurf",
        "Zur Prüfung durch die Werkstatt",
        "Anpassung vor dem Versand möglich",
      ],
    },
  ],
} as const;

export const maximKfzRules = {
  eyebrow: "Individuell für Ihre Werkstatt",
  title: "Maxim kalkuliert nach Ihren Regeln",
  lead:
    "Je nach vorhandenen Daten und Systemen können unter anderem berücksichtigt werden:",
  items: [
    "Eigene Stundenverrechnungssätze",
    "Arbeitswerte / Arbeitszeiten",
    "Teilepreise",
    "Materialkosten",
    "Aufschläge",
    "Fahrzeugdaten",
    "Unterschiedliche Leistungsarten",
    "Mindestpreise",
    "Individuelle Kalkulationsregeln",
    "Bestehende Preislisten",
    "Vorhandene Daten aus bestehenden Systemen",
  ],
  note:
    "Welche Datenquellen und Systeme angebunden werden können, wird gemeinsam mit der Werkstatt geprüft.",
} as const;

export const maximKfzGains = {
  eyebrow: "Was die Werkstatt davon hat",
  title: "Konkrete Entlastung im Alltag",
  titleMark: "Entlastung",
  items: [
    {
      icon: "time" as const,
      title: "Weniger Zeit für Routineanfragen",
      text: "Wiederkehrende Kalkulationsschritte müssen nicht jedes Mal komplett manuell durchgeführt werden.",
    },
    {
      icon: "reply" as const,
      title: "Schnellere Rückmeldung an Interessenten",
      text: "Anfragen können direkt strukturiert aufgenommen und vorbereitet werden.",
    },
    {
      icon: "questions" as const,
      title: "Weniger Rückfragen",
      text: "Maxim kann fehlende Informationen bereits beim Kunden strukturiert abfragen.",
    },
    {
      icon: "uniform" as const,
      title: "Einheitlichere Angebote",
      text: "Kalkulationsregeln der Werkstatt können systematisch berücksichtigt werden.",
    },
    {
      icon: "control" as const,
      title: "Mitarbeiter behalten die Kontrolle",
      text: "Der Kalkulationsvorschlag kann vor dem Versand geprüft und angepasst werden.",
    },
    {
      icon: "clock" as const,
      title: "Auch außerhalb der Öffnungszeiten erreichbar",
      text: "Kunden können ihre Anfrage unabhängig von den Öffnungszeiten vollständig erfassen.",
    },
  ],
} as const;

export const maximKfzSteps = {
  eyebrow: "So funktioniert es",
  title: "Vier Schritte vom Anliegen zum Angebot",
  titleMark: "Vier Schritte",
  items: [
    {
      icon: "inbox" as const,
      title: "Anfrage",
      text: "Der Kunde beschreibt Fahrzeug und gewünschte Reparatur bzw. Leistung.",
    },
    {
      icon: "info" as const,
      title: "Informationen",
      text: "Maxim fragt die für die Kalkulation notwendigen Informationen ab.",
    },
    {
      icon: "calc" as const,
      title: "Kalkulation",
      text: "Maxim verarbeitet die Daten anhand der individuellen Regeln und verfügbaren Daten der Werkstatt.",
    },
    {
      icon: "check" as const,
      title: "Freigabe",
      text: "Die Werkstatt prüft den Vorschlag und sendet das Angebot an den Kunden.",
    },
  ],
} as const;

export const maximKfzFit = {
  eyebrow: "Einrichtung",
  title: "Passt sich Ihrer Werkstatt an – nicht umgekehrt.",
  lead:
    "Maxim ist kein fertiger Standard-Rechner mit festen Preisen. Die Lösung wird anhand der tatsächlichen Kalkulationslogik Ihrer Werkstatt eingerichtet.",
  checklistTitle: "Dafür prüfen wir gemeinsam:",
  items: [
    "Wie kalkulieren Sie heute?",
    "Welche Daten stehen zur Verfügung?",
    "Woher kommen Teilepreise?",
    "Wie werden Arbeitszeiten berechnet?",
    "Welche Regeln und Aufschläge verwenden Sie?",
    "Welche Informationen benötigt Ihre Werkstatt vom Kunden?",
    "Welche Systeme sollen später angebunden werden?",
  ],
} as const;

export const maximKfzCta = {
  title: "Kostenlose Anfrage stellen",
  text:
    "Wir schauen uns gemeinsam an, wie Ihre Werkstatt heute kalkuliert und ob sich der Prozess sinnvoll automatisieren lässt. Unverbindlich und kostenlos.",
  button: "Kostenlose Anfrage stellen",
  formTitle: "Kurz beschreiben – wir melden uns.",
  formButton: "Kostenlose Anfrage senden",
  formFields: {
    name: "Name",
    workshop: "Werkstatt",
    email: "E-Mail",
    phone: "Telefonnummer (optional)",
    website: "Website (optional)",
    process: "Wie erstellen Sie Angebote heute? (optional)",
  },
  formSuccess:
    "Danke. Ihre Anfrage ist vorbereitet – bitte senden Sie die geöffnete E-Mail ab, oder buchen Sie direkt einen Termin.",
} as const;

export const maximKfzFaq = [
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
] as const;

export const maximKfzTile = {
  navTitle: "KFZ-Werkstätten",
  tileLead: "Von der Kundenanfrage zum Kalkulationsvorschlag.",
  featuredTitle: "KFZ-Werkstätten",
  featuredLead:
    "Maxim nimmt Reparatur- und Serviceanfragen strukturiert auf, sammelt Fahrzeugdaten und benötigte Informationen und erstellt auf Basis Ihrer Kalkulationsregeln einen Angebotsvorschlag.",
  featuredCta: "Maxim für KFZ-Werkstätten ansehen",
} as const;
