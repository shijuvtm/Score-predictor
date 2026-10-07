import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HiOutlineMagnifyingGlass, HiOutlineMapPin } from "react-icons/hi2";
import { CricketImage, EmptyState, MatchCard, NewsCard, PlayerCard, SectionTitle, TeamCard, TeamMark } from "../components/CricketUI.jsx";
import { matches, news, players, teams } from "../data/cricket.js";
import { useAuth } from "../auth/AuthContext.jsx";
import { getErrorMessage } from "../services/api.js";

export function LivePage() {
  const live = matches.filter((match) => match.status === "Live");
  return <PageShell eyebrow="Ball by ball" title="Live cricket" intro="Follow the action and keep an eye on the match state. Demo scores are used because no live-data provider is configured.">
    <p className="mb-4 rounded-lg border border-flood/50 bg-flood/10 px-4 py-3 text-xs font-semibold text-stadium-700 dark:text-pitch-light/70">Illustrative demo scores — not a live feed.</p>
    {live.length ? <div className="grid gap-4 md:grid-cols-2">{live.map((match) => <MatchCard key={match.id} match={match} />)}</div> : <EmptyState>No live matches at the moment.</EmptyState>}
  </PageShell>;
}

export function MatchesPage() {
  const [tab, setTab] = useState("All");
  const filtered = tab === "All" ? matches : matches.filter((match) => match.status === tab);
  return <PageShell eyebrow="Fixtures & results" title="Matches" intro="Browse live action, upcoming fixtures and completed results. Fixtures and scores below are illustrative demo data.">
    <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Filter matches">
      {["All", "Live", "Upcoming", "Completed"].map((name) => <button key={name} role="tab" aria-selected={tab === name} onClick={() => setTab(name)} className={`rounded-full px-5 py-2 text-sm font-bold transition ${tab === name ? "bg-stadium-900 text-white dark:bg-flood dark:text-stadium-900" : "border border-black/10 hover:border-ball dark:border-white/20"}`}>{name}</button>)}
    </div>
    {filtered.length ? <div className="grid gap-4 md:grid-cols-2">{filtered.map((match) => <MatchCard key={match.id} match={match} />)}</div> : <EmptyState>No matches in this category.</EmptyState>}
  </PageShell>;
}

export function MatchDetailPage() {
  const { id } = useParams();
  const match = matches.find((item) => item.id === id);
  if (!match) return <NotFoundMessage item="match" />;
  const completed = match.status === "Completed";
  return <PageShell eyebrow={`${match.format} · ${match.status}`} title={`${match.home} vs ${match.away}`} intro={`${match.venue} · ${match.date} · ${match.time}`}>
    <div className="site-card overflow-hidden">
      <div className="grid gap-6 bg-[#10241c] p-6 text-white sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:p-9">
        <TeamScore team={match.home} score={match.homeScore} overs={match.homeOvers} />
        <span className="font-display text-2xl text-flood">VS</span>
        <TeamScore team={match.away} score={match.awayScore} overs={match.awayOvers} />
      </div>
      <div className="p-5 sm:p-7">
        <p className="text-center text-sm font-bold text-turf-dark dark:text-emerald-300">{match.note || `${match.status} · ${match.time}`}</p>
        <h2 className="mt-8 font-display text-2xl tracking-wide">Match information</h2>
        <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <Info label="Date" value={match.date} /><Info label="Start time" value={match.time} /><Info label="Venue" value={match.venue} /><Info label="Status" value={match.status} />
        </div>
        <a className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-ball hover:underline" href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(match.venue)}`} target="_blank" rel="noreferrer"><HiOutlineMapPin /> Open venue in OpenStreetMap</a>
      </div>
    </div>
    <div className="mt-7">
      <h2 className="mb-4 font-display text-3xl tracking-wide">Scorecard</h2>
      <div className="site-card overflow-x-auto">
        <table className="score-table w-full min-w-[600px] text-left text-sm">
          <caption className="px-5 py-4 text-left font-display text-xl">{match.home} batting · demo scorecard</caption>
          <thead><tr><th>Player</th><th>Dismissal</th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr></thead>
          <tbody>
            <tr><td>{match.home.split(" ")[0]} opener</td><td>c keeper b bowler</td><td>72</td><td>45</td><td>8</td><td>2</td><td>160.0</td></tr>
            <tr><td>Middle-order batter</td><td>run out</td><td>48</td><td>31</td><td>5</td><td>1</td><td>154.8</td></tr>
            <tr><td>Finisher</td><td>not out</td><td>31</td><td>16</td><td>2</td><td>2</td><td>193.8</td></tr>
          </tbody>
        </table>
        <p className="px-5 pb-5 text-xs text-stadium-500 dark:text-pitch-light/50">Illustrative scorecard for interface demonstration; not official match data.</p>
      </div>
      {!completed && <p className="mt-4 text-sm text-stadium-500 dark:text-pitch-light/60">This match is in progress in the demo fixture set; the scorecard sample is illustrative.</p>}
    </div>
  </PageShell>;
}

