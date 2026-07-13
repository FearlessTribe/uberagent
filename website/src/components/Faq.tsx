import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ScrollReveal } from "./ScrollReveal";
import { faqItems } from "../data/marketing";
import { DURATION, EASE } from "../motion";
import styles from "./Faq.module.css";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="faq" className={`section ${styles.section}`} aria-labelledby="faq-heading">
      <div className="container">
        <ScrollReveal className={`sectionStart ${styles.header}`}>
          <span className="eyebrow">Fragen</span>
          <h2 id="faq-heading" className="display-md">
            Häufig gefragt
          </h2>
        </ScrollReveal>

        <ScrollReveal className={styles.list}>
          {faqItems.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.question} className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}>
                <button
                  type="button"
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{item.question}</span>
                  <span className={styles.icon} aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${i}`}
                      className={styles.panel}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{
                        duration: reduce ? 0 : DURATION.normal,
                        ease: EASE.outExpo,
                      }}
                    >
                      <p className={styles.answer}>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
