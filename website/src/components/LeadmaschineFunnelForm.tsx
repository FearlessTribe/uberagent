import { useEffect, useState, type FormEvent } from "react";
import { CALENDLY_URL, trackEvent, trackTerminClick } from "../lib/analytics";
import {
  getLeadmaschineCopy,
  LEADMASCHINE_CALENDLY,
} from "../data/leadmaschineContent";
import type { LeadmaschineRegion } from "../hooks/useLeadmaschineRoute";
import { CtaButton } from "./CtaButton";
import styles from "./LeadmaschineFunnelForm.module.css";

interface LeadmaschineFunnelFormProps {
  region: LeadmaschineRegion;
  onStepChange?: (step: 1 | 2) => void;
}

type FormState = {
  name: string;
  company: string;
  email: string;
  country: string;
  segment: string;
  sources: string[];
  budget: string;
  phone: string;
  website: string;
  social: string;
  notes: string;
  privacy: boolean;
  newsletter: boolean;
};

const SOURCE_WEBSITE = "Website-Formular";
const SOURCE_SOCIAL = "Social Media";

function defaultsFor(region: LeadmaschineRegion): FormState {
  const copy = getLeadmaschineCopy(region);
  return {
    name: "",
    company: "",
    email: "",
    country: copy.form.countries[0],
    segment: copy.form.segments[0],
    sources: [],
    budget: "",
    phone: "",
    website: "",
    social: "",
    notes: "",
    privacy: false,
    newsletter: false,
  };
}

function looksLikeUrl(value: string) {
  const v = value.trim();
  if (!v) return false;
  return /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i.test(v);
}

function calendlyEmbedUrl(data: FormState) {
  const base = LEADMASCHINE_CALENDLY || CALENDLY_URL;
  const extras = [
    data.phone ? `Tel: ${data.phone}` : null,
    data.website ? `Website: ${data.website}` : null,
    data.social ? `Social: ${data.social}` : null,
    data.notes ? `Hinweis: ${data.notes.slice(0, 100)}` : null,
  ]
    .filter(Boolean)
    .join(" · ");
  const params = new URLSearchParams({
    name: data.name,
    email: data.email,
    a1: data.company,
    a2: `${data.country} · ${data.segment}`,
    a3: `Quellen: ${data.sources.join(", ") || "-"} · Budget: ${data.budget}${
      extras ? ` · ${extras}` : ""
    }`,
  });
  return `${base}?${params.toString()}`;
}

