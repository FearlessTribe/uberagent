import { scrollToContact } from "../hooks/useScrollReveal";
import { CtaButton } from "./CtaButton";
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
    if (href) return;
    onClose();
    window.setTimeout(() => scrollToContact("modal_footer"), 0);
  };

  return (
    <div className={styles.footerInner}>
      <div className={styles.smokeBg} aria-hidden="true" />
      <div className={styles.footerContent}>
        <p className={styles.footerText}>{note}</p>
        <CtaButton
          size="md"
          surface="on-dark"
          href={href}
          analyticsLocation={href ? "modal_footer" : undefined}
          onClick={handleClick}
        >
          {label}
        </CtaButton>
      </div>
    </div>
  );
}
