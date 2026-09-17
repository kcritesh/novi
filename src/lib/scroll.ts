import { getLenis } from "./lenis";

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToHash(hash: string) {
  const target = document.getElementById(hash.replace(/^#/, ""));
  if (!target) return;

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target, { offset: -80 });
  } else {
    target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  }

  history.pushState(null, "", hash);
  target.focus({ preventScroll: true });
}
