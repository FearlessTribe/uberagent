import { type FormEvent, useEffect, useState } from "react";
import { getApiBase } from "../lib/api";
import { useDocumentSeo } from "../hooks/useDocumentSeo";
import styles from "./AdminPage.module.css";

type TabId = "karten" | "kalkulation";

type CardSubmission = {
  id: string;
  createdAt: string;
  name: string;
  category: string;
  offer: string;
  detail: string;
  backTitle?: string;
  duelTitle?: string;
  duelBody?: string;
  teamTitle?: string;
  teamBody?: string;
  contactName: string;
  email?: string;
  phone?: string;
  contact: string;
  website: string;
  groupSize?: string;
  times?: string;
  photoContentType: string;
  photoBytes: number;
};

type KalkSubmission = {
  id: string;
  createdAt: string;
  updatedAt?: string;
  status: "contact" | "complete";
  name: string;
  email: string;
  phone: string;
  website: string;
  consent: boolean;
  requestsPerDay: number;
  minutesPerQuote: number;
  hoursDay: number;
  workDays?: number;
  hourlyRate?: number;
  extraOrdersWeek?: number;
  marginPerOrder?: number;
  hoursYear?: number;
  timeValue?: number;
  extraContribution?: number;
  total?: number;
};

function formatEuro(value: number | undefined) {
  if (value == null || !Number.isFinite(value)) return "–";
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNum(value: number | undefined, digits = 1) {
  if (value == null || !Number.isFinite(value)) return "–";
  return new Intl.NumberFormat("de-DE", { maximumFractionDigits: digits }).format(value);
}

export function AdminPage({ onClose }: { onClose: () => void }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<TabId>("karten");
  const [cards, setCards] = useState<CardSubmission[]>([]);
  const [kalkItems, setKalkItems] = useState<KalkSubmission[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useDocumentSeo({
    title: "Admin | supragent",
    description: "Internes Admin für Team Challenge und Kalkulations-Check.",
    canonical: `${window.location.origin}/admin`,
  });

  useEffect(() => {
    let robots = document.head.querySelector('meta[name="robots"]');
    const created = !robots;
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    const prev = robots.getAttribute("content");
    robots.setAttribute("content", "noindex, nofollow");
    return () => {
      if (created) robots?.remove();
      else if (prev != null) robots?.setAttribute("content", prev);
    };
  }, []);

  const loadCards = async () => {
    const res = await fetch(`${getApiBase()}/api/admin/submissions`, {
      credentials: "include",
    });
    if (res.status === 401) {
      setAuthed(false);
      setCards([]);
      return;
    }
    const data = (await res.json()) as { items?: CardSubmission[]; error?: string };
    if (!res.ok) throw new Error(data.error || "Laden fehlgeschlagen.");
    setCards(data.items || []);
    setAuthed(true);
  };

  const loadKalk = async () => {
    const res = await fetch(`${getApiBase()}/api/admin/kalkulations`, {
      credentials: "include",
    });
    if (res.status === 401) {
      setAuthed(false);
      setKalkItems([]);
      return;
    }
    const data = (await res.json()) as { items?: KalkSubmission[]; error?: string };
    if (!res.ok) throw new Error(data.error || "Laden fehlgeschlagen.");
    setKalkItems(data.items || []);
    setAuthed(true);
  };

  const loadAll = async () => {
    await Promise.all([loadCards(), loadKalk()]);
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${getApiBase()}/api/admin/session`, {
          credentials: "include",
        });
        const data = (await res.json()) as { ok?: boolean };
        if (cancelled) return;
        if (data.ok) {
          setAuthed(true);
          await loadAll();
        } else {
          setAuthed(false);
        }
      } catch {
        if (!cancelled) setAuthed(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const onLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${getApiBase()}/api/admin/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Login fehlgeschlagen.");
      setPassword("");
      await loadAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login fehlgeschlagen.");
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  };

  const onLogout = async () => {
    await fetch(`${getApiBase()}/api/admin/logout`, {
      method: "POST",
      credentials: "include",
    });
    setAuthed(false);
    setCards([]);
    setKalkItems([]);
  };

  const refresh = () => {
    if (tab === "karten") void loadCards();
    else void loadKalk();
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>supragent</p>
          <h1>Admin</h1>
        </div>
        <div className={styles.headerActions}>
          {authed ? (
            <button type="button" className={styles.ghost} onClick={onLogout}>
              Abmelden
            </button>
          ) : null}
          <button type="button" className={styles.ghost} onClick={onClose}>
            Zur Website
          </button>
        </div>
      </header>

      {authed === null ? <p className={styles.muted}>Prüfe Session…</p> : null}

      {authed === false ? (
        <form className={styles.login} onSubmit={onLogin}>
          <label>
            Passwort
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          {error ? <p className={styles.error}>{error}</p> : null}
          <button type="submit" className={styles.primary} disabled={loading}>
            {loading ? "…" : "Anmelden"}
          </button>
        </form>
      ) : null}

      {authed ? (
        <section className={styles.listSection}>
          <div className={styles.tabs} role="tablist" aria-label="Admin-Bereiche">
            <button
              type="button"
              role="tab"
              aria-selected={tab === "karten"}
              className={`${styles.tab} ${tab === "karten" ? styles.tabActive : ""}`}
              onClick={() => setTab("karten")}
            >
              Ulmer Team Challenge
              <span className={styles.tabCount}>{cards.length}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "kalkulation"}
              className={`${styles.tab} ${tab === "kalkulation" ? styles.tabActive : ""}`}
              onClick={() => setTab("kalkulation")}
            >
              Kalkulations-Check
              <span className={styles.tabCount}>{kalkItems.length}</span>
            </button>
          </div>

          <div className={styles.listHead}>
            <h2>{tab === "karten" ? "Kartenideen" : "Kalkulations-Check Leads"}</h2>
            <button type="button" className={styles.ghost} onClick={refresh}>
              Aktualisieren
            </button>
          </div>

          {tab === "karten" ? (
            cards.length === 0 ? (
              <p className={styles.muted}>Noch keine Einreichungen.</p>
            ) : (
              <ul className={styles.list}>
                {cards.map((item) => (
                  <li key={item.id} className={styles.card}>
                    <a
                      className={styles.thumb}
                      href={`${getApiBase()}/api/admin/photo/${item.id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={`${getApiBase()}/api/admin/photo/${item.id}`}
                        alt=""
                        loading="lazy"
                      />
                    </a>
                    <div className={styles.meta}>
                      <p className={styles.category}>{item.category}</p>
                      <h3>{item.name}</h3>
                      <p className={styles.offer}>{item.offer}</p>
                      <p className={styles.detail}>{item.detail}</p>
                      {item.backTitle ? (
                        <p className={styles.detail}>
                          Rückseite: <strong>{item.backTitle}</strong>
                          {item.duelTitle ? ` · Duell: ${item.duelTitle}` : ""}
                          {item.teamTitle ? ` · Team: ${item.teamTitle}` : ""}
                        </p>
                      ) : null}
                      <dl>
                        <div>
                          <dt>Kontakt</dt>
                          <dd>
                            {item.contactName}
                            {item.email || item.phone
                              ? ` · ${[item.email, item.phone].filter(Boolean).join(" · ")}`
                              : ` · ${item.contact}`}
                          </dd>
                        </div>
                        {item.website ? (
                          <div>
                            <dt>Website</dt>
                            <dd>{item.website}</dd>
                          </div>
                        ) : null}
                        <div>
                          <dt>Eingang</dt>
                          <dd>{new Date(item.createdAt).toLocaleString("de-DE")}</dd>
                        </div>
                      </dl>
                    </div>
                  </li>
                ))}
              </ul>
            )
          ) : kalkItems.length === 0 ? (
            <p className={styles.muted}>Noch keine Kalkulations-Check Leads.</p>
          ) : (
            <ul className={styles.list}>
              {kalkItems.map((item) => (
                <li key={item.id} className={styles.kalkCard}>
                  <div className={styles.meta}>
                    <p className={styles.category}>
                      {item.status === "complete" ? "Vollständig" : "Kontakt erfasst"}
                    </p>
                    <h3>{item.name}</h3>
                    <dl className={styles.kalkGrid}>
                      <div>
                        <dt>E-Mail</dt>
                        <dd>{item.email}</dd>
                      </div>
                      <div>
                        <dt>Telefon</dt>
                        <dd>{item.phone}</dd>
                      </div>
                      {item.website ? (
                        <div>
                          <dt>Website</dt>
                          <dd>{item.website}</dd>
                        </div>
                      ) : null}
                      <div>
                        <dt>Kontakt erlaubt</dt>
                        <dd>{item.consent ? "Ja" : "Nein"}</dd>
                      </div>
                      <div>
                        <dt>Anfragen / Tag</dt>
                        <dd>{formatNum(item.requestsPerDay, 0)}</dd>
                      </div>
                      <div>
                        <dt>Minuten / Angebot</dt>
                        <dd>{formatNum(item.minutesPerQuote, 0)}</dd>
                      </div>
                      <div>
                        <dt>Std. / Tag Angebote</dt>
                        <dd>{formatNum(item.hoursDay)}</dd>
                      </div>
                      {item.status === "complete" ? (
                        <>
                          <div>
                            <dt>Arbeitstage / Jahr</dt>
                            <dd>{formatNum(item.workDays, 0)}</dd>
                          </div>
                          <div>
                            <dt>Stundenwert</dt>
                            <dd>{formatEuro(item.hourlyRate)}</dd>
                          </div>
                          <div>
                            <dt>Extra Aufträge / Woche</dt>
                            <dd>{formatNum(item.extraOrdersWeek, 0)}</dd>
                          </div>
                          <div>
                            <dt>Deckungsbeitrag / Auftrag</dt>
                            <dd>{formatEuro(item.marginPerOrder)}</dd>
                          </div>
                          <div>
                            <dt>Std. / Jahr</dt>
                            <dd>{formatNum(item.hoursYear)}</dd>
                          </div>
                          <div>
                            <dt>Zeitwert / Jahr</dt>
                            <dd>{formatEuro(item.timeValue)}</dd>
                          </div>
                          <div>
                            <dt>Extra Deckungsbeitrag</dt>
                            <dd>{formatEuro(item.extraContribution)}</dd>
                          </div>
                          <div>
                            <dt>Nutzen gesamt</dt>
                            <dd>
                              <strong>{formatEuro(item.total)}</strong>
                            </dd>
                          </div>
                        </>
                      ) : null}
                      <div>
                        <dt>Eingang</dt>
                        <dd>{new Date(item.createdAt).toLocaleString("de-DE")}</dd>
                      </div>
                      {item.updatedAt ? (
                        <div>
                          <dt>Aktualisiert</dt>
                          <dd>{new Date(item.updatedAt).toLocaleString("de-DE")}</dd>
                        </div>
                      ) : null}
                    </dl>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : null}
    </div>
  );
}
