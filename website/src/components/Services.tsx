import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SectionShell } from "./SectionShell";
import {
  productizedAgentIds,
  productizedAgents,
  serviceCategories,
  services,
  type ProductizedAgent,
  type Service,
  type ServiceCategoryId,
} from "../data/services";
import { useCardGlow } from "../hooks/useScrollReveal";
import { ScrollReveal } from "./ScrollReveal";
import { MotionPressable } from "./MotionPressable";
import { ServiceIcon } from "./ServiceIcon";
import { AgentLottie } from "./AgentLottie";
import { HeroTermRain } from "./HeroTermRain";
import { fadeIn, slidePanel, fadeUpItem, staggerContainer, resolveVariants, viewport } from "../motion";
import styles from "./Services.module.css";

interface ServicesProps {
  onOpenService: (id: string) => void;
}

function ServiceCard({
  service,
  onOpen,
  onMouseMove,
}: {
  service: Service;
  onOpen: (id: string) => void;
  onMouseMove: (event: React.MouseEvent<HTMLElement>) => void;
}) {
  const primaryStat = service.stats[0];

  return (
    <MotionPressable
      className={`card card-dark ${styles.serviceCard} ${service.featured ? styles.featuredCard : ""}`}
      onClick={() => onOpen(service.id)}
      onMouseMove={onMouseMove}
      aria-haspopup="dialog"
    >
      <div className={styles.cardMain}>
        <div className={styles.tags}>
          {service.featured && <span className={styles.newBadge}>Neu</span>}
          {service.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.titleRow}>
          <ServiceIcon type={service.icon} className={styles.icon} />
          <h3 className={styles.serviceTitle}>{service.title}</h3>
        </div>
        <p className={styles.cardDescription}>{service.shortDescription}</p>
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
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </MotionPressable>
  );
}

function AgentPersona({
  agent,
  service,
  onOpen,
  onMouseMove,
}: {
  agent: ProductizedAgent;
  service: Service | undefined;
  onOpen: (id: string) => void;
  onMouseMove: (event: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <MotionPressable
      className={`card card-dark ${styles.persona}`}
      onClick={() => onOpen(agent.serviceId)}
      onMouseMove={onMouseMove}
      aria-haspopup="dialog"
      aria-label={`${agent.name}, ${agent.role} kennenlernen`}
    >
      <div className={styles.personaStage} aria-hidden="true">
        <AgentLottie
          src={agent.lottieSrc}
          poster={agent.posterSrc}
          alt=""
          className={styles.personaLottie}
        />
      </div>

      <div className={styles.personaBody}>
        <div className={styles.personaIdentity}>
          <span className={styles.personaRole}>{agent.role}</span>
          <h3 className={styles.personaName}>{agent.name}</h3>
          <p className={styles.personaTagline}>{agent.tagline}</p>
        </div>

        <p className={styles.personaPersonality}>{agent.personality}</p>
        <p className={styles.personaBio}>{agent.bio}</p>

        <ul className={styles.personaTraits}>
          {agent.traits.map((trait) => (
            <li key={trait}>{trait}</li>
          ))}
        </ul>

        <span className={styles.personaCta}>
          {service?.ctaLabel ?? "Kennenlernen"}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </MotionPressable>
  );
}

export function Services({ onOpenService }: ServicesProps) {
  const { handleMouseMove } = useCardGlow();
  const reduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<ServiceCategoryId>("engineering");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const filteredServices = useMemo(
    () =>
      services.filter(
        (service) =>
          service.category === activeCategory && !productizedAgentIds.has(service.id),
      ),
    [activeCategory],
  );

  const handleTabKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      const lastIndex = serviceCategories.length - 1;
      let nextIndex: number | null = null;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        nextIndex = index === lastIndex ? 0 : index + 1;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        nextIndex = index === 0 ? lastIndex : index - 1;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = lastIndex;
      }

      if (nextIndex === null) return;

      event.preventDefault();
      const nextCategory = serviceCategories[nextIndex];
      setActiveCategory(nextCategory.id);
      tabRefs.current[nextIndex]?.focus();
    },
    [],
  );

  const panelVariants = reduceMotion ? fadeIn : slidePanel;
  const gridVariants = reduceMotion ? undefined : staggerContainer;

  return (
    <SectionShell id="services" background="static" ariaLabelledBy="services-heading">
      <HeroTermRain variant="section" />
      <div className="container">
        <ScrollReveal className={styles.agentsHeader}>
          <span className="eyebrow">Productized Agents</span>
          <h2 id="services-heading" className="display-md">
            Lernen Sie unser Team kennen
          </h2>
          <p className={styles.subline}>
            Fertige Agenten mit eigenem Job, eigener Persönlichkeit und klarem Output –
            als wären sie Teil Ihres Teams.
          </p>
        </ScrollReveal>

        <motion.div
          className={styles.personaGrid}
          variants={resolveVariants(Boolean(reduceMotion), staggerContainer)}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewport}
        >
          {productizedAgents.map((agent) => (
            <motion.div
              key={agent.serviceId}
              className={styles.personaItem}
              variants={resolveVariants(Boolean(reduceMotion), fadeUpItem)}
            >
              <AgentPersona
                agent={agent}
                service={services.find((service) => service.id === agent.serviceId)}
                onOpen={onOpenService}
                onMouseMove={handleMouseMove}
              />
            </motion.div>
          ))}
        </motion.div>

        <ScrollReveal className={styles.header}>
          <span className="eyebrow">Leistungen</span>
          <h2 className="display-md">Weitere Services</h2>
          <p className={styles.subline}>
            Engineering und Beratung rund um die Agenten – vom Workflow bis zur AI-Strategie.
          </p>
        </ScrollReveal>

        <div className={styles.tabsWrap}>
          <div className={styles.tabs} role="tablist" aria-label="Service-Kategorien">
            {serviceCategories.map((category, index) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`services-tab-${category.id}`}
                  aria-selected={isActive}
                  aria-controls={`services-panel-${category.id}`}
                  tabIndex={isActive ? 0 : -1}
                  className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
                  onClick={() => setActiveCategory(category.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              id={`services-panel-${activeCategory}`}
              role="tabpanel"
              aria-labelledby={`services-tab-${activeCategory}`}
              className={styles.panel}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                className={styles.grid}
                variants={gridVariants}
                initial={reduceMotion ? false : "hidden"}
                animate={reduceMotion ? undefined : "visible"}
              >
                {filteredServices.map((service) => (
                  <motion.div
                    key={service.id}
                    className={styles.gridItem}
                    variants={reduceMotion ? undefined : fadeUpItem}
                  >
                    <ServiceCard
                      service={service}
                      onOpen={onOpenService}
                      onMouseMove={handleMouseMove}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionShell>
  );
}

