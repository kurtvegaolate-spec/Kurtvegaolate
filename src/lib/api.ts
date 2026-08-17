import type { IntakeData, Answers, ScoringResult } from "@/types";
import { supabase } from "./supabaseClient";

export interface GenerateReportPayload {
  intake: IntakeData;
  answers: Answers;
  scoring: ScoringResult;
}

export interface GenerateReportResponse {
  report: string;
}

export async function generateReport(payload: GenerateReportPayload): Promise<string> {
  const { data, error } = await supabase.functions.invoke<GenerateReportResponse>(
    "generate-report",
    { body: payload }
  );

  if (error) {
    // La librería de Supabase no expone el cuerpo JSON del error automáticamente:
    // hay que leerlo desde error.context (la Response cruda) para mostrar el
    // mensaje específico que devuelve nuestra función (ej. "falta la llave").
    const context = (error as { context?: Response }).context;
    const detail = await context
      ?.clone()
      .json()
      .then((body) => body?.error as string | undefined)
      .catch(() => undefined);
    throw new Error(detail ?? error.message ?? "No se pudo generar el informe.");
  }

  if (!data?.report) {
    throw new Error("La función no devolvió un informe.");
  }

  return data.report;
}
