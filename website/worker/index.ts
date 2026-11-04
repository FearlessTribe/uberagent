/**
 * Cloudflare Worker: serves the Vite SPA assets and handles lead intake (KV/admin).
 * Secrets: ADMIN_PASSWORD, ADMIN_SESSION_SECRET, TURNSTILE_SECRET
 * Optional for one-time Notion import: NOTION_TOKEN
 */
import { getServiceBySlug } from "../src/data/services";
import {
  getMaximIndustryBySlug,
  maximIndustryAliases,
} from "../src/data/maximIndustryContent";
import {
  handleAdminList,
  handleAdminLogin,
  handleAdminLogout,
  handleAdminPhoto,
  handleAdminSession,
  handleCardSubmit,
} from "./kollegenrundeAdmin";
import {
  completeKalkulationsSubmission,
  handleKalkAdminList,
  saveKalkulationsContact,
} from "./kalkulationsAdmin";
import {
  handleHelenaAdminList,
  handleNotionImport,
  handlePotentialAdminList,
  handleStrategyAdminList,
  saveHelenaLead,
  savePotentialLead,
  saveStrategyLead,
} from "./formLeadsAdmin";

export interface Env {
  ASSETS: Fetcher;
  NOTION_TOKEN?: string;
  NOTION_DATABASE_ID?: string;
  NOTION_KALKULATIONSCHECK_DATABASE_ID?: string;
  KOLLEGENRUNDE_SUBMISSIONS: KVNamespace;
  TURNSTILE_SECRET?: string;
  ADMIN_PASSWORD?: string;
  ADMIN_SESSION_SECRET?: string;
}

type PotentialCheckBody = {
  website?: string;
  name?: string;
  email?: string;
  phone?: string;
};

type StrategyGuideBody = {
  name?: string;
  title?: string;
  company?: string;
  email?: string;
  phone?: string;
};

type HelenaCheckBody = {
  name?: string;
  email?: string;
  phone?: string;
  consent?: boolean;
  customers?: number;
  contactsPerCustomer?: number;
  occasions?: number;
  avgValue?: number;
  recipients?: number;
  giftsYear?: number;
  volumeYear?: number;
};

type KalkulationsCheckBody = {
  stage?: "contact" | "complete";
  pageId?: string;
  name?: string;
  email?: string;
  phone?: string;
  website?: string;
  consent?: boolean;
  requestsPerDay?: number;
  minutesPerQuote?: number;
  hoursDay?: number;
  workDays?: number;
  hourlyRate?: number;
  extraOrdersWeek?: number;
  marginPerOrder?: number;
  hoursYear?: number;
  timeValue?: number;
  extraContribution?: number;
  total?: number;
};

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function applyHtmlSeo(
  html: string,
  title: string,
  description: string,
  canonical: string,
): string {
  const safeTitle = escapeHtmlAttr(title);
  const safeDesc = escapeHtmlAttr(description);
  const safeCanon = escapeHtmlAttr(canonical);

  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${safeTitle}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${safeDesc}" />`,
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${safeTitle}" />`,
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${safeDesc}" />`,
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:url" content="${safeCanon}" />`,
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${safeCanon}" />`,
    );
}

