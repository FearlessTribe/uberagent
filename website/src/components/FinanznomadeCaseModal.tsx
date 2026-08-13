import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Modal } from "./Modal";
import { ModalContactFooter } from "./ModalContactFooter";
import { FinanznomadeScreenshotShowcase } from "./FinanznomadeScreenshotShowcase";
import { CtaButton } from "./CtaButton";
import { resolveVariants, slidePanel } from "../motion";
import styles from "./FinanznomadeCaseModal.module.css";

interface FinanznomadeCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LIVE_URL = "https://auslandsvergleich.finanznoma.de/";

const QUOTE_TEXT =
  "Laurens hat mit uns aus einem Prototypen einen voll funktionsfähigen Versicherungskonfigurator entwickelt — von Analyse und Konzeption über Datenstruktur und UX/UI bis zur technischen Umsetzung. Besonders stark: Er hat sich intensiv eingearbeitet, komplexe Leistungen strukturiert und daraus eine verständliche Lösung gemacht. Unkompliziert, schnell, lösungsorientiert. Klare Empfehlung.";

const challenges = [
  {
    reality: "Tarifnamen stimmen nicht überein (Comfort ≠ Classic ≠ Special)",
    meaning: "Kein naives 1:1-Mapping",
  },
  {
    reality: "Geozonen, Preiszonen und Aufenthaltsregeln unterscheiden sich je Anbieter",
    meaning: "Eigene Mapping-Schicht nötig",
  },
  {
    reality: "Selbstbehalt gilt mal für alles, mal nur stationär, mal nur ambulant",
    meaning: "Transparenz statt Vereinfachung um jeden Preis",
  },
  {
    reality: "Quellenlage ungleich (volle AVB vs. nur Broschüre)",
    meaning: "Unsicherheit darf nicht als „nicht versichert“ erscheinen",
  },
  {
    reality: "Abschluss läuft über Broker, APIs, Deep Links",
    meaning: "Attribution muss von Anfang an mitgedacht werden",
  },
];

const insurers = [
  { name: "BDAE", src: "/cases/finanznomade/insurers/bdae.svg", dark: false },
  { name: "APRIL International", src: "/cases/finanznomade/insurers/april.png", dark: true },
  { name: "PassportCard", src: "/cases/finanznomade/insurers/passportcard.png", dark: true },
  { name: "Foyer Global Health", src: "/cases/finanznomade/insurers/foyer.png", dark: false },
  { name: "Care Concept", src: "/cases/finanznomade/insurers/careconcept.png", dark: false },
];

const principles = [
  {
    title: "Providertreu + vergleichbar",
    text: "Originalwortlaut bleibt erhalten; Vergleichbarkeit über Katalog-Mapping mit ausgewiesener Qualität.",
  },
  {
    title: "Fehlende Information ≠ nicht versichert",
    text: "Fünfwertiger Deckungsstatus statt Binärlogik — Unsicherheit wird sichtbar, nicht weggerechnet.",
  },
  {
    title: "Quellenpflicht",
    text: "Jede Aussage trägt Dokument, Seite und Verbindlichkeitsstufe.",
  },
  {
    title: "Produkt = Konfigurationsraum",
    text: "Achsen und Constraints statt starrer Tarifliste — der Nutzer konfiguriert, das System berechnet.",
  },
];

const uxSteps = [
  { title: "Personen", text: "Wer soll versichert werden?" },
  { title: "Region & Situation", text: "Wo und wie wird gelebt?" },
  { title: "Schutz", text: "Basic / Comfort / Premium + Selbstbehalt" },
  { title: "Hinweis", text: "Rechtsrahmen und Beratungspfad" },
  { title: "Vergleich", text: "Preise, Ampel, Matrix, Abschluss" },
];

