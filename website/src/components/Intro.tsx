import { ScrollReveal } from "./ScrollReveal";
import styles from "./Intro.module.css";

export function Intro() {
  return (
    <section className={`section ${styles.intro}`} aria-labelledby="intro-heading">
      <div className={styles.gradientBg} aria-hidden="true" />
      <div className="container">
        <ScrollReveal className="sectionStart">
          <span className="eyebrow">About überagent.com</span>
        </ScrollReveal>

        <ScrollReveal className={styles.content}>
          <h2 id="intro-heading" className={`display-md ${styles.headline}`}>
            AI Agents, die Wachstum entfesseln und Umsatz erhöhen.
          </h2>

          <p className={styles.tagline}>
            Führende Agentur für GTM Sales Agents, agentische
            Workflow-Automatisierung &amp; End-to-End-MCP-Implementierung
          </p>

          <p className={`body-lg ${styles.text}`}>
            Für Ihr Unternehmen: Weniger manuelle Arbeit, bessere Datenflüsse
            und schnellere Umsetzung. Von Workflow-Automation über sichere
            Tool-Anbindung bis zu AI GTM Engineering mit klaren Guardrails und
            messbaren Ergebnissen.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
