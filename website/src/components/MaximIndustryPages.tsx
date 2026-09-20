import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useOverlay } from "../context/OverlayContext";
import {
  maximIndustryPages,
  type MaximIndustryIcon,
  type MaximIndustryPage,
} from "../data/maximIndustryContent";
import { maximTrust } from "../data/maximCalc";
import { CALENDLY_URL } from "../lib/analytics";
import { DURATION, EASE } from "../motion";
import { CtaButton } from "./CtaButton";
import { MaximHeroBenefits } from "./MaximHeroBenefits";
import { ScrollReveal } from "./ScrollReveal";
import { ServiceHeroLayout } from "./ServicePageParts";
import sharedStyles from "./ServiceModal.module.css";
import styles from "./MaximIndustryPages.module.css";

function IndustrySectionTitle({
  children,
  statement = false,
}: {
  children: ReactNode;
  statement?: boolean;
}) {
  return (
    <h3 className={`${styles.sectionTitle} ${statement ? styles.statementTitle : ""}`.trim()}>
      {children}
    </h3>
  );
}

function IndustryGlyph({
  type,
  className,
}: {
  type: MaximIndustryIcon;
  className?: string;
}) {
  if (type === "office") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M5 21V5h10v16M15 10h4v11M8 9h4M8 13h4M8 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "furniture") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M5 12V8a3 3 0 013-3h8a3 3 0 013 3v4M4 11a2 2 0 012 2v4h12v-4a2 2 0 114 0v7H2v-7a2 2 0 012-2ZM5 20v2M19 20v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "forwarding") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M3 6h11v11H3zM14 10h4l3 3v4h-7zM6 20a2 2 0 100-4 2 2 0 000 4ZM18 20a2 2 0 100-4 2 2 0 000 4ZM7 10h4M9 8v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "workshop") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M4 20V9l8-5 8 5v11M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M3 8h12v9H3zM15 11h3l3 3v3h-6zM6 20a2 2 0 100-4 2 2 0 000 4ZM18 20a2 2 0 100-4 2 2 0 000 4ZM6 8V5h6v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckGlyph({ alert = false }: { alert?: boolean }) {
  return alert ? (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 3 18 17H2L10 3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M10 8v4M10 14.5v.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.4" />
      <path d="m7 10 2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MaximIndustryLinks({
  compact = false,
  current,
}: {
  compact?: boolean;
  current?: string;
}) {
  const { openServiceSubpage } = useOverlay();
  const pages = maximIndustryPages.filter((page) => page.slug !== current);

  return (
    <div className={`${styles.linkSection} ${compact ? styles.linkSectionCompact : ""}`}>
      <div className={styles.linkIntro}>
        {compact ? (
          <>
            <span>Andere Branche?</span>
            <p>Dieselbe Kalkulationslogik, zugeschnitten auf einen anderen Betriebstyp.</p>
          </>
        ) : (
          <>
            <span>Für Ihre Branche</span>
            <p>
              Maxim für KFZ-Werkstätten, Umzug, Transport und verwandte Betriebe –
              jeweils zugeschnitten auf die typische Anfrage- und Kalkulationslogik.
            </p>
          </>
        )}
      </div>
      <div className={styles.linkGrid}>
        {pages.map((page) => (
          <button
            key={page.slug}
            type="button"
            className={styles.linkCard}
            onClick={() => openServiceSubpage("kalkulations-agent", page.slug)}
          >
            <span className={styles.linkIcon}>
              <IndustryGlyph type={page.icon} />
            </span>
            <span>
              <strong>{page.navTitle}</strong>
              <small>{page.tileLead}</small>
            </span>
            <span className={styles.linkArrow} aria-hidden="true">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function IndustryNav({ active }: { active: string }) {
  const { openService, openServiceSubpage } = useOverlay();
  return (
    <nav className={styles.industryNav} aria-label="Kalkulations-Agent Branchen">
      <button type="button" onClick={() => openService("kalkulations-agent")}>
        Alle Branchen
      </button>
      {maximIndustryPages.map((page) => (
        <button
          key={page.slug}
          type="button"
          aria-current={page.slug === active ? "page" : undefined}
          onClick={() => openServiceSubpage("kalkulations-agent", page.slug)}
        >
          {page.navTitle}
        </button>
      ))}
    </nav>
  );
}

export { IndustryNav as MaximIndustryNav };

export function MaximIndustryContent({ page }: { page: MaximIndustryPage }) {
  const [openFaq, setOpenFaq] = useState(0);
  const reduce = useReducedMotion();

  return (
    <div
      className={`${sharedStyles.content} ${styles.page} ${
        page.variant === "module" ? styles.module : ""
      }`.trim()}
    >
      <ServiceHeroLayout
        titleAsH1
        tag={
          <span className={sharedStyles.heroTag}>
            <span className={styles.heroGlyph}><IndustryGlyph type={page.icon} /></span>
            {page.eyebrow}
          </span>
        }
        title={<>{page.hero.title}</>}
        lead={page.hero.lead}
        mark={<MaximHeroBenefits />}
        ctas={
          <>
            <CtaButton
              size="md"
              surface="accent"
              href={CALENDLY_URL}
              showCalendar
              analyticsLocation={`maxim_${page.slug}_hero`}
            >
              {page.finalCta.button}
            </CtaButton>
            <CtaButton
              size="md"
              surface="on-dark-ghost"
              onClick={() => document.getElementById("branche-so-gehts")?.scrollIntoView({
                behavior: reduce ? "auto" : "smooth",
              })}
            >
              So funktioniert es
            </CtaButton>
          </>
        }
      />

      <IndustryNav active={page.slug} />

      <ScrollReveal as="section" className={styles.scenario}>
        <span className={styles.eyebrow}>Aus Ihrem Alltag</span>
        <IndustrySectionTitle statement>{page.scenario.title}</IndustrySectionTitle>
        <blockquote>{page.scenario.request}</blockquote>
        <div className={styles.missingGrid}>
          {page.scenario.missing.map((item) => (
            <span key={item}><CheckGlyph alert />{item}</span>
          ))}
        </div>
        <p className={styles.scenarioConclusion}>{page.scenario.conclusion}</p>
      </ScrollReveal>

      <ScrollReveal as="section" className={styles.section}>
        <span className={styles.eyebrow}>Das Problem</span>
        <IndustrySectionTitle>{page.sectionCopy.problemTitle}</IndustrySectionTitle>
        <div className={styles.cardGrid}>
          {page.pains.map((pain, index) => (
            <article key={pain.title} className={styles.painCard}>
              <span className={styles.cardIndex}>{String(index + 1).padStart(2, "0")}</span>
              <h4>{pain.title}</h4>
              <p>{pain.text}</p>
            </article>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className={styles.section} >
        <span className={styles.eyebrow}>Die Lösung</span>
        <IndustrySectionTitle>{page.solutionTitle}</IndustrySectionTitle>
        <p className={styles.lead}>{page.solutionLead}</p>
        <div id="branche-so-gehts" className={styles.workflow}>
          {page.workflow.map((step, index) => (
            <article key={step.title} className={styles.workflowStep}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className={styles.checkBand}>
        <div>
          <span className={styles.eyebrow}>Prüflogik</span>
          <IndustrySectionTitle>{page.sectionCopy.checksTitle}</IndustrySectionTitle>
          {page.sectionCopy.checksLead ? (
            <p className={styles.checkLead}>{page.sectionCopy.checksLead}</p>
          ) : null}
        </div>
        <div className={styles.checkGrid}>
          {page.checks.map((check) => (
            <article key={check.title}>
              <span><CheckGlyph /></span>
              <h4>{check.title}</h4>
              <p>{check.text}</p>
            </article>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className={`${styles.section} ${styles.exampleSection}`}>
        <span className={styles.eyebrow}>Konkretes Beispiel</span>
        <IndustrySectionTitle statement>{page.sectionCopy.exampleTitle}</IndustrySectionTitle>
        <div className={`${styles.example} ${styles[`example-${page.example.visual}`]}`}>
          <div className={styles.exampleInput}>
            <span>{page.example.labels[0]}</span>
            <strong>{page.example.request}</strong>
            {page.example.sources?.length ? (
              <div className={styles.exampleSources}>
                {page.example.sources.map((source) => <small key={source}>{source}</small>)}
              </div>
            ) : null}
          </div>
          <div className={styles.exampleOpen}>
            <span>{page.example.labels[1]}</span>
            <ul>{page.example.open.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className={styles.exampleResult}>
            <span>{page.example.labels[2]}</span>
            <p>{page.example.result}</p>
            <small>{page.example.note}</small>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className={styles.section}>
        <span className={styles.eyebrow}>Integrationen</span>
        <IndustrySectionTitle>{page.sectionCopy.integrationsTitle}</IndustrySectionTitle>
        <div className={styles.integrationGrid}>
          {page.integrations.map((integration) => (
            <article key={integration.title}>
              <span className={styles.integrationLine} aria-hidden="true" />
              <h4>{integration.title}</h4>
              <p>{integration.text}</p>
            </article>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className={styles.boundaryBand}>
        <div>
          <span className={styles.eyebrow}>Klare Grenzen</span>
          <IndustrySectionTitle>Was beim Menschen bleibt.</IndustrySectionTitle>
        </div>
        <ul>
          {page.boundaries.map((boundary) => (
            <li key={boundary}><CheckGlyph />{boundary}</li>
          ))}
        </ul>
      </ScrollReveal>

      <ScrollReveal as="section" className={styles.section}>
        <span className={styles.eyebrow}>{page.sectionCopy.stagesEyebrow}</span>
        <IndustrySectionTitle>{page.sectionCopy.stagesTitle}</IndustrySectionTitle>
        <div className={styles.stageGrid}>
          {page.stages.map((stage, index) => (
            <article
              key={stage.title}
              className={page.featuredStage === index ? styles.featuredStage : undefined}
            >
              <span>Stufe {index + 1}</span>
              <h4>{stage.title}</h4>
              <p>{stage.text}</p>
            </article>
          ))}
        </div>
      </ScrollReveal>

      {page.timeline ? (
        <ScrollReveal as="section" className={styles.section}>
          <span className={styles.eyebrow}>Einführung</span>
          <IndustrySectionTitle>{page.timeline.title}</IndustrySectionTitle>
          <div className={styles.timeline}>
            {page.timeline.steps.map((step, index) => (
              <article key={step.title}>
                <span>{step.when ?? String(index + 1).padStart(2, "0")}</span>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </ScrollReveal>
      ) : null}

      {page.variant !== "module" || page.trust ? (
        <ScrollReveal as="section" className={styles.trustBand}>
          <span className={styles.eyebrow}>Ihre Daten</span>
          <IndustrySectionTitle>{page.sectionCopy.trustTitle}</IndustrySectionTitle>
          <div className={styles.trustGrid}>
            {(page.trust ?? maximTrust).map((item) => (
              <article key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </ScrollReveal>
      ) : null}

      <ScrollReveal as="section" className={styles.section}>
        <IndustrySectionTitle>Häufige Fragen</IndustrySectionTitle>
        <div className={styles.faq}>
          {page.faq.map((item, index) => {
            const open = openFaq === index;
            return (
              <div key={item.q} className={styles.faqItem}>
                <button type="button" aria-expanded={open} onClick={() => setOpenFaq(open ? -1 : index)}>
                  {item.q}<span aria-hidden="true">{open ? "−" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      className={styles.faqPanel}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: DURATION.normal, ease: EASE.outSmooth }}
                    >
                      <p>{item.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className={styles.finalCta}>
        <div>
          <span className={styles.eyebrow}>{page.finalCta.eyebrow}</span>
          <IndustrySectionTitle statement>{page.finalCta.title}</IndustrySectionTitle>
          <p>{page.finalCta.text}</p>
        </div>
        <CtaButton
          size="md"
          surface="accent"
          href={CALENDLY_URL}
          showCalendar
          analyticsLocation={`maxim_${page.slug}_final`}
        >
          {page.finalCta.button}
        </CtaButton>
      </ScrollReveal>

      <MaximIndustryLinks compact current={page.slug} />
    </div>
  );
}
