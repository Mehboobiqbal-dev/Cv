import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FaBriefcase } from "react-icons/fa";
import { HiCheckCircle, HiMapPin } from "react-icons/hi2";
import { ExperienceData } from "@/constants/ExperienceData";
import { EASE, Reveal, SplitText } from "@/components/motion/Motion";

const Experience = () => {
  const timelineRef = useRef(null);
  // The coloured line grows with the reader's scroll through the timeline.
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  // glowing tip that rides the end of the drawn line
  const headTop = useTransform(progress, (v) => `calc(1.5rem + (100% - 3rem) * ${Math.min(Math.max(v, 0), 1)})`);

  return (
    <section
      id="experience"
      className="overflow-hidden bg-white px-5 py-20 shadow-sm shadow-zinc-300 dark:bg-black dark:shadow-zinc-800 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 text-center">
          <p className="text-center text-sm font-bold uppercase tracking-[0.25em] text-red-600 dark:text-cyan-400">
            Professional journey
          </p>
          <h2 className="mt-3 flex items-center justify-center gap-3 text-4xl font-black tracking-tight md:text-5xl">
            <FaBriefcase /> <SplitText text="Experience" />
          </h2>
        </Reveal>

        <div ref={timelineRef} className="relative">
          {/* track + drawn progress */}
          <div className="absolute bottom-6 left-[19px] top-6 w-px bg-slate-200 dark:bg-zinc-800 md:left-1/2" />
          <motion.div
            style={{ scaleY: progress }}
            className="absolute bottom-6 left-[19px] top-6 w-[2px] origin-top -translate-x-[0.5px] bg-gradient-to-b from-emerald-400 via-cyan-400 to-red-500 md:left-1/2"
          />
          <motion.div
            aria-hidden="true"
            className="absolute left-[19.5px] z-[2] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_16px_6px_rgba(34,211,238,0.55)] md:left-1/2"
            style={{ top: headTop }}
          />

          {ExperienceData.map((experience, index) => {
            const left = index % 2 === 0;
            return (
              <div
                key={`${experience.companyName}-${experience.fromTo}`}
                className={`relative pl-14 md:w-[calc(50%-2.5rem)] md:pl-0 ${left ? "md:mr-auto" : "md:ml-auto"} ${index > 0 ? "mt-8 md:-mt-20" : ""}`}
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                  transition={{ type: "spring", stiffness: 380, damping: 20, delay: 0.15 }}
                  className={`absolute left-2.5 top-8 z-[1] flex h-5 w-5 items-center justify-center rounded-full border-4 border-white dark:border-black md:left-auto ${
                    left ? "md:-right-[50px]" : "md:-left-[50px]"
                  } ${experience.current ? "bg-emerald-500" : "bg-red-500 dark:bg-cyan-400"}`}
                >
                  {experience.current ? (
                    <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                  ) : null}
                </motion.span>

                <motion.div
                  initial={{ opacity: 0, x: left ? -36 : 36, y: 12 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  <div className="interactive-card rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none md:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm font-bold uppercase tracking-[0.15em] text-red-600 dark:text-cyan-400">
                        {experience.fromTo}
                      </p>
                      {experience.current ? (
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          Current role
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-3 text-left text-2xl font-black">{experience.role}</h3>
                    <p className="mt-1 text-left text-lg font-semibold text-slate-800 dark:text-slate-100">
                      {experience.companyName}
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-left text-sm text-slate-500 dark:text-slate-400">
                      <HiMapPin /> {experience.location}
                    </p>
                    <p className="mt-5 text-left leading-7 text-slate-600 dark:text-slate-300">
                      {experience.description}
                    </p>
                    {experience.highlights ? (
                      <ul className="mt-5 space-y-3">
                        {experience.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-start gap-3">
                            <HiCheckCircle className="mt-1 shrink-0 text-lg text-emerald-500" />
                            <span className="leading-6 text-slate-700 dark:text-slate-200">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
