import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

// The hero's editor card: his profile typed out as a TypeScript object, with syntax colours.
// Every value is a fact from the CV. An invisible full copy sits underneath and reserves the
// card's final size, so typing never moves anything on the page.
const k = "text-fuchsia-400"; // keyword
const s = "text-emerald-300"; // string
const p = "text-sky-300"; // property
const c = "text-zinc-500"; // comment / punctuation
const n = "text-zinc-100"; // plain

const TOKENS = [
  [c, "// mehboob.ts\n"],
  [k, "export const "], [n, "mehboob"], [c, " = {\n"],
  [p, "  role"], [c, ": "], [s, "\"Web Developer\""], [c, ",\n"],
  [p, "  basedIn"], [c, ": "], [s, "\"Hail, Saudi Arabia\""], [c, ",\n"],
  [p, "  stack"], [c, ": ["], [s, "\"React\""], [c, ", "], [s, "\"Next.js\""], [c, ", "], [s, "\"TypeScript\""], [c, ",\n          "],
  [s, "\"Node.js\""], [c, ", "], [s, "\"PHP\""], [c, ", "], [s, "\"Flutter\""], [c, "],\n"],
  [p, "  running"], [c, ": ["], [s, "\"road-biker.com\""], [c, ", "], [s, "\"wordmarkremover.com\""], [c, "],\n"],
  [p, "  openTo"], [c, ": ["], [s, "\"remote\""], [c, ", "], [s, "\"relocation\""], [c, "],\n"],
  [c, "};"],
];
const TOTAL = TOKENS.reduce((sum, [, text]) => sum + text.length, 0);

const Code = ({ upTo }) => {
  let left = upTo;
  return TOKENS.map(([cls, text], i) => {
    if (left <= 0) return null;
    const shown = text.slice(0, left);
    left -= text.length;
    return (
      <span className={cls} key={i}>
        {shown}
      </span>
    );
  });
};

const HeroCode = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const done = typed >= TOTAL;

  useEffect(() => {
    if (!inView) return undefined;
    if (reduce) {
      setTyped(TOTAL);
      return undefined;
    }
    let raf = 0;
    let startAt = 0;
    const CHARS_PER_SECOND = 140;
    const step = (time) => {
      if (!startAt) startAt = time + 450; // let the card land before typing starts
      const count = Math.max(0, Math.floor(((time - startAt) / 1000) * CHARS_PER_SECOND));
      setTyped(Math.min(count, TOTAL));
      if (count < TOTAL) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce]);

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#0b0d12]" ref={ref}>
      <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
        <span className="ml-3 rounded-md bg-zinc-800/80 px-2.5 py-0.5 font-mono text-[11px] text-zinc-300">mehboob.ts</span>
        <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] text-emerald-400">
          <span className={`h-1.5 w-1.5 rounded-full ${done ? "bg-emerald-400" : "animate-pulse bg-amber-400"}`} />
          {done ? "compiled" : "typing…"}
        </span>
      </div>
      <pre className="relative overflow-x-auto p-4 font-mono text-[12.5px] leading-6 md:text-[13px]">
        {/* reserves the final size */}
        <code aria-hidden="true" className="invisible block whitespace-pre">
          <Code upTo={TOTAL} />
        </code>
        <code className="absolute inset-0 block whitespace-pre p-4">
          <span className="sr-only">
            Mehboob Iqbal, web developer based in Hail, Saudi Arabia. Stack: React, Next.js, TypeScript, Node.js, PHP, Flutter. Running road-biker.com and wordmarkremover.com. Open to remote work and relocation.
          </span>
          <span aria-hidden="true">
            <Code upTo={typed} />
            <span className={`ml-px inline-block h-[1.1em] w-[7px] translate-y-[3px] bg-cyan-300 ${done ? "animate-pulse" : ""}`} />
          </span>
        </code>
      </pre>
    </div>
  );
};

export default HeroCode;
