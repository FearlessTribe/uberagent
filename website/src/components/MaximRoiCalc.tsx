import { type FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CtaButton } from "./CtaButton";
import { MAXIM_ROI_DEFAULTS } from "../data/maximCalc";
import { trackKalkulationsCheckLead, trackKalkulationsCheckStep } from "../lib/analytics";
import { getApiBase } from "../lib/api";
import { DURATION, EASE, STAGGER, transitions } from "../motion";
import styles from "./MaximRoiCalc.module.css";

type IntroMetricKey = "requestsPerDay" | "minutesPerQuote";

type MetricKey = IntroMetricKey | "workDays" | "hourlyRate" | "extraOrdersWeek" | "marginPerOrder";

type StepId = "contact" | MetricKey | "results" | "done";

type MetricStepConfig = {
  id: MetricKey;
  label: string;
  hint: string;
  min: number;
  suffix?: string;
  placeholder?: string;
};

const INTRO_METRIC_STEPS: MetricStepConfig[] = [
  {
    id: "requestsPerDay",
    label: "Wie viele Angebotsanfragen bekommen Sie pro Tag?",
    hint: "Zählen Sie alles mit: Telefon, E-Mail, WhatsApp und Walk-in.",
    min: 1,
    placeholder: "z. B. 15",
  },
  {
    id: "minutesPerQuote",
    label: "Wie lange dauert ein Angebot realistisch?",
    hint: "Inklusive Teile suchen, Nachrechnen und Versand.",
    min: 1,
    suffix: "Min.",
    placeholder: "z. B. 10",
  },
];

const METRIC_STEPS: MetricStepConfig[] = [
  {
    id: "workDays",
    label: "Wie viele Arbeitstage haben Sie im Jahr?",
    hint: "Ohne Urlaub und Feiertage, typisch sind 220 Tage.",
    min: 1,
    suffix: "Tage",
    placeholder: "z. B. 220",
  },
  {
    id: "hourlyRate",
    label: "Was ist der Wert Ihrer Stunde?",
    hint: "Kalkulierter Stundensatz inklusive Gemeinkosten, konservativ rechnen.",
    min: 1,
    suffix: "€",
    placeholder: "z. B. 75",
  },
  {
    id: "extraOrdersWeek",
    label: "Wie viele Extra-Aufträge pro Woche sind realistisch?",
    hint: "Durch schnellere Preise, die sonst an den Wettbewerb gehen.",
    min: 1,
    placeholder: "z. B. 2",
  },
  {
    id: "marginPerOrder",
    label: "Welcher Deckungsbeitrag pro Auftrag?",
    hint: "Was bleibt nach Material und Fremdleistung übrig?",
    min: 1,
    suffix: "€",
    placeholder: "z. B. 385",
  },
];

const ALL_METRIC_STEPS = [...INTRO_METRIC_STEPS, ...METRIC_STEPS];

type MetricsState = {
  requestsPerDay: number;
  minutesPerQuote: number;
  workDays: number;
  hourlyRate: number;
  extraOrdersWeek: number;
  marginPerOrder: number;
};

const STEP_ORDER: StepId[] = [
  ...INTRO_METRIC_STEPS.map((s) => s.id),
  "contact",
  ...METRIC_STEPS.map((s) => s.id),
  "results",
  "done",
];

