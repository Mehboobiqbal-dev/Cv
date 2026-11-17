import { useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { HiArrowDown, HiArrowUpRight, HiDocumentArrowDown, HiMapPin } from "react-icons/hi2";

import { openCommandPalette } from "@/components/commands";
import DotField from "@/components/motion/DotField";
import HeroCode from "@/components/motion/HeroCode";
import { CountUp, Magnetic, RotatingWords, TiltCard } from "@/components/motion/Motion";

const coreSkills = ["React", "Next.js", "TypeScript", "Node.js", "PHP", "MySQL", "Flutter"];

const stats = [
  { to: 7000, suffix: "", label: "Products in the stores I run" },
  { to: 5000, suffix: "+", label: "Flutter app downloads" },
  { to: 239, suffix: "", label: "Free tools I built and run" },
];

// Staggered entrance: each block starts --d after the page paints (CSS, so it does not wait for JS).
const delay = (ms) => ({ "--d": `${ms}ms` });

// One headline word inside its mask.
const Word = ({ children, at }) => (
  <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
    <span className="hero-word inline-block" style={delay(at)}>
      {children}
    </span>
  </span>
);

const Intro = () => {
  const heroRef = useRef(null);
  const reduce = useReducedMotion();
  // Depth as the hero scrolls away: the text drifts up slower than the card, both fade.
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -170]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0.15]);

  return (
    <>
      <Head>
        <title>Mehboob Iqbal | Web Developer — React, Next.js, Node.js, PHP</title>
      </Head>
      <section
        className="relative min-h-screen overflow-hidden bg-white px-5 pb-24 pt-28 shadow-sm shadow-zinc-300 dark:bg-zinc-950 dark:shadow-zinc-800 md:px-10 md:pt-36"
        id="home"
        ref={heroRef}
      >
        {/* interactive dot field + colour glows */}
        <DotField className="absolute inset-0 h-full w-full text-zinc-500 [mask-image:radial-gradient(ellipse_75%_70%_at_60%_40%,black_35%,transparent_80%)] dark:text-cyan-200" />
        <div className="blob-a pointer-events-none absolute -right-24 top-24 h-96 w-96 rounded-full bg-cyan-300/25 blur-3xl dark:bg-cyan-400/15" />
        <div className="blob-b pointer-events-none absolute -left-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-rose-400/20 blur-3xl dark:bg-rose-500/10" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div style={{ y: textY, opacity: fade }}>
            <div
              className="hero-in mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50/90 px-4 py-2 text-sm font-bold text-emerald-800 backdrop-blur dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
              style={delay(0)}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for remote work now · open to relocation
            </div>

            <p
              className="hero-in text-sm font-bold uppercase tracking-[0.18em] text-red-600 dark:text-cyan-400 md:text-base"
              style={delay(60)}
            >
              Mehboob Iqbal · Web developer
            </p>

            <h1 className="mt-5 max-w-4xl text-left text-[2.7rem] font-black leading-[1.02] tracking-tight text-zinc-950 dark:text-white sm:text-6xl md:text-7xl">
              <span className="sr-only">
                I build and run live e-commerce stores, web apps, REST APIs and Flutter apps.
              </span>
              <span aria-hidden="true" className="block">
                {["I", "build", "and", "run"].map((word, i) => (
                  <Word at={40 + i * 45} key={word}>
                    {word}
                    {" "}
                  </Word>
                ))}
              </span>
              <span aria-hidden="true" className="block">
                <Word at={220}>live{" "}</Word>
                <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                  <span className="hero-word inline-block" style={delay(265)}>
                    <RotatingWords
                      className="bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 bg-clip-text text-transparent dark:from-cyan-300 dark:via-sky-400 dark:to-emerald-300"
                      words={["e-commerce.", "web apps.", "REST APIs.", "Flutter apps."]}
                    />
                  </span>
                </span>
              </span>
            </h1>

            <p
              className="hero-in mt-7 max-w-2xl text-left text-lg leading-8 text-slate-600 dark:text-slate-300 md:text-xl"
              style={delay(300)}
            >
              I run day-to-day engineering for Road Biker&apos;s two Arabic
              e-commerce stores in Saudi Arabia and develop its Flutter app. I
              also built Wordmark Remover: 239 free file tools with a public
              API. Every project below is live.
            </p>
            <p
              className="hero-in mt-4 flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400"
              style={delay(360)}
            >
              <HiMapPin className="text-base" /> Hail, Saudi Arabia · nearly two years in production
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {coreSkills.map((skill, i) => (
                <span
                  className="hero-in rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-sm font-semibold shadow-sm backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/80"
                  key={skill}
                  style={delay(400 + i * 35)}
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="hero-in mt-10 flex flex-wrap items-center gap-3 sm:gap-4" style={delay(620)}>
              <Magnetic>
                <Link
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-zinc-950 px-6 py-3 text-base font-bold text-white shadow-lg shadow-zinc-950/20 dark:bg-white dark:text-zinc-950 sm:text-lg"
                  href="#getInTouch"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-red-600 to-amber-500 transition-transform duration-500 ease-out group-hover:translate-x-0 dark:from-cyan-400 dark:to-emerald-300" />
                  <span className="relative">Let&apos;s work together</span>
                  <HiArrowUpRight className="relative transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  className="group inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/70 px-6 py-3 text-base font-bold backdrop-blur transition hover:border-zinc-950 dark:border-zinc-700 dark:bg-zinc-950/60 dark:hover:border-white sm:text-lg"
                  href="#work"
                >
                  See my work
                  <HiArrowDown className="transition-transform duration-300 group-hover:translate-y-0.5" />
                </Link>
              </Magnetic>
              <Magnetic>
                <a
                  className="group inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/70 px-6 py-3 text-base font-bold backdrop-blur transition hover:border-zinc-950 dark:border-zinc-700 dark:bg-zinc-950/60 dark:hover:border-white sm:text-lg"
                  download="Mehboob-Iqbal-CV.pdf"
                  href="/assets/Mehboob-Iqbal-CV.pdf"
                >
                  Download CV
                  <HiDocumentArrowDown className="transition-transform duration-300 group-hover:translate-y-0.5" />
                </a>
              </Magnetic>
            </div>

            <button
              className="hero-in mt-6 hidden items-center gap-2 text-sm text-slate-500 transition hover:text-zinc-950 dark:text-slate-400 dark:hover:text-white md:inline-flex"
              onClick={openCommandPalette}
              style={delay(760)}
              type="button"
            >
              Tip: press <kbd className="key">Ctrl</kbd> <kbd className="key">K</kbd> to jump anywhere
            </button>
          </motion.div>

          <motion.div className="relative" style={{ y: cardY, opacity: fade }}>
            <div className="hero-in" style={delay(280)}>
            <TiltCard className="rounded-[2rem]" max={6}>
              <div className="rounded-[2rem] border border-slate-200 bg-zinc-950 p-4 text-white shadow-2xl shadow-slate-300/60 dark:border-zinc-800 dark:shadow-black/50 md:p-5">
                <HeroCode />
                <div className="mt-4 grid grid-cols-3 gap-3 px-2 pb-1">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-2xl font-black tabular-nums text-amber-400 md:text-3xl">
                        <CountUp suffix={stat.suffix} to={stat.to} />
                      </p>
                      <p className="mt-1 text-left text-xs leading-snug text-zinc-400">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
            </div>
          </motion.div>
        </div>

        <a
          aria-label="Scroll to my work"
          className="hero-in absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 md:flex"
          href="#work"
          style={delay(1300)}
        >
          Scroll
          <span className="flex h-9 w-5 justify-center rounded-full border border-slate-400/60 pt-1.5">
            <span className="h-2 w-1 animate-bounce rounded-full bg-slate-400 motion-reduce:animate-none" />
          </span>
        </a>
      </section>
    </>
  );
};

export default Intro;
