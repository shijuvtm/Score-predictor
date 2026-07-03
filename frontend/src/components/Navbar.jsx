import { NavLink } from "react-router-dom";
import { PiCricketBold } from "react-icons/pi";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi2";

export default function Navbar({ theme, onToggleTheme }) {
  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-semibold tracking-wide transition-colors ${
      isActive
        ? "text-ball"
        : "text-stadium-700 hover:text-ball dark:text-pitch-light/70 dark:hover:text-flood"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-pitch-light/80 backdrop-blur-lg dark:border-white/10 dark:bg-stadium-900/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ball text-white shadow-glow">
            <PiCricketBold size={20} />
          </span>
          <span className="font-display text-2xl tracking-wide">
            IPL SCORE <span className="text-ball">PREDICTOR</span>
          </span>
        </NavLink>

        <div className="flex items-center gap-1">
          <NavLink to="/" end className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle dark mode"
            className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-stadium-700 transition-colors hover:border-ball hover:text-ball dark:border-white/10 dark:text-pitch-light/80 dark:hover:border-flood dark:hover:text-flood"
          >
            {theme === "dark" ? <HiOutlineSun size={18} /> : <HiOutlineMoon size={18} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
