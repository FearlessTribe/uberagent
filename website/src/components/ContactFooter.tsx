import { useEffect } from "react";
import { SectionShell } from "./SectionShell";
import { teamMembers } from "../data/team";
import { navServiceGroups } from "../data/services";
import { scrollToSection } from "../hooks/useScrollReveal";
import { ScrollReveal } from "./ScrollReveal";
import { CALENDLY_URL, trackOutboundClick } from "../lib/analytics";
import { CtaButton } from "./CtaButton";
import { BrandMark } from "./BrandMark";
import { MotionPressable } from "./MotionPressable";
import { ServiceIcon } from "./ServiceIcon";
import styles from "./ContactFooter.module.css";

interface ContactFooterProps {
  onOpenService: (id: string) => void;
  onOpenLaurens?: () => void;
}

function isContactPath(pathname = window.location.pathname) {
  return pathname === "/contact" || pathname === "/contact/";
}

export function ContactFooter({ onOpenService, onOpenLaurens }: ContactFooterProps) {
  const laurens = teamMembers[0];

  useEffect(() => {
    const scrollIfContact = () => {
      if (!isContactPath()) return;
      const target =
        window.location.hash === "#impressum" ? "impressum" : "contact";
      requestAnimationFrame(() => scrollToSection(target, "smooth"));
    };

    scrollIfContact();
    window.addEventListener("popstate", scrollIfContact);
    return () => window.removeEventListener("popstate", scrollIfContact);
  }, []);

  return (
    <SectionShell
      as="footer"
      id="contact"
      role="contentinfo"
      background="static-footer"
      className={styles.footer}
      contentClassName={styles.footerInner}
    >
      <div className="container">
        <ScrollReveal className={styles.hero}>
          <div className={`sectionStart ${styles.intro}`}>
            <span className="eyebrow">Ihr Ansprechpartner</span>
            <h2 className="display-md">
              Wir sind für Sie da, um Ihnen zu <span className="em">helfen</span>.
            </h2>
            <CtaButton
              size="lg"
              surface="accent"
              showCalendar
              sublabel
              analyticsLocation="footer"
              href={CALENDLY_URL}
            >
              Jetzt Erstgespräch sichern
            </CtaButton>
          </div>

          <MotionPressable
            className={styles.profileColumn}
            onClick={onOpenLaurens}
            aria-haspopup="dialog"
            aria-label="Profil von Laurens Lang öffnen"
          >
            <img
              src={laurens.image}
              alt={laurens.name}
              className={styles.profileImage}
              loading="eager"
              decoding="async"
              width={320}
              height={330}
            />
            <div className={styles.profileInfo}>
              <p className={styles.profileName}>Laurens Lang, M.Sc. MBA</p>
              <p className={styles.profileRole}>Founder · uberagent</p>
            </div>
          </MotionPressable>
        </ScrollReveal>

        <ScrollReveal className={styles.details}>
          <div className={styles.contactDetails}>
            <h3 className={styles.detailLabel}>Impressum</h3>
            <BrandMark
              tone="on-dark"
              size="sm"
              withWordmark
              decorative
              className={styles.contactBrand}
            />

            <div className={styles.contactCopy} id="impressum">
              <a
                href="mailto:info@uberagent.com"
                className={styles.phone}
                onClick={() =>
                  trackOutboundClick("email", {
                    url: "mailto:info@uberagent.com",
                    location: "footer",
                  })
                }
              >
                info@uberagent.com
              </a>
              <address className={styles.address}>
                uberagent<br />
                Laurens Lang<br />
                Eugen-Huber-Strasse 127<br />
                8048 Zürich<br />
                Schweiz
              </address>
            </div>
          </div>

          <div className={styles.servicesBlock}>
            <h3 className={styles.detailLabel}>Services</h3>
            <div className={styles.serviceGroups}>
              {navServiceGroups.map((group) => (
                <div key={group.id} className={styles.serviceGroup}>
                  <div className={styles.serviceGroupHead}>
                    <h4>{group.label}</h4>
                    <p>{group.description}</p>
                  </div>
                  <ul className={styles.serviceLinks} role="list">
                    {group.items.map((item) => (
                      <li key={item.serviceId}>
                        <button
                          className={styles.serviceLink}
                          onClick={() => onOpenService(item.serviceId)}
                        >
                          {item.avatarSrc ? (
                            <span className={styles.serviceAvatar}>
                              <img src={item.avatarSrc} alt="" width={34} height={34} />
                            </span>
                          ) : (
                            <span className={styles.serviceIcon}>
                              <ServiceIcon type={item.icon} />
                            </span>
                          )}
                          <span className={styles.serviceLinkCopy}>
                            <span>{item.title}</span>
                            {item.subtitle ? <small>{item.subtitle}</small> : null}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </SectionShell>
  );
}
