import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { HiArrowUpRight, HiCheckCircle, HiDevicePhoneMobile } from "react-icons/hi2";

import { CountUp, Magnetic, Reveal, SplitText, Stagger, StaggerItem } from "@/components/motion/Motion";
import { ProjectsData } from "@/constants";

const studies = ProjectsData.filter((project) => project.caseStudy);

const Metric = ({ metric }) => (
  <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/70">
    <p className="text-2xl font-black tabular-nums text-zinc-950 dark:text-white md:text-3xl">
      {typeof metric.to === "number" ? <CountUp suffix={metric.suffix || ""} to={metric.to} /> : metric.text}
    </p>
    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
      {metric.label}
    </p>
  </div>
);

const CaseStudy = ({ project, flip }) => {
  const articleRef = useRef(null);
  const imageRef = useRef(null);
  const reduce = useReducedMotion();
  const { caseStudy } = project;

  // The screenshot scrolls through the live page in step with the reader's scroll through this
  // case study (phones included: no hover needed). Written straight to the <img>, no re-renders.
  const { scrollYProgress } = useScroll({ target: articleRef, offset: ["start 75%", "end 45%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });
  useMotionValueEvent(progress, "change", (v) => {
    if (reduce || !imageRef.current) return;
    imageRef.current.style.objectPosition = `50% ${Math.min(Math.max(v, 0), 1) * 100}%`;
  });
  useEffect(() => {
    if (imageRef.current) imageRef.current.style.objectPosition = "50% 0%";
  }, []);

  return (
    <article className="grid items-start gap-8 lg:grid-cols-2 lg:gap-14" ref={articleRef}>
      <Reveal className={`lg:sticky lg:top-28 ${flip ? "lg:order-2" : ""}`} x={flip ? 40 : -40} y={0}>
        <a
          aria-label={`Open ${project.projectName} live site`}
          className="group relative block overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-2xl shadow-slate-300/50 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/50"
          data-cursor="view"
          href={project.liveUrl}
          rel="noreferrer"
          target="_blank"
        >
          {/* browser chrome */}
          <div className="relative flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
            <span className="ml-3 truncate rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500 dark:bg-zinc-900 dark:text-zinc-400">
              {project.liveUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/(#.*)?$/, "")}
            </span>
            <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Live
            </span>
            {/* how far through the live page the preview is */}
            <motion.span
              className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-red-500 via-amber-400 to-cyan-400"
              style={{ scaleX: progress }}
            />
          </div>
          <div className="relative aspect-[4/3]">
            <Image
              alt={project.projectImage.alt}
              className="object-cover"
              fill
              ref={imageRef}
              sizes="(max-width: 1024px) 100vw, 50vw"
              src={project.projectImage.imageUrl}
            />
          </div>
        </a>
      </Reveal>

      <Stagger className={flip ? "lg:order-1" : ""}>
        <StaggerItem>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600 dark:text-cyan-400">
            {project.eyebrow}
          </p>
          <h3 className="mt-2 text-left text-3xl font-black tracking-tight md:text-5xl">{project.projectName}</h3>
        </StaggerItem>

        <StaggerItem className="mt-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">The problem</p>
          <p className="mt-2 text-left text-lg leading-8 text-slate-700 dark:text-slate-300">{caseStudy.problem}</p>
        </StaggerItem>

        <StaggerItem className="mt-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">What I did</p>
          <ul className="mt-3 space-y-3">
            {caseStudy.built.map((line) => (
              <li className="flex items-start gap-3" key={line}>
                <HiCheckCircle className="mt-1 shrink-0 text-lg text-emerald-500" />
                <span className="leading-7 text-slate-700 dark:text-slate-200">{line}</span>
              </li>
            ))}
          </ul>
        </StaggerItem>

        <StaggerItem className="mt-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">The result</p>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {caseStudy.metrics.map((metric) => (
              <Metric key={metric.label} metric={metric} />
            ))}
          </div>
        </StaggerItem>

        <StaggerItem className="mt-7 flex flex-wrap gap-2">
          {project.techs.map((tech) => (
            <span
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-slate-200"
              key={tech}
            >
              {tech}
            </span>
          ))}
        </StaggerItem>

        <StaggerItem className="mt-8 flex flex-wrap gap-3">
          <Magnetic>
            <a
              className="group inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-2.5 font-bold text-white transition hover:bg-red-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-cyan-400"
              href={project.liveUrl}
              rel="noreferrer"
              target="_blank"
            >
              Visit live site
              <HiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Magnetic>
          {project.appUrl ? (
            <Magnetic>
              <a
                className="group inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 font-bold transition hover:border-zinc-950 dark:border-zinc-700 dark:hover:border-white"
                href={project.appUrl}
                rel="noreferrer"
                target="_blank"
              >
                <HiDevicePhoneMobile /> App Store
                <HiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
          ) : null}
        </StaggerItem>
      </Stagger>
    </article>
  );
};

const CaseStudies = () => {
  return (
    <section
      // overflow-x-clip, not overflow-hidden: "hidden" would turn this section into a scroll box and
      // switch off the sticky screenshot.
      className="overflow-x-clip bg-white px-5 py-20 shadow-sm shadow-zinc-300 dark:bg-black dark:shadow-zinc-800 md:px-10 md:py-28"
      id="work"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-600 dark:text-cyan-400">Featured work</p>
          </Reveal>
          <h2 className="mt-3 text-center text-4xl font-black tracking-tight md:text-6xl">
            <SplitText text="A closer look at what I build" />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-5 text-center text-base leading-7 text-slate-600 dark:text-slate-300 md:text-lg">
              Every project on this page is mine, and every one is live. Here are two in depth: the problem,
              what I did and the result. Each screenshot moves through its live site as you scroll.
            </p>
          </Reveal>
        </div>

        <div className="space-y-24 md:space-y-36">
          {studies.map((project, index) => (
            <CaseStudy flip={index % 2 === 1} key={project.projectName} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
