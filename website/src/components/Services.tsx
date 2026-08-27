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
import { BrandMark } from "./BrandMark";
import { HeroTermRain } from "./HeroTermRain";
import {
  fadeIn,
  slidePanel,
  fadeUpItem,
  staggerContainer,
  DURATION,
  EASE,
} from "../motion";
import styles from "./Services.module.css";

interface ServicesProps {
  onOpenService: (id: string) => void;
}

const AGENT_ACCENTS: Record<string, string> = {
  "ai-revenue-engine": "blue",
  "corporate-gifting": "pink",
  "kalkulations-agent": "green",
};

function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
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

function AgentFocus({
  agent,
  onOpen,
  onMouseMove,
}: {
  agent: ProductizedAgent;
  onOpen: (id: string) => void;
  onMouseMove: (event: React.MouseEvent<HTMLElement>) => void;
}) {
  const accent = AGENT_ACCENTS[agent.serviceId] ?? "blue";

  return (
    <MotionPressable
      className={`card card-dark ${styles.personaFocus} ${styles[`accent-${accent}`]}`}
      onClick={() => onOpen(agent.serviceId)}
      onMouseMove={onMouseMove}
      aria-haspopup="dialog"
      aria-label={`${agent.name}, ${agent.role} – Lerne ${agent.name} besser kennen`}
    >
      <div className={styles.personaStage} aria-hidden="true">
        <AgentLottie
          src={agent.lottieSrc}
          poster={agent.posterSrc}
          alt=""
          playing
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

        <span className={styles.audienceBadge}>{agent.audience}</span>

        <span className={styles.personaCta}>
          Lerne {agent.name} besser kennen
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

function AgentSide({
  agent,
  onFocus,
}: {
  agent: ProductizedAgent;
  onFocus: () => void;
}) {
  const accent = AGENT_ACCENTS[agent.serviceId] ?? "blue";

  return (
    <button
      type="button"
      className={`${styles.personaSide} ${styles[`accent-${accent}`]}`}
      onClick={onFocus}
      aria-label={`${agent.name} in den Fokus holen`}
    >
      <div className={styles.personaSideStage} aria-hidden="true">
        <AgentLottie
          src={agent.lottieSrc}
          poster={agent.posterSrc}
          alt=""
          playing={false}
          className={styles.personaSideLottie}
        />
      </div>
      <div className={styles.personaSideBody}>
        <span className={styles.personaSideName}>{agent.name}</span>
        <span className={styles.personaSideTagline}>{agent.tagline}</span>
      </div>
    </button>
  );
}

function AgentCarousel({
  onOpenService,
  onMouseMove,
}: {
  onOpenService: (id: string) => void;
  onMouseMove: (event: React.MouseEvent<HTMLElement>) => void;
}) {
  const [focusIndex, setFocusIndex] = useState(0);
  const count = productizedAgents.length;
  const reduceMotion = useReducedMotion();

  const prevIndex = wrapIndex(focusIndex - 1, count);
  const nextIndex = wrapIndex(focusIndex + 1, count);
  const focusAgent = productizedAgents[focusIndex];
  const prevAgent = productizedAgents[prevIndex];
  const nextAgent = productizedAgents[nextIndex];

  const goPrev = useCallback(() => {
    setFocusIndex((current) => wrapIndex(current - 1, count));
  }, [count]);

  const goNext = useCallback(() => {
    setFocusIndex((current) => wrapIndex(current + 1, count));
  }, [count]);

  const focusAgentAt = useCallback((index: number) => {
    setFocusIndex(wrapIndex(index, count));
  }, [count]);

  const handleThumbClick = useCallback(
    (index: number, serviceId: string) => {
      if (index === focusIndex) {
        onOpenService(serviceId);
        return;
      }
      setFocusIndex(index);
    },
    [focusIndex, onOpenService],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    },
    [goPrev, goNext],
  );

  return (
    <div
      className={styles.carousel}
      role="region"
      aria-roledescription="carousel"
      aria-label="Unsere suprahumanistischen Agents"
      onKeyDown={handleKeyDown}
    >
      <div className={styles.carouselControls}>
        <button
          type="button"
          className={styles.carouselArrow}
          onClick={goPrev}
          aria-label="Vorheriger Agent"
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M10 3 5 8l5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          className={styles.carouselArrow}
          onClick={goNext}
          aria-label="Nächster Agent"
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M6 3l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className={styles.carouselTrack}>
        <div className={styles.carouselSideSlot}>
          <AgentSide agent={prevAgent} onFocus={() => focusAgentAt(prevIndex)} />
        </div>

        <div className={styles.carouselFocusSlot} aria-live="polite">
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={focusAgent.serviceId}
              className={styles.carouselFocusPane}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: DURATION.slow, ease: EASE.outSmooth }}
            >
              <AgentFocus
                agent={focusAgent}
                onOpen={onOpenService}
                onMouseMove={onMouseMove}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.carouselSideSlot}>
          <AgentSide agent={nextAgent} onFocus={() => focusAgentAt(nextIndex)} />
        </div>
      </div>

      <div className={styles.carouselThumbs} role="list" aria-label="Agents">
        {productizedAgents.map((agent, index) => {
          const isFocused = agent.serviceId === focusAgent.serviceId;
          return (
            <button
              key={agent.serviceId}
              type="button"
              className={`${styles.carouselThumb} ${
                isFocused ? styles.carouselThumbActive : ""
              }`}
              onClick={() => handleThumbClick(index, agent.serviceId)}
              aria-current={isFocused ? "true" : undefined}
              aria-haspopup={isFocused ? "dialog" : undefined}
              aria-label={
                isFocused
                  ? `${agent.name} – Service öffnen`
                  : `${agent.name} in den Fokus holen`
              }
            >
              <img
                src={agent.posterSrc}
                alt=""
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
              />
              <span>{agent.name}</span>
            </button>
          );
        })}
      </div>
    </div>
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
          <div className={styles.sectionBrand}>
            <BrandMark tone="on-light" size="sm" decorative />
            <span className="eyebrow">Unsere suprahumanistischen Agents</span>
          </div>
          <h2 id="services-heading" className="display-md">
            Lernen Sie unsere Agenten kennen.
          </h2>
          <p className={styles.subline}>
            Fertige Agenten mit eigenem Job, eigener Persönlichkeit und klarem Output. Als wären
            sie Teil Ihres Teams.
          </p>
        </ScrollReveal>

        <AgentCarousel onOpenService={onOpenService} onMouseMove={handleMouseMove} />

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
