import { useEffect, useState } from "react";
import type { DiagnosticState, ScoringResult } from "@/types";
import { industryLabels, companySizeLabels } from "@/config/questions";
import { generateReport } from "@/lib/api";
import { buildShareUrl } from "@/lib/shareLink";
import { RadarChartView } from "./RadarChartView";
import { ScoreSummary } from "./ScoreSummary";
import { CategoryBreakdown } from "./CategoryBreakdown";
import { ReportText } from "./ReportText";
import { ShareExportBar } from "./ShareExportBar";
import { ContactCTA } from "./ContactCTA";

interface ResultsPageProps {
  state: DiagnosticState;
  scoring: ScoringResult;
  onRestart: () => void;
}

type ReportStatus = "idle" | "loading" | "ready" | "error";

export function ResultsPage({ state, scoring, onRestart }: ResultsPageProps) {
  const [reportStatus, setReportStatus] = useState<ReportStatus>("idle");
  const [reportText, setReportText] = useState<string | null>(null);

  async function fetchReport() {
    setReportStatus("loading");
    try {
      const report = await generateReport({ intake: state.intake, answers: state.answers, scoring });
      setReportText(report);
      setReportStatus("ready");
    } catch (err) {
      console.error(err);
      setReportStatus("error");
    }
  }

  useEffect(() => {
    fetchReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCopyLink() {
    const url = buildShareUrl(state);
    await navigator.clipboard.writeText(url);
  }

  const today = new Intl.DateTimeFormat("es-CL", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date()
  );

  return (
    <div className="min-h-screen px-6 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <header className="no-print flex items-center justify-between mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Tree Studio
          </span>
          <button
            onClick={onRestart}
            className="text-sm font-medium text-ink-faint hover:text-ink transition-colors"
          >
            Nuevo diagnóstico
          </button>
        </header>

        <div className="mb-10">
          <h1 className="text-2xl md:text-3xl font-serif text-ink">
            {state.intake.companyName}
          </h1>
          <p className="mt-1.5 text-sm text-ink-faint">
            {industryLabels[state.intake.industry]} · {companySizeLabels[state.intake.companySize]} · {today}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-black/[0.06] shadow-card p-6 md:p-10 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <ScoreSummary result={scoring} companyName={state.intake.companyName} />
            <RadarChartView categoryScores={scoring.categoryScores} />
          </div>

          <div className="mt-10 pt-10 border-t border-black/[0.06]">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint mb-5">
              Puntaje por dimensión
            </h2>
            <CategoryBreakdown categoryScores={scoring.categoryScores} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-black/[0.06] shadow-card p-6 md:p-10 mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint mb-6">
            Diagnóstico
          </h2>
          <ReportText status={reportStatus} text={reportText} onRetry={fetchReport} />
        </div>

        <div className="flex items-center justify-between mb-8">
          <ShareExportBar onCopyLink={handleCopyLink} />
        </div>

        <ContactCTA />
      </div>
    </div>
  );
}