function normalizeWebsite(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function formatEuro(value: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatHours(value: number) {
  return `${new Intl.NumberFormat("de-DE", {
    maximumFractionDigits: 1,
  }).format(value)} Std.`;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function computeHoursDay(requestsPerDay: number, minutesPerQuote: number) {
  return (requestsPerDay * minutesPerQuote) / 60;
}

export function MaximRoiCalc() {
  const reduce = useReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [consent, setConsent] = useState(false);
  const [pageId, setPageId] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<MetricsState>({ ...MAXIM_ROI_DEFAULTS });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const metricsSaved = useRef(false);

  const step = STEP_ORDER[stepIndex];
  const progress = ((stepIndex + 1) / (STEP_ORDER.length - 1)) * 100;

  const computed = useMemo(() => {
    const hoursDay = computeHoursDay(metrics.requestsPerDay, metrics.minutesPerQuote);
    const hoursYear = hoursDay * metrics.workDays;
    const timeValue = hoursYear * metrics.hourlyRate;
    const extraContribution = metrics.extraOrdersWeek * 52 * metrics.marginPerOrder;
    const total = timeValue + extraContribution;

    return { hoursDay, hoursYear, timeValue, extraContribution, total };
  }, [metrics]);

  const goNext = () => {
    setError(null);
    setStepIndex((i) => Math.min(i + 1, STEP_ORDER.length - 1));
  };

  const goBack = () => {
    setError(null);
    setStepIndex((i) => Math.max(i - 1, 0));
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

    const normalizedWebsite = normalizeWebsite(website);
    if (normalizedWebsite) {
      try {
        new URL(normalizedWebsite);
      } catch {
        setError("Bitte eine gültige Website-URL angeben.");
        return;
      }
    }

    setLoading(true);
    try {
      const res = await fetch(`${getApiBase()}/api/kalkulations-check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage: "contact",
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          website: normalizedWebsite || undefined,
          consent: true,
          requestsPerDay: metrics.requestsPerDay,
          minutesPerQuote: metrics.minutesPerQuote,
          hoursDay: computed.hoursDay,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        pageId?: string;
      };
      if (!res.ok) {
        throw new Error(data.error || "Etwas ist schiefgelaufen.");
      }
      if (data.pageId) setPageId(data.pageId);
      trackKalkulationsCheckStep("contact");
      goNext();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Etwas ist schiefgelaufen.");
    } finally {
      setLoading(false);
    }
  };

  const handleMetricNext = () => {
    const metric = ALL_METRIC_STEPS.find((m) => m.id === step);
    if (metric) {
      const value = metrics[metric.id];
      if (!Number.isFinite(value) || value < metric.min) {
        setError("Bitte einen Wert größer als 0 eingeben.");
        return;
      }
      trackKalkulationsCheckStep(metric.id);
    }
    goNext();
  };

  const saveMetrics = useCallback(async () => {
    if (!pageId || metricsSaved.current) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${getApiBase()}/api/kalkulations-check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage: "complete",
          pageId,
          ...metrics,
          hoursDay: computed.hoursDay,
          hoursYear: computed.hoursYear,
          timeValue: computed.timeValue,
          extraContribution: computed.extraContribution,
          total: computed.total,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        throw new Error(data.error || "Etwas ist schiefgelaufen.");
      }
      metricsSaved.current = true;
      trackKalkulationsCheckLead();
      setStepIndex(STEP_ORDER.indexOf("done"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Etwas ist schiefgelaufen.");
    } finally {
      setLoading(false);
    }
  }, [computed, metrics, pageId]);

  useEffect(() => {
    if (step === "results" && pageId && !metricsSaved.current) {
      void saveMetrics();
    }
  }, [pageId, saveMetrics, step]);

  const activeMetric = ALL_METRIC_STEPS.find((m) => m.id === step);
  const metricValue = activeMetric ? metrics[activeMetric.id] : 0;

  return (
    <div className={styles.wrap} id="kalkulations-check">
      <div className={styles.progress} aria-hidden="true">
        <span className={styles.progressBar} style={{ width: `${Math.min(progress, 100)}%` }} />
      </div>
      <p className={styles.progressMeta}>
        Schritt {Math.min(stepIndex + 1, STEP_ORDER.length - 1)} von {STEP_ORDER.length - 1}
      </p>

      <AnimatePresence mode="wait">
        {activeMetric && (
          <motion.div
            key={activeMetric.id}
            className={styles.panel}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: transitions.fast }}
            transition={{ duration: DURATION.normal, ease: EASE.outSmooth }}
          >
            <h3 className={styles.stepTitle}>{activeMetric.label}</h3>
            <p className={styles.stepLead}>{activeMetric.hint}</p>

            {activeMetric.id === "minutesPerQuote" && (
              <p className={styles.stepSummary}>
                Das sind aktuell{" "}
                <strong>{formatHours(computed.hoursDay)} pro Tag</strong> für Angebote.
              </p>
            )}

            <label className={styles.field}>
              <span className={styles.textLabel}>Ihr Wert</span>
              <div className={styles.numberInputWrap}>
                <input
                  id={`maxim-metric-${activeMetric.id}`}
                  className={styles.textInput}
                  type="number"
                  inputMode="numeric"
                  min={activeMetric.min}
                  step={1}
                  placeholder={activeMetric.placeholder}
                  value={metricValue || ""}
                  onChange={(e) => {
                    setError(null);
                    setMetrics((prev) => ({
                      ...prev,
                      [activeMetric.id]: Number(e.target.value),
                    }));
                  }}
                />
                {activeMetric.suffix ? (
                  <span className={styles.numberSuffix} aria-hidden="true">
                    {activeMetric.suffix}
                  </span>
                ) : null}
              </div>
            </label>

            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}

            <div className={styles.actions}>
              {stepIndex > 0 ? (
                <button type="button" className={styles.back} onClick={goBack}>
                  Zurück
                </button>
              ) : null}
              <CtaButton
                size="md"
                surface="accent"
                type="button"
                onClick={handleMetricNext}
                fullWidth={stepIndex === 0}
              >
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
              Damit wir Ihnen die Auswertung zusenden können. Danach geht es mit den restlichen
              Zahlen weiter.
            </p>
            <p className={styles.stepSummary}>
              Bisher: <strong>{metrics.requestsPerDay} Anfragen</strong>{" "}
              à <strong>{metrics.minutesPerQuote} Min.</strong> ={" "}
              <strong>{formatHours(computed.hoursDay)} / Tag</strong>
            </p>

            <label className={styles.textLabel} htmlFor="maxim-check-name">
              Name *
            </label>
            <input
              id="maxim-check-name"
              className={styles.textInput}
              type="text"
              autoComplete="name"
              placeholder="Vor- und Nachname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label className={styles.textLabel} htmlFor="maxim-check-email">
              E-Mail-Adresse *
            </label>
            <input
              id="maxim-check-email"
              className={styles.textInput}
              type="email"
              autoComplete="email"
              placeholder="name@firma.ch"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className={styles.textLabel} htmlFor="maxim-check-phone">
              Telefonnummer *
            </label>
            <input
              id="maxim-check-phone"
              className={styles.textInput}
              type="tel"
              autoComplete="tel"
              placeholder="+41 …"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <label className={styles.textLabel} htmlFor="maxim-check-website">
              Website <span className={styles.optional}>(optional)</span>
            </label>
            <input
              id="maxim-check-website"
              className={styles.textInput}
              type="url"
              autoComplete="url"
              placeholder="www.firma.ch"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
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
                Kalkulationscheck kontaktiert und meine Angaben dafür speichert. *
              </span>
            </label>

            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}

            <div className={styles.actions}>
              <button type="button" className={styles.back} onClick={goBack}>
                Zurück
              </button>
              <CtaButton size="md" surface="accent" type="submit" fullWidth>
                {loading ? "Wird gespeichert…" : "Weiter zu den Metriken"}
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
            exit={{ opacity: 0, y: -8, transition: transitions.fast }}
            transition={{ duration: DURATION.normal, ease: EASE.outSmooth }}
          >
            <h3 className={styles.stepTitle}>So viel liegt bei Ihren Werten drin</h3>
            <p className={styles.stepLead}>
              Grobe Schätzung auf Basis Ihrer Angaben. Wir besprechen die Details persönlich mit
              Ihnen.
            </p>

            {loading ? (
              <p className={styles.stepLead}>Auswertung wird gespeichert…</p>
            ) : (
              <div className={styles.results}>
                {[
                  { label: "Stunden pro Jahr", value: formatHours(computed.hoursYear) },
                  { label: "Zeitwert pro Jahr", value: formatEuro(computed.timeValue), accent: true },
                  {
                    label: "Extra Deckungsbeitrag",
                    value: formatEuro(computed.extraContribution),
                    hint: "durch schnellere Angebote",
                  },
                  { label: "Nutzen gesamt / Jahr", value: formatEuro(computed.total) },
                ].map((result, index) => (
                  <div
                    key={result.label}
                    className={`${styles.resultCard} ${result.accent ? styles.resultAccent : ""}`}
                  >
                    <span className={styles.resultLabel}>{result.label}</span>
                    <motion.span
                      key={result.value}
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
            )}

            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}

            {error && (
              <div className={styles.actions}>
                <button type="button" className={styles.back} onClick={goBack}>
                  Zurück
                </button>
                <CtaButton size="md" surface="accent" type="button" onClick={saveMetrics} fullWidth>
                  Erneut speichern
                </CtaButton>
              </div>
            )}
          </motion.div>
        )}

        {step === "done" && (
          <motion.div
            key="done"
            className={`${styles.panel} ${styles.donePanel}`}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.normal, ease: EASE.outSmooth }}
          >
            <span className={styles.doneMark} aria-hidden="true">
              ✓
            </span>
            <h3 className={styles.stepTitle}>Anfrage erhalten</h3>
            <p className={styles.stepLead}>
              Danke, {name.split(" ")[0] || "gut"}. Wir melden uns zeitnah mit Ihrer persönlichen
              Auswertung und besprechen, ob Maxim für Ihren Betrieb passt.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
