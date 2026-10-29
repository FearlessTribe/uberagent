import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import {
  Check,
  ClipboardList,
  Database,
  FileWarning,
  Handshake,
  Layers,
  Link2Off,
  Lock,
  Megaphone,
  Minus,
  PhoneOff,
  Scale,
  Send,
  ShieldCheck,
  Shuffle,
  X,
} from "lucide-react";
import { useDocumentSeo } from "../hooks/useDocumentSeo";
import { useOverlay } from "../context/OverlayContext";
import type { LeadmaschineRegion } from "../hooks/useLeadmaschineRoute";
import {
  CASE_FINANZNOMADE,
  CASE_LST,
  FINANZNOMADE_QUOTE,
  FINANZNOMADE_QUOTE_ATTR,
  getLeadmaschineCopy,
  LIVE_FINANZNOMADE,
  LIVE_LST,
  type ComparisonCell,
} from "../data/leadmaschineContent";
import { trackEvent } from "../lib/analytics";
import { ContactFooter } from "./ContactFooter";
import { CtaButton } from "./CtaButton";
import { HeroTermRain } from "./HeroTermRain";
import { LeadmaschineFunnelForm } from "./LeadmaschineFunnelForm";
import { LeadmaschineRoiCalc } from "./LeadmaschineRoiCalc";
import { PageShell } from "./PageShell";
import { ProofRow } from "./ProofRow";
import { SectionBackground } from "./SectionBackground";
import styles from "./LeadmaschinePage.module.css";
import serviceStyles from "./ServiceModal.module.css";

