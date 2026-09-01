import { type FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CtaButton } from "./CtaButton";
import { trackHelenaCheckLead } from "../lib/analytics";
import { getApiBase } from "../lib/api";
import { DURATION, EASE, STAGGER, transitions } from "../motion";
import styles from "./GiftingRevenueCalc.module.css";

type Step = "metrics" | "contact" | "results";

function formatEuro(value: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatInt(value: number) {
  return new Intl.NumberFormat("de-DE").format(value);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function GiftingRevenueCalc() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState<Step>("metrics");
  const [customers, setCustomers] = useState(550);
  const [contactsPerCustomer, setContactsPerCustomer] = useState(500);
  const [occasions, setOccasions] = useState(8);
  const [avgValue, setAvgValue] = useState(40);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const computed = useMemo(() => {
    const recipients = customers * contactsPerCustomer;
    const giftsYear = recipients * occasions;
    const volumeYear = giftsYear * avgValue;
    return { recipients, giftsYear, volumeYear };
  }, [avgValue, contactsPerCustomer, customers, occasions]);

  const handleMetricsNext = () => {
    setError(null);
    if (
      !Number.isFinite(customers) ||
      customers <= 0 ||
      !Number.isFinite(contactsPerCustomer) ||
      contactsPerCustomer <= 0 ||
      !Number.isFinite(occasions) ||
      occasions <= 0 ||
      !Number.isFinite(avgValue) ||
      avgValue <= 0
    ) {
      setError("Bitte alle Werte größer als 0 eingeben.");
      return;
    }
    setStep("contact");
  };

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Name, E-Mail und Telefon sind erforderlich.");
      return;
    }
    if (!isValidEmail(email.trim())) {
      setError("Bitte eine gültige E-Mail angeben.");
      return;
    }
    if (!consent) {
      setError("Bitte bestätigen Sie, dass wir Sie kontaktieren dürfen.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${getApiBase()}/api/helena-check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          consent: true,
          customers,
          contactsPerCustomer,
          occasions,
          avgValue,
          recipients: computed.recipients,
          giftsYear: computed.giftsYear,
          volumeYear: computed.volumeYear,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        throw new Error(data.error || "Etwas ist schiefgelaufen.");
      }
      trackHelenaCheckLead();
      setStep("results");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Etwas ist schiefgelaufen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrap} id="helena-check">
      <AnimatePresence mode="wait">
        {step === "metrics" && (
          <motion.div
            key="metrics"
            className={styles.panel}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: transitions.fast }}
            transition={{ duration: DURATION.normal, ease: EASE.outSmooth }}
          >
            <label className={styles.field}>
              <span className={styles.textLabel}>Ihre Kunden (HubSpot-Accounts)</span>
              <input
                className={styles.textInput}
                type="number"
                inputMode="numeric"
                min={1}
                step={1}
                value={customers || ""}
                onChange={(e) => setCustomers(Number(e.target.value))}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.textLabel}>Ø Kunden ihrer Kunden</span>
              <input
                className={styles.textInput}
                type="number"
                inputMode="numeric"
                min={1}
                step={1}
                value={contactsPerCustomer || ""}
                onChange={(e) => setContactsPerCustomer(Number(e.target.value))}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.textLabel}>Anlässe pro Empfänger und Jahr</span>
              <input
                className={styles.textInput}
                type="number"
                inputMode="numeric"
                min={1}
                step={1}
                value={occasions || ""}
                onChange={(e) => setOccasions(Number(e.target.value))}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.textLabel}>Durchschnittswert pro Geschenk</span>
              <div className={styles.numberInputWrap}>
                <input
                  className={styles.textInput}
                  type="number"
                  inputMode="numeric"
                  min={1}
                  step={1}
                  value={avgValue || ""}
                  onChange={(e) => setAvgValue(Number(e.target.value))}
                />
                <span className={styles.numberSuffix} aria-hidden="true">
                  €
                </span>
              </div>
            </label>
            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}
            <div className={styles.actions}>
              <CtaButton size="md" surface="accent" type="button" onClick={handleMetricsNext} fullWidth>
                Weiter
              </CtaButton>
            </div>
          </motion.div>
        )}

        {step === "contact" && (
          <motion.form
            key="contact"
            className={styles.panel}
            onSubmit={handleContactSubmit}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: transitions.fast }}
            transition={{ duration: DURATION.normal, ease: EASE.outSmooth }}
          >
            <h3 className={styles.stepTitle}>Ihre Kontaktdaten</h3>
            <p className={styles.stepLead}>
              E-Mail und Telefon, damit wir Ihnen die Auswertung zusenden können.
            </p>
            <label className={styles.textLabel} htmlFor="helena-check-name">
              Name *
            </label>
            <input
              id="helena-check-name"
              className={styles.textInput}
              type="text"
              autoComplete="name"
              placeholder="Vor- und Nachname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label className={styles.textLabel} htmlFor="helena-check-email">
              E-Mail-Adresse *
            </label>
            <input
              id="helena-check-email"
              className={styles.textInput}
              type="email"
              autoComplete="email"
              placeholder="name@firma.de"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className={styles.textLabel} htmlFor="helena-check-phone">
              Telefonnummer *
            </label>
            <input
              id="helena-check-phone"
              className={styles.textInput}
              type="tel"
              autoComplete="tel"
              placeholder="+49 …"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <label className={styles.consent}>
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
              />
              <span>
                Ich bin einverstanden, dass überagent mich per E-Mail oder Telefon zum
                kostenlosen Check kontaktiert und meine Angaben dafür speichert. *
              </span>
            </label>
            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}
            <div className={styles.actions}>
              <button type="button" className={styles.back} onClick={() => setStep("metrics")}>
                Zurück
              </button>
              <CtaButton size="md" surface="accent" type="submit" fullWidth>
                {loading ? "Wird gespeichert…" : "Ergebnis anzeigen"}
              </CtaButton>
            </div>
          </motion.form>
        )}

        {step === "results" && (
          <motion.div
            key="results"
            className={styles.panel}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.normal, ease: EASE.outSmooth }}
          >
            <h3 className={styles.stepTitle}>So viel liegt bei Ihren Werten drin</h3>
            <p className={styles.stepLead}>
              Grobe Schätzung auf Basis Ihrer Angaben. Wir besprechen die Details persönlich.
            </p>
            <div className={styles.results}>
              {[
                { label: "Empfänger gesamt", value: formatInt(computed.recipients) },
                { label: "Geschenke / Jahr", value: formatInt(computed.giftsYear) },
                {
                  label: "Warenwert / Jahr",
                  value: formatEuro(computed.volumeYear),
                  hint: "Aufträge aus Ihrem Sortiment",
                  accent: true,
                },
              ].map((result, index) => (
                <div
                  key={result.label}
                  className={`${styles.resultCard} ${result.accent ? styles.resultAccent : ""}`}
                >
                  <span className={styles.resultLabel}>{result.label}</span>
                  <motion.span
                    className={styles.resultValue}
                    initial={reduce ? false : { opacity: 0.55, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: DURATION.fast,
                      ease: EASE.outSmooth,
                      delay: reduce ? 0 : index * STAGGER.section * 0.4,
                    }}
                  >
                    {result.value}
                  </motion.span>
                  {"hint" in result && result.hint ? (
                    <span className={styles.resultHint}>{result.hint}</span>
                  ) : null}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
