import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Lottie } from "lottie-react";
import {
  maximKfzCompare,
  maximKfzCta,
  maximKfzExample,
  maximKfzFaq,
  maximKfzFit,
  maximKfzGains,
  maximKfzHero,
  maximKfzRules,
  maximKfzStack,
  maximKfzSteps,
} from "../data/maximKfzContent";
import { maximKalkulationscheck } from "../data/maximCalc";
import { CALENDLY_URL } from "../lib/analytics";
import { DURATION, EASE } from "../motion";
import { CtaButton } from "./CtaButton";
import { FlipClockMinutes } from "./FlipClockMinutes";
import { MaximIndustryLinks, MaximIndustryNav } from "./MaximIndustryPages";
import { MaximRoiCalc } from "./MaximRoiCalc";
import { ScrollReveal } from "./ScrollReveal";
import { ServiceHeroLayout } from "./ServicePageParts";
import { StackedCards } from "./StackedCards";
import sharedStyles from "./ServiceModal.module.css";
import serviceStyles from "./Services.module.css";
import styles from "./MaximKfzContent.module.css";

function WorkshopGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M4 20V9l8-5 8 5v11M9 20v-6h6v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function StackCardIcon({
  type,
}: {
  type: (typeof maximKfzStack)[number]["icon"];
}) {
  if (type === "orders") {
    return (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path
          d="M34 8 14 34h16l-4 22 24-30H34V8Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (type === "time") {
    return (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="32" cy="34" r="18" stroke="currentColor" strokeWidth="2.2" />
        <path
          d="M32 24v12l8 4"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26 10h12M32 10v4"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path
        d="M38 48v-2a8 8 0 00-8-8H18a8 8 0 00-8 8v2"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="24" cy="22" r="7" stroke="currentColor" strokeWidth="2.2" />
      <path
        d="M54 48v-2a7 7 0 00-5-6.7M42 16a7 7 0 010 13.4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="m44 40 4 4 8-9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type SectionIcon =
  | (typeof maximKfzGains.items)[number]["icon"]
  | (typeof maximKfzSteps.items)[number]["icon"];

type ExampleIcon = (typeof maximKfzExample.stages)[number]["icon"];

function ExampleStageIcon({ type }: { type: ExampleIcon }) {
  const common = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };

  if (type === "request") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 6h14v10H9l-4 3V6z" {...common} />
        <path d="M9 10h6M9 13h4" {...common} />
      </svg>
    );
  }
  if (type === "process") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3" {...common} />
        <path
          d="M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4"
          {...common}
        />
      </svg>
    );
  }
  if (type === "calc") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="3" width="14" height="18" rx="2" {...common} />
        <path d="M8 8h8M8 12h3M13 12h3M8 16h3M13 16h3" {...common} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h8l4 4v12a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" {...common} />
      <path d="M15 3v4h4M9 12h6M9 16h4" {...common} />
    </svg>
  );
}

function SectionIconGlyph({ type }: { type: SectionIcon }) {
  const common = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };

  switch (type) {
    case "time":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8" {...common} />
          <path d="M12 8v4.5L15 15" {...common} />
        </svg>
      );
    case "reply":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 12h12M10 6l6 6-6 6" {...common} />
        </svg>
      );
    case "questions":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8" {...common} />
          <path d="M9.5 9.5a2.5 2.5 0 114 2c-.8.6-1.5 1.1-1.5 2.5M12 17h.01" {...common} />
        </svg>
      );
    case "uniform":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 7h8M8 12h8M8 17h5" {...common} />
          <rect x="4" y="4" width="16" height="16" rx="3" {...common} />
        </svg>
      );
    case "control":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8" {...common} />
          <path d="m8.5 12 2.5 2.5 4.5-5" {...common} />
        </svg>
      );
    case "clock":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 8v4l2.5 1.5" {...common} />
          <circle cx="12" cy="12" r="8" {...common} />
          <path d="M5 4l2 2M19 4l-2 2" {...common} />
        </svg>
      );
    case "inbox":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 8l8-4 8 4v9a2 2 0 01-2 2H6a2 2 0 01-2-2V8z" {...common} />
          <path d="M4 11h4l2 3h4l2-3h4" {...common} />
        </svg>
      );
    case "info":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8" {...common} />
          <path d="M12 11v5M12 8h.01" {...common} />
        </svg>
      );
    case "calc":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="5" y="3" width="14" height="18" rx="2" {...common} />
          <path d="M8 8h8M8 12h3M13 12h3M8 16h3M13 16h3" {...common} />
        </svg>
      );
    case "check":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 7 10 17l-5-5" {...common} />
        </svg>
      );
    default:
      return null;
  }
}

