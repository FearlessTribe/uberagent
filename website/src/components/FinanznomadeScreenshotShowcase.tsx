import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import styles from "./FinanznomadeCaseModal.module.css";

const screens = [
  {
    id: "personen",
    step: "01",
    title: "Personen",
    caption: "Geburtsdatum & versicherte Personen",
    src: "/cases/finanznomade/screenshots/01-personen.png",
  },
  {
    id: "region",
    step: "02",
    title: "Region",
    caption: "Hauptregion & Unternehmer-Situation",
    src: "/cases/finanznomade/screenshots/02-region.png",
  },
  {
    id: "schutz",
    step: "03",
    title: "Schutz",
    caption: "Basic · Comfort · Premium + Selbstbehalt",
    src: "/cases/finanznomade/screenshots/03-schutz.png",
  },
  {
    id: "hinweis",
    step: "04",
    title: "Hinweis",
    caption: "Rechtlicher Rahmen vor dem Vergleich",
    src: "/cases/finanznomade/screenshots/04-hinweis.png",
  },
  {
    id: "vergleich",
    step: "05",
    title: "Vergleich",
    caption: "Tarife, Preise & Anbieter-Auswahl",
    src: "/cases/finanznomade/screenshots/05-vergleich.png",
  },
  {
    id: "detail",
    step: "05+",
    title: "Matrix",
    caption: "Detailvergleich & Leistungsmatrix",
    src: "/cases/finanznomade/screenshots/06-vergleich-detail.png",
  },
] as const;

const LIVE_URL = "https://auslandsvergleich.finanznoma.de/";

function cardTransform(index: number, active: number, reduce: boolean) {
  if (reduce) return {};
  const offset = index - active;
  const abs = Math.abs(offset);
  return {
    rotateY: offset * 14,
    rotateX: 6 - abs * 2,
    x: offset * 72,
    y: abs * 10,
    z: -abs * 90 + (offset === 0 ? 120 : 0),
    scale: offset === 0 ? 1 : 0.88 - abs * 0.04,
    opacity: offset === 0 ? 1 : Math.max(0.25, 0.72 - abs * 0.18),
    zIndex: 20 - abs,
  };
}

export function FinanznomadeScreenshotShowcase() {
  const [active, setActive] = useState(4);
  const reduce = useReducedMotion();
  const current = screens[active];

  return (
    <div className={styles.showcase}>
      <div className={styles.showcaseHeader}>
        <span className={styles.showcaseEyebrow}>Live-Produkt</span>
        <p className={styles.showcaseIntro}>
          Fünf Schritte vom Einstieg bis zum Vergleich — editorial, klar, conversion-orientiert.
        </p>
        <a
          className={styles.showcaseLink}
          href={LIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          auslandsvergleich.finanznoma.de
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M4 12L12 4M12 4H6M12 4v6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      <div className={styles.showcaseStageWrap}>
        <div className={styles.showcaseGlow} aria-hidden="true" />
        <div className={styles.showcaseStage}>
          {screens.map((screen, index) => {
            const isActive = index === active;
            const transform = cardTransform(index, active, Boolean(reduce));

            return (
              <motion.button
                key={screen.id}
                type="button"
                className={`${styles.showcaseCard} ${isActive ? styles.showcaseCardActive : ""}`}
                style={{ zIndex: transform.zIndex }}
                onClick={() => setActive(index)}
                aria-label={`${screen.title}: ${screen.caption}`}
                aria-pressed={isActive}
                animate={reduce ? { opacity: isActive ? 1 : 0 } : transform}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.browserChrome}>
                  <span className={styles.browserDots} aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className={styles.browserUrl}>auslandsvergleich.finanznoma.de</span>
                </div>
                <div className={styles.browserViewport}>
                  <img src={screen.src} alt="" width={1280} height={800} loading="lazy" />
                </div>
                <span className={styles.showcaseStepBadge}>{screen.step}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className={styles.showcaseMeta}>
        <div>
          <span className={styles.showcaseMetaStep}>Schritt {current.step}</span>
          <strong className={styles.showcaseMetaTitle}>{current.title}</strong>
          <p className={styles.showcaseMetaCaption}>{current.caption}</p>
        </div>
        <div className={styles.showcaseThumbs} role="tablist" aria-label="Konfigurator-Schritte">
          {screens.map((screen, index) => (
            <button
              key={screen.id}
              type="button"
              role="tab"
              aria-selected={index === active}
              className={`${styles.showcaseThumb} ${index === active ? styles.showcaseThumbActive : ""}`}
              onClick={() => setActive(index)}
            >
              <img src={screen.src} alt="" width={120} height={75} loading="lazy" />
              <span>{screen.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
