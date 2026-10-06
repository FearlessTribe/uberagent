import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  trackProfileView,
  trackProjectView,
  trackServiceView,
} from "../lib/analytics";
import { lockScroll, unlockScroll } from "../hooks/scrollLock";
import { useCaseRoute } from "../hooks/useCaseRoute";
import { useServiceRoute } from "../hooks/useServiceRoute";
import { useKollegenrundeRoute } from "../hooks/useKollegenrundeRoute";
import { useAdminRoute } from "../hooks/useAdminRoute";

export type OverlayType = "none" | "menu" | "laurens";

interface OverlayContextValue {
  activeOverlay: OverlayType;
  isOverlayOpen: boolean;
  menuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  openServiceId: string | null;
  openServiceSubpath: string | null;
  openProjectId: string | null;
  kollegenrundeOpen: boolean;
  kollegenrundeAudience: "kunden" | "anbieter";
  adminOpen: boolean;
  laurensOpen: boolean;
  openService: (id: string) => void;
  openServiceSubpage: (id: string, subpath: string) => void;
  closeService: () => void;
  openProject: (id: string) => void;
  closeProject: () => void;
  openKollegenrunde: (audience?: "kunden" | "anbieter") => void;
  setKollegenrundeAudience: (audience: "kunden" | "anbieter") => void;
  closeKollegenrunde: () => void;
  openAdmin: () => void;
  closeAdmin: () => void;
  openLaurens: () => void;
  closeLaurens: () => void;
  closeAll: () => void;
  /** Clear detail pages and land on `/` without history.back(). */
  navigateHome: () => void;
}

const OverlayContext = createContext<OverlayContextValue | null>(null);

export function useOverlay() {
  const ctx = useContext(OverlayContext);
  if (!ctx) throw new Error("useOverlay must be used within OverlayProvider");
  return ctx;
}

export function useOverlayOptional() {
  return useContext(OverlayContext);
}

interface OverlayProviderProps {
  children: ReactNode;
}

