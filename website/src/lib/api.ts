/** API base URL — custom domain worker lacks secrets; workers.dev has them. */
export function getApiBase(): string {
  if (import.meta.env.DEV) return "";
  if (typeof window === "undefined") return "";
  if (window.location.hostname.endsWith(".workers.dev")) return "";
  return "https://uberagent.fearlesstribe.workers.dev";
}