const approachPhases = [
  {
    number: "01",
    title: "Tiefe Analyse",
    description:
      "Strukturanalyse über fünf Anbieter und 15+ Tarife: Gemeinsamkeiten, Sonderfälle, nicht Normalisierbares — dokumentiert, quellenbelegt, entscheidungsfähig.",
    extra: "insurers" as const,
  },
  {
    number: "02",
    title: "Konzeption",
    description:
      "Produktlogik vor Interface: Personen, Region, Lebenssituation, gewünschtes Schutzniveau — und erst dann Vergleich. Rechtliche Gateways (VersVermV / VVG) als Teil der Journey, nicht als Afterthought.",
    extra: null,
  },
  {
    number: "03",
    title: "Datenstruktur",
    description:
      "Ein schema-validiertes Datenmodell mit klaren Prinzipien. Ergebnis: ein kanonischer Leistungskatalog (~80 Leistungen, 9 Kategorien) und validierte Anbieter-JSONs als Single Source of Truth.",
    extra: "principles" as const,
  },
  {
    number: "04",
    title: "Entwicklung",
    description:
      "React/TypeScript-Konfigurator auf einer generierten Datenschicht: Preislogik je Anbieter, Ampel-Vergleich, Detailmatrix mit Zell-Drilldown, Affiliate-/Broker-Deep-Links und Deploy-Pipeline inkl. Validierung und Smoke-Tests.",
    extra: null,
  },
  {
    number: "05",
    title: "UX / UI",
    description:
      "Editorial Design im Look von Finanznomade — warm, glaubwürdig, näher an Magazin als an Fintech-Dashboard. Fünf Schritte, eine Aufgabe pro Screen. Die Komplexität sitzt unter der Haube.",
    extra: "steps" as const,
  },
];

const affiliatePipeline = [
  { id: "src", label: "Quelle", detail: "Affiliate / Content" },
  { id: "click", label: "Click-ID", detail: "Attribution startet" },
  { id: "cfg", label: "Konfigurator", detail: "Intent & Auswahl" },
  { id: "lead", label: "Lead", detail: "Beratung / Deep Link" },
  { id: "close", label: "Abschluss", detail: "Versicherer" },
  { id: "pay", label: "Provision", detail: "Abrechnung" },
];

const affiliateBlocks = [
  {
    title: "Tracking & Attribution",
    eyebrow: "01 · Identity",
    items: [
      "Eindeutige Click- / Conversion-ID über den gesamten Funnel",
      "Sales- und Abschluss-Tracking",
      "Automatische Zuordnung von Abschlüssen zum Affiliate",
      "Schnittstellen: API, Webhooks/Postbacks, CSV",
    ],
  },
  {
    title: "Provision & Abrechnung",
    eyebrow: "02 · Money",
    items: [
      "Statuslogik: Offen → Bestätigt → Storniert → Ausgezahlt",
      "Umsatz und Provision pro Affiliate",
      "Auszahlungshistorie und Abrechnung",
    ],
  },
  {
    title: "Performance & Optimierung",
    eyebrow: "03 · Insights",
    items: ["EPC / CPL / CPA", "Stornoquote", "Tarif- und Anbieterperformance", "Detaillierte Funnel-Analyse"],
  },
  {
    title: "Operative Skalierung",
    eyebrow: "04 · Scale",
    items: [
      "CRM-Anbindung",
      "Automatisiertes Lead-Follow-up",
      "Partnerfähige Reporting-Oberfläche",
    ],
  },
];

const results = [
  {
    dim: "Produkt",
    text: "Live-fähiger 5-Schritt-Konfigurator mit Vergleich, Ampel und Abschlussstrecken",
  },
  {
    dim: "Daten",
    text: "Schema-validierte Multi-Anbieter-Basis inkl. Leistungskatalog und Mapping-Qualität",
  },
  {
    dim: "Vertrauen",
    text: "Provenance statt Blackbox — „keine Angabe“ statt falscher Sicherheit",
  },
  {
    dim: "Marke",
    text: "UX im Editorial-Look von Finanznomade, rechtlich sauber eingebettet",
  },
  {
    dim: "Monetarisierung",
    text: "Broker-/Affiliate-Deep-Links als erste Conversion-Schicht",
  },
  {
    dim: "Skalierung",
    text: "Architektur und Funnel als Fundament für Sales Tracking, Provision und Partnernetzwerk",
  },
];

const meta = [
  { label: "Client", value: "Finanznomade / Finance Masters · FINO Media LLC" },
  { label: "Branche", value: "Finanzen · Insurance · Expat / Unternehmer" },
  {
    label: "Leistungen",
    value: "Analyse · Datenmodellierung · Produktkonzeption · UX/UI · Frontend · Affiliate-/Tracking-Architektur",
  },
  { label: "Stack", value: "React, TypeScript, Vite, Python, JSON Schema, Cloudflare Pages" },
];

const tech = ["React", "TypeScript", "Vite", "Python", "JSON Schema", "Cloudflare Pages"];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className={styles.sectionTitle}>{children}</h3>;
}

