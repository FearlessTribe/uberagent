import { useCallback, useEffect, useState } from "react";
import { services } from "../data/services";

const slugToServiceId = Object.fromEntries(
  services.map((s) => [s.slug, s.id]),
);

type ServiceHistoryState = { uberagent?: boolean; serviceId?: string };

function readServiceFromPath(): string | null {
  const match = window.location.pathname.match(/^\/service\/([^/]+)\/?$/);
  if (!match) return null;
  return slugToServiceId[match[1]] ?? null;
}

function leaveServiceRoute() {
  if (!window.location.pathname.startsWith("/service/")) return;
  const state = window.history.state as ServiceHistoryState | null;
  if (state?.uberagent) {
    window.history.back();
    return;
  }
  window.history.replaceState(null, "", "/");
}

export function getServiceUrl(serviceId: string): string {
  const service = services.find((s) => s.id === serviceId);
  return service ? `/service/${service.slug}` : "/";
}

export type SetServiceIdOptions = { syncUrl?: boolean };

export function useServiceRoute() {
  const [openServiceId, setOpenServiceIdState] = useState<string | null>(
    () => readServiceFromPath(),
  );

  const setOpenServiceId = useCallback((id: string | null, options?: SetServiceIdOptions) => {
    const syncUrl = options?.syncUrl !== false;

    if (id) {
      const service = services.find((s) => s.id === id);
      if (!service) return;
      const url = `/service/${service.slug}`;
      setOpenServiceIdState(id);
      if (!syncUrl) return;
      if (window.location.pathname !== url) {
        const onDetail =
          window.location.pathname.startsWith("/service/") ||
          window.location.pathname.startsWith("/case/");
        const state = { uberagent: true, serviceId: id };
        if (onDetail) {
          window.history.replaceState(state, "", url);
        } else {
          window.history.pushState(state, "", url);
        }
      }
      return;
    }

    setOpenServiceIdState(null);
    if (syncUrl) leaveServiceRoute();
  }, []);

  useEffect(() => {
    const onPopState = () => {
      setOpenServiceIdState(readServiceFromPath());
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return { openServiceId, setOpenServiceId };
}
