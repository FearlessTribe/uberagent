import { services, type ServiceStat } from "./services";

export type { ServiceStat };

export interface ImpactRow {
  before: string;
  after: string;
}

export interface ServiceModalContent {
  eyebrow: string;
  bannerTag: string;
  lead: string;
  stats: ServiceStat[];
  ctaLabel: string;
  footerNote?: string;
  ctaHref?: string;
}

const footerNotes: Record<string, string> = {
  "corporate-gifting": "10% vom Warenwert je bestätigter Bestellung. Landet automatisch in Ihren Systemen.",
  "ai-revenue-engine": "Pilot für 1.000 €. Ergebnis in 10 Arbeitstagen.",
  "kalkulations-agent": "Kalkulationscheck: Zeit und Geld im Blick.",
  "vibe-coding-challenge": "Vibe Coding Challenge. 4 Wochen, bewertete Cases.",
};

const ctaHrefs: Record<string, string> = {
  "corporate-gifting": "https://calendly.com/supraflow/30min",
  "ai-revenue-engine": "https://calendly.com/supraflow/30min",
  "kalkulations-agent": "https://calendly.com/supraflow/30min",
  "vibe-coding-challenge": "https://calendly.com/supraflow/30min",
};

export const serviceModalMeta: Record<string, ServiceModalContent> = Object.fromEntries(
  services.map((s) => [
    s.id,
    {
      eyebrow: s.eyebrow,
      bannerTag: s.bannerTag,
      lead: s.lead,
      stats: s.stats,
      ctaLabel: s.ctaLabel,
      ...(footerNotes[s.id] ? { footerNote: footerNotes[s.id] } : {}),
      ...(ctaHrefs[s.id] ? { ctaHref: ctaHrefs[s.id] } : {}),
    },
  ]),
);

export const revenueToday = [
  "Vertrieb jagt Neukunden, Bestand liegt brach",
  "Niemand weiß, wer gerade kaufbereit ist",
  "Kontaktanlass wird manuell zusammengesucht",
  "Abwanderung fällt erst bei der Kündigung auf",
];

export const revenueWithUeberagent = [
  "Priorisierte Opportunity-Liste statt Bauchgefühl",
  "Jede Opportunity mit belegtem Kaufsignal",
  "Mail und Call-Briefing fertig im CRM",
  "Churn-Risiken werden sichtbar, bevor sie eskalieren",
];

export const revenueFlow = [
  {
    step: "01",
    title: "CRM- und Kundendaten anbinden",
    description:
      "Lesender Zugriff auf HubSpot, Salesforce, Pipedrive, Zoho, ERP oder schlicht einen CSV-Export. Keine Migration, keine Umstellung Ihrer Prozesse.",
    outcome: false,
  },
  {
    step: "02",
    title: "Öffentliche und interne Signale anreichern",
    description:
      "Kundenwebsites, Stellenanzeigen, Tech-Stack, Firmenregister, News sowie Ihre eigenen Nutzungs-, Support- und Rechnungsdaten. Pro Kunde entsteht ein aktuelles Signalprofil.",
    outcome: false,
  },
  {
    step: "03",
    title: "Opportunities erkennen",
    description:
      "Upsell, Cross-Sell, Renewal und Churn-Risiko, jeweils als eigenes Modell auf Ihr Leistungsportfolio trainiert.",
    outcome: false,
  },
  {
    step: "04",
    title: "Opportunity Score vergeben",
    description:
      "Kaufwahrscheinlichkeit, geschätzter Wert und Dringlichkeit ergeben eine Rangfolge. Ihr Vertrieb arbeitet die Liste von oben ab, statt zu raten.",
    outcome: false,
  },
  {
    step: "05",
    title: "Konkreten Verkaufsgrund generieren",
    description:
      "Kein „passt gut zum Profil“, sondern ein belegter Anlass: „Kunde hat zwei Performance-Marketing-Stellen ausgeschrieben und nutzt Ihr SEO-Paket seit 14 Monaten ohne Erweiterung.“",
    outcome: false,
  },
  {
    step: "06",
    title: "Outreach fertig ausformulieren",
    description:
      "Personalisierte E-Mail in Ihrer Tonalität plus ein Call-Briefing auf einer Seite: Anlass, Argumente, erwartete Einwände, Preisrahmen.",
    outcome: false,
  },
  {
    step: "07",
    title: "Zurück ins CRM, direkt an Ihr Sales-Team",
    description:
      "Als Task, Deal oder Notiz am Kundendatensatz. Ihr Vertrieb muss kein neues Tool lernen und öffnet morgens einfach das, was er ohnehin öffnet.",
    outcome: true,
  },
];

export const revenueGains = [
  {
    title: "Eine priorisierte Opportunity-Liste",
    text: "über 200 Ihrer Bestandskunden, sortiert nach Score und geschätztem Umsatzpotenzial.",
  },
  {
    title: "Pro Opportunity einen belegten Vertriebsanlass",
    text: "nachvollziehbar, mit Quelle, nicht generisch.",
  },
  {
    title: "Fertige Erstansprache",
    text: "je Opportunity: personalisierte E-Mail plus einseitiges Call-Briefing.",
  },
  {
    title: "Eine Potenzialschätzung für Ihren gesamten Kundenstamm",
    text: "hochgerechnet aus der Pilot-Stichprobe.",
  },
  {
    title: "Ein 45-minütiges Review",
    text: "in dem wir die Ergebnisse mit Ihrem Vertrieb durchgehen und die Treffer markieren.",
  },
  {
    title: "Eine klare Empfehlung",
    text: "ob und in welcher Ausbaustufe sich die Vollautomatisierung für Sie rechnet. Inklusive ehrlichem „lohnt sich nicht“, wenn die Daten das hergeben.",
  },
];

export const revenueRoiLines = [
  { label: "Investment Pilot", value: "1.000 €" },
  { label: "Analysierte Bestandskunden", value: "200" },
  { label: "Gelieferte Opportunities (Minimum)", value: "20" },
  { label: "Konservative Abschlussquote", value: "10 %" },
  { label: "Erwartete Abschlüsse", value: "2" },
  { label: "Annahme Zusatzumsatz je Abschluss", value: "3.000 €" },
  { label: "Zusatzumsatz aus dem Piloten", value: "6.000 €", total: true },
];

export const revenueIdealFor = [
  "mehrere hundert bis zehntausende Bestandskunden führen",
  "ein Portfolio mit mehreren Leistungen oder Produkten haben",
  "deren Vertrieb überwiegend reaktiv arbeitet",
  "deren CRM gepflegt, aber ungenutzt ist",
  "wachsen wollen, ohne den Vertrieb zu vergrößern",
  "Churn erst bemerken, wenn er passiert ist",
];

export const revenueImpact: ImpactRow[] = [
  { before: "Kundenstamm als Karteileiche", after: "Kundenstamm als Pipeline" },
  { before: "Vertrieb nach Bauchgefühl", after: "Priorisierung nach Opportunity Score" },
  { before: "Generische Ansprache", after: "Belegter Anlass pro Kunde" },
  { before: "Recherche vor jedem Call", after: "Fertiges Call-Briefing im CRM" },
  { before: "Churn als Überraschung", after: "Frühwarnung mit Handlungsempfehlung" },
  { before: "Wachstum über mehr Köpfe", after: "Wachstum über mehr Umsatz pro Kopf" },
];

export const revenueTimeline = [
  {
    title: "Kickoff",
    when: "Tag 1",
    detail:
      "45 Minuten Kickoff: Portfolio, Wunsch-Opportunity-Typ, Definition eines guten Kunden.",
  },
  {
    title: "Datenanbindung",
    when: "Tag 1-2",
    detail: "Sie exportieren 200 Kundendatensätze oder geben lesenden CRM-Zugriff.",
  },
  {
    title: "Signalanalyse",
    when: "Tag 3-6",
    detail: "Anreicherung, Scoring und Generierung der Verkaufsgründe.",
  },
  {
    title: "Briefings",
    when: "Tag 7-9",
    detail: "Erstellung von Mail und Call-Briefing je Opportunity, Qualitätsprüfung durch uns.",
  },
  {
    title: "Review",
    when: "Tag 10",
    detail: "45 Minuten Review mit Ihrem Vertrieb, Übergabe aller Materialien und Empfehlung.",
  },
];

