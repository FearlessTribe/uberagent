import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  useActiveSection,
  useScrollProgress,
  scrollToContact,
  scrollToSection,
} from "../hooks/useScrollReveal";
import { useOverlay } from "../context/OverlayContext";
import { navServiceGroups, type NavServiceItem } from "../data/services";
import { CtaButton } from "./CtaButton";
import { ServiceIcon } from "./ServiceIcon";
import {
  fadeIn,
  menuContainer,
  menuItem,
  mobilePanel,
  modalOverlay,
  transitions,
} from "../motion";
import styles from "./Navigation.module.css";

const sectionLinks = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Success Stories" },
  { id: "team", label: "Team" },
] as const;

function Chevron({ open }: { open?: boolean }) {
  return (
    <svg
      className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 4.5L6 8l3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ServiceNavVisual({ item }: { item: NavServiceItem }) {
  if (item.avatarSrc) {
    return (
      <span className={styles.itemAvatar}>
        <img src={item.avatarSrc} alt="" width={44} height={44} />
      </span>
    );
  }

  return (
    <span className={styles.itemIcon}>
      <ServiceIcon type={item.icon} className={styles.itemIconSvg} />
    </span>
  );
}

export function Navigation() {
  const scrolled = useScrollProgress();
  const activeSection = useActiveSection([
    "home",
    "services",
    "projects",
    "team",
  ]);
  const overlay = useOverlay();
  const {
    menuOpen,
    toggleMenu,
    closeMenu,
    navigateHome,
    openProjectId,
    openServiceId,
    openService,
  } = overlay;
  const useSolidNav = scrolled || menuOpen || Boolean(openProjectId) || Boolean(openServiceId);
  const onDarkNav = !useSolidNav;
  const reduce = useReducedMotion();
  const servicesMenuId = useId();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesWrapRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<number>(0);

  const servicesActive =
    activeSection === "services" || Boolean(openServiceId);

  useEffect(() => {
    if (!servicesOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesOpen(false);
    };
    const onPointerDown = (event: MouseEvent) => {
      if (
        servicesWrapRef.current &&
        !servicesWrapRef.current.contains(event.target as Node)
      ) {
        setServicesOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onPointerDown);
    };
  }, [servicesOpen]);

  useEffect(() => {
    if (!menuOpen) setMobileServicesOpen(false);
  }, [menuOpen]);

  useEffect(() => {
    return () => window.clearTimeout(closeTimer.current);
  }, []);

  const handleContact = () => {
    setServicesOpen(false);
    navigateHome();
    scrollToContact("nav", "smooth");
  };

  const handleSectionNav = (id: string) => {
    setServicesOpen(false);
    closeMenu();
    navigateHome();
    scrollToSection(id, "smooth");
  };

  const handleServiceNav = (serviceId: string) => {
    setServicesOpen(false);
    closeMenu();
    openService(serviceId);
  };

  const openServicesMenu = () => {
    window.clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };

  const scheduleCloseServicesMenu = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 160);
  };

  const toggleMenuSafe = () => {
    setServicesOpen(false);
    toggleMenu();
  };

  return (
    <>
      <header
        className={`${styles.header} layer-chrome ${menuOpen ? styles.behindMenu : ""} ${useSolidNav ? styles.scrolled : styles.onHero}`}
        role="banner"
      >
        <nav className={`container ${styles.nav}`} aria-label="Hauptnavigation">
          <a
            href="#home"
            className={styles.logoLink}
            onClick={(e) => {
              e.preventDefault();
              handleSectionNav("home");
            }}
            aria-label="uberagent | Startseite"
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
            <span className={styles.logoText}>uberagent</span>
          </a>

          <ul className={styles.links} role="list">
            <li>
              <button
                className={`${styles.link} ${activeSection === "home" ? styles.active : ""}`}
                onClick={() => handleSectionNav("home")}
                aria-current={activeSection === "home" ? "true" : undefined}
              >
                Home
              </button>
            </li>

            <li
              ref={servicesWrapRef}
              className={styles.servicesItem}
              onMouseEnter={openServicesMenu}
              onMouseLeave={scheduleCloseServicesMenu}
            >
              <button
                className={`${styles.link} ${styles.servicesTrigger} ${
                  servicesActive || servicesOpen ? styles.active : ""
                }`}
                aria-expanded={servicesOpen}
                aria-controls={servicesMenuId}
                aria-haspopup="true"
                onClick={() => setServicesOpen((open) => !open)}
              >
                Services
                <Chevron open={servicesOpen} />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    id={servicesMenuId}
                    className={styles.mega}
                    role="region"
                    aria-label="Services"
                    variants={reduce ? undefined : fadeIn}
                    initial={reduce ? false : "hidden"}
                    animate="visible"
                    exit={reduce ? undefined : { opacity: 0, transition: transitions.fast }}
                    onMouseEnter={openServicesMenu}
                    onMouseLeave={scheduleCloseServicesMenu}
                  >
                    <div className={styles.megaInner}>
                      {navServiceGroups.map((group) => (
                        <div key={group.id} className={styles.megaColumn}>
                          <div className={styles.megaColumnHead}>
                            <span className={styles.megaLabel}>{group.label}</span>
                            <p className={styles.megaDesc}>{group.description}</p>
                          </div>
                          <ul className={styles.megaList} role="list">
                            {group.items.map((item) => (
                              <li key={item.serviceId}>
                                <button
                                  type="button"
                                  className={styles.megaLink}
                                  onClick={() => handleServiceNav(item.serviceId)}
                                >
                                  <ServiceNavVisual item={item} />
                                  <span className={styles.megaLinkCopy}>
                                    <span className={styles.megaLinkTitle}>
                                      {item.title}
                                      {item.subtitle && (
                                        <span className={styles.megaLinkRole}>
                                          {item.subtitle}
                                        </span>
                                      )}
                                    </span>
                                    <span className={styles.megaLinkBlurb}>
                                      {item.blurb}
                                    </span>
                                  </span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className={styles.megaFooter}>
                      <button
                        type="button"
                        className={styles.megaFooterLink}
                        onClick={() => handleSectionNav("services")}
                      >
                        Alle Services ansehen
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path
                            d="M3 8h10M9 4l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {sectionLinks
              .filter((link) => link.id !== "home")
              .map((link) => (
                <li key={link.id}>
                  <button
                    className={`${styles.link} ${activeSection === link.id ? styles.active : ""}`}
                    onClick={() => handleSectionNav(link.id)}
                    aria-current={activeSection === link.id ? "true" : undefined}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
          </ul>

          <div className={styles.ctaWrap}>
            <CtaButton
              size="sm"
              surface={onDarkNav ? "accent" : "on-light"}
              showCalendar={onDarkNav}
              onClick={handleContact}
            >
              Jetzt Erstgespräch sichern
            </CtaButton>
          </div>

          <button
            className={styles.menuToggle}
            onClick={toggleMenuSafe}
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
                  <img
                    src="/logoblack.svg"
                    alt=""
                    className={styles.offCanvasLogo}
                    width={32}
                    height={32}
                  />
                  <span className={styles.logoTextDark}>uberagent</span>
                </div>

                <motion.ul
                  className={styles.offCanvasLinks}
                  role="list"
                  variants={reduce ? undefined : menuContainer}
                  initial={reduce ? false : "hidden"}
                  animate="visible"
                >
                  <motion.li variants={reduce ? undefined : menuItem}>
                    <button
                      className={styles.offCanvasLink}
                      onClick={() => handleSectionNav("home")}
                    >
                      Home
                    </button>
                  </motion.li>

                  <motion.li variants={reduce ? undefined : menuItem}>
                    <button
                      className={`${styles.offCanvasLink} ${styles.offCanvasServicesTrigger}`}
                      aria-expanded={mobileServicesOpen}
                      onClick={() => setMobileServicesOpen((open) => !open)}
                    >
                      Services
                      <Chevron open={mobileServicesOpen} />
                    </button>

                    <AnimatePresence initial={false}>
                      {mobileServicesOpen && (
                        <motion.div
                          className={styles.offCanvasServices}
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduce ? undefined : { height: 0, opacity: 0 }}
                          transition={transitions.normal}
                        >
                          {navServiceGroups.map((group) => (
                            <div key={group.id} className={styles.offCanvasGroup}>
                              <span className={styles.offCanvasGroupLabel}>
                                {group.label}
                              </span>
                              <ul role="list">
                                {group.items.map((item) => (
                                  <li key={item.serviceId}>
                                    <button
                                      type="button"
                                      className={styles.offCanvasService}
                                      onClick={() => handleServiceNav(item.serviceId)}
                                    >
                                      <ServiceNavVisual item={item} />
                                      <span>
                                        <span className={styles.offCanvasServiceTitle}>
                                          {item.title}
                                        </span>
                                        {item.subtitle && (
                                          <span className={styles.offCanvasServiceRole}>
                                            {item.subtitle}
                                          </span>
                                        )}
                                      </span>
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          <button
                            type="button"
                            className={styles.offCanvasAllServices}
                            onClick={() => handleSectionNav("services")}
                          >
                            Alle Services ansehen
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>

                  <motion.li variants={reduce ? undefined : menuItem}>
                    <button
                      className={styles.offCanvasLink}
                      onClick={() => handleSectionNav("projects")}
                    >
                      Success Stories
                    </button>
                  </motion.li>
                  <motion.li variants={reduce ? undefined : menuItem}>
                    <button
                      className={styles.offCanvasLink}
                      onClick={() => handleSectionNav("team")}
                    >
                      Team
                    </button>
                  </motion.li>
                </motion.ul>

                <CtaButton
                  size="md"
                  surface="accent"
                  showCalendar
                  sublabel
                  onClick={() => {
                    navigateHome();
                    scrollToContact("nav_mobile", "smooth");
                  }}
                  fullWidth
                >
                  Jetzt Erstgespräch sichern
                </CtaButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
