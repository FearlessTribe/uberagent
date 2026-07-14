declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = "G-MCPYJ7SKTR";

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

/** CTA that scrolls users to the footer / contact section */
export function trackContactCta(location: string) {
  trackEvent("cta_contact", {
    location,
    destination: "contact",
  });
}

/** Click on the Calendly booking link */
export function trackCalendlyClick(location: string) {
  trackEvent("calendly_click", {
    location,
    link_url: "https://calendly.com/supraflow/30min",
  });
}
