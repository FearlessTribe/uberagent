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
      <div className={styles.gradientBg} aria-hidden="true" />
      <div className="container">
        <ScrollReveal className={`sectionStart ${styles.header}`}>
          <span className="eyebrow">Leistungen</span>
          <h2 id="services-heading" className="display-md">
            Services
          </h2>
        </ScrollReveal>

        <ScrollReveal className={styles.grid} stagger>
          {services.map((service) => (
            <button
              key={service.id}
              className={`card ${styles.serviceCard}`}
              onClick={() => onOpenService(service.id)}
              onMouseMove={handleMouseMove}
              aria-haspopup="dialog"
            >
              <ServiceIcon type={service.icon} className={styles.icon} />
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className="body">{service.shortDescription}</p>
              <span className={styles.arrow} aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
