import { Link } from "react-router-dom";
import { HiArrowUpRight, HiOutlineMapPin } from "react-icons/hi2";
import { TEAM_META } from "../constants/teams.js";

export function CricketImage({ src, alt, className = "" }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={(event) => {
        event.currentTarget.style.visibility = "hidden";
      }}
    />
  );
}

export function SectionTitle({ eyebrow, title, description, to, linkText = "View all" }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-ball">{eyebrow}</p>}
        <h2 className="font-display text-3xl tracking-wide text-stadium-900 dark:text-pitch-light sm:text-4xl">{title}</h2>
        {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-stadium-500 dark:text-pitch-light/60">{description}</p>}
      </div>
      {to && <Link className="inline-flex items-center gap-1 text-sm font-bold text-ball hover:underline" to={to}>{linkText}<HiArrowUpRight /></Link>}
    </div>
  );
}

export function TeamMark({ name, size = "md" }) {
  const meta = TEAM_META[name];
  const initials = meta?.short ?? name.split(/\s+/).map((part) => part[0]).join("").slice(0, 3);
  return (
    <span
      className={`team-mark team-mark-${size}`}
      style={{ "--team-color": meta?.color ?? "#197a57" }}
      aria-label={`${name} crest`}
    >
      {initials}
    </span>
  );
}

export function MatchCard({ match, compact = false }) {
  const live = match.status === "Live";
  return (
    <article className="site-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-black/5 px-5 py-3 dark:border-white/10">
        <span className={`status-label ${live ? "status-live" : ""}`}>{live && <i />} {match.status} · {match.format}</span>
        <span className="text-xs text-stadium-500 dark:text-pitch-light/50">{match.date}</span>
      </div>
      <div className="space-y-4 p-5">
        {[match.home, match.away].map((team, index) => {
          const score = index === 0 ? match.homeScore : match.awayScore;
          const overs = index === 0 ? match.homeOvers : match.awayOvers;
          return (
            <div className="flex items-center gap-3" key={team}>
              <TeamMark name={team} />
              <span className="min-w-0 flex-1 truncate text-sm font-bold text-stadium-900 dark:text-pitch-light">{team}</span>
              {score && <span className="text-right font-mono text-base font-bold tabular-nums text-stadium-900 dark:text-pitch-light">{score}<small className="ml-1 text-[10px] font-medium text-stadium-500 dark:text-pitch-light/50">{overs ? `(${overs})` : ""}</small></span>}
            </div>
          );
        })}
        {match.note && <p className={`rounded-lg px-3 py-2 text-xs font-semibold ${live ? "bg-ball/5 text-ball" : "bg-turf/10 text-turf-dark dark:text-emerald-300"}`}>{match.note}{live && match.runRate && <span className="ml-2 text-stadium-500 dark:text-pitch-light/60">CRR {match.runRate}</span>}</p>}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stadium-500 dark:text-pitch-light/50">
          <span className="inline-flex items-center gap-1"><HiOutlineMapPin />{match.venue}</span>
          <Link to={`/matches/${match.id}`} className="font-bold text-ball hover:underline">{compact ? "Details" : "View details"} <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </article>
  );
}

export function TeamCard({ team }) {
  return (
    <article className="site-card flex flex-col items-center p-6 text-center transition hover:-translate-y-1">
      <TeamMark name={team.name} size="lg" />
      <h3 className="mt-4 font-display text-2xl tracking-wide">{team.name}</h3>
      <p className="mt-1 text-sm text-stadium-500 dark:text-pitch-light/55">{team.country} · {team.players} players</p>
      <Link className="mt-5 rounded-full border border-stadium-900/15 px-5 py-2 text-sm font-bold transition hover:border-ball hover:text-ball dark:border-white/20" to={`/teams/${team.id}`}>View team</Link>
    </article>
  );
}

export function PlayerCard({ player }) {
  return (
    <article className="site-card overflow-hidden transition hover:-translate-y-1">
      <div className="relative h-52 bg-gradient-to-br from-turf/20 to-flood/30">
        <CricketImage src={player.image} alt={player.name} className="h-full w-full object-cover object-top" />
        <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-stadium-900">{player.role}</span>
      </div>
      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-ball">{player.country}</p>
        <h3 className="mt-1 font-display text-2xl tracking-wide">{player.name}</h3>
        <p className="mt-3 text-xs text-stadium-500 dark:text-pitch-light/50">{player.matches} matches <span className="px-1">·</span> {player.runs} runs</p>
        <Link className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-ball hover:underline" to={`/players/${player.id}`}>View profile <HiArrowUpRight /></Link>
      </div>
    </article>
  );
}

export function NewsCard({ article, featured = false }) {
  return (
    <article className={`site-card overflow-hidden ${featured ? "md:grid md:grid-cols-2" : ""}`}>
      <Link to={`/news/${article.id}`} className={`block overflow-hidden bg-stadium-800 ${featured ? "min-h-64" : "h-48"}`}>
        <CricketImage src={article.image} alt="" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
      </Link>
      <div className={`p-5 ${featured ? "flex flex-col justify-center p-7 md:p-9" : ""}`}>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ball">{article.category} <span className="px-1 text-stadium-300">·</span> {article.date}</p>
        <h3 className={`mt-3 font-display tracking-wide ${featured ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
          <Link to={`/news/${article.id}`} className="hover:text-ball">{article.title}</Link>
        </h3>
        <p className="mt-3 text-sm leading-6 text-stadium-500 dark:text-pitch-light/60">{article.summary}</p>
        <Link className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-ball hover:underline" to={`/news/${article.id}`}>Read story <HiArrowUpRight /></Link>
      </div>
    </article>
  );
}

export function EmptyState({ children = "Nothing to show here right now." }) {
  return <div className="site-card px-6 py-12 text-center text-sm text-stadium-500 dark:text-pitch-light/60">{children}</div>;
}