export const revenueProofMetrics = [
  {
    value: "Produktionsreif",
    label: "Kein Prototyp. Laufende Systeme mit Monitoring, QA und Ownership im Kundenteam.",
  },
  {
    value: "DSGVO-konform",
    label: "Verarbeitung in der EU bzw. Schweiz, AV-Vertrag, keine Trainingsnutzung Ihrer Daten.",
  },
  {
    value: "Ihr Stack",
    label: "HubSpot, Salesforce, Pipedrive, Zoho, MS Dynamics, ERP oder CSV. Anbindung statt Ablösung.",
  },
  {
    value: "Ihr Ton",
    label: "Outreach wird auf Ihre bestehenden Gewinner-Mails kalibriert, nicht auf einen Standard.",
  },
];

export const revenueTiers = [
  {
    id: "pilot",
    cap: "Schritt 1 · Pilot",
    price: "1.000 €",
    note: "Festpreis · 10 Arbeitstage",
    featured: true,
    gate: "Go nur mit belastbarer Rechnung aus dem Review.",
    items: [
      "200 Bestandskunden analysiert",
      "1 Opportunity-Typ Ihrer Wahl",
      "Mind. 20 Opportunities mit Anlass",
      "Mail + Call-Briefing je Opportunity",
      "Potenzialhochrechnung Gesamtbestand",
      "Ergebnisgarantie",
    ],
  },
  {
    id: "implementation",
    cap: "Schritt 2 · Agent in Produktion",
    price: "8.000-20.000 €",
    note: "Einmalig · 6-10 Wochen",
    featured: false,
    items: [
      "Vollautomatisiert über den gesamten Bestand, Rückschrieb ins CRM ohne neues Tool",
      "Mehrere Opportunity-Modelle parallel",
      "Scoring auf Ihre historischen Abschlüsse trainiert",
      "Governance, QA und Monitoring",
      "Enablement für Ihr Vertriebsteam",
    ],
  },
  {
    id: "ops",
    cap: "Schritt 3 · Betrieb",
    price: "800-3.000 €",
    note: "Pro Monat · monatlich kündbar",
    featured: false,
    items: [
      "Laufende Signal- und Datenaktualisierung",
      "Modellpflege und Nachschärfung",
      "Neue Opportunity-Typen auf Zuruf",
      "Monatliches Performance-Reporting",
      "Support und Weiterentwicklung",
    ],
  },
];

export const revenuePathLead =
  "Pilot beweist. Agent automatisiert. Betrieb hält das System scharf.";

export const revenueDrivers = [
  "Kundenanzahl",
  "CRM und Stack",
  "Anzahl Opportunity-Typen",
];

export const revenueProductionRoi =
  "Ein durchschnittlicher Zusatzabschluss pro Monat trägt den Agenten.";

export const revenueFaq = [
  {
    question: "Wie viel Aufwand entsteht bei uns?",
    answer:
      "Rund zwei Stunden über die gesamten zehn Tage: 45 Minuten Kickoff, ein Datenexport oder ein lesender CRM-Zugang, 45 Minuten Review. Den Rest übernehmen wir.",
  },
  {
    question: "Was passiert mit unseren Kundendaten?",
    answer:
      "Verarbeitung ausschließlich in der EU beziehungsweise der Schweiz, auf Basis eines Auftragsverarbeitungsvertrags. Ihre Daten werden nicht zum Training von Modellen verwendet und nach dem Piloten auf Wunsch vollständig gelöscht. Für den Piloten reicht in der Regel ein pseudonymisierter Export.",
  },
  {
    question: "Unser CRM ist nicht besonders sauber gepflegt.",
    answer:
      "Das ist der Normalfall und selten ein Hindernis. Ein Großteil der Signale stammt aus öffentlichen Quellen. Firmenname und Website genügen als Ausgangspunkt. Wo Ihre internen Daten dünn sind, sagen wir Ihnen im Review genau, welche Felder den größten Hebel hätten.",
  },
  {
    question: "Welchen Opportunity-Typ sollten wir für den Piloten wählen?",
    answer:
      "Meist Upsell oder Cross-Sell, weil sich der Umsatz dort am schnellsten zeigt. Wenn Sie ein Abo- oder Retainer-Modell fahren, ist Churn-Frühwarnung häufig der wertvollere Einstieg. Wir entscheiden das im Kickoff gemeinsam.",
  },
  {
    question: "Ersetzt das unser Vertriebsteam?",
    answer:
      "Nein. Es ersetzt die Recherche, die Priorisierung und das Schreiben der Erstansprache. Das Gespräch, die Beziehung und der Abschluss bleiben bei Ihren Leuten. Sie führen nur deutlich mehr Gespräche, die Substanz haben.",
  },
  {
    question: "Und wenn der Pilot zeigt, dass sich das für uns nicht lohnt?",
    answer:
      "Dann sagen wir Ihnen das im Review und Sie haben für 1.000 € eine belastbare Antwort statt eines Projekts, das nach sechs Monaten versandet. Nicht jeder Kundenstamm trägt diese Mechanik. Genau dafür gibt es den Piloten.",
  },
];

export const revenueFinalMeta = [
  "Start innerhalb von 5 Tagen",
  "Festpreis 1.000 €",
  "Ergebnisgarantie",
  "Keine Vertragsbindung",
];

export const vibeHeadline =
  "Ihr größtes Automatisierungspotenzial kennt längst ein Mitarbeiter. Gefragt hat ihn nur nie jemand.";

export const vibeHeroNote = "Festpreis · Sandbox ohne Produktivdaten · Betriebsrat- und IT-tauglich";

export const vibeReasonsIntro =
  "Automatisierungsprojekte scheitern selten an der Technik. Sie scheitern daran, dass die falschen Prozesse ausgewählt wurden: von Menschen, die diese Prozesse nie selbst bearbeitet haben.";

export const vibeMatrixIntro =
  "Der Markt bietet aktuell zwei Dinge an: Tagesseminare, die Wissen vermitteln und dort enden. Und Innovations-Hackathons, die ein Event produzieren und dort enden. Beides erzeugt keine Einsparung.";

export const vibeFlowIntro =
  "Sechs Phasen über vier Wochen. Ihre Mitarbeitenden investieren rund zehn Stunden verteilt über den Zeitraum. Die Challenge läuft berufsbegleitend, nicht als Freistellung.";

export const vibePrizeIntro =
  "Der Preis ist kein Beiwerk. Er ist der Grund, warum Menschen mitmachen, die sonst kein Freiwilligenprojekt anfassen, und er macht Automatisierung intern zu etwas, das Anerkennung bringt statt Angst vor dem eigenen Arbeitsplatz.";

export const vibePrizeBody = [
  "Wir richten den Preis so ein, dass er in Ihrer Organisation trägt: Vorstellung der Gewinnerteams im Management-Meeting, Beitrag im Intranet, Nennung im internen Newsletter und ein physischer Preis, der im Büro stehen bleibt. Die materielle Prämie legen Sie fest. Wirksamer ist in fast allen Fällen die Sichtbarkeit gegenüber der Führungsebene.",
  "Nebeneffekt, den unsere Kunden regelmäßig unterschätzen: Die Challenge ist eines der stärksten Employer-Branding-Formate, die ein Konzern intern fahren kann. Mitarbeitende erleben, dass ihre Beobachtungen ernst genommen und tatsächlich gebaut werden.",
];

export const vibeRoiIntro =
  "Eine Challenge muss sich nicht über viele Cases rechnen. Sie muss sich über einen rechnen.";

export const vibeRoiPanel =
  "Nicht die Ersparnis eines Prototyps ist der Ertrag der Challenge, sondern die bewertete Pipeline: fünf bis zehn belastbare Automatisierungsfälle, die Sie sonst nie gefunden hätten. Jeder mit einer Zahl, gegen die Sie Budget rechnen können.";

