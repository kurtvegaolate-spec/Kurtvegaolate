import { useState } from "react";
import { categories } from "@/config/questions";
import type { Answers } from "@/types";
import { ProgressBar } from "./ProgressBar";
import { ScaleInput } from "./ScaleInput";

interface QuestionnaireProps {
  onComplete: (answers: Answers) => void;
  onBackToStart: () => void;
}

export function Questionnaire({ onComplete, onBackToStart }: QuestionnaireProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const category = categories[stepIndex];
  const isLastStep = stepIndex === categories.length - 1;
  const isFirstStep = stepIndex === 0;

  const allAnsweredInStep = category.questions.every((q) => answers[q.id] !== undefined);

  function handleAnswer(questionId: string, value: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function handleNext() {
    if (!allAnsweredInStep) return;
    if (isLastStep) {
      onComplete(answers);
    } else {
      setStepIndex((i) => i + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleBack() {
    if (isFirstStep) {
      onBackToStart();
    } else {
      setStepIndex((i) => i - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div className="min-h-screen flex items-start md:items-center justify-center px-6 py-12 md:py-16">
      <div className="w-full max-w-2xl">
        <ProgressBar
          currentStep={stepIndex}
          totalSteps={categories.length}
          stepLabel={category.shortName}
        />

        <div className="mb-2">
          <h2 className="text-2xl md:text-[28px] font-serif text-ink">{category.name}</h2>
          <p className="mt-2 text-sm text-ink-soft leading-relaxed max-w-lg">
            {category.description}
          </p>
        </div>

        <div className="mt-4">
          {category.questions.map((q) => (
            <ScaleInput
              key={q.id}
              question={q}
              value={answers[q.id]}
              onChange={(value) => handleAnswer(q.id, value)}
            />
          ))}
        </div>

        <div className="flex items-center justify-between mt-10">
          <button
            type="button"
            onClick={handleBack}
            className="text-sm font-medium text-ink-soft hover:text-ink transition-colors"
          >
            ← Volver
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!allAnsweredInStep}
            className="inline-flex items-center justify-center rounded-lg bg-accent px-7 py-3 text-white text-sm font-medium hover:bg-accent-dark disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            {isLastStep ? "Ver resultados" : "Siguiente"}
          </button>
        </div>
      </div>
    </div>
  );
}
