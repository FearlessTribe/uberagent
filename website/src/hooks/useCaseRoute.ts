import { useCallback, useEffect, useState } from "react";
import { projects } from "../data/projects";

const slugToProjectId = Object.fromEntries(
  projects.map((p) => [p.slug, p.id]),
);

function readCaseFromPath(): string | null {
  const match = window.location.pathname.match(/^\/case\/([^/]+)\/?$/);
  if (!match) return null;
  return slugToProjectId[match[1]] ?? null;
}

export function getCaseUrl(projectId: string): string {
  const project = projects.find((p) => p.id === projectId);
  return project ? `/case/${project.slug}` : "/";
}

export function useCaseRoute() {
  const [openProjectId, setOpenProjectIdState] = useState<string | null>(
    () => readCaseFromPath(),
  );

  const setOpenProjectId = useCallback((id: string | null) => {
    setOpenProjectIdState(id);

    if (id) {
      const project = projects.find((p) => p.id === id);
      if (!project) return;
      const url = `/case/${project.slug}`;
      if (window.location.pathname !== url) {
        window.history.pushState({ caseId: id }, "", url);
      }
      return;
    }

    if (window.location.pathname.startsWith("/case/")) {
      window.history.pushState(null, "", "/");
    }
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
