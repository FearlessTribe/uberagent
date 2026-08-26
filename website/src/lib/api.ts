const WORKER_API = "https://uberagent.fearlesstribe.workers.dev";

/**
 * API base URL.
 * - Local Vite → workers.dev (Notion secrets live on the Worker)
 * - Production / preview Worker host → same origin (avoids CORS + CSP connect-src 'self')
 */
export function getApiBase(): string {
  if (typeof window === "undefined") return "";

  const { hostname } = window.location;
  if (hostname === "localhost" || hostname === "127.0.0.1") return WORKER_API;

  // Same Worker serves the SPA and /api/*, never cross-origin in production.
  return "";
}