export const vibeRoiFootnote =
  "Erfahrungs- und Beispielwerte, bewusst konservativ. Ihre realen Größen (Bereichsgröße, Vollkostensatz, Prozesslandschaft) setzen wir im Erstgespräch ein. Wenn die Rechnung für Ihren Bereich nicht aufgeht, sagen wir Ihnen das, bevor Sie beauftragen.";

export const vibeGuarantee =
  "Wenn aus der Challenge kein einziger Case hervorgeht, dem die Jury ein geschätztes Einsparpotenzial von mindestens 25.000 € pro Jahr zuspricht, stellen wir die Challenge nicht in Rechnung. Alle Prototypen, der Bewertungsreport und das aufgebaute Wissen bleiben trotzdem bei Ihnen.";

export const vibeAfterIntro =
  "Der Punkt, an dem vergleichbare Formate aufhören, ist der Punkt, an dem der Wert entsteht. Ein prämierter Prototyp spart noch nichts. Produktiv gestellt schon.";

export const vibeCallout =
  "Sie kaufen keine Schulung und kein Event. Sie kaufen eine bewertete Liste von Automatisierungsfällen aus Ihrem eigenen Haus, und einen Weg, sie zu bauen.";

export const vibeTiersIntro =
  "Sie starten klein, in einem Bereich, zum Festpreis. Alles Weitere entscheiden Sie auf Basis des Bewertungsreports, also anhand von Zahlen aus Ihrem eigenen Haus.";

export const vibeTiersFootnote =
  "Preise zzgl. MwSt. und Reisekosten. Die Pilot-Challenge ist bewusst so kalkuliert, dass sie unterhalb üblicher Freigabegrenzen für Bereichsleitungen liegt. Sie brauchen für den Einstieg kein Vorstandsbudget. Die Umsetzung wird erst beauftragt, wenn ein Business Case vorliegt.";

export const vibeFinalLead =
  "Im Erstgespräch legen wir den Pilotbereich fest, klären den Tool- und Datenrahmen und rechnen anhand Ihrer Bereichsgröße durch, welches Einsparpotenzial realistisch in Ihrem Haus liegt. 30 Minuten, ohne Pitch-Deck.";

export const vibeToday = [
  "Automatisierungsideen entstehen top-down in der IT",
  "Wer den Prozess kennt, wird nicht gefragt",
  "Das Vorschlagswesen sammelt Ideen, die nie gebaut werden",
  "KI-Schulungen erzeugen Wissen, aber kein Ergebnis",
];

export const vibeWithUeberagent = [
  "Ideen kommen von denen, die den Prozess täglich machen",
  "Aus jeder Idee entsteht ein lauffähiger Prototyp",
  "Jeder Case bekommt eine Zahl: geschätzte Ersparnis pro Jahr",
  "Die Gewinner gehen in die produktive Umsetzung",
];

export const vibeReasons = [
  {
    title: "Sie kennen den Prozess wirklich",
    text: "inklusive der Workarounds, Excel-Zwischenschritte und Doppelerfassungen, die in keiner Prozessdokumentation stehen.",
  },
  {
    title: "Sie wissen, was wirklich Zeit kostet",
    text: "nicht was auf dem Papier nach dem größten Hebel aussieht.",
  },
  {
    title: "Sie kennen die Ausnahmen",
    text: "und Ausnahmen sind der Grund, warum die meisten Automatisierungen im Betrieb scheitern.",
  },
  {
    title: "Sie tragen die Lösung mit",
    text: "was ein Team selbst gebaut hat, wird auch genutzt. Der Change-Aufwand entfällt fast vollständig.",
  },
  {
    title: "Sie brauchen dafür heute keine Entwickler mehr",
    text: "moderne KI-Werkzeuge lassen Fachanwender in Stunden bauen, wofür früher ein IT-Ticket und zwei Quartale nötig waren.",
  },
];

export const vibeMatrix = [
  {
    id: "training",
    cap: "Variante A",
    title: "Klassische KI-Schulung",
    win: false,
    price: "Marktüblich 650-790 € pro Kopf und Tag",
    items: [
      "Wissen, kein Ergebnis",
      "Generische Übungsbeispiele",
      "Kein Bezug zu Ihren Prozessen",
      "Kein Weg in die Umsetzung",
    ],
  },
  {
    id: "hackathon",
    cap: "Variante B",
    title: "Innovations-Hackathon",
    win: false,
    price: "Enterprise-Projektbudgets, meist fünfstellig",
    items: [
      "24-48 Stunden Eventformat",
      "Aufwand liegt in der Logistik",
      "Prototypen ohne Wirtschaftlichkeitsprüfung",
      "Ergebnisse versanden nach dem Event",
    ],
  },
  {
    id: "challenge",
    cap: "Unser Format",
    title: "AI Vibe Coding Challenge",
    win: true,
    price: "Pilot ab 4.900 € Festpreis",
    items: [
      "4 Wochen berufsbegleitend statt Event",
      "Eigene Prozesse statt Übungsaufgaben",
      "Jeder Case mit geschätzter Jahresersparnis",
      "Fester Umsetzungspfad für die Gewinner",
    ],
  },
];

export const vibeFlow = [
  {
    step: "01",
    when: "Woche 0",
    title: "Rahmen setzen",
    description:
      "Zielbereich, Teilnehmerkreis und Preisrahmen festlegen. Parallel klären wir Toolauswahl, Datenschutz und Sandbox mit IT, Compliance und Betriebsrat, bevor der erste Mitarbeitende etwas erfährt.",
    outcome: false,
  },
  {
    step: "02",
    when: "Woche 1",
    title: "Ideen-Workshop mit den Mitarbeitenden",
    description:
      "Halbtägig, moderiert. Wir arbeiten nicht mit „Was könnte KI?“, sondern mit „Was nervt Sie jeden Montag?“. Ergebnis ist eine strukturierte Liste realer Zeitfresser mit erster Aufwandsschätzung.",
    outcome: false,
  },
  {
    step: "03",
    when: "Woche 1",
    title: "Enablement-Workshop: Vibe Coding",
    description:
      "Ganztägig, hands-on. Ihre Mitarbeitenden lernen an ihrer eigenen Idee, wie sie daraus einen lauffähigen Prototyp bauen. Keine Programmierkenntnisse erforderlich. Am Ende des Tages hat jedes Team etwas, das läuft.",
    outcome: false,
  },
  {
    step: "04",
    when: "Woche 2-3",
    title: "Build-Phase mit technischem Support",
    description:
      "Die Teams bauen weiter. Wir halten zweimal wöchentlich offene Sprechstunden, lösen technische Blockaden und übernehmen die Teile, an denen Fachanwender realistisch scheitern: Schnittstellen, Datenzugriff, Deployment der Prototypen.",
    outcome: false,
  },
  {
    step: "05",
    when: "Woche 4",
    title: "Jury, Innovationspreis und Prämierung",
    description:
      "Jedes Team präsentiert fünf Minuten. Eine Jury aus Ihrem Management und unseren Engineers bewertet nach festen Kriterien. Die Gewinner erhalten Ihren internen Innovationspreis: sichtbar, im Haus, mit Namen.",
    outcome: false,
  },
  {
    step: "06",
    when: "Woche 4",
    title: "Bewertungsreport an die Geschäftsführung",
    description:
      "Alle eingereichten Cases mit geschätzter Jahresersparnis, Umsetzungsaufwand, technischem Risiko und klarer Empfehlung: produktiv umsetzen, nachschärfen oder verwerfen. Das ist das Dokument, mit dem Sie Budget bekommen.",
    outcome: true,
  },
];

export const vibeCriteria = [
  {
    name: "Wirtschaftliches Potenzial",
    weight: "40 %",
    width: 40,
    desc: "Geschätzte Einsparung pro Jahr in Stunden und Euro.",
  },
  {
    name: "Umsetzbarkeit",
    weight: "25 %",
    width: 25,
    desc: "Technischer Aufwand, Schnittstellen, regulatorische Hürden.",
  },
  {
    name: "Übertragbarkeit",
    weight: "20 %",
    width: 20,
    desc: "Lässt sich der Case auf andere Abteilungen oder Standorte ausrollen?",
  },
  {
    name: "Reifegrad des Prototyps",
    weight: "15 %",
    width: 15,
    desc: "Wie weit ist das Team tatsächlich gekommen?",
  },
];

