import { Question, User, TestStatus } from './types';

// Visual to Logical Mapping
// Visual to Logical Mapping
// 4-point Likert Scale (SD to SA)
// Visual 1 (SD) -> Logical 1
// Visual 2 (D)  -> Logical 2
// Visual 3 (A)  -> Logical 4
// Visual 4 (SA) -> Logical 5
export const VISUAL_TO_LOGICAL_MAP: Record<number, number> = {
  1: 1, // SD
  2: 2, // D
  3: 4, // A
  4: 5  // SA
};

export const TOTAL_QUESTIONS = 100;
export const QUESTIONS_PER_PAGE = 10;
export const COMPANY_DOMAIN = "c4e.in"; // Updated domain

// Questions from separated data files
export { MOCK_QUESTIONS } from './data/questions';

// Mock Users removed - using Supabase
export const MOCK_USERS: User[] = [];