import type { CategoryScore } from "@/types";

interface CategoryBreakdownProps {
  categoryScores: CategoryScore[];
}

export function CategoryBreakdown({ categoryScores }: CategoryBreakdownProps) {
  const sorted = [...categoryScores].sort((a, b) => a.score - b.score);

  return (
    <div className="space-y-4">
      {sorted.map((c) => (
        <div key={c.categoryId}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium text-ink">{c.categoryName}</span>
            <span className="text-sm font-medium text-ink-soft tabular-nums">{c.score}</span>
          </div>
          <div className="h-1.5 w-full bg-black/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-700 ease-out"
              style={{ width: `${c.score}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
