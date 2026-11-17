import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { FaLaptopCode } from "react-icons/fa";
import { TechStackData } from "@/constants/SkillsData";
import { EASE, Reveal, SplitText, Stagger, StaggerItem } from "@/components/motion/Motion";

const TABS = [
  ["Advance", "Advanced"],
  ["Good", "Good"],
  ["Familiar", "Familiar"],
];

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};
const tile = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } },
};

const TechStack = () => {
  const [tab, setTab] = useState("Advance");
  const sectionRef = useRef(null);
  // Tiles stay hidden until the section is first seen, then animate on every tab change.
  const seen = useInView(sectionRef, { once: true, margin: "0px 0px -15% 0px" });
  const data = TechStackData[0];
  const items = data[tab] || [];
  const glance = (data.Others || []).map(({ name }) => {
    const at = name.indexOf(":");
    return at > 0 ? [name.slice(0, at), name.slice(at + 1).trim()] : ["", name];
  });

  return (
    <section
      ref={sectionRef}
      id="techStack"
      className="overflow-hidden bg-slate-50 px-5 py-20 shadow-sm shadow-zinc-300 dark:bg-zinc-950 dark:shadow-zinc-800 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-600 dark:text-cyan-400">
            What I work with
          </p>
          <h2 className="mt-3 flex items-center justify-center gap-3 text-4xl font-black tracking-tight md:text-5xl">
            <FaLaptopCode /> <SplitText text="Tech Stack" />
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Skill level"
            className="relative inline-flex rounded-full border border-slate-300 bg-white p-1 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
          >
            {TABS.map(([key, label]) => {
              const active = tab === key;
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(key)}
                  className={`relative rounded-full px-5 py-2 text-sm font-bold transition-colors md:px-7 md:text-base ${
                    active ? "text-white dark:text-zinc-950" : "text-slate-600 hover:text-zinc-950 dark:text-slate-300 dark:hover:text-white"
                  }`}
                >
                  {active ? (
                    <motion.span
                      layoutId="skills-tab"
                      className="absolute inset-0 rounded-full bg-zinc-950 dark:bg-white"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-10 min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.ul
              key={tab}
              variants={grid}
              initial="hidden"
              animate={seen ? "show" : "hidden"}
              exit="exit"
              className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 md:gap-4"
            >
              {items.map((tech) => (
                <motion.li key={tech.name} variants={tile}>
                  <div className="interactive-card flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-2 py-5 text-center dark:border-zinc-800 dark:bg-zinc-900">
                    <span aria-hidden="true">{tech.icon}</span>
                    <span className="text-sm font-semibold">{tech.name}</span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

        {glance.length ? (
          <Stagger className="mt-14 grid gap-3 md:grid-cols-2" stagger={0.06}>
            {glance.map(([label, value]) => (
              <StaggerItem
                key={label + value}
                className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
              >
                {label ? (
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-600 dark:text-cyan-400">{label}</p>
                ) : null}
                <p className="mt-1.5 text-left leading-7 text-slate-700 dark:text-slate-200">{value}</p>
              </StaggerItem>
            ))}
          </Stagger>
        ) : null}
      </div>
    </section>
  );
};

export default TechStack;
