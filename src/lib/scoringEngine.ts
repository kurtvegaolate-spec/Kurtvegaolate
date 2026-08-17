import { categories } from "@/config/questions";
import { categoryWeights, getMaturityLevel } from "@/config/scoring";
import type { Answers, ScoringResult } from "@/types";

const SCALE_MIN = 1;
const SCALE_MAX = 5;

/** Convierte un promedio en escala 1-5 a un puntaje 0-100. */
function toHundredScale(avgOneToFive: number): number {
  return Math.round(((avgOneToFive - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100);
}

export function computeScoring(answers: Answers): ScoringResult {
  const categoryScores = categories.map((category) => {
    const values = category.questions.map((q) => answers[q.id]).filter((v): v is number => v !== undefined);
    const avg = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : SCALE_MIN;
    return {
      categoryId: category.id,
      categoryName: category.name,
      score: toHundredScale(avg),
    };
  });

  const globalScore = Math.round(
    categoryScores.reduce((acc, c) => {
      const weight = categoryWeights[c.categoryId] ?? 1 / categoryScores.length;
      return acc + c.score * weight;
    }, 0)
  );

  return {
    categoryScores,
    globalScore,
    level: getMaturityLevel(globalScore),
  };
}
