export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl tracking-wide">About this project</h1>
      <div className="glass-card mt-6 space-y-4 p-6 text-sm leading-relaxed text-stadium-700 dark:text-pitch-light/80">
        <p>
          IPL Score Predictor estimates a T20 innings&rsquo; final score from the state of play:
          the two teams, runs and wickets so far, and how the last five overs went. Under the
          hood it&rsquo;s an XGBoost regression model trained on historical IPL data, served
          through a small Flask API.
        </p>
        <p>
          The weather panel calls OpenWeatherMap for the selected city so you can see conditions
          alongside the prediction &mdash; it doesn&rsquo;t feed into the model itself, it&rsquo;s
          there for context.
        </p>
        <p>
          Every prediction you make is saved to this browser&rsquo;s local storage so you can
          revisit or compare past scenarios. Nothing is sent to a server beyond the match state
          needed to generate the prediction.
        </p>
      </div>
    </div>
  );
}