export function TeamsPage() {
  return <PageShell eyebrow="Squads" title="Teams" intro="Explore the teams supported by the existing IPL score prediction model.">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{teams.map((team) => <TeamCard key={team.id} team={team} />)}</div>
  </PageShell>;
}

export function TeamDetailPage() {
  const { id } = useParams();
  const team = teams.find((item) => item.id === id);
  if (!team) return <NotFoundMessage item="team" />;
  return <PageShell eyebrow="Team profile" title={team.name} intro={`${team.country} · ${team.short}`}>
    <div className="site-card flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
      <TeamMark name={team.name} size="lg" />
      <div className="flex-1"><h2 className="font-display text-3xl">{team.short} squad</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-stadium-500 dark:text-pitch-light/60">{team.description}</p></div>
      <div className="grid grid-cols-2 gap-3 text-center"><Stat label="Squad" value={team.players} /><Stat label="Model" value="Supported" /></div>
    </div>
    <h2 className="mb-4 mt-8 font-display text-3xl tracking-wide">Players</h2>
    <div className="site-card overflow-x-auto"><table className="score-table w-full min-w-[620px] text-left text-sm"><thead><tr><th>Player</th><th>Role</th><th>Matches</th><th>Runs</th><th>Wickets</th></tr></thead><tbody>{players.slice(0, 4).map((player) => <tr key={player.id}><td><Link to={`/players/${player.id}`} className="font-bold hover:text-ball">{player.name}</Link></td><td>{player.role}</td><td>{player.matches}</td><td>{player.runs}</td><td>{player.wickets}</td></tr>)}</tbody></table></div>
    <p className="mt-3 text-xs text-stadium-500 dark:text-pitch-light/50">Sample roster and statistics for the website demo.</p>
  </PageShell>;
}

export function PlayersPage() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("All");
  const [role, setRole] = useState("All");
  const countries = ["All", ...new Set(players.map((player) => player.country))];
  const roles = ["All", ...new Set(players.map((player) => player.role))];
  const filtered = useMemo(() => players.filter((player) =>
    player.name.toLowerCase().includes(query.toLowerCase()) &&
    (country === "All" || player.country === country) &&
    (role === "All" || player.role === role)
  ), [query, country, role]);
  return <PageShell eyebrow="Player directory" title="Players" intro="Discover players and browse a sample of career statistics.">
    <div className="mb-6 grid gap-3 sm:grid-cols-[1fr_200px_200px]">
      <label className="relative"><span className="sr-only">Search players</span><HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-stadium-400" /><input className="site-input pl-10" placeholder="Search players..." value={query} onChange={(event) => setQuery(event.target.value)} /></label>
      <label><span className="sr-only">Filter by country</span><select className="site-input" value={country} onChange={(event) => setCountry(event.target.value)}>{countries.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label><span className="sr-only">Filter by role</span><select className="site-input" value={role} onChange={(event) => setRole(event.target.value)}>{roles.map((item) => <option key={item}>{item}</option>)}</select></label>
    </div>
    {filtered.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((player) => <PlayerCard key={player.id} player={player} />)}</div> : <EmptyState>No players match those filters.</EmptyState>}
  </PageShell>;
}

export function PlayerDetailPage() {
  const { id } = useParams();
  const player = players.find((item) => item.id === id);
  if (!player) return <NotFoundMessage item="player" />;
  return <PageShell eyebrow={`${player.country} · ${player.role}`} title={player.name} intro="Player profile and career overview · sample stats for demonstration">
    <div className="site-card overflow-hidden md:grid md:grid-cols-[300px_1fr]">
      <div className="h-72 bg-gradient-to-br from-turf/20 to-flood/30 md:h-full"><CricketImage src={player.image} alt={player.name} className="h-full w-full object-cover object-top" /></div>
      <div className="p-6 sm:p-8"><p className="text-sm text-stadium-500 dark:text-pitch-light/55">{player.country} · {player.role}</p><h2 className="mt-2 font-display text-3xl">Career snapshot</h2><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">{[["Matches", player.matches], ["Runs", player.runs], ["Average", player.average], ["Strike rate", player.strikeRate], ["Wickets", player.wickets], ["Economy", player.economy]].map(([label, value]) => <Stat key={label} label={label} value={value} />)}</div><div className="mt-6 grid gap-2 text-sm"><p><strong>Batting style:</strong> {player.batting}</p><p><strong>Bowling style:</strong> {player.bowling}</p></div></div>
    </div>
  </PageShell>;
}

