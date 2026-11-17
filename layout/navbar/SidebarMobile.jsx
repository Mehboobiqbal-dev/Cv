import React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { HiDocumentArrowDown, HiXMark } from "react-icons/hi2";
import { NavbarMenu } from "./NavbarItems";
import Monogram from "./Monogram";
import { EASE } from "@/components/motion/Motion";

const MobileNavbar = ({ showMenu, setShowMenu, active }) => {
  const close = () => setShowMenu(false);
  return (
    <AnimatePresence>
      {showMenu ? (
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.nav
            aria-label="Sections"
            className="flex h-full w-[78%] max-w-sm flex-col bg-white shadow-2xl dark:bg-zinc-950"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.45, ease: EASE }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Monogram className="h-8 w-8 text-xs" />
                <span className="text-lg font-bold tracking-tight">Mehboob Iqbal</span>
              </div>
              <button aria-label="Close menu" className="p-1 text-2xl" onClick={close}>
                <HiXMark />
              </button>
            </div>

            <motion.ul
              className="flex flex-col gap-1 p-3"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
            >
              {NavbarMenu.map((item) => {
                const isActive = active === item.link.slice(1);
                return (
                  <motion.li
                    key={item.name}
                    variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
                  >
                    <Link
                      href={item.link}
                      onClick={close}
                      className={`block rounded-xl px-4 py-3 text-lg font-semibold transition ${
                        isActive
                          ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                          : "hover:bg-slate-100 dark:hover:bg-zinc-900"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>

            <div className="mt-auto p-4">
              <a
                href="/assets/Mehboob-Iqbal-CV.pdf"
                download="Mehboob-Iqbal-CV.pdf"
                className="flex items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-3 font-bold text-white dark:bg-cyan-400 dark:text-zinc-950"
              >
                <HiDocumentArrowDown /> Download CV
              </a>
            </div>
          </motion.nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default MobileNavbar;
