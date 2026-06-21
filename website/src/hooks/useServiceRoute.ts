import { useCallback, useEffect, useState } from "react";
import { services } from "../data/services";

const slugToServiceId = Object.fromEntries(
  services.map((s) => [s.slug, s.id]),
);

function readServiceFromPath(): string | null {
  const match = window.location.pathname.match(/^\/service\/([^/]+)\/?$/);
  if (!match) return null;
  return slugToServiceId[match[1]] ?? null;
}

export function getServiceUrl(serviceId: string): string {
  const service = services.find((s) => s.id === serviceId);
  return service ? `/service/${service.slug}` : "/";
}

export function useServiceRoute() {
  const [openServiceId, setOpenServiceIdState] = useState<string | null>(
    () => readServiceFromPath(),
  );

  const setOpenServiceId = useCallback((id: string | null) => {
    setOpenServiceIdState(id);

    if (id) {
      const service = services.find((s) => s.id === id);
      if (!service) return;
      const url = `/service/${service.slug}`;
      if (window.location.pathname !== url) {
        window.history.pushState({ serviceId: id }, "", url);
      }
      return;
    }

    if (window.location.pathname.startsWith("/service/")) {
      window.history.pushState(null, "", "/");
    }
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
