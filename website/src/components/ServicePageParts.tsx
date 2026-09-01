import type { ReactNode } from "react";
import { PageBreadcrumb } from "./PageShell";
import { TypedHeadline } from "./TypedHeadline";
import { SectionBackground } from "./SectionBackground";
import { HeroTermRain } from "./HeroTermRain";
import type { ServiceStat } from "../data/serviceModalContent";
import styles from "./ServiceModal.module.css";

function StatPill({ value, label }: ServiceStat) {
  return (
    <div className={styles.statPill}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h3 className={styles.sectionTitle}>{children}</h3>;
}

export function ServiceHeroLayout({
  tag,
  title,
  lead,
  note,
  stats,
  mark,
  ctas,
  proof,
  visual,
  leadClassName,
  titleClassName,
  centerCopy,
  rawTitle = false,
  hideBreadcrumb = false,
}: {
  tag: ReactNode;
  title?: ReactNode;
  lead: ReactNode;
  note?: ReactNode;
  stats?: ServiceStat[];
  mark?: ReactNode;
  ctas?: ReactNode;
  proof?: ReactNode;
  visual?: ReactNode;
  leadClassName?: string;
  titleClassName?: string;
  centerCopy?: boolean;
  rawTitle?: boolean;
  hideBreadcrumb?: boolean;
}) {
  return (
    <section className={`${styles.heroSection} ${styles.serviceHero}`.trim()}>
      <SectionBackground variant="static-hero" />
      <HeroTermRain />
      <div className={styles.heroBottomFade} aria-hidden="true" />
      <div className={styles.serviceHeroInner}>
        {!hideBreadcrumb && <PageBreadcrumb tone="dark" />}
        <div className={styles.heroIntro}>
          {tag}
          {title ? (
            rawTitle ? (
              <h3 className={`${styles.heroHeadline} ${titleClassName ?? ""}`.trim()}>
                {title}
              </h3>
            ) : (
              <TypedHeadline
                as="h3"
                className={`${styles.heroHeadline} ${titleClassName ?? ""}`.trim()}
              >
                {title}
              </TypedHeadline>
            )
          ) : null}
        </div>
        <div
          className={`${styles.heroBody} ${centerCopy ? styles.heroBodyCenter : ""} ${visual ? "" : styles.heroBodyNoVisual}`.trim()}
        >
          <div className={styles.heroCopy}>
            <p className={`${styles.lead} ${leadClassName ?? ""}`.trim()}>{lead}</p>
            {note ? <p className={styles.heroNote}>{note}</p> : null}
            {mark ? <div className={styles.heroMark}>{mark}</div> : null}
            {!mark && stats?.length ? (
              <div className={styles.statsRow}>
                {stats.map((s) => (
                  <StatPill key={s.label} {...s} />
                ))}
              </div>
            ) : null}
            {ctas ? <div className={styles.heroCtas}>{ctas}</div> : null}
            {proof ? <div className={styles.heroProof}>{proof}</div> : null}
          </div>
          {visual ? <div className={styles.heroStage}>{visual}</div> : null}
        </div>
      </div>
    </section>
  );
}
