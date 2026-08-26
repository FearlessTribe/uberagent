import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { SectionShell } from "./SectionShell";
import { CtaButton } from "./CtaButton";
import { TrustBar } from "./TrustBar";
import { ProofRow } from "./ProofRow";
import { scrollToContact, scrollToSection } from "../hooks/useScrollReveal";
import { heroContainer, heroHeadline, heroItem, resolveVariants } from "../motion";
import { HeroTermRain } from "./HeroTermRain";
import styles from "./Hero.module.css";

const HEADLINE_LEAD = "AI Engineering für ";
const HEADLINE_EM = "operative ";
const HEADLINE_MARK = "Exzellenz";
const HEADLINE_LENGTH = HEADLINE_LEAD.length + HEADLINE_EM.length + HEADLINE_MARK.length;
const HEADLINE_TEXT = HEADLINE_LEAD + HEADLINE_EM + HEADLINE_MARK;
const TYPE_MS = 42;
const TYPE_START_MS = 280;

function useTypedHeadline(reduce: boolean) {
  const [chars, setChars] = useState(reduce ? HEADLINE_LENGTH : 0);

  useEffect(() => {
    if (reduce) {
      setChars(HEADLINE_LENGTH);
      return;
    }

    setChars(0);
    let i = 0;
    let timeout = 0;

    const tick = () => {
      i += 1;
      setChars(i);
      if (i >= HEADLINE_LENGTH) return;
      const next = HEADLINE_TEXT[i - 1] === " " ? 18 : TYPE_MS;
      timeout = window.setTimeout(tick, next);
    };

    timeout = window.setTimeout(tick, TYPE_START_MS);
    return () => window.clearTimeout(timeout);
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
  const headlineVariants = resolveVariants(reduce, heroHeadline);

  const typedChars = useTypedHeadline(Boolean(reduce));
  const typedLead = HEADLINE_LEAD.slice(0, typedChars);
  const emStart = HEADLINE_LEAD.length;
  const emEnd = emStart + HEADLINE_EM.length;
  const typedEm =
    typedChars > emStart
      ? HEADLINE_EM.slice(0, Math.min(typedChars - emStart, HEADLINE_EM.length))
      : "";
  const typedMark =
    typedChars > emEnd
      ? HEADLINE_MARK.slice(0, Math.min(typedChars - emEnd, HEADLINE_MARK.length))
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
          Aktuell 2 von 5 Plätzen verfügbar
        </motion.div>

        <motion.h1
          id="hero-heading"
          className={styles.headline}
          variants={headlineVariants}
        >
          <span className={styles.headlineMeasure} aria-hidden="true">
            {HEADLINE_LEAD}
            <span className="em">{HEADLINE_EM}</span>
            <span className="mark">{HEADLINE_MARK}</span>
          </span>
          <span className={styles.headlineLive} aria-hidden="true">
            {typedLead}
            {typedEm && <span className="em">{typedEm}</span>}
            {typedMark && <span className="mark">{typedMark}</span>}
            <span
              className={`${styles.headlineCaret} ${typedDone ? styles.headlineCaretDone : ""}`}
            />
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
            surface="accent"
            showCalendar
            sublabel
            onClick={() => scrollToContact("hero", "smooth")}
          >
            Jetzt Erstgespräch sichern
          </CtaButton>
          <CtaButton
            size="md"
            surface="on-dark-ghost"
            onClick={() => scrollToSection("services", "smooth")}
          >
            Services entdecken
          </CtaButton>
        </motion.div>

        <motion.div className={styles.proofRow} variants={itemVariants}>
          <ProofRow />
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
      <HeroTermRain />
      {reduce ? (
        <div ref={contentRef} className={`${styles.main} ${styles.foreground}`}>
          {layout}
        </div>
      ) : (
        <motion.div
          ref={contentRef}
          className={`${styles.main} ${styles.foreground}`}
          style={{
            opacity: contentOpacity,
            y: contentY,
            scale: contentScale,
          }}
        >
          {layout}
        </motion.div>
      )}
      <div className={styles.foreground}>
        <TrustBar embedded />
      </div>
    </SectionShell>
  );
}
