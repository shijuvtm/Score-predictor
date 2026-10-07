import { TEAM_META } from "../constants/teams.js";

const stadium = "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1400&q=85";
const cricketAction = "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1000&q=80";
const cricketGround = "https://images.unsplash.com/photo-1593766827228-8737b5cd8f4b?auto=format&fit=crop&w=1000&q=80";

export const teams = Object.entries(TEAM_META).map(([name, meta], index) => ({
  id: `team-${index + 1}`,
  name,
  short: meta.short,
  color: meta.color,
  country: "India",
  players: index === 0 ? 25 : 24,
  description: `${name} bring a distinctive identity and a passionate following to the Indian Premier League. Explore the squad, team profile and season information.`,
}));

export const matches = [
  {
    id: "demo-live-1", status: "Live", format: "T20", date: "07 Oct 2026", time: "7:30 PM",
    venue: "Wankhede Stadium, Mumbai", city: "Mumbai", home: "Mumbai Indians", away: "Chennai Super Kings",
    homeScore: "176/4", homeOvers: "17.3", awayScore: "204/6", awayOvers: "20",
    note: "Mumbai need 29 runs from 15 balls", runRate: "10.05",
  },
  {
    id: "demo-live-2", status: "Live", format: "T20", date: "07 Oct 2026", time: "3:30 PM",
    venue: "Arun Jaitley Stadium, Delhi", city: "Delhi", home: "Delhi Capitals", away: "Punjab Kings",
    homeScore: "142/3", homeOvers: "15.1", awayScore: "198/7", awayOvers: "20",
    note: "Delhi need 57 runs from 29 balls", runRate: "9.36",
  },
  {
    id: "demo-upcoming-1", status: "Upcoming", format: "T20", date: "12 Oct 2026", time: "7:30 PM",
    venue: "Wankhede Stadium, Mumbai", city: "Mumbai", home: "India", away: "England",
  },
  {
    id: "demo-upcoming-2", status: "Upcoming", format: "T20", date: "14 Oct 2026", time: "7:30 PM",
    venue: "M. A. Chidambaram Stadium, Chennai", city: "Chennai", home: "Australia", away: "New Zealand",
  },
  {
    id: "demo-completed-1", status: "Completed", format: "T20", date: "05 Oct 2026", time: "7:30 PM",
    venue: "Eden Gardens, Kolkata", city: "Kolkata", home: "India", away: "Australia",
    homeScore: "184/6", awayScore: "179/8", note: "India won by 5 runs",
  },
  {
    id: "demo-completed-2", status: "Completed", format: "T20", date: "03 Oct 2026", time: "7:30 PM",
    venue: "Narendra Modi Stadium, Ahmedabad", city: "Ahmedabad", home: "South Africa", away: "Pakistan",
    homeScore: "167/7", awayScore: "168/5", note: "Pakistan won by 5 wickets",
  },
];

export const players = [
  { id: "player-virat", name: "Virat Kohli", country: "India", role: "Batter", batting: "Right-hand bat", bowling: "Right-arm medium", matches: 125, runs: "4,188", average: "48.7", strikeRate: "137.2", wickets: 4, economy: "8.8", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80" },
  { id: "player-smriti", name: "Smriti Mandhana", country: "India", role: "Batter", batting: "Left-hand bat", bowling: "Right-arm offbreak", matches: 136, runs: "3,493", average: "29.4", strikeRate: "123.4", wickets: 0, economy: "—", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" },
  { id: "player-bumrah", name: "Jasprit Bumrah", country: "India", role: "Bowler", batting: "Right-hand bat", bowling: "Right-arm fast", matches: 133, runs: "69", average: "3.8", strikeRate: "53.1", wickets: 165, economy: "7.3", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80" },
  { id: "player-stokes", name: "Ben Stokes", country: "England", role: "All-rounder", batting: "Left-hand bat", bowling: "Right-arm fast-medium", matches: 43, runs: "920", average: "25.6", strikeRate: "134.5", wickets: 28, economy: "8.6", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" },
  { id: "player-maxwell", name: "Glenn Maxwell", country: "Australia", role: "All-rounder", batting: "Right-hand bat", bowling: "Right-arm offbreak", matches: 134, runs: "2,771", average: "25.7", strikeRate: "156.4", wickets: 37, economy: "8.3", image: "https://images.unsplash.com/photo-1507103011901-e954d6ec0988?auto=format&fit=crop&w=600&q=80" },
  { id: "player-rashid", name: "Rashid Khan", country: "Afghanistan", role: "Bowler", batting: "Right-hand bat", bowling: "Right-arm legbreak", matches: 121, runs: "545", average: "13.6", strikeRate: "152.7", wickets: 149, economy: "6.8", image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=600&q=80" },
];

export const news = [
  { id: "news-conditions", category: "Match preview", title: "Reading the conditions: how a Mumbai surface shapes a T20 chase", summary: "A closer look at the ground, pace and matchups that can shift the momentum under the Wankhede lights.", date: "07 Oct 2026", image: stadium, content: "Wankhede is known for its lively atmosphere and a surface that can reward positive stroke play. Teams planning a chase often weigh the new-ball movement against the value of keeping wickets in hand for the closing overs. Conditions are only one part of the story: the score, wickets and recent scoring rate all shape the likely finish." },
  { id: "news-data", category: "Analysis", title: "What the last five overs can tell us about an innings", summary: "Recent scoring pace adds useful context when estimating a T20 innings total.", date: "06 Oct 2026", image: cricketAction, content: "A short recent window can reflect changes in batter intent, bowling matchups and field settings. It is not a guarantee of what comes next, but it adds context alongside the current score, wickets and overs completed. Our predictor combines these match-state inputs through its trained model." },
  { id: "news-youth", category: "Features", title: "The next generation bringing fearless energy to the game", summary: "Young players are finding new ways to make an impact across formats.", date: "04 Oct 2026", image: cricketGround, content: "Across modern cricket, emerging players are making their mark with adaptability and confidence. Strong domestic pathways and a willingness to learn across formats continue to broaden the game and create new stories for supporters." },
  { id: "news-captains", category: "Tactics", title: "Captaincy in the final overs: the value of one brave decision", summary: "Field changes, bowling options and calm choices can decide a close finish.", date: "02 Oct 2026", image: stadium, content: "The closing overs test planning as much as execution. Captains balance boundary protection with wicket-taking options, while bowlers look for variations that match the conditions. A single well-timed change can alter the shape of a chase." },
];

export const heroImage = stadium;
