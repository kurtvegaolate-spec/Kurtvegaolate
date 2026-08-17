interface ProgressBarProps {
  currentStep: number; // 0-indexed
  totalSteps: number;
  stepLabel: string;
}

export function ProgressBar({ currentStep, totalSteps, stepLabel }: ProgressBarProps) {
  const pct = Math.round(((currentStep + 1) / totalSteps) * 100);

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-xs font-medium uppercase tracking-wider text-ink-faint">
          {stepLabel}
        </span>
        <span className="text-xs font-medium text-ink-faint tabular-nums">
          {currentStep + 1} / {totalSteps}
        </span>
      </div>
      <div className="h-1 w-full bg-black/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
