import { GA_MEASUREMENT_ID } from "./analytics";

export type ConsentStatus = "accepted" | "declined" | null;

export const META_PIXEL_ID = "2587627811749360";
export const CONSENT_STORAGE_KEY = "uberagent_cookie_consent_v1";

type FbqCommand = (...args: unknown[]) => void;

interface FbqFn {
  (...args: unknown[]): void;
  callMethod?: FbqCommand;
  queue: unknown[];
  push: FbqFn;
  loaded: boolean;
  version: string;
}

declare global {
  interface Window {
    dataLayer?: IArguments[];
    gtag?: (...args: unknown[]) => void;
    fbq?: FbqFn;
    _fbq?: FbqFn;
  }
}

let scriptsLoaded = false;

export function getStoredConsent(): ConsentStatus {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (value === "accepted" || value === "declined") return value;
  } catch {
    /* private mode / blocked storage */
  }
  return null;
}

export function storeConsent(status: Exclude<ConsentStatus, null>) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, status);
  } catch {
    /* private mode / blocked storage */
  }
}

/** Official gtag stub: must push `arguments`, not a rest Array. */
function ensureGtagStub() {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === "function") return;

  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
}

function loadGoogleAnalytics() {
  if (document.getElementById("ga-gtag")) return;

  ensureGtagStub();

  const script = document.createElement("script");
  script.id = "ga-gtag";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.gtag!("js", new Date());
}

function loadMetaPixel() {
  if (document.getElementById("meta-pixel")) return;

  const fbq = function (...args: unknown[]) {
    const self = fbq as FbqFn;
    if (typeof self.callMethod === "function") {
      self.callMethod(...args);
    } else {
      self.queue.push(args);
    }
  } as FbqFn;

  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.push = fbq;

  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.id = "meta-pixel";
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  const first = document.getElementsByTagName("script")[0];
  first?.parentNode?.insertBefore(script, first);

  window.fbq("init", META_PIXEL_ID);
}

/** Load GA + Meta Pixel once. Safe to call repeatedly after accept. */
export function enableTracking() {
  if (typeof window === "undefined" || scriptsLoaded) return;
  scriptsLoaded = true;
  loadGoogleAnalytics();
  loadMetaPixel();
}

export function trackConsentedPageView(
  path = window.location.pathname + window.location.search,
) {
  if (typeof window === "undefined") return;
  if (getStoredConsent() !== "accepted") return;

  enableTracking();

  /* GA4: each config call with page_path sends a page_view. */
  window.gtag?.("config", GA_MEASUREMENT_ID, {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });

  window.fbq?.("track", "PageView");
}

export function acceptConsent() {
  storeConsent("accepted");
  enableTracking();
  trackConsentedPageView();
}

export function declineConsent() {
  storeConsent("declined");
}
