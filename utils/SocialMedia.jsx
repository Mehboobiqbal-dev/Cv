import { BsGithub, BsWhatsapp } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

export const CONTACT = {
  email: "mehboobmehboob090@gmail.com",
  whatsapp: "https://wa.me/966576465853",
  phone: "+966 57 646 5853",
  linkedin: "https://www.linkedin.com/in/mehboob-iqbal-3b1263190",
  github: "https://github.com/Mehboobiqbal-dev",
};

const links = [
  { label: "LinkedIn", href: CONTACT.linkedin, icon: <FaLinkedinIn />, hover: "hover:bg-[#0a66c2] hover:border-[#0a66c2]" },
  { label: "GitHub", href: CONTACT.github, icon: <BsGithub />, hover: "hover:bg-zinc-800 hover:border-zinc-800" },
  { label: "WhatsApp", href: CONTACT.whatsapp, icon: <BsWhatsapp />, hover: "hover:bg-[#25d366] hover:border-[#25d366]" },
  { label: "Email", href: `mailto:${CONTACT.email}`, icon: <FiMail />, hover: "hover:bg-red-600 hover:border-red-600" },
];

// Fixed rail on the left edge, desktop only. On phones it covered the hero text; there the same links
// sit in the contact section and the footer.
const SocialMedia = () => {
  return (
    <div
      className="hero-in fixed bottom-8 left-6 z-40 hidden flex-col items-center gap-3 xl:flex"
      style={{ "--d": "1200ms" }}
    >
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          aria-label={link.label}
          title={link.label}
          className={`flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white/80 text-lg text-slate-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:text-white dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-slate-200 ${link.hover}`}
        >
          {link.icon}
        </a>
      ))}
      <span className="mt-1 h-16 w-px bg-slate-300 dark:bg-zinc-700" />
    </div>
  );
};

export default SocialMedia;