function TypedQuote({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? QUOTE_TEXT : "");
  const [done, setDone] = useState(Boolean(reduce));

  useEffect(() => {
    if (!active) {
      setShown(reduce ? QUOTE_TEXT : "");
      setDone(Boolean(reduce));
      return;
    }
    if (reduce) {
      setShown(QUOTE_TEXT);
      setDone(true);
      return;
    }

    setShown("");
    setDone(false);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(QUOTE_TEXT.slice(0, i));
      if (i >= QUOTE_TEXT.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, 16);

    return () => window.clearInterval(id);
  }, [active, reduce]);

  return (
    <blockquote className={styles.clientQuote}>
      <div className={styles.quoteLayout}>
        <img
          className={styles.quotePhoto}
          src="/cases/finanznomade/kim-maurice.jpg"
          alt="Kim Elsholz und Maurice, CEOs von finanznoma.de"
          width={280}
          height={320}
        />
        <div className={styles.quoteBody}>
          <p>
            <span className={styles.quoteMark} aria-hidden="true">
              “
            </span>
            {shown}
            {!done && <span className={styles.quoteCaret} aria-hidden="true" />}
            {done && (
              <span className={styles.quoteMarkEnd} aria-hidden="true">
                ”
              </span>
            )}
          </p>
          <footer>
            <strong>Kim Elsholz &amp; Maurice</strong>
            <span>CEOs, finanznoma.de · FINO Media LLC</span>
          </footer>
        </div>
      </div>
    </blockquote>
  );
}