export const vibeRoiLines = [
  { label: "Investment Pilot-Challenge", value: "4.900 €" },
  { label: "Teilnehmende Mitarbeitende", value: "25" },
  { label: "Erfahrungswert eingereichte Ideen", value: "30-50" },
  { label: "Davon mit echtem Automatisierungspotenzial", value: "5-10" },
  { label: "Ein umgesetzter Case spart typischerweise", value: "2-5 Std./Woche" },
  { label: "Bei 3 Std./Woche und 60 € Vollkosten", value: "≈ 9.400 €/Jahr" },
  { label: "Amortisation bei einem einzigen Case", value: "< 7 Monate", total: true },
];

export const vibeAfterFlow = [
  {
    step: "A",
    when: "1-2 Wochen",
    title: "Business Case erstellen",
    description:
      "Wir prüfen den Gewinner-Case belastbar durch: reale Mengengerüste, Vollkosten, Schnittstellen, Risiken und Betriebsaufwand. Ergebnis ist eine Vorlage, die einer Investitionsprüfung standhält. Inklusive ehrlicher Aussage, wenn der Case sie nicht besteht.",
    outcome: false,
  },
  {
    step: "B",
    when: "4-10 Wochen",
    title: "Professionelle Umsetzung",
    description:
      "Aus dem Prototyp wird produktionsreife Software: saubere Architektur, Anbindung an Ihre Systeme, Fehlerbehandlung, Rechte- und Rollenkonzept, Monitoring, Dokumentation. Preis nach Aufwand des jeweiligen Case, Festpreis nach dem Business Case.",
    outcome: false,
  },
  {
    step: "C",
    when: "laufend",
    title: "Inbetriebnahme und Realisierung des Potenzials",
    description:
      "Rollout im Fachbereich, Schulung der Anwender, Übergabe der Ownership und Messung: Wir weisen nach, ob die im Business Case versprochene Ersparnis tatsächlich eintritt. Optional Betrieb und Weiterentwicklung im Monatsmodell.",
    outcome: true,
  },
];

export const vibeIdealFor = [
  "viele manuelle Prozesse in Verwaltung, Service oder Produktion haben",
  "ein KI-Budget haben, aber keine priorisierte Use-Case-Liste",
  "ein Vorschlagswesen betreiben, aus dem selten etwas wird",
  "KI-Schulungen gemacht haben, ohne messbares Ergebnis",
  "Automatisierung intern positiv besetzen wollen",
  "mehrere Standorte oder Bereiche später ausrollen könnten",
];

export const vibeImpact: ImpactRow[] = [
  { before: "Use Cases werden geraten", after: "Use Cases kommen aus dem Prozess" },
  { before: "Ideen im Vorschlagskasten", after: "Lauffähige Prototypen" },
  { before: "KI als Schulungsthema", after: "KI als gebautes Ergebnis" },
  { before: "Automatisierung macht Angst", after: "Automatisierung bringt Anerkennung" },
  { before: "Schatten-IT im Verborgenen", after: "Kontrollierte Sandbox mit Governance" },
  { before: "Innovationsbudget ohne Nachweis", after: "Bewertete Cases mit Euro-Betrag" },
];

export const vibeTimeline = [
  {
    title: "Setup",
    when: "Woche 0",
    detail:
      "Zielbereich, Teilnehmerkreis und Preisrahmen festlegen. Parallel Toolauswahl, Datenschutz und Sandbox mit IT, Compliance und Betriebsrat klären.",
  },
  {
    title: "Ideen & Enablement",
    when: "Woche 1",
    detail:
      "Halbtägiger Ideen-Workshop, danach ganztägiges Vibe-Coding-Enablement an der eigenen Idee. Am Ende des Tages hat jedes Team etwas, das läuft.",
  },
  {
    title: "Build",
    when: "Woche 2",
    detail:
      "Die Teams bauen weiter. Offene Sprechstunden, Blockaden lösen, Schnittstellen und Datenzugriff dort übernehmen, wo Fachanwender realistisch scheitern.",
  },
  {
    title: "Build & Support",
    when: "Woche 3",
    detail:
      "Prototypen härten, in der Sandbox deployen, erste Einsparschätzung je Case. Noch keine Produktivdaten, noch kein Produktivsystem.",
  },
  {
    title: "Jury & Report",
    when: "Woche 4",
    detail:
      "Fünf-Minuten-Pitches, Bewertung nach festen Kriterien, Innovationspreis und Bewertungsreport an die Geschäftsführung.",
  },
];

export const vibeTimelineNote =
  "Ihr interner Aufwand: eine Ansprechperson für Organisation, zwei Termine für die Jury und die Freigabe des Tool- und Datenrahmens durch IT und Betriebsrat. Alles Übrige (Moderation, Workshops, technischer Support, Bewertung und Reporting) liegt bei uns.";

export const vibeGovernance = [
  {
    value: "Sandbox statt Produktivsystem",
    label:
      "Gebaut wird in einer abgeschotteten Umgebung mit anonymisierten oder synthetischen Daten. Kein Prototyp berührt im Wettbewerbszeitraum ein Produktivsystem.",
  },
  {
    value: "Betriebsrat eingebunden",
    label:
      "Wir liefern die Unterlagen für die Mitbestimmung mit: Zweckbindung, keine Leistungs- oder Verhaltenskontrolle, Freiwilligkeit der Teilnahme, Umgang mit den Ergebnissen.",
  },
  {
    value: "Schatten-IT wird sichtbar, nicht erzeugt",
    label:
      "Fachbereiche bauen bereits heute unkontrolliert mit KI-Tools. Die Challenge holt genau das in einen kontrollierten Rahmen mit Freigaben, Tool-Liste und Governance.",
  },
  {
    value: "EU AI Act und DSGVO",
    label:
      "Toolauswahl, Datenflüsse und Verarbeitungsorte werden vorab mit Ihrer Compliance abgestimmt. Jeder Case erhält im Report eine Ersteinordnung nach Risikoklasse.",
  },
];

export const vibeTiers = [
  {
    id: "pilot",
    cap: "Schritt 1 · Pilot-Challenge",
    price: "4.900 €",
    note: "Festpreis · 4 Wochen · 1 Bereich",
    featured: true,
    items: [
      "Bis 25 Teilnehmende",
      "Ideen-Workshop (halbtägig)",
      "Vibe-Coding-Enablement (ganztägig)",
      "Sandbox-Setup und Tool-Freigaben",
      "4 Support-Sprechstunden",
      "Jury, Innovationspreis, Prämierung",
      "Bewertungsreport für die Geschäftsführung",
      "Ergebnisgarantie",
    ],
  },
  {
    id: "scale",
    cap: "Schritt 2 · Challenge Scale",
    price: "ab 25.000 €",
    note: "8-10 Wochen · mehrere Bereiche",
    featured: false,
    items: [
      "Bereichs- oder konzernweiter Rollout",
      "Mehrere Standorte, auch mehrsprachig",
      "Interne Kampagne und Kommunikation",
      "Mehrstufiges Jury-Verfahren",
      "Enablement von internen Multiplikatoren",
      "Aufbau eines dauerhaften Innovationsformats",
    ],
  },
  {
    id: "build",
    cap: "Schritt 3 · Umsetzung",
    price: "Preis je Case",
    note: "Festpreis nach Business Case",
    featured: false,
    items: [
      "Business Case ab 2.500 € je Fall",
      "Produktive Umsetzung typischerweise 15.000-60.000 €",
      "Inbetriebnahme und Anwenderschulung",
      "Nachweis der realisierten Ersparnis",
      "Optional Betrieb ab 1.500 €/Monat",
    ],
  },
];

export const vibeFaq = [
  {
    question: "Brauchen unsere Mitarbeitenden Programmierkenntnisse?",
    answer:
      "Nein. Das Enablement ist für Fachanwender ausgelegt: Sachbearbeitung, Einkauf, Controlling, Service, HR, Produktion. Wer Excel-Formeln erträgt, kommt damit zurecht. Alles, was echte Entwicklungsarbeit erfordert, übernehmen wir in den Sprechstunden.",
  },
  {
    question: "Wie stellen wir sicher, dass keine Schatten-IT entsteht?",
    answer:
      "Genau umgekehrt: Fachbereiche bauen bereits heute mit KI-Tools, nur unkontrolliert. Die Challenge holt das in einen definierten Rahmen: freigegebene Tool-Liste, abgeschottete Sandbox, keine Produktivdaten, dokumentierte Ergebnisse. Alles, was in Produktion gehen soll, durchläuft anschließend unsere reguläre Umsetzung mit Architektur, Rechte- und Rollenkonzept und Monitoring.",
  },
  {
    question: "Was sagt der Betriebsrat dazu?",
    answer:
      "In der Regel wenig, wenn drei Punkte von Anfang an stehen: Teilnahme ist freiwillig, es findet keine Leistungs- oder Verhaltenskontrolle statt, und es geht nicht um Personalabbau. Wir liefern die Unterlagen für die Mitbestimmung mit und nehmen auf Wunsch am Gespräch teil. Erfahrungsgemäß ist die Challenge für Arbeitnehmervertretungen eher ein Argument: Mitarbeitende gestalten Automatisierung mit, statt sie vorgesetzt zu bekommen.",
  },
  {
    question: "Werden hier Arbeitsplätze wegautomatisiert?",
    answer:
      "Die Cases, die aus solchen Formaten entstehen, betreffen fast ausschließlich Tätigkeiten, die ohnehin niemand gerne macht: Daten übertragen, Listen abgleichen, Standardauskünfte erteilen, Berichte zusammenkopieren. Wir empfehlen, das offen zu kommunizieren und die Zielsetzung im Kickoff explizit zu benennen. Verdeckte Rationalisierungsabsichten sind der sicherste Weg, eine Challenge scheitern zu lassen.",
  },
  {
    question: "Was passiert mit unseren Daten während der Challenge?",
    answer:
      "Gebaut wird mit anonymisierten oder synthetischen Daten in einer abgeschotteten Umgebung. Verarbeitung in der EU beziehungsweise der Schweiz, auf Basis eines Auftragsverarbeitungsvertrags. Toolauswahl und Datenflüsse stimmen wir vor dem Kickoff mit Ihrer IT-Sicherheit und Compliance ab.",
  },
  {
    question: "Wir haben bereits ein Ideenmanagement. Ist das nicht doppelt?",
    answer:
      "Es ergänzt es an genau der Stelle, an der klassisches Vorschlagswesen scheitert: zwischen Idee und Nachweis. Ein Vorschlag im Kasten ist ein Satz. Aus der Challenge kommt ein lauffähiger Prototyp mit geschätzter Jahresersparnis. Auf Wunsch koppeln wir die Challenge direkt an Ihr bestehendes Prämienmodell.",
  },
  {
    question: "Wie viel Zeit kostet das unsere Mitarbeitenden?",
    answer:
      "Rund zehn Stunden über vier Wochen: ein halber Tag Ideen-Workshop, ein Tag Enablement, danach freiwilliger Aufwand in der Build-Phase. Das Format ist berufsbegleitend ausgelegt, eine Freistellung ist nicht erforderlich.",
  },
  {
    question: "Und wenn nichts Verwertbares dabei herauskommt?",
    answer:
      "Dann greift die Ergebnisgarantie und wir stellen die Challenge nicht in Rechnung. Nach unserer Erfahrung ist das unwahrscheinlich: 25 Menschen, die täglich mit Ihren Prozessen arbeiten, finden verlässlich mehr als einen Fall mit fünfstelligem Jahrespotenzial. Das Risiko dafür tragen wir, nicht Sie.",
  },
];

export const vibeFinalMeta = [
  "Start in 3 Wochen",
  "Festpreis ab 4.900 €",
  "Ergebnisgarantie",
  "Keine Vertragsbindung",
];

export const gtmBenefits = [
  "Sauberere ICP-, TAM- und Signalmodelle für bessere Priorisierung",
  "Weniger manuelle Listenarbeit, Briefings und Handoffs zwischen Teams",
  "Schnellere Reaktion auf Kauf-, Nutzungs- und Markt-Signale",
  "Personalisierte Outbound- und Follow-up-Workflows über Ihren Stack",
  "Monitoring, QA und Ownership für nachhaltigen Betrieb im Team",
];

export const gtmImpact: ImpactRow[] = [
  { before: "Fragmentierte Tools & Tabellen", after: "Eine GTM-Ausführungsschicht" },
  { before: "Manuelle Account-Recherche", after: "Automatisiertes Enrichment" },
  { before: "Unklare Priorisierung", after: "Signal-basiertes Scoring" },
  { before: "Generische Outreach", after: "Kontextuelle Personalisierung" },
  { before: "Keine QA", after: "Governance & Monitoring" },
];

export const gtmIdealFor = [
  "Wachsender Tech-Stack mit fragmentierten Daten",
  "Zu viel manuelle Arbeit in Marketing, Sales und RevOps",
  "Unklare Signale und schwache Priorisierung",
  "Teams, die Pipeline pro Kopf steigern wollen",
];

export const mcpValueProps = [
  {
    title: "AI Agents mit echtem Datenzugriff",
    description:
      "Agents greifen auf Kundendaten, Tickets, Dokumente und Reports zu, kontextbezogen statt isoliert.",
  },
  {
    title: "Sichere Aktionen in Live-Systemen",
    description:
      "Nicht nur lesen: Datensätze anlegen, Status ändern, Workflows auslösen, mit klaren Grenzen.",
  },
  {
    title: "Standard statt Einzellösung",
    description:
      "MCP strukturiert Tools, Ressourcen und Aktionen, wartbar, erweiterbar, zukunftssicher.",
  },
];

/** @deprecated Prefer use cases on the MCP page; kept for reference. */
export const mcpImpact: ImpactRow[] = [
  { before: "Fragile Prompt-Basteleien", after: "Standardisierte MCP-Schnittstelle" },
  { before: "Unsichere API-Zugriffe", after: "OAuth, Rollen & Audit Logs" },
  { before: "Isolierte Chatbots", after: "Agents mit Systemkontext" },
  { before: "Schwer wartbar", after: "Erweiterbare Connector-Architektur" },
];

export const agentPrinciples = [
  {
    label: "Kontrolle",
    title: "Automatisieren, ohne Kontrolle abzugeben",
    description:
      "Wir definieren, was ein Agent selbst tun darf, wo er eskalieren muss und wann ein Mensch freigibt.",
  },
  {
    label: "Integration",
    title: "In bestehende Systeme eingebunden",
    description:
      "CRMs, Ticketsysteme, Postfächer und interne Workflows, der Agent arbeitet dort, wo Ihr Team arbeitet.",
  },
  {
    label: "Messbarkeit",
    title: "Kontrolliert skalieren",
    description:
      "Der Agent startet fokussiert auf einen Use Case, wird gemessen und Schritt für Schritt erweitert.",
  },
];

export const agentBenefits = [
  "Mehr Produktivität, Routine läuft automatisch",
  "Weniger Aufwand, weniger Copy-Paste und Rückfragen",
  "Schnellere Prozesse, Informationen fliessen automatisch",
  "Bessere Entscheidungen, strukturierte, aktuelle Daten",
  "Skalierbarkeit, mehr Volumen ohne mehr Personal",
];

export const agentFit = {
  good: [
    "Wiederkehrende Aufgaben binden viel Zeit",
    "Informationen aus mehreren Quellen müssen zusammen",
    "Teams sollen entlastet werden ohne Kontrollverlust",
  ],
  bad: [
    "Jede Entscheidung braucht stark individuelles Urteil",
    "Keine klaren Regeln oder Prozessgrenzen vorhanden",
  ],
};

export const agentImpact: ImpactRow[] = [
  { before: "Manuelle Triage & Routing", after: "Automatische Weiterleitung" },
  { before: "Recherche vor jedem Termin", after: "Vorbereitete Briefings" },
  { before: "Unsaubere Stammdaten", after: "Proaktive Datenpflege" },
  { before: "Vergessene Follow-ups", after: "Überwachte Nachverfolgung" },
];

export const businessExperiments = [
  {
    title: "Problem validieren",
    description: "Existiert das Problem wirklich? Zahlen Kunden dafür?",
    metric: "Interviews · Landing Pages · Wartelisten",
  },
  {
    title: "Lösung testen",
    description: "Löst unser Ansatz das Problem messbar?",
    metric: "Prototyp · Concierge MVP · Pilotkunden",
  },
  {
    title: "Kanal prüfen",
    description: "Wie erreichen wir die Zielgruppe wirtschaftlich?",
    metric: "CAC · Conversion · Channel-Tests",
  },
  {
    title: "Unit Economics",
    description: "Trägt das Modell bei Skalierung?",
    metric: "LTV · Margen · Payback",
  },
];

export const businessImpact: ImpactRow[] = [
  { before: "Bauen und hoffen", after: "Hypothesen getestet" },
  { before: "Monate Entwicklung", after: "Wochen bis zur Klarheit" },
  { before: "Intuitions-Entscheidungen", after: "Datenbasiertes Go/No-Go" },
  { before: "Hohes Investitionsrisiko", after: "Gestufte Validierung" },
];

export const strategyFunnel = [
  {
    step: "01",
    title: "Collect Ideas",
    icon: "collect",
    phase: "Ideation",
    description:
      "Ein breites Spektrum relevanter AI-Use-Cases identifizieren und strategische Blind Spots vermeiden.",
    detail:
      "Ideen werden in Discovery-Workshops mit Stakeholdern konkretisiert: Problem, Anforderungen, Prozesse, Risiken, Auswirkungen, Abhängigkeiten. Danach liegen Zahlen für die quantitative Bewertung vor.",
    outcome: "Dynamisches Portfolio als Grundlage für die AI-Roadmap",
  },
  {
    step: "02",
    title: "Analysis & Scoring",
    icon: "score",
    phase: "Priorisierung",
    description:
      "Überführung in eine quantitative Bewertung, um jeden Use Case im Portfolio einzuordnen.",
    detail:
      "Fünf Dimensionen, Business Value, AI Fit, Feasibility & Cost, Time-to-Value, Risk & Compliance, liefern eine belastbare Entscheidungsgrundlage für die Investition.",
    outcome: "Transparente Ranking-Heatmap statt Bauchgefühl",
  },
  {
    step: "03",
    title: "Deep Dive",
    icon: "deepdive",
    phase: "Validierung",
    description:
      "Top-Kandidaten werden zu entscheidungsreifen Investment Cases verdichtet.",
    detail:
      "Lösungsbild (Scope, MVP, Architektur), Business Case (Nutzen, Kosten, Amortisation) und Machbarkeit & Risiken (Abhängigkeiten, Compliance, Betrieb) werden gemeinsam geschärft.",
    outcome: "Entscheidungsreifer Investment Case",
  },
  {
    step: "04",
    title: "Decide",
    icon: "decide",
    phase: "Portfolio",
    description:
      "Klare Portfolioentscheidung über Budget, Verantwortlichkeiten, Zeitplan und nächste Schritte.",
    detail:
      "Jedes Vorhaben landet in einer der Optionen Build, Buy, Pivot, Kill oder Defer, mit Commitment der Entscheider und nachvollziehbarer Begründung.",
    outcome: "Commitment, Budget und Owner sind gesetzt",
  },
  {
    step: "05",
    title: "MVP",
    icon: "build",
    phase: "Validierung in Produktion",
    description:
      "Den kleinsten nutzbaren Scope bauen, und mit echten Nutzungsdaten entscheiden, ob weiter oder Abbruch.",
    detail:
      "Kurze Sprints, priorisierte Features, frühe Tests. Erfolgskriterien und Monitoring sind vor dem Start klar. Quality- und Compliance-Gates sichern die Produktionsreife.",
    outcome: "Messbarer MVP: Go, Anpassen oder Stop",
  },
  {
    step: "06",
    title: "Roll Out",
    icon: "rollout",
    phase: "Einführung",
    description:
      "Gesteuertes Ausrollen in die Organisation, mit Enablement und klaren Verantwortlichkeiten.",
    detail:
      "Dokumentation, Basistraining, AI Champions und rollenspezifische Workshops. Nutzer werden segmentiert, Adoption wird aktiv gesteuert.",
    outcome: "Kontrollierte Einführung mit messbarer Adoption",
  },
  {
    step: "07",
    title: "Scaling",
    icon: "scale",
    phase: "Werthebel",
    description:
      "Nur skalieren, was den Impact belegt hat, Adoption, Retention und Nutzen systematisch steigern.",
    detail:
      "Hürden beseitigen, Produkt und Prozesse verbessern, Reichweite erhöhen. Skalierung ist kein Automatismus, sondern die Folge belegten Werts.",
    outcome: "Skalierter Impact mit klarer Governance",
  },
];

export const strategyIdeaSources = [
  {
    id: "research",
    title: "Research",
    description:
      "Branchenstudien & Industriereports, Technologie- und Markttrends, Wettbewerb und übertragbare Lösungen.",
  },
  {
    id: "crowd",
    title: "Crowd-Sourcing",
    description:
      "Kontinuierliche Ideeneinreichung durch Mitarbeitende sowie gezielte, incentivierte Challenges für priorisierte Geschäftsprobleme.",
  },
];

export const strategyScoreDimensions = [
  {
    id: "value",
    title: "Business Value",
    short: "Value",
    question: "Wie groß ist der messbare Nutzen?",
    detail: "Effizienz, Umsatz, strategischer Beitrag und Reichweite.",
  },
  {
    id: "fit",
    title: "AI Fit",
    short: "AI Fit",
    question: "Wie gut eignet sich AI zur Lösung?",
    detail: "Lösungsgrad, Datenqualität, AI-Eignung und Human-in-the-Loop.",
  },
  {
    id: "feasibility",
    title: "Feasibility & Cost",
    short: "Feasibility",
    question: "Wie realistisch ist die Umsetzung?",
    detail: "Komplexität, Integration, Entwicklungs-, Betriebs- und Change-Aufwand.",
  },
  {
    id: "ttv",
    title: "Time-to-Value",
    short: "TTV",
    question: "Wie schnell entsteht produktiver Nutzen?",
    detail: "Zeit bis MVP, produktivem Einsatz, Break-even und Skalierung.",
  },
  {
    id: "risk",
    title: "Risk & Compliance",
    short: "Risk",
    question: "Welche Risiken begrenzen den Einsatz?",
    detail: "Qualität, Sicherheit, Transparenz, Datenschutz und Regulierung.",
  },
];

export const strategyPortfolioZones = [
  {
    id: "build",
    title: "Build",
    label: "Hoher Value · tragbares Risiko",
    description: "Priorisierte Umsetzungen mit klarem Business Case und machbarer Delivery.",
  },
  {
    id: "derisk",
    title: "De-Risk",
    label: "Hoher Value · erhöhtes Risiko",
    description: "Potenzial hoch, aber erst Risiken, Daten oder Abhängigkeiten absichern.",
  },
  {
    id: "pivot",
    title: "Pivot",
    label: "Mittlerer Value · offen",
    description: "Richtung stimmt, Scope oder Ansatz muss angepasst werden.",
  },
  {
    id: "kill",
    title: "Kill",
    label: "Niedriger Value · hohes Risiko",
    description: "Bewusst stoppen, Kapazität für wirkungsvollere Cases freimachen.",
  },
];

export const strategyDeepDive = [
  {
    title: "Lösungsbild",
    question: "Was bauen wir?",
    description: "Scope, MVP, Architektur und Roadmap.",
  },
  {
    title: "Business Case",
    question: "Lohnt es sich?",
    description: "Nutzen, Kosten, Amortisation und Skalierung.",
  },
  {
    title: "Machbarkeit & Risiken",
    question: "Können wir es umsetzen?",
    description: "Architektur, Abhängigkeiten, Compliance und Betrieb.",
  },
];

export const strategyDecisions = [
  {
    id: "build",
    title: "Build",
    muted: false,
    description: "Hoher Value, guter AI Fit, tragbare Risiken, intern oder mit Partner umsetzen.",
  },
  {
    id: "buy",
    title: "Buy",
    muted: false,
    description: "Marktstandard deckt den Need ab; schneller Time-to-Value ohne Eigenbau.",
  },
  {
    id: "pivot",
    title: "Pivot",
    muted: false,
    description: "Kernidee stimmt, Scope oder Ansatz muss angepasst werden.",
  },
  {
    id: "kill",
    title: "Kill",
    muted: false,
    description: "Value zu niedrig oder Risiko/Komplexität zu hoch, bewusst stoppen.",
  },
  {
    id: "defer",
    title: "Defer",
    muted: true,
    description: "Potenzial vorhanden, aber Abhängigkeiten oder Timing sprechen gegen jetzt.",
  },
];

export const strategyGovernance = [
  {
    title: "Steuerbar & planbar",
    description:
      "Durch klare Governance steuerbar. Frühzeitig Risiken minimieren und Abhängigkeiten erfassen, und so planbar bleiben.",
  },
  {
    title: "Vertrauen & Ressourcen",
    description:
      "Schafft Vertrauen in der Organisation und setzt damit Ressourcen auch langfristig frei.",
  },
  {
    title: "Quality & Compliance",
    description:
      "Quality- & Compliance-Gates sichern hohe Umsetzungsqualität und gewährleisten regulatorische Exzellenz.",
  },
];

export const strategyMvpChecks = [
  {
    title: "Nutzungsdaten lesen",
    description: "Adoption, Aufgabenerfolg und Feedback zeigen, ob der MVP trägt.",
  },
  {
    title: "Go / Anpassen / Stop",
    description: "Entscheidung auf Evidenz: weiter investieren, Scope ändern oder abbrechen.",
  },
  {
    title: "Gates einhalten",
    description: "Erfolgskriterien, Monitoring, Human-in-the-Loop und Compliance vor dem Scale.",
  },
];

export const strategyRolloutLevers = [
  {
    title: "Enablement aufbauen",
    description: "Dokumentation, Basistraining, AI Champions und klare Verantwortlichkeiten.",
  },
  {
    title: "Nutzer segmentieren",
    description: "Rollenspezifische Trainings, Workshops und reale Use Cases.",
  },
  {
    title: "Adoption steuern",
    description: "Einführung in Wellen, Support-Pfade und sichtbare Ownership je Segment.",
  },
];

export const strategyScalingLevers = [
  {
    title: "Reichweite erhöhen",
    description: "Von Pilotgruppen zu Organisationseinheiten, nur wo Nutzen belegt ist.",
  },
  {
    title: "Wert maximieren",
    description: "Retention, Zufriedenheit und Aufgabenerfolg systematisch steigern.",
  },
  {
    title: "Kontinuierlich optimieren",
    description: "Hürden beseitigen, Produkt und Prozesse verbessern, Run-Kosten im Blick behalten.",
  },
];

export const strategyExampleAgents = [
  {
    id: "presentation",
    title: "Presentation Agent",
    problem:
      "Präsentationen sind zeitaufwändig, inkonsistent und oft nicht auf dem neuesten Stand.",
    promise:
      "Vom generischen Foliensatz zur aktuellen, kundenspezifischen und datenbasierten Vertriebsstory.",
    outcomes: [
      "Deutlich weniger Zeit für Recherche und Folienaufbau",
      "Kundenspezifisch statt Standard-Pitches",
      "Aktuelle, belastbare Inhalte direkt aus den Systemen",
    ],
    system: [
      { role: "Research", task: "Interne & externe Quellen erschließen" },
      { role: "Storyline", task: "Narrative Struktur und Slide-Logik" },
      { role: "Content", task: "Assets, Visuals und Medien finden" },
      { role: "Design", task: "CI, Layout und visuelle Hierarchie" },
      { role: "Review", task: "Konsistenz, Qualität, Markenkonformität" },
    ],
  },
  {
    id: "crm",
    title: "CRM Enrichment Agent",
    problem:
      "Kundendaten liegen verteilt in verschiedenen Systemen und werden nicht konsistent im CRM gepflegt.",
    promise:
      "Von fragmentierten Daten zum vollständigen, aktuellen und verlässlichen Kundenprofil.",
    outcomes: [
      "Vollständigere und aktuellere CRM-Daten",
      "Automatische Erkennung relevanter Kundeninformationen",
      "Quellen, Aktualität und Confidence Score je Information",
    ],
    system: [
      { role: "Collect", task: "CRM, ERP, PIM und externe Quellen" },
      { role: "Match", task: "Kunden, Kontakte, Projekte zuordnen" },
      { role: "Validate", task: "Aktualität und Confidence bewerten" },
      { role: "Write-back", task: "Profil im CRM konsistent pflegen" },
    ],
  },
  {
    id: "sales",
    title: "Sales Agent",
    problem:
      "Im CRM liegen viele Informationen, aber der Vertrieb hat wenig Zeit, daraus relevante Chancen abzuleiten.",
    promise:
      "Vom Kundenprofil zur evidenzbasierten Next Best Sales Action.",
    outcomes: [
      "Priorisierte Chancen mit Bedarf und Evidenz",
      "Bewertung nach Dringlichkeit, Wahrscheinlichkeit und Deal-Potenzial",
      "Upgrade, Upselling, Cross-Selling und Retention als klare Opportunity-Typen",
    ],
    system: [
      { role: "Signals", task: "CRM-, Projekt-, Markt- und Verhaltenssignale" },
      { role: "Score", task: "Dringlichkeit, Wahrscheinlichkeit, Potenzial" },
      { role: "Recommend", task: "Max. fünf priorisierte Next Actions" },
      { role: "Evidence", task: "Jede Empfehlung nachvollziehbar begründen" },
    ],
  },
];

export const strategyImpact: ImpactRow[] = [
  { before: "Ein paar Cases ohne Klarheit zum Impact", after: "Priorisiertes AI-Portfolio mit messbarem Nutzen" },
  { before: "Bauchtentscheidungen & Lobbying", after: "Fünf Dimensionen, ein transparentes Ranking" },
  { before: "PoCs ohne Exit-Kriterien", after: "Build · Buy · Pivot · Kill · Defer" },
  { before: "Skalieren ohne Evidenz", after: "MVP → Messen → Roll-out → Scale-Gate" },
];

export const trainingModules = [
  {
    title: "Operating Model",
    description: "Rollen, Freigaben, Escalation Paths und Ownership für produktive AI-Systeme.",
  },
  {
    title: "Hands-on Workflows",
    description: "Ihr Team übt an realen Cases: Prompting, QA, Monitoring und Fehlerpfade.",
  },
  {
    title: "Systemverständnis",
    description: "MCP, Agents und Integrationen so erklären, dass Fach- und Tech-Teams dieselbe Sprache sprechen.",
  },
  {
    title: "Übergabe & Docs",
    description: "Runbooks, Checklisten und Dashboards, damit Wissen nicht an Einzelpersonen hängt.",
  },
];

export const trainingImpact: ImpactRow[] = [
  { before: "Abhängigkeit vom Builder", after: "Team kann Systeme betreiben" },
  { before: "Ad-hoc Prompting", after: "Klare Guardrails und QA" },
  { before: "Unklare Ownership", after: "Definierte Rollen und Escalation" },
  { before: "Einmalige Demo", after: "Nachhaltiges Enablement" },
];

export const giftingToday = [
  "Bestellungen kommen unregelmäßig",
  "Zu Weihnachten viel, den Rest des Jahres wenig",
  "Geburtstage und Jubiläen gehen unter",
  "Ihr Team sucht Anlässe und bestellt von Hand",
];

