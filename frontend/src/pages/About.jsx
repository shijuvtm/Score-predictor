export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl tracking-wide">About this project</h1>
      <div className="glass-card mt-6 space-y-4 p-6 text-sm leading-relaxed text-stadium-700 dark:text-pitch-light/80">
        <p>
          Cricket Predictor brings match information, team and player profiles, original demo
          stories and an ML-powered score predictor together in one responsive cricket website.
          The score estimate uses this project&rsquo;s existing XGBoost model through its Flask API.
        </p>
        <p>
          The prediction model uses batting and bowling teams, current runs, wickets and overs,
          plus the runs and wickets from the last five overs. Match rate and presentation details
          are not added to the model features.
        </p>
        <p>
          Match fixtures, player statistics and cricket stories shown in this portfolio build are
          illustrative local demo content, not a live data feed. Prediction history stays in this
          browser; the only data sent to Flask is the match state needed to generate the prediction.
        </p>
      </div>
    </div>
  );
}