export function LeadmaschineFunnelForm({
  region,
  onStepChange,
}: LeadmaschineFunnelFormProps) {
  const copy = getLeadmaschineCopy(region);
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<FormState>(() => defaultsFor(region));
  const [error, setError] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  const needsWebsite = form.sources.includes(SOURCE_WEBSITE);
  const needsSocial = form.sources.includes(SOURCE_SOCIAL);

  useEffect(() => {
    const next = getLeadmaschineCopy(region);
    setForm((prev) => ({
      ...prev,
      country: next.form.countries[0],
      segment: next.form.segments[0],
      sources: prev.sources.filter((s) => next.form.sourceOptions.includes(s)),
    }));
  }, [region]);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleSource = (value: string) => {
    setForm((prev) => {
      const has = prev.sources.includes(value);
      const sources = has
        ? prev.sources.filter((s) => s !== value)
        : [...prev.sources, value];
      return {
        ...prev,
        sources,
        website: sources.includes(SOURCE_WEBSITE) ? prev.website : "",
        social: sources.includes(SOURCE_SOCIAL) ? prev.social : "",
      };
    });
  };

  const goStep2 = (e: FormEvent) => {
    e.preventDefault();
    if (
      !form.name.trim() ||
      !form.company.trim() ||
      !form.email.trim() ||
      !form.country ||
      !form.segment ||
      form.sources.length === 0 ||
      !form.budget ||
      !form.phone.trim() ||
      !form.privacy
    ) {
      setError(
        "Bitte füllen Sie alle Pflichtfelder aus und bestätigen Sie die Datenschutz-Einwilligung.",
      );
      return;
    }
    if (needsWebsite && !looksLikeUrl(form.website)) {
      setError("Bitte geben Sie Ihre Website-URL an.");
      return;
    }
    if (needsSocial && !looksLikeUrl(form.social)) {
      setError("Bitte geben Sie den Link zu Ihrem Social-Media-Profil an.");
      return;
    }
    setError(null);
    trackEvent("form_step1_complete", {
      country: form.country,
      segment: form.segment,
      variant: region,
    });
    setStep(2);
    onStepChange?.(2);
    trackTerminClick("leadmaschine_form", {
      linkUrl: LEADMASCHINE_CALENDLY,
    });
  };

  if (step === 2) {
    return (
      <div className={styles.wrap} id="funnel-check">
        <div className={styles.stepBanner}>
          <p className={styles.micro}>
            Angaben gespeichert. Wählen Sie einen 30-Minuten-Slot, Video ist
            Standard.
          </p>
          <p className={styles.summary}>
            {form.name} · {form.company} · {form.country}
          </p>
        </div>
        <div className={styles.calendly}>
          <iframe
            title="Funnel-Check Terminwahl"
            src={calendlyEmbedUrl(form)}
            loading="lazy"
          />
        </div>
        <button
          type="button"
          className={styles.back}
          onClick={() => {
            setStep(1);
            onStepChange?.(1);
          }}
        >
          Angaben ändern
        </button>
      </div>
    );
  }

  return (
    <form className={styles.wrap} id="funnel-check" onSubmit={goStep2} noValidate>
      <p className={styles.micro}>{copy.form.micro}</p>

      <div className={styles.grid}>
        <label className={styles.field}>
          <span>{copy.form.fields.name} *</span>
          <input
            name="name"
            autoComplete="name"
            required
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            onFocus={() => {
              if (started) return;
              setStarted(true);
              trackEvent("form_start", { variant: region });
            }}
          />
        </label>
        <label className={styles.field}>
          <span>{copy.form.fields.company} *</span>
          <input
            name="company"
            autoComplete="organization"
            required
            value={form.company}
            onChange={(e) => setField("company", e.target.value)}
          />
        </label>
        <label className={styles.field}>
          <span>{copy.form.fields.email} *</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            required
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
          />
        </label>
        <label className={styles.field}>
          <span>{copy.form.fields.phone} *</span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            required
            value={form.phone}
            onChange={(e) => setField("phone", e.target.value)}
          />
        </label>
        <label className={styles.field}>
          <span>{copy.form.fields.country} *</span>
          <select
            required
            value={form.country}
            onChange={(e) => setField("country", e.target.value)}
          >
            {copy.form.countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          <span>{copy.form.fields.segment} *</span>
          <select
            required
            value={form.segment}
            onChange={(e) => setField("segment", e.target.value)}
          >
            {copy.form.segments.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset className={styles.fieldset}>
        <legend>{copy.form.fields.sources} *</legend>
        <div className={styles.chips}>
          {copy.form.sourceOptions.map((opt) => {
            const on = form.sources.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                className={`${styles.chip} ${on ? styles.chipOn : ""}`}
                aria-pressed={on}
                onClick={() => toggleSource(opt)}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </fieldset>

      {(needsWebsite || needsSocial) && (
        <div className={styles.grid}>
          {needsWebsite && (
            <label className={`${styles.field} ${styles.span2}`}>
              <span>{copy.form.fields.website} *</span>
              <input
                type="url"
                name="website"
                inputMode="url"
                autoComplete="url"
                placeholder="https://"
                required
                value={form.website}
                onChange={(e) => setField("website", e.target.value)}
              />
            </label>
          )}
          {needsSocial && (
            <label className={`${styles.field} ${styles.span2}`}>
              <span>{copy.form.fields.social} *</span>
              <input
                type="url"
                name="social"
                inputMode="url"
                placeholder="https://instagram.com/…"
                required
                value={form.social}
                onChange={(e) => setField("social", e.target.value)}
              />
            </label>
          )}
        </div>
      )}

      <fieldset className={styles.fieldset}>
        <legend>{copy.form.fields.budget} *</legend>
        <div className={styles.chips}>
          {copy.form.budgetOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              className={`${styles.chip} ${form.budget === opt ? styles.chipOn : ""}`}
              aria-pressed={form.budget === opt}
              onClick={() => setField("budget", opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </fieldset>

      <label className={`${styles.field} ${styles.span2}`}>
        <span>{copy.form.fields.notes}</span>
        <textarea
          rows={3}
          value={form.notes}
          onChange={(e) => setField("notes", e.target.value)}
        />
      </label>

      <label className={styles.check}>
        <input
          type="checkbox"
          checked={form.privacy}
          onChange={(e) => setField("privacy", e.target.checked)}
          required
        />
        <span>
          {copy.form.fields.privacy}{" "}
          <a href="/#impressum" target="_blank" rel="noreferrer">
            Datenschutz
          </a>
        </span>
      </label>
      <label className={styles.check}>
        <input
          type="checkbox"
          checked={form.newsletter}
          onChange={(e) => setField("newsletter", e.target.checked)}
        />
        <span>{copy.form.fields.newsletter}</span>
      </label>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.submitRow}>
        <CtaButton type="submit" surface="accent" size="lg" showCalendar>
          {copy.form.next}
        </CtaButton>
        <p className={styles.submitHint}>
          Danach wählen Sie den Termin im Kalender.
        </p>
      </div>
    </form>
  );
}
