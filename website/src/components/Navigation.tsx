import { useState } from "react";
import { useActiveSection, useScrollProgress, scrollToSection } from "../hooks/useScrollReveal";
import { CtaButton } from "./CtaButton";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const onDarkNav = !scrolled;

  const handleNav = (id: string) => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : styles.onHero}`}
        role="banner"
      >
        <nav className={`container ${styles.nav}`} aria-label="Hauptnavigation">
          <a
            href="#home"
            className={styles.logoLink}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
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
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          >
            <span className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}>
              <span />
              <span />
            </span>
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        className={`${styles.offCanvas} ${menuOpen ? styles.offCanvasOpen : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className={styles.offCanvasInner}>
          <div className={styles.offCanvasBrand}>
            <img src="/logoblack.svg" alt="" className={styles.offCanvasLogo} width={32} height={32} />
            <span className={styles.logoTextDark}>überagent</span>
          </div>
          <ul className={styles.offCanvasLinks} role="list">
            {navLinks.map((link, i) => (
              <li
                key={link.id}
                style={{ animationDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
              >
                <button
                  className={styles.offCanvasLink}
                  onClick={() => handleNav(link.id)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <CtaButton size="md" surface="on-light" onClick={() => handleNav("contact")} fullWidth>
            Erstgespräch vereinbaren
          </CtaButton>
        </div>
        <button
          className={styles.offCanvasBackdrop}
          onClick={() => setMenuOpen(false)}
          aria-label="Menü schließen"
          tabIndex={menuOpen ? 0 : -1}
        />
      </div>
    </>
  );
}
