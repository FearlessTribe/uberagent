import { scrollToContact } from "../hooks/useScrollReveal";
import { CtaButton } from "./CtaButton";
import { trackCalendlyClick } from "../lib/analytics";
import styles from "./ModalContactFooter.module.css";

interface ModalContactFooterProps {
  onClose: () => void;
  label?: string;
  note?: string;
  href?: string;
}

export function ModalContactFooter({
  onClose,
  label = "Get in touch",
  note = "Bereit für den nächsten Schritt?",
  href,
}: ModalContactFooterProps) {
  const handleClick = () => {
    if (href) {
      trackCalendlyClick("modal_footer");
      return;
    }
    scrollToContact("modal_footer");
    onClose();
  };

  return (
    <div className={styles.footerInner}>
      <div className={styles.smokeBg} aria-hidden="true" />
      <div className={styles.footerContent}>
        <p className={styles.footerText}>{note}</p>
        <CtaButton size="md" surface="on-dark" href={href} onClick={handleClick}>
          {label}
        </CtaButton>
      </div>
    </div>
  );
}
