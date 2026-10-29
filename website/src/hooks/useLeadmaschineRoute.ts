import { useCallback, useEffect, useState } from "react";

export const LEADMASCHINE_PATH = "/leadmaschine";

export type LeadmaschineRegion = "ch" | "de";

const STORAGE_KEY = "supragent.leadmaschine.region";

function isLeadmaschinePath(pathname: string = window.location.pathname): boolean {
  return pathname === LEADMASCHINE_PATH || pathname === `${LEADMASCHINE_PATH}/`;
}

function detectDefaultRegion(): LeadmaschineRegion {
  const params = new URLSearchParams(window.location.search);
  const r = params.get("r");
  if (r === "ch" || r === "de") return r;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "ch" || stored === "de") return stored;
  } catch {
    /* ignore */
  }

  const lang = navigator.language?.toLowerCase() ?? "";
  if (lang === "de-ch" || lang.startsWith("de-ch")) return "ch";
  return "de";
}

function readOpen(): boolean {
  return isLeadmaschinePath();
}

type SetOpenOptions = { syncUrl?: boolean };

export function useLeadmaschineRoute() {
  const [open, setOpenState] = useState(readOpen);
  const [region, setRegionState] = useState<LeadmaschineRegion>(detectDefaultRegion);

  const setOpen = useCallback((next: boolean, options?: SetOpenOptions) => {
    const syncUrl = options?.syncUrl !== false;
    setOpenState(next);
    if (!syncUrl) return;

    if (next) {
      const current = detectDefaultRegion();
      setRegionState(current);
      const url = `${LEADMASCHINE_PATH}?r=${current}`;
      if (
        window.location.pathname !== LEADMASCHINE_PATH ||
        !window.location.search.includes(`r=${current}`)
      ) {
        window.history.pushState({ leadmaschine: true }, "", url);
      }
      return;
    }

    if (readOpen()) {
      window.history.pushState(null, "", "/");
    }
  }, []);

  const setRegion = useCallback((next: LeadmaschineRegion) => {
    setRegionState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    if (!readOpen()) return;
    const url = `${LEADMASCHINE_PATH}?r=${next}`;
    window.history.replaceState({ leadmaschine: true }, "", url);
  }, []);

  useEffect(() => {
    const onPop = () => {
      setOpenState(readOpen());
      setRegionState(detectDefaultRegion());
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (!isLeadmaschinePath()) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("r") === "ch" || params.get("r") === "de") return;
    const next = detectDefaultRegion();
    window.history.replaceState(
      { leadmaschine: true },
      "",
      `${LEADMASCHINE_PATH}?r=${next}`,
    );
  }, []);

  return { open, setOpen, region, setRegion };
}
