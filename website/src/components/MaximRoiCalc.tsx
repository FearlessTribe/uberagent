import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  MAXIM_ROI_DEFAULTS,
  MAXIM_STAGE1_YEAR1_COST,
} from "../data/maximCalc";
import { DURATION, EASE, STAGGER, viewport } from "../motion";
import styles from "./MaximRoiCalc.module.css";

function formatEuro(value: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatHours(value: number) {
  return `${new Intl.NumberFormat("de-DE", {
    maximumFractionDigits: 1,
  }).format(value)} Std.`;
}

function formatDayHours(value: number) {
  return `${new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: value % 1 === 0 ? 0 : 1,
    maximumFractionDigits: 1,
  }).format(value)} Std.`;
}

const RESULT_SHIFTS = [-14, 12, -10, 16] as const;

export function MaximRoiCalc() {
  const reduce = useReducedMotion();
  const [hoursDay, setHoursDay] = useState<number>(MAXIM_ROI_DEFAULTS.hoursDay);
  const [workDays, setWorkDays] = useState<number>(MAXIM_ROI_DEFAULTS.workDays);
  const [hourlyRate, setHourlyRate] = useState<number>(MAXIM_ROI_DEFAULTS.hourlyRate);
  const [extraOrdersWeek, setExtraOrdersWeek] = useState<number>(
    MAXIM_ROI_DEFAULTS.extraOrdersWeek,
  );
  const [marginPerOrder, setMarginPerOrder] = useState<number>(
    MAXIM_ROI_DEFAULTS.marginPerOrder,
  );

  const computed = useMemo(() => {
    const hoursYear = hoursDay * workDays;
    const timeValue = hoursYear * hourlyRate;
    const extraContribution = extraOrdersWeek * 52 * marginPerOrder;
    const total = timeValue + extraContribution;
    const halfTime = timeValue * 0.5;
    const stage1Covered = halfTime + extraContribution >= MAXIM_STAGE1_YEAR1_COST;

    return {
      hoursYear,
      timeValue,
      extraContribution,
      total,
      halfTime,
      stage1Covered,
    };
  }, [extraOrdersWeek, hourlyRate, hoursDay, marginPerOrder, workDays]);

  const results = [
    {
      label: "Stunden pro Jahr",
      value: formatHours(computed.hoursYear),
      accent: false,
    },
    {
      label: "Zeitwert pro Jahr",
      value: formatEuro(computed.timeValue),
      accent: true,
      hint: "Ihre Zeit in Euro",
    },
    {
      label: "Extra Deckungsbeitrag",
      value: formatEuro(computed.extraContribution),
      accent: false,
      hint: "durch schnellere Angebote",
    },
    {
      label: "Nutzen gesamt / Jahr",
      value: formatEuro(computed.total),
      accent: false,
    },
  ] as const;

  return (
    <div className={styles.wrap}>
      <div className={styles.controls}>
        <label className={styles.field}>
          <span className={styles.fieldTop}>
            <span>Zeit für Angebote heute</span>
            <strong>{formatDayHours(hoursDay)} / Tag</strong>
          </span>
          <input
            type="range"
            min={1}
            max={4}
            step={0.5}
            value={hoursDay}
            onChange={(e) => setHoursDay(Number(e.target.value))}
          />
          <span className={styles.fieldRange}>1 bis 4 Stunden pro Tag</span>
        </label>

        <label className={styles.field}>
          <span className={styles.fieldTop}>
            <span>Arbeitstage pro Jahr</span>
            <strong>{workDays}</strong>
          </span>
          <input
            type="range"
            min={200}
            max={250}
            step={5}
            value={workDays}
            onChange={(e) => setWorkDays(Number(e.target.value))}
          />
          <span className={styles.fieldRange}>200 bis 250 · Standard 220</span>
        </label>

        <label className={styles.field}>
          <span className={styles.fieldTop}>
            <span>Wert Ihrer Stunde</span>
            <strong>{hourlyRate} €</strong>
          </span>
          <input
            type="range"
            min={40}
            max={150}
            step={5}
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Number(e.target.value))}
          />
          <span className={styles.fieldRange}>40 bis 150 € · konservativ 75 €</span>
        </label>

        <label className={styles.field}>
          <span className={styles.fieldTop}>
            <span>Zusätzliche Aufträge / Woche</span>
            <strong>{extraOrdersWeek}</strong>
          </span>
          <input
            type="range"
            min={0}
            max={3}
            step={1}
            value={extraOrdersWeek}
            onChange={(e) => setExtraOrdersWeek(Number(e.target.value))}
          />
          <span className={styles.fieldRange}>0 bis 3 durch schnellere Preise</span>
        </label>

        <label className={styles.field}>
          <span className={styles.fieldTop}>
            <span>Deckungsbeitrag / Auftrag</span>
            <strong>{formatEuro(marginPerOrder)}</strong>
          </span>
          <input
            type="range"
            min={200}
            max={800}
            step={25}
            value={marginPerOrder}
            onChange={(e) => setMarginPerOrder(Number(e.target.value))}
          />
          <span className={styles.fieldRange}>
            200 bis 800 € · bei 1×/Woche ≈ {formatEuro(52 * marginPerOrder)} / Jahr
          </span>
        </label>
      </div>

      <div className={styles.results}>
        {results.map((result, index) => (
          <div
            key={result.label}
            className={`${styles.resultCard} ${result.accent ? styles.resultAccent : ""}`}
          >
            <span className={styles.resultLabel}>{result.label}</span>
            <motion.span
              key={result.value}
              className={styles.resultValue}
              initial={reduce ? false : { opacity: 0.55, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DURATION.fast,
                ease: EASE.outSmooth,
                delay: reduce ? 0 : index * STAGGER.section * 0.4,
              }}
              whileInView={
                reduce
                  ? undefined
                  : {
                      x: RESULT_SHIFTS[index] ?? 0,
                      transition: {
                        duration: DURATION.slow,
                        ease: EASE.outExpo,
                        delay: index * STAGGER.section,
                      },
                    }
              }
              viewport={{ ...viewport, once: true }}
            >
              {result.value}
            </motion.span>
            {"hint" in result && result.hint ? (
              <span className={styles.resultHint}>{result.hint}</span>
            ) : null}
          </div>
        ))}

        <p className={styles.note}>
          {computed.stage1Covered
            ? `Selbst wenn nur die Hälfte der Zeit (${formatEuro(computed.halfTime)}) in andere Aufgaben fließt, hat sich Stufe 1 im ersten Jahr bezahlt gemacht.`
            : `Stufe 1 kostet im ersten Jahr ca. ${formatEuro(MAXIM_STAGE1_YEAR1_COST)}. Mit Ihren Werten deckt die Hälfte der Zeitersparnis das noch nicht – der Extra-Deckungsbeitrag macht den Unterschied.`}
        </p>
      </div>
    </div>
  );
}
