import type { IntakeData, Answers, ScoringResult } from "@/types";

export interface GenerateReportPayload {
  intake: IntakeData;
  answers: Answers;
  scoring: ScoringResult;
}

export interface GenerateReportResponse {
  report: string;
}

export async function generateReport(payload: GenerateReportPayload): Promise<string> {
  const res = await fetch("/api/generate-report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Error del servidor (${res.status})`);
  }

  const data: GenerateReportResponse = await res.json();
  return data.report;
}
