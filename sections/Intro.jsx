import Head from "next/head";
import Link from "next/link";
import {
  HiArrowDown,
  HiArrowUpRight,
  HiCheckCircle,
  HiDocumentArrowDown,
} from "react-icons/hi2";

const coreSkills = ["Next.js", "PHP", "Flutter", "MySQL", "AI integrations"];

const Intro = () => {
  return (
    <>
      <Head>
        <title>Mehboob Iqbal | Full-Stack & Mobile Developer</title>
      </Head>
      <section
        id="home"
        className="relative min-h-screen overflow-hidden bg-white px-5 pb-20 pt-32 shadow-sm shadow-zinc-300 dark:bg-zinc-950 dark:shadow-zinc-800 md:px-10 md:pt-36"
      >
        <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute -left-24 bottom-10 h-80 w-80 rounded-full bg-rose-400/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              Open to high-impact opportunities
            </div>

            <p className="text-base font-bold uppercase tracking-[0.2em] text-red-600 dark:text-cyan-400">
              Mehboob Iqbal · Full-stack developer
            </p>
            <h1 className="mt-5 max-w-4xl text-left text-5xl font-black leading-[1.05] tracking-tight text-zinc-950 dark:text-white md:text-7xl">
              I turn ambitious ideas into products people enjoy using.
            </h1>
            <p className="mt-7 max-w-2xl text-left text-lg leading-8 text-slate-600 dark:text-slate-300 md:text-xl">
              I build polished web and mobile experiences from interface to
              database—combining React and Next.js with PHP, Node.js, Flutter,
              MySQL, APIs, and practical AI integrations.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {coreSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-lg font-bold text-white transition hover:-translate-y-0.5 hover:bg-red-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-cyan-400"
                href="#getInTouch"
              >
                Let&apos;s work together <HiArrowUpRight />
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-lg font-bold transition hover:border-zinc-950 dark:border-zinc-700 dark:hover:border-white"
                href="#project"
              >
                Explore my work <HiArrowDown />
              </Link>
              <a
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-lg font-bold transition hover:border-zinc-950 dark:border-zinc-700 dark:hover:border-white"
                href="/assets/Mehboob-Iqbal-CV.pdf"
                download="Mehboob-Iqbal-CV.pdf"
              >
                Download CV <HiDocumentArrowDown />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-slate-200 bg-zinc-950 p-7 text-white shadow-2xl shadow-slate-300/60 dark:border-zinc-800 dark:shadow-black/40 md:p-9">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
                What I bring
              </p>
              <h2 className="mt-4 text-left text-3xl font-bold leading-tight">
                One developer. Complete product thinking.
              </h2>
              <div className="mt-8 space-y-5">
                {[
                  "Conversion-focused, responsive interfaces",
                  "Scalable APIs, databases, and integrations",
                  "Web, mobile, e-commerce, and AI delivery",
                  "Clear communication from idea to launch",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <HiCheckCircle className="mt-0.5 shrink-0 text-2xl text-cyan-400" />
                    <p className="text-left leading-7 text-zinc-200">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-9 grid grid-cols-3 gap-3 border-t border-zinc-700 pt-7">
                <div>
                  <p className="text-2xl font-black text-amber-400">7+</p>
                  <p className="mt-1 text-left text-xs text-zinc-400">Selected projects</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-amber-400">2</p>
                  <p className="mt-1 text-left text-xs text-zinc-400">Commerce launches</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-amber-400">Web + App</p>
                  <p className="mt-1 text-left text-xs text-zinc-400">End-to-end delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Intro;
