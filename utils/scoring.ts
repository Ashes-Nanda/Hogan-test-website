import { AnswerMap, Question, TestResult, DimensionScore, RadarDataPoint, WorkEnvFit } from '../types';
import { MOCK_QUESTIONS, VISUAL_TO_LOGICAL_MAP } from '../constants';

// Mock interpretation generator based on score percentage
const getInterpretation = (dimension: string, percentage: number): string => {
  if (percentage >= 75) return `High ${dimension}: Likely to demonstrate strong characteristics in this area. May be seen as a defining trait.`;
  if (percentage >= 40) return `Moderate ${dimension}: Balanced approach. Traits appear depending on the situation.`;
  return `Low ${dimension}: Less likely to exhibit these behaviors. May struggle in environments requiring high levels of this trait.`;
};

// Helper to determine Profile Title
const determineProfileTitle = (hpi: Record<string, DimensionScore>): string => {
  const getScore = (name: string) => hpi[name]?.percentage || 0;
  
  if (getScore('Ambition') > 75 && getScore('Sociability') > 70) return "The Charismatic Leader";
  if (getScore('Adjustment') > 75 && getScore('Prudence') > 70) return "The Steady Executor";
  if (getScore('Inquisitiveness') > 75 && getScore('Learning Approach') > 70) return "The Visionary Strategist";
  if (getScore('Interpersonal Sensitivity') > 75 && getScore('Sociability') > 70) return "The Diplomatic Connector";
  if (getScore('Ambition') > 80) return "The Driven Achiever";
  
  return "The Balanced Professional";
};

export const calculateScores = (answers: AnswerMap, attemptNumber: number = 1): TestResult => {
  const result: TestResult = {
    hpi: {},
    hds: {},
    mvpi: {},
    completedAt: new Date().toISOString(),
    attemptNumber,
    profileTitle: "Assessment Incomplete",
    leadershipPotentialScore: 0,
    jobFit: [],
    riskAnalysis: [],
    leadershipStyle: [],
    workEnvironment: []
  };

  // Group questions by dimension
  const questionsByDim: Record<string, Question[]> = {};
  
  MOCK_QUESTIONS.forEach(q => {
    const key = `${q.dimensionType}|${q.dimensionName}`;
    if (!questionsByDim[key]) questionsByDim[key] = [];
    questionsByDim[key].push(q);
  });

  // Calculate scores per dimension
  Object.keys(questionsByDim).forEach(key => {
    const [type, name] = key.split('|');
    const questions = questionsByDim[key];
    
    let rawScore = 0;
    let answeredCount = 0;

    questions.forEach(q => {
      const visualValue = answers[q.id];
      if (visualValue) {
        const logicalValue = VISUAL_TO_LOGICAL_MAP[visualValue];
        rawScore += logicalValue;
        answeredCount++;
      }
    });

    const maxScore = questions.length * 5;
    const percentage = maxScore > 0 ? (rawScore / maxScore) * 100 : 0;
    const finalPercentage = Math.round(percentage * 10) / 10;

    const scoreObject: DimensionScore = {
      raw: rawScore,
      max: maxScore,
      percentage: finalPercentage,
      interpretation: getInterpretation(name, finalPercentage)
    };

    if (type === 'HPI') result.hpi[name] = scoreObject;
    if (type === 'HDS') result.hds[name] = scoreObject;
    if (type === 'MVPI') result.mvpi[name] = scoreObject;
  });

  // --- DERIVED INSIGHTS CALCULATION ---

  // 1. Leadership Potential Score
  // Base Score: Average of Ambition, Sociability, Adjustment, and Prudence.
  const leadershipTraits = ['Ambition', 'Sociability', 'Adjustment', 'Prudence'];
  let lpSum = 0;
  let lpCount = 0;

  leadershipTraits.forEach(trait => {
    // Safely access trait if it exists
    const score = result.hpi[trait];
    if (score) {
      lpSum += score.percentage;
      lpCount++;
    }
  });

  const baseLpScore = lpCount > 0 ? lpSum / lpCount : 0;

  // Risk Penalty: For every HDS trait >= 70%, subtract 5 points.
  let riskPenalty = 0;
  Object.values(result.hds).forEach(score => {
    if (score.percentage >= 70) {
      riskPenalty += 5;
    }
  });

  result.leadershipPotentialScore = Math.max(0, Math.min(100, Math.round(baseLpScore - riskPenalty)));

  // 2. Job Fit Recommendations
  const jobs: string[] = [];
  
  // Helper to safely get percentage
  const getHpiScore = (trait: string) => result.hpi[trait]?.percentage ?? 0;

  if (getHpiScore('Ambition') >= 70) {
    jobs.push("Executive Leadership", "Entrepreneurship", "Sales Management");
  }
  if (getHpiScore('Sociability') >= 70) {
    jobs.push("Public Relations", "Business Development", "Client Success");
  }
  if (getHpiScore('Prudence') >= 70) {
    jobs.push("Financial Analysis", "Quality Assurance", "Project Operations");
  }
  if (getHpiScore('Inquisitiveness') >= 70) {
    jobs.push("Strategic Consulting", "Product Management", "Research & Development");
  }
  if (getHpiScore('Interpersonal Sensitivity') >= 70) {
    jobs.push("Human Resources", "Diplomacy", "Counseling");
  }
  if (getHpiScore('Adjustment') >= 70) {
    jobs.push("Crisis Management", "High-Stakes Trading", "Emergency Response");
  }

  // Deduplicate recommendations
  result.jobFit = [...new Set(jobs)];
  if (result.jobFit.length === 0) result.jobFit.push("General Management", "Operations Specialist"); // Fallback

  // 3. Risk Analysis (HDS)
  // Any HDS trait with a score >= 70% is flagged
  Object.entries(result.hds).forEach(([traitName, score]) => {
    if (score.percentage >= 70) {
      result.riskAnalysis.push(traitName);
    }
  });

  // 4. Profile Title
  result.profileTitle = determineProfileTitle(result.hpi);

  // 5. Leadership Style Radar Data
  result.leadershipStyle = [
    { subject: 'Strategy', A: getHpiScore('Inquisitiveness'), fullMark: 100 },
    { subject: 'People', A: getHpiScore('Interpersonal Sensitivity'), fullMark: 100 },
    { subject: 'Execution', A: getHpiScore('Prudence'), fullMark: 100 },
    { subject: 'Drive', A: getHpiScore('Ambition'), fullMark: 100 },
    { subject: 'Influence', A: getHpiScore('Sociability'), fullMark: 100 },
    { subject: 'Resilience', A: getHpiScore('Adjustment'), fullMark: 100 },
  ];

  // 6. Work Environment Fit
  result.workEnvironment = [
    { label: "Fast-Paced & Competitive", score: (getHpiScore('Ambition') + getHpiScore('Adjustment')) / 2 },
    { label: "Structured & Process-Oriented", score: getHpiScore('Prudence') },
    { label: "Collaborative & Social", score: (getHpiScore('Sociability') + getHpiScore('Interpersonal Sensitivity')) / 2 },
    { label: "Creative & Innovative", score: (getHpiScore('Inquisitiveness') + getHpiScore('Learning Approach')) / 2 },
  ];

  return result;
};