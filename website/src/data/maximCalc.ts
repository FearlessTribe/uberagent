export const maximHeroAudience =
  "Für KFZ-Werkstätten, Handwerksbetriebe und alle, die täglich Preise nennen müssen.";

export const maximProblemCosts = [
  {
    title: "Aufträge",
    text: "Wer anfragt, fragt bei drei Betrieben an. Wer zuerst einen Preis nennt, bekommt den Job. Ihr Angebot vom Abend liest oft keiner mehr.",
  },
  {
    title: "Freiheit",
    text: "Sind Sie krank, im Urlaub oder auf der Baustelle, gehen keine Angebote raus. Ihre Mitarbeiter trauen sich die Kalkulation nicht zu.",
  },
  {
    title: "Überblick",
    text: "Angebote liegen in E-Mails, WhatsApp und Excel. Was Sie wem zu welcher Marge angeboten haben, weiß hinterher keiner.",
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
    lead: "Ein KI-Telefonassistent an derselben Kalkulation. Nimmt das Anliegen auf, nennt einen Richtpreis, bietet Termin oder Rückruf an – klar als KI gekennzeichnet.",
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
    text: "Wir richten die Wissensbasis ein und binden Lieferant und CRM an.",
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

export const maximRoi = {
  hoursDay: "2,5 Stunden pro Tag",
  hoursYear: "550 Stunden pro Jahr",
  hourlyValue: "75 € / Stunde (konservativ)",
  timeValue: "41.250 € Zeitwert pro Jahr",
  extra: "Plus: ein zusätzlicher Auftrag pro Woche durch schnellere Angebote – ca. 20.000 € Deckungsbeitrag",
  note: "Selbst wenn nur die Hälfte der Zeit in andere Aufgaben fließt, hat sich Stufe 1 im ersten Jahr bezahlt gemacht.",
} as const;

export const maximPricing = [
  {
    name: "Stufe 1",
    detail: "Kalkulation für Ihr Team",
    setup: "9.900 €",
    monthly: "990 €",
  },
  {
    name: "Stufe 1 + 2",
    detail: "plus Website",
    setup: "14.800 €",
    monthly: "1.490 €",
  },
  {
    name: "Stufe 1 + 2 + 3",
    detail: "plus Telefon",
    setup: "19.900 €",
    monthly: "1.990 €",
  },
] as const;

export const maximPricingNote =
  "Alle Preise netto. Einrichtung: 50 % bei Auftrag, 50 % bei Go-live. Betrieb: 12 Monate Mindestlaufzeit, danach monatlich kündbar. Enthalten: EU-Hosting, KI-Lizenzkosten, monatliche Genauigkeitsprüfung, Anpassungen Ihrer Preislogik, Support.";

export const maximTrust = [
  "Hosting ausschließlich in der EU",
  "Auftragsverarbeitungsvertrag nach Art. 28 DSGVO",
  "Ihre Preise und Kalkulationen werden nicht zum Training fremder KI-Modelle genutzt",
  "Interne Zahlen sind für Website und Telefon technisch unsichtbar",
  "Website-Chat und Telefonassistent sind als KI gekennzeichnet (EU-KI-Verordnung)",
  "Bei Vertragsende: Export und Löschung Ihrer Daten auf Wunsch",
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
    q: "Kann ich erst mal testen?",
    a: "Ja. Schicken Sie uns fünf echte Anfragen. Wir kalkulieren sie, Sie vergleichen. Kostenlos, unverbindlich, eine Woche.",
  },
] as const;
