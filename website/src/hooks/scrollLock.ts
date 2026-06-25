let lockCount = 0;
let savedScrollY = 0;

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

export function unlockScroll() {
  if (lockCount === 0) return;
  lockCount--;
  if (lockCount === 0) {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, savedScrollY);
  }
}
