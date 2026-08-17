import type { MaturityLevel } from "@/types";

/**
 * Niveles de madurez global. minScore/maxScore están en la escala 0-100.
 * Ajustar estos cortes es la única palanca necesaria para recalibrar
 * qué tan "exigente" es el diagnóstico.
 */
export const maturityLevels: MaturityLevel[] = [
  {
    id: "inicial",
    name: "Inicial",
    minScore: 0,
    maxScore: 34,
    description:
      "La digitalización y el uso de IA son incipientes o inexistentes. Las iniciativas, cuando existen, dependen de esfuerzos individuales sin respaldo estructural.",
  },
  {
    id: "en_desarrollo",
    name: "En Desarrollo",
    minScore: 35,
    maxScore: 59,
    description:
      "Existen bases y algunos avances concretos, pero de forma desigual entre áreas. Falta consistencia y foco para capturar el valor completo.",
  },
  {
    id: "consolidado",
    name: "Consolidado",
    minScore: 60,
    maxScore: 79,
    description:
      "La organización cuenta con capacidades sólidas y probadas en la mayoría de las dimensiones, con procesos de mejora continua activos.",
  },
  {
    id: "lider",
    name: "Líder",
    minScore: 80,
    maxScore: 100,
    description:
      "La madurez digital y de IA es una ventaja competitiva real, con capacidades de punta y cultura de innovación instalada en toda la organización.",
  },
];

/**
 * Ponderación de cada categoría en el puntaje global.
 * Deben sumar 1. Todas parten iguales (1/6); ajustar aquí si Tree Studio
 * decide que alguna dimensión debe pesar más que otras.
 */
export const categoryWeights: Record<string, number> = {
  estrategia: 1 / 6,
  datos: 1 / 6,
  tecnologia: 1 / 6,
  ia: 1 / 6,
  procesos: 1 / 6,
  cultura: 1 / 6,
};

export function getMaturityLevel(globalScore: number): MaturityLevel {
  const level = maturityLevels.find(
    (l) => globalScore >= l.minScore && globalScore <= l.maxScore
  );
  return level ?? maturityLevels[0];
}