async function serveAssets(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const match = url.pathname.match(/^\/service\/([^/]+)(?:\/([^/]+))?\/?$/);
  const aliasTarget =
    match?.[1] === "kalkulations-agent" && match[2]
      ? maximIndustryAliases[match[2]]
      : undefined;
  if (aliasTarget) {
    url.pathname = `/service/kalkulations-agent/${aliasTarget}`;
    return Response.redirect(url.toString(), 301);
  }
  const service = match ? getServiceBySlug(match[1]) : undefined;
  const industryPage =
    match?.[1] === "kalkulations-agent"
      ? getMaximIndustryBySlug(match[2])
      : undefined;
  const res = await env.ASSETS.fetch(request);

  const isLeadmaschine =
    url.pathname === "/leadmaschine" || url.pathname === "/leadmaschine/";
  const seoTitle = isLeadmaschine
    ? "Leadmaschine für Versicherungsberatung | supragent"
    : (industryPage?.seoTitle ?? service?.seoTitle);
  const seoDescription = isLeadmaschine
    ? "Anfragen mit Kontext statt Leerformulare. Die Leadmaschine von supragent: Konfigurator, Datenprodukt und Lead-Übergabe für Broker und Spezialmakler."
    : (industryPage?.seoDescription ?? service?.seoDescription);
  if (!seoTitle || !seoDescription) return res;

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return res;

  const html = applyHtmlSeo(
    await res.text(),
    seoTitle,
    seoDescription,
    isLeadmaschine
      ? `${url.origin}/leadmaschine`
      : industryPage
        ? `${url.origin}/service/kalkulations-agent/${industryPage.slug}`
        : `${url.origin}/service/${service?.slug}`,
  );

  return new Response(html, {
    status: res.status,
    headers: res.headers,
  });
}

/** HTML5 video needs Accept-Ranges / 206; CF asset cache often ignores Range. */
async function serveVideo(request: Request, env: Env): Promise<Response> {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed", { status: 405 });
  }

  const url = new URL(request.url);
  const assetRes = await env.ASSETS.fetch(new Request(url.toString(), { method: "GET" }));
  if (!assetRes.ok) return assetRes;

  const buffer = await assetRes.arrayBuffer();
  const size = buffer.byteLength;
  const contentType = assetRes.headers.get("content-type") || "video/mp4";
  const rangeHeader = request.headers.get("Range");

  const baseHeaders = new Headers({
    "Content-Type": contentType,
    "Accept-Ranges": "bytes",
    "Cache-Control": "public, max-age=604800, immutable",
    "Cross-Origin-Resource-Policy": "same-origin",
  });

  if (request.method === "HEAD" && !rangeHeader) {
    baseHeaders.set("Content-Length", String(size));
    return new Response(null, { status: 200, headers: baseHeaders });
  }

  if (rangeHeader) {
    const match = /^bytes=(\d*)-(\d*)$/i.exec(rangeHeader.trim());
    if (!match) {
      return new Response(null, {
        status: 416,
        headers: { "Content-Range": `bytes */${size}` },
      });
    }

    let start = match[1] === "" ? 0 : Number.parseInt(match[1], 10);
    let end = match[2] === "" ? size - 1 : Number.parseInt(match[2], 10);

    if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0) {
      return new Response(null, {
        status: 416,
        headers: { "Content-Range": `bytes */${size}` },
      });
    }

    if (match[1] === "" && match[2] !== "") {
      // bytes=-N → last N bytes
      const suffix = end;
      start = Math.max(0, size - suffix);
      end = size - 1;
    }

    end = Math.min(end, size - 1);
    if (start >= size || start > end) {
      return new Response(null, {
        status: 416,
        headers: { "Content-Range": `bytes */${size}` },
      });
    }

    const chunk = buffer.slice(start, end + 1);
    baseHeaders.set("Content-Range", `bytes ${start}-${end}/${size}`);
    baseHeaders.set("Content-Length", String(chunk.byteLength));

    if (request.method === "HEAD") {
      return new Response(null, { status: 206, headers: baseHeaders });
    }
    return new Response(chunk, { status: 206, headers: baseHeaders });
  }

  baseHeaders.set("Content-Length", String(size));
  if (request.method === "HEAD") {
    return new Response(null, { status: 200, headers: baseHeaders });
  }
  return new Response(buffer, { status: 200, headers: baseHeaders });
}

function corsHeaders(origin: string | null): HeadersInit {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function json(data: unknown, status = 200, origin: string | null = null): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(origin),
    },
  });
}