export function NewsPage() {
  const [query, setQuery] = useState("");
  const filtered = news.filter((article) => `${article.title} ${article.category}`.toLowerCase().includes(query.toLowerCase()));
  return <PageShell eyebrow="Stories & analysis" title="Cricket news" intro="Original editorial-style demo stories about the game. No live news feed is connected.">
    <label className="relative mb-6 block max-w-xl"><span className="sr-only">Search news</span><HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-stadium-400" /><input className="site-input pl-10" placeholder="Search stories..." value={query} onChange={(event) => setQuery(event.target.value)} /></label>
    {filtered.length > 0 && !query && <div className="mb-6"><NewsCard article={filtered[0]} featured /></div>}
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filtered.slice(query ? 0 : 1).map((article) => <NewsCard key={article.id} article={article} />)}</div>
    {!filtered.length && <EmptyState>No stories match your search.</EmptyState>}
  </PageShell>;
}

export function NewsDetailPage() {
  const { id } = useParams();
  const article = news.find((item) => item.id === id);
  if (!article) return <NotFoundMessage item="story" />;
  return <article className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
    <p className="text-xs font-bold uppercase tracking-[.18em] text-ball">{article.category} · {article.date}</p>
    <h1 className="mt-3 font-display text-4xl tracking-wide sm:text-5xl">{article.title}</h1>
    <p className="mt-4 text-lg leading-7 text-stadium-500 dark:text-pitch-light/60">{article.summary}</p>
    <div className="mt-7 h-64 overflow-hidden rounded-2xl bg-stadium-800 sm:h-[430px]"><CricketImage src={article.image} alt="Cricket ground" className="h-full w-full object-cover" /></div>
    <div className="prose-copy mx-auto mt-8 max-w-3xl text-base leading-8 text-stadium-700 dark:text-pitch-light/75"><p>{article.content}</p><p>This is original demo editorial content for the Cricket Predictor website. Match information and statistics on this site may be illustrative and should not be treated as official.</p></div>
    <div className="mt-12"><SectionTitle eyebrow="Keep reading" title="Related stories" to="/news" /><div className="grid gap-4 sm:grid-cols-2">{news.filter((item) => item.id !== id).slice(0, 2).map((item) => <NewsCard key={item.id} article={item} />)}</div></div>
  </article>;
}

export function LoginPage() {
  return <AuthShell title="Welcome back" subtitle="Sign in to your Cricket Predictor account."><AuthForm mode="login" /></AuthShell>;
}

export function SignupPage() {
  return <AuthShell title="Create your account" subtitle="Set up your profile and keep your cricket experience close."><AuthForm mode="signup" /></AuthShell>;
}

export function ProfilePage() {
  const { user, loading } = useAuth();
  let savedHistory = [];
  try {
    savedHistory = JSON.parse(localStorage.getItem("ipl-score-predictor:history") || "[]");
  } catch {
    savedHistory = [];
  }
  if (!user) return <PageShell eyebrow="Your space" title="Profile" intro={loading ? "Checking your account…" : "Log in to view your profile and account details."}>
    {!loading && <div className="site-card p-6"><p className="text-sm text-stadium-600 dark:text-pitch-light/65">Your account is not signed in on this browser.</p><div className="mt-4 flex gap-3"><Link className="rounded-full bg-ball px-5 py-2.5 text-sm font-bold text-white" to="/login">Login</Link><Link className="rounded-full border border-black/10 px-5 py-2.5 text-sm font-bold dark:border-white/20" to="/signup">Create account</Link></div></div>}
  </PageShell>;
  return <PageShell eyebrow="Your space" title="Profile" intro="Your Cricket Predictor account and recent local activity.">
    <div className="site-card flex items-center gap-4 p-6"><span className="flex h-16 w-16 items-center justify-center rounded-full bg-turf/10 font-display text-2xl text-turf-dark">{user.name.trim().split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase()}</span><div><h2 className="font-display text-2xl">{user.name}</h2><p className="text-sm text-stadium-500 dark:text-pitch-light/55">{user.email}</p><p className="mt-1 text-xs text-stadium-500">Member since {new Date(user.created_at).toLocaleDateString()}</p></div><div className="ml-auto text-center"><p className="font-mono text-2xl font-bold text-ball">{savedHistory.length}</p><p className="text-xs text-stadium-500">local predictions</p></div></div>
    <h2 className="mb-4 mt-8 font-display text-3xl">Recent predictions</h2>
    {savedHistory.length ? <div className="site-card divide-y divide-black/5 dark:divide-white/10">{savedHistory.slice(0, 8).map((entry) => <div key={entry.id} className="flex flex-wrap items-center justify-between gap-3 p-4"><div><p className="font-bold">{entry.battingTeam} vs {entry.bowlingTeam}</p><p className="text-xs text-stadium-500">{entry.runs}/{entry.wickets} after {entry.overs} overs</p></div><span className="font-mono text-xl font-bold text-ball">{entry.prediction}</span></div>)}</div> : <EmptyState>No saved predictions yet. <Link className="ml-1 font-bold text-ball" to="/predictor">Try the predictor</Link></EmptyState>}
  </PageShell>;
}

