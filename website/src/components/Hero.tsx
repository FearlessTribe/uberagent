import { useEffect, useRef } from "react";
import { SmokeBackground } from "@/components/ui/spooky-smoke-animation";
import { CtaButton } from "./CtaButton";
import { scrollToSection } from "../hooks/useScrollReveal";
import styles from "./Hero.module.css";

const featureCards = [
  { num: "01", title: "MCP Integration", description: "Sichere System-Anbindung" },
  { num: "02", title: "AI Workflow Agents", description: "Agenten die handeln" },
  { num: "03", title: "GTM Engineering", description: "Signal-Logik & Outreach" },
];

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add("hero-active");
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const handleScroll = () => {
      const y = window.scrollY;
      if (y > 80) {
        document.body.classList.remove("hero-active");
      } else {
        document.body.classList.add("hero-active");
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${y * 0.06}px)`;
        contentRef.current.style.opacity = `${Math.max(0, 1 - y / 900)}`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.classList.remove("hero-active");
    };
  }, []);

  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.smokeLayer} aria-hidden="true">
        <SmokeBackground />
      </div>
      <div className={styles.bgOverlay} aria-hidden="true" />
      <div className={styles.bottomFade} aria-hidden="true" />

      <div className={`container ${styles.layout}`} ref={contentRef}>
        <div className={styles.heroHeader}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} aria-hidden="true" />
            Production-Ready AI Engineering
          </div>

          <h1 id="hero-heading" className={styles.headline}>
            AI Engineering für{" "}
            <span className={styles.headlineAccent}>operative Exzellenz</span>
          </h1>
        </div>

        <div className={styles.heroGrid}>
          <div className={styles.heroLeft}>
            <p className={styles.subline}>
              Wir bauen AI-Agenten, Workflow-Automations, MCP-Integrationen und
              GTM- &amp; Sales-Systeme, die in Ihrem Stack produktiv laufen.
            </p>

            <div className={styles.actions}>
              <CtaButton
                size="md"
                surface="on-dark"
                onClick={() => scrollToSection("contact")}
              >
                Erstgespräch vereinbaren
              </CtaButton>
              <CtaButton
                size="md"
                surface="on-dark-ghost"
                onClick={() => scrollToSection("services")}
              >
                Services entdecken
              </CtaButton>
            </div>
          </div>

          <div className={styles.featureCards} aria-label="Kernleistungen">
            {featureCards.map((card, i) => (
              <div
                key={card.title}
                className={styles.featureCard}
                style={{ animationDelay: `${0.45 + i * 0.1}s` }}
              >
                <div className={styles.featureGlow} aria-hidden="true" />
                <div className={styles.featureContent}>
                  <h3 className={styles.featureTitle}>
                    <span className={styles.featureNum} aria-hidden="true">{card.num}</span>
                    {card.title}
                  </h3>
                  <p className={styles.featureDesc}>{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
