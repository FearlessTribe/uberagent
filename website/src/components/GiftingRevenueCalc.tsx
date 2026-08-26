import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { DURATION, EASE, STAGGER, viewport } from "../motion";
import styles from "./GiftingRevenueCalc.module.css";

const FEE_RATE = 0.1;

function formatEuro(value: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatInt(value: number) {
  return new Intl.NumberFormat("de-DE").format(value);
}

const RESULT_SHIFTS = [-18, 16, -14, 20] as const;

export function GiftingRevenueCalc() {
  const reduce = useReducedMotion();
  const [customers, setCustomers] = useState(550);
  const [contactsPerCustomer, setContactsPerCustomer] = useState(500);
  const [occasions, setOccasions] = useState(8);
  const [avgValue, setAvgValue] = useState(40);

  const results = useMemo(() => {
    const recipients = customers * contactsPerCustomer;
    const giftsYear = recipients * occasions;
    const volumeYear = giftsYear * avgValue;
    const feeYear = volumeYear * FEE_RATE;
    return [
      {
        label: "Empfänger gesamt",
        value: formatInt(recipients),
        accent: false,
      },
      {
        label: "Geschenke / Jahr",
        value: formatInt(giftsYear),
        accent: false,
      },
      {
        label: "Warenwert / Jahr",
        value: formatEuro(volumeYear),
        hint: "Aufträge aus Ihrem Sortiment",
        accent: true,
      },
      {
        label: "überagent · 10%",
        value: formatEuro(feeYear),
        accent: false,
      },
    ] as const;
  }, [avgValue, contactsPerCustomer, customers, occasions]);

  return (
    <div className={styles.wrap}>
      <div className={styles.controls}>
        <label className={styles.field}>
          <span className={styles.fieldTop}>
            <span>Ihre Kunden</span>
            <strong>{formatInt(customers)}</strong>
          </span>
          <input
            type="range"
            min={100}
            max={1000}
            step={50}
            value={customers}
            onChange={(e) => setCustomers(Number(e.target.value))}
          />
          <span className={styles.fieldRange}>HubSpot-Accounts · 100 bis 1.000</span>
        </label>

        <label className={styles.field}>
          <span className={styles.fieldTop}>
            <span>Ø Kunden ihrer Kunden</span>
            <strong>{formatInt(contactsPerCustomer)}</strong>
          </span>
          <input
            type="range"
            min={50}
            max={1000}
            step={25}
            value={contactsPerCustomer}
            onChange={(e) => setContactsPerCustomer(Number(e.target.value))}
          />
          <span className={styles.fieldRange}>Empfänger pro Kunde · 50 bis 1.000</span>
        </label>

        <label className={styles.field}>
          <span className={styles.fieldTop}>
            <span>Anlässe pro Empfänger und Jahr</span>
            <strong>{occasions}</strong>
          </span>
          <input
            type="range"
            min={4}
            max={12}
            step={1}
            value={occasions}
            onChange={(e) => setOccasions(Number(e.target.value))}
          />
          <span className={styles.fieldRange}>4 bis 12 · Geburtstag, Jubiläum, Weihnachten…</span>
        </label>

        <label className={styles.field}>
          <span className={styles.fieldTop}>
            <span>Durchschnittswert pro Geschenk</span>
            <strong>{avgValue} €</strong>
          </span>
          <input
            type="range"
            min={30}
            max={49}
            step={1}
            value={avgValue}
            onChange={(e) => setAvgValue(Number(e.target.value))}
          />
          <span className={styles.fieldRange}>30 bis 49 €</span>
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
              className={styles.resultValue}
              initial={reduce ? false : { x: 0 }}
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
      </div>
    </div>
  );
}
