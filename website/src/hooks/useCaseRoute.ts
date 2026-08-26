import { useCallback, useEffect, useState } from "react";
import { projects } from "../data/projects";

const slugToProjectId = Object.fromEntries(
  projects.map((p) => [p.slug, p.id]),
);

type CaseHistoryState = { uberagent?: boolean; caseId?: string };

function readCaseFromPath(): string | null {
  const match = window.location.pathname.match(/^\/case\/([^/]+)\/?$/);
  if (!match) return null;
  return slugToProjectId[match[1]] ?? null;
}

function leaveCaseRoute() {
  if (!window.location.pathname.startsWith("/case/")) return;
  const state = window.history.state as CaseHistoryState | null;
  if (state?.uberagent) {
    window.history.back();
    return;
  }
  window.history.replaceState(null, "", "/");
}

export function getCaseUrl(projectId: string): string {
  const project = projects.find((p) => p.id === projectId);
  return project ? `/case/${project.slug}` : "/";
}

export type SetProjectIdOptions = { syncUrl?: boolean };

export function useCaseRoute() {
  const [openProjectId, setOpenProjectIdState] = useState<string | null>(
    () => readCaseFromPath(),
  );

  const setOpenProjectId = useCallback((id: string | null, options?: SetProjectIdOptions) => {
    const syncUrl = options?.syncUrl !== false;

    if (id) {
      const project = projects.find((p) => p.id === id);
      if (!project) return;
      const url = `/case/${project.slug}`;
      setOpenProjectIdState(id);
      if (!syncUrl) return;
      if (window.location.pathname !== url) {
        const onDetail =
          window.location.pathname.startsWith("/service/") ||
          window.location.pathname.startsWith("/case/");
        const state = { uberagent: true, caseId: id };
        if (onDetail) {
          window.history.replaceState(state, "", url);
        } else {
          window.history.pushState(state, "", url);
        }
      }
      return;
    }

    setOpenProjectIdState(null);
    if (syncUrl) leaveCaseRoute();
  }, []);

  useEffect(() => {
    const onPopState = () => {
      setOpenProjectIdState(readCaseFromPath());
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return { openProjectId, setOpenProjectId };
}
