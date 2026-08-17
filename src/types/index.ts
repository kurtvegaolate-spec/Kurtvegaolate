export type Industry =
  | "retail"
  | "consumo_masivo"
  | "logistica"
  | "educacion_superior"
  | "servicios_financieros"
  | "manufactura"
  | "otra";

export type CompanySize =
  | "50_200"
  | "200_1000"
  | "1000_5000"
  | "5000_mas";

export interface IntakeData {
  companyName: string;
  industry: Industry;
  companySize: CompanySize;
  respondentRole: string;
}

export interface QuestionOption {
  value: number; // 1 a 5
  label: string; // descriptor corto
}

export interface Question {
  id: string;
  prompt: string;
  helper?: string;
  lowLabel: string; // descriptor del extremo bajo (1)
  highLabel: string; // descriptor del extremo alto (5)
}

export interface Category {
  id: string;
  name: string;
  shortName: string;
  description: string;
  questions: Question[];
}

export type Answers = Record<string, number>; // questionId -> 1..5

export interface CategoryScore {
  categoryId: string;
  categoryName: string;
  score: number; // 0-100
}

export interface MaturityLevel {
  id: string;
  name: string;
  minScore: number;
  maxScore: number;
  description: string;
}

export interface ScoringResult {
  categoryScores: CategoryScore[];
  globalScore: number;
  level: MaturityLevel;
}

export interface DiagnosticState {
  intake: IntakeData;
  answers: Answers;
}

export interface ReportContent {
  text: string;
  generatedAt: string;
}
