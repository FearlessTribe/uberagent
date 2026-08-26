import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import { scrollToSection } from "../hooks/useScrollReveal";
import styles from "./PageShell.module.css";

interface PageShellProps {
  title: string;
  eyebrow?: string;
  onBack: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /** Service pages: no light header strip / top grid; breadcrumb lives in the dark hero. */
  variant?: "default" | "flush";
}

interface PageChrome {
  title: string;
  sectionLabel: string;
  sectionId: string;
  onBack: () => void;
}

const PageChromeContext = createContext<PageChrome | null>(null);

export function usePageChrome() {
  return useContext(PageChromeContext);
}

export function PageBreadcrumb({ tone = "light" }: { tone?: "light" | "dark" }) {
  const chrome = usePageChrome();
  if (!chrome) return null;

  return (
    <nav
      className={`${styles.breadcrumb} ${tone === "dark" ? styles.breadcrumbDark : ""}`}
      aria-label="Brotkrumen"
    >
      <button type="button" className={styles.crumbBtn} onClick={chrome.onBack}>
        uberagent Home
      </button>
      <span className={styles.breadcrumbSep} aria-hidden="true">
        /
      </span>
      <button
        type="button"
        className={styles.crumbBtn}
        onClick={() => {
          chrome.onBack();
          window.setTimeout(() => scrollToSection(chrome.sectionId, "smooth"), 0);
        }}
      >
        {chrome.sectionLabel}
      </button>
      <span className={styles.breadcrumbSep} aria-hidden="true">
        /
      </span>
      <h1 id="page-title" className={styles.title}>
        {chrome.title}
      </h1>
    </nav>
  );
}

export function PageShell({
  title,
  eyebrow,
  onBack,
  children,
  footer,
  variant = "default",
}: PageShellProps) {
  const mainRef = useRef<HTMLElement>(null);
  const sectionLabel = useMemo(() => {
    if (!eyebrow) return "Services";
    return eyebrow.toLowerCase().includes("success story") ? "Success Stories" : "Services";
  }, [eyebrow]);
  const sectionId = sectionLabel === "Success Stories" ? "projects" : "services";
  const chrome = useMemo(
    () => ({ title, sectionLabel, sectionId, onBack }),
    [title, sectionLabel, sectionId, onBack],
  );
  const flush = variant === "flush";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    mainRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onBack();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onBack]);

  return (
    <PageChromeContext.Provider value={chrome}>
      <div className={`${styles.page} ${flush ? styles.pageFlush : ""}`}>
        {!flush && (
          <>
            <div className={styles.glow} aria-hidden="true" />
            <div className={styles.grid} aria-hidden="true" />
          </>
        )}

        <main
          ref={mainRef}
          className={styles.body}
          tabIndex={-1}
          aria-labelledby="page-title"
        >
          <div className={`${styles.bodyInner} ${flush ? styles.bodyInnerFlush : ""}`}>
            {!flush && (
              <header className={styles.header}>
                <PageBreadcrumb tone="light" />
              </header>
            )}
            {children}
          </div>
        </main>

        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </PageChromeContext.Provider>
  );
}
