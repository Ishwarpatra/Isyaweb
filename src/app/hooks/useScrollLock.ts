import { useEffect } from "react";

/**
 * Calculates the current OS scrollbar width so we can compensate it with
 * `padding-right` before hiding `overflow` — preventing viewport-width jitter
 * on Windows/Linux where the scrollbar occupies real pixel space.
 */
function getScrollbarWidth(): number {
  return window.innerWidth - document.documentElement.clientWidth;
}

export function lockScroll() {
  if (typeof document === "undefined") return;
  const count = parseInt(document.body.getAttribute("data-scroll-locks") || "0", 10);
  document.body.setAttribute("data-scroll-locks", String(count + 1));
  if (count === 0) {
    // Compensate scrollbar width BEFORE hiding overflow so layout doesn't jump
    const scrollbarWidth = getScrollbarWidth();
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";
  }
}

export function unlockScroll() {
  if (typeof document === "undefined") return;
  const count = Math.max(0, parseInt(document.body.getAttribute("data-scroll-locks") || "0", 10) - 1);
  document.body.setAttribute("data-scroll-locks", String(count));
  if (count === 0) {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }
}

export function useScrollLock(lock: boolean) {
  useEffect(() => {
    if (lock) {
      lockScroll();
      return () => {
        unlockScroll();
      };
    }
  }, [lock]);
}
