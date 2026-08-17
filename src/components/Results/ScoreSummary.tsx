import type { ScoringResult } from "@/types";

interface ScoreSummaryProps {
  result: ScoringResult;
  companyName: string;
}

export function ScoreSummary({ result, companyName }: ScoreSummaryProps) {
  return (
    <div className="flex flex-col items-start">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
        Resultado global
      </span>
      <div className="mt-3 flex items-baseline gap-3">
        <span className="text-6xl md:text-7xl font-serif text-ink tabular-nums">
          {result.globalScore}
        </span>
        <span className="text-lg text-ink-faint">/ 100</span>
      </div>

      <span className="mt-3 inline-flex items-center rounded-full bg-accent-light px-3.5 py-1.5 text-sm font-medium text-accent-dark">
        Nivel {result.level.name}
      </span>

      <p className="mt-4 text-sm text-ink-soft leading-relaxed max-w-sm">
        {companyName} — {result.level.description}
      </p>
    </div>
  );
}
