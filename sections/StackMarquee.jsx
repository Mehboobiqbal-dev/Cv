import { TechStackData } from "@/constants/SkillsData";

const data = TechStackData[0];
const rowA = data.Advance || [];
const rowB = [...(data.Good || []), ...(data.Familiar || []).slice(0, 2)];

// One endless row: the list is rendered twice and the track slides by half its width, so the loop
// has no seam. Hovering pauses it; "reduce motion" stops it (globals.css).
const Row = ({ items, reverse, duration }) => (
  <div className="marquee flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
    <ul
      className={`marquee-track flex w-max shrink-0 gap-3 pr-3 ${reverse ? "marquee-reverse" : ""}`}
      style={{ "--marquee-duration": duration }}
    >
      {[...items, ...items].map((tech, i) => (
        <li
          aria-hidden={i >= items.length ? "true" : undefined}
          className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-slate-200 [&_svg]:!text-xl"
          key={`${tech.name}-${i}`}
        >
          {tech.icon}
          {tech.name}
        </li>
      ))}
    </ul>
  </div>
);

const StackMarquee = () => (
  <section aria-label="Technologies I work with" className="border-y border-slate-200 bg-slate-50 py-8 dark:border-zinc-900 dark:bg-zinc-950">
    <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
      The stack behind my live projects
    </p>
    <div className="space-y-3">
      <Row duration="46s" items={rowA} />
      <Row duration="52s" items={rowB} reverse />
    </div>
  </section>
);

export default StackMarquee;
