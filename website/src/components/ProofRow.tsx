import { motion, useReducedMotion } from "motion/react";
import laurensPhoto from "../assets/laurens.jpg";
import { ProvenExpertRating } from "./ProvenExpertRating";
import {
  avatarContainer,
  avatarItem,
  resolveVariants,
  starContainer,
  starItem,
  viewport,
} from "../motion";
import styles from "./ProofRow.module.css";

const PROFILE_URL = "https://www.provenexpert.com/uberagent/";

const avatars = [
  { src: laurensPhoto, alt: "Laurens Lang" },
  { src: "/cases/finanznomade/kim-maurice.jpg", alt: "Kim Elsholz" },
];

function Stars({ reduce }: { reduce: boolean }) {
  return (
    <motion.span
      className={styles.stars}
      aria-hidden="true"
      variants={resolveVariants(reduce, starContainer)}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={viewport}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <motion.svg
          key={i}
          className={styles.star}
          viewBox="0 0 24 24"
          fill="none"
          variants={resolveVariants(reduce, starItem)}
        >
          <path
            d="M14.4639 9.21094L14.5811 9.44824L14.8438 9.48438L20.4023 10.25L16.3672 14.0869L16.1719 14.2725L16.2197 14.5381L17.1973 19.9883L12.2324 17.3809L12 17.2588L11.7676 17.3809L6.80176 19.9883L7.78027 14.5381L7.82812 14.2725L7.63281 14.0869L3.59668 10.25L9.15625 9.48438L9.41895 9.44824L9.53613 9.21094L12 4.22266L14.4639 9.21094Z"
            fill="currentColor"
            stroke="currentColor"
          />
        </motion.svg>
      ))}
    </motion.span>
  );
}

interface ProofRowProps {
  variant?: "dark" | "light";
}

export function ProofRow({ variant = "dark" }: ProofRowProps) {
  const reduce = useReducedMotion();
  const rowClass = `${styles.row} ${variant === "light" ? styles.rowLight : ""}`;

  return (
    <div className={rowClass}>
      <motion.div
        className={styles.avatars}
        aria-hidden="true"
        variants={resolveVariants(Boolean(reduce), avatarContainer)}
        initial={reduce ? false : "hidden"}
        whileInView="visible"
        viewport={viewport}
      >
        {avatars.map((avatar) => (
          <motion.img
            key={avatar.alt}
            src={avatar.src}
            alt=""
            className={styles.avatar}
            width={30}
            height={30}
            loading="lazy"
            variants={resolveVariants(Boolean(reduce), avatarItem)}
          />
        ))}
      </motion.div>
      <a
        className={styles.profileLink}
        href={PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Stars reduce={Boolean(reduce)} />
        <span className={styles.linkText}>
          Bewertet auf <span className={styles.strong}>ProvenExpert</span>
          <span className={styles.srOnly}>, 5 von 5 Sternen, Profil öffnen</span>
        </span>
      </a>
      <div className={styles.srOnly}>
        <ProvenExpertRating />
      </div>
    </div>
  );
}
