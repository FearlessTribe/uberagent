import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DURATION, EASE } from "../motion";
import styles from "./FlipClockMinutes.module.css";

interface FlipClockMinutesProps {
  from?: number;
  to?: number;
  stepMs?: number;
  holdMs?: number;
  subtle?: boolean;
}

function FlipDigit({ digit, subtle = false }: { digit: number; subtle?: boolean }) {
  const reduce = useReducedMotion();
  const slotClass = `${styles.digitSlot} ${subtle ? styles.digitSlotSubtle : ""}`.trim();

  if (reduce) {
    return <span className={slotClass}>{digit}</span>;
  }

  return (
    <span className={slotClass}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={digit}
          className={styles.digit}
          initial={{ rotateX: subtle ? -42 : -88, opacity: subtle ? 0.55 : 0.2 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: subtle ? 42 : 88, opacity: 0 }}
          transition={{
            duration: subtle ? DURATION.slow : DURATION.normal,
            ease: EASE.outSmooth,
          }}
          style={{ transformOrigin: "50% 100%" }}
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function FlipClockMinutes({
  from = 15,
  to = 30,
  stepMs = 360,
  holdMs = 1600,
  subtle = false,
}: FlipClockMinutesProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);
  const [value, setValue] = useState(from);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduce]);

  const tens = Math.floor(value / 10);
  const ones = value % 10;
  const resolvedStepMs = subtle ? Math.max(stepMs, 720) : stepMs;
  const resolvedHoldMs = subtle ? Math.max(holdMs, 2800) : holdMs;

  useEffect(() => {
    if (reduce) {
      setValue(from);
      return;
    }

    if (!active) {
      setValue(from);
      return;
    }

    let current = from;
    setValue(current);
    let timeout = 0;

    const tick = () => {
      if (current >= to) {
        timeout = window.setTimeout(() => {
          current = from;
          setValue(current);
          timeout = window.setTimeout(tick, resolvedStepMs);
        }, resolvedHoldMs);
        return;
      }

      current += 1;
      setValue(current);
      timeout = window.setTimeout(tick, resolvedStepMs);
    };

    timeout = window.setTimeout(tick, resolvedStepMs);
    return () => window.clearTimeout(timeout);
  }, [active, from, to, resolvedStepMs, resolvedHoldMs, reduce]);

  return (
    <span className={`${styles.wrap} ${subtle ? styles.wrapSubtle : ""}`.trim()} ref={ref}>
      <span className={`${styles.clock} ${subtle ? styles.clockSubtle : ""}`.trim()} aria-hidden="true">
        <FlipDigit digit={tens} subtle={subtle} />
        <FlipDigit digit={ones} subtle={subtle} />
      </span>
      <span className={styles.srOnly}>
        {from} bis {to} Minuten
      </span>
    </span>
  );
}