function ApproachProcess() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const panelVariants = resolveVariants(reduce, slidePanel);
  const phase = approachPhases[active];

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % approachPhases.length);
  }, []);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + approachPhases.length) % approachPhases.length);
  }, []);

  return (
    <div className={styles.approach}>
      <div className={styles.approachTabs} role="tablist" aria-label="Ansatz-Phasen">
        {approachPhases.map((item, i) => (
          <button
            key={item.number}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`${styles.approachTab} ${i === active ? styles.approachTabActive : ""}`}
            onClick={() => setActive(i)}
          >
            <span className={styles.approachTabNum}>{item.number}</span>
            <span className={styles.approachTabLabel}>{item.title}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={phase.number}
          className={styles.approachPanel}
          variants={panelVariants}
          initial={reduce ? false : "hidden"}
          animate="visible"
          exit="exit"
        >
          <div className={styles.approachPanelTop}>
            <span className={styles.approachPanelNum}>Phase {phase.number}</span>
            <div className={styles.approachNav}>
              <button type="button" className={styles.approachNavBtn} onClick={prev} aria-label="Vorherige Phase">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M10 3L5 8l5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button type="button" className={styles.approachNavBtn} onClick={next} aria-label="Nächste Phase">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M6 3l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <h4 className={styles.approachPanelTitle}>{phase.title}</h4>
          <p className={styles.approachPanelText}>{phase.description}</p>

          {phase.extra === "insurers" && (
            <div className={styles.insurerGrid}>
              {insurers.map((insurer) => (
                <div
                  key={insurer.name}
                  className={`${styles.insurerCard} ${insurer.dark ? styles.insurerCardDark : ""}`}
                >
                  <img src={insurer.src} alt={insurer.name} width={160} height={40} />
                </div>
              ))}
            </div>
          )}

          {phase.extra === "principles" && (
            <div className={styles.principles}>
              {principles.map((p) => (
                <div key={p.title} className={styles.principle}>
                  <h4 className={styles.principleTitle}>{p.title}</h4>
                  <p className={styles.principleText}>{p.text}</p>
                </div>
              ))}
            </div>
          )}

          {phase.extra === "steps" && (
            <div className={styles.steps}>
              {uxSteps.map((step, i) => (
                <div key={step.title} className={styles.step}>
                  <span className={styles.stepNum}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.stepTitle}>{step.title}</span>
                  <span className={styles.stepText}>{step.text}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function AffiliateSystem() {
  const [active, setActive] = useState(2);

  return (
    <div className={styles.affiliate}>
      <div className={styles.affiliatePipeline} aria-label="Affiliate-Funnel">
        {affiliatePipeline.map((node, i) => (
          <button
            key={node.id}
            type="button"
            className={`${styles.affiliateNode} ${i === active ? styles.affiliateNodeActive : ""}`}
            onClick={() => setActive(i)}
          >
            <span className={styles.affiliateNodeIndex}>{String(i + 1).padStart(2, "0")}</span>
            <span className={styles.affiliateNodeLabel}>{node.label}</span>
            <span className={styles.affiliateNodeDetail}>{node.detail}</span>
            {i < affiliatePipeline.length - 1 && (
              <span className={styles.affiliateConnector} aria-hidden="true" />
            )}
          </button>
        ))}
      </div>

      <div className={styles.affiliateIdChain}>
        <span className={styles.affiliateIdLabel}>Eine ID · durchgängig</span>
        <code className={styles.affiliateId}>fn_click_8f3a…c21 → lead → policy → payout</code>
      </div>

      <div className={styles.affiliateGrid}>
        {affiliateBlocks.map((block) => (
          <div key={block.title} className={styles.affiliateCard}>
            <span className={styles.affiliateCardEyebrow}>{block.eyebrow}</span>
            <h4>{block.title}</h4>
            <ul>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className={styles.callout}>
        Der Konfigurator erzeugt qualifizierte Intent-Signale. Das Affiliate-System macht daraus
        steuerbare Revenue-Infrastruktur.
      </p>
    </div>
  );
}

export function FinanznomadeCaseModal({ isOpen, onClose }: FinanznomadeCaseModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Internationaler Krankenversicherungs-Konfigurator"
      eyebrow="Success Story · Finanznomade"
      footer={
        <ModalContactFooter onClose={onClose} label="Ähnliches Datenprodukt besprechen" />
      }
    >
      <div className={styles.content}>
        <section className={styles.heroSection}>
          <div className={styles.videoBlock}>
            <div className={styles.macbook}>
              <div className={styles.macbookLid}>
                <div className={styles.macbookBezel}>
                  <span className={styles.macbookCamera} aria-hidden="true" />
                  <div className={styles.macbookScreen}>
                    <video
                      className={styles.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      poster="/cases/finanznomade/poster.jpg"
                    >
                      <source src="/cases/finanznomade/konfigurator.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
              <div className={styles.macbookBase} aria-hidden="true">
                <div className={styles.macbookNotch} />
                <div className={styles.macbookBottom} />
              </div>
              <div className={styles.macbookShadow} aria-hidden="true" />
            </div>
            <p className={styles.videoCaption}>
              <strong>Produkt-Walkthrough</strong>
              Konfigurator aus Kundensicht — vom Einstieg bis zum Vergleich
            </p>
            <div className={styles.videoCta}>
              <CtaButton href={LIVE_URL} size="md" surface="on-light">
                Konfigurator internationale Krankenversicherung
              </CtaButton>
            </div>
          </div>

          <span className={styles.heroTag}>Von Tarif-PDFs zur Conversion-Maschine</span>
          <TypedQuote active={isOpen} />
          <p className={styles.lead}>
            Ein Auslandsversicherungs-Konfigurator, der komplexe Produkte einfach führt — und
            gleichzeitig die Basis für ein skalierbares Affiliate- &amp; Sales-Tracking-System legt.
          </p>
        </section>

        <section>
          <SectionTitle>Ausgangslage</SectionTitle>
          <p className={styles.bodyText}>
            Finanznomade.de berät Unternehmerinnen und Unternehmer, die auswandern, remote arbeiten
            oder als Perpetual Traveler leben. Eine der zentralen Fragen:{" "}
            <em>Welche internationale Krankenversicherung passt zu meiner Situation?</em>
          </p>
          <p className={styles.bodyText}>
            Der Markt antwortet darauf mit PDFs, Leistungsbroschüren und inkompatiblen Tarifwerken.
            Fünf Anbieter, fünf Geografielogiken, fünf Selbstbehaltssysteme — und kaum eine
            Möglichkeit, fair und ehrlich zu vergleichen.
          </p>
          <div className={styles.pullQuote}>
            <p>
              Einfache Benutzerführung und intuitive UX bei gleichzeitiger fachlicher Tiefe, die
              Versicherungsprodukte wirklich verdient.
            </p>
          </div>
        </section>

        <section>
          <SectionTitle>Herausforderung</SectionTitle>
          <p className={styles.bodyText}>
            Internationale Expat-Krankenversicherungen sind kein Vergleichsprodukt „out of the box“.
            Zusätzlich sollte der Konfigurator monetarisierbar und skalierbar sein — als Einstieg in
            ein Affiliate-Netzwerk, in dem von der Besucherquelle bis zum Versicherungsabschluss alles
            nachvollziehbar ist.
          </p>
          <table className={styles.challengeTable}>
            <thead>
              <tr>
                <th>Realität im Markt</th>
                <th>Was das fürs Produkt bedeutet</th>
              </tr>
            </thead>
            <tbody>
              {challenges.map((row) => (
                <tr key={row.reality}>
                  <td>{row.reality}</td>
                  <td>{row.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <SectionTitle>Ansatz: Datenprodukt mit Oberfläche</SectionTitle>
          <p className={styles.bodyText}>
            Wir haben das Projekt nicht als „UI mit Tabelle“ gedacht, sondern als strukturierte
            Wissensbasis — normalisiert, validiert und so aufbereitet, dass sie Produkt, Beratung und
            Tracking gleichzeitig speisen kann.
          </p>
          <ApproachProcess />
          <FinanznomadeScreenshotShowcase />
        </section>

        <section>
          <SectionTitle>Lösung im Überblick</SectionTitle>
          <div className={styles.solutionGrid}>
            <div className={styles.solutionCard}>
              <span className={styles.solutionEyebrow}>Was Nutzer sehen</span>
              <p>
                Ein geführter Vergleichsrechner — mit ehrlichen Preisen, nachvollziehbaren Leistungen
                und klaren nächsten Schritten (Direktabschluss, WhatsApp, Beratungstermin).
              </p>
            </div>
            <div className={styles.solutionCard}>
              <span className={styles.solutionEyebrow}>Was dahinter steckt</span>
              <p>
                Eine strukturierte Wissensbasis aus AVBs, Broschüren und Prämiensystemen —
                normalisiert, validiert, produktfähig.
              </p>
            </div>
            <div className={styles.solutionCard}>
              <span className={styles.solutionEyebrow}>Was das strategisch öffnet</span>
              <p>
                Der Konfigurator ist der Funnel-Kern für ein Affiliate-System, in dem Traffic, Lead
                und Abschluss derselben ID-Kette folgen.
              </p>
            </div>
          </div>
        </section>

        <section>
          <SectionTitle>Affiliate-Netzwerk &amp; Sales Tracking</SectionTitle>
          <p className={styles.bodyText}>
            Ziel: Ein echtes Affiliate-Netzwerk, bei dem von der Besucherquelle bis zum
            Versicherungsabschluss alles nachvollziehbar ist — inklusive Performance- und
            Provisionsplattform.
          </p>
          <AffiliateSystem />
        </section>

        <section>
          <SectionTitle>Ergebnis</SectionTitle>
          <table className={styles.resultTable}>
            <tbody>
              {results.map((row) => (
                <tr key={row.dim}>
                  <th>{row.dim}</th>
                  <td>{row.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <SectionTitle>Was diese Case Study zeigt</SectionTitle>
          <p className={styles.bodyText}>
            überagent baut keine Oberflächen um Tabellen. Wir übersetzen domainkomplexe Märkte in
            Produkte, die:
          </p>
          <ol className={styles.showList}>
            <li>
              <div>
                <strong>einfach bedienbar</strong>
                <span>sind — kurze Flows, eine Aufgabe pro Screen.</span>
              </div>
            </li>
            <li>
              <div>
                <strong>fachlich ehrlich</strong>
                <span>bleiben — Provenance statt Blackbox, Unsicherheit sichtbar machen.</span>
              </div>
            </li>
            <li>
              <div>
                <strong>operativ skalierbar</strong>
                <span>
                  werden — von der ersten Nutzerentscheidung bis zur ausbezahlten Provision.
                </span>
              </div>
            </li>
          </ol>
          <div className={styles.closing}>
            <p>
              Für Finanznomade heißt das konkret: Auslandsversicherung wird konfigurierbar. Vergleich
              wird vertrauenswürdig. Und Affiliate-Wachstum bekommt eine messbare Pipeline — von der
              Quelle bis zum Abschluss.
            </p>
            <p>
              Komplexität der Auslandsversicherung in einen klaren Konfigurator übersetzt — und als
              Basis für ein skalierbares Affiliate-Netzwerk gebaut.
            </p>
          </div>
        </section>

        <section>
          <SectionTitle>Projekt-Meta</SectionTitle>
          <div className={styles.metaGrid}>
            {meta.map((item) => (
              <div key={item.label} className={styles.metaItem}>
                <span className={styles.metaLabel}>{item.label}</span>
                <span className={styles.metaValue}>{item.value}</span>
              </div>
            ))}
          </div>
          <div className={styles.techRow}>
            {tech.map((t) => (
              <span key={t} className={styles.techChip}>
                {t}
              </span>
            ))}
          </div>
        </section>
      </div>
    </Modal>
  );
}