function PageShell({ eyebrow, title, intro, children }) {
  return <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12"><div className="mb-8 border-b border-black/5 pb-6 dark:border-white/10"><p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-ball">{eyebrow}</p><h1 className="font-display text-4xl tracking-wide sm:text-5xl">{title}</h1><p className="mt-3 max-w-3xl text-sm leading-6 text-stadium-500 dark:text-pitch-light/60">{intro}</p></div>{children}</main>;
}

function TeamScore({ team, score, overs }) {
  return <div className="flex items-center gap-3"><TeamMark name={team} size="lg" /><div><p className="font-bold">{team}</p><p className="mt-1 font-mono text-2xl font-bold">{score || "—"}{overs && <small className="ml-2 text-sm font-normal text-white/50">({overs} ov)</small>}</p></div></div>;
}

function Info({ label, value }) {
  return <div className="rounded-lg bg-black/[.03] p-3 dark:bg-white/5"><p className="text-xs text-stadium-500 dark:text-pitch-light/50">{label}</p><p className="mt-1 font-semibold">{value}</p></div>;
}

function Stat({ label, value }) {
  return <div className="rounded-xl bg-black/[.03] p-3 dark:bg-white/5"><p className="text-xs text-stadium-500 dark:text-pitch-light/50">{label}</p><p className="mt-1 font-mono text-lg font-bold">{value}</p></div>;
}

function NotFoundMessage({ item }) {
  return <PageShell eyebrow="Not found" title={`${item} not found`} intro="The requested item isn't in this local demo dataset."><Link className="font-bold text-ball hover:underline" to="/">Return home →</Link></PageShell>;
}

function AuthShell({ title, subtitle, children }) {
  return <main className="mx-auto grid min-h-[68vh] max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 md:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-ball">Cricket Predictor</p><h1 className="mt-3 font-display text-5xl">{title}</h1><p className="mt-3 max-w-lg text-sm leading-6 text-stadium-500 dark:text-pitch-light/60">{subtitle}</p></div><div className="site-card p-6 sm:p-8">{children}</div></main>;
}

function AuthForm({ mode }) {
  const signup = mode === "signup";
  const navigate = useNavigate();
  const { login, signup: createAccount } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");
    if (signup && password !== form.get("confirmPassword")) {
      setError("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    try {
      if (signup) await createAccount({ name, email, password });
      else await login({ email, password });
      navigate("/profile");
    } catch (requestError) {
      setError(getErrorMessage(requestError, signup ? "Unable to create your account." : "Unable to log in."));
    } finally {
      setSubmitting(false);
    }
  };

  return <form onSubmit={handleSubmit} className="space-y-4">
    {signup && <FormField name="name" label="Name" type="text" placeholder="Your name" maxLength={100} autoComplete="name" />}
    <FormField name="email" label="Email" type="email" placeholder="you@example.com" maxLength={254} autoComplete="email" />
    <FormField name="password" label="Password" type="password" placeholder="At least 8 characters" minLength={8} maxLength={128} autoComplete={signup ? "new-password" : "current-password"} />
    {signup && <FormField name="confirmPassword" label="Confirm password" type="password" placeholder="Enter your password again" minLength={8} maxLength={128} autoComplete="new-password" />}
    {error && <p role="alert" className="rounded-lg border border-ball/30 bg-ball/10 p-3 text-sm text-ball">{error}</p>}
    <p className="rounded-lg bg-flood/10 p-3 text-xs leading-5 text-stadium-600 dark:text-pitch-light/65">Passwords are stored as one-way hashes in the configured PostgreSQL database. Use a unique password.</p>
    <button type="submit" disabled={submitting} className="w-full rounded-full bg-stadium-900 px-5 py-3 font-bold text-white transition hover:bg-turf-dark disabled:opacity-60 dark:bg-flood dark:text-stadium-900">{submitting ? "Please wait…" : signup ? "Create account" : "Login"}</button>
    <p className="text-center text-sm text-stadium-500">{signup ? "Already have an account?" : "Don't have an account?"} <Link className="font-bold text-ball" to={signup ? "/login" : "/signup"}>{signup ? "Login" : "Sign up"}</Link></p>
  </form>;
}

function FormField({ label, ...props }) {
  return <label className="block text-sm font-semibold">{label}<input required className="site-input mt-2" {...props} /></label>;
}
