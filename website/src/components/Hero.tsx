import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { SectionShell } from "./SectionShell";
import { CtaButton } from "./CtaButton";
import { scrollToSection } from "../hooks/useScrollReveal";
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
          AI Engineering für{" "}
          <span className={styles.headlineAccent}>operative Exzellenz</span>
        </motion.h1>

        <motion.p className={styles.subline} variants={itemVariants}>
          Wir bauen AI-Agenten, Workflow-Automations, MCP-Integrationen und
          GTM- &amp; Sales-Systeme, die in Ihrem Stack produktiv laufen.
        </motion.p>

        <motion.div className={styles.actions} variants={itemVariants}>
          <CtaButton
            size="md"
            surface="on-dark"
            onClick={() => scrollToSection("contact")}
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
    >
      {reduce ? (
        <div ref={contentRef}>{layout}</div>
      ) : (
        <motion.div
          ref={contentRef}
          style={{
            opacity: contentOpacity,
            y: contentY,
            scale: contentScale,
          }}
        >
          {layout}
        </motion.div>
      )}
    </SectionShell>
  );
}
