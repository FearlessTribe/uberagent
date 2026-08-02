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

type StrategyGuideBody = {
  name?: string;
  title?: string;
  company?: string;
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

async function createNotionPage(
  env: Env,
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
      parent: { database_id: env.NOTION_DATABASE_ID },
      properties,
      ...(children?.length ? { children } : {}),
    }),
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
  return createNotionPage(env, {
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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");

    if (url.pathname === "/api/potential-check" || url.pathname === "/api/strategy-guide") {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: corsHeaders(origin) });
      }

      if (request.method !== "POST") {
        return json({ error: "Method not allowed" }, 405, origin);
      }

      if (!env.NOTION_TOKEN || !env.NOTION_DATABASE_ID) {
        return json({ error: "Lead intake is not configured" }, 503, origin);
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

    return env.ASSETS.fetch(request);
  },
};
