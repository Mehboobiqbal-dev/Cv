import React from "react";
import Link from "next/link";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { TbBulbFilled } from "react-icons/tb";
import { HiBars3 } from "react-icons/hi2";
import Monogram from "./Monogram";

const NavbarMobile = ({ setShowMenu, setThemeFun, theme, showMenu, top }) => {
  return (
    <header
      className="fixed z-50 flex w-full items-center justify-between bg-white/85 px-4 py-3 shadow-md shadow-gray-300 backdrop-blur-lg transition-all duration-500 dark:bg-black/80 dark:shadow-gray-800 md:hidden"
      style={{ top }}
    >
      <div className="flex items-center gap-3">
        <button
          aria-label="Open menu"
          aria-expanded={showMenu}
          className="rounded-lg p-1 text-2xl text-zinc-950 dark:text-white"
          onClick={() => setShowMenu(!showMenu)}
        >
          <HiBars3 />
        </button>
        <Link href="#home" className="flex items-center gap-2" aria-label="Mehboob Iqbal, back to top">
          <Monogram className="h-8 w-8 text-xs" />
          <span className="text-base font-bold tracking-tight">Mehboob Iqbal</span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <button
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          className="p-1 text-xl text-red-600 dark:text-cyan-400"
          onClick={setThemeFun}
        >
          {theme === "dark" ? <TbBulbFilled /> : <BsFillLightningChargeFill />}
        </button>
        <Link
          href="#getInTouch"
          className="rounded-full bg-zinc-950 px-3 py-1.5 text-xs font-bold text-white dark:bg-white dark:text-zinc-950"
        >
          Contact
        </Link>
      </div>
    </header>
  );
};

export default NavbarMobile;
