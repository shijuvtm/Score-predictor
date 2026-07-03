export default function LoadingSpinner({ label = "Loading" }) {
  return (
    <div className="flex items-center justify-center gap-3 py-6" role="status" aria-live="polite">
      <span className="relative flex h-6 w-6">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ball/50" />
        <span className="relative inline-flex h-6 w-6 rounded-full bg-ball" />
      </span>
      <span className="text-sm font-medium text-stadium-700 dark:text-pitch-light/80">
        {label}&hellip;
      </span>
    </div>
  );
}
