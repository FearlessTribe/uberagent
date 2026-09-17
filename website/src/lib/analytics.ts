export const GA_MEASUREMENT_ID = "G-MCPYJ7SKTR";
export const CALENDLY_URL = "https://calendly.com/supraflow/30min";

/** Fires only after cookie consent; gtag is injected by `lib/consent`. */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

/** Meta Pixel standard or custom event – only after consent. */
export function trackMetaEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
  options?: { custom?: boolean },
) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  if (options?.custom) {
    window.fbq("trackCustom", eventName, params);
  } else {
    window.fbq("track", eventName, params);
  }
}

/**
 * Termin / Erstgespräch CTA – Google Analytics + Meta Pixel.
 * Used for Calendly links and in-page “Erstgespräch sichern” buttons.
 */
export function trackTerminClick(
  location: string,
  options?: { linkUrl?: string },
) {
  const linkUrl = options?.linkUrl ?? CALENDLY_URL;

  trackEvent("termin_click", {
    location,
    link_url: linkUrl,
  });

  trackMetaEvent("Schedule", {
    content_name: location,
    content_category: "erstgespraech",
  });

  trackMetaEvent(
    "TerminClick",
    {
      location,
      link_url: linkUrl,
    },
    { custom: true },
  );
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
  trackTerminClick(location, { linkUrl: CALENDLY_URL });
}

/** Service detail opened (grid, nav, deep link, cross-links). */
export function trackServiceView(serviceId: string, subpath?: string | null) {
  trackEvent("service_view", {
    service_id: serviceId,
    ...(subpath ? { subpath } : {}),
  });

  trackMetaEvent("ViewContent", {
    content_name: serviceId,
    content_category: subpath ? "service_subpage" : "service",
    content_type: "product",
  });
}

/** Case study / project detail opened. */
export function trackProjectView(projectId: string) {
  trackEvent("project_view", {
    project_id: projectId,
  });

  trackMetaEvent("ViewContent", {
    content_name: projectId,
    content_category: "case",
    content_type: "product",
  });
}

/** Team / founder profile modal opened. */
export function trackProfileView(profileId: string) {
  trackEvent("profile_view", {
    profile_id: profileId,
  });

  trackMetaEvent(
    "ProfileView",
    { profile_id: profileId },
    { custom: true },
  );
}

/** In-page section navigation (Services, Team, …). */
export function trackSectionNav(sectionId: string, location = "nav") {
  trackEvent("section_nav", {
    section_id: sectionId,
    location,
  });
}

/** Outbound link (mailto, LinkedIn, live demo, …). */
export function trackOutboundClick(
  destination: string,
  options?: { url?: string; location?: string },
) {
  trackEvent("outbound_click", {
    destination,
    ...(options?.url ? { link_url: options.url } : {}),
    ...(options?.location ? { location: options.location } : {}),
  });

  trackMetaEvent(
    "OutboundClick",
    {
      destination,
      ...(options?.location ? { location: options.location } : {}),
    },
    { custom: true },
  );
}

/**
 * Lead / form conversion – GA custom + Meta Lead.
 * `form` identifies the funnel (potential_check, kalkulations_check, …).
 */
export function trackLead(
  form: string,
  params?: Record<string, string | number | boolean>,
) {
  trackEvent("generate_lead", {
    form,
    ...params,
  });

  trackMetaEvent("Lead", {
    content_name: form,
    ...params,
  });
}

/** AI Potenzial-Check: URL step submitted */
export function trackPotentialCheckUrl() {
  trackEvent("potential_check_url", {
    step: "url",
  });

  trackMetaEvent(
    "PotentialCheckStart",
    { step: "url" },
    { custom: true },
  );
}

/** AI Potenzial-Check: lead form submitted */
export function trackPotentialCheckLead() {
  trackEvent("potential_check_lead", { step: "lead" });
  trackLead("potential_check", { step: "lead" });
}

/** Kalkulations-Check: metric step completed */
export function trackKalkulationsCheckStep(step: string) {
  trackEvent("kalkulations_check_step", { step });
}

/** Kalkulations-Check: lead submitted */
export function trackKalkulationsCheckLead() {
  trackEvent("kalkulations_check_lead", { step: "submit" });
  trackLead("kalkulations_check", { step: "submit" });
}

/** Helena Anlass-Check: lead submitted */
export function trackHelenaCheckLead() {
  trackEvent("helena_check_lead", { step: "submit" });
  trackLead("helena_check", { step: "submit" });
}

/** AI Strategy Guide one-pager download */
export function trackStrategyGuideDownload() {
  trackEvent("strategy_guide_download", {
    asset: "ai_strategy_implementation_management",
  });

  trackLead("strategy_guide", {
    asset: "ai_strategy_implementation_management",
  });

  trackMetaEvent(
    "GuideDownload",
    { asset: "ai_strategy_implementation_management" },
    { custom: true },
  );
}
