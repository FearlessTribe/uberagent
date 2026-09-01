import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useOverlay } from "../context/OverlayContext";
import { CtaButton } from "./CtaButton";
import { CopilotAgentVisual } from "./CopilotAgentVisual";
import { ScrollReveal } from "./ScrollReveal";
import { SectionTitle, ServiceHeroLayout } from "./ServicePageParts";
import {
  type CopilotWorkflowIcon,
  copilotBenefitsIntro,
  copilotFaq,
  copilotFinalLead,
  copilotFinalMeta,
  copilotFinalTitle,
  copilotFit,
  copilotFitNote,
  copilotHeroLead,
  copilotHeroNote,
  copilotKpiMetrics,
  copilotKpiNote,
  copilotOfferIntro,
  copilotProblemBody,
  copilotProcess,
  copilotProcessFootnote,
  copilotTiers,
  copilotTiersFootnote,
  copilotWhyLead,
  copilotWhyTiles,
  copilotWorkflowPatternNote,
  copilotWorkflowPatternSteps,
  copilotWorkflows,
} from "../data/copilotAgentsContent";
import { serviceModalMeta } from "../data/serviceModalContent";
import { teamMembers } from "../data/team";
import { trackCalendlyClick } from "../lib/analytics";
import { DURATION, EASE } from "../motion";
import copilotStyles from "./CopilotAgentsContent.module.css";
import styles from "./ServiceModal.module.css";

const CALENDLY_URL = "https://calendly.com/supraflow/30min";

function WorkflowIcon({ icon }: { icon: CopilotWorkflowIcon }) {
  if (icon === "inbox") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M4 6h16v12H4z" />
        <path d="M4 9l8 5 8-5" />
      </svg>
    );
  }

  if (icon === "document") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M8 3h7l4 4v14H8z" />
        <path d="M15 3v5h5" />
        <path d="M11 13h6M11 17h6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M6 4h12v16H6z" />
      <path d="M9 9h6M9 13h6M9 17h4" />
    </svg>
  );
}

