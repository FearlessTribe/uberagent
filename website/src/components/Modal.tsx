import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { modalDialog, modalOverlay, resolveVariants } from "../motion";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  variant?: "default" | "dark-header";
}

export function Modal({
  isOpen,
  onClose,
  title,
  eyebrow,
  children,
  footer,
  variant = "dark-header",
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const overlayVariants = resolveVariants(reduce, modalOverlay);
  const dialogVariants = resolveVariants(reduce, modalDialog);

  useEffect(() => {
    if (!isOpen) return;
    previousFocus.current = document.activeElement as HTMLElement;
    dialogRef.current?.focus();
    return () => {
      previousFocus.current?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-overlay"
          className={styles.overlay}
          role="presentation"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            ref={dialogRef}
            className={`${styles.dialog} ${variant === "dark-header" ? styles.dialogPremium : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            tabIndex={-1}
            variants={dialogVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.dialogGlow} aria-hidden="true" />
            <div className={styles.dialogGrid} aria-hidden="true" />

            <header className={styles.header}>
              <div className={`container ${styles.headerInner}`}>
                <div className={styles.headerContent}>
                  {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
                  <h2 id="modal-title" className={styles.title}>
                    {title}
                  </h2>
                </div>
                <button
                  className={styles.closeBtn}
                  onClick={onClose}
                  aria-label="Schließen"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path
                      d="M15 5L5 15M5 5l10 10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </header>

            <div className={styles.body}>
              <div className={`container ${styles.bodyInner}`}>{children}</div>
            </div>

            {footer && <div className={styles.footer}>{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
