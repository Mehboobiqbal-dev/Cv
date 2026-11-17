// "MI" mark used in the navbars (replaces the TechCrunch icon the template shipped with).
const Monogram = ({ className = "" }) => (
  <span
    aria-hidden="true"
    className={`inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-amber-500 text-sm font-black tracking-tight text-white shadow-md shadow-red-600/30 dark:from-cyan-400 dark:to-emerald-400 dark:text-zinc-950 dark:shadow-cyan-400/20 ${className}`}
  >
    MI
  </span>
);

export default Monogram;
