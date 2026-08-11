import { FaCode, FaDatabase, FaUserCheck } from "react-icons/fa";
import { HiDevicePhoneMobile, HiGlobeAlt } from "react-icons/hi2";

const capabilities = [
  {
    title: "Frontend engineering",
    text: "Accessible, responsive interfaces with React, Next.js, TypeScript, Tailwind CSS, and modern state management.",
    icon: <FaCode />,
  },
  {
    title: "Backend & data",
    text: "Reliable APIs and business logic using PHP, Node.js, FastAPI, .NET, MySQL, and MongoDB.",
    icon: <FaDatabase />,
  },
  {
    title: "Mobile development",
    text: "Cross-platform mobile experiences built with Flutter and React Native for consistent product delivery.",
    icon: <HiDevicePhoneMobile />,
  },
  {
    title: "E-commerce & localization",
    text: "Customer-focused storefronts, multilingual journeys, product discovery, and conversion-ready commerce experiences.",
    icon: <HiGlobeAlt />,
  },
];

const About = () => {
  return (
    <section
      id="about"
      className="overflow-hidden px-5 py-20 shadow-sm shadow-zinc-300 dark:shadow-zinc-800 md:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-600 dark:text-cyan-400">
              About me
            </p>
            <h2 className="mt-4 flex items-center gap-3 text-left text-4xl font-black leading-tight md:text-5xl">
              <FaUserCheck /> Built to solve, not just to look good.
            </h2>
            <p className="mt-6 text-left text-lg leading-8 text-slate-600 dark:text-slate-300">
              I&apos;m Mehboob Iqbal, a full-stack developer based in Khanewal,
              Pakistan. I take ownership across the product lifecycle—from
              shaping the user experience to building backend logic, connecting
              databases, integrating APIs, and shipping to production.
            </p>
            <p className="mt-4 text-left text-lg leading-8 text-slate-600 dark:text-slate-300">
              My work spans e-commerce, enterprise platforms, automation, and
              AI-enabled products. I care about maintainable code, thoughtful
              details, and software that creates measurable value.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {capabilities.map((capability) => (
              <article
                key={capability.title}
                className="interactive-card rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="mb-5 inline-flex rounded-2xl bg-zinc-950 p-3 text-2xl text-cyan-400 dark:bg-white dark:text-red-600">
                  {capability.icon}
                </div>
                <h3 className="text-left text-xl font-bold">{capability.title}</h3>
                <p className="mt-3 text-left leading-7 text-slate-600 dark:text-slate-300">
                  {capability.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
