import type { IntakeData } from "@/types";
import { IntakeForm } from "./IntakeForm";
import { categories } from "@/config/questions";

interface LandingProps {
  onStart: (data: IntakeData) => void;
}

export function Landing({ onStart }: LandingProps) {
  const totalQuestions = categories.reduce((acc, c) => acc + c.questions.length, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-xl">
          <div className="mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Tree Studio
            </span>
            <h1 className="mt-4 text-3xl md:text-4xl font-serif font-normal text-ink leading-[1.15]">
              Diagnóstico de Madurez Digital &amp; IA
            </h1>
            <p className="mt-4 text-base text-ink-soft leading-relaxed">
              {totalQuestions} preguntas, {categories.length} dimensiones, menos de 5 minutos.
              Al finalizar recibirá un diagnóstico personalizado con su nivel de madurez,
              brechas prioritarias y un roadmap de acción a 12 meses.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-black/[0.06] shadow-card p-6 md:p-8">
            <IntakeForm onSubmit={onStart} />
          </div>

          <p className="mt-6 text-xs text-ink-faint leading-relaxed">
            Sus respuestas se usan exclusivamente para generar este diagnóstico.
            Tree Studio podrá contactarlo para conversar sobre los resultados.
          </p>
        </div>
      </div>
    </div>
  );
}
