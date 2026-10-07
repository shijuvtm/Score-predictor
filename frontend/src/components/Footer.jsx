import { Link } from "react-router-dom";
import { PiCricketBold } from "react-icons/pi";

const quickLinks = [
  ["/", "Home"], ["/live", "Live"], ["/matches", "Matches"], ["/teams", "Teams"],
  ["/players", "Players"], ["/news", "News"], ["/predictor", "Score Predictor"],
];

export default function Footer() {
  return (
    <footer className="bg-[#0c1712] text-white">
      <div className="mx-auto grid max-w-7xl gap-9 px-5 py-10 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 font-display text-2xl tracking-wide"><PiCricketBold className="text-flood" /> CRICKET PREDICTOR</Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/60">A machine-learning powered cricket score prediction platform, alongside stories and match information for the game.</p>
        </div>
        <div><h2 className="text-sm font-bold uppercase tracking-widest text-flood">Quick links</h2><div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2">{quickLinks.map(([to, label]) => <Link key={to} to={to} className="text-sm text-white/65 hover:text-white">{label}</Link>)}</div></div>
        <div><h2 className="text-sm font-bold uppercase tracking-widest text-flood">Resources</h2><div className="mt-4 flex flex-col gap-2 text-sm text-white/65"><Link to="/about" className="hover:text-white">About this project</Link><a href="https://github.com/shijuvtm/Score-predictor" target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a><a href="https://github.com/shijuvtm/Score-predictor/issues" target="_blank" rel="noreferrer" className="hover:text-white">Contact / feedback</a></div></div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 text-center text-xs text-white/45">© 2026 Cricket Predictor · Demo fixtures, player profiles and news content are illustrative.</div>
    </footer>
  );
}
