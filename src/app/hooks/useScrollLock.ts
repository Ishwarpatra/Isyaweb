import { useEffect } from "react";

export function lockScroll() {
  if (typeof document === "undefined") return;
  const count = parseInt(document.body.getAttribute("data-scroll-locks") || "0", 10);
  document.body.setAttribute("data-scroll-locks", String(count + 1));
  document.body.style.overflow = "hidden";
}

export function unlockScroll() {
  if (typeof document === "undefined") return;
  const count = Math.max(0, parseInt(document.body.getAttribute("data-scroll-locks") || "0", 10) - 1);
  document.body.setAttribute("data-scroll-locks", String(count));
  if (count === 0) {
    document.body.style.overflow = "";
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
