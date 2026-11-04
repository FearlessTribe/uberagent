import { isAdminAuthenticated, type CardBindings } from "./kollegenrundeAdmin";

export type PotentialLead = {
  id: string;
  createdAt: string;
  source?: "live" | "notion-import";
  name: string;
  email: string;
  phone: string;
  website: string;
};

export type StrategyLead = {
  id: string;
  createdAt: string;
  source?: "live" | "notion-import";
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
};

export type HelenaLead = {
  id: string;
  createdAt: string;
  source?: "live" | "notion-import";
  name: string;
  email: string;
  phone: string;
  consent: boolean;
  customers: number;
  contactsPerCustomer: number;
  occasions: number;
  avgValue: number;
  recipients: number;
  giftsYear: number;
  volumeYear: number;
};

type LeadKind = "potential" | "strategy" | "helena";

function indexKey(kind: LeadKind) {
  return `lead:${kind}:index`;
}

function metaKey(kind: LeadKind, id: string) {
  return `lead:${kind}:${id}:meta`;
}

function jsonResponse(data: unknown, status = 200, headers: HeadersInit = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}

async function readIndex(kv: KVNamespace, kind: LeadKind): Promise<string[]> {
  const raw = await kv.get(indexKey(kind));
  if (!raw) return [];
  try {
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

async function writeIndex(kv: KVNamespace, kind: LeadKind, ids: string[]) {
  await kv.put(indexKey(kind), JSON.stringify(ids.slice(0, 500)));
}

async function saveLead<T extends { id: string }>(
  kv: KVNamespace,
  kind: LeadKind,
  meta: T,
): Promise<T> {
  await kv.put(metaKey(kind, meta.id), JSON.stringify(meta));
  const index = await readIndex(kv, kind);
  if (!index.includes(meta.id)) {
    index.unshift(meta.id);
    await writeIndex(kv, kind, index);
  }
  return meta;
}

export async function savePotentialLead(
  env: CardBindings,
  payload: Omit<PotentialLead, "id" | "createdAt" | "source"> & {
    id?: string;
    createdAt?: string;
    source?: PotentialLead["source"];
  },
): Promise<PotentialLead> {
  if (!env.KOLLEGENRUNDE_SUBMISSIONS) throw new Error("Speicher nicht konfiguriert.");
  const meta: PotentialLead = {
    id: payload.id || crypto.randomUUID(),
    createdAt: payload.createdAt || new Date().toISOString(),
    source: payload.source || "live",
    name: payload.name.slice(0, 120),
    email: payload.email.slice(0, 160),
    phone: (payload.phone || "").slice(0, 60),
    website: payload.website.slice(0, 200),
  };
  return saveLead(env.KOLLEGENRUNDE_SUBMISSIONS, "potential", meta);
}

export async function saveStrategyLead(
  env: CardBindings,
  payload: Omit<StrategyLead, "id" | "createdAt" | "source"> & {
    id?: string;
    createdAt?: string;
    source?: StrategyLead["source"];
  },
): Promise<StrategyLead> {
  if (!env.KOLLEGENRUNDE_SUBMISSIONS) throw new Error("Speicher nicht konfiguriert.");
  const meta: StrategyLead = {
    id: payload.id || crypto.randomUUID(),
    createdAt: payload.createdAt || new Date().toISOString(),
    source: payload.source || "live",
    name: payload.name.slice(0, 120),
    title: payload.title.slice(0, 120),
    company: payload.company.slice(0, 160),
    email: payload.email.slice(0, 160),
    phone: payload.phone.slice(0, 60),
  };
  return saveLead(env.KOLLEGENRUNDE_SUBMISSIONS, "strategy", meta);
}

export async function saveHelenaLead(
  env: CardBindings,
  payload: Omit<HelenaLead, "id" | "createdAt" | "source"> & {
    id?: string;
    createdAt?: string;
    source?: HelenaLead["source"];
  },
): Promise<HelenaLead> {
  if (!env.KOLLEGENRUNDE_SUBMISSIONS) throw new Error("Speicher nicht konfiguriert.");
  const meta: HelenaLead = {
    id: payload.id || crypto.randomUUID(),
    createdAt: payload.createdAt || new Date().toISOString(),
    source: payload.source || "live",
    name: payload.name.slice(0, 120),
    email: payload.email.slice(0, 160),
    phone: payload.phone.slice(0, 60),
    consent: payload.consent,
    customers: payload.customers,
    contactsPerCustomer: payload.contactsPerCustomer,
    occasions: payload.occasions,
    avgValue: payload.avgValue,
    recipients: payload.recipients,
    giftsYear: payload.giftsYear,
    volumeYear: payload.volumeYear,
  };
  return saveLead(env.KOLLEGENRUNDE_SUBMISSIONS, "helena", meta);
}

async function listLeads<T>(
  request: Request,
  env: CardBindings,
  kind: LeadKind,
): Promise<Response> {
  if (!(await isAdminAuthenticated(request, env))) {
    return jsonResponse({ error: "Nicht angemeldet." }, 401);
  }
  if (!env.KOLLEGENRUNDE_SUBMISSIONS) {
    return jsonResponse({ error: "Speicher nicht konfiguriert." }, 503);
  }

  const ids = await readIndex(env.KOLLEGENRUNDE_SUBMISSIONS, kind);
  const items: T[] = [];
  for (const id of ids.slice(0, 100)) {
    const raw = await env.KOLLEGENRUNDE_SUBMISSIONS.get(metaKey(kind, id));
    if (!raw) continue;
    try {
      items.push(JSON.parse(raw) as T);
    } catch {
      /* skip */
    }
  }
  return jsonResponse({ ok: true, items });
}

export function handlePotentialAdminList(request: Request, env: CardBindings) {
  return listLeads<PotentialLead>(request, env, "potential");
}

export function handleStrategyAdminList(request: Request, env: CardBindings) {
  return listLeads<StrategyLead>(request, env, "strategy");
}

export function handleHelenaAdminList(request: Request, env: CardBindings) {
  return listLeads<HelenaLead>(request, env, "helena");
}

type NotionEnv = CardBindings & {
  NOTION_TOKEN?: string;
  NOTION_DATABASE_ID?: string;
  NOTION_KALKULATIONSCHECK_DATABASE_ID?: string;
};

type NotionProp = Record<string, unknown>;

function richText(prop: NotionProp | undefined): string {
  const arr = (prop?.rich_text || prop?.title) as { plain_text?: string }[] | undefined;
  if (!Array.isArray(arr)) return "";
  return arr.map((t) => t.plain_text || "").join("").trim();
}

function propEmail(prop: NotionProp | undefined): string {
  return String(prop?.email || "").trim();
}

function propPhone(prop: NotionProp | undefined): string {
  return String(prop?.phone_number || "").trim();
}

function propUrl(prop: NotionProp | undefined): string {
  return String(prop?.url || "").trim();
}

function propNumber(prop: NotionProp | undefined): number | undefined {
  const n = prop?.number;
  return typeof n === "number" && Number.isFinite(n) ? n : undefined;
}

function propCheckbox(prop: NotionProp | undefined): boolean {
  return Boolean(prop?.checkbox);
}

async function notionQueryAll(
  token: string,
  databaseId: string,
): Promise<Record<string, unknown>[]> {
  const pages: Record<string, unknown>[] = [];
  let cursor: string | undefined;
  do {
    const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page_size: 100,
        ...(cursor ? { start_cursor: cursor } : {}),
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Notion query failed (${res.status}): ${text.slice(0, 200)}`);
    }
    const data = (await res.json()) as {
      results?: Record<string, unknown>[];
      has_more?: boolean;
      next_cursor?: string | null;
    };
    pages.push(...(data.results || []));
    cursor = data.has_more && data.next_cursor ? data.next_cursor : undefined;
  } while (cursor);
  return pages;
}

async function notionPagePlainText(token: string, pageId: string): Promise<string> {
  const res = await fetch(`https://api.notion.com/v1/blocks/${pageId}/children?page_size=20`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": "2022-06-28",
    },
  });
  if (!res.ok) return "";
  const data = (await res.json()) as {
    results?: {
      type?: string;
      paragraph?: { rich_text?: { plain_text?: string }[] };
    }[];
  };
  return (data.results || [])
    .map((block) =>
      (block.paragraph?.rich_text || []).map((t) => t.plain_text || "").join(""),
    )
    .join("\n")
    .trim();
}

