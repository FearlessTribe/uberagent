import { type FormEvent, useEffect, useId, useRef, useState } from "react";
import { getApiBase } from "../lib/api";
import { getTurnstileSiteKey, loadTurnstile } from "../lib/turnstile";
import { CtaButton } from "./CtaButton";
import { KollegenrundeCardPreview } from "./KollegenrundeCardPreview";
import styles from "./KollegenrundeCardDesigner.module.css";

const CATEGORIES = [
  "FOOD & DRINK",
  "ACTION",
  "WORKSHOP",
  "WEITERBILDUNG",
  "ENTSPANNUNG",
  "KULTUR",
  "SPORT",
  "OUTDOOR",
  "SPIEL & SPASS",
  "CREATIVE",
] as const;

type BackSuggestion = {
  id: string;
  label: string;
  backTitle: string;
  duelTitle: string;
  duelBody: string;
  teamTitle: string;
  teamBody: string;
};

/** Example challenge packs – always: duel has a defined winner; team has a measurable score. */
const BACK_SUGGESTIONS: BackSuggestion[] = [
  {
    id: "exit",
    label: "Escape",
    backTitle: "Exit-Strategie",
    duelTitle: "MVP des Escape Rooms",
    duelBody:
      "Abstimmung am Tisch: Wer war der wertvollste Spieler? Gewinner: Person mit den meisten Stimmen.",
    teamTitle: "Hinweis-Sparsamkeit",
    teamBody: "Zählt die Hinweise bis zum Exit. Messwert: Anzahl Hinweise (weniger = besser).",
  },
  {
    id: "hochstapler",
    label: "Brauhaus",
    backTitle: "Hochstapler-Pitch",
    duelTitle: "Der schlechteste Pitch",
    duelBody:
      "Jeder pitcht 30 Sek. das absurdeste Produkt. Gewinner: Person mit den meisten Lacher-/Stimmen.",
    teamTitle: "Bierdeckel-Turm",
    teamBody: "3 Minuten Turm bauen. Messwert: Höhe in cm (oder Stockwerke).",
  },
  {
    id: "office",
    label: "Karaoke",
    backTitle: "Office Star",
    duelTitle: "Beste Performance",
    duelBody:
      "Jury aus 3 Personen bewertet mutigste Performance. Gewinner: höchste Jury-Punktzahl.",
    teamTitle: "Teamgesang",
    teamBody: "Ein Song zusammen. Messwert: Jury-Score 1–10 für den gemeinsamen Auftritt.",
  },
  {
    id: "mush",
    label: "Workshop",
    backTitle: "Mush love",
    duelTitle: "Pilzkultivierer",
    duelBody:
      "5 Minuten: so viele Pilzsorten wie möglich aufschreiben. Gewinner: die längste korrekte Liste.",
    teamTitle: "Beutel-Sprint",
    teamBody: "3 Minuten befüllen. Messwert: Anzahl fertiger Pilzbeutel.",
  },
  {
    id: "bowl",
    label: "Bowl",
    backTitle: "Bowl Together Now",
    duelTitle: "Kalorien-Scharfschütze",
    duelBody:
      "Jeder schätzt die Kalorien der Bowl. Gewinner: die Schätzung am nächsten am echten Wert.",
    teamTitle: "Guess the Calories",
    teamBody: "Teamsammlung: ein gemeinsamer Schätzwert. Messwert: Abweichung in kcal zum echten Wert.",
  },
  {
    id: "relax",
    label: "Entspannung",
    backTitle: "Ruhemodus",
    duelTitle: "Zen-Meister",
    duelBody:
      "Wer hält am längsten still – ohne zu lachen? Gewinner: längste Zeit in Sekunden.",
    teamTitle: "Atem-Sync",
    teamBody: "2 Minuten gemeinsam atmen. Messwert: Sekunden bis die erste Person aus dem Takt fällt.",
  },
  {
    id: "kultur",
    label: "Kultur",
    backTitle: "Kulturclash",
    duelTitle: "Kuratoren-Duell",
    duelBody:
      "Jeder erzählt 60 Sek. zu einem Stück. Gewinner: Person mit den meisten Stimmen am Tisch.",
    teamTitle: "Lieblingsstück",
    teamBody: "Einigt euch auf ein Stück. Messwert: Minuten bis zur einstimmigen Entscheidung.",
  },
  {
    id: "sport",
    label: "Sport",
    backTitle: "Matchday",
    duelTitle: "Fair Play Award",
    duelBody:
      "Abstimmung: Wer hat am fairsten gespielt? Gewinner: Person mit den meisten Stimmen.",
    teamTitle: "Punktejagd",
    teamBody: "Eine kurze Team-Übung. Messwert: erzielte Punkte / Treffer in 3 Minuten.",
  },
];

