import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { SectionShell } from "./SectionShell";
import { CtaButton } from "./CtaButton";
import { TrustBar } from "./TrustBar";
import { ProvenExpertRating } from "./ProvenExpertRating";
import { scrollToContact, scrollToSection } from "../hooks/useScrollReveal";
import {
  heroContainer,
  heroFeatureContainer,
  heroItem,
  resolveVariants,
} from "../motion";
import styles from "./Hero.module.css";

const featureCards = [
  { num: "01", title: "MCP Integration", description: "Sichere System-Anbindung" },
  { num: "02", title: "AI Workflow Agents", description: "Agenten die handeln" },
  { num: "03", title: "GTM Engineering", description: "Signal-Logik & Outreach" },
];

const HEADLINE_LEAD = "AI Engineering für ";
const HEADLINE_ACCENT = "operative Exzellenz";
const HEADLINE_LENGTH = HEADLINE_LEAD.length + HEADLINE_ACCENT.length;
const HEADLINE_TEXT = HEADLINE_LEAD + HEADLINE_ACCENT;
const TYPE_MS = 38;

function useTypedHeadline(reduce: boolean) {
  const [chars, setChars] = useState(reduce ? HEADLINE_LENGTH : 0);

  useEffect(() => {
    if (reduce) {
      setChars(HEADLINE_LENGTH);
      return;
    }

    setChars(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setChars(i);
      if (i >= HEADLINE_LENGTH) window.clearInterval(id);
    }, TYPE_MS);

    return () => window.clearInterval(id);
  }, [reduce]);

  return chars;
}

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 700], [1, 0.4]);
  const contentY = useTransform(scrollY, [0, 700], [0, -32]);
  const contentScale = useTransform(scrollY, [0, 700], [1, 0.985]);

  useEffect(() => {
    document.body.classList.add("hero-active");
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > 80) {
        document.body.classList.remove("hero-active");
      } else {
        document.body.classList.add("hero-active");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.classList.remove("hero-active");
    };
  }, []);

  const itemVariants = resolveVariants(reduce, heroItem);
  const containerVariants = resolveVariants(reduce, heroContainer);
  const featureVariants = resolveVariants(reduce, heroFeatureContainer);

  const typedChars = useTypedHeadline(Boolean(reduce));
  const typedLead = HEADLINE_LEAD.slice(0, typedChars);
  const typedAccent =
    typedChars > HEADLINE_LEAD.length
      ? HEADLINE_ACCENT.slice(0, typedChars - HEADLINE_LEAD.length)
      : "";
  const typedDone = typedChars >= HEADLINE_LENGTH;

  const layout = (
    <div className={`container ${styles.layout}`}>
      <motion.div
        className={styles.heroSequence}
        variants={containerVariants}
        initial={reduce ? false : "hidden"}
        animate="visible"
      >
        <motion.div className={styles.badge} variants={itemVariants}>
          <span className={styles.badgeDot} aria-hidden="true" />
          Production-Ready AI Engineering
        </motion.div>

        <motion.h1
          id="hero-heading"
          className={styles.headline}
          variants={itemVariants}
        >
          <span className={styles.headlineMeasure} aria-hidden="true">
            {HEADLINE_LEAD}
            <span className={styles.headlineAccent}>{HEADLINE_ACCENT}</span>
          </span>
          <span className={styles.headlineLive} aria-hidden="true">
            {typedLead}
            <span className={styles.headlineAccent}>{typedAccent}</span>
            {!typedDone && <span className={styles.headlineCaret} />}
          </span>
          <span className={styles.headlineSrOnly}>{HEADLINE_TEXT}</span>
        </motion.h1>

        <motion.p className={styles.subline} variants={itemVariants}>
          Wir bauen AI-Agenten, Workflow-Automations, MCP-Integrationen und
          GTM- &amp; Sales-Systeme, die in Ihrem Stack produktiv laufen.
        </motion.p>

        <motion.div className={styles.actions} variants={itemVariants}>
          <CtaButton
            size="md"
            surface="on-dark"
            onClick={() => scrollToContact("hero")}
          >
            Erstgespräch vereinbaren
          </CtaButton>
          <CtaButton
            size="md"
            surface="on-dark-ghost"
            onClick={() => scrollToSection("services")}
          >
            Services entdecken
          </CtaButton>
        </motion.div>
        <motion.div className={styles.ratingRow} variants={itemVariants}>
          <ProvenExpertRating />
        </motion.div>

        <motion.div
          className={styles.featureCards}
          aria-label="Kernleistungen"
          variants={featureVariants}
        >
          {featureCards.map((card) => (
            <motion.div
              key={card.title}
              className={styles.featureCard}
              variants={itemVariants}
            >
              <div className={styles.featureGlow} aria-hidden="true" />
              <div className={styles.featureContent}>
                <h2 className={styles.featureTitle}>
                  <span className={styles.featureNum} aria-hidden="true">{card.num}</span>
                  {card.title}
                </h2>
                <p className={styles.featureDesc}>{card.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );

  return (
    <SectionShell
      id="home"
      hero
      background="static-hero"
      bottomFade
      ariaLabelledBy="hero-heading"
      contentClassName={styles.shellContent}
    >
      {reduce ? (
        <div ref={contentRef} className={styles.main}>
          {layout}
        </div>
      ) : (
        <motion.div
          ref={contentRef}
          className={styles.main}
          style={{
            opacity: contentOpacity,
            y: contentY,
            scale: contentScale,
          }}
        >
          {layout}
        </motion.div>
      )}
      <TrustBar embedded />
    </SectionShell>
  );
}
