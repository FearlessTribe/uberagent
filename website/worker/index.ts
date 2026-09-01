/**
 * Cloudflare Worker: serves the Vite SPA assets and handles lead intake.
 * Secrets: NOTION_TOKEN, NOTION_DATABASE_ID
 */
import { getServiceBySlug } from "../src/data/services";

export interface Env {
  ASSETS: Fetcher;
  NOTION_TOKEN: string;
  NOTION_DATABASE_ID: string;
  NOTION_KALKULATIONSCHECK_DATABASE_ID: string;
}

const NOTION_VERSION = "2022-06-28";

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
  const match = url.pathname.match(/^\/service\/([^/]+)\/?$/);
  const service = match ? getServiceBySlug(match[1]) : undefined;
  const res = await env.ASSETS.fetch(request);

  if (!service?.seoTitle || !service.seoDescription) return res;

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return res;

  const html = applyHtmlSeo(
    await res.text(),
    service.seoTitle,
    service.seoDescription,
    `${url.origin}/service/${service.slug}`,
  );

  return new Response(html, {
    status: res.status,
    headers: res.headers,
  });
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

function notionSaveError(err: unknown, fallback: string): string {
  const message = err instanceof Error ? err.message : String(err);
  if (
    message.includes("404") ||
    message.includes("object_not_found") ||
    message.includes("restricted_resource")
  ) {
    return "Notion-Datenbank ist nicht mit der Integration „uberagent website“ verbunden.";
  }
  return fallback;
}

async function createNotionPage(
  env: Env,
  databaseId: string,
  properties: Record<string, unknown>,
  children?: unknown[],
) {
  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.NOTION_TOKEN}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties,
      ...(children?.length ? { children } : {}),
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Notion error ${res.status}: ${err}`);
  }

  return res.json() as Promise<{ id: string }>;
}

async function updateNotionPage(
  env: Env,
  pageId: string,
  properties: Record<string, unknown>,
) {
  const res = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${env.NOTION_TOKEN}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ properties }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Notion error ${res.status}: ${err}`);
  }

  return res.json();
}

async function createPotentialCheckLead(
  env: Env,
  payload: Required<PotentialCheckBody>,
) {
  return createNotionPage(env, env.NOTION_DATABASE_ID, {
    Name: {
      title: [{ text: { content: payload.name } }],
    },
    "E-Mail": { email: payload.email },
    Website: { url: payload.website },
    Status: { select: { name: "Neu" } },
    ...(payload.phone ? { Telefon: { phone_number: payload.phone } } : {}),
  });
}

async function createStrategyGuideLead(
  env: Env,
  payload: Required<StrategyGuideBody>,
) {
  const detail = [
    `Quelle: AI Strategy Guide Download`,
    `Titel: ${payload.title}`,
    `Firma: ${payload.company}`,
  ].join("\n");

  return createNotionPage(
    env,
    env.NOTION_DATABASE_ID,
    {
      Name: {
        title: [
          {
            text: {
              content: `${payload.name} · ${payload.title} · ${payload.company}`.slice(
                0,
                2000,
              ),
            },
          },
        ],
      },
      "E-Mail": { email: payload.email },
      Status: { select: { name: "Neu" } },
      Telefon: { phone_number: payload.phone },
    },
    [
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [{ type: "text", text: { content: detail } }],
        },
      },
    ],
  );
}

async function createHelenaCheckLead(
  env: Env,
  payload: {
    name: string;
    email: string;
    phone: string;
    customers: number;
    contactsPerCustomer: number;
    occasions: number;
    avgValue: number;
    recipients: number;
    giftsYear: number;
    volumeYear: number;
  },
) {
  const detail = [
    `Quelle: Helena kostenloser Check`,
    `Kunden: ${payload.customers}`,
    `Ø Kunden ihrer Kunden: ${payload.contactsPerCustomer}`,
    `Anlässe/Jahr: ${payload.occasions}`,
    `Durchschnittswert: ${payload.avgValue} €`,
    `Empfänger: ${payload.recipients}`,
    `Geschenke/Jahr: ${payload.giftsYear}`,
    `Warenwert/Jahr: ${Math.round(payload.volumeYear)} €`,
  ].join("\n");

  return createNotionPage(
    env,
    env.NOTION_DATABASE_ID,
    {
      Name: {
        title: [{ text: { content: payload.name } }],
      },
      "E-Mail": { email: payload.email },
      Status: { select: { name: "Neu" } },
      Telefon: { phone_number: payload.phone },
    },
    [
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [{ type: "text", text: { content: detail } }],
        },
      },
    ],
  );
}

