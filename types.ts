export enum TestStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export type DimensionType = 'HPI' | 'HDS' | 'MVPI' | 'HBRI';

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  text: string;
  dimensionType: DimensionType;
  dimensionName: string; // e.g., "Adjustment", "Ambition"
  options?: QuestionOption[];
  correctAnswer?: string;
}

// 1-4 Visual Scale mapping or string for HBRI
export type VisualScore = 1 | 2 | 3 | 4 | string;

// Storage for answers: { "q_1": 4, "q_2": 7 }
export type AnswerMap = Record<string, VisualScore>;

export interface DimensionScore {
  raw: number;
  max: number;
  percentage: number;
  interpretation?: string; // Added for Admin view
}

export interface RadarDataPoint {
  subject: string;
  A: number;
  fullMark: number;
}

export interface WorkEnvFit {
  label: string;
  score: number;
}

export interface TestResult {
  hpi: Record<string, DimensionScore>;
  hds: Record<string, DimensionScore>;
  mvpi: Record<string, DimensionScore>;
  hbri?: Record<string, DimensionScore>;
  completedAt: string;
  attemptNumber: number;
  // Derived Insights
  profileTitle: string; // e.g., "The Ambitious Leader"
  leadershipPotentialScore: number;
  jobFit: string[];
  riskAnalysis: string[];
  leadershipStyle: RadarDataPoint[];
  workEnvironment: WorkEnvFit[];
}

export interface Attempt {
  id: string;
  number: number;
  completedAt: string;
  answers: AnswerMap;
  result: TestResult;
}

export interface User {
  id: string; // Supabase UUID
  email: string;
  role?: 'employee' | 'admin';
  name: string;
  passwordHash?: string; // Simulated
  status: TestStatus;
  token: string;
  attempts: Attempt[]; // New: History of attempts
}

export interface AppState {
  currentUser: User | null;
  answers: AnswerMap;
  isAdmin: boolean;
}