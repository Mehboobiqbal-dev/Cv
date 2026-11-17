import React, { Fragment, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { TbBulbFilled } from "react-icons/tb";
import { HiDocumentArrowDown, HiMagnifyingGlass } from "react-icons/hi2";

import { openCommandPalette } from "@/components/commands";
import { Magnetic } from "@/components/motion/Motion";

import MobileNavbar from "./SidebarMobile";
import { NavbarMenu } from "./NavbarItems";
import NavbarMobile from "./NavbarMobile";
import Monogram from "./Monogram";

import { ThemeContext } from "@/context/themeContext";

// Which section is on screen: the one crossing a line 40% down the viewport.
const useActiveSection = (ids) => {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return active;
};

const Navbar = () => {
  const [top, setTop] = useState("0");
  const [scrolled, setScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { setThemeFun, theme } = useContext(ThemeContext);
  const active = useActiveSection(NavbarMenu.map((item) => item.link.slice(1)));

  // Reading progress along the top edge
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    let prev = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      setTop(prev > current || current < 80 ? "0" : "-80px");
      setScrolled(current > 12);
      prev = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Fragment>
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-red-500 via-amber-400 to-cyan-400"
      />

      {/* Desktop Header */}
      <header
        className={`fixed z-50 hidden h-[70px] w-full items-center justify-between gap-4 px-8 backdrop-blur-lg transition-all duration-500 md:flex ${
          scrolled
            ? "bg-white/80 shadow-sm shadow-gray-300 dark:bg-black/75 dark:shadow-gray-800"
            : "bg-transparent"
        }`}
        style={{ top }}
      >
        <Link href="#home" aria-label="Mehboob Iqbal, back to top" className="flex items-center gap-3">
          <Monogram />
          <span className="text-lg font-bold tracking-tight">Mehboob Iqbal</span>
        </Link>

        <nav className="flex h-full items-center gap-1" aria-label="Sections">
          {NavbarMenu.map((item) => {
            const isActive = active === item.link.slice(1);
            return (
              <Link
                key={item.name}
                href={item.link}
                className={`relative px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-zinc-950 dark:text-white"
                    : "text-slate-500 hover:text-zinc-950 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {item.name}
                {isActive ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-red-600 dark:bg-cyan-400"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            aria-label="Open the command menu"
            className="hidden items-center gap-2 rounded-full border border-slate-300 bg-white/60 px-3 py-1.5 text-xs font-semibold text-slate-500 transition hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-slate-400 dark:hover:border-white dark:hover:text-white xl:inline-flex"
            onClick={openCommandPalette}
            type="button"
          >
            <HiMagnifyingGlass /> Search <kbd className="key">Ctrl K</kbd>
          </button>
          <button
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            className="rounded-full p-2 text-xl text-red-600 transition hover:scale-110 dark:text-cyan-400"
            onClick={setThemeFun}
          >
            {theme === "dark" ? <TbBulbFilled /> : <BsFillLightningChargeFill />}
          </button>
          <a
            href="/assets/Mehboob-Iqbal-CV.pdf"
            download="Mehboob-Iqbal-CV.pdf"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-4 py-2 text-sm font-bold transition hover:border-zinc-950 dark:border-zinc-700 dark:hover:border-white"
          >
            <HiDocumentArrowDown /> CV
          </a>
          <Magnetic strength={0.35}>
            <Link
              href="#getInTouch"
              className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-cyan-400"
            >
              Contact me
            </Link>
          </Magnetic>
        </div>
      </header>

      {/* Mobile Header */}
      <NavbarMobile
        setShowMenu={setShowMenu}
        setThemeFun={setThemeFun}
        showMenu={showMenu}
        theme={theme}
        top={top}
      />

      {/* SideMenu For Mobile Screen */}
      <MobileNavbar setShowMenu={setShowMenu} showMenu={showMenu} active={active} />
    </Fragment>
  );
};

export default Navbar;
