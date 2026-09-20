import { useReducedMotion } from "motion/react";
import { Lottie } from "lottie-react";
import { StackedCards } from "./StackedCards";
import serviceStyles from "./Services.module.css";
import styles from "./MaximBenefitStack.module.css";

export type MaximBenefitStackCard = {
  icon: "orders" | "time" | "service";
  titleAccent: string;
  titleRest: string;
  text: string;
  lottieSrc: string;
};

function StackCardIcon({ type }: { type: MaximBenefitStackCard["icon"] }) {
  if (type === "orders") {
    return (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path
          d="M34 8 14 34h16l-4 22 24-30H34V8Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (type === "time") {
    return (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="32" cy="34" r="18" stroke="currentColor" strokeWidth="2.2" />
        <path
          d="M32 24v12l8 4"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26 10h12M32 10v4"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path
        d="M38 48v-2a8 8 0 00-8-8H18a8 8 0 00-8 8v2"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="24" cy="22" r="7" stroke="currentColor" strokeWidth="2.2" />
      <path
        d="M54 48v-2a7 7 0 00-5-6.7M42 16a7 7 0 010 13.4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="m44 40 4 4 8-9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MaximBenefitStack({
  cards,
}: {
  cards: readonly MaximBenefitStackCard[];
}) {
  const reduce = useReducedMotion();

  return (
    <section className={styles.stackSection}>
      <StackedCards className={styles.stack} offsetTop={96} stackGap={16}>
        {cards.map((card, index) => (
          <article
            key={card.titleAccent}
            className={`card card-dark ${serviceStyles.serviceCard} ${styles.stackCard}`}
          >
            <div className={serviceStyles.cardMain}>
              <div className={serviceStyles.cardCopy}>
                <span className={serviceStyles.cardEyebrow}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className={`${serviceStyles.serviceTitle} ${styles.stackTitle}`}>
                  <span className={`em mark ${serviceStyles.titleAccent}`}>
                    {card.titleAccent}
                  </span>
                  <span className={styles.stackTitleRest}>{card.titleRest}</span>
                </h3>
                <p
                  className={`${serviceStyles.cardDescription} ${styles.stackDescription}`}
                >
                  {card.text}
                </p>
              </div>
            </div>
            <div className={serviceStyles.cardVisual} aria-hidden="true">
              <div className={serviceStyles.visualFrame}>
                {reduce ? (
                  <span className={styles.stackIconFallback}>
                    <StackCardIcon type={card.icon} />
                  </span>
                ) : (
                  <Lottie
                    src={card.lottieSrc}
                    loop
                    autoplay
                    className={`${serviceStyles.visualLottie} ${serviceStyles.visualLottieSpacious}`}
                  />
                )}
              </div>
            </div>
          </article>
        ))}
      </StackedCards>
    </section>
  );
}
