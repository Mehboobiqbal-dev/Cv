import Image from "next/image";
import { BsGithub } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { HiArrowUpRight } from "react-icons/hi2";
import { ProjectsData } from "@/constants";
import { Reveal, SplitText, Stagger, StaggerItem, TiltCard } from "@/components/motion/Motion";

// The two case studies have their own section above; this grid shows the rest.
const projects = ProjectsData.filter((project) => !project.caseStudy);

const Projects = () => {
  return (
    <section
      id="project"
      className="overflow-hidden bg-slate-50 px-5 py-20 shadow-sm shadow-zinc-300 dark:bg-zinc-950 dark:shadow-zinc-800 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-center text-sm font-bold uppercase tracking-[0.25em] text-red-600 dark:text-cyan-400">
            Selected work
          </p>
          <h2 className="flex items-center justify-center gap-3 text-3xl font-black tracking-tight md:text-5xl">
            <CgWebsite /> <SplitText text="More live work" />
          </h2>
          <p className="mt-5 text-center text-base leading-7 text-slate-600 dark:text-slate-300 md:text-lg">
            The app and second store from my current job, my own web app, and
            client sites. Every project here is live today: open any of them.
          </p>
        </Reveal>

        <Stagger className="grid gap-7 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {projects.map((project) => (
            <StaggerItem key={project.projectName} className="h-full">
              <TiltCard className="h-full rounded-3xl" max={3}>
              <article className="interactive-card group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${project.projectName}`}
                  data-cursor="view"
                  className="relative block aspect-[16/10] overflow-hidden bg-slate-200 dark:bg-zinc-800"
                >
                  <Image
                    src={project.projectImage.imageUrl}
                    alt={project.projectImage.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="site-scroll object-cover"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 shadow backdrop-blur dark:bg-zinc-950/80 dark:text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live
                  </span>
                </a>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-600 dark:text-cyan-400">
                    {project.eyebrow || "Web project"}
                  </p>
                  <h3 className="mt-2 text-left text-2xl font-bold">{project.projectName}</h3>
                  <p className="mt-3 flex-1 text-left leading-7 text-slate-600 dark:text-slate-300">
                    {project.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.techs.map((tech) => (
                      <span
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-slate-200"
                        key={tech}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <a
                      className="group/btn inline-flex items-center gap-1.5 rounded-full bg-zinc-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-cyan-400"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live site
                      <HiArrowUpRight className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                    </a>
                    {project.githubUrl ? (
                      <a
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-4 py-2 text-sm font-bold transition hover:border-zinc-950 dark:border-zinc-700 dark:hover:border-white"
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <BsGithub /> Code
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default Projects;
