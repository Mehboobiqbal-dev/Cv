"use client";

import Image from "next/image";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { HiArrowUpRight } from "react-icons/hi2";
import { ProjectsData } from "@/constants";

const Projects = () => {
  return (
    <section
      id="project"
      className="overflow-hidden bg-slate-50 px-5 py-20 shadow-sm shadow-zinc-300 dark:bg-zinc-950 dark:shadow-zinc-800 md:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-center text-sm font-bold uppercase tracking-[0.25em] text-red-600 dark:text-cyan-400">
            Selected work
          </p>
          <h2 className="flex items-center justify-center gap-3 text-3xl font-bold md:text-5xl">
            <CgWebsite /> Projects built for real users
          </h2>
          <p className="mt-5 text-center text-base leading-7 text-slate-600 dark:text-slate-300 md:text-lg">
            From bilingual e-commerce stores to AI products and enterprise
            platforms, I build complete digital experiences that are fast,
            responsive, and ready for production.
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-2">
          {ProjectsData.map((project) => (
            <article
              className={`group overflow-hidden rounded-3xl border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-zinc-900 ${
                project.featured
                  ? "border-amber-300 shadow-xl shadow-amber-100/60 dark:border-amber-500/50 dark:shadow-none"
                  : "border-slate-200 shadow-lg shadow-slate-200/50 dark:border-zinc-800 dark:shadow-none"
              }`}
              key={project.projectName}
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-200 dark:bg-zinc-800">
                <Image
                  src={project.projectImage.imageUrl}
                  alt={project.projectImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top transition duration-500 group-hover:scale-[1.025]"
                />
                {project.featured ? (
                  <span className="absolute left-4 top-4 rounded-full bg-amber-400 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-zinc-950 shadow">
                    Featured
                  </span>
                ) : null}
              </div>

              <div className="p-6 md:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-600 dark:text-cyan-400">
                  {project.eyebrow || "Full-stack project"}
                </p>
                <div className="mt-2 flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-bold md:text-3xl">
                    {project.projectName}
                  </h3>
                  <div className="flex shrink-0 gap-2">
                    {project.githubUrl ? (
                      <Link
                        className="rounded-full border border-slate-300 p-2 text-lg transition hover:border-zinc-950 hover:bg-zinc-950 hover:text-white dark:border-zinc-700 dark:hover:border-white dark:hover:bg-white dark:hover:text-zinc-950"
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${project.projectName} source code`}
                      >
                        <BsGithub />
                      </Link>
                    ) : null}
                    <Link
                      className="rounded-full bg-zinc-950 p-2 text-lg text-white transition hover:bg-red-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-cyan-400"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Visit ${project.projectName}`}
                    >
                      <HiArrowUpRight />
                    </Link>
                  </div>
                </div>
                <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                  {project.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.techs.map((tech) => (
                    <span
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-slate-200"
                      key={tech}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
