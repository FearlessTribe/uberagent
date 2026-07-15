import { type FormEvent, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ScrollReveal } from "./ScrollReveal";
import { CtaButton } from "./CtaButton";
import {
  trackPotentialCheckLead,
  trackPotentialCheckUrl,
} from "../lib/analytics";
import { fadeUpItem, resolveVariants, transitions } from "../motion";
import styles from "./PotentialCheck.module.css";

type Step = "url" | "contact" | "done";

function normalizeWebsite(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function PotentialCheck() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState<Step>("url");
  const [website, setWebsite] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const itemVariants = resolveVariants(reduce, fadeUpItem);

  const handleUrlSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const normalized = normalizeWebsite(website);
    if (!normalized) {
      setError("Bitte eine Website-URL eingeben.");
      return;
    }
    try {
      new URL(normalized);
    } catch {
      setError("Bitte eine gültige Website-URL eingeben.");
      return;
    }
    setWebsite(normalized);
    trackPotentialCheckUrl();
    setStep("contact");
  };

  const handleLeadSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/potential-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website, name, email, phone }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        throw new Error(data.error || "Etwas ist schiefgelaufen.");
      }
      trackPotentialCheckLead();
      setStep("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Etwas ist schiefgelaufen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="potential-check"
      className={`section ${styles.section}`}
      aria-labelledby="potential-heading"
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className="container">
        <ScrollReveal className={styles.card}>
          <div className={styles.copy}>
            <span className="eyebrow">AI-Potenzial-Check</span>
            <h2 id="potential-heading" className={styles.title}>
              In 30 Sekunden zu konkreten Automatisierungs-Ideen
            </h2>
            <p className={styles.sub}>
              Gib deine Website-URL ein und erhalte eine kostenlose Analyse mit
              konkreten AI-Automatisierungsideen — maßgeschneidert für dein
              Unternehmen.
            </p>
            <ul className={styles.perks} aria-label="Vorteile">
              <li>30-Sekunden Analyse</li>
              <li>10+ AI-Ideen</li>
              <li>100% kostenlos</li>
            </ul>
          </div>

          <div className={styles.panel}>
            <AnimatePresence mode="wait">
              {step === "url" && (
                <motion.form
                  key="url"
                  className={styles.form}
                  onSubmit={handleUrlSubmit}
                  variants={itemVariants}
                  initial={reduce ? false : "hidden"}
                  animate="visible"
                  exit={{ opacity: 0, y: -8, transition: transitions.fast }}
                >
                  <label className={styles.label} htmlFor="potential-url">
                    Website-URL
                  </label>
                  <div className={styles.row}>
                    <input
                      id="potential-url"
                      className={styles.input}
                      type="text"
                      inputMode="url"
                      autoComplete="url"
                      placeholder="www.dein-unternehmen.ch"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      required
                    />
                    <CtaButton size="md" surface="on-dark" type="submit">
                      Weiter
                    </CtaButton>
                  </div>
                  {error && <p className={styles.error} role="alert">{error}</p>}
                  <p className={styles.disclaimer}>
                    Wir nutzen deine Daten nur zur Kontaktaufnahme. Kein Spam.
                  </p>
                </motion.form>
              )}

              {step === "contact" && (
                <motion.form
                  key="contact"
                  className={styles.form}
                  onSubmit={handleLeadSubmit}
                  variants={itemVariants}
                  initial={reduce ? false : "hidden"}
                  animate="visible"
                  exit={{ opacity: 0, y: -8, transition: transitions.fast }}
                >
                  <p className={styles.stepEyebrow}>Fast geschafft</p>
                  <h3 className={styles.stepTitle}>
                    Wohin sollen wir deinen Report schicken?
                  </h3>
                  <p className={styles.siteChip}>{website.replace(/^https?:\/\//, "")}</p>

                  <label className={styles.label} htmlFor="potential-name">
                    Dein Name
                  </label>
                  <input
                    id="potential-name"
                    className={styles.input}
                    type="text"
                    autoComplete="name"
                    placeholder="Vor- und Nachname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />

                  <label className={styles.label} htmlFor="potential-email">
                    E-Mail-Adresse
                  </label>
                  <input
                    id="potential-email"
                    className={styles.input}
                    type="email"
                    autoComplete="email"
                    placeholder="name@firma.ch"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <label className={styles.label} htmlFor="potential-phone">
                    Telefonnummer
                  </label>
                  <input
                    id="potential-phone"
                    className={styles.input}
                    type="tel"
                    autoComplete="tel"
                    placeholder="+41 …"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />

                  {error && <p className={styles.error} role="alert">{error}</p>}

                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={styles.back}
                      onClick={() => {
                        setError(null);
                        setStep("url");
                      }}
                    >
                      Zurück
                    </button>
                    <CtaButton
                      size="md"
                      surface="on-dark"
                      type="submit"
                      fullWidth
                    >
                      {loading ? "Wird gesendet…" : "Analyse starten"}
                    </CtaButton>
                  </div>
                  <p className={styles.disclaimer}>
                    Wir nutzen deine Daten nur zur Kontaktaufnahme. Kein Spam.
                  </p>
                </motion.form>
              )}

              {step === "done" && (
                <motion.div
                  key="done"
                  className={styles.done}
                  variants={itemVariants}
                  initial={reduce ? false : "hidden"}
                  animate="visible"
                >
                  <span className={styles.doneMark} aria-hidden="true">
                    ✓
                  </span>
                  <h3 className={styles.stepTitle}>Anfrage erhalten</h3>
                  <p className={styles.doneText}>
                    Danke. Wir melden uns zeitnah mit deinem AI-Potenzial-Report.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
