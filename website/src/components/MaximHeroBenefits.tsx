import { maximHeroBenefits } from "../data/maximCalc";
import styles from "./MaximHeroBenefits.module.css";

function BenefitIcon({
  type,
}: {
  type: (typeof maximHeroBenefits)[number]["icon"];
}) {
  if (type === "orders") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M13 3 4 14h7l-1 7 10-12h-7l0-6Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (type === "time") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M12 8v4.5L15 15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M17 20v-1a4 4 0 00-4-4H7a4 4 0 00-4 4v1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="10" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M21 20v-1a3.5 3.5 0 00-2.5-3.35M16.5 4.7a3.5 3.5 0 010 6.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MaximHeroBenefits() {
  return (
    <div className={styles.heroBenefits} data-hero-benefits>
      {maximHeroBenefits.map((benefit) => (
        <div key={benefit.text} className={styles.heroBenefit}>
          <span className={styles.heroBenefitIcon}>
            <BenefitIcon type={benefit.icon} />
          </span>
          <span>{benefit.text}</span>
        </div>
      ))}
    </div>
  );
}
