import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { AnfrageField } from "../data/leadmaschineContent";
import { DURATION, EASE } from "../motion";
import styles from "./LeadmaschineAnfrageCard.module.css";

type HighlightFilter = "priority" | "prepare" | "schedule" | null;

interface LeadmaschineAnfrageCardProps {
  fields: AnfrageField[];
  label?: string;
  animate?: boolean;
  activeHighlight?: HighlightFilter;
  compact?: boolean;
  className?: string;
  watermark?: boolean;
}

export function LeadmaschineAnfrageCard({
  fields,
  label = "Beispiel",
  animate = false,
  activeHighlight = null,
  compact = false,
  className = "",
  watermark = false,
}: LeadmaschineAnfrageCardProps) {
  const reduce = useReducedMotion();
  const shouldAnimate = animate && !reduce && !watermark;
  const [phase, setPhase] = useState<"blank" | "card">(
    shouldAnimate ? "blank" : "card",
  );

  useEffect(() => {
    if (!shouldAnimate) {
      setPhase("card");
      return;
    }
    setPhase("blank");
    const t = window.setTimeout(() => setPhase("card"), 700);
    return () => window.clearTimeout(t);
  }, [shouldAnimate, fields]);

  return (
    <div
      className={`${styles.card} ${compact ? styles.compact : ""} ${watermark ? styles.watermark : ""} ${className}`}
      aria-label={watermark ? undefined : "Beispiel-Anfragekarte"}
      aria-hidden={watermark || undefined}
    >
      <div className={styles.badge}>{label}</div>
      <AnimatePresence mode="wait">
        {phase === "blank" ? (
          <motion.div
            key="blank"
            className={styles.blankForm}
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: EASE.outSmooth }}
          >
            <span className={styles.blankField}>Name</span>
            <span className={styles.blankField}>E-Mail</span>
            <span className={`${styles.blankField} ${styles.blankMessage}`}>
              Nachricht
              <span className={styles.caret} />
            </span>
          </motion.div>
        ) : (
          <motion.ul
            key="fields"
            className={styles.fields}
            initial={shouldAnimate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: DURATION.fast }}
          >
            {fields.map((field, i) => {
              const lit =
                activeHighlight && field.highlight === activeHighlight
                  ? styles.lit
                  : "";
              const status = field.status ?? "complete";
              return (
                <motion.li
                  key={`${field.label}-${field.value}`}
                  className={`${styles.row} ${lit}`}
                  initial={shouldAnimate ? { opacity: 0, y: 10 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: DURATION.normal,
                    delay: shouldAnimate ? i * 0.12 : 0,
                    ease: EASE.outSmooth,
                  }}
                >
                  <motion.span
                    className={`${styles.dot} ${styles[status]}`}
                    aria-hidden
                    initial={shouldAnimate ? { scale: 0 } : false}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: 0.2,
                      delay: shouldAnimate ? i * 0.12 + 0.08 : 0,
                      ease: EASE.outSmooth,
                    }}
                  />
                  <span className={styles.label}>{field.label}</span>
                  <span className={styles.value}>{field.value}</span>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
