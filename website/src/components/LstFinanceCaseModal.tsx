import { PageShell } from "./PageShell";
import { ModalContactFooter } from "./ModalContactFooter";
import { CtaButton } from "./CtaButton";
import { useDocumentSeo } from "../hooks/useDocumentSeo";
import { trackOutboundClick } from "../lib/analytics";
import { lstFinanceCaseVideo } from "../data/marketing";
import styles from "./FinanznomadeCaseModal.module.css";
import local from "./LstFinanceCaseModal.module.css";

const LIVE_URL = "https://helvetiq.supragent.net";

const meta = [
  {
    label: "Produkt",
    value: "Helvetiq · Schweizer Versicherungsberatung",
  },
  {
    label: "Branche",
    value: "Insurance · Vorsorge · KMU · Schweiz",
  },
  {
    label: "Leistungen",
    value:
      "Business Analyse · Produktkonzeption · Tarif- & Funnel-Logik · UX/UI · Frontend · Lead-Übergabe · GEO & SEO · Kampagnenaufsetzen",
  },
  {
    label: "Stack",
    value: "React, TypeScript, Vite, Cloudflare Pages",
  },
];

const tech = ["React", "TypeScript", "Vite", "Cloudflare Pages"];

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

const PHONE_PREVIEW = "/cases/lst-finance/phone-preview.png";

function PhoneLivePreview({ title }: { title: string }) {
  return (
    <div className={local.phoneViewport}>
      <img
        className={local.phoneStill}
        src={PHONE_PREVIEW}
        alt={title}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </div>
  );
}

function ProblemBlock() {
  return (
    <section className={styles.storyBlock} aria-labelledby="lst-story-heading">
      <p className={styles.storyEyebrow}>Ausgangslage</p>
      <h3 id="lst-story-heading" className={styles.storyTitle}>
        Qualifizierte Leads waren kaum planbar
      </h3>
      <p className={styles.storyText}>
        Agenturen hatten schon gebaut – aber der Weg bis zum beratungsreifen Lead blieb Stückwerk.
        Vergleich ohne Abschluss, Interesse ohne Kontext. Für die Schweizer Versicherungsberatung
        war das nicht skalierbar.
      </p>
    </section>
  );
}

function ValueBlock() {
  return (
    <section className={styles.valueBlock} aria-labelledby="lst-value-heading">
      <p className={styles.storyEyebrow}>Mehrwert</p>
      <h3 id="lst-value-heading" className={styles.valueHeading}>
        Was die Leadmaschine freisetzt
      </h3>
      <div className={styles.valueGrid}>
        <article className={styles.valueCard}>
          <span className={styles.valueIndex} aria-hidden="true">
            01
          </span>
          <h4 className={styles.valueTitle}>Qualifizierte Leads</h4>
          <p className={styles.valueText}>
            Vom Kanton bis zur Offertanfrage – mit Schweizer Prämienlogik und Kontext statt
            Leerformular. Die Beratung startet mit Substanz.
          </p>
        </article>
        <article className={`${styles.valueCard} ${styles.valueCardAccent}`}>
          <span className={styles.valueIndex} aria-hidden="true">
            02
          </span>
          <h4 className={styles.valueTitle}>Durchgängiger Funnel</h4>
          <p className={styles.valueText}>
            Vergleich, Offerte und Lead-Übergabe als ein System – planbar statt fragmentierter
            Agentur-Lieferungen.
          </p>
        </article>
      </div>
      <p className={styles.campaignNote}>
        <strong>Auch Teil davon:</strong> GEO &amp; SEO sowie Kampagnenaufsetzen – Funnel,
        Tracking und Ausspielung als ein System mit dem Konfigurator.
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
        aria-label="Produktformel: CH-Logik plus Konfigurator plus Lead-Übergabe ergibt Ergebnis"
      >
        <div className={styles.stackCard}>
          <span className={styles.stackIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M9 4.5 4 6.5v13l5-2 6 2 5-2v-13l-5 2-6-2z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path d="M9 4.5v13M15 6.5v13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </span>
          <h4 className={styles.stackTitle}>CH-Logik</h4>
          <p>
            Kanton, Franchise, Modell und Unfall – Schweizer Prämienlogik, die Vergleich und
            Beratung tragen.
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
            Guided Experience für den Schweizer Markt: verständlich geführt, vom Wohnort bis zur
            Offerte.
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
          <h4 className={styles.stackTitle}>Lead-Übergabe</h4>
          <p>
            Strukturierte Payload an die Beratung – Offertanfrage mit Kontext, nicht als leerer
            Kontakt.
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
            Helvetiq – eine Leadmaschine für den Schweizer Versicherungsmarkt: Vergleich, Offerte
            und Beratung als durchgängiges System.
          </p>
        </div>
      </div>
    </div>
  );
}

export function LstFinanceCasePage({ onClose }: { onClose: () => void }) {
  useDocumentSeo({
    title: "Leadmaschine für Schweizer Versicherungen | supragent",
    description:
      "Success Story Helvetiq: Leadmaschine mit Schweizer Prämienlogik, Offertanfrage und Lead-Übergabe an die Beratung.",
    canonical: `${window.location.origin}/case/lst-finance-versicherungskonfigurator`,
  });

  return (
    <PageShell
      title="Leadmaschine für Schweizer Versicherungen"
      eyebrow="Success Story · Helvetiq"
      onBack={onClose}
      footer={
        <ModalContactFooter onClose={onClose} label="Ähnliches Projekt besprechen" />
      }
    >
      <div className={styles.content}>
        <section className={styles.heroSection}>
          <div className={styles.deviceStage} aria-label="Produktvideo und Live-Produkt">
            <div className={styles.deviceGlow} aria-hidden="true" />

            <div className={styles.macbookHero}>
              <div className={styles.macbook}>
                <div className={styles.macbookLid}>
                  <div className={styles.macbookBezel}>
                    <span className={styles.macbookCamera} aria-hidden="true" />
                    <div className={`${styles.macbookScreen} ${local.macbookScreenWide}`}>
                      <DeviceVideo
                        className={`${styles.macbookVideo} ${local.macbookVideoFit}`}
                        src={lstFinanceCaseVideo.src}
                        poster={lstFinanceCaseVideo.poster}
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

            <div className={`${styles.iphoneFloat} ${local.phoneFloat}`}>
              <div className={styles.iphoneFrame}>
                <span className={styles.iphoneIsland} aria-hidden="true" />
                <div className={styles.iphoneScreen}>
                  <div
                    className={`${styles.safariChrome} ${local.safariChromeTight}`}
                    aria-hidden="true"
                  >
                    <div className={styles.safariUrl}>
                      <span className={styles.safariLock} />
                      <span>helvetiq.supragent.net</span>
                    </div>
                  </div>
                  <PhoneLivePreview title="Krankenversicherungs-Vergleich Schweiz – Mobile" />
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
                  location: "lst_finance_case",
                })
              }
            >
              Live ansehen
            </CtaButton>
          </div>

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
