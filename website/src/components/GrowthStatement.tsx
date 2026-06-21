import { ScrollReveal } from "./ScrollReveal";
import { GrowthBanner } from "./GrowthBanner";
import styles from "./GrowthStatement.module.css";

export function GrowthStatement() {
  return (
    <div className={styles.section}>
      <ScrollReveal>
        <GrowthBanner />
      </ScrollReveal>
    </div>
  );
}
