import { SmokeBackground } from "@/components/ui/spooky-smoke-animation";
import { scrollToSection } from "../hooks/useScrollReveal";
import { CtaButton } from "./CtaButton";
import styles from "./ModalContactFooter.module.css";

interface ModalContactFooterProps {
  onClose: () => void;
  label?: string;
}

export function ModalContactFooter({
  onClose,
  label = "Get in touch",
}: ModalContactFooterProps) {
  const handleClick = () => {
    onClose();
    setTimeout(() => scrollToSection("contact"), 300);
  };

  return (
    <div className={styles.footerInner}>
      <div className={styles.smokeBg} aria-hidden="true">
        <SmokeBackground />
        <div className={styles.smokeOverlay} />
      </div>
      <div className={styles.footerContent}>
        <p className={styles.footerText}>Bereit für den nächsten Schritt?</p>
        <CtaButton size="md" surface="on-dark" onClick={handleClick}>{label}</CtaButton>
      </div>
    </div>
  );
}
