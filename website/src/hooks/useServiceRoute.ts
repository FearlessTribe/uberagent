import { useCallback, useEffect, useState } from "react";
import { services } from "../data/services";

const slugToServiceId = Object.fromEntries(
  services.map((s) => [s.slug, s.id]),
);

type ServiceHistoryState = { uberagent?: boolean; serviceId?: string };

type ServiceRoute = {
  serviceId: string | null;
  subpath: string | null;
};

function readServiceFromPath(): ServiceRoute {
  const match = window.location.pathname.match(
    /^\/service\/([^/]+)(?:\/([^/]+))?\/?$/,
  );
  if (!match) return { serviceId: null, subpath: null };
  return {
    serviceId: slugToServiceId[match[1]] ?? null,
    subpath: match[2] ?? null,
  };
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
  const [route, setRoute] = useState<ServiceRoute>(
    () => readServiceFromPath(),
  );
  const openServiceId = route.serviceId;
  const openServiceSubpath = route.subpath;

  const setOpenServiceId = useCallback((id: string | null, options?: SetServiceIdOptions) => {
    const syncUrl = options?.syncUrl !== false;

    if (id) {
      const service = services.find((s) => s.id === id);
      if (!service) return;
      const url = `/service/${service.slug}`;
      setRoute({ serviceId: id, subpath: null });
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

    setRoute({ serviceId: null, subpath: null });
    if (syncUrl) leaveServiceRoute();
  }, []);

  const openServiceSubpage = useCallback((serviceId: string, subpath: string) => {
    const service = services.find((s) => s.id === serviceId);
    if (!service || !/^[a-z0-9-]+$/.test(subpath)) return;
    const url = `/service/${service.slug}/${subpath}`;
    setRoute({ serviceId, subpath });
    const state = { uberagent: true, serviceId };
    if (window.location.pathname.startsWith("/service/")) {
      window.history.replaceState(state, "", url);
    } else {
      window.history.pushState(state, "", url);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const onPopState = () => {
      setRoute(readServiceFromPath());
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return {
    openServiceId,
    openServiceSubpath,
    setOpenServiceId,
    openServiceSubpage,
  };
}
