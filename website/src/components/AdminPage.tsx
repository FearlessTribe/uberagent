import { type FormEvent, useEffect, useState } from "react";
import { getApiBase } from "../lib/api";
import { useDocumentSeo } from "../hooks/useDocumentSeo";
import styles from "./AdminPage.module.css";

type Submission = {
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

export function AdminPage({ onClose }: { onClose: () => void }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [items, setItems] = useState<Submission[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useDocumentSeo({
    title: "Admin | uberagent",
    description: "Internes Admin für Ulmer Team Challenge-Kartenideen.",
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

  const loadSubmissions = async () => {
    const res = await fetch(`${getApiBase()}/api/admin/submissions`, {
      credentials: "include",
    });
    if (res.status === 401) {
      setAuthed(false);
      setItems([]);
      return;
    }
    const data = (await res.json()) as { items?: Submission[]; error?: string };
    if (!res.ok) throw new Error(data.error || "Laden fehlgeschlagen.");
    setItems(data.items || []);
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
          await loadSubmissions();
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
      await loadSubmissions();
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
    setItems([]);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>uberagent</p>
          <h1>Admin · Ulmer Team Challenge</h1>
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
          <div className={styles.listHead}>
            <h2>Kartenideen</h2>
            <button type="button" className={styles.ghost} onClick={() => void loadSubmissions()}>
              Aktualisieren
            </button>
          </div>
          {items.length === 0 ? (
            <p className={styles.muted}>Noch keine Einreichungen.</p>
          ) : (
            <ul className={styles.list}>
              {items.map((item) => (
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
          )}
        </section>
      ) : null}
    </div>
  );
}
