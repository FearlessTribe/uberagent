let lockCount = 0;
let savedScrollY = 0;
let pendingScroll: (() => void) | null = null;

function getScrollPaddingTop(): number {
  const value = getComputedStyle(document.documentElement).scrollPaddingTop;
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getSectionScrollY(el: HTMLElement): number {
  const baseY = lockCount > 0 ? savedScrollY : window.scrollY;
  return Math.max(0, baseY + el.getBoundingClientRect().top - getScrollPaddingTop());
}

export function isScrollLocked(): boolean {
  return lockCount > 0;
}

export function lockScroll() {
  if (lockCount === 0) {
    savedScrollY = window.scrollY;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.width = "100%";
  }
  lockCount++;
}

function clearScrollLockStyles() {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
}

export function unlockScroll() {
  if (lockCount === 0) return;
  lockCount--;
  if (lockCount !== 0) return;

  const scroll = pendingScroll;
  pendingScroll = null;
  clearScrollLockStyles();

  if (scroll) {
    requestAnimationFrame(scroll);
    return;
  }

  window.scrollTo({ top: savedScrollY, left: 0, behavior: "instant" });
}

export function scrollToSection(id: string, behavior: ScrollBehavior = "auto") {
  const el = document.getElementById(id);
  if (!el) return;

  const top = getSectionScrollY(el);
  const run = () => {
    window.scrollTo({ top, left: 0, behavior });
  };

  if (lockCount > 0) {
    pendingScroll = run;
    return;
  }

  run();
}
