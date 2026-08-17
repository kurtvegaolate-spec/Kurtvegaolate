import type { Question } from "@/types";

interface ScaleInputProps {
  question: Question;
  value: number | undefined;
  onChange: (value: number) => void;
}

const POINTS = [1, 2, 3, 4, 5];

export function ScaleInput({ question, value, onChange }: ScaleInputProps) {
  return (
    <div className="py-8 border-b border-black/[0.06] last:border-b-0">
      <p className="text-lg md:text-xl font-medium text-ink leading-snug mb-6">
        {question.prompt}
      </p>

      <div className="flex items-center justify-between gap-2 md:gap-3">
        {POINTS.map((point) => {
          const selected = value === point;
          return (
            <button
              key={point}
              type="button"
              onClick={() => onChange(point)}
              aria-pressed={selected}
              aria-label={`Nivel ${point} de 5`}
              className={[
                "flex-1 aspect-square max-w-16 rounded-full border text-sm md:text-base font-medium transition-all duration-150",
                selected
                  ? "bg-accent border-accent text-white shadow-card scale-105"
                  : "bg-white border-black/10 text-ink-soft hover:border-accent/50 hover:text-ink",
              ].join(" ")}
            >
              {point}
            </button>
          );
        })}
      </div>

      <div className="flex items-start justify-between gap-4 mt-3">
        <span className="text-xs md:text-[13px] text-ink-faint leading-snug max-w-[45%]">
          {question.lowLabel}
        </span>
        <span className="text-xs md:text-[13px] text-ink-faint leading-snug max-w-[45%] text-right">
          {question.highLabel}
        </span>
      </div>
    </div>
  );
}
