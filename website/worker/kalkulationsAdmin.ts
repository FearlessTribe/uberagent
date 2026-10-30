import { isAdminAuthenticated, type CardBindings } from "./kollegenrundeAdmin";

export type KalkulationsSubmission = {
  id: string;
  createdAt: string;
  updatedAt?: string;
  status: "contact" | "complete";
  name: string;
  email: string;
  phone: string;
  website: string;
  consent: boolean;
  requestsPerDay: number;
  minutesPerQuote: number;
  hoursDay: number;
  workDays?: number;
  hourlyRate?: number;
  extraOrdersWeek?: number;
  marginPerOrder?: number;
  hoursYear?: number;
  timeValue?: number;
  extraContribution?: number;
  total?: number;
  notionPageId?: string;
};

const INDEX_KEY = "kalk:index";

function metaKey(id: string) {
  return `kalk:${id}:meta`;
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

async function readIndex(kv: KVNamespace): Promise<string[]> {
  const raw = await kv.get(INDEX_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

async function writeIndex(kv: KVNamespace, ids: string[]) {
  await kv.put(INDEX_KEY, JSON.stringify(ids.slice(0, 500)));
}

export async function saveKalkulationsContact(
  env: CardBindings,
  payload: {
    name: string;
    email: string;
    phone: string;
    website?: string;
    consent: boolean;
    requestsPerDay: number;
    minutesPerQuote: number;
    hoursDay: number;
    notionPageId?: string;
  },
): Promise<KalkulationsSubmission> {
  if (!env.KOLLEGENRUNDE_SUBMISSIONS) {
    throw new Error("Speicher nicht konfiguriert.");
  }

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const meta: KalkulationsSubmission = {
    id,
    createdAt,
    status: "contact",
    name: payload.name.slice(0, 120),
    email: payload.email.slice(0, 160),
    phone: payload.phone.slice(0, 60),
    website: (payload.website || "").slice(0, 200),
    consent: payload.consent,
    requestsPerDay: payload.requestsPerDay,
    minutesPerQuote: payload.minutesPerQuote,
    hoursDay: payload.hoursDay,
    ...(payload.notionPageId ? { notionPageId: payload.notionPageId } : {}),
  };

  await env.KOLLEGENRUNDE_SUBMISSIONS.put(metaKey(id), JSON.stringify(meta));
  const index = await readIndex(env.KOLLEGENRUNDE_SUBMISSIONS);
  index.unshift(id);
  await writeIndex(env.KOLLEGENRUNDE_SUBMISSIONS, index);

  return meta;
}

export async function completeKalkulationsSubmission(
  env: CardBindings,
  pageId: string,
  payload: {
    workDays: number;
    hourlyRate: number;
    extraOrdersWeek: number;
    marginPerOrder: number;
    hoursYear: number;
    timeValue: number;
    extraContribution: number;
    total: number;
  },
): Promise<KalkulationsSubmission | null> {
  if (!env.KOLLEGENRUNDE_SUBMISSIONS) {
    throw new Error("Speicher nicht konfiguriert.");
  }

  const safeId = pageId.replace(/[^a-zA-Z0-9-]/g, "");
  if (!safeId) return null;

  const raw = await env.KOLLEGENRUNDE_SUBMISSIONS.get(metaKey(safeId));
  if (!raw) return null;

  let existing: KalkulationsSubmission;
  try {
    existing = JSON.parse(raw) as KalkulationsSubmission;
  } catch {
    return null;
  }

  const meta: KalkulationsSubmission = {
    ...existing,
    updatedAt: new Date().toISOString(),
    status: "complete",
    workDays: payload.workDays,
    hourlyRate: payload.hourlyRate,
    extraOrdersWeek: payload.extraOrdersWeek,
    marginPerOrder: payload.marginPerOrder,
    hoursYear: payload.hoursYear,
    timeValue: payload.timeValue,
    extraContribution: payload.extraContribution,
    total: payload.total,
  };

  await env.KOLLEGENRUNDE_SUBMISSIONS.put(metaKey(safeId), JSON.stringify(meta));
  return meta;
}

export async function handleKalkAdminList(
  request: Request,
  env: CardBindings,
): Promise<Response> {
  if (!(await isAdminAuthenticated(request, env))) {
    return jsonResponse({ error: "Nicht angemeldet." }, 401);
  }
  if (!env.KOLLEGENRUNDE_SUBMISSIONS) {
    return jsonResponse({ error: "Speicher nicht konfiguriert." }, 503);
  }

  const ids = await readIndex(env.KOLLEGENRUNDE_SUBMISSIONS);
  const items: KalkulationsSubmission[] = [];

  for (const id of ids.slice(0, 100)) {
    const raw = await env.KOLLEGENRUNDE_SUBMISSIONS.get(metaKey(id));
    if (!raw) continue;
    try {
      items.push(JSON.parse(raw) as KalkulationsSubmission);
    } catch {
      /* skip */
    }
  }

  return jsonResponse({ ok: true, items });
}
