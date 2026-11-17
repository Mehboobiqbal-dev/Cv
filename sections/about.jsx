import { FaCode, FaDatabase, FaUserCheck } from "react-icons/fa";
import { HiDevicePhoneMobile, HiGlobeAlt } from "react-icons/hi2";
import { Reveal, SplitText, Stagger, StaggerItem } from "@/components/motion/Motion";

const capabilities = [
  {
    title: "Frontend engineering",
    text: "Responsive interfaces in React and Next.js with TypeScript, Tailwind CSS, MUI and Redux Toolkit, including full Arabic right-to-left layouts.",
    icon: <FaCode />,
  },
  {
    title: "Backend & data",
    text: "REST APIs with authentication and role-based access in Node.js, Express, FastAPI and PHP, on MySQL, PostgreSQL and MongoDB, deployed on Linux and Docker.",
    icon: <FaDatabase />,
  },
  {
    title: "Mobile development",
    text: "The Road Biker shopping app in Flutter (5,000+ downloads), on the same REST backend as the web store.",
    icon: <HiDevicePhoneMobile />,
  },
  {
    title: "E-commerce & localization",
    text: "OpenCart storefronts, checkout, Apple Pay and instalment payments, shipping integrations, SEO and catalogue migrations without downtime.",
    icon: <HiGlobeAlt />,
  },
];

const About = () => {
  return (
    <section
      id="about"
      className="overflow-hidden bg-slate-50 px-5 py-20 shadow-sm shadow-zinc-300 dark:bg-zinc-950 dark:shadow-zinc-800 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-600 dark:text-cyan-400">
              About me
            </p>
            <h2 className="mt-4 flex items-center gap-3 text-left text-4xl font-black leading-tight md:text-5xl">
              <FaUserCheck /> <SplitText text="I own the whole system." />
            </h2>
            <p className="mt-6 text-left text-lg leading-8 text-slate-600 dark:text-slate-300">
              I&apos;m Mehboob Iqbal, a web developer with nearly two years of
              production experience, based in Hail, Saudi Arabia. I can work
              remotely for you now and I am open to relocating.
            </p>
            <p className="mt-4 text-left text-lg leading-8 text-slate-600 dark:text-slate-300">
              Today I run the engineering behind Road Biker&apos;s two Arabic
              e-commerce stores and their Flutter app. Before that I built my own
              product, Wordmark Remover, and delivered client sites as a
              freelancer, after a full-stack internship at Centangle Interactive
              and remote React work for a US startup. I like owning a system
              end to end: the interface, the API, the database and the server
              it runs on.
            </p>
          </Reveal>

          <Stagger className="grid gap-4 sm:grid-cols-2" stagger={0.1}>
            {capabilities.map((capability) => (
              <StaggerItem key={capability.title} className="h-full">
              <article
                className="interactive-card h-full rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="mb-5 inline-flex rounded-2xl bg-zinc-950 p-3 text-2xl text-cyan-400 dark:bg-white dark:text-red-600">
                  {capability.icon}
                </div>
                <h3 className="text-left text-xl font-bold">{capability.title}</h3>
                <p className="mt-3 text-left leading-7 text-slate-600 dark:text-slate-300">
                  {capability.text}
                </p>
              </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
};

export default About;