export const giftingWithUeberagent = [
  "Jeden Monat planbare Aufträge",
  "Budget vom Kunden, zu Ostern und Weihnachten höher",
  "Vorschläge aus Ihrem Sortiment",
  "Nach Freigabe Bestellung in Ihren Systemen",
];

export const giftingHowIntro =
  "Fünf Schritte vom Marketplace bis zur Bestellung. Ihr Kunde legt Budget und Regeln fest. Vorschläge kommen aus Ihrem Sortiment. Der Account Manager Ihres Kunden bestätigt.";

export const giftingFlow = [
  {
    step: "01",
    title: "Installieren",
    icon: "window" as const,
    logos: true,
    description:
      "Die App kommt über den HubSpot Marketplace ins CRM Ihres Kunden. Nichts vor Ort, kein IT-Projekt. Salesforce, Pipedrive und Dynamics folgen.",
    outcome: false,
  },
  {
    step: "02",
    title: "Budget und Regeln",
    icon: "wallet" as const,
    logos: false,
    description:
      "Ihr Kunde legt das monatliche Budget fest. Weihnachten und Ostern sind immer höher. Optionale Regeln kommen dazu. Ihr Sortiment hinterlegen Sie.",
    outcome: false,
  },
  {
    step: "03",
    title: "Anlässe finden",
    icon: "calendar" as const,
    logos: false,
    description:
      "Jubiläum, Projektabschluss, Geburtstag. Jeden Monat, nicht nur zu Weihnachten.",
    outcome: false,
  },
  {
    step: "04",
    title: "Vorschlagen",
    icon: "gift" as const,
    logos: false,
    description:
      "Nur Artikel aus Ihrem Sortiment. Im Budget Ihres Kunden und unter der 50-Euro-Grenze. Nur in Ausnahmen darüber.",
    outcome: false,
  },
  {
    step: "05",
    title: "Bestätigen und bestellen",
    icon: "check" as const,
    logos: false,
    description:
      "Der Account Manager Ihres Kunden bestätigt. Die Bestellung landet automatisch in Ihren Systemen. Wird abgelehnt: neuer Vorschlag, oder Sie erarbeiten ihn gemeinsam.",
    outcome: true,
  },
];

/** Wer macht was: Hersteller vs. Kunde vs. Account Manager */
export const giftingRoles = [
  {
    who: "Ihr Kunde",
    title: "Budget, Regeln, HubSpot",
    text: "Er lässt die App im eigenen HubSpot zu und legt monatliches Budget fest. Weihnachten und Ostern sind immer höher. Optionale Regeln dazu.",
  },
  {
    who: "Sie",
    title: "Ihr Sortiment",
    text: "Sie hinterlegen die Artikel, aus denen vorgeschlagen wird. Nur Ihr Katalog, keine Fremdprodukte.",
  },
  {
    who: "Account Manager",
    title: "Bestätigt, dann Auftrag bei Ihnen",
    text: "Der Account Manager Ihres Kunden gibt frei. Danach landet die Bestellung automatisch in Ihren Systemen. Ohne Bestätigung geht nichts raus.",
  },
];

export const giftingRolesIntro =
  "Das Produkt landet im HubSpot Ihres Kunden. Er steuert Budget und Regeln. Sie liefern das Sortiment. Nach Freigabe kommt die Bestellung bei Ihnen an.";

/** Durchgespielter Monat statt Billboard-Annahmen */
export const giftingScenario = {
  title: "Ein Monat, konkret",
  intro:
    "Beispielrechnung für einen betreuten HubSpot-Kunden. Keine gemessenen Ergebnisse. Im Gespräch rechnen wir das an Ihrem Bestand durch.",
  account: "Müller GmbH",
  rows: [
    { label: "Anlässe im Monat", value: "Jubiläum, Projektabschluss, Geburtstag" },
    { label: "Vorschlag", value: "Leder-Notizbuch aus Ihrem Katalog" },
    { label: "Preis", value: "48 € · unter der 50-Euro-Grenze" },
    { label: "Freigabe", value: "Account Manager bestätigt · Bestellung in Ihren Systemen" },
  ],
  year: [
    { value: "8 Anlässe", label: "pro betreutem Kunden und Jahr, statt einer Weihnachtssendung" },
    { value: "12 Accounts", label: "Beispielbestand: so viele betreute HubSpot-Kunden" },
    { value: "~6 Std.", label: "weniger Handarbeit im Innendienst pro Monat, sobald Anlässe nicht mehr gesucht werden" },
  ],
};

export const giftingQuotes = [
  {
    quote: "Seit wir das einsetzen, ist unser Geschäft planbarer geworden.",
    name: "Name",
    role: "Position",
    company: "Werbeartikelhersteller",
  },
  {
    quote: "Unsere Kunden lieben es, keinen Anlass mehr zu verpassen.",
    name: "Name",
    role: "Position",
    company: "Werbeartikelhersteller",
  },
];

export const giftingPricing = {
  rate: "10%",
  note: "vom Warenwert je bestätigter Bestellung",
  intro: "Keine Seat-Gebühr, keine Monatsstufen. Sie zahlen nur, wenn bestellt wird.",
  items: [
    "10% vom Warenwert jeder bestätigten Bestellung",
    "Budget und Regeln legt Ihr Kunde fest",
    "Vorschläge nur aus Ihrem Sortiment",
    "Bestellung landet automatisch in Ihren Systemen",
    "Daten in der EU, Vertrag nach DSGVO",
  ],
  footnote: "Preise verstehen sich zzgl. MwSt. Warenwert meint den bestätigten Geschenk-Auftrag.",
};

export const giftingFaq = [
  {
    question: "Muss das in das HubSpot meines Kunden?",
    answer:
      "Ja. Die App läuft im Cloud-CRM Ihres Kunden, nicht bei Ihnen. Er lässt sie über den Marketplace zu und legt Budget und Regeln fest. Sie hinterlegen das Sortiment.",
  },
  {
    question: "Wer legt Budget und Regeln fest?",
    answer:
      "Ihr Kunde. Monatliches Budget, Weihnachten und Ostern immer höher. Optionale Regeln dazu. Das Sortiment kommt von Ihnen.",
  },
  {
    question: "Wo landet die Bestellung?",
    answer:
      "Nach Freigabe durch den Account Manager Ihres Kunden automatisch in Ihren Systemen. Sie müssen nichts manuell umtippen.",
  },
  {
    question: "Was, wenn der Kunde Salesforce nutzt?",
    answer:
      "Aktuell nur HubSpot. Salesforce, Pipedrive und Dynamics folgen. Wir starten mit HubSpot-Accounts zuerst.",
  },
  {
    question: "Wer bestätigt die Bestellung?",
    answer:
      "Der Account Manager Ihres Kunden. Wird etwas nicht akzeptiert, kommt ein neuer Vorschlag, oder Sie erarbeiten ihn gemeinsam. Ohne Bestätigung geht nichts raus.",
  },
  {
    question: "Was ist mit der 50-Euro-Grenze?",
    answer:
      "Vorschläge bleiben im Budget Ihres Kunden und unter der steuerlichen 50-Euro-Freigrenze. Nur in Ausnahmen gehen sie darüber.",
  },
  {
    question: "Wie läuft die Rechnung?",
    answer:
      "10% vom Warenwert je bestätigter Bestellung. Keine Seat-Gebühr. Abrechnung klären wir im Gespräch.",
  },
  {
    question: "Wie schnell sind wir startklar?",
    answer:
      "In der Regel in rund vier Wochen bis zum ersten echten Monatslauf.",
  },
  {
    question: "Wie sicher sind die Daten?",
    answer:
      "Daten in der EU. Verarbeitung nach DSGVO. Ihre Daten und die Ihrer Kunden werden nicht weitergegeben.",
  },
];

export const giftingFinalMeta = [
  "Jetzt in HubSpot",
  "Budget vom Kunden",
  "Sortiment von Ihnen",
  "Bestellung in Ihren Systemen",
];
