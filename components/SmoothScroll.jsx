import { useEffect } from "react";
import Lenis from "lenis";

// Weighted, smooth scrolling for mouse and trackpad (Lenis). Touch devices keep native scrolling,
// and visitors who ask for reduced motion get the browser's normal scroll. Anchor links (#work …)
// glide to their section and stop below the fixed navbar.
const SmoothScroll = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const lenis = new Lenis({
      anchors: { offset: -88 },
      autoRaf: true,
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      syncTouch: false,
    });
    window.__lenis = lenis;
    return () => {
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
  return null;
};

// Scroll to a section, smoothly when Lenis runs.
export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -88 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default SmoothScroll;
