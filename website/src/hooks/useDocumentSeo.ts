import { useEffect } from "react";

export interface DocumentSeo {
  title: string;
  description: string;
  canonical?: string;
}

const DESCRIPTION_SELECTOR = 'meta[name="description"]';
const OG_TITLE_SELECTOR = 'meta[property="og:title"]';
const OG_DESC_SELECTOR = 'meta[property="og:description"]';
const OG_URL_SELECTOR = 'meta[property="og:url"]';
const CANONICAL_SELECTOR = 'link[rel="canonical"]';
const JSON_LD_ID = "service-jsonld";

function upsertMeta(selector: string, attr: string, name: string, value: string) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector(CANONICAL_SELECTOR) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

export function useDocumentSeo(seo: DocumentSeo | null) {
  useEffect(() => {
    if (!seo) return;

    const prevTitle = document.title;
    const desc = document.head.querySelector(DESCRIPTION_SELECTOR);
    const prevDesc = desc?.getAttribute("content") ?? "";
    const ogTitle = document.head.querySelector(OG_TITLE_SELECTOR);
    const prevOgTitle = ogTitle?.getAttribute("content") ?? "";
    const ogDesc = document.head.querySelector(OG_DESC_SELECTOR);
    const prevOgDesc = ogDesc?.getAttribute("content") ?? "";
    const ogUrl = document.head.querySelector(OG_URL_SELECTOR);
    const prevOgUrl = ogUrl?.getAttribute("content") ?? "";
    const canonical = document.head.querySelector(CANONICAL_SELECTOR) as HTMLLinkElement | null;
    const prevCanonical = canonical?.href ?? "";
    const jsonLd = document.getElementById(JSON_LD_ID);

    document.title = seo.title;
    upsertMeta(DESCRIPTION_SELECTOR, "name", "description", seo.description);
    upsertMeta(OG_TITLE_SELECTOR, "property", "og:title", seo.title);
    upsertMeta(OG_DESC_SELECTOR, "property", "og:description", seo.description);
    if (seo.canonical) {
      upsertMeta(OG_URL_SELECTOR, "property", "og:url", seo.canonical);
      upsertCanonical(seo.canonical);
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = JSON_LD_ID;
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      name: seo.title,
      description: seo.description,
      provider: {
        "@type": "ProfessionalService",
        name: "uberagent",
        url: "https://ueberagent.com",
      },
      ...(seo.canonical ? { url: seo.canonical } : {}),
    });
    jsonLd?.remove();
    document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      desc?.setAttribute("content", prevDesc);
      if (ogTitle) ogTitle.setAttribute("content", prevOgTitle);
      if (ogDesc) ogDesc.setAttribute("content", prevOgDesc);
      if (ogUrl) ogUrl.setAttribute("content", prevOgUrl);
      if (canonical && prevCanonical) canonical.href = prevCanonical;
      document.getElementById(JSON_LD_ID)?.remove();
    };
  }, [seo]);
}
