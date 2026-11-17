import Link from "next/link";
import { BsGithub, BsWhatsapp } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { CONTACT } from "@/utils/SocialMedia";
import Monogram from "@/layout/navbar/Monogram";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 px-5 py-12 dark:border-zinc-800 dark:bg-zinc-950 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Monogram />
          <div>
            <p className="text-lg font-black tracking-tight">Mehboob Iqbal</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Web developer · Hail, Saudi Arabia · available for remote work
            </p>
          </div>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <Link href="#work" className="hover:text-zinc-950 dark:hover:text-white">Work</Link>
          <Link href="#experience" className="hover:text-zinc-950 dark:hover:text-white">Experience</Link>
          <Link href="#getInTouch" className="hover:text-zinc-950 dark:hover:text-white">Contact</Link>
          <a href="/assets/Mehboob-Iqbal-CV.pdf" download="Mehboob-Iqbal-CV.pdf" className="hover:text-zinc-950 dark:hover:text-white">
            Download CV
          </a>
        </nav>

        <div className="flex gap-2">
          {[
            { href: CONTACT.linkedin, icon: <FaLinkedinIn />, label: "LinkedIn" },
            { href: CONTACT.github, icon: <BsGithub />, label: "GitHub" },
            { href: CONTACT.whatsapp, icon: <BsWhatsapp />, label: "WhatsApp" },
            { href: `mailto:${CONTACT.email}`, icon: <FiMail />, label: "Email" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={item.label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-lg transition hover:-translate-y-0.5 hover:border-zinc-950 dark:border-zinc-700 dark:hover:border-white"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-7xl text-xs text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} Mehboob Iqbal · Built with Next.js, Tailwind CSS and Framer Motion · Deployed on Vercel
      </p>
    </footer>
  );
};

export default Footer;