function parseHelenaDetail(detail: string) {
  const num = (label: string) => {
    const match = detail.match(new RegExp(`${label}:\\s*([\\d.,]+)`));
    if (!match) return undefined;
    const n = Number(match[1].replace(/\./g, "").replace(",", "."));
    return Number.isFinite(n) ? n : undefined;
  };
  return {
    customers: num("Kunden"),
    contactsPerCustomer: num("Ø Kunden ihrer Kunden"),
    occasions: num("Anlässe/Jahr"),
    avgValue: num("Durchschnittswert"),
    recipients: num("Empfänger"),
    giftsYear: num("Geschenke/Jahr"),
    volumeYear: num("Warenwert/Jahr"),
  };
}

export async function handleNotionImport(
  request: Request,
  env: NotionEnv,
): Promise<Response> {
  if (!(await isAdminAuthenticated(request, env))) {
    return jsonResponse({ error: "Nicht angemeldet." }, 401);
  }
  if (!env.KOLLEGENRUNDE_SUBMISSIONS) {
    return jsonResponse({ error: "Speicher nicht konfiguriert." }, 503);
  }
  if (!env.NOTION_TOKEN) {
    return jsonResponse(
      {
        error:
          "NOTION_TOKEN fehlt. Bitte als Worker-Secret setzen, Import ausführen, danach optional wieder entfernen.",
      },
      503,
    );
  }

  const token = env.NOTION_TOKEN;
  const summary = {
    potential: 0,
    strategy: 0,
    helena: 0,
    kalkulation: 0,
    skipped: 0,
    errors: [] as string[],
  };

  try {
    if (env.NOTION_DATABASE_ID) {
      const pages = await notionQueryAll(token, env.NOTION_DATABASE_ID);
      for (const page of pages) {
        try {
          const id = String(page.id || "");
          const createdAt = String(page.created_time || new Date().toISOString());
          const props = (page.properties || {}) as Record<string, NotionProp>;
          const nameRaw = richText(props.Name);
          const email = propEmail(props["E-Mail"]);
          const phone = propPhone(props.Telefon);
          const website = propUrl(props.Website);
          const detail = await notionPagePlainText(token, id);

          if (detail.includes("Quelle: Helena") || detail.includes("Quelle: Helena kostenloser Check")) {
            const parsed = parseHelenaDetail(detail);
            await saveHelenaLead(env, {
              id,
              createdAt,
              source: "notion-import",
              name: nameRaw || "Unbekannt",
              email: email || "unknown@example.com",
              phone: phone || "-",
              consent: true,
              customers: parsed.customers ?? 0,
              contactsPerCustomer: parsed.contactsPerCustomer ?? 0,
              occasions: parsed.occasions ?? 0,
              avgValue: parsed.avgValue ?? 0,
              recipients: parsed.recipients ?? 0,
              giftsYear: parsed.giftsYear ?? 0,
              volumeYear: parsed.volumeYear ?? 0,
            });
            summary.helena += 1;
            continue;
          }

          if (detail.includes("Quelle: AI Strategy Guide") || detail.includes("Titel:")) {
            const titleMatch = detail.match(/Titel:\s*(.+)/);
            const companyMatch = detail.match(/Firma:\s*(.+)/);
            const parts = nameRaw.split(" · ");
            await saveStrategyLead(env, {
              id,
              createdAt,
              source: "notion-import",
              name: parts[0] || nameRaw || "Unbekannt",
              title: titleMatch?.[1]?.trim() || parts[1] || "",
              company: companyMatch?.[1]?.trim() || parts[2] || "",
              email: email || "unknown@example.com",
              phone: phone || "-",
            });
            summary.strategy += 1;
            continue;
          }

          if (website || nameRaw) {
            await savePotentialLead(env, {
              id,
              createdAt,
              source: "notion-import",
              name: nameRaw || "Unbekannt",
              email: email || "unknown@example.com",
              phone,
              website: website || "https://example.com",
            });
            summary.potential += 1;
            continue;
          }

          summary.skipped += 1;
        } catch (err) {
          summary.errors.push(err instanceof Error ? err.message : String(err));
        }
      }
    }

    if (env.NOTION_KALKULATIONSCHECK_DATABASE_ID) {
      const { saveKalkulationsContact } = await import("./kalkulationsAdmin");
      const pages = await notionQueryAll(token, env.NOTION_KALKULATIONSCHECK_DATABASE_ID);
      for (const page of pages) {
        try {
          const id = String(page.id || "");
          const createdAt = String(page.created_time || new Date().toISOString());
          const props = (page.properties || {}) as Record<string, NotionProp>;
          const name = richText(props.Name) || "Unbekannt";
          const email = propEmail(props["E-Mail"]) || "unknown@example.com";
          const phone = propPhone(props.Telefon) || "-";
          const website = propUrl(props.Website);
          const hoursDay = propNumber(props["Std./Tag Angebote"]) ?? 0;
          const detail = await notionPagePlainText(token, id);
          const reqMatch = detail.match(/Anfragen\/Tag:\s*([\d.,]+)/);
          const minMatch = detail.match(/Minuten\/Angebot:\s*([\d.,]+)/);
          const requestsPerDay = reqMatch ? Number(reqMatch[1].replace(",", ".")) : 0;
          const minutesPerQuote = minMatch ? Number(minMatch[1].replace(",", ".")) : 0;
          const workDays = propNumber(props.Arbeitstage);
          const hourlyRate = propNumber(props.Stundenwert);
          const extraOrdersWeek = propNumber(props["Extra Aufträge/Woche"]);
          const marginPerOrder = propNumber(props.Deckungsbeitrag);
          const timeValue = propNumber(props["Zeitwert/Jahr"]);
          const total = propNumber(props["Nutzen gesamt"]);
          const complete =
            workDays != null &&
            hourlyRate != null &&
            extraOrdersWeek != null &&
            marginPerOrder != null &&
            timeValue != null &&
            total != null;

          await saveKalkulationsContact(env, {
            id,
            createdAt,
            source: "notion-import",
            status: complete ? "complete" : "contact",
            name,
            email,
            phone,
            website,
            consent: propCheckbox(props["Kontakt erlaubt"]) || true,
            requestsPerDay: Number.isFinite(requestsPerDay) ? requestsPerDay : 0,
            minutesPerQuote: Number.isFinite(minutesPerQuote) ? minutesPerQuote : 0,
            hoursDay,
            ...(complete
              ? {
                  workDays,
                  hourlyRate,
                  extraOrdersWeek,
                  marginPerOrder,
                  hoursYear: hoursDay * (workDays || 0),
                  timeValue,
                  extraContribution: (extraOrdersWeek || 0) * 52 * (marginPerOrder || 0),
                  total,
                }
              : {}),
            notionPageId: id,
          });
          summary.kalkulation += 1;
        } catch (err) {
          summary.errors.push(err instanceof Error ? err.message : String(err));
        }
      }
    }
  } catch (err) {
    return jsonResponse(
      { error: err instanceof Error ? err.message : "Notion-Import fehlgeschlagen." },
      502,
    );
  }

  return jsonResponse({ ok: true, summary });
}