interface LeadmaschinePageProps {
  region: LeadmaschineRegion;
  onRegionChange: (region: LeadmaschineRegion) => void;
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function CellMark({ value }: { value: ComparisonCell }) {
  if (value === "yes")
    return (
      <span className={styles.cellYes} aria-label="ja">
        <Check size={18} strokeWidth={2.5} aria-hidden />
      </span>
    );
  if (value === "partial")
    return (
      <span className={styles.cellPartial} aria-label="teilweise">
        <Minus size={18} strokeWidth={2.5} aria-hidden />
      </span>
    );
  if (value === "na")
    return (
      <span className={styles.cellNa} aria-label="entfällt">
        <Minus size={16} strokeWidth={2} aria-hidden />
      </span>
    );
  return (
    <span className={styles.cellNo} aria-label="nein">
      <X size={18} strokeWidth={2.5} aria-hidden />
    </span>
  );
}

function SplitHead({
  eyebrow,
  title,
  text,
  id,
}: {
  eyebrow: string;
  title: string;
  text: ReactNode;
  id?: string;
}) {
  return (
    <div className={styles.splitHead} id={id}>
      <div className={styles.splitLeft}>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <div className={styles.splitRight}>{text}</div>
    </div>
  );
}

function CaseBlock({
  which,
  flipped,
}: {
  which: "finanznomade" | "lst";
  flipped?: boolean;
}) {
  const isFn = which === "finanznomade";
  const outcomes = isFn
    ? [
        "Beratungsreife Anfragen statt Instagram-Reichweite ohne Kontext",
        "Fünf Anbieter vergleichbar in einer Strecke",
        "Affiliate messbar vom Click bis zur Provision",
        "Traffic und Konfigurator als ein System",
      ]
    : [
        "Vergleich → Offerte → Beratung durchgängig",
        "CH-Logik: Kanton, Franchise, Modell, Unfall",
        "Offertanfragen mit Kontext statt Leerformular",
        "Planbar vor und in der Wechselsaison",
      ];

  return (
    <article className={`${styles.case} ${flipped ? styles.caseFlip : ""}`}>
      <div className={styles.caseCopy}>
        <p className="eyebrow">
          {isFn
            ? "Referenz · Internationale KV"
            : "Referenz · Schweizer Krankenkasse"}
        </p>
        <h3>
          {isFn
            ? "Von Reichweite zu Abschlüssen"
            : "Ein System statt Stückwerk"}
        </h3>
        <ul className={styles.outcomeList}>
          {outcomes.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
        {isFn && (
          <blockquote className={styles.quote}>
            <img
              className={styles.quotePhoto}
              src="/cases/finanznomade/kim-maurice.jpg"
              alt=""
              width={40}
              height={40}
              loading="lazy"
            />
            <div>
              <p>“{FINANZNOMADE_QUOTE}”</p>
              <cite>{FINANZNOMADE_QUOTE_ATTR}</cite>
            </div>
          </blockquote>
        )}
        <div className={styles.caseCtas}>
          <a
            className={styles.primaryLink}
            href={isFn ? LIVE_FINANZNOMADE : LIVE_LST}
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              trackEvent("example_click", {
                case: isFn ? "finanznomade" : "lst",
              })
            }
          >
            Live ansehen
          </a>
          <a
            className={styles.textLinkOnLight}
            href={isFn ? CASE_FINANZNOMADE : CASE_LST}
          >
            Case Study
          </a>
        </div>
      </div>
      <div className={styles.caseVisual} aria-hidden>
        <div className={styles.deviceDesktop}>
          <img
            src={
              isFn
                ? "/cases/finanznomade/screenshots/05-vergleich.png"
                : "/cases/lst-finance/poster.jpg"
            }
            alt=""
            loading="lazy"
          />
        </div>
        <div className={styles.devicePhone}>
          <img
            src={
              isFn
                ? "/cases/finanznomade/screenshots/01-personen.png"
                : "/cases/lst-finance/phone-preview.png"
            }
            alt=""
            loading="lazy"
          />
        </div>
      </div>
    </article>
  );
}

const PROBLEM_ICONS = [ClipboardList, Shuffle, Link2Off] as const;
const SOLUTION_ICONS = [Database, Layers, Send] as const;
const LEGAL_ICONS_DE = [FileWarning, Scale, ShieldCheck, Lock] as const;
const LEGAL_ICONS_CH = [Handshake, ClipboardList, PhoneOff, Lock] as const;
const OFFER_ICONS = [Layers, Send, Megaphone] as const;

export function LeadmaschinePage({
  region,
  onRegionChange,
}: LeadmaschinePageProps) {
  const copy = getLeadmaschineCopy(region);
  const { navigateHome, openService, openKollegenrunde, openLaurens } =
    useOverlay();
  const [openFaq, setOpenFaq] = useState(0);
  const [formStep, setFormStep] = useState<1 | 2>(1);
  const [sticky, setSticky] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLElement>(null);
  const regionId = useId();

  useDocumentSeo({
    title: "Leadmaschine für Versicherungsberatung | supragent",
    description:
      "Anfragen mit Kontext statt Leerformulare. Konfigurator, Datenprodukt und Lead-Übergabe für Broker und Spezialmakler.",
    canonical: `${typeof window !== "undefined" ? window.location.origin : "https://supragent.net"}/leadmaschine`,
  });

  useEffect(() => {
    const onScroll = () => {
      const hero = heroRef.current;
      const form = formRef.current;
      if (!hero || !form) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      const formVisible = form.getBoundingClientRect().top < window.innerHeight * 0.85;
      setSticky(heroBottom < 0 && !formVisible && formStep === 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [formStep]);

  const book = (position: string) => {
    trackEvent("cta_click", { position, variant: region });
    scrollToId("funnel");
  };

  const setRegion = (next: LeadmaschineRegion) => {
    onRegionChange(next);
    trackEvent("segment_select", { segment: next, source: "nav" });
  };

  const legalIcons = region === "ch" ? LEGAL_ICONS_CH : LEGAL_ICONS_DE;

  const problemCards =
    region === "ch"
      ? [
          {
            title: "Keine Vorqualifizierung",
            text: "Name und E-Mail reichen nicht. Die Beratung stellt zwanzig Fragen und merkt spät, dass es nicht passt, im teuersten Moment: im Gespräch.",
          },
          {
            title: "Gekaufte Leads",
            text: "Für 50 bis 180 Franken ein Kontakt, oft an mehrere Vermittler. Die Marke, die wächst, ist die der Lead-Börse, nicht Ihre.",
          },
          {
            title: "Website ohne Funnel",
            text: "Schön gebaut, aber Rechner, Formular und Werbung hängen nicht zusammen. Interesse bleibt Interesse, keine Offertanfrage.",
          },
        ]
      : [
          {
            title: "Keine Vorqualifizierung",
            text: "Name und E-Mail reichen nicht. Die Beratung stellt zwanzig Fragen und merkt spät, dass es nicht passt, im teuersten Moment: im Gespräch.",
          },
          {
            title: "Gekaufte Leads",
            text: "Für 50 bis 300 Euro ein Kontakt, oft an mehrere Vermittler. Die Marke, die wächst, ist die der Lead-Börse, nicht Ihre.",
          },
          {
            title: "Website ohne Funnel",
            text: "Schön gebaut, aber Rechner, Formular und Werbung hängen nicht zusammen. Interesse bleibt Interesse, kein Angebot mit Kontext.",
          },
        ];

  return (
    <PageShell
      title="Leadmaschine"
      eyebrow="GTM"
      onBack={navigateHome}
      variant="flush"
    >
      <div className={styles.page} data-region={region} ref={heroRef}>
        <div className={styles.regionBar}>
          <div
            className={styles.region}
            role="group"
            aria-label="Markt"
            id={regionId}
          >
            <button
              type="button"
              className={region === "ch" ? styles.regionOn : ""}
              aria-pressed={region === "ch"}
              onClick={() => setRegion("ch")}
            >
              CH
            </button>
            <span className={styles.regionSep} aria-hidden>
              |
            </span>
            <button
              type="button"
              className={region === "de" ? styles.regionOn : ""}
              aria-pressed={region === "de"}
              onClick={() => setRegion("de")}
            >
              DE/AT
            </button>
          </div>
          <nav className={styles.jumpNav} aria-label="Abschnitte">
            {copy.nav.links.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToId(link.id)}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        <section className={styles.lmHero}>
          <SectionBackground variant="static-hero" />
          <HeroTermRain />
          <div className={styles.lmHeroInner}>
            <div className={styles.lmHeroCopy}>
              <span className={serviceStyles.heroTag}>{copy.hero.eyebrow}</span>
              <h1 className={styles.lmHeroTitle}>{copy.hero.h1}</h1>
              <p className={styles.lmHeroLead}>{copy.hero.subline}</p>
              <p className={styles.lmHeroNote}>{copy.hero.micro}</p>
              <div className={styles.heroCtas}>
                <CtaButton
                  surface="accent"
                  size="lg"
                  showCalendar
                  onClick={() => book("hero")}
                  analyticsLocation="leadmaschine_hero"
                >
                  {copy.hero.cta}
                </CtaButton>
                <button
                  type="button"
                  className={styles.textLink}
                  onClick={() => scrollToId("referenzen")}
                >
                  {copy.hero.secondary}
                </button>
              </div>
              <div className={styles.lmHeroProof}>
                <ProofRow />
              </div>
            </div>
            <div className={styles.lmHeroCalc}>
              <LeadmaschineRoiCalc region={region} />
            </div>
          </div>
          <div className={styles.lmHeroTrust}>
            <p className={styles.proofLabel}>{copy.proof.label}</p>
            <div className={styles.trustRow}>
              {copy.proof.logos.map((logo) => (
                <a
                  key={logo.name}
                  href={logo.href}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.trustBrand}
                >
                  <img src={logo.src} alt={logo.name} loading="lazy" />
                  <span className={styles.trustCaption}>{logo.caption}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.light} id="problem">
          <div className={styles.inner}>
            <SplitHead
              eyebrow="Das Problem"
              title="Reichweite bringt Interesse. Interesse ist noch keine Anfrage."
              text={
                <p className={styles.lead}>
                  Ihre Zielgruppe findet Sie über Instagram, Google, Empfehlungen und Website. Dann scheitert es an einem von drei Punkten.
                </p>
              }
            />
            <div className={styles.problemGrid}>
              {problemCards.map((card, i) => {
                const Icon = PROBLEM_ICONS[i];
                return (
                  <article key={card.title} className={styles.flatCard}>
                    <Icon className={styles.cardIcon} strokeWidth={1.5} aria-hidden />
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </article>
                );
              })}
            </div>
            <p className={styles.closingStrong}>
              Das Ergebnis ist in allen drei Fällen gleich: Anfragen sind nicht
              planbar, die Beratung arbeitet als Vorqualifizierer, und die
              Spezialisierung, die Sie stark macht, ist online unsichtbar.
            </p>
            {copy.problemNote && (
              <aside className={styles.warningBox}>
                <PhoneOff size={18} strokeWidth={1.5} aria-hidden />
                <p>{copy.problemNote}</p>
              </aside>
            )}
          </div>
        </section>

        <section className={styles.lightAlt} id="perspektive">
          <div className={styles.inner}>
            <SplitHead
              eyebrow={copy.perspective.eyebrow}
              title={copy.perspective.h2}
              text={<p className={styles.lead}>{copy.perspective.intro}</p>}
            />
            <div className={styles.tableWrap} role="table" aria-label="Vergleich">
              <div className={styles.tableHead} role="row">
                <span role="columnheader">Kriterium</span>
                {copy.perspective.columns.map((col, i) => (
                  <span
                    key={col}
                    role="columnheader"
                    className={i === 3 ? styles.colAccent : ""}
                  >
                    {col}
                  </span>
                ))}
              </div>
              {copy.perspective.rows.map((row) => (
                <div key={row.criterion} className={styles.tableRow} role="row">
                  <span role="rowheader">{row.criterion}</span>
                  {row.cells.map((cell, i) => (
                    <span
                      key={`${row.criterion}-${i}`}
                      role="cell"
                      className={i === 3 ? styles.colAccent : ""}
                    >
                      <CellMark value={cell} />
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <div className={styles.mobileCompare}>
              {[...copy.perspective.columns]
                .map((col, colIdx) => ({ col, colIdx }))
                .sort((a, b) => (a.colIdx === 3 ? -1 : b.colIdx === 3 ? 1 : 0))
                .map(({ col, colIdx }) => (
                  <article
                    key={col}
                    className={`${styles.compareCard} ${colIdx === 3 ? styles.compareAccent : ""}`}
                  >
                    <h3>{col}</h3>
                    <ul>
                      {copy.perspective.rows.map((row) => (
                        <li key={row.criterion}>
                          <span>{row.criterion}</span>
                          <CellMark value={row.cells[colIdx]} />
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
            </div>
            <p className={styles.closingXL}>{copy.perspective.closing}</p>
          </div>
        </section>

        <section className={styles.light} id="loesung">
          <div className={styles.inner}>
            <div className={styles.processHead}>
              <p className="eyebrow">{copy.solution.eyebrow}</p>
              <h2>{copy.solution.h2}</h2>
            </div>
            <div className={styles.formula}>
              {copy.solution.tiles.map((tile, i) => {
                const Icon = SOLUTION_ICONS[i];
                return (
                  <div key={tile.title} className={styles.formulaItem}>
                    {i > 0 && (
                      <span className={styles.plus} aria-hidden>
                        +
                      </span>
                    )}
                    <div className={styles.formulaTile}>
                      <Icon className={styles.cardIcon} strokeWidth={1.5} aria-hidden />
                      <h3>{tile.title}</h3>
                      <p>{tile.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.resultCenter}>
              <span className={styles.resultEquals} aria-hidden>
                =
              </span>
              <p className={styles.resultBanner}>{copy.solution.result}</p>
            </div>
            <p className={styles.trafficLine}>{copy.solution.traffic}</p>
            <div className={styles.heroCtas}>
              <CtaButton
                surface="accent"
                onClick={() => book("solution")}
                analyticsLocation="leadmaschine_solution"
              >
                {copy.solution.cta}
              </CtaButton>
              <button
                type="button"
                className={styles.textLinkOnLight}
                onClick={() => scrollToId("ablauf")}
              >
                {copy.solution.link}
              </button>
            </div>
          </div>
        </section>

        <section className={styles.dark} id="ablauf">
          <div className={styles.inner}>
            <div className={styles.processHead}>
              <p className="eyebrow">{copy.process.eyebrow}</p>
              <h2>{copy.process.h2}</h2>
              <p className={styles.stepStart}>Hier starten Sie</p>
            </div>
            <ol className={styles.steps}>
              {copy.process.steps.map((step, i) => (
                <li key={step.title}>
                  <span className={styles.stepNum}>{i + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            {copy.processSeason && (
              <p className={styles.season}>{copy.processSeason}</p>
            )}
          </div>
        </section>

        <section className={styles.light} id="referenzen">
          <div className={styles.inner}>
            <SplitHead
              eyebrow="Referenzen"
              title="Zwei Live-Systeme. Messbare Anfragen."
              text={
                <p className={styles.lead}>
                  Keine Mockups, sondern produktive Konfiguratoren für internationale
                  Krankenversicherung und Schweizer Krankenkassen.
                </p>
              }
            />
            {copy.caseOrder.map((which, i) => (
              <CaseBlock key={which} which={which} flipped={i % 2 === 1} />
            ))}
          </div>
        </section>

        <section className={styles.light} id="recht">
          <div className={styles.inner}>
            <SplitHead
              eyebrow={copy.legal.eyebrow}
              title={copy.legal.h2}
              text={<p className={styles.lead}>{copy.legal.intro}</p>}
            />
            <div className={styles.legalGrid}>
              {copy.legal.tiles.map((tile, i) => {
                const Icon = legalIcons[i] ?? Lock;
                return (
                  <article key={tile.title} className={styles.flatCard}>
                    <Icon className={styles.cardIcon} strokeWidth={1.5} aria-hidden />
                    <h3>{tile.title}</h3>
                    <p>{tile.text}</p>
                  </article>
                );
              })}
            </div>
            <p className={styles.disclaimer}>{copy.legal.disclaimer}</p>
          </div>
        </section>

        <section className={styles.dark} id="angebot">
          <div className={styles.inner}>
            <div className={styles.processHead}>
              <p className="eyebrow">{copy.offer.eyebrow}</p>
              <h2>{copy.offer.h2}</h2>
            </div>
            <div className={styles.offerGrid}>
              {copy.offer.components.map((comp, i) => {
                const Icon = OFFER_ICONS[i] ?? Layers;
                return (
                  <article
                    key={comp.title}
                    className={`${styles.offerCard} ${comp.optional ? styles.offerOptional : ""}`}
                  >
                    <Icon size={20} strokeWidth={1.5} aria-hidden />
                    <h3>
                      {comp.title}
                      {comp.optional ? (
                        <span className={styles.optionalTag}> optional</span>
                      ) : null}
                    </h3>
                    <p>{comp.text}</p>
                  </article>
                );
              })}
            </div>
            <ul className={styles.rules}>
              {copy.offer.rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
            <CtaButton
              surface="accent"
              onClick={() => book("offer")}
              analyticsLocation="leadmaschine_offer"
            >
              {copy.offer.cta}
            </CtaButton>
          </div>
        </section>

        <section className={styles.lightAlt} id="faq">
          <div className={styles.innerNarrow}>
            <p className="eyebrow">FAQ</p>
            <h2>Häufige Fragen</h2>
            <div className={styles.faq}>
              {copy.faq.map((item, i) => {
                const open = openFaq === i;
                return (
                  <div key={item.q} className={styles.faqItem}>
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => {
                        setOpenFaq(open ? -1 : i);
                        if (!open)
                          trackEvent("faq_open", { question_id: String(i) });
                      }}
                    >
                      <span>{item.q}</span>
                      <span aria-hidden>{open ? "−" : "+"}</span>
                    </button>
                    {open && <p>{item.a}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section ref={formRef} className={styles.final} id="funnel">
          <div className={`${styles.inner} ${styles.finalSplit}`}>
            <div className={styles.finalCopy}>
              <h2>{copy.final.h2}</h2>
              <p className={styles.lead}>{copy.final.text}</p>
              <ul className={styles.finalChecks}>
                {copy.final.checks.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <button
                type="button"
                className={styles.textLink}
                onClick={() => scrollToId("referenzen")}
              >
                {copy.final.secondary}
              </button>
            </div>
            <LeadmaschineFunnelForm
              region={region}
              onStepChange={setFormStep}
            />
          </div>
        </section>

        <ContactFooter
          onOpenService={openService}
          onOpenLaurens={openLaurens}
          onOpenKollegenrunde={openKollegenrunde}
        />

        {sticky && (
          <div className={styles.sticky}>
            <CtaButton
              size="sm"
              surface="accent"
              onClick={() => book("sticky")}
              analyticsLocation="leadmaschine_sticky"
            >
              {copy.sticky.cta}
            </CtaButton>
            <button
              type="button"
              className={styles.stickyLink}
              onClick={() => scrollToId("referenzen")}
            >
              {copy.sticky.examples}
            </button>
          </div>
        )}
      </div>
    </PageShell>
  );
}
