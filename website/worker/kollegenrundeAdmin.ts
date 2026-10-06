export interface CardBindings {
  KOLLEGENRUNDE_SUBMISSIONS: KVNamespace;
  TURNSTILE_SECRET?: string;
  ADMIN_PASSWORD?: string;
  ADMIN_SESSION_SECRET?: string;
}

export type CardSubmission = {
  id: string;
  createdAt: string;
  name: string;
  category: string;
  offer: string;
  detail: string;
  backTitle: string;
  duelTitle: string;
  duelBody: string;
  teamTitle: string;
  teamBody: string;
  contactName: string;
  email: string;
  phone: string;
  contact: string;
  website: string;
  groupSize?: string;
  times?: string;
  photoContentType: string;
  photoBytes: number;
};

const INDEX_KEY = "card:index";
const COOKIE_NAME = "ua_admin";
const SESSION_TTL_SEC = 60 * 60 * 24 * 7;
const MAX_PHOTO_BYTES = Math.floor(4.5 * 1024 * 1024);

function metaKey(id: string) {
  return `card:${id}:meta`;
}

function photoKey(id: string) {
  return `card:${id}:photo`;
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

async function hmacSign(secret: string, payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

async function hmacVerify(secret: string, payload: string, signature: string): Promise<boolean> {
  const expected = await hmacSign(secret, payload);
  return expected === signature;
}

function parseCookies(header: string | null): Record<string, string> {
  if (!header) return {};
  return Object.fromEntries(
    header.split(";").map((part) => {
      const [k, ...rest] = part.trim().split("=");
      return [k, decodeURIComponent(rest.join("=") || "")];
    }),
  );
}

export async function verifyTurnstile(
  token: string,
  secret: string | undefined,
  ip: string | null,
): Promise<boolean> {
  if (!secret) {
    // Local/dev without Turnstile configured
    return true;
  }
  if (!token) return false;

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  if (ip) body.set("remoteip", ip);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
  return Boolean(data.success);
}

export async function handleCardSubmit(
  request: Request,
  env: CardBindings,
): Promise<Response> {
  if (!env.KOLLEGENRUNDE_SUBMISSIONS) {
    return jsonResponse({ error: "Speicher nicht konfiguriert." }, 503);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return jsonResponse({ error: "Ungültige Formulardaten." }, 400);
  }

  const token = String(form.get("cf-turnstile-response") || "");
  const ip = request.headers.get("CF-Connecting-IP");
  const captchaOk = await verifyTurnstile(token, env.TURNSTILE_SECRET, ip);
  if (!captchaOk) {
    return jsonResponse({ error: "Captcha ungültig. Bitte erneut versuchen." }, 400);
  }

  const name = String(form.get("name") || "").trim();
  const category = String(form.get("category") || "").trim();
  const offer = String(form.get("offer") || "").trim();
  const detail = String(form.get("detail") || "").trim();
  const backTitle = String(form.get("backTitle") || "").trim();
  const duelTitle = String(form.get("duelTitle") || "").trim();
  const duelBody = String(form.get("duelBody") || "").trim();
  const teamTitle = String(form.get("teamTitle") || "").trim();
  const teamBody = String(form.get("teamBody") || "").trim();
  const contactName = String(form.get("contactName") || "").trim();
  const email = String(form.get("email") || "").trim();
  const phone = String(form.get("phone") || "").trim();
  const contact = String(form.get("contact") || `${email} · ${phone}`).trim();
  const website = String(form.get("website") || "").trim();
  const photo = form.get("photo");

  if (
    !name ||
    !category ||
    !offer ||
    !detail ||
    !backTitle ||
    !duelTitle ||
    !duelBody ||
    !teamTitle ||
    !teamBody ||
    !contactName ||
    !email ||
    !phone
  ) {
    return jsonResponse({ error: "Bitte alle Pflichtfelder ausfüllen." }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ error: "Bitte eine gültige E-Mail angeben." }, 400);
  }
  if (!(photo instanceof File)) {
    return jsonResponse({ error: "Foto fehlt." }, 400);
  }
  if (!photo.type.startsWith("image/")) {
    return jsonResponse({ error: "Nur Bilddateien sind erlaubt." }, 400);
  }
  if (photo.size <= 0 || photo.size > MAX_PHOTO_BYTES) {
    return jsonResponse({ error: "Foto max. 4,5 MB." }, 400);
  }

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const bytes = new Uint8Array(await photo.arrayBuffer());

  const meta: CardSubmission = {
    id,
    createdAt,
    name: name.slice(0, 80),
    category: category.slice(0, 40),
    offer: offer.slice(0, 120),
    detail: detail.slice(0, 140),
    backTitle: backTitle.slice(0, 60),
    duelTitle: duelTitle.slice(0, 80),
    duelBody: duelBody.slice(0, 200),
    teamTitle: teamTitle.slice(0, 80),
    teamBody: teamBody.slice(0, 200),
    contactName: contactName.slice(0, 80),
    email: email.slice(0, 120),
    phone: phone.slice(0, 60),
    contact: contact.slice(0, 160),
    website: website.slice(0, 200),
    photoContentType: photo.type.slice(0, 80),
    photoBytes: bytes.byteLength,
  };

  await env.KOLLEGENRUNDE_SUBMISSIONS.put(photoKey(id), bytes, {
    metadata: { contentType: meta.photoContentType },
  });
  await env.KOLLEGENRUNDE_SUBMISSIONS.put(metaKey(id), JSON.stringify(meta));

  const indexRaw = await env.KOLLEGENRUNDE_SUBMISSIONS.get(INDEX_KEY);
  const index: string[] = indexRaw ? (JSON.parse(indexRaw) as string[]) : [];
  index.unshift(id);
  await env.KOLLEGENRUNDE_SUBMISSIONS.put(INDEX_KEY, JSON.stringify(index.slice(0, 500)));

  return jsonResponse({ ok: true, id });
}

async function createSessionCookie(
  env: CardBindings,
  secure: boolean,
): Promise<string | null> {
  const secret = env.ADMIN_SESSION_SECRET || env.ADMIN_PASSWORD;
  if (!secret) return null;
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SEC;
  const payload = `v1.${exp}`;
  const sig = await hmacSign(secret, payload);
  const value = encodeURIComponent(`${payload}.${sig}`);
  const secureFlag = secure ? "; Secure" : "";
  return `${COOKIE_NAME}=${value}; Path=/; HttpOnly${secureFlag}; SameSite=Lax; Max-Age=${SESSION_TTL_SEC}`;
}

export async function isAdminAuthenticated(
  request: Request,
  env: CardBindings,
): Promise<boolean> {
  const secret = env.ADMIN_SESSION_SECRET || env.ADMIN_PASSWORD;
  if (!secret) return false;
  const cookies = parseCookies(request.headers.get("Cookie"));
  const raw = cookies[COOKIE_NAME];
  if (!raw) return false;
  const parts = raw.split(".");
  if (parts.length !== 3) return false;
  const [version, expStr, sig] = parts;
  if (version !== "v1") return false;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;
  return hmacVerify(secret, `${version}.${expStr}`, sig);
}

export async function handleAdminLogin(
  request: Request,
  env: CardBindings,
): Promise<Response> {
  if (!env.ADMIN_PASSWORD) {
    return jsonResponse({ error: "Admin-Passwort nicht konfiguriert." }, 503);
  }

  let body: { password?: string };
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return jsonResponse({ error: "Invalid JSON" }, 400);
  }

  const password = (body.password || "").trim();
  if (!password) {
    return jsonResponse({ error: "Passwort fehlt." }, 400);
  }
  if (password !== env.ADMIN_PASSWORD) {
    return jsonResponse({ error: "Falsches Passwort." }, 401);
  }

  const secure = new URL(request.url).protocol === "https:";
  const cookie = await createSessionCookie(env, secure);
  if (!cookie) {
    return jsonResponse({ error: "Session konnte nicht erstellt werden." }, 503);
  }

  return jsonResponse({ ok: true }, 200, { "Set-Cookie": cookie });
}

