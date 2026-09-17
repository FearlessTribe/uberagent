import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useOverlay } from "../context/OverlayContext";
import { CtaButton } from "./CtaButton";
import { CopilotAgentVisual } from "./CopilotAgentVisual";
import { CopilotIcon, CopilotMark } from "./CopilotIcons";
import { ScrollReveal } from "./ScrollReveal";
import { SectionTitle, ServiceHeroLayout } from "./ServicePageParts";
import {
  type CopilotWorkflowIcon,
  copilotFaq,
  copilotFinalLead,
  copilotFinalMeta,
  copilotFinalTitle,
  copilotFit,
  copilotFitNote,
  copilotHeroLead,
  copilotHeroNote,
  copilotHeroStats,
  copilotOfferExplainer,
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
import { CALENDLY_URL } from "../lib/analytics";
import { DURATION, EASE, slidePanel } from "../motion";
import copilotStyles from "./CopilotAgentsContent.module.css";
import styles from "./ServiceModal.module.css";

function WorkflowIcon({ icon }: { icon: CopilotWorkflowIcon }) {
  return <CopilotIcon id={icon} />;
}

function CopilotHeroStats() {
  return (
    <div className={copilotStyles.heroStats}>
      {copilotHeroStats.map((stat) => (
        <div key={stat.value} className={copilotStyles.heroStat}>
          <span className={copilotStyles.heroStatIcon}>
            <CopilotIcon id={stat.icon} />
          </span>
          <span className={copilotStyles.heroStatText}>
            <span className={copilotStyles.heroStatValue}>{stat.value}</span>
            <span className={copilotStyles.heroStatLabel}>{stat.label}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

export function CopilotAgentsContent() {
  const meta = serviceModalMeta["copilot-agents"];
  const { openService, openProject } = useOverlay();
  const [openFaq, setOpenFaq] = useState(0);
  const [activeWorkflow, setActiveWorkflow] = useState(0);
  const reduceMotion = useReducedMotion();
  const selectedWorkflow = copilotWorkflows[activeWorkflow];

  return (
    <div className={`${styles.content} ${copilotStyles.page}`}>
      <ServiceHeroLayout
        tag={
          <div className={copilotStyles.heroBrand}>
            <span className={copilotStyles.heroLogo} aria-hidden="true">
              <CopilotMark size={30} />
            </span>
            <span className={styles.heroTag}>{meta.bannerTag}</span>
          </div>
        }
        title={
          <>
            Copilot-Agenten, die in Ihrem Microsoft 365 <em>arbeiten</em>. Nicht nur
            antworten.
          </>
        }
        lead={copilotHeroLead}
        note={copilotHeroNote}
        mark={<CopilotHeroStats />}
        ctas={
          <>
            <CtaButton
              size="md"
              surface="accent"
              showCalendar
              href={CALENDLY_URL}
              analyticsLocation="copilot_hero"
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
        <div className={copilotStyles.problemLayout}>
          <div className={copilotStyles.problemCopy}>
            <p className={copilotStyles.eyebrow}>Das Problem</p>
            <h3 className={copilotStyles.problemLead}>
              Copilot ist da. Die <em>Arbeit auch</em>.
            </h3>
            {copilotProblemBody.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={copilotStyles.problemBody}>
                {paragraph}
              </p>
            ))}
          </div>
          <div className={copilotStyles.problemVisual}>
            <CopilotAgentVisual />
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className={copilotStyles.section}>
        <SectionTitle>Drei Beispiel-Workflows, konkret</SectionTitle>
        <div className={copilotStyles.workflowExplorer}>
          <div
            className={copilotStyles.workflowTabs}
            role="tablist"
            aria-label="Beispiel-Workflow auswählen"
          >
            {copilotWorkflows.map((workflow, index) => {
              const isActive = activeWorkflow === index;
              return (
                <button
                  key={workflow.num}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="copilot-workflow-panel"
                  className={`${copilotStyles.workflowTab} ${
                    isActive ? copilotStyles.workflowTabActive : ""
                  }`}
                  onClick={() => setActiveWorkflow(index)}
                >
                  <span className={copilotStyles.workflowIcon}>
                    <WorkflowIcon icon={workflow.icon} />
                  </span>
                  <span className={copilotStyles.workflowTabCopy}>
                    <span className={copilotStyles.workflowNum}>{workflow.num}</span>
                    <span className={copilotStyles.workflowTabTitle}>{workflow.title}</span>
                  </span>
                  <span className={copilotStyles.workflowTabArrow} aria-hidden="true">
                    →
                  </span>
                </button>
              );
            })}
          </div>
          <div className={copilotStyles.workflowPanelWrap}>
            <AnimatePresence mode="wait">
              <motion.article
                key={selectedWorkflow.num}
                id="copilot-workflow-panel"
                role="tabpanel"
                className={copilotStyles.workflowPanel}
                variants={slidePanel}
                initial={reduceMotion ? false : "hidden"}
                animate="visible"
                exit={reduceMotion ? undefined : "exit"}
              >
                <div className={copilotStyles.workflowPanelHead}>
                  <span className={copilotStyles.workflowPanelIcon}>
                    <WorkflowIcon icon={selectedWorkflow.icon} />
                  </span>
                  <div>
                    <span className={copilotStyles.workflowNum}>
                      Beispiel {selectedWorkflow.num}
                    </span>
                    <h4 className={copilotStyles.workflowTitle}>
                      {selectedWorkflow.title}
                    </h4>
                  </div>
                </div>
                <p className={copilotStyles.workflowSummary}>
                  {selectedWorkflow.summary}
                </p>
                <dl className={copilotStyles.workflowSteps}>
                  {selectedWorkflow.steps.map((step) => (
                    <div key={step.label} className={copilotStyles.workflowStep}>
                      <dt>{step.label}</dt>
                      <dd>{step.text}</dd>
                    </div>
                  ))}
                </dl>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
        <div className={copilotStyles.patternStrip} aria-hidden>
          {copilotWorkflowPatternSteps.flatMap((step, index) => [
            index > 0 ? (
              <span key={`${step.label}-arrow`} className={copilotStyles.patternArrow}>
                →
              </span>
            ) : null,
            <span key={step.label} className={copilotStyles.patternStep}>
              <span
                className={`${copilotStyles.patternStepIcon} ${
                  index === 2 ? copilotStyles.patternStepIconActive : ""
                }`}
              >
                <CopilotIcon id={step.icon} />
              </span>
              {step.label}
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
            <ul className={copilotStyles.fitList}>
              {copilotFit.good.map((item) => (
                <li key={item} className={copilotStyles.fitItem}>
                  <span className={copilotStyles.fitIconGood}>
                    <CopilotIcon id="check" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.fitCard}>
            <span className={styles.fitLabelBad}>Weniger geeignet</span>
            <ul className={copilotStyles.fitList}>
              {copilotFit.bad.map((item) => (
                <li key={item} className={copilotStyles.fitItem}>
                  <span className={copilotStyles.fitIconBad}>
                    <CopilotIcon id="cross" />
                  </span>
                  <span>{item}</span>
                </li>
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
          <p className={copilotStyles.offerIntro}>
            <strong>
              Das ist das dreistufige Angebot von uberagent für einen individuellen
              Microsoft-Copilot-Agenten.
            </strong>{" "}
            {copilotOfferIntro}
          </p>
          <div className={styles.tiers}>
            {copilotTiers.map((tier) => {
              const explanation = copilotOfferExplainer.find(
                (item) => item.id === tier.id,
              );

              return (
                <div
                  key={tier.id}
                  className={`${styles.tier} ${tier.featured ? styles.tierHero : ""}`}
                >
                  <span className={copilotStyles.tierIntroIcon}>
                    {explanation ? <CopilotIcon id={explanation.icon} /> : null}
                  </span>
                  <span className={styles.tierCap}>{tier.cap}</span>
                  <div className={styles.tierPrice}>
                    {tier.price}
                    <small>{tier.note}</small>
                  </div>
                  {explanation ? (
                    <p
                      className={`${copilotStyles.tierSimple} ${
                        tier.featured ? copilotStyles.tierSimpleOnDark : ""
                      }`}
                    >
                      {explanation.text}
                    </p>
                  ) : null}
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
                        analyticsLocation="copilot_sprint"
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
                        analyticsLocation="copilot_blueprint"
                      >
                        Blueprint anfragen
                      </CtaButton>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p className={copilotStyles.offerFootnote}>{copilotTiersFootnote}</p>
        </ScrollReveal>
      </section>

      <ScrollReveal as="section" className={copilotStyles.section}>
        <SectionTitle>Ablauf der Zusammenarbeit</SectionTitle>
        <div className={copilotStyles.processTrack}>
          {copilotProcess.map((step, index) => (
            <div key={step.title} className={copilotStyles.processStep}>
              <span className={copilotStyles.processIcon}>
                <CopilotIcon id={step.icon} />
              </span>
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
                <span className={copilotStyles.proofTileIcon}>
                  <CopilotIcon id={point.icon} />
                </span>
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
              analyticsLocation="copilot_final"
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
