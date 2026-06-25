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

export type OverlayType = "none" | "menu" | "service" | "project" | "laurens";

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
}

const OverlayContext = createContext<OverlayContextValue | null>(null);

export function useOverlay() {
  const ctx = useContext(OverlayContext);
  if (!ctx) throw new Error("useOverlay must be used within OverlayProvider");
  return ctx;
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

  const activeOverlay: OverlayType = menuOpen
    ? "menu"
    : openServiceId
      ? "service"
      : openProjectId
        ? "project"
        : laurensOpen
          ? "laurens"
          : "none";

  const isOverlayOpen = activeOverlay !== "none";

  useEffect(() => {
    if (isOverlayOpen) {
      lockScroll();
      return () => unlockScroll();
    }
  }, [isOverlayOpen]);

  useEffect(() => {
    if (openServiceId || openProjectId || laurensOpen) {
      setMenuOpen(false);
    }
  }, [openServiceId, openProjectId, laurensOpen]);

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
      openService: setOpenServiceId,
      closeService: () => setOpenServiceId(null),
      openProject: setOpenProjectId,
      closeProject: () => setOpenProjectId(null),
      openLaurens: () => setLaurensOpen(true),
      closeLaurens: () => setLaurensOpen(false),
      closeAll,
    }),
    [
      activeOverlay,
      isOverlayOpen,
      menuOpen,
      openServiceId,
      openProjectId,
      laurensOpen,
      setOpenServiceId,
      setOpenProjectId,
      closeAll,
    ],
  );

  return <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>;
}
