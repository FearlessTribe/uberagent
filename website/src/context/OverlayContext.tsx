import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
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
  openProjectId: string | null;
  laurensOpen: boolean;
  openService: (id: string) => void;
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
  const { openServiceId, setOpenServiceId } = useServiceRoute();
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
      openProjectId,
      laurensOpen,
      openService,
      closeService: () => setOpenServiceId(null),
      openProject,
      closeProject: () => setOpenProjectId(null),
      openLaurens: () => setLaurensOpen(true),
      closeLaurens: () => setLaurensOpen(false),
      closeAll,
      navigateHome,
    }),
    [
      activeOverlay,
      isOverlayOpen,
      menuOpen,
      openServiceId,
      openProjectId,
      laurensOpen,
      openService,
      openProject,
      setOpenServiceId,
      setOpenProjectId,
      closeAll,
      navigateHome,
    ],
  );

  return <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>;
}
