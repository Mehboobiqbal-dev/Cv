import { useContext, useEffect, useState } from "react";
import { Command } from "cmdk";
import { toast } from "sonner";
import { BsGithub, BsWhatsapp } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import {
  HiArrowUpRight,
  HiDocumentArrowDown,
  HiHashtag,
  HiMoon,
} from "react-icons/hi2";

import { copyEmail } from "@/components/commands";
import { scrollToId } from "@/components/SmoothScroll";
import { ProjectsData } from "@/constants";
import { ThemeContext } from "@/context/themeContext";
import { CONTACT } from "@/utils/SocialMedia";

const SECTIONS = [
  ["Home", "home"],
  ["Case studies", "work"],
  ["More live work", "project"],
  ["Experience", "experience"],
  ["About", "about"],
  ["Tech stack", "techStack"],
  ["Education", "education"],
  ["Contact", "getInTouch"],
];

const Item = ({ onSelect, icon, children, hint, value }) => (
  <Command.Item onSelect={onSelect} value={value}>
    <span className="cmdk-icon">{icon}</span>
    <span className="flex-1 truncate">{children}</span>
    {hint ? <span className="cmdk-hint">{hint}</span> : null}
  </Command.Item>
);

// ⌘K / Ctrl+K: jump anywhere, open any live project, copy the email, get the CV.
const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const { setThemeFun } = useContext(ThemeContext);

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  const run = (fn) => () => {
    setOpen(false);
    // let the dialog close before scrolling or opening tabs
    setTimeout(fn, 60);
  };

  return (
    <Command.Dialog
      contentClassName="cmdk-content"
      label="Command menu"
      onOpenChange={setOpen}
      open={open}
      overlayClassName="cmdk-overlay"
    >
      <Command.Input placeholder="Jump to a section, open a project, copy my email…" />
      <Command.List>
        <Command.Empty>Nothing found.</Command.Empty>

        <Command.Group heading="Go to">
          {SECTIONS.map(([label, id]) => (
            <Item icon={<HiHashtag />} key={id} onSelect={run(() => scrollToId(id))}
value={`go ${label}`}>
              {label}
            </Item>
          ))}
        </Command.Group>

        <Command.Group heading="Open a live project">
          {ProjectsData.map((project) => (
            <Item
              hint={project.liveUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/(#.*)?$/, "")}
              icon={<HiArrowUpRight />}
              key={project.projectName}
              onSelect={run(() => window.open(project.liveUrl, "_blank", "noopener"))}
              value={`open ${project.projectName} ${project.techs.join(" ")}`}
            >
              {project.projectName}
            </Item>
          ))}
        </Command.Group>

        <Command.Group heading="Get in touch">
          <Item hint={CONTACT.email} icon={<FiMail />} onSelect={run(copyEmail)}
value="copy email">
            Copy my email
          </Item>
          <Item
            icon={<HiDocumentArrowDown />}
            onSelect={run(() => {
              const a = document.createElement("a");
              a.href = "/assets/Mehboob-Iqbal-CV.pdf";
              a.download = "Mehboob-Iqbal-CV.pdf";
              a.click();
              toast("Downloading my CV");
            })}
            value="download cv resume"
          >
            Download my CV
          </Item>
          <Item icon={<BsWhatsapp />} onSelect={run(() => window.open(CONTACT.whatsapp, "_blank", "noopener"))} value="whatsapp">
            WhatsApp
          </Item>
          <Item icon={<FaLinkedinIn />} onSelect={run(() => window.open(CONTACT.linkedin, "_blank", "noopener"))} value="linkedin">
            LinkedIn
          </Item>
          <Item icon={<BsGithub />} onSelect={run(() => window.open(CONTACT.github, "_blank", "noopener"))} value="github">
            GitHub
          </Item>
        </Command.Group>

        <Command.Group heading="Preferences">
          <Item icon={<HiMoon />} onSelect={run(() => setThemeFun())} value="toggle theme dark light">
            Switch light / dark theme
          </Item>
        </Command.Group>
      </Command.List>
      <div className="cmdk-footer">
        <span><kbd>↑</kbd> <kbd>↓</kbd> to move</span>
        <span><kbd>↵</kbd> to select</span>
        <span><kbd>esc</kbd> to close</span>
      </div>
    </Command.Dialog>
  );
};

export default CommandPalette;