const MAX_BYTES = 4.5 * 1024 * 1024;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function KollegenrundeCardDesigner() {
  const fileInputId = useId();
  const turnstileHostRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const photoObjectUrl = useRef<string | null>(null);

  const [side, setSide] = useState<"front" | "back">("front");
  const [name, setName] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [offer, setOffer] = useState("");
  const [detail, setDetail] = useState("");
  const [backTitle, setBackTitle] = useState("");
  const [duelTitle, setDuelTitle] = useState("");
  const [duelBody, setDuelBody] = useState("");
  const [teamTitle, setTeamTitle] = useState("");
  const [teamBody, setTeamBody] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const siteKey = getTurnstileSiteKey();

  const previewData = {
    name,
    category,
    offer,
    detail,
    photoUrl,
    backTitle,
    duelTitle,
    duelBody,
    teamTitle,
    teamBody,
  };

  useEffect(() => {
    return () => {
      if (photoObjectUrl.current) URL.revokeObjectURL(photoObjectUrl.current);
    };
  }, []);

  useEffect(() => {
    if (!siteKey || side !== "back" || !turnstileHostRef.current) return;
    let cancelled = false;

    loadTurnstile()
      .then(() => {
        if (cancelled || !turnstileHostRef.current || !window.turnstile) return;
        if (widgetIdRef.current) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
        widgetIdRef.current = window.turnstile.render(turnstileHostRef.current, {
          sitekey: siteKey,
          theme: "light",
          size: "flexible",
          callback: (token) => setCaptchaToken(token),
          "expired-callback": () => setCaptchaToken(""),
          "error-callback": () => setCaptchaToken(""),
        });
      })
      .catch(() => {
        setError("Captcha konnte nicht geladen werden. Bitte Seite neu laden.");
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, side]);

  const applySuggestion = (item: BackSuggestion) => {
    setBackTitle(item.backTitle);
    setDuelTitle(item.duelTitle);
    setDuelBody(item.duelBody);
    setTeamTitle(item.teamTitle);
    setTeamBody(item.teamBody);
  };

  const onPhotoChange = (file: File | null) => {
    if (photoObjectUrl.current) {
      URL.revokeObjectURL(photoObjectUrl.current);
      photoObjectUrl.current = null;
    }
    if (!file) {
      setPhotoFile(null);
      setPhotoUrl(null);
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Bitte ein Bild (JPG, PNG, WebP) wählen.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("Foto max. 4,5 MB.");
      return;
    }
    setError("");
    const url = URL.createObjectURL(file);
    photoObjectUrl.current = url;
    setPhotoFile(file);
    setPhotoUrl(url);
  };

  const goBack = () => {
    setError("");
    if (!name.trim() || !offer.trim() || !detail.trim()) {
      setError("Bitte Name, Vorteil und Bedingungen ausfüllen.");
      return;
    }
    if (!photoFile) {
      setError("Bitte ein Foto für die Karte hochladen.");
      return;
    }
    if (!contactName.trim() || !email.trim() || !phone.trim()) {
      setError("Bitte Ansprechpartner, E-Mail und Telefon ausfüllen.");
      return;
    }
    if (!isValidEmail(email.trim())) {
      setError("Bitte eine gültige E-Mail angeben.");
      return;
    }
    setSide("back");
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setError("");

    if (side === "front") {
      goBack();
      return;
    }

    if (!photoFile) {
      setError("Bitte ein Foto für die Karte hochladen.");
      setSide("front");
      return;
    }
    if (!backTitle.trim() || !duelTitle.trim() || !duelBody.trim() || !teamTitle.trim() || !teamBody.trim()) {
      setError("Bitte die Rückseite vollständig ausfüllen – oder ein Beispiel wählen.");
      return;
    }
    if (!isValidEmail(email.trim()) || !phone.trim()) {
      setError("E-Mail und Telefon sind Pflicht.");
      setSide("front");
      return;
    }
    if (siteKey && !captchaToken) {
      setError("Bitte das Captcha bestätigen.");
      return;
    }

    setStatus("sending");
    try {
      const body = new FormData();
      body.set("name", name.trim());
      body.set("category", category.trim());
      body.set("offer", offer.trim());
      body.set("detail", detail.trim());
      body.set("backTitle", backTitle.trim());
      body.set("duelTitle", duelTitle.trim());
      body.set("duelBody", duelBody.trim());
      body.set("teamTitle", teamTitle.trim());
      body.set("teamBody", teamBody.trim());
      body.set("contactName", contactName.trim());
      body.set("email", email.trim());
      body.set("phone", phone.trim());
      body.set("contact", `${email.trim()} · ${phone.trim()}`);
      body.set("website", website.trim());
      body.set("cf-turnstile-response", captchaToken);
      body.set("photo", photoFile);

      const res = await fetch(`${getApiBase()}/api/kollegenrunde-card`, {
        method: "POST",
        body,
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; ok?: boolean };

      if (!res.ok) {
        const offlineHint =
          res.status === 404 || res.status === 405 || res.status === 0
            ? " API noch nicht live – nach Deploy funktioniert der Upload."
            : "";
        throw new Error((data.error || "Upload fehlgeschlagen.") + offlineHint);
      }

      setStatus("ok");
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
        setCaptchaToken("");
      }
    } catch (err) {
      setStatus("error");
      const message =
        err instanceof TypeError
          ? "Lokal keine API erreichbar. Nach dem Deploy online sollte der Upload funktionieren."
          : err instanceof Error
            ? err.message
            : "Upload fehlgeschlagen.";
      setError(message);
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
        setCaptchaToken("");
      }
    }
  };

  if (status === "ok") {
    return (
      <div className={styles.success}>
        <p className={styles.successEyebrow}>Eingegangen</p>
        <h3>Danke – eure Kartenidee ist da</h3>
        <p>Wir prüfen Vorder- und Rückseite sowie Foto und melden uns zum Partnergespräch.</p>
      </div>
    );
  }

  return (
    <div className={styles.designer}>
      <div className={styles.topBar}>
        <div className={styles.sideToggle} role="group" aria-label="Kartenseite">
          <button
            type="button"
            className={side === "front" ? styles.sideActive : undefined}
            onClick={() => setSide("front")}
          >
            01 · Vorderseite
          </button>
          <button
            type="button"
            className={side === "back" ? styles.sideActive : undefined}
            onClick={() => {
              if (side === "front") goBack();
              else setSide("back");
            }}
          >
            02 · Rückseite
          </button>
        </div>
        <p className={styles.topHint}>
          {side === "front"
            ? "Vorteil, Foto und Kontakt – so sieht die Karte von vorne aus."
            : "Duell & Challenge – so sieht die Karte von hinten aus."}
        </p>
      </div>

      <div className={styles.stage}>
        <div className={styles.previewCol}>
          <p className={styles.previewLabel}>
            Live-Vorschau · {side === "front" ? "Vorderseite" : "Rückseite"}
          </p>
          <div className={styles.previewStage}>
            <KollegenrundeCardPreview data={previewData} side={side} />
          </div>
        </div>

        <form className={styles.form} onSubmit={onSubmit}>
          {side === "front" ? (
            <div className={styles.panel} key="front">
              <p className={styles.sectionLabel}>Angebot auf der Karte</p>

              <label>
                Betrieb / Name
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength={60}
                  placeholder="z. B. Escape Studio Neu-Ulm"
                />
              </label>

              <label>
                Kategorie
                <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                  {CATEGORIES.map((item) => (
                    <option key={item} value={item}>
                      {item === "FOOD & DRINK" ? "FOOD & DRINK (Essen & Trinken)" : item}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.fileLabel} htmlFor={fileInputId}>
                Foto
                <span className={styles.fileButton}>
                  {photoFile ? photoFile.name : "Bild auswählen"}
                </span>
                <input
                  id={fileInputId}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => onPhotoChange(e.target.files?.[0] ?? null)}
                />
              </label>

              <label>
                Teamvorteil
                <span className={styles.fieldHint}>
                  Je besser der Vorteil, desto höher die Chance, dass du ins Programm aufgenommen
                  wirst.
                </span>
                <input
                  value={offer}
                  onChange={(e) => setOffer(e.target.value)}
                  required
                  maxLength={80}
                  placeholder="z. B. 15 % unter der Woche"
                />
              </label>

              <label>
                Bedingungen
                <input
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  required
                  maxLength={90}
                  placeholder="z. B. Für 4+ Personen · Di–Do"
                />
              </label>

              <p className={styles.sectionLabel}>Kontakt</p>
              <label>
                Ansprechpartner
                <input
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </label>
              <div className={styles.row}>
                <label>
                  E-Mail
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </label>
                <label>
                  Telefon
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    autoComplete="tel"
                  />
                </label>
              </div>
              <label>
                Website
                <input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://"
                  autoComplete="url"
                />
              </label>

              {error ? <p className={styles.error}>{error}</p> : null}

              <CtaButton type="submit" size="md" surface="accent">
                Weiter zur Rückseite
              </CtaButton>
            </div>
          ) : (
            <div className={styles.panel} key="back">
              <p className={styles.sectionLabel}>Challenge auf der Rückseite</p>
              <p className={styles.ruleNote}>
                <strong>Kollegen Duell:</strong> Es muss klar ein Gewinner feststehen – und wie er
                ermittelt wird.
                <br />
                <strong>Team Challenge:</strong> Es braucht einen messbaren Wert, damit Teams
                vergleichbar sind.
              </p>

              <p className={styles.examplesLabel}>Beispiele zum Übernehmen (nur Inspiration)</p>
              <div className={styles.suggestions} role="list">
                {BACK_SUGGESTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={styles.chip}
                    onClick={() => applySuggestion(item)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <label>
                Challenge-Titel
                <input
                  value={backTitle}
                  onChange={(e) => setBackTitle(e.target.value)}
                  required
                  maxLength={48}
                  placeholder="z. B. Exit-Strategie"
                />
              </label>

              <label>
                Kollegen Duell · Titel
                <input
                  value={duelTitle}
                  onChange={(e) => setDuelTitle(e.target.value)}
                  required
                  maxLength={60}
                  placeholder="z. B. MVP des Escape Rooms"
                />
              </label>
              <label>
                Kollegen Duell · Text
                <span className={styles.fieldHint}>
                  Wer gewinnt – und wie wird der Gewinner bestimmt?
                </span>
                <textarea
                  value={duelBody}
                  onChange={(e) => setDuelBody(e.target.value)}
                  required
                  maxLength={180}
                  rows={3}
                  placeholder="z. B. Abstimmung am Tisch. Gewinner: Person mit den meisten Stimmen."
                />
              </label>

              <label>
                Team Challenge · Titel
                <input
                  value={teamTitle}
                  onChange={(e) => setTeamTitle(e.target.value)}
                  required
                  maxLength={60}
                  placeholder="z. B. Hinweis-Sparsamkeit"
                />
              </label>
              <label>
                Team Challenge · Text
                <span className={styles.fieldHint}>
                  Welcher Wert wird gemessen, damit Teams vergleichen können?
                </span>
                <textarea
                  value={teamBody}
                  onChange={(e) => setTeamBody(e.target.value)}
                  required
                  maxLength={180}
                  rows={3}
                  placeholder="z. B. Messwert: Anzahl Hinweise bis zum Exit (weniger = besser)."
                />
              </label>

              {siteKey ? (
                <div className={styles.captcha} ref={turnstileHostRef} />
              ) : (
                <p className={styles.devNote}>
                  Captcha greift online mit Turnstile-Sitekey – lokal optional.
                </p>
              )}

              {error ? <p className={styles.error}>{error}</p> : null}

              <div className={styles.actions}>
                <button type="button" className={styles.secondary} onClick={() => setSide("front")}>
                  Zurück
                </button>
                <CtaButton type="submit" size="md" surface="accent">
                  {status === "sending" ? "Wird gesendet…" : "Kartenidee einreichen"}
                </CtaButton>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
