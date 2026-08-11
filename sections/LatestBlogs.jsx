import Link from "next/link";
import { FaCodeBranch, FaHandshake } from "react-icons/fa";
import { HiArrowUpRight, HiDevicePhoneMobile, HiSparkles } from "react-icons/hi2";

const strengths = [
  {
    title: "End-to-end ownership",
    text: "I can take a feature from product idea and interface design through APIs, database work, testing, and deployment.",
    icon: <FaCodeBranch />,
  },
  {
    title: "Web + mobile delivery",
    text: "One product mindset across Next.js, PHP, MySQL, Flutter, responsive web, and customer-facing mobile apps.",
    icon: <HiDevicePhoneMobile />,
  },
  {
    title: "Built around users",
    text: "I focus on speed, clarity, localization, and reliable journeys—not technology for technology's sake.",
    icon: <HiSparkles />,
  },
  {
    title: "A dependable teammate",
    text: "Clear communication, thoughtful problem-solving, code reviews, and steady progress from brief to production.",
    icon: <FaHandshake />,
  },
];

const WhyWorkWithMe = () => {
  return (
    <section id="why-me" className="relative overflow-hidden bg-zinc-950 px-5 py-20 text-white md:px-10">
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-red-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-400">
              Why work with me
            </p>
            <h2 className="mt-4 text-left text-4xl font-black leading-tight md:text-6xl">
              More than code. I help products move forward.
            </h2>
            <p className="mt-6 max-w-xl text-left text-lg leading-8 text-zinc-300">
              You get a versatile developer who understands the full product,
              adapts quickly, and cares about the result after launch.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {strengths.map((strength) => (
              <article
                key={strength.title}
                className="interactive-card rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6"
              >
                <div className="inline-flex rounded-2xl bg-white p-3 text-2xl text-red-600">
                  {strength.icon}
                </div>
                <h3 className="mt-5 text-left text-xl font-bold">{strength.title}</h3>
                <p className="mt-3 text-left leading-7 text-zinc-400">{strength.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-r from-red-600 to-rose-500 p-7 md:flex-row md:items-center md:p-9">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-100">
              Have a role or product in mind?
            </p>
            <h3 className="mt-2 text-left text-2xl font-black md:text-3xl">
              Let&apos;s build something valuable together.
            </h3>
          </div>
          <Link
            href="#getInTouch"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-lg font-bold text-zinc-950 transition hover:-translate-y-0.5 hover:bg-amber-300"
          >
            Start a conversation <HiArrowUpRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithMe;