export function OverlayProvider({ children }: OverlayProviderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [laurensOpen, setLaurensOpen] = useState(false);
  const {
    openServiceId,
    openServiceSubpath,
    setOpenServiceId,
    openServiceSubpage: openServiceSubpageRoute,
  } = useServiceRoute();
  const { openProjectId, setOpenProjectId } = useCaseRoute();
  const {
    open: kollegenrundeOpen,
    setOpen: setKollegenrundeOpen,
    audience: kollegenrundeAudience,
    setAudience: setKollegenrundeAudience,
  } = useKollegenrundeRoute();
  const { open: adminOpen, setOpen: setAdminOpen } = useAdminRoute();

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setLaurensOpen(false);
    setOpenServiceId(null);
    setOpenProjectId(null);
    setKollegenrundeOpen(false);
    setAdminOpen(false);
  }, [setOpenServiceId, setOpenProjectId, setKollegenrundeOpen, setAdminOpen]);

  const navigateHome = useCallback(() => {
    setMenuOpen(false);
    setLaurensOpen(false);
    setOpenServiceId(null, { syncUrl: false });
    setOpenProjectId(null, { syncUrl: false });
    setKollegenrundeOpen(false, { syncUrl: false });
    setAdminOpen(false, { syncUrl: false });
    const path = window.location.pathname;
    if (
      path.startsWith("/service/") ||
      path.startsWith("/case/") ||
      path === "/ulm" ||
      path === "/ulm/" ||
      path.startsWith("/ulmer-kollegenrunde") ||
      path === "/admin" ||
      path === "/admin/" ||
      path === "/contact" ||
      path === "/contact/"
    ) {
      window.history.pushState(null, "", "/");
    }
  }, [setOpenServiceId, setOpenProjectId, setKollegenrundeOpen, setAdminOpen]);

  const openService = useCallback(
    (id: string) => {
      setOpenProjectId(null, { syncUrl: false });
      setKollegenrundeOpen(false, { syncUrl: false });
      setAdminOpen(false, { syncUrl: false });
      setLaurensOpen(false);
      setMenuOpen(false);
      setOpenServiceId(id);
    },
    [setOpenProjectId, setOpenServiceId, setKollegenrundeOpen, setAdminOpen],
  );

  const openServiceSubpage = useCallback(
    (id: string, subpath: string) => {
      setOpenProjectId(null, { syncUrl: false });
      setKollegenrundeOpen(false, { syncUrl: false });
      setAdminOpen(false, { syncUrl: false });
      setLaurensOpen(false);
      setMenuOpen(false);
      openServiceSubpageRoute(id, subpath);
    },
    [setOpenProjectId, setKollegenrundeOpen, setAdminOpen, openServiceSubpageRoute],
  );

  const openProject = useCallback(
    (id: string) => {
      setOpenServiceId(null, { syncUrl: false });
      setKollegenrundeOpen(false, { syncUrl: false });
      setAdminOpen(false, { syncUrl: false });
      setLaurensOpen(false);
      setMenuOpen(false);
      setOpenProjectId(id);
    },
    [setOpenServiceId, setOpenProjectId, setKollegenrundeOpen, setAdminOpen],
  );

  const openKollegenrunde = useCallback(
    (audience: "kunden" | "anbieter" = "kunden") => {
      const next =
        audience === "anbieter" || audience === "kunden" ? audience : "kunden";
      setOpenServiceId(null, { syncUrl: false });
      setOpenProjectId(null, { syncUrl: false });
      setAdminOpen(false, { syncUrl: false });
      setLaurensOpen(false);
      setMenuOpen(false);
      setKollegenrundeOpen(true, { syncUrl: false });
      setKollegenrundeAudience(next);
      const url = `/ulm?fuer=${next}`;
      if (
        window.location.pathname !== "/ulm" ||
        window.location.search !== `?fuer=${next}`
      ) {
        window.history.pushState({ kollegenrunde: true }, "", url);
      }
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    },
    [
      setOpenServiceId,
      setOpenProjectId,
      setKollegenrundeOpen,
      setKollegenrundeAudience,
      setAdminOpen,
    ],
  );

  const openAdmin = useCallback(() => {
    setOpenServiceId(null, { syncUrl: false });
    setOpenProjectId(null, { syncUrl: false });
    setKollegenrundeOpen(false, { syncUrl: false });
    setLaurensOpen(false);
    setMenuOpen(false);
    setAdminOpen(true);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [setOpenServiceId, setOpenProjectId, setKollegenrundeOpen, setAdminOpen]);

  const openLaurens = useCallback(() => {
    setLaurensOpen(true);
  }, []);

  const lastServiceKey = useRef<string | null>(null);
  const lastProjectId = useRef<string | null>(null);
  const trackedLaurens = useRef(false);

  useEffect(() => {
    if (!openServiceId) {
      lastServiceKey.current = null;
      return;
    }
    const key = `${openServiceId}:${openServiceSubpath ?? ""}`;
    if (lastServiceKey.current === key) return;
    lastServiceKey.current = key;
    trackServiceView(openServiceId, openServiceSubpath);
  }, [openServiceId, openServiceSubpath]);

  useEffect(() => {
    if (!openProjectId) {
      lastProjectId.current = null;
      return;
    }
    if (lastProjectId.current === openProjectId) return;
    lastProjectId.current = openProjectId;
    trackProjectView(openProjectId);
  }, [openProjectId]);

  useEffect(() => {
    if (!laurensOpen) {
      trackedLaurens.current = false;
      return;
    }
    if (trackedLaurens.current) return;
    trackedLaurens.current = true;
    trackProfileView("laurens");
  }, [laurensOpen]);

  const activeOverlay: OverlayType = menuOpen ? "menu" : laurensOpen ? "laurens" : "none";
  const isOverlayOpen = activeOverlay !== "none";
  const isDetailPage = Boolean(
    openServiceId || openProjectId || kollegenrundeOpen || adminOpen,
  );

  useEffect(() => {
    if (isOverlayOpen) {
      lockScroll();
      return () => unlockScroll();
    }
  }, [isOverlayOpen]);

  useEffect(() => {
    if (isDetailPage || laurensOpen) {
      setMenuOpen(false);
    }
  }, [isDetailPage, laurensOpen]);

  const value = useMemo<OverlayContextValue>(
    () => ({
      activeOverlay,
      isOverlayOpen,
      menuOpen,
      openMenu: () => setMenuOpen(true),
      closeMenu: () => setMenuOpen(false),
      toggleMenu: () => setMenuOpen((o) => !o),
      openServiceId,
      openServiceSubpath,
      openProjectId,
      kollegenrundeOpen,
      kollegenrundeAudience,
      adminOpen,
      laurensOpen,
      openService,
      openServiceSubpage,
      closeService: () => setOpenServiceId(null),
      openProject,
      closeProject: () => setOpenProjectId(null),
      openKollegenrunde,
      setKollegenrundeAudience,
      closeKollegenrunde: () => setKollegenrundeOpen(false),
      openAdmin,
      closeAdmin: () => setAdminOpen(false),
      openLaurens,
      closeLaurens: () => setLaurensOpen(false),
      closeAll,
      navigateHome,
    }),
    [
      activeOverlay,
      isOverlayOpen,
      menuOpen,
      openServiceId,
      openServiceSubpath,
      openProjectId,
      kollegenrundeOpen,
      kollegenrundeAudience,
      adminOpen,
      laurensOpen,
      openService,
      openServiceSubpage,
      openProject,
      openKollegenrunde,
      setKollegenrundeAudience,
      openAdmin,
      openLaurens,
      setOpenServiceId,
      setOpenProjectId,
      setKollegenrundeOpen,
      setAdminOpen,
      closeAll,
      navigateHome,
    ],
  );

  return <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>;
}