function normalizeWebsite(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");

    if (url.pathname === "/api/kollegenrunde-card") {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: corsHeaders(origin) });
      }
      if (request.method !== "POST") {
        return json({ error: "Method not allowed" }, 405, origin);
      }
      const res = await handleCardSubmit(request, env);
      const headers = new Headers(res.headers);
      Object.entries(corsHeaders(origin)).forEach(([k, v]) => headers.set(k, v));
      return new Response(res.body, { status: res.status, headers });
    }

    if (url.pathname === "/api/admin/login") {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: corsHeaders(origin) });
      }
      if (request.method !== "POST") {
        return json({ error: "Method not allowed" }, 405, origin);
      }
      return handleAdminLogin(request, env);
    }

    if (url.pathname === "/api/admin/logout") {
      if (request.method !== "POST") {
        return json({ error: "Method not allowed" }, 405, origin);
      }
      return handleAdminLogout(request);
    }

    if (url.pathname === "/api/admin/session") {
      if (request.method !== "GET") {
        return json({ error: "Method not allowed" }, 405, origin);
      }
      return handleAdminSession(request, env);
    }

    if (url.pathname === "/api/admin/submissions") {
      if (request.method !== "GET") {
        return json({ error: "Method not allowed" }, 405, origin);
      }
      return handleAdminList(request, env);
    }

    if (url.pathname === "/api/admin/kalkulations") {
      if (request.method !== "GET") {
        return json({ error: "Method not allowed" }, 405, origin);
      }
      return handleKalkAdminList(request, env);
    }

    if (url.pathname === "/api/admin/potential") {
      if (request.method !== "GET") {
        return json({ error: "Method not allowed" }, 405, origin);
      }
      return handlePotentialAdminList(request, env);
    }

    if (url.pathname === "/api/admin/strategy") {
      if (request.method !== "GET") {
        return json({ error: "Method not allowed" }, 405, origin);
      }
      return handleStrategyAdminList(request, env);
    }

    if (url.pathname === "/api/admin/helena") {
      if (request.method !== "GET") {
        return json({ error: "Method not allowed" }, 405, origin);
      }
      return handleHelenaAdminList(request, env);
    }

    if (url.pathname === "/api/admin/import-notion") {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: corsHeaders(origin) });
      }
      if (request.method !== "POST") {
        return json({ error: "Method not allowed" }, 405, origin);
      }
      return handleNotionImport(request, env);
    }

    const photoMatch = url.pathname.match(/^\/api\/admin\/photo\/([^/]+)$/);
    if (photoMatch) {
      if (request.method !== "GET") {
        return json({ error: "Method not allowed" }, 405, origin);
      }
      return handleAdminPhoto(request, env, photoMatch[1]);
    }

    if (url.pathname === "/api/kalkulations-check") {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: corsHeaders(origin) });
      }
      if (request.method !== "POST") {
        return json({ error: "Method not allowed" }, 405, origin);
      }
      if (!env.KOLLEGENRUNDE_SUBMISSIONS) {
        return json({ error: "Speicher nicht konfiguriert." }, 503, origin);
      }

      let body: KalkulationsCheckBody;
      try {
        body = (await request.json()) as KalkulationsCheckBody;
      } catch {
        return json({ error: "Invalid JSON" }, 400, origin);
      }

      const stage = body.stage || "contact";

      if (stage === "contact") {
        const name = (body.name || "").trim();
        const email = (body.email || "").trim();
        const phone = (body.phone || "").trim();
        const website = normalizeWebsite(body.website || "");
        const consent = body.consent === true;
        const requestsPerDay = Number(body.requestsPerDay);
        const minutesPerQuote = Number(body.minutesPerQuote);
        const hoursDay = Number(body.hoursDay);

        if (!name || !email || !phone) {
          return json(
            { error: "Name, E-Mail und Telefon sind erforderlich." },
            400,
            origin,
          );
        }
        if (!consent) {
          return json(
            { error: "Bitte bestätigen Sie, dass wir Sie kontaktieren dürfen." },
            400,
            origin,
          );
        }
        if (!isValidEmail(email)) {
          return json({ error: "Bitte eine gültige E-Mail angeben." }, 400, origin);
        }
        if (!Number.isFinite(requestsPerDay) || !Number.isFinite(minutesPerQuote)) {
          return json({ error: "Bitte Anfragen und Zeit pro Angebot angeben." }, 400, origin);
        }
        if (!Number.isFinite(hoursDay)) {
          return json({ error: "Bitte die Stunden pro Tag angeben." }, 400, origin);
        }
        if (website) {
          try {
            new URL(website);
          } catch {
            return json({ error: "Bitte eine gültige Website-URL angeben." }, 400, origin);
          }
        }

        try {
          const saved = await saveKalkulationsContact(env, {
            name,
            email,
            phone,
            consent,
            requestsPerDay,
            minutesPerQuote,
            hoursDay,
            ...(website ? { website } : {}),
          });
          return json({ ok: true, pageId: saved.id }, 200, origin);
        } catch (err) {
          console.error(err);
          return json(
            { error: "Lead konnte nicht gespeichert werden." },
            502,
            origin,
          );
        }
      }

      const pageId = (body.pageId || "").trim();
      const workDays = Number(body.workDays);
      const hourlyRate = Number(body.hourlyRate);
      const extraOrdersWeek = Number(body.extraOrdersWeek);
      const marginPerOrder = Number(body.marginPerOrder);
      const hoursYear = Number(body.hoursYear);
      const timeValue = Number(body.timeValue);
      const extraContribution = Number(body.extraContribution);
      const total = Number(body.total);

      if (!pageId) {
        return json({ error: "Lead-Referenz fehlt." }, 400, origin);
      }

      if (
        !Number.isFinite(workDays) ||
        !Number.isFinite(hourlyRate) ||
        !Number.isFinite(extraOrdersWeek) ||
        !Number.isFinite(marginPerOrder) ||
        !Number.isFinite(hoursYear) ||
        !Number.isFinite(timeValue) ||
        !Number.isFinite(extraContribution) ||
        !Number.isFinite(total)
      ) {
        return json({ error: "Bitte alle Metriken ausfüllen." }, 400, origin);
      }

      try {
        const updated = await completeKalkulationsSubmission(env, pageId, {
          workDays,
          hourlyRate,
          extraOrdersWeek,
          marginPerOrder,
          hoursYear,
          timeValue,
          extraContribution,
          total,
        });
        if (!updated) {
          return json({ error: "Lead-Referenz ungültig." }, 404, origin);
        }
        return json({ ok: true }, 200, origin);
      } catch (err) {
        console.error(err);
        return json(
          { error: "Auswertung konnte nicht gespeichert werden." },
          502,
          origin,
        );
      }
    }

    if (
      url.pathname === "/api/potential-check" ||
      url.pathname === "/api/strategy-guide" ||
      url.pathname === "/api/helena-check"
    ) {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: corsHeaders(origin) });
      }

      if (request.method !== "POST") {
        return json({ error: "Method not allowed" }, 405, origin);
      }

      if (!env.KOLLEGENRUNDE_SUBMISSIONS) {
        return json({ error: "Speicher nicht konfiguriert." }, 503, origin);
      }

      if (url.pathname === "/api/strategy-guide") {
        let body: StrategyGuideBody;
        try {
          body = (await request.json()) as StrategyGuideBody;
        } catch {
          return json({ error: "Invalid JSON" }, 400, origin);
        }

        const name = (body.name || "").trim();
        const title = (body.title || "").trim();
        const company = (body.company || "").trim();
        const email = (body.email || "").trim();
        const phone = (body.phone || "").trim();

        if (!name || !title || !company || !email || !phone) {
          return json(
            { error: "Name, Titel, Firma, E-Mail und Telefon sind erforderlich." },
            400,
            origin,
          );
        }

        if (!isValidEmail(email)) {
          return json({ error: "Bitte eine gültige E-Mail angeben." }, 400, origin);
        }

        try {
          await saveStrategyLead(env, { name, title, company, email, phone });
          return json({ ok: true }, 200, origin);
        } catch (err) {
          console.error(err);
          return json({ error: "Lead konnte nicht gespeichert werden." }, 502, origin);
        }
      }

      if (url.pathname === "/api/helena-check") {
        let body: HelenaCheckBody;
        try {
          body = (await request.json()) as HelenaCheckBody;
        } catch {
          return json({ error: "Invalid JSON" }, 400, origin);
        }

        const name = (body.name || "").trim();
        const email = (body.email || "").trim();
        const phone = (body.phone || "").trim();
        const consent = body.consent === true;
        const customers = Number(body.customers);
        const contactsPerCustomer = Number(body.contactsPerCustomer);
        const occasions = Number(body.occasions);
        const avgValue = Number(body.avgValue);
        const recipients = Number(body.recipients);
        const giftsYear = Number(body.giftsYear);
        const volumeYear = Number(body.volumeYear);

        if (!name || !email || !phone) {
          return json(
            { error: "Name, E-Mail und Telefon sind erforderlich." },
            400,
            origin,
          );
        }

        if (!isValidEmail(email)) {
          return json({ error: "Bitte eine gültige E-Mail angeben." }, 400, origin);
        }

        if (!consent) {
          return json({ error: "Bitte die Kontaktaufnahme bestätigen." }, 400, origin);
        }

        if (
          !Number.isFinite(customers) ||
          !Number.isFinite(contactsPerCustomer) ||
          !Number.isFinite(occasions) ||
          !Number.isFinite(avgValue) ||
          customers <= 0 ||
          contactsPerCustomer <= 0 ||
          occasions <= 0 ||
          avgValue <= 0
        ) {
          return json({ error: "Bitte alle Kennzahlen ausfüllen." }, 400, origin);
        }

        try {
          await saveHelenaLead(env, {
            name,
            email,
            phone,
            consent,
            customers,
            contactsPerCustomer,
            occasions,
            avgValue,
            recipients: Number.isFinite(recipients) ? recipients : customers * contactsPerCustomer,
            giftsYear: Number.isFinite(giftsYear)
              ? giftsYear
              : customers * contactsPerCustomer * occasions,
            volumeYear: Number.isFinite(volumeYear)
              ? volumeYear
              : customers * contactsPerCustomer * occasions * avgValue,
          });
          return json({ ok: true }, 200, origin);
        } catch (err) {
          console.error(err);
          return json({ error: "Lead konnte nicht gespeichert werden." }, 502, origin);
        }
      }

      let body: PotentialCheckBody;
      try {
        body = (await request.json()) as PotentialCheckBody;
      } catch {
        return json({ error: "Invalid JSON" }, 400, origin);
      }

      const name = (body.name || "").trim();
      const email = (body.email || "").trim();
      const phone = (body.phone || "").trim();
      const website = normalizeWebsite(body.website || "");

      if (!website || !name || !email) {
        return json({ error: "Website, Name und E-Mail sind erforderlich." }, 400, origin);
      }

      if (!isValidEmail(email)) {
        return json({ error: "Bitte eine gültige E-Mail angeben." }, 400, origin);
      }

      try {
        new URL(website);
      } catch {
        return json({ error: "Bitte eine gültige Website-URL angeben." }, 400, origin);
      }

      try {
        await savePotentialLead(env, { website, name, email, phone });
        return json({ ok: true }, 200, origin);
      } catch (err) {
        console.error(err);
        return json({ error: "Lead konnte nicht gespeichert werden." }, 502, origin);
      }
    }

    if (url.pathname.startsWith("/video/")) {
      return serveVideo(request, env);
    }

    return serveAssets(request, env);
  },
};
