import { HiAcademicCap, HiCalendarDays } from "react-icons/hi2";
import { IoSchoolSharp } from "react-icons/io5";
import { EducationData } from "@/constants/EducationData";
import { Reveal, SplitText, Stagger, StaggerItem } from "@/components/motion/Motion";

const Education = () => {
  return (
    <section
      id="education"
      className="overflow-hidden bg-white px-5 py-20 shadow-sm shadow-zinc-300 dark:bg-black dark:shadow-zinc-800 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-600 dark:text-cyan-400">
            Training and school
          </p>
          <h2 className="mt-3 flex items-center justify-center gap-3 text-4xl font-black tracking-tight md:text-5xl">
            <IoSchoolSharp /> <SplitText text="Education" />
          </h2>
        </Reveal>

        <Stagger className="grid gap-5 md:grid-cols-2" stagger={0.1}>
          {EducationData.map((education) => (
            <StaggerItem key={education.name} className="h-full">
              <div className="interactive-card flex h-full gap-5 rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="h-fit rounded-2xl bg-zinc-950 p-3 text-2xl text-cyan-400 dark:bg-white dark:text-red-600">
                  <HiAcademicCap />
                </div>
                <div>
                  <h3 className="text-left text-xl font-bold">{education.name}</h3>
                  <p className="mt-1 text-left text-slate-600 dark:text-slate-300">{education.schoolOrCollege}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-slate-200">
                      <HiCalendarDays /> {education.fromTo}
                    </span>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {education.statusOrPrecentage}
                    </span>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default Education;
