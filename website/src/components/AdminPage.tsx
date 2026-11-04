import { type FormEvent, useEffect, useState } from "react";
import { getApiBase } from "../lib/api";
import { useDocumentSeo } from "../hooks/useDocumentSeo";
import styles from "./AdminPage.module.css";

type TabId = "karten" | "kalkulation" | "potential" | "strategy" | "helena";

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
  photoContentType: string;
  photoBytes: number;
};

type KalkSubmission = {
  id: string;
  createdAt: string;
  updatedAt?: string;
  source?: string;
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

type PotentialLead = {
  id: string;
  createdAt: string;
  source?: string;
  name: string;
  email: string;
  phone: string;
  website: string;
};

type StrategyLead = {
  id: string;
  createdAt: string;
  source?: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
};

type HelenaLead = {
  id: string;
  createdAt: string;
  source?: string;
  name: string;
  email: string;
  phone: string;
  consent: boolean;
  customers: number;
  contactsPerCustomer: number;
  occasions: number;
  avgValue: number;
  recipients: number;
  giftsYear: number;
  volumeYear: number;
};

const TABS: { id: TabId; label: string }[] = [
  { id: "karten", label: "Team Challenge" },
  { id: "kalkulation", label: "Kalkulations-Check" },
  { id: "potential", label: "Potenzial-Check" },
  { id: "strategy", label: "Strategy Guide" },
  { id: "helena", label: "Helena Check" },
];

function formatEuro(value: number | undefined) {
  if (value == null || !Number.isFinite(value)) return "-";
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNum(value: number | undefined, digits = 1) {
  if (value == null || !Number.isFinite(value)) return "-";
  return new Intl.NumberFormat("de-DE", { maximumFractionDigits: digits }).format(value);
}

async function fetchItems<T>(path: string): Promise<{ ok: true; items: T[] } | { ok: false; status: number; error: string }> {
  const res = await fetch(`${getApiBase()}${path}`, { credentials: "include" });
  const data = (await res.json().catch(() => ({}))) as { items?: T[]; error?: string };
  if (res.status === 401) return { ok: false, status: 401, error: "Nicht angemeldet." };
  if (!res.ok) return { ok: false, status: res.status, error: data.error || "Laden fehlgeschlagen." };
  return { ok: true, items: data.items || [] };
}

export function AdminPage({ onClose }: { onClose: () => void }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<TabId>("karten");
  const [cards, setCards] = useState<CardSubmission[]>([]);
  const [kalkItems, setKalkItems] = useState<KalkSubmission[]>([]);
  const [potentialItems, setPotentialItems] = useState<PotentialLead[]>([]);
  const [strategyItems, setStrategyItems] = useState<StrategyLead[]>([]);
  const [helenaItems, setHelenaItems] = useState<HelenaLead[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importMsg, setImportMsg] = useState("");

  useDocumentSeo({
    title: "Admin | supragent",
    description: "Internes Admin für Website-Leads.",
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

  const loadAll = async () => {
    const [cardsRes, kalkRes, potRes, stratRes, helenaRes] = await Promise.all([
      fetchItems<CardSubmission>("/api/admin/submissions"),
      fetchItems<KalkSubmission>("/api/admin/kalkulations"),
      fetchItems<PotentialLead>("/api/admin/potential"),
      fetchItems<StrategyLead>("/api/admin/strategy"),
      fetchItems<HelenaLead>("/api/admin/helena"),
    ]);

    if (
      (cardsRes.ok === false && cardsRes.status === 401) ||
      (kalkRes.ok === false && kalkRes.status === 401)
    ) {
      setAuthed(false);
      return;
    }

    if (cardsRes.ok) setCards(cardsRes.items);
    if (kalkRes.ok) setKalkItems(kalkRes.items);
    if (potRes.ok) setPotentialItems(potRes.items);
    if (stratRes.ok) setStrategyItems(stratRes.items);
    if (helenaRes.ok) setHelenaItems(helenaRes.items);
    setAuthed(true);
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
    setPotentialItems([]);
    setStrategyItems([]);
    setHelenaItems([]);
  };

  const onImportNotion = async () => {
    setImportMsg("");
    setImporting(true);
    try {
      const res = await fetch(`${getApiBase()}/api/admin/import-notion`, {
        method: "POST",
        credentials: "include",
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        summary?: {
          potential: number;
          strategy: number;
          helena: number;
          kalkulation: number;
          skipped: number;
        };
      };
      if (!res.ok) throw new Error(data.error || "Import fehlgeschlagen.");
      const s = data.summary;
      setImportMsg(
        s
          ? `Import ok: Potential ${s.potential}, Strategy ${s.strategy}, Helena ${s.helena}, Kalkulation ${s.kalkulation}, übersprungen ${s.skipped}.`
          : "Import ok.",
      );
      await loadAll();
    } catch (err) {
      setImportMsg(err instanceof Error ? err.message : "Import fehlgeschlagen.");
    } finally {
      setImporting(false);
    }
  };

  const counts: Record<TabId, number> = {
    karten: cards.length,
    kalkulation: kalkItems.length,
    potential: potentialItems.length,
    strategy: strategyItems.length,
    helena: helenaItems.length,
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
            <>
              <button
                type="button"
                className={styles.ghost}
                onClick={() => void onImportNotion()}
                disabled={importing}
              >
                {importing ? "Import…" : "Notion importieren"}
              </button>
              <button type="button" className={styles.ghost} onClick={onLogout}>
                Abmelden
              </button>
            </>
          ) : null}
          <button type="button" className={styles.ghost} onClick={onClose}>
            Zur Website
          </button>
        </div>
      </header>

      {importMsg ? <p className={styles.muted}>{importMsg}</p> : null}
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
            {TABS.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={tab === item.id}
                className={`${styles.tab} ${tab === item.id ? styles.tabActive : ""}`}
                onClick={() => setTab(item.id)}
              >
                {item.label}
                <span className={styles.tabCount}>{counts[item.id]}</span>
              </button>
            ))}
          </div>

          <div className={styles.listHead}>
            <h2>{TABS.find((t) => t.id === tab)?.label}</h2>
            <button type="button" className={styles.ghost} onClick={() => void loadAll()}>
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
          ) : null}

          {tab === "kalkulation" ? (
            kalkItems.length === 0 ? (
              <p className={styles.muted}>Noch keine Kalkulations-Check Leads.</p>
            ) : (
              <ul className={styles.list}>
                {kalkItems.map((item) => (
                  <li key={item.id} className={styles.kalkCard}>
                    <div className={styles.meta}>
                      <p className={styles.category}>
                        {item.status === "complete" ? "Vollständig" : "Kontakt erfasst"}
                        {item.source === "notion-import" ? " · Notion" : ""}
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
                          <dt>Anfragen / Tag</dt>
                          <dd>{formatNum(item.requestsPerDay, 0)}</dd>
                        </div>
                        <div>
                          <dt>Min. / Angebot</dt>
                          <dd>{formatNum(item.minutesPerQuote, 0)}</dd>
                        </div>
                        <div>
                          <dt>Std. / Tag</dt>
                          <dd>{formatNum(item.hoursDay)}</dd>
                        </div>
                        {item.status === "complete" ? (
                          <>
                            <div>
                              <dt>Arbeitstage</dt>
                              <dd>{formatNum(item.workDays, 0)}</dd>
                            </div>
                            <div>
                              <dt>Stundenwert</dt>
                              <dd>{formatEuro(item.hourlyRate)}</dd>
                            </div>
                            <div>
                              <dt>Extra / Woche</dt>
                              <dd>{formatNum(item.extraOrdersWeek, 0)}</dd>
                            </div>
                            <div>
                              <dt>Deckungsbeitrag</dt>
                              <dd>{formatEuro(item.marginPerOrder)}</dd>
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
                      </dl>
                    </div>
                  </li>
                ))}
              </ul>
            )
          ) : null}

          {tab === "potential" ? (
            potentialItems.length === 0 ? (
              <p className={styles.muted}>Noch keine Potenzial-Check Leads.</p>
            ) : (
              <ul className={styles.list}>
                {potentialItems.map((item) => (
                  <li key={item.id} className={styles.kalkCard}>
                    <div className={styles.meta}>
                      <p className={styles.category}>
                        Potenzial-Check
                        {item.source === "notion-import" ? " · Notion" : ""}
                      </p>
                      <h3>{item.name}</h3>
                      <dl className={styles.kalkGrid}>
                        <div>
                          <dt>E-Mail</dt>
                          <dd>{item.email}</dd>
                        </div>
                        <div>
                          <dt>Telefon</dt>
                          <dd>{item.phone || "-"}</dd>
                        </div>
                        <div>
                          <dt>Website</dt>
                          <dd>{item.website}</dd>
                        </div>
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
          ) : null}

          {tab === "strategy" ? (
            strategyItems.length === 0 ? (
              <p className={styles.muted}>Noch keine Strategy-Guide Leads.</p>
            ) : (
              <ul className={styles.list}>
                {strategyItems.map((item) => (
                  <li key={item.id} className={styles.kalkCard}>
                    <div className={styles.meta}>
                      <p className={styles.category}>
                        Strategy Guide
                        {item.source === "notion-import" ? " · Notion" : ""}
                      </p>
                      <h3>{item.name}</h3>
                      <dl className={styles.kalkGrid}>
                        <div>
                          <dt>Titel</dt>
                          <dd>{item.title}</dd>
                        </div>
                        <div>
                          <dt>Firma</dt>
                          <dd>{item.company}</dd>
                        </div>
                        <div>
                          <dt>E-Mail</dt>
                          <dd>{item.email}</dd>
                        </div>
                        <div>
                          <dt>Telefon</dt>
                          <dd>{item.phone}</dd>
                        </div>
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
          ) : null}

          {tab === "helena" ? (
            helenaItems.length === 0 ? (
              <p className={styles.muted}>Noch keine Helena-Check Leads.</p>
            ) : (
              <ul className={styles.list}>
                {helenaItems.map((item) => (
                  <li key={item.id} className={styles.kalkCard}>
                    <div className={styles.meta}>
                      <p className={styles.category}>
                        Helena Check
                        {item.source === "notion-import" ? " · Notion" : ""}
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
                        <div>
                          <dt>Kunden</dt>
                          <dd>{formatNum(item.customers, 0)}</dd>
                        </div>
                        <div>
                          <dt>Kontakte / Kunde</dt>
                          <dd>{formatNum(item.contactsPerCustomer, 0)}</dd>
                        </div>
                        <div>
                          <dt>Anlässe / Jahr</dt>
                          <dd>{formatNum(item.occasions, 0)}</dd>
                        </div>
                        <div>
                          <dt>Ø Warenwert</dt>
                          <dd>{formatEuro(item.avgValue)}</dd>
                        </div>
                        <div>
                          <dt>Empfänger</dt>
                          <dd>{formatNum(item.recipients, 0)}</dd>
                        </div>
                        <div>
                          <dt>Geschenke / Jahr</dt>
                          <dd>{formatNum(item.giftsYear, 0)}</dd>
                        </div>
                        <div>
                          <dt>Warenwert / Jahr</dt>
                          <dd>{formatEuro(item.volumeYear)}</dd>
                        </div>
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
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
