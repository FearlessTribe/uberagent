import { useEffect, useState } from "react";
import styles from "./LoadingScreen.module.css";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const duration = prefersReduced ? 300 : 2200;
    const fadeTimer = setTimeout(() => setFadeOut(true), duration - 400);
    const completeTimer = setTimeout(onComplete, duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`${styles.loading} ${fadeOut ? styles.fadeOut : ""}`}
      role="status"
      aria-label="Seite wird geladen"
    >
      <div className={styles.content}>
        <img
          src="/logo.gif"
          alt=""
          className={styles.logo}
          aria-hidden="true"
        />
        <span className={styles.text}>überagent</span>
      </div>
    </div>
  );
}
