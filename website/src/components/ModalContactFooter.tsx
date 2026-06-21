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
      <p className={styles.footerText}>Bereit für den nächsten Schritt?</p>
      <CtaButton size="md" surface="on-light" onClick={handleClick}>{label}</CtaButton>
    </div>
  );
}
