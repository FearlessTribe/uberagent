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
  laurensOpen: boolean;
  openService: (id: string) => void;
  openServiceSubpage: (id: string, subpath: string) => void;
  closeService: () => void;
  openProject: (id: string) => void;
  closeProject: () => void;
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
    openServiceSubpage,
  } = useServiceRoute();
  const { openProjectId, setOpenProjectId } = useCaseRoute();

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setLaurensOpen(false);
    setOpenServiceId(null);
    setOpenProjectId(null);
  }, [setOpenServiceId, setOpenProjectId]);

  const navigateHome = useCallback(() => {
    setMenuOpen(false);
    setLaurensOpen(false);
    setOpenServiceId(null, { syncUrl: false });
    setOpenProjectId(null, { syncUrl: false });
    const path = window.location.pathname;
    if (
      path.startsWith("/service/") ||
      path.startsWith("/case/") ||
      path === "/contact" ||
      path === "/contact/"
    ) {
      window.history.pushState(null, "", "/");
    }
  }, [setOpenServiceId, setOpenProjectId]);

  const openService = useCallback(
    (id: string) => {
      setOpenProjectId(null, { syncUrl: false });
      setLaurensOpen(false);
      setMenuOpen(false);
      setOpenServiceId(id);
    },
    [setOpenProjectId, setOpenServiceId],
  );

  const openProject = useCallback(
    (id: string) => {
      setOpenServiceId(null, { syncUrl: false });
      setLaurensOpen(false);
      setMenuOpen(false);
      setOpenProjectId(id);
    },
    [setOpenServiceId, setOpenProjectId],
  );

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
  const isDetailPage = Boolean(openServiceId || openProjectId);

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
      laurensOpen,
      openService,
      openServiceSubpage,
      closeService: () => setOpenServiceId(null),
      openProject,
      closeProject: () => setOpenProjectId(null),
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
      laurensOpen,
      openService,
      openServiceSubpage,
      openProject,
      openLaurens,
      setOpenServiceId,
      setOpenProjectId,
      closeAll,
      navigateHome,
    ],
  );

  return <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>;
}
