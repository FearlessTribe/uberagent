import { SmokeBackground } from "@/components/ui/spooky-smoke-animation";
import { services } from "../data/services";
import { useCardGlow } from "../hooks/useScrollReveal";
import { ScrollReveal } from "./ScrollReveal";
import { ServiceIcon } from "./ServiceIcon";
import styles from "./Services.module.css";

interface ServicesProps {
  onOpenService: (id: string) => void;
}

export function Services({ onOpenService }: ServicesProps) {
  const { handleMouseMove } = useCardGlow();

  return (
    <section id="services" className={`section ${styles.services}`} aria-labelledby="services-heading">
      <div className={styles.smokeLayer} aria-hidden="true">
        <SmokeBackground />
      </div>
      <div className={styles.bgOverlay} aria-hidden="true" />

      <div className={styles.servicesContent}>
        <div className="container">
          <ScrollReveal className={styles.header}>
            <span className="eyebrow">Leistungen</span>
            <h2 id="services-heading" className="display-md">
              Services
            </h2>
            <p className={styles.subline}>
              Von GTM-Systemen über MCP-Integration bis zu Workflow Agents —
              produktionsreif, nicht prototypisch.
            </p>
          </ScrollReveal>

          <ScrollReveal className={styles.grid} stagger>
            {services.map((service) => {
              const primaryStat = service.stats[0];
              const isFeatured = service.featured;

              return (
                <button
                  key={service.id}
                  className={`card card-dark ${styles.serviceCard} ${isFeatured ? styles.featured : ""}`}
                  onClick={() => onOpenService(service.id)}
                  onMouseMove={handleMouseMove}
                  aria-haspopup="dialog"
                >
                  <div className={styles.cardMain}>
                    <div className={styles.tags}>
                      {service.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                    <div className={styles.titleRow}>
                      <ServiceIcon type={service.icon} className={styles.icon} />
                      <h3 className={styles.serviceTitle}>{service.title}</h3>
                    </div>
                    <p className={styles.cardHook}>{service.cardHook}</p>
                  </div>

                  <div className={styles.cardAside}>
                    {primaryStat && (
                      <div className={styles.statPill}>
                        <span className={styles.statValue}>{primaryStat.value}</span>
                        <span className={styles.statLabel}>{primaryStat.label}</span>
                      </div>
                    )}
                    <span className={styles.readMore}>
                      {service.ctaLabel}
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </button>
              );
            })}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
