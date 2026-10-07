import { useState } from "react";
import { NavLink } from "react-router-dom";
import { PiCricketBold } from "react-icons/pi";
import { HiOutlineBars3, HiOutlineMoon, HiOutlineSun, HiOutlineXMark } from "react-icons/hi2";
import { useAuth } from "../auth/AuthContext.jsx";

const links = [
  ["/", "Home", true], ["/live", "Live"], ["/matches", "Matches"], ["/teams", "Teams"],
  ["/players", "Players"], ["/news", "News"],
];

export default function Navbar({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const { user, logout } = useAuth();
  const linkClass = ({ isActive }) =>
    `rounded-full px-3 py-2 text-sm font-semibold tracking-wide transition-colors ${
      isActive
        ? "bg-ball/10 text-ball"
        : "text-stadium-700 hover:text-ball dark:text-pitch-light/70 dark:hover:text-flood"
    }`;
  const closeMenu = () => setMenuOpen(false);
  const handleLogout = async () => {
    setLogoutError("");
    try {
      await logout();
      closeMenu();
    } catch {
      setLogoutError("Unable to log out. Please try again.");
    }
  };

  return (
    <header className="site-nav sticky top-0 z-40 border-b border-black/5 bg-pitch-light/95 backdrop-blur-lg dark:border-white/10 dark:bg-stadium-900/95">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6" aria-label="Main navigation">
        <NavLink to="/" onClick={closeMenu} className="flex items-center gap-2">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ball text-white shadow-glow"><PiCricketBold size={20} /></span>
          <span className="whitespace-nowrap font-display text-xl tracking-wide sm:text-2xl">CRICKET <span className="text-ball">PREDICTOR</span></span>
        </NavLink>
        <div className="hidden items-center gap-0.5 xl:flex">
          {links.map(([to, label, end]) => <NavLink key={to} to={to} end={end} className={linkClass}>{label}</NavLink>)}
          <NavLink to="/predictor" className="ml-1 rounded-full bg-ball px-4 py-2 text-sm font-bold text-white transition hover:bg-ball-dark">Score Predictor</NavLink>
          {user ? <>
            <NavLink to="/profile" className={linkClass}>{user.name}</NavLink>
            <button type="button" onClick={handleLogout} className={linkClass}>Logout</button>
          </> : <NavLink to="/login" className={linkClass}>Login</NavLink>}
          <button type="button" onClick={onToggleTheme} aria-label="Toggle dark mode" className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-stadium-700 transition-colors hover:border-ball hover:text-ball dark:border-white/10 dark:text-pitch-light/80 dark:hover:border-flood dark:hover:text-flood">
            {theme === "dark" ? <HiOutlineSun size={18} /> : <HiOutlineMoon size={18} />}
          </button>
        </div>
        <div className="flex items-center gap-2 xl:hidden">
          <NavLink to="/predictor" className="rounded-full bg-ball px-3 py-2 text-xs font-bold text-white sm:px-4 sm:text-sm">Predict</NavLink>
          <button type="button" onClick={onToggleTheme} aria-label="Toggle dark mode" className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 dark:border-white/10">{theme === "dark" ? <HiOutlineSun size={18} /> : <HiOutlineMoon size={18} />}</button>
          <button type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 dark:border-white/10">{menuOpen ? <HiOutlineXMark size={20} /> : <HiOutlineBars3 size={20} />}</button>
        </div>
      </nav>
      {logoutError && <p className="mx-auto max-w-7xl px-4 pb-2 text-sm text-ball" role="alert">{logoutError}</p>}
      {menuOpen && <div id="mobile-navigation" className="border-t border-black/5 bg-pitch-light px-4 py-3 dark:border-white/10 dark:bg-stadium-900 xl:hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-1 sm:grid-cols-3">
          {links.map(([to, label, end]) => <NavLink key={to} to={to} end={end} onClick={closeMenu} className={linkClass}>{label}</NavLink>)}
          <NavLink to="/predictor" onClick={closeMenu} className={linkClass}>Score Predictor</NavLink>
          {user ? <>
            <NavLink to="/profile" onClick={closeMenu} className={linkClass}>Profile</NavLink>
            <button type="button" onClick={handleLogout} className={linkClass}>Logout</button>
          </> : <NavLink to="/login" onClick={closeMenu} className={linkClass}>Login</NavLink>}
        </div>
      </div>}
    </header>
  );
}
