import { Suspense, lazy, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import { AuthProvider, useAuth } from "./auth/AuthContext.jsx";
import {
  LivePage, LoginPage, MatchDetailPage, MatchesPage, NewsDetailPage, NewsPage,
  PlayerDetailPage, PlayersPage, ProfilePage, SignupPage, TeamDetailPage, TeamsPage,
} from "./pages/CricketPages.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const Predictor = lazy(() => import("./pages/Dashboard.jsx"));
const About = lazy(() => import("./pages/About.jsx"));

const THEME_KEY = "ipl-score-predictor:theme";

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col bg-pitch-light text-stadium-900 dark:bg-stadium-900 dark:text-pitch-light">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <div className="flex-1">
          <Suspense fallback={<LoadingSpinner label="Loading page" />}>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/live" element={<LivePage />} />
            <Route path="/matches" element={<MatchesPage />} />
            <Route path="/matches/:id" element={<MatchDetailPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/teams/:id" element={<TeamDetailPage />} />
            <Route path="/players" element={<PlayersPage />} />
            <Route path="/players/:id" element={<PlayerDetailPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:id" element={<NewsDetailPage />} />
            <Route path="/predictor" element={<RequireAuth><Predictor /></RequireAuth>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner label="Checking your account" />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}

function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="font-display text-6xl text-ball">404</p>
      <p className="mt-2 text-stadium-600 dark:text-pitch-light/70">
        That page isn&rsquo;t on the scorecard.
      </p>
    </div>
  );
}
