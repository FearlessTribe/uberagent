/**
 * Cloudflare Worker: serves the Vite SPA assets and handles lead intake.
 * Secrets: NOTION_TOKEN, NOTION_DATABASE_ID
 */
export interface Env {
  ASSETS: Fetcher;
  NOTION_TOKEN: string;
  NOTION_DATABASE_ID: string;
}

type PotentialCheckBody = {
  website?: string;
  name?: string;
  email?: string;
  phone?: string;
};

const NOTION_VERSION = "2022-06-28";

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

async function createNotionLead(env: Env, payload: Required<PotentialCheckBody>) {
  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.NOTION_TOKEN}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: env.NOTION_DATABASE_ID },
      properties: {
        Name: {
          title: [{ text: { content: payload.name } }],
        },
        "E-Mail": { email: payload.email },
        Website: { url: payload.website },
        Status: { select: { name: "Neu" } },
        ...(payload.phone
          ? { Telefon: { phone_number: payload.phone } }
          : {}),
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Notion error ${res.status}: ${err}`);
  }

  return res.json();
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");

    if (url.pathname === "/api/potential-check") {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: corsHeaders(origin) });
      }

      if (request.method !== "POST") {
        return json({ error: "Method not allowed" }, 405, origin);
      }

      if (!env.NOTION_TOKEN || !env.NOTION_DATABASE_ID) {
        return json({ error: "Lead intake is not configured" }, 503, origin);
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
        await createNotionLead(env, { website, name, email, phone });
        return json({ ok: true }, 200, origin);
      } catch (err) {
        console.error(err);
        return json({ error: "Lead konnte nicht gespeichert werden." }, 502, origin);
      }
    }

    return env.ASSETS.fetch(request);
  },
};