export async function handleAdminLogout(request: Request): Promise<Response> {
  const secure = new URL(request.url).protocol === "https:";
  const secureFlag = secure ? "; Secure" : "";
  return jsonResponse(
    { ok: true },
    200,
    {
      "Set-Cookie": `${COOKIE_NAME}=; Path=/; HttpOnly${secureFlag}; SameSite=Lax; Max-Age=0`,
    },
  );
}

export async function handleAdminSession(
  request: Request,
  env: CardBindings,
): Promise<Response> {
  const ok = await isAdminAuthenticated(request, env);
  return jsonResponse({ ok });
}

export async function handleAdminList(
  request: Request,
  env: CardBindings,
): Promise<Response> {
  if (!(await isAdminAuthenticated(request, env))) {
    return jsonResponse({ error: "Nicht angemeldet." }, 401);
  }
  if (!env.KOLLEGENRUNDE_SUBMISSIONS) {
    return jsonResponse({ error: "Speicher nicht konfiguriert." }, 503);
  }

  const indexRaw = await env.KOLLEGENRUNDE_SUBMISSIONS.get(INDEX_KEY);
  const ids: string[] = indexRaw ? (JSON.parse(indexRaw) as string[]) : [];
  const items: CardSubmission[] = [];

  for (const id of ids.slice(0, 100)) {
    const raw = await env.KOLLEGENRUNDE_SUBMISSIONS.get(metaKey(id));
    if (!raw) continue;
    try {
      items.push(JSON.parse(raw) as CardSubmission);
    } catch {
      /* skip */
    }
  }

  return jsonResponse({ ok: true, items });
}

export async function handleAdminPhoto(
  request: Request,
  env: CardBindings,
  id: string,
): Promise<Response> {
  if (!(await isAdminAuthenticated(request, env))) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (!env.KOLLEGENRUNDE_SUBMISSIONS) {
    return new Response("Not configured", { status: 503 });
  }

  const safeId = id.replace(/[^a-zA-Z0-9-]/g, "");
  if (!safeId) return new Response("Not found", { status: 404 });

  const metaRaw = await env.KOLLEGENRUNDE_SUBMISSIONS.get(metaKey(safeId));
  const photo = await env.KOLLEGENRUNDE_SUBMISSIONS.get(photoKey(safeId), "arrayBuffer");
  if (!photo) return new Response("Not found", { status: 404 });

  let contentType = "image/jpeg";
  if (metaRaw) {
    try {
      const meta = JSON.parse(metaRaw) as CardSubmission;
      if (meta.photoContentType) contentType = meta.photoContentType;
    } catch {
      /* default */
    }
  }

  return new Response(photo, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "private, max-age=3600",
    },
  });
}
