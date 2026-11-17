import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// A soft ring that trails the mouse, grows over links and buttons, and turns into an "Open" badge
// over project screenshots (elements with data-cursor="view"). The normal cursor stays visible.
// Mouse/trackpad only; off for touch screens and for "reduce motion".
const SIZES = { default: 28, link: 52, view: 84 };

const CursorFollower = () => {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState("default");
  const [hidden, setHidden] = useState(true);
  const modeRef = useRef("default");
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 520, damping: 42, mass: 0.45 });
  const sy = useSpring(y, { stiffness: 520, damping: 42, mass: 0.45 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return undefined;
    setEnabled(true);

    const onMove = (event) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      setHidden(false);
      const target = event.target.closest ? event.target.closest("[data-cursor], a, button, [role='tab']") : null;
      const next = target ? target.getAttribute("data-cursor") || "link" : "default";
      if (next !== modeRef.current) {
        modeRef.current = next;
        setMode(next);
      }
    };
    const onLeave = () => setHidden(true);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;
  const size = SIZES[mode] || SIZES.default;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        animate={{ height: size, opacity: hidden ? 0 : 1, width: size }}
        className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[11px] font-black uppercase tracking-widest ${
          mode === "view"
            ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
            : mode === "link"
              ? "border border-red-500/50 bg-red-500/10 dark:border-cyan-300/60 dark:bg-cyan-300/10"
              : "border-[1.5px] border-zinc-500/60 dark:border-white/50"
        }`}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      >
        {mode === "view" ? "Open ↗" : null}
      </motion.div>
    </motion.div>
  );
};

export default CursorFollower;
