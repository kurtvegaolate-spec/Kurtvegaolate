import { useMemo, useState } from "react";
import type { Answers, DiagnosticState, IntakeData } from "@/types";
import { Landing } from "@/components/Landing/Landing";
import { Questionnaire } from "@/components/Questionnaire/Questionnaire";
import { ResultsPage } from "@/components/Results/ResultsPage";
import { computeScoring } from "@/lib/scoringEngine";
import { decodeStateFromHash } from "@/lib/shareLink";

type View = "landing" | "questionnaire" | "results";

function getInitialState(): { view: View; state: DiagnosticState | null } {
  const fromHash = decodeStateFromHash(window.location.hash);
  if (fromHash) {
    return { view: "results", state: fromHash };
  }
  return { view: "landing", state: null };
}

export default function App() {
  const initial = useMemo(getInitialState, []);
  const [view, setView] = useState<View>(initial.view);
  const [intake, setIntake] = useState<IntakeData | null>(initial.state?.intake ?? null);
  const [answers, setAnswers] = useState<Answers | null>(initial.state?.answers ?? null);

  function handleStart(data: IntakeData) {
    setIntake(data);
    setView("questionnaire");
  }

  function handleQuestionnaireComplete(finalAnswers: Answers) {
    setAnswers(finalAnswers);
    setView("results");
  }

  function handleRestart() {
    window.location.hash = "";
    setIntake(null);
    setAnswers(null);
    setView("landing");
  }

  if (view === "questionnaire" && intake) {
    return (
      <Questionnaire onComplete={handleQuestionnaireComplete} onBackToStart={handleRestart} />
    );
  }

  if (view === "results" && intake && answers) {
    const state: DiagnosticState = { intake, answers };
    const scoring = computeScoring(answers);
    return <ResultsPage state={state} scoring={scoring} onRestart={handleRestart} />;
  }

  return <Landing onStart={handleStart} />;
}