function AccentMark({ children }: { children: ReactNode }) {
  return <span className={`em mark ${styles.titleAccent}`}>{children}</span>;
}

function MarkHeading({
  title,
  mark,
  className = "",
  as: Tag = "h3",
}: {
  title: string;
  mark: string;
  className?: string;
  as?: "h3" | "h2";
}) {
  const index = title.indexOf(mark);
  let content: ReactNode = title;
  if (index !== -1) {
    content = (
      <>
        {title.slice(0, index)}
        <AccentMark>{mark}</AccentMark>
        {title.slice(index + mark.length)}
      </>
    );
  }
  return <Tag className={`${styles.sectionTitle} ${className}`.trim()}>{content}</Tag>;
}

function MidCta({ location }: { location: string }) {
  return (
    <ScrollReveal as="section" className={styles.midCta}>
      <div>
        <h3>{maximKfzCta.title}</h3>
        <p>{maximKfzCta.text}</p>
      </div>
      <div className={styles.midCtaActions}>
        <CtaButton
          size="md"
          surface="accent"
          href={CALENDLY_URL}
          showCalendar
          analyticsLocation={location}
        >
          {maximKfzCta.button}
        </CtaButton>
      </div>
    </ScrollReveal>
  );
}

export function MaximKfzContent() {
  const [openFaq, setOpenFaq] = useState(0);
  const reduce = useReducedMotion();

  const scrollToSteps = () => {
    document.getElementById("kfz-so-gehts")?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  };

  const scrollToCheck = () => {
    document.getElementById("kalkulations-check")?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div className={`${sharedStyles.content} ${styles.page}`}>
      <ServiceHeroLayout
        titleAsH1
        rawTitle
        tag={
          <span className={sharedStyles.heroTag}>
            <span className={styles.heroGlyph}>
              <WorkshopGlyph />
            </span>
            {maximKfzHero.eyebrow}
          </span>
        }
        title={
          <>
            Angebote in <AccentMark>20 Sekunden</AccentMark> statt in{" "}
            <FlipClockMinutes from={15} to={30} subtle /> Minuten.
          </>
        }
        lead={maximKfzHero.lead}
        ctas={
          <>
            <CtaButton
              size="md"
              surface="accent"
              onClick={scrollToCheck}
              analyticsLocation="maxim_kfz_hero"
            >
              {maximKfzHero.primaryCta}
            </CtaButton>
            <CtaButton size="md" surface="on-dark-ghost" onClick={scrollToSteps}>
              {maximKfzHero.secondaryCta}
            </CtaButton>
          </>
        }
      />

      <MaximIndustryNav active="kfz" />

      <section className={styles.stackSection}>
        <StackedCards className={styles.stack} offsetTop={96} stackGap={16}>
          {maximKfzStack.map((card, index) => (
            <article
              key={card.titleAccent}
              className={`card card-dark ${serviceStyles.serviceCard} ${styles.stackCard}`}
            >
              <div className={serviceStyles.cardMain}>
                <div className={serviceStyles.cardCopy}>
                  <span className={serviceStyles.cardEyebrow}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className={`${serviceStyles.serviceTitle} ${styles.stackTitle}`}>
                    <span className={`em mark ${serviceStyles.titleAccent}`}>
                      {card.titleAccent}
                    </span>
                    <span className={styles.stackTitleRest}>{card.titleRest}</span>
                  </h3>
                  <p className={`${serviceStyles.cardDescription} ${styles.stackDescription}`}>
                    {card.text}
                  </p>
                </div>
              </div>
              <div className={serviceStyles.cardVisual} aria-hidden="true">
                <div className={serviceStyles.visualFrame}>
                  {reduce ? (
                    <span className={styles.stackIconFallback}>
                      <StackCardIcon type={card.icon} />
                    </span>
                  ) : (
                    <Lottie
                      src={card.lottieSrc}
                      loop
                      autoplay
                      className={`${serviceStyles.visualLottie} ${serviceStyles.visualLottieSpacious}`}
                    />
                  )}
                </div>
              </div>
            </article>
          ))}
        </StackedCards>
      </section>

      <ScrollReveal as="section" className={styles.section}>
        <span className={styles.eyebrow}>{maximKfzCompare.eyebrow}</span>
        <MarkHeading title={maximKfzCompare.title} mark="Klarere Vorbereitung" />
        <div className={styles.compareGrid}>
          <article className={styles.compareCard}>
            <header>
              <span>{maximKfzCompare.today.title}</span>
              <p>{maximKfzCompare.today.lead}</p>
            </header>
            <ol>
              {maximKfzCompare.today.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>
          <article className={`${styles.compareCard} ${styles.compareCardAccent}`}>
            <header>
              <span>{maximKfzCompare.withMaxim.title}</span>
              <p>{maximKfzCompare.withMaxim.lead}</p>
            </header>
            <ol>
              {maximKfzCompare.withMaxim.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className={styles.section}>
        <span className={styles.eyebrow}>{maximKfzExample.eyebrow}</span>
        <h3 className={`${styles.sectionTitle} ${styles.statementTitle}`}>
          „Meine Bremsen vorne müssen gemacht werden.{" "}
          <AccentMark>Was kostet das?</AccentMark>“
        </h3>
        <p className={styles.lead}>{maximKfzExample.lead}</p>
        <div className={styles.flow}>
          {maximKfzExample.stages.map((stage, index) => (
            <div key={stage.label} className={styles.flowStageWrap}>
              <article className={styles.flowStage}>
                <div className={styles.flowHead}>
                  <span className={styles.flowIcon} aria-hidden="true">
                    <ExampleStageIcon type={stage.icon} />
                  </span>
                  <span className={styles.flowIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h4>{stage.label}</h4>
                <ul>
                  {stage.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {"note" in stage && stage.note ? (
                  <small className={styles.flowNote}>{stage.note}</small>
                ) : null}
              </article>
              {index < maximKfzExample.stages.length - 1 ? (
                <span className={styles.flowArrow} aria-hidden="true">
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </ScrollReveal>

      <MidCta location="maxim_kfz_after_example" />

      <ScrollReveal as="section" className={styles.rulesBand}>
        <div>
          <span className={styles.eyebrow}>{maximKfzRules.eyebrow}</span>
          <MarkHeading title={maximKfzRules.title} mark="Ihren Regeln" />
          <p className={styles.lead}>{maximKfzRules.lead}</p>
        </div>
        <ul className={styles.rulesList}>
          {maximKfzRules.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className={styles.rulesNote}>{maximKfzRules.note}</p>
      </ScrollReveal>

      <ScrollReveal as="section" className={styles.section}>
        <span className={styles.eyebrow}>{maximKfzGains.eyebrow}</span>
        <MarkHeading title={maximKfzGains.title} mark={maximKfzGains.titleMark} />
        <div className={styles.gainGrid}>
          {maximKfzGains.items.map((item) => (
            <article key={item.title} className={styles.gainCard}>
              <span className={styles.cardIcon} aria-hidden="true">
                <SectionIconGlyph type={item.icon} />
              </span>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className={styles.section}>
        <div id="kfz-so-gehts">
          <span className={styles.eyebrow}>{maximKfzSteps.eyebrow}</span>
          <MarkHeading title={maximKfzSteps.title} mark={maximKfzSteps.titleMark} />
          <div className={styles.steps}>
            {maximKfzSteps.items.map((step, index) => (
              <article key={step.title} className={styles.step}>
                <span className={styles.cardIcon} aria-hidden="true">
                  <SectionIconGlyph type={step.icon} />
                </span>
                <div>
                  <span className={styles.stepNum}>{String(index + 1).padStart(2, "0")}</span>
                  <h4>{step.title}</h4>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <MidCta location="maxim_kfz_after_steps" />

      <ScrollReveal as="section" className={styles.section}>
        <MarkHeading
          title={maximKalkulationscheck.title}
          mark="Wieviel sparen Sie damit?"
        />
        <p className={styles.lead}>{maximKalkulationscheck.lead}</p>
        <div className={styles.roiWrap}>
          <MaximRoiCalc />
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className={styles.fitBand}>
        <span className={styles.eyebrow}>{maximKfzFit.eyebrow}</span>
        <h3 className={`${styles.sectionTitle} ${styles.statementTitle}`}>
          Passt sich Ihrer Werkstatt an – <AccentMark>nicht umgekehrt</AccentMark>.
        </h3>
        <p className={styles.lead}>{maximKfzFit.lead}</p>
        <p className={styles.fitCheckTitle}>{maximKfzFit.checklistTitle}</p>
        <ul className={styles.fitList}>
          {maximKfzFit.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </ScrollReveal>

      <ScrollReveal as="section" className={styles.section}>
        <MarkHeading title="Häufige Fragen" mark="Fragen" />
        <div className={styles.faq}>
          {maximKfzFaq.map((item, index) => {
            const open = openFaq === index;
            return (
              <div key={item.q} className={styles.faqItem}>
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenFaq(open ? -1 : index)}
                >
                  {item.q}
                  <span aria-hidden="true">{open ? "−" : "+"}</span>
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

      <MaximIndustryLinks compact current="kfz" />
    </div>
  );
}
