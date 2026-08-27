import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PageShell } from "./PageShell";
import { ModalContactFooter } from "./ModalContactFooter";
import { FinanznomadeScreenshotShowcase } from "./FinanznomadeScreenshotShowcase";
import { CtaButton } from "./CtaButton";
import { useDocumentSeo } from "../hooks/useDocumentSeo";
import { resolveVariants, slidePanel } from "../motion";
import styles from "./FinanznomadeCaseModal.module.css";


const LIVE_URL = "https://auslandsvergleich.finanznoma.de/";

const QUOTE_TEXT =
  "Laurens hat mit uns aus einem Prototypen einen voll funktionsfähigen Versicherungskonfigurator entwickelt, von Analyse und Konzeption über Datenstruktur und UX/UI bis zur technischen Umsetzung. Besonders stark: Er hat sich intensiv eingearbeitet, komplexe Leistungen strukturiert und daraus eine verständliche Lösung gemacht. Unkompliziert, schnell, lösungsorientiert. Klare Empfehlung.";

const navItems = [
  { id: "fn-produkt", label: "Produkt" },
  { id: "fn-ansatz", label: "Ansatz" },
  { id: "fn-affiliate", label: "Affiliate" },
] as const;

const challenges = [
  {
    label: "Tarifnamen",
    reality: "Comfort ≠ Classic ≠ Special",
    meaning: "Kein naives 1:1-Mapping",
    icon: "tags" as const,
  },
  {
    label: "Geologiken",
    reality: "Zonen & Aufenthalt je Anbieter anders",
    meaning: "Eigene Mapping-Schicht nötig",
    icon: "globe" as const,
  },
  {
    label: "Selbstbehalt",
    reality: "Mal alles, mal nur stationär/ambulant",
    meaning: "Transparenz statt Vereinfachung",
    icon: "percent" as const,
  },
  {
    label: "Quellenlage",
    reality: "Volle AVB vs. nur Broschüre",
    meaning: "Unsicherheit darf nicht als „nicht versichert“ gelten",
    icon: "docs" as const,
  },
  {
    label: "Abschluss",
    reality: "Broker, APIs, Deep Links",
    meaning: "Attribution von Tag 1 mitdenken",
    icon: "link" as const,
  },
];

