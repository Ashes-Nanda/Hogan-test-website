import { Question, User, TestStatus } from './types';

// Visual to Logical Mapping
export const VISUAL_TO_LOGICAL_MAP: Record<number, number> = {
  1: 1, 
  2: 2, 
  3: 2, 
  4: 2, 
  5: 4, 
  6: 4, 
  7: 5  
};

export const TOTAL_QUESTIONS = 60;
export const QUESTIONS_PER_PAGE = 10;
// Example restricted domain
export const COMPANY_DOMAIN = "acme.inc";

// Generating a sample set of 60 questions distributed across dimensions
const dimensions = {
  HPI: ['Adjustment', 'Ambition', 'Sociability', 'Interpersonal Sensitivity', 'Prudence', 'Inquisitiveness', 'Learning Approach'],
  HDS: ['Excitable', 'Skeptical'],
  MVPI: ['Aesthetic', 'Commercial', 'Power']
};

export const MOCK_QUESTIONS: Question[] = [];

let qCounter = 1;

// Helper to distribute questions roughly evenly
const createQuestions = () => {
  // HPI (7 dimensions) -> ~35 questions
  dimensions.HPI.forEach(dim => {
    for (let i = 0; i < 5; i++) {
      MOCK_QUESTIONS.push({
        id: `q_${qCounter++}`,
        text: `I often find myself demonstrating high levels of ${dim.toLowerCase()} in professional settings.`,
        dimensionType: 'HPI',
        dimensionName: dim
      });
    }
  });

  // HDS (2 dimensions) -> ~10 questions
  dimensions.HDS.forEach(dim => {
    for (let i = 0; i < 5; i++) {
      MOCK_QUESTIONS.push({
        id: `q_${qCounter++}`,
        text: `Under stress, others might describe my behavior as ${dim.toLowerCase()}.`,
        dimensionType: 'HDS',
        dimensionName: dim
      });
    }
  });

  // MVPI (3 dimensions) -> ~15 questions
  dimensions.MVPI.forEach(dim => {
    for (let i = 0; i < 5; i++) {
      MOCK_QUESTIONS.push({
        id: `q_${qCounter++}`,
        text: `I am strongly motivated by ${dim.toLowerCase()} pursuits and environments.`,
        dimensionType: 'MVPI',
        dimensionName: dim
      });
    }
  });
};

createQuestions();

// Updated Mock Users with Attempts structure
export const MOCK_USERS: User[] = [
  { 
    email: 'employee1@acme.inc', 
    name: 'John Doe', 
    status: TestStatus.COMPLETED, 
    token: 'token_1',
    passwordHash: 'pass123',
    attempts: [
      {
        id: 'att_1',
        number: 1,
        completedAt: '2023-10-25T14:30:00Z',
        answers: {}, // Populated in real app
        result: {
          hpi: { 
              'Adjustment': { raw: 20, max: 25, percentage: 80, interpretation: 'High Adjustment' },
              'Ambition': { raw: 15, max: 25, percentage: 60, interpretation: 'Moderate Ambition' },
              'Sociability': { raw: 22, max: 25, percentage: 88, interpretation: 'High Sociability' },
              'Interpersonal Sensitivity': { raw: 18, max: 25, percentage: 72, interpretation: 'High Sensitivity' },
              'Prudence': { raw: 12, max: 25, percentage: 48, interpretation: 'Moderate Prudence' },
              'Inquisitiveness': { raw: 24, max: 25, percentage: 96, interpretation: 'High Inquisitiveness' },
              'Learning Approach': { raw: 14, max: 25, percentage: 56, interpretation: 'Moderate Learning' }
          },
          hds: { 
              'Excitable': { raw: 5, max: 25, percentage: 20, interpretation: 'Low Excitable' },
              'Skeptical': { raw: 10, max: 25, percentage: 40, interpretation: 'Moderate Skeptical' }
          },
          mvpi: { 
              'Power': { raw: 22, max: 25, percentage: 88, interpretation: 'High Power' },
              'Commercial': { raw: 20, max: 25, percentage: 80, interpretation: 'High Commercial' },
              'Aesthetic': { raw: 15, max: 25, percentage: 60, interpretation: 'Moderate Aesthetic' }
          },
          completedAt: '2023-10-25T14:30:00Z',
          attemptNumber: 1,
          leadershipPotentialScore: 78,
          jobFit: ['Management', 'Finance', 'Strategy'],
          riskAnalysis: ['Skeptical'],
          leadershipStyle: [
             { subject: 'Strategy', A: 96, fullMark: 100 },
             { subject: 'People', A: 72, fullMark: 100 },
             { subject: 'Execution', A: 48, fullMark: 100 },
             { subject: 'Drive', A: 60, fullMark: 100 },
             { subject: 'Influence', A: 88, fullMark: 100 },
             { subject: 'Resilience', A: 80, fullMark: 100 },
          ],
          workEnvironment: [
            { label: "Fast-Paced & Competitive", score: 70 },
            { label: "Structured & Process-Oriented", score: 48 },
            { label: "Collaborative & Social", score: 80 },
            { label: "Creative & Innovative", score: 76 },
          ]
        } as any
      }
    ]
  },
  { 
    email: 'employee2@acme.inc', 
    name: 'Jane Smith', 
    status: TestStatus.PENDING, 
    token: 'token_2',
    passwordHash: 'pass123',
    attempts: []
  },
  { 
    email: 'employee3@acme.inc', 
    name: 'Robert Brown', 
    status: TestStatus.IN_PROGRESS, 
    token: 'token_3', 
    passwordHash: 'pass123',
    attempts: []
  },
  { 
    email: 'admin@acme.inc', 
    name: 'HR Admin', 
    status: TestStatus.PENDING, 
    token: 'admin_secret', 
    passwordHash: 'admin123',
    attempts: []
  },
];