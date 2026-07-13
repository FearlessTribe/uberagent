import { useMemo, useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { CtaButton } from "./CtaButton";
import { roiCurrencies, roiDefaults, type RoiCurrency } from "../data/marketing";
import { scrollToSection } from "../hooks/useScrollReveal";
import styles from "./RoiCalculator.module.css";

function formatMoney(value: number, currency: RoiCurrency, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function RoiCalculator() {
  const [teamSize, setTeamSize] = useState(roiDefaults.teamSize);
  const [hoursPerWeek, setHoursPerWeek] = useState(roiDefaults.hoursPerWeek);
  const [hourlyRate, setHourlyRate] = useState(roiDefaults.hourlyRate);
  const [currency, setCurrency] = useState<RoiCurrency>("CHF");

  const currencyMeta = roiCurrencies.find((c) => c.code === currency) ?? roiCurrencies[0];

  const results = useMemo(() => {
    const hoursMonth = teamSize * hoursPerWeek * 4.33;
    const costMonth = hoursMonth * hourlyRate;
    const savedCost = costMonth * roiDefaults.automationRate;
    return { costMonth, savedCost };
  }, [teamSize, hoursPerWeek, hourlyRate]);

  return (
    <section id="roi" className={`section ${styles.section}`} aria-labelledby="roi-heading">
      <div className="container">
        <ScrollReveal className={`sectionStart ${styles.header}`}>
          <span className="eyebrow">Rechner</span>
          <h2 id="roi-heading" className="display-md">
            Schätzen Sie Ihren Automatisierungs-Hebel
          </h2>
          <p className={styles.sub}>
            Grobe Orientierung für manuelle Arbeit, die sich in Agents und Workflows
            überführen lässt. Kein Versprechen, sondern Diskussionsgrundlage.
          </p>
        </ScrollReveal>

        <ScrollReveal className={styles.layout}>
          <div className={styles.controls}>
            <div className={styles.currencyRow} role="group" aria-label="Währung">
              {roiCurrencies.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  className={`${styles.currencyBtn} ${currency === c.code ? styles.currencyActive : ""}`}
                  onClick={() => setCurrency(c.code)}
                  aria-pressed={currency === c.code}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <label className={styles.field}>
              <span className={styles.fieldTop}>
                <span>Teamgröße</span>
                <strong>{teamSize}</strong>
              </span>
              <input
                type="range"
                min={3}
                max={80}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.fieldTop}>
                <span>Manuelle Stunden / MA / Woche</span>
                <strong>{hoursPerWeek}</strong>
              </span>
              <input
                type="range"
                min={2}
                max={25}
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.fieldTop}>
                <span>Stundensatz ({currency})</span>
                <strong>{hourlyRate}</strong>
              </span>
              <input
                type="range"
                min={40}
                max={180}
                step={5}
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
              />
            </label>
          </div>

          <div className={styles.results}>
            <div className={styles.resultCard}>
              <span className={styles.resultLabel}>Kosten / Monat</span>
              <span className={styles.resultValue}>
                {formatMoney(results.costMonth, currency, currencyMeta.locale)}
              </span>
            </div>
            <div className={`${styles.resultCard} ${styles.resultAccent}`}>
              <span className={styles.resultLabel}>Sparen mit überagent.com</span>
              <span className={styles.resultValue}>
                {formatMoney(results.savedCost, currency, currencyMeta.locale)}
              </span>
              <span className={styles.resultHint}>
                Bei 75% Automatisierung der manuellen Arbeit.
              </span>
            </div>
            <CtaButton
              size="md"
              surface="on-dark"
              onClick={() => scrollToSection("contact")}
            >
              Individuellen Plan besprechen
            </CtaButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
