import {
  acceptConsent,
  declineConsent,
  enableTracking,
  getStoredConsent,
  trackConsentedPageView,
  type ConsentStatus,
} from "../lib/consent";
import { trackEvent } from "../lib/analytics";
import { useEffect, useRef, useState } from "react";
import styles from "./CookieConsent.module.css";

function useLocationPath() {
  const [path, setPath] = useState(
    () => window.location.pathname + window.location.search,
  );

  useEffect(() => {
    const sync = () => {
      setPath(window.location.pathname + window.location.search);
    };

    window.addEventListener("popstate", sync);

    const { pushState, replaceState } = window.history;
    window.history.pushState = function (...args) {
      const result = pushState.apply(this, args);
      sync();
      return result;
    };
    window.history.replaceState = function (...args) {
      const result = replaceState.apply(this, args);
      sync();
      return result;
    };

    return () => {
      window.removeEventListener("popstate", sync);
      window.history.pushState = pushState;
      window.history.replaceState = replaceState;
    };
  }, []);

  return path;
}

export function CookieConsent() {
  const [status, setStatus] = useState<ConsentStatus>(null);
  const [ready, setReady] = useState(false);
  const path = useLocationPath();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    const stored = getStoredConsent();
    setStatus(stored);
    setReady(true);
    if (stored === "accepted") {
      enableTracking();
      trackConsentedPageView();
      lastTrackedPath.current =
        window.location.pathname + window.location.search;
    }
  }, []);

  useEffect(() => {
    if (!ready || status !== "accepted") return;
    if (lastTrackedPath.current === path) return;
    lastTrackedPath.current = path;
    trackConsentedPageView(path);
  }, [path, ready, status]);

  useEffect(() => {
    if (!ready || status !== null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [ready, status]);

  if (!ready || status !== null) return null;

  return (
    <div className={styles.root}>
      <div className={styles.backdrop} aria-hidden="true" />
      <div
        className={styles.banner}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-text"
      >
        <div className={styles.inner}>
          <div className={styles.copy}>
            <p id="cookie-consent-title" className={styles.title}>
              Cookies &amp; Analyse
            </p>
            <p id="cookie-consent-text" className={styles.text}>
              Wir nutzen Google Analytics und Meta Pixel, um Reichweite und
              Anfragen zu verstehen. Tracking startet erst nach Ihrer
              Bestätigung. Ablehnen ist jederzeit möglich – dann werden keine
              Analyse-Cookies gesetzt.
            </p>
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.decline}
              onClick={() => {
                declineConsent();
                setStatus("declined");
              }}
            >
              Ablehnen
            </button>
            <button
              type="button"
              className={styles.accept}
              onClick={() => {
                acceptConsent();
                lastTrackedPath.current =
                  window.location.pathname + window.location.search;
                setStatus("accepted");
                trackEvent("cookie_consent", { status: "accepted" });
              }}
            >
              Akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
