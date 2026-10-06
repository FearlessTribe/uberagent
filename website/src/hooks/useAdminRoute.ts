import { useCallback, useEffect, useState } from "react";

export const ADMIN_PATH = "/admin";

function isAdminPath(pathname: string = window.location.pathname): boolean {
  return pathname === ADMIN_PATH || pathname === `${ADMIN_PATH}/`;
}

type SetOpenOptions = { syncUrl?: boolean };

export function useAdminRoute() {
  const [open, setOpenState] = useState(isAdminPath);

  const setOpen = useCallback((next: boolean, options?: SetOpenOptions) => {
    const syncUrl = options?.syncUrl !== false;
    setOpenState(next);
    if (!syncUrl) return;

    if (next) {
      if (!isAdminPath()) {
        window.history.pushState({ admin: true }, "", ADMIN_PATH);
      }
      return;
    }

    if (isAdminPath()) {
      window.history.pushState(null, "", "/");
    }
  }, []);

  useEffect(() => {
    const onPop = () => setOpenState(isAdminPath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return { open, setOpen };
}
