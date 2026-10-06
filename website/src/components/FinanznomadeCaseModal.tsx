import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { PageShell } from "./PageShell";
import { ModalContactFooter } from "./ModalContactFooter";
import { CtaButton } from "./CtaButton";
import { useDocumentSeo } from "../hooks/useDocumentSeo";
import { trackOutboundClick } from "../lib/analytics";
import {
  finanznomadeCaseVideo,
  finanznomadeIphoneVideo,
} from "../data/marketing";
import { QuoteStars } from "./QuoteStars";
import styles from "./FinanznomadeCaseModal.module.css";

const LIVE_URL = "https://auslandsvergleich.finanznoma.de/";

const QUOTE_TEXT =
  "Laurens hat mit uns aus einem Prototypen einen voll funktionsfähigen Versicherungskonfigurator entwickelt, von Analyse und Konzeption über Datenstruktur und UX/UI bis zur technischen Umsetzung. Besonders stark: Er hat sich intensiv eingearbeitet, komplexe Leistungen strukturiert und daraus eine verständliche Lösung gemacht. Unkompliziert, schnell, lösungsorientiert. Klare Empfehlung.";

const meta = [
  {
    label: "Client",
    value: "Finanznomade / Finance Masters · FINO Media LLC",
  },
  {
    label: "Branche",
    value: "Finanzen · Insurance · Expat / Unternehmer",
  },
  {
    label: "Leistungen",
    value:
      "Business Analyse · Datenmodellierung · Produktkonzeption · UX/UI · Frontend · Affiliate-/Tracking-Architektur · Performance Marketing (Instagram) · Kampagnenaufsetzen & laufende Optimierung",
  },
  {
    label: "Stack",
    value: "React, TypeScript, Vite, Python, JSON Schema, Cloudflare Pages",
  },
];

const tech = [
  "React",
  "TypeScript",
  "Vite",
  "Python",
  "JSON Schema",
  "Cloudflare Pages",
];

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
            <span className={styles.quotePerson}>
              <strong>Kim Elsholz &amp; Maurice</strong>
              <QuoteStars />
            </span>
            <span>CEOs, finanznoma.de</span>
          </footer>
        </div>
      </div>
    </blockquote>
  );
}

function DeviceVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  return (
    <video
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

function ProblemBlock() {
  return (
    <section className={styles.storyBlock} aria-labelledby="fn-story-heading">
      <p className={styles.storyEyebrow}>Ausgangslage</p>
      <h3 id="fn-story-heading" className={styles.storyTitle}>
        Qualifizierte Leads waren kaum planbar
      </h3>
      <p className={styles.storyText}>
        Schwierig, beratungsreife Anfragen zu finden – und noch schwerer, das planbar zu machen.
        Social Media allein hat kaum qualifizierte Leads gebracht. Der Funnel war nicht skalierbar.
      </p>
    </section>
  );
}

function ValueBlock() {
  return (
    <section className={styles.valueBlock} aria-labelledby="fn-value-heading">
      <p className={styles.storyEyebrow}>Mehrwert</p>
      <h3 id="fn-value-heading" className={styles.valueHeading}>
        Was die Leadmaschine freisetzt
      </h3>
      <div className={styles.valueGrid}>
        <article className={styles.valueCard}>
          <span className={styles.valueIndex} aria-hidden="true">
            01
          </span>
          <h4 className={styles.valueTitle}>Qualifizierte Leads</h4>
          <p className={styles.valueText}>
            Vom Interesse bis zur beratungsreifen Anfrage – mit Kontext statt Leerformular.
            Die Beratung startet mit Substanz.
          </p>
        </article>
        <article className={`${styles.valueCard} ${styles.valueCardAccent}`}>
          <span className={styles.valueIndex} aria-hidden="true">
            02
          </span>
          <h4 className={styles.valueTitle}>Exponentielles Wachstum</h4>
          <p className={styles.valueText}>
            Affiliate-System, damit Partner zusätzliche Leads reinbringen und beteiligt werden –
            vom Click bis zur Provision messbar.
          </p>
        </article>
      </div>
      <p className={styles.campaignNote}>
        <strong>Auch Teil davon:</strong> Performance Marketing auf Instagram – Strategie,
        Kampagnenaufsetzen, Betreuung und kontinuierliche Optimierung als ein System mit dem
        Konfigurator.
      </p>
    </section>
  );
}

function Produktformel() {
  return (
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
  );
}

export function FinanznomadeCasePage({ onClose }: { onClose: () => void }) {
  useDocumentSeo({
    title: "Affiliate System für Internationale Krankenversicherungen | uberagent",
    description:
      "Success Story Finanznomade: Affiliate System für internationale Krankenversicherungen – qualifizierte Leads, Affiliate-Wachstum und Kampagnenaufsetzen.",
    canonical: `${window.location.origin}/case/finanznomade-versicherungsrechner`,
  });

  return (
    <PageShell
      title="Affiliate System für Internationale Krankenversicherungen"
      eyebrow="Success Story · Finanznomade"
      onBack={onClose}
      footer={
        <ModalContactFooter onClose={onClose} label="Ähnliches Projekt besprechen" />
      }
    >
      <div className={styles.content}>
        <section className={styles.heroSection}>
          <div className={styles.deviceStage} aria-label="Produktvideos">
            <div className={styles.deviceGlow} aria-hidden="true" />

            <div className={styles.macbookHero}>
              <div className={styles.macbook}>
                <div className={styles.macbookLid}>
                  <div className={styles.macbookBezel}>
                    <span className={styles.macbookCamera} aria-hidden="true" />
                    <div className={styles.macbookScreen}>
                      <DeviceVideo
                        className={styles.macbookVideo}
                        src={finanznomadeCaseVideo.src}
                        poster={finanznomadeCaseVideo.poster}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.macbookBase} aria-hidden="true">
                  <div className={styles.macbookNotch} />
                  <div className={styles.macbookBottom} />
                </div>
                <div className={styles.macbookShadow} aria-hidden="true" />
              </div>
            </div>

            <div className={styles.iphoneFloat}>
              <div className={styles.iphoneFrame}>
                <span className={styles.iphoneIsland} aria-hidden="true" />
                <div className={styles.iphoneScreen}>
                  <div className={styles.safariChrome} aria-hidden="true">
                    <div className={styles.safariUrl}>
                      <span className={styles.safariLock} />
                      <span>auslandsvergleich.finanznoma.de</span>
                    </div>
                  </div>
                  <DeviceVideo
                    className={styles.iphoneVideo}
                    src={finanznomadeIphoneVideo.src}
                    poster={finanznomadeIphoneVideo.poster}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.videoCta}>
            <CtaButton
              href={LIVE_URL}
              size="md"
              surface="on-light"
              onClick={() =>
                trackOutboundClick("live_demo", {
                  url: LIVE_URL,
                  location: "finanznomade_case",
                })
              }
            >
              Live ansehen
            </CtaButton>
          </div>

          <TypedQuote active />

          <ProblemBlock />

          <Produktformel />

          <ValueBlock />

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
              {tech.map((item) => (
                <span key={item} className={styles.techChip}>
                  {item}
                </span>
              ))}
            </div>
          </section>
        </section>
      </div>
    </PageShell>
  );
}

/** @deprecated Use FinanznomadeCasePage */
export const FinanznomadeCaseModal = FinanznomadeCasePage;
