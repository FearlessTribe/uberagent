import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useActiveSection, useScrollProgress, scrollToSection } from "../hooks/useScrollReveal";
import { useOverlay } from "../context/OverlayContext";
import { CtaButton } from "./CtaButton";
import { menuContainer, menuItem, mobilePanel, modalOverlay, transitions } from "../motion";
import styles from "./Navigation.module.css";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Success Stories" },
  { id: "team", label: "Team" },
];

export function Navigation() {
  const scrolled = useScrollProgress();
  const activeId = useActiveSection(navLinks.map((l) => l.id));
  const overlay = useOverlay();
  const { menuOpen, isOverlayOpen, toggleMenu, closeMenu, closeAll } = overlay;
  const onDarkNav = !scrolled && !menuOpen;
  const reduce = useReducedMotion();

  const handleNav = (id: string) => {
    scrollToSection(id);
    closeAll();
  };

  const toggleMenuSafe = () => {
    if (isOverlayOpen && !menuOpen) return;
    toggleMenu();
  };

  return (
    <>
      <header
        className={`${styles.header} layer-chrome ${menuOpen ? styles.behindMenu : ""} ${scrolled || menuOpen ? styles.scrolled : styles.onHero}`}
        role="banner"
      >
        <nav className={`container ${styles.nav}`} aria-label="Hauptnavigation">
          <a
            href="#home"
            className={styles.logoLink}
            onClick={(e) => {
              e.preventDefault();
              handleNav("home");
            }}
            aria-label="überagent – Startseite"
          >
            <span className={styles.logoIcon} aria-hidden="true">
              <img
                src="/logowhite.svg"
                alt=""
                className={`${styles.logo} ${onDarkNav ? styles.logoVisible : styles.logoHidden}`}
                width={36}
                height={36}
              />
              <img
                src="/logoblack.svg"
                alt=""
                className={`${styles.logo} ${onDarkNav ? styles.logoHidden : styles.logoVisible}`}
                width={36}
                height={36}
              />
            </span>
            <span className={styles.logoText}>überagent</span>
          </a>

          <ul className={styles.links} role="list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  className={`${styles.link} ${activeId === link.id ? styles.active : ""}`}
                  onClick={() => handleNav(link.id)}
                  aria-current={activeId === link.id ? "true" : undefined}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.ctaWrap}>
            <CtaButton
              size="sm"
              surface={onDarkNav ? "on-dark" : "on-light"}
              onClick={() => handleNav("contact")}
            >
              Erstgespräch
            </CtaButton>
          </div>

          <button
            className={styles.menuToggle}
            onClick={toggleMenuSafe}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            disabled={isOverlayOpen && !menuOpen}
          >
            <span className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}>
              <span />
              <span />
            </span>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className={styles.offCanvas}
            aria-hidden={false}
            variants={reduce ? undefined : modalOverlay}
            initial={reduce ? false : "hidden"}
            animate="visible"
            exit="exit"
          >
            <div className={styles.offCanvasLayout}>
              <motion.button
                className={styles.offCanvasBackdrop}
                onClick={closeMenu}
                aria-label="Menü schließen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transitions.fast}
              />
              <motion.div
                className={styles.offCanvasInner}
                variants={reduce ? undefined : mobilePanel}
                initial={reduce ? false : "hidden"}
                animate="visible"
                exit="exit"
              >
                <div className={styles.offCanvasBrand}>
                  <img src="/logoblack.svg" alt="" className={styles.offCanvasLogo} width={32} height={32} />
                  <span className={styles.logoTextDark}>überagent</span>
                </div>
                <motion.ul
                  className={styles.offCanvasLinks}
                  role="list"
                  variants={reduce ? undefined : menuContainer}
                  initial={reduce ? false : "hidden"}
                  animate="visible"
                >
                  {navLinks.map((link) => (
                    <motion.li key={link.id} variants={reduce ? undefined : menuItem}>
                      <button
                        className={styles.offCanvasLink}
                        onClick={() => handleNav(link.id)}
                      >
                        {link.label}
                      </button>
                    </motion.li>
                  ))}
                </motion.ul>
                <CtaButton size="md" surface="on-light" onClick={() => handleNav("contact")} fullWidth>
                  Erstgespräch vereinbaren
                </CtaButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
