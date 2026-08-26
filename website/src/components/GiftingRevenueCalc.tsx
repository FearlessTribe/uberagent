import { useState } from "react";
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

export function GiftingRevenueCalc() {
  const [customers, setCustomers] = useState(20);
  const [contactsPerCustomer, setContactsPerCustomer] = useState(50);
  const [occasions, setOccasions] = useState(2);
  const [avgValue, setAvgValue] = useState(40);

  const recipients = customers * contactsPerCustomer;
  const giftsYear = recipients * occasions;
  const volumeYear = giftsYear * avgValue;
  const feeYear = volumeYear * FEE_RATE;

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
            min={10}
            max={200}
            step={5}
            value={customers}
            onChange={(e) => setCustomers(Number(e.target.value))}
          />
          <span className={styles.fieldRange}>HubSpot-Accounts · 10 bis 200</span>
        </label>

        <label className={styles.field}>
          <span className={styles.fieldTop}>
            <span>Ø Kunden ihrer Kunden</span>
            <strong>{formatInt(contactsPerCustomer)}</strong>
          </span>
          <input
            type="range"
            min={10}
            max={500}
            step={10}
            value={contactsPerCustomer}
            onChange={(e) => setContactsPerCustomer(Number(e.target.value))}
          />
          <span className={styles.fieldRange}>Empfänger pro Kunde · 10 bis 500</span>
        </label>

        <label className={styles.field}>
          <span className={styles.fieldTop}>
            <span>Anlässe pro Empfänger und Jahr</span>
            <strong>{occasions}</strong>
          </span>
          <input
            type="range"
            min={1}
            max={4}
            step={1}
            value={occasions}
            onChange={(e) => setOccasions(Number(e.target.value))}
          />
          <span className={styles.fieldRange}>1 bis 4 · z. B. Geburtstag, Jubiläum, Weihnachten</span>
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
        <div className={styles.resultCard}>
          <span className={styles.resultLabel}>Empfänger gesamt</span>
          <span className={styles.resultValue}>{formatInt(recipients)}</span>
        </div>
        <div className={styles.resultCard}>
          <span className={styles.resultLabel}>Geschenke / Jahr</span>
          <span className={styles.resultValue}>{formatInt(giftsYear)}</span>
        </div>
        <div className={`${styles.resultCard} ${styles.resultAccent}`}>
          <span className={styles.resultLabel}>Warenwert / Jahr</span>
          <span className={styles.resultValue}>{formatEuro(volumeYear)}</span>
          <span className={styles.resultHint}>Aufträge aus Ihrem Sortiment</span>
        </div>
        <div className={styles.resultCard}>
          <span className={styles.resultLabel}>überagent · 10%</span>
          <span className={styles.resultValue}>{formatEuro(feeYear)}</span>
        </div>
      </div>
    </div>
  );
}
