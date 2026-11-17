// Shared motion building blocks. One easing curve and one rhythm across the whole page, so the motion
// reads as a single system rather than a set of effects. Everything here:
//   - reveals once and stays visible (the old observers hid sections again when they left the screen);
//   - animates only opacity and transform, so scrolling stays smooth on phones;
//   - follows the visitor's "reduce motion" setting (MotionConfig reducedMotion="user" in _app.js,
//     plus the explicit checks below for the parts framer cannot see).
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" };

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// A block that rises into place the first time it scrolls into view.
export const Reveal = ({ as = "div", delay = 0, y = 28, x = 0, className, children, ...rest }) => {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, x }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      viewport={VIEWPORT}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// A container whose StaggerItem children arrive one after another.
export const Stagger = ({ as = "div", stagger = 0.08, delay = 0, className, children, ...rest }) => {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      viewport={VIEWPORT}
      whileInView="show"
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const StaggerItem = ({ as = "div", className, children, ...rest }) => {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={fadeUp} {...rest}>
      {children}
    </Tag>
  );
};

// Counts up to `to` the first time it is seen. The server renders the final number, so the page
// is correct without JavaScript; the count writes to the DOM directly, so there is no re-render
// and no hydration mismatch.
export const CountUp = ({ to, suffix = "", duration = 1.6, className }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const format = (v) => `${Math.round(v).toLocaleString("en-US")}${suffix}`;

  useEffect(() => {
    if (!inView || reduce || !ref.current) return undefined;
    const node = ref.current;
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = format(v);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, to]);

  return (
    <span className={className} ref={ref}>
      {format(to)}
    </span>
  );
};

// A card that leans a few degrees toward the pointer and carries a soft light under it.
// Mouse only: touch devices get a still card.
export const TiltCard = ({ className, children, max = 5 }) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 160, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring);

  const onMove = (event) => {
    if (reduce || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const fx = (event.clientX - rect.left) / rect.width;
    const fy = (event.clientY - rect.top) / rect.height;
    px.set(fx - 0.5);
    py.set(fy - 0.5);
    ref.current.style.setProperty("--spot-x", `${fx * 100}%`);
    ref.current.style.setProperty("--spot-y", `${fy * 100}%`);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      className={`spotlight relative ${className || ""}`}
      onPointerLeave={onLeave}
      onPointerMove={onMove}
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
    >
      {children}
    </motion.div>
  );
};

// Heading text that rises word by word out of a mask the first time it is seen.
// Screen readers get the plain sentence; the animated words are hidden from them.
export const SplitText = ({ text, className = "", delay = 0, stagger = 0.06 }) => {
  const words = text.split(" ");
  return (
    <motion.span
      className={`inline ${className}`}
      initial="hidden"
      viewport={VIEWPORT}
      whileInView="show"
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span className="inline-block overflow-hidden pb-[0.12em] align-bottom" key={`${word}-${i}`}>
            <motion.span
              className="inline-block"
              transition={{ duration: 0.8, ease: EASE, delay: delay + i * stagger }}
              variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </motion.span>
  );
};

// Pulls its child a little toward the pointer, then springs back. Mouse only.
export const Magnetic = ({ children, strength = 0.28, className = "" }) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });
  const onMove = (event) => {
    if (reduce || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div
      className={`inline-block ${className}`}
      onPointerLeave={reset}
      onPointerMove={onMove}
      ref={ref}
      style={{ x, y }}
    >
      {children}
    </motion.div>
  );
};

// Cycles through words in one slot. Every word sits in the same grid cell, so the slot is as wide as
// the longest word and nothing around it jumps when the word changes.
export const RotatingWords = ({ words, interval = 2400, className = "" }) => {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [reduce, interval, words.length]);

  return (
    <span aria-hidden="true" className="relative inline-grid overflow-hidden pb-[0.12em] align-bottom">
      {words.map((word) => (
        <span className="invisible col-start-1 row-start-1 whitespace-nowrap" key={`ghost-${word}`}>
          {word}
        </span>
      ))}
      <AnimatePresence initial={false}>
        <motion.span
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          className={`col-start-1 row-start-1 whitespace-nowrap ${className}`}
          exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
          initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
          key={words[index]}
          transition={{ duration: 0.65, ease: EASE }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
