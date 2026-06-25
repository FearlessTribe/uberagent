import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { modalDialog, modalOverlay } from "../motion";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  headerBanner?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  variant?: "default" | "dark-header";
}

export function Modal({
  isOpen,
  onClose,
  title,
  eyebrow,
  headerBanner,
  children,
  footer,
  variant = "dark-header",
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    previousFocus.current = document.activeElement as HTMLElement;
    dialogRef.current?.focus();
    return () => {
      previousFocus.current?.focus();
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
          onClick={onClose}
          role="presentation"
          variants={modalOverlay}
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
            onClick={(e) => e.stopPropagation()}
            variants={modalDialog}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.dialogGlow} aria-hidden="true" />
            <div className={styles.dialogGrid} aria-hidden="true" />

            <div className={styles.header}>
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

            {headerBanner && <div className={styles.headerBanner}>{headerBanner}</div>}

            <div className={styles.body}>{children}</div>

            {footer && <div className={styles.footer}>{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
