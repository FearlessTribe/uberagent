import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { transitions } from "../motion";
import styles from "./LoadingScreen.module.css";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const reduce = useReducedMotion();
  const duration = reduce ? 0.2 : 0.9;

  useEffect(() => {
    const completeTimer = setTimeout(() => {
      sessionStorage.setItem("ua-loaded", "1");
      onComplete();
    }, duration * 1000);

    return () => clearTimeout(completeTimer);
  }, [onComplete, duration]);

  return (
    <motion.div
      className={styles.loading}
      role="status"
      aria-label="Seite wird geladen"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ ...transitions.slow, delay: Math.max(0, duration - 0.25) }}
    >
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: reduce ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transitions.hero}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          width={120}
          height={120}
          poster="/logo.webp"
          className={styles.logo}
          aria-hidden="true"
        >
          <source src="/logo.webm" type="video/webm" />
        </video>
        <span className={styles.text}>überagent</span>
      </motion.div>
    </motion.div>
  );
}
