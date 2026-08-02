import { type FormEvent, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CtaButton } from "./CtaButton";
import { trackStrategyGuideDownload } from "../lib/analytics";
import { getApiBase } from "../lib/api";
import { fadeUpItem, resolveVariants, transitions } from "../motion";
import styles from "./StrategyGuideDownload.module.css";

const PDF_URL = "/guides/ai-strategy-implementation-management.pdf";
const PDF_FILENAME = "AI Strategy & Implementation Management.pdf";
const PREVIEW_URL = "/guides/ai-strategy-implementation-management.png";

function triggerPdfDownload() {
  const link = document.createElement("a");
  link.href = PDF_URL;
  link.download = PDF_FILENAME;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function StrategyGuideDownload() {
  const reduce = useReducedMotion();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const itemVariants = resolveVariants(reduce, fadeUpItem);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${getApiBase()}/api/strategy-guide`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, title, company, email, phone }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        throw new Error(data.error || "Etwas ist schiefgelaufen.");
      }
      trackStrategyGuideDownload();
      triggerPdfDownload();
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Etwas ist schiefgelaufen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className={styles.card} aria-labelledby="strategy-guide-heading">
      <div className={styles.promo}>
        <div className={styles.previewWrap} aria-hidden="true">
          <img
            className={styles.preview}
            src={PREVIEW_URL}
            alt=""
            width={640}
            height={360}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>Entscheidungs-Handout · Gratis</span>
          <h3 id="strategy-guide-heading" className={styles.title}>
            Der One-Pager für eure nächste AI-Portfolio-Entscheidung
          </h3>
          <p className={styles.lead}>
            Von Ideen-Chaos zur priorisierten AI Strategy und Roadmap — als kompaktes
            Handout fürs Leadership-Meeting, nicht als weitere Folien-Lawine.
          </p>
          <p className={styles.hook}>Nicht scrollen — mitnehmen und priorisieren.</p>
          <ul className={styles.perks} aria-label="Inhalt">
            <li>Scoring-Heatmap</li>
            <li>Build / Buy / Kill</li>
            <li>Stage-Gates</li>
          </ul>
        </div>
      </div>

      <div className={styles.panel}>
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.form
              key="form"
              className={styles.form}
              onSubmit={handleSubmit}
              variants={itemVariants}
              initial={reduce ? false : "hidden"}
              animate="visible"
              exit={{ opacity: 0, y: -8, transition: transitions.fast }}
            >
              <p className={styles.formEyebrow}>Jetzt gratis downloaden</p>

              <label className={styles.label} htmlFor="strategy-guide-name">
                Name
              </label>
              <input
                id="strategy-guide-name"
                className={styles.input}
                type="text"
                autoComplete="name"
                placeholder="Vor- und Nachname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label className={styles.label} htmlFor="strategy-guide-title">
                Titel
              </label>
              <input
                id="strategy-guide-title"
                className={styles.input}
                type="text"
                autoComplete="organization-title"
                placeholder="z. B. Head of Digital"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <label className={styles.label} htmlFor="strategy-guide-company">
                Firma
              </label>
              <input
                id="strategy-guide-company"
                className={styles.input}
                type="text"
                autoComplete="organization"
                placeholder="Unternehmen"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />

              <label className={styles.label} htmlFor="strategy-guide-email">
                E-Mail
              </label>
              <input
                id="strategy-guide-email"
                className={styles.input}
                type="email"
                autoComplete="email"
                placeholder="name@firma.ch"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label className={styles.label} htmlFor="strategy-guide-phone">
                Telefon
              </label>
              <input
                id="strategy-guide-phone"
                className={styles.input}
                type="tel"
                autoComplete="tel"
                placeholder="+41 …"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

              {error && (
                <p className={styles.error} role="alert">
                  {error}
                </p>
              )}

              <CtaButton size="md" surface="on-dark" type="submit" fullWidth>
                {loading ? "Wird vorbereitet…" : "One-Pager holen"}
              </CtaButton>
              <p className={styles.disclaimer}>
                Wir nutzen deine Daten nur zur Kontaktaufnahme. Kein Spam.
              </p>
            </motion.form>
          ) : (
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
              <h4 className={styles.doneTitle}>Download gestartet</h4>
              <p className={styles.doneText}>
                Dein One-Pager wird heruntergeladen. Falls nicht,{" "}
                <a href={PDF_URL} download={PDF_FILENAME}>
                  hier erneut laden
                </a>
                .
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
