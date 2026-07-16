const WORKER_API = "https://uberagent.fearlesstribe.workers.dev";

/**
 * API base URL.
 * Local Vite and custom domain use workers.dev where Notion secrets are bound.
 */
export function getApiBase(): string {
  if (typeof window === "undefined") return "";

  const { hostname } = window.location;
  if (hostname === "localhost" || hostname === "127.0.0.1") return WORKER_API;
  if (hostname.endsWith(".workers.dev")) return "";

  return WORKER_API;
}
