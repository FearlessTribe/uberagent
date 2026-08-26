import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ScrollReveal } from "./ScrollReveal";
import { CtaButton } from "./CtaButton";
import { scrollToContact } from "../hooks/useScrollReveal";
import styles from "./Intro.module.css";

const HEADLINE_LEAD = "AI Agents, die";
const PHRASES = [
  "Zeit, Kosten und Nerven sparen.",
  "Wachstum entfesseln und Umsatz erhöhen.",
  "Ihr Geschäftsmodell auf eine neue Ebene bringen.",
] as const;

const TYPE_MS = 38;
const DELETE_MS = 24;
const HOLD_MS = 1800;
const GAP_MS = 280;

export function Intro() {
  const reduce = useReducedMotion();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [chars, setChars] = useState(reduce ? PHRASES[0].length : 0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) {
      setPhraseIndex(0);
      setChars(PHRASES[0].length);
      setDeleting(false);
      return;
    }

    const phrase = PHRASES[phraseIndex];
    let timeout = 0;

    if (!deleting && chars === phrase.length) {
      timeout = window.setTimeout(() => setDeleting(true), HOLD_MS);
    } else if (deleting && chars === 0) {
      timeout = window.setTimeout(() => {
        setDeleting(false);
        setPhraseIndex((current) => (current + 1) % PHRASES.length);
      }, GAP_MS);
    } else {
      timeout = window.setTimeout(
        () => setChars((current) => current + (deleting ? -1 : 1)),
        deleting ? DELETE_MS : phrase[chars] === " " ? 16 : TYPE_MS,
      );
    }

    return () => window.clearTimeout(timeout);
  }, [chars, deleting, phraseIndex, reduce]);

  const typed = PHRASES[phraseIndex].slice(0, chars);

  return (
    <section className={`section ${styles.intro}`} aria-labelledby="intro-heading">
      <div className={styles.gradientBg} aria-hidden="true" />
      <div className="container">
        <ScrollReveal className="sectionStart">
          <span className="eyebrow">About uberagent</span>
        </ScrollReveal>

        <ScrollReveal className={styles.content}>
          <h2 id="intro-heading" className={`display-md ${styles.headline}`}>
            <span className={styles.headlineLead}>{HEADLINE_LEAD}</span>
            <span className={styles.headlineType}>
              <span className={styles.headlineMeasure} aria-hidden="true">
                {PHRASES.map((phrase) => (
                  <span key={phrase} className={styles.headlineMeasureLine}>
                    {phrase}
                  </span>
                ))}
              </span>
              {!reduce && (
                <span className={styles.headlineLive} aria-hidden="true">
                  <span className="mark">{typed}</span>
                  <span
                    className={`${styles.caret} ${
                      !deleting && chars === PHRASES[phraseIndex].length
                        ? styles.caretHold
                        : ""
                    }`}
                  />
                </span>
              )}
              {reduce && <span className={`mark ${styles.headlineStatic}`}>{PHRASES[0]}</span>}
              <span className={styles.srOnly}>
                {HEADLINE_LEAD} {PHRASES.join(" ")}
              </span>
            </span>
          </h2>

          <CtaButton
            size="md"
            surface="accent"
            showCalendar
            sublabel
            onClick={() => scrollToContact("intro")}
          >
            Jetzt Erstgespräch sichern
          </CtaButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
