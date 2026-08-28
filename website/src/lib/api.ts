/**
 * API base URL.
 * - Local Vite → same origin; Vite proxies /api to wrangler dev (127.0.0.1:8787)
 * - Production / preview Worker host → same origin
 */
export function getApiBase(): string {
  return "";
}
