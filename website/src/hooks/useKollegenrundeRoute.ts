import { useCallback, useEffect, useState } from "react";

export const KOLLEGENRUNDE_PATH = "/ulm";
export const KOLLEGENRUNDE_PATH_LEGACY = "/ulmer-kollegenrunde";

export type KollegenrundeAudience = "kunden" | "anbieter";

function isKollegenrundePath(pathname: string = window.location.pathname): boolean {
  return (
    pathname === KOLLEGENRUNDE_PATH ||
    pathname === `${KOLLEGENRUNDE_PATH}/` ||
    pathname === KOLLEGENRUNDE_PATH_LEGACY ||
    pathname === `${KOLLEGENRUNDE_PATH_LEGACY}/`
  );
}

function readOpen(): boolean {
  return isKollegenrundePath();
}

function readAudience(): KollegenrundeAudience {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("fuer") ?? params.get("audience");
  if (raw === "anbieter" || raw === "erlebnisanbieter" || raw === "partner") {
    return "anbieter";
  }
  return "kunden";
}

type SetOpenOptions = { syncUrl?: boolean };

export function useKollegenrundeRoute() {
  const [open, setOpenState] = useState(readOpen);
  const [audience, setAudienceState] = useState<KollegenrundeAudience>(readAudience);

  const setOpen = useCallback((next: boolean, options?: SetOpenOptions) => {
    const syncUrl = options?.syncUrl !== false;
    setOpenState(next);
    if (!syncUrl) return;

    if (next) {
      const url = `${KOLLEGENRUNDE_PATH}?fuer=kunden`;
      if (window.location.pathname !== KOLLEGENRUNDE_PATH) {
        window.history.pushState({ kollegenrunde: true }, "", url);
      }
      setAudienceState("kunden");
      return;
    }

    if (readOpen()) {
      window.history.pushState(null, "", "/");
    }
  }, []);

  const setAudience = useCallback((next: KollegenrundeAudience) => {
    setAudienceState(next);
    if (!readOpen()) return;
    const url = `${KOLLEGENRUNDE_PATH}?fuer=${next}`;
    window.history.replaceState({ kollegenrunde: true }, "", url);
  }, []);

  useEffect(() => {
    const onPop = () => {
      setOpenState(readOpen());
      setAudienceState(readAudience());
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (!isKollegenrundePath()) return;
    if (window.location.pathname === KOLLEGENRUNDE_PATH) return;
    const params = window.location.search || `?fuer=${readAudience()}`;
    window.history.replaceState(
      { kollegenrunde: true },
      "",
      `${KOLLEGENRUNDE_PATH}${params.startsWith("?") ? params : `?fuer=${readAudience()}`}`,
    );
  }, []);

  return { open, setOpen, audience, setAudience };
}