const challengeIcons = {
  tags: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7.5V4h3.5L16 12.5 11.5 17 4 7.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="7.2" cy="6.8" r="1" fill="currentColor" />
      <path
        d="M13 4h7v7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4.5 12h15M12 4c2.2 2.4 3.3 5.1 3.3 8s-1.1 5.6-3.3 8c-2.2-2.4-3.3-5.1-3.3-8s1.1-5.6 3.3-8z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  ),
  percent: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="2.25" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="2.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17.5 6.5L6.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  docs: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 4h7l4 4v12H7V4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M14 4v4h4M10 12h6M10 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9.5 14.5l5-5M10.5 9.5l-1-1a3.2 3.2 0 00-4.5 4.5l1 1M13.5 14.5l1 1a3.2 3.2 0 004.5-4.5l-1-1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

const insurers = [
  { name: "BDAE", src: "/cases/finanznomade/insurers/bdae.svg" },
  { name: "APRIL International", src: "/cases/finanznomade/insurers/april.png" },
  { name: "PassportCard", src: "/cases/finanznomade/insurers/passportcard.png" },
  { name: "Foyer Global Health", src: "/cases/finanznomade/insurers/foyer.png" },
  { name: "Care Concept", src: "/cases/finanznomade/insurers/careconcept.png" },
];

const principles = [
  {
    title: "Providertreu + vergleichbar",
    text: "Originalwortlaut bleibt erhalten; Vergleichbarkeit über Katalog-Mapping mit ausgewiesener Qualität.",
  },
  {
    title: "Fehlende Information ≠ nicht versichert",
    text: "Fünfwertiger Deckungsstatus statt Binärlogik, Unsicherheit wird sichtbar, nicht weggerechnet.",
  },
  {
    title: "Quellenpflicht",
    text: "Jede Aussage trägt Dokument, Seite und Verbindlichkeitsstufe.",
  },
  {
    title: "Produkt = Konfigurationsraum",
    text: "Achsen und Constraints statt starrer Tarifliste, der Nutzer konfiguriert, das System berechnet.",
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
      "Strukturanalyse über fünf Anbieter und 15+ Tarife: Gemeinsamkeiten, Sonderfälle, nicht Normalisierbares, dokumentiert, quellenbelegt, entscheidungsfähig.",
    extra: "insurers" as const,
  },
  {
    number: "02",
    title: "Konzeption",
    description:
      "Produktlogik vor Interface: Personen, Region, Lebenssituation, gewünschtes Schutzniveau, und erst dann Vergleich. Rechtliche Gateways (VersVermV / VVG) als Teil der Journey, nicht als Afterthought.",
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
      "Editorial Design im Look von Finanznomade, warm, glaubwürdig, näher an Magazin als an Fintech-Dashboard. Fünf Schritte, eine Aufgabe pro Screen. Die Komplexität sitzt unter der Haube.",
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

const affiliateLive = [
  "5-Schritt-Konfigurator mit Ampel & Detailmatrix",
  "Broker- / Affiliate-Deep-Links im Abschluss",
  "Erste Attribution-Schicht über Click-IDs",
  "Rechtliche Gateways (VersVermV / VVG) in der Journey",
];

const affiliateRoadmap = [
  "Vollständige Provisions- & Statuslogik",
  "Partner-Dashboard & Reporting",
  "CRM-Anbindung + automatisiertes Lead-Follow-up",
  "EPC / CPL / CPA & Funnel-Optimierung",
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

function findScrollParent(el: HTMLElement | null): HTMLElement {
  let node = el?.parentElement ?? null;
  while (node) {
    const { overflowY } = getComputedStyle(node);
    if (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") {
      return node;
    }
    node = node.parentElement;
  }
  return document.documentElement;
}

function scrollEventTarget(scroller: HTMLElement): EventTarget {
  if (scroller === document.documentElement || scroller === document.body) {
    return window;
  }
  return scroller;
}

function TypedQuote({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const startedRef = useRef(false);
  const [chars, setChars] = useState(reduce ? QUOTE_TEXT.length : 0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!active) {
      startedRef.current = false;
      setInView(false);
      setChars(reduce ? QUOTE_TEXT.length : 0);
      return;
    }

    if (reduce) {
      setChars(QUOTE_TEXT.length);
      return;
    }

    const quote = quoteRef.current;
    if (!quote) return;

    const scroller = findScrollParent(quote);
    const root =
      scroller === document.documentElement || scroller === document.body
        ? null
        : scroller;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      {
        root,
        threshold: [0.25, 0.4],
        // Trigger when the quote sits in the mid/lower viewport, independent of page height
        rootMargin: "0px 0px -18% 0px",
      },
    );

    observer.observe(quote);
    return () => observer.disconnect();
  }, [active, reduce]);

  useEffect(() => {
    if (!active || reduce || !inView || startedRef.current) return;
    startedRef.current = true;

    setChars(0);
    let i = 0;
    let timeout = 0;

    const tick = () => {
      i += 1;
      setChars(i);
      if (i >= QUOTE_TEXT.length) return;
      const next = QUOTE_TEXT[i - 1] === " " ? 6 : 11;
      timeout = window.setTimeout(tick, next);
    };

    timeout = window.setTimeout(tick, 160);
    return () => window.clearTimeout(timeout);
  }, [active, reduce, inView]);

  const shown = QUOTE_TEXT.slice(0, chars);
  const done = chars >= QUOTE_TEXT.length;

  return (
    <blockquote className={styles.clientQuote} ref={quoteRef}>
      <div className={styles.quoteLayout}>
        <img
          className={styles.quotePhoto}
          src="/cases/finanznomade/kim-maurice.jpg"
          alt="Kim Elsholz und Maurice, CEOs von finanznoma.de"
          width={280}
          height={320}
        />
        <div className={styles.quoteBody}>
          <p className={styles.quoteText} aria-label={QUOTE_TEXT}>
            <span className={styles.quoteTextMeasure} aria-hidden="true">
              “{QUOTE_TEXT}”
            </span>
            <span className={styles.quoteTextLive} aria-hidden="true">
              <span className={styles.quoteMark}>“</span>
              {shown}
              {!done && <span className={styles.quoteCaret} />}
              {done && <span className={styles.quoteMarkEnd}>”</span>}
            </span>
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
                <div key={insurer.name} className={styles.insurerCard}>
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

      <div className={styles.affiliateStatusGrid}>
        <div className={styles.affiliateStatusCard}>
          <span className={styles.affiliateStatusBadge}>Live</span>
          <h4>Heute im Produkt</h4>
          <ul>
            {affiliateLive.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={`${styles.affiliateStatusCard} ${styles.affiliateStatusRoadmap}`}>
          <span className={styles.affiliateStatusBadgeMuted}>Roadmap</span>
          <h4>Nächste Ausbaustufe</h4>
          <ul>
            {affiliateRoadmap.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className={styles.callout}>
        Der Konfigurator erzeugt qualifizierte Intent-Signale. Das Affiliate-System macht daraus
        steuerbare Revenue-Infrastruktur, Schritt für Schritt.
      </p>
    </div>
  );
}

function CaseNav({ scroller }: { scroller: HTMLElement | null }) {
  const [active, setActive] = useState<string>(navItems[0].id);

  useEffect(() => {
    if (!scroller) return;

    const root: ParentNode =
      scroller === document.documentElement ? document : scroller;
    const sections = navItems
      .map((item) => root.querySelector<HTMLElement>(`#${item.id}`))
      .filter(Boolean) as HTMLElement[];
    const scrollTarget = scrollEventTarget(scroller);

    const onScroll = () => {
      const top =
        scroller === document.documentElement
          ? 140
          : scroller.getBoundingClientRect().top + 120;
      let current: string = navItems[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= top) current = section.id;
      }
      setActive(current);
    };

    scrollTarget.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => scrollTarget.removeEventListener("scroll", onScroll);
  }, [scroller]);

  const jump = (id: string) => {
    const root: ParentNode =
      !scroller || scroller === document.documentElement ? document : scroller;
    const el = root.querySelector(`#${id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className={styles.caseNav} aria-label="Case-Abschnitte">
      {navItems.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`${styles.caseNavBtn} ${active === item.id ? styles.caseNavBtnActive : ""}`}
          onClick={() => jump(item.id)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

export function FinanznomadeCasePage({ onClose }: { onClose: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [scroller, setScroller] = useState<HTMLElement | null>(null);

  useDocumentSeo({
    title: "Krankenversicherungs-Konfigurator | Success Story | uberagent",
    description:
      "Internationalen KV-Vergleich von der PDF-Welt in einen 5-Schritt-Konfigurator überführt.",
    canonical: `${window.location.origin}/case/finanznomade-versicherungsrechner`,
  });

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      setScroller(findScrollParent(contentRef.current));
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  return (
    <PageShell
      title="Internationaler Krankenversicherungs-Konfigurator"
      eyebrow="Success Story · Finanznomade"
      onBack={onClose}
      footer={
        <ModalContactFooter onClose={onClose} label="Ähnliches Datenprodukt besprechen" />
      }
    >
      <div className={styles.content} ref={contentRef}>
        <CaseNav scroller={scroller} />

        <section className={styles.heroSection} id="fn-produkt">
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
              Konfigurator aus Kundensicht, vom Einstieg bis zum Vergleich
            </p>
            <div className={styles.videoCta}>
              <CtaButton href={LIVE_URL} size="md" surface="on-light">
                Konfigurator internationale Krankenversicherung
              </CtaButton>
            </div>
          </div>

          <span className={styles.heroTag}>Von Tarif-PDFs zur Conversion-Maschine</span>
          <TypedQuote active />

          <div className={styles.stackBlock}>
            <p className={styles.stackFormulaLabel}>Produktformel</p>
            <div
              className={styles.stackDiagram}
              role="group"
              aria-label="Produktformel: Datenprodukt plus Konfigurator plus Affiliate-Netzwerk ergibt Ergebnis"
            >
            <div className={styles.stackCard}>
              <span className={styles.stackIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <ellipse cx="12" cy="6" rx="7" ry="2.5" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M5 6v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6M5 10v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-4M5 14v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <h4 className={styles.stackTitle}>Datenprodukt</h4>
              <p>
                Alle Versicherungen von fünf Anbietern systematisch und einheitlich strukturiert -
                vergleichbar und quellenbelegt.
              </p>
            </div>

            <span className={styles.stackOp} aria-hidden="true">
              <span className={styles.stackOpGlyph}>+</span>
            </span>

            <div className={styles.stackCard}>
              <span className={styles.stackIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M16.5 14.5v4M14.5 16.5h4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <h4 className={styles.stackTitle}>Konfigurator</h4>
              <p>
                Guided Experience für Endkunden: intuitiv, klar geführt, in wenigen Schritten zum
                passenden Schutz statt PDF-Chaos.
              </p>
            </div>

            <span className={styles.stackOp} aria-hidden="true">
              <span className={styles.stackOpGlyph}>+</span>
            </span>

            <div className={styles.stackCard}>
              <span className={styles.stackIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="6.5" cy="7" r="2.25" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="17.5" cy="7" r="2.25" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="12" cy="17" r="2.25" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M8.4 8.4 10.4 15.2M15.6 8.4 13.6 15.2M8.8 7h6.4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <h4 className={styles.stackTitle}>Affiliate-Netzwerk</h4>
              <p>
                Partnersteuerung mit klarer Performance-Übersicht und Incentivierung nach Ergebnis -
                vom Click bis zur Provision.
              </p>
            </div>

            <span className={`${styles.stackOp} ${styles.stackEquals}`} aria-hidden="true">
              <span className={styles.stackOpGlyph}>=</span>
            </span>

            <div className={`${styles.stackCard} ${styles.stackResult}`}>
              <span className={styles.stackIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 16.5 9.2 11l3.3 3.2L20 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.5 7H20v4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h4 className={styles.stackTitle}>Ergebnis</h4>
              <p>
                Skalierbarer, hocheffizienter Vertrieb internationaler Krankenversicherungen für
                Unternehmer, rechtlich sauber, conversion-orientiert, partnerfähig.
              </p>
            </div>
            </div>
          </div>
        </section>

        <section>
          <SectionTitle>Ausgangslage</SectionTitle>
          <p className={styles.bodyText}>
            Finanznomade.de berät Unternehmerinnen und Unternehmer, die auswandern, remote arbeiten
            oder als Perpetual Traveler leben. Zentrale Frage:{" "}
            <em>Welche internationale Krankenversicherung passt zu meiner Situation?</em> Der Markt
            antwortet mit PDFs, nicht mit Produkten.
          </p>
          <div className={styles.beforeAfter}>
            <div className={styles.beforeCard}>
              <span className={styles.beforeAfterEyebrow}>Before</span>
              <h4>Marktrealität</h4>
              <ul>
                <li>PDFs &amp; Leistungsbroschüren</li>
                <li>Inkompatible Tarifwerke</li>
                <li>Fünf Geologiken, fünf Selbstbehalte</li>
                <li>Kaum fairer Vergleich möglich</li>
              </ul>
            </div>
            <div className={styles.beforeAfterArrow} aria-hidden="true">
              →
            </div>
            <div className={styles.afterCard}>
              <span className={styles.beforeAfterEyebrow}>After</span>
              <h4>Konfigurator</h4>
              <ul>
                <li>5 geführte Schritte</li>
                <li>Ampel-Vergleich &amp; Matrix</li>
                <li>Quellenpflicht &amp; ehrliche Lücken</li>
                <li>Abschluss via Deep Link / Beratung</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <SectionTitle>Herausforderung</SectionTitle>
          <p className={styles.bodyText}>
            Internationale Expat-Krankenversicherungen sind kein Vergleichsprodukt „out of the box“ -
            und sollen trotzdem monetarisierbar und skalierbar werden.
          </p>
          <div className={styles.challengeGrid}>
            {challenges.map((row) => (
              <div key={row.label} className={styles.challengeCard}>
                <span className={styles.challengeIcon}>{challengeIcons[row.icon]}</span>
                <span className={styles.challengeLabel}>{row.label}</span>
                <strong className={styles.challengeReality}>{row.reality}</strong>
                <span className={styles.challengeMeaning}>{row.meaning}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="fn-ansatz">
          <SectionTitle>Ansatz: Datenprodukt mit Oberfläche</SectionTitle>
          <p className={styles.bodyText}>
            Nicht „UI mit Tabelle“, sondern strukturierte Wissensbasis, normalisiert, validiert und
            so aufbereitet, dass sie Produkt, Beratung und Tracking gleichzeitig speisen kann.
          </p>
          <ApproachProcess />
          <FinanznomadeScreenshotShowcase />
        </section>

        <section id="fn-affiliate">
          <SectionTitle>Affiliate-Netzwerk &amp; Sales Tracking</SectionTitle>
          <p className={styles.bodyText}>
            Zielbild: von der Besucherquelle bis zum Versicherungsabschluss alles nachvollziehbar -
            inklusive Performance- und Provisionsplattform. Klar getrennt: was heute live ist, und was
            als nächste Stufe folgt.
          </p>
          <AffiliateSystem />
        </section>

        <section className={styles.metaSection}>
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
    </PageShell>
  );
}

/** @deprecated Use FinanznomadeCasePage */
export const FinanznomadeCaseModal = FinanznomadeCasePage;