export function CopilotAgentsContent() {
  const meta = serviceModalMeta["copilot-agents"];
  const { openService, openProject } = useOverlay();
  const [openFaq, setOpenFaq] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className={`${styles.content} ${copilotStyles.page}`}>
      <ServiceHeroLayout
        tag={<span className={styles.heroTag}>{meta.bannerTag}</span>}
        title={
          <>
            Copilot-Agenten, die in Ihrem Microsoft 365 <em>arbeiten</em>. Nicht nur
            antworten.
          </>
        }
        lead={copilotHeroLead}
        note={copilotHeroNote}
        stats={meta.stats}
        visual={<CopilotAgentVisual />}
        centerCopy
        ctas={
          <>
            <CtaButton
              size="md"
              surface="accent"
              showCalendar
              href={CALENDLY_URL}
              onClick={() => trackCalendlyClick("copilot_hero")}
            >
              Workflow in 30 Minuten prüfen
            </CtaButton>
            <CtaButton
              size="md"
              surface="on-dark-ghost"
              onClick={() => {
                document.getElementById("copilot-offer")?.scrollIntoView({
                  behavior: reduceMotion ? "auto" : "smooth",
                  block: "start",
                });
              }}
            >
              Zum Festpreis-Sprint
            </CtaButton>
          </>
        }
      />

      <ScrollReveal as="section" className={copilotStyles.problemBand}>
        <p className={copilotStyles.eyebrow}>Das Problem</p>
        <h3 className={copilotStyles.problemLead}>
          Copilot ist da. Die <em>Arbeit auch</em>.
        </h3>
        {copilotProblemBody.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className={copilotStyles.problemBody}>
            {paragraph}
          </p>
        ))}
        <p className={copilotStyles.problemBody}>{copilotBenefitsIntro}</p>
        <div className={copilotStyles.metricsRow}>
          {copilotKpiMetrics.map((metric) => (
            <div key={metric.value} className={copilotStyles.metric}>
              <span className={copilotStyles.metricValue}>{metric.value}</span>
              <span className={copilotStyles.metricLabel}>{metric.label}</span>
            </div>
          ))}
        </div>
        <p className={copilotStyles.problemBody}>{copilotKpiNote}</p>
      </ScrollReveal>

      <ScrollReveal as="section" className={copilotStyles.section}>
        <SectionTitle>Drei Workflows, konkret</SectionTitle>
        <ScrollReveal className={copilotStyles.workflowGrid} stagger>
          {copilotWorkflows.map((workflow) => (
            <article key={workflow.num} className={copilotStyles.workflowCard}>
              <div className={copilotStyles.workflowTop}>
                <span className={copilotStyles.workflowIcon}>
                  <WorkflowIcon icon={workflow.icon} />
                </span>
                <span className={copilotStyles.workflowNum}>{workflow.num}</span>
              </div>
              <h4 className={copilotStyles.workflowTitle}>{workflow.title}</h4>
              <p className={copilotStyles.workflowSummary}>{workflow.summary}</p>
              <dl className={copilotStyles.workflowSteps}>
                {workflow.steps.map((step) => (
                  <div key={step.label} className={copilotStyles.workflowStep}>
                    <dt>{step.label}</dt>
                    <dd>{step.text}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </ScrollReveal>
        <div className={copilotStyles.patternStrip} aria-hidden>
          {copilotWorkflowPatternSteps.flatMap((step, index) => [
            index > 0 ? (
              <span key={`${step}-arrow`} className={copilotStyles.patternArrow}>
                →
              </span>
            ) : null,
            <span key={step} className={copilotStyles.patternStep}>
              {step}
            </span>,
          ])}
        </div>
        <p className={styles.bodyText}>{copilotWorkflowPatternNote}</p>
      </ScrollReveal>

      <ScrollReveal as="section" className={copilotStyles.section}>
        <SectionTitle>Wann es passt, und wann nicht</SectionTitle>
        <div className={styles.fitGrid}>
          <div className={styles.fitCard}>
            <span className={styles.fitLabelGood}>Geeignet</span>
            <ul className={styles.compactList}>
              {copilotFit.good.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.fitCard}>
            <span className={styles.fitLabelBad}>Weniger geeignet</span>
            <ul className={styles.compactList}>
              {copilotFit.bad.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className={styles.bodyText}>
          {copilotFitNote}{" "}
          <button
            type="button"
            className={copilotStyles.inlineLinkBtn}
            onClick={() => openService("workflow-agents")}
          >
            AI Workflow Agents
          </button>{" "}
          für Workflows außerhalb von Microsoft 365,{" "}
          <button
            type="button"
            className={copilotStyles.inlineLinkBtn}
            onClick={() => openService("mcp")}
          >
            MCP-Integrationen
          </button>{" "}
          für Fachsysteme.
        </p>
      </ScrollReveal>

      <section
        id="copilot-offer"
        className={`${styles.fullBleed} ${copilotStyles.offerBand}`}
      >
        <ScrollReveal className={copilotStyles.offerInner}>
          <SectionTitle>Angebot und Lieferumfang</SectionTitle>
          <p className={copilotStyles.offerIntro}>{copilotOfferIntro}</p>
          <div className={styles.tiers}>
            {copilotTiers.map((tier) => (
              <div
                key={tier.id}
                className={`${styles.tier} ${tier.featured ? styles.tierHero : ""}`}
              >
                <span className={styles.tierCap}>{tier.cap}</span>
                <div className={styles.tierPrice}>
                  {tier.price}
                  <small>{tier.note}</small>
                </div>
                <ul className={styles.tierList}>
                  {tier.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {tier.featured && (
                  <div className={styles.tierFoot}>
                    <CtaButton
                      size="sm"
                      surface="on-dark"
                      href={CALENDLY_URL}
                      onClick={() => trackCalendlyClick("copilot_sprint")}
                    >
                      Sprint besprechen
                    </CtaButton>
                    {"gate" in tier && tier.gate && (
                      <p className={styles.tierGate}>{tier.gate}</p>
                    )}
                  </div>
                )}
                {tier.id === "blueprint" && (
                  <div className={styles.tierFoot}>
                    <CtaButton
                      size="sm"
                      surface="on-dark"
                      href={CALENDLY_URL}
                      onClick={() => trackCalendlyClick("copilot_blueprint")}
                    >
                      Blueprint anfragen
                    </CtaButton>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className={copilotStyles.offerFootnote}>{copilotTiersFootnote}</p>
        </ScrollReveal>
      </section>

      <ScrollReveal as="section" className={copilotStyles.section}>
        <SectionTitle>Ablauf der Zusammenarbeit</SectionTitle>
        <div className={copilotStyles.processTrack}>
          {copilotProcess.map((step, index) => (
            <div key={step.title} className={copilotStyles.processStep}>
              <span className={copilotStyles.processIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h4 className={copilotStyles.processTitle}>{step.title}</h4>
              <span className={copilotStyles.processWhen}>{step.when}</span>
              <p className={copilotStyles.processDetail}>{step.detail}</p>
            </div>
          ))}
        </div>
        <p className={styles.footnote}>{copilotProcessFootnote}</p>
      </ScrollReveal>

      <ScrollReveal as="section" className={copilotStyles.section}>
        <SectionTitle>Warum uberagent</SectionTitle>
        <div className={copilotStyles.proofLayout}>
          <div className={copilotStyles.proofLeadCard}>
            <span className={copilotStyles.proofLeadLabel}>{copilotWhyLead.title}</span>
            <p>{copilotWhyLead.text}</p>
            <button
              type="button"
              className={copilotStyles.inlineLinkBtn}
              onClick={() => openProject("ai-sales-agent")}
            >
              AI Sales Agent für eine führende Schweizer Digitalagentur
            </button>
          </div>
          <div className={copilotStyles.proofGrid}>
            {copilotWhyTiles.map((point) => (
              <div key={point.title} className={copilotStyles.proofTile}>
                <span className={copilotStyles.proofTileTitle}>{point.title}</span>
                <p>{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className={copilotStyles.section}>
        <SectionTitle>Häufige Fragen</SectionTitle>
        <div className={styles.engineFaq}>
          {copilotFaq.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={item.question} className={styles.engineFaqItem}>
                <button
                  type="button"
                  className={styles.engineFaqTrigger}
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                >
                  {item.question}
                  <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className={styles.engineFaqPanel}
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{
                        duration: reduceMotion ? 0 : DURATION.normal,
                        ease: EASE.outExpo,
                      }}
                    >
                      <p className={styles.engineFaqAnswer}>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </ScrollReveal>

      <ScrollReveal as="section">
        <div className={styles.engineFinal}>
          <div className={styles.engineFinalCopy}>
            <h3>{copilotFinalTitle}</h3>
            <p>{copilotFinalLead}</p>
            <CtaButton
              size="md"
              surface="on-dark"
              href={CALENDLY_URL}
              onClick={() => trackCalendlyClick("copilot_final")}
            >
              Erstgespräch sichern
            </CtaButton>
            <div className={styles.engineFinalMeta}>
              {copilotFinalMeta.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className={styles.engineFinalProfile}>
            <img
              src={teamMembers[0].image}
              alt={teamMembers[0].name}
              className={styles.engineFinalPhoto}
              width={320}
              height={330}
            />
            <p className={styles.engineFinalName}>Laurens Lang, M.Sc. MBA</p>
            <p className={styles.engineFinalRole}>Founder · uberagent · Zürich</p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
