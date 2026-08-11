import { FaBriefcase } from "react-icons/fa";
import { HiCheckCircle, HiMapPin } from "react-icons/hi2";
import { ExperienceData } from "@/constants/ExperienceData";

const Experience = () => {
  return (
    <section
      id="experience"
      className="overflow-hidden bg-slate-50 px-5 py-20 shadow-sm shadow-zinc-300 dark:bg-zinc-950 dark:shadow-zinc-800 md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-center text-sm font-bold uppercase tracking-[0.25em] text-red-600 dark:text-cyan-400">
            Professional journey
          </p>
          <h2 className="mt-3 flex items-center justify-center gap-3 text-4xl font-black md:text-5xl">
            <FaBriefcase /> Experience
          </h2>
        </div>

        <div className="relative space-y-6 before:absolute before:bottom-6 before:left-[19px] before:top-6 before:w-px before:bg-slate-300 dark:before:bg-zinc-700 md:before:left-1/2">
          {ExperienceData.map((experience, index) => (
            <article
              key={`${experience.companyName}-${experience.fromTo}`}
              className={`relative pl-14 md:w-[calc(50%-2rem)] md:pl-0 ${
                index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
              }`}
            >
              <span
                className={`absolute left-2.5 top-8 z-[1] h-5 w-5 rounded-full border-4 border-slate-50 dark:border-zinc-950 md:left-auto ${
                  index % 2 === 0 ? "md:-right-[42px]" : "md:-left-[42px]"
                } ${experience.current ? "bg-emerald-500" : "bg-red-500"}`}
              />
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none md:p-8">
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
                <h3 className="mt-3 text-left text-2xl font-black">
                  {experience.role}
                </h3>
                <p className="mt-2 text-left text-lg font-semibold">
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
                        <span className="leading-6 text-slate-700 dark:text-slate-200">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