async function createKalkulationsCheckLead(
  env: Env,
  payload: Required<
    Pick<
      KalkulationsCheckBody,
      "name" | "email" | "phone" | "consent" | "requestsPerDay" | "minutesPerQuote" | "hoursDay"
    > & {
      website?: string;
    }
  >,
) {
  const detail = [
    `Anfragen/Tag: ${payload.requestsPerDay}`,
    `Minuten/Angebot: ${payload.minutesPerQuote}`,
    `Std./Tag (berechnet): ${Number(payload.hoursDay.toFixed(1))}`,
  ].join("\n");

  return createNotionPage(
    env,
    env.NOTION_KALKULATIONSCHECK_DATABASE_ID,
    {
      Name: {
        title: [{ text: { content: payload.name } }],
      },
      "E-Mail": { email: payload.email },
      Telefon: { phone_number: payload.phone },
      ...(payload.website ? { Website: { url: payload.website } } : {}),
      "Kontakt erlaubt": { checkbox: payload.consent },
      Status: { select: { name: "Neu" } },
      "Std./Tag Angebote": { number: payload.hoursDay },
    },
    [
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [{ type: "text", text: { content: detail } }],
        },
      },
    ],
  );
}

async function completeKalkulationsCheckLead(
  env: Env,
  pageId: string,
  payload: Required<
    Pick<
      KalkulationsCheckBody,
      | "workDays"
      | "hourlyRate"
      | "extraOrdersWeek"
      | "marginPerOrder"
      | "hoursYear"
      | "timeValue"
      | "extraContribution"
      | "total"
    >
  >,
) {
  return updateNotionPage(env, pageId, {
    Arbeitstage: { number: payload.workDays },
    Stundenwert: { number: payload.hourlyRate },
    "Extra Aufträge/Woche": { number: payload.extraOrdersWeek },
    Deckungsbeitrag: { number: payload.marginPerOrder },
    "Zeitwert/Jahr": { number: payload.timeValue },
    "Nutzen gesamt": { number: payload.total },
    Status: { select: { name: "Metriken erfasst" } },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");

    if (
      url.pathname === "/api/potential-check" ||
      url.pathname === "/api/strategy-guide" ||
      url.pathname === "/api/kalkulations-check" ||
      url.pathname === "/api/helena-check"
    ) {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: corsHeaders(origin) });
      }

      if (request.method !== "POST") {
        return json({ error: "Method not allowed" }, 405, origin);
      }

      if (!env.NOTION_TOKEN || !env.NOTION_DATABASE_ID) {
        const missing = [
          !env.NOTION_TOKEN ? "NOTION_TOKEN" : null,
          !env.NOTION_DATABASE_ID ? "NOTION_DATABASE_ID" : null,
        ].filter(Boolean);
        return json(
          {
            error: "Lead intake is not configured",
            missing,
          },
          503,
          origin,
        );
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
          await createStrategyGuideLead(env, { name, title, company, email, phone });
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
          await createHelenaCheckLead(env, {
            name,
            email,
            phone,
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
          return json(
            { error: notionSaveError(err, "Lead konnte nicht gespeichert werden.") },
            502,
            origin,
          );
        }
      }

      if (url.pathname === "/api/kalkulations-check") {
        if (!env.NOTION_TOKEN || !env.NOTION_KALKULATIONSCHECK_DATABASE_ID) {
          const missing = [
            !env.NOTION_TOKEN ? "NOTION_TOKEN" : null,
            !env.NOTION_KALKULATIONSCHECK_DATABASE_ID
              ? "NOTION_KALKULATIONSCHECK_DATABASE_ID"
              : null,
          ].filter(Boolean);
          return json(
            {
              error: "Kalkulationscheck ist nicht konfiguriert",
              missing,
            },
            503,
            origin,
          );
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
            const page = await createKalkulationsCheckLead(env, {
              name,
              email,
              phone,
              consent,
              requestsPerDay,
              minutesPerQuote,
              hoursDay,
              ...(website ? { website } : {}),
            });
            return json({ ok: true, pageId: page.id }, 200, origin);
          } catch (err) {
            console.error(err);
            return json(
              { error: notionSaveError(err, "Lead konnte nicht gespeichert werden.") },
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
          await completeKalkulationsCheckLead(env, pageId, {
            workDays,
            hourlyRate,
            extraOrdersWeek,
            marginPerOrder,
            hoursYear,
            timeValue,
            extraContribution,
            total,
          });
          return json({ ok: true }, 200, origin);
        } catch (err) {
          console.error(err);
          return json(
            { error: notionSaveError(err, "Auswertung konnte nicht gespeichert werden.") },
            502,
            origin,
          );
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
        await createPotentialCheckLead(env, { website, name, email, phone });
        return json({ ok: true }, 200, origin);
      } catch (err) {
        console.error(err);
        return json({ error: "Lead konnte nicht gespeichert werden." }, 502, origin);
      }
    }

    return serveAssets(request, env);
  },
};
