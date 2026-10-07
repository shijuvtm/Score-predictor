import { Link } from "react-router-dom";
import { HiArrowRight, HiOutlineChartBar, HiOutlineCpuChip, HiOutlineSparkles } from "react-icons/hi2";
import { CricketImage, MatchCard, NewsCard, PlayerCard, SectionTitle, TeamMark } from "../components/CricketUI.jsx";
import { heroImage, matches, news, players } from "../data/cricket.js";

const featuredTeams = ["India", "Australia", "England", "South Africa", "New Zealand", "Pakistan"];

export default function Home() {
  const liveMatches = matches.filter((match) => match.status === "Live");
  const upcoming = matches.filter((match) => match.status === "Upcoming");
  const featuredPlayers = players.slice(0, 3);
  return (
    <>
      <section className="hero-wrap relative isolate overflow-hidden">
        <CricketImage src={heroImage} alt="Floodlit cricket stadium ready for a match" className="hero-image absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071611]/95 via-[#071611]/75 to-[#071611]/15" />
        <div className="mx-auto grid min-h-[540px] max-w-7xl items-center gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
          <div className="max-w-2xl text-white">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] backdrop-blur">
              <HiOutlineSparkles className="text-flood" /> Cricket, with a new perspective
            </div>
            <h1 className="font-display text-5xl leading-[.98] tracking-wide sm:text-6xl lg:text-7xl">The game, beyond<br /><span className="text-flood">the boundary.</span></h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg">Follow the stories, teams and moments that make cricket. Explore our machine-learning score predictor for a fresh read on the innings.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/predictor" className="inline-flex items-center gap-2 rounded-full bg-ball px-6 py-3 font-bold text-white shadow-lg transition hover:bg-ball-dark">Try Score Predictor <HiArrowRight /></Link>
              <Link to="/live" className="rounded-full border border-white/40 px-6 py-3 font-bold text-white transition hover:bg-white/10">View Live Matches</Link>
            </div>
            <p className="mt-6 text-xs text-white/55">Scores and fixtures shown here are illustrative demo data.</p>
          </div>
          <div className="hidden justify-self-end lg:block">
            <div className="hero-feature-card rounded-2xl border border-white/20 bg-[#10241c]/80 p-6 text-white shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-flood"><HiOutlineCpuChip /> Model spotlight</div>
              <p className="mt-4 font-display text-3xl tracking-wide">An innings has a story.</p>
              <p className="mt-2 max-w-xs text-sm leading-6 text-white/65">Give the model the match state. See what its trained score prediction says next.</p>
              <div className="mt-6 flex items-center gap-3 rounded-xl bg-white/5 p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-flood/15 text-flood"><HiOutlineChartBar size={22} /></span>
                <div><p className="text-xs text-white/55">Model inputs</p><p className="mt-1 text-sm font-semibold">Teams · score · overs · wickets</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <SectionTitle eyebrow="On the field" title="Live matches" description="Follow the match as it unfolds. Scores here are clearly labeled demo fixtures." to="/live" linkText="All live matches" />
        <div className="grid gap-4 md:grid-cols-2">{liveMatches.slice(0, 2).map((match) => <MatchCard key={match.id} match={match} />)}</div>
      </section>

      <section className="bg-[#eef3ee] dark:bg-stadium-800/50">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <SectionTitle eyebrow="Coming up" title="Mark your calendar" to="/matches" />
          <div className="grid gap-4 md:grid-cols-2">{upcoming.slice(0, 2).map((match) => <MatchCard key={match.id} match={match} />)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <SectionTitle eyebrow="The result" title="Recent results" to="/matches" />
        <div className="grid gap-4 md:grid-cols-2">{matches.filter((match) => match.status === "Completed").map((match) => <MatchCard key={match.id} match={match} />)}</div>
      </section>

      <section className="bg-[#10241c] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <SectionTitle eyebrow="The teams" title="Big teams. Bigger moments." description="Explore teams from around the cricket world." to="/teams" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {featuredTeams.map((name) => <Link key={name} to="/teams" className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-flood/50 hover:bg-white/10"><TeamMark name={name} /><span className="text-sm font-bold">{name}</span></Link>)}
          </div>
          <p className="mt-4 text-xs text-white/50">Predictor model teams are the IPL clubs listed on the Teams page.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <SectionTitle eyebrow="Players to watch" title="Game changers" to="/players" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{featuredPlayers.map((player) => <PlayerCard key={player.id} player={player} />)}</div>
      </section>

      <section className="bg-[#eef3ee] dark:bg-stadium-800/50">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <SectionTitle eyebrow="From around the game" title="The latest" to="/news" linkText="All stories" />
          <div className="grid gap-4 md:grid-cols-3">{news.slice(0, 3).map((article) => <NewsCard key={article.id} article={article} />)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="predictor-banner overflow-hidden rounded-3xl p-7 text-white sm:p-10 lg:p-12">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-flood">Powered by machine learning</p>
          <div className="mt-3 grid items-end gap-6 md:grid-cols-[1fr_auto]">
            <div><h2 className="font-display text-4xl tracking-wide sm:text-5xl">Want to know where the score could finish?</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">Enter the match conditions and current innings state. Our existing trained model returns a score estimate based on the information provided.</p></div>
            <Link to="/predictor" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-stadium-900 transition hover:bg-flood">Predict a score <HiArrowRight /></Link>
          </div>
        </div>
      </section>

      <section className="border-t border-black/5 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <SectionTitle eyebrow="Simple by design" title="How score prediction works" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["Enter the teams", "Add the current score", "Include the last five overs", "Get the model prediction"].map((step, index) => <div key={step} className="site-card p-5"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-ball/10 font-mono font-bold text-ball">0{index + 1}</span><h3 className="mt-4 font-bold">{step}</h3><p className="mt-2 text-sm leading-5 text-stadium-500 dark:text-pitch-light/55">{["Choose batting and bowling teams from the model's supported list.", "Share the innings runs, wickets and overs completed.", "Give the model the recent scoring and wicket trend.", "The existing trained model returns one projected total."][index]}</p></div>)}
          </div>
        </div>
      </section>
    </>
  );
}
