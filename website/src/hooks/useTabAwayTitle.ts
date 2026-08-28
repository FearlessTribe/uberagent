import { useEffect } from "react";

const AWAY_TITLES = [
  "Komm zurück — Agents warten",
  "Hey, hier wird gebaut",
  "Noch da? · uberagent",
  "Wir sind noch da",
  "Exzellenz wartet nicht",
] as const;

function pickAwayTitle() {
  return AWAY_TITLES[Math.floor(Math.random() * AWAY_TITLES.length)];
}

/** Swap the tab title when the user leaves, restore on return. */
export function useTabAwayTitle() {
  useEffect(() => {
    let storedTitle = document.title;

    const syncStoredTitle = () => {
      if (!document.hidden) {
        storedTitle = document.title;
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        storedTitle = document.title;
        document.title = pickAwayTitle();
        return;
      }

      document.title = storedTitle;
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("focus", syncStoredTitle);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("focus", syncStoredTitle);
      if (document.hidden) {
        document.title = storedTitle;
      }
    };
  }, []);
}
