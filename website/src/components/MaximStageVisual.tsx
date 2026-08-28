import { motion, useReducedMotion } from "motion/react";
import { DURATION, EASE } from "../motion";
import styles from "./MaximStageVisual.module.css";

type MaximStageId = "01" | "02" | "03";

interface MaximStageVisualProps {
  stage: MaximStageId;
}

const STAGE_IMAGES: Record<MaximStageId, { src: string; alt: string }> = {
  "01": {
    src: "/images/maxim-stages/stufe-01-team.png",
    alt: "Mitarbeiter tippt Auftrag ins Tool, Maxim rechnet das Angebot aus",
  },
  "02": {
    src: "/images/maxim-stages/stufe-02-website.png",
    alt: "Kunde chattet mit Maxim auf der Website und wird durch den Prozess geleitet",
  },
  "03": {
    src: "/images/maxim-stages/stufe-03-telefon.png",
    alt: "Maxim nimmt Anrufe entgegen und nimmt den Auftrag auf",
  },
};

export function MaximStageVisual({ stage }: MaximStageVisualProps) {
  const reduce = useReducedMotion();
  const image = STAGE_IMAGES[stage];

  const img = (
    <img
      src={image.src}
      alt={image.alt}
      width={1024}
      height={576}
      className={styles.image}
      loading="lazy"
      decoding="async"
    />
  );

  return (
    <div className={styles.wrap}>
      {reduce ? (
        img
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: DURATION.normal, ease: EASE.outSmooth }}
        >
          {img}
        </motion.div>
      )}
    </div>
  );
}
