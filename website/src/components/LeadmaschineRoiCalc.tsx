import { useEffect, useMemo, useState } from "react";
import type { LeadmaschineRegion } from "../hooks/useLeadmaschineRoute";
import styles from "./LeadmaschineRoiCalc.module.css";

interface LeadmaschineRoiCalcProps {
  region: LeadmaschineRegion;
}

type Channel = "social" | "website";

function formatMoney(value: number, currency: "CHF" | "EUR", locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNum(value: number, locale: string) {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(
    value,
  );
}

export function LeadmaschineRoiCalc({ region }: LeadmaschineRoiCalcProps) {
  const isCh = region === "ch";
  const currency = isCh ? "CHF" : "EUR";
  const locale = isCh ? "de-CH" : "de-DE";

  const [channel, setChannel] = useState<Channel>("social");
  const [followers, setFollowers] = useState(isCh ? 12000 : 18000);
  const [traffic, setTraffic] = useState(isCh ? 4000 : 8000);
  const [conversion, setConversion] = useState(2.5);
  const [closeRate, setCloseRate] = useState(35);
  const [commission, setCommission] = useState(isCh ? 450 : 380);

  useEffect(() => {
    setCommission((c) =>
      region === "ch" ? (c === 380 ? 450 : c) : c === 450 ? 380 : c,
    );
  }, [region]);

  useEffect(() => {
    setConversion(channel === "social" ? 1.8 : 3.2);
  }, [channel]);

  const audience = channel === "social" ? followers : traffic;

  const results = useMemo(() => {
    const leadsMonth = audience * (conversion / 100);
    const closesMonth = leadsMonth * (closeRate / 100);
    const revenueMonth = closesMonth * commission;
    const revenueYear = revenueMonth * 12;
    return { leadsMonth, closesMonth, revenueMonth, revenueYear };
  }, [audience, conversion, closeRate, commission]);

  return (
    <div className={styles.calc}>
      <div className={styles.head}>
        <span className={styles.kicker}>Umsatzrechner</span>
        <div className={styles.channel} role="group" aria-label="Kanal">
          <button
            type="button"
            className={channel === "social" ? styles.channelOn : ""}
            aria-pressed={channel === "social"}
            onClick={() => setChannel("social")}
          >
            Social Media
          </button>
          <button
            type="button"
            className={channel === "website" ? styles.channelOn : ""}
            aria-pressed={channel === "website"}
            onClick={() => setChannel("website")}
          >
            Website
          </button>
        </div>
      </div>

      <div className={styles.controls}>
        {channel === "social" ? (
          <label className={styles.field}>
            <span className={styles.fieldTop}>
              <span>Follower / Reichweite pro Monat</span>
              <strong>{formatNum(followers, locale)}</strong>
            </span>
            <input
              type="range"
              min={500}
              max={200000}
              step={100}
              value={followers}
              onChange={(e) => setFollowers(Number(e.target.value))}
            />
          </label>
        ) : (
          <label className={styles.field}>
            <span className={styles.fieldTop}>
              <span>Website-Traffic / Monat</span>
              <strong>{formatNum(traffic, locale)}</strong>
            </span>
            <input
              type="range"
              min={300}
              max={100000}
              step={100}
              value={traffic}
              onChange={(e) => setTraffic(Number(e.target.value))}
            />
          </label>
        )}

        <label className={styles.field}>
          <span className={styles.fieldTop}>
            <span>
              {channel === "social"
                ? "Conversion Follower → Anfrage"
                : "Conversion Besuch → Anfrage"}
            </span>
            <strong>{conversion.toFixed(1)}%</strong>
          </span>
          <input
            type="range"
            min={0.3}
            max={12}
            step={0.1}
            value={conversion}
            onChange={(e) => setConversion(Number(e.target.value))}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.fieldTop}>
            <span>Abschlussquote der Anfragen</span>
            <strong>{closeRate}%</strong>
          </span>
          <input
            type="range"
            min={10}
            max={70}
            step={1}
            value={closeRate}
            onChange={(e) => setCloseRate(Number(e.target.value))}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.fieldTop}>
            <span>Ø Provision / Abschluss</span>
            <strong>{formatMoney(commission, currency, locale)}</strong>
          </span>
          <input
            type="range"
            min={80}
            max={1500}
            step={10}
            value={commission}
            onChange={(e) => setCommission(Number(e.target.value))}
          />
        </label>
      </div>

      <div className={styles.results}>
        <div className={styles.resultMeta}>
          <span>
            {formatNum(results.leadsMonth, locale)} Anfragen ·{" "}
            {formatNum(results.closesMonth, locale)} Abschlüsse / Monat
          </span>
        </div>
        <div className={styles.resultRow}>
          <span>Umsatz / Monat</span>
          <strong>
            {formatMoney(results.revenueMonth, currency, locale)}
          </strong>
        </div>
        <div className={`${styles.resultRow} ${styles.resultHero}`}>
          <span>Umsatz / Jahr</span>
          <strong>
            {formatMoney(results.revenueYear, currency, locale)}
          </strong>
        </div>
      </div>
    </div>
  );
}
