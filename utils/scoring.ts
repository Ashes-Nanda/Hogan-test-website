import { AnswerMap, Question, TestResult, DimensionScore } from '../types';
import { MOCK_QUESTIONS, VISUAL_TO_LOGICAL_MAP } from '../constants';

// --- Helper Functions for Profile Generation (Adapted from calculateHogan.ts) ---

const generateHPIProfile = (hpi: Record<string, DimensionScore>): string => {
  const traits = Object.entries(hpi)
    .sort(([, a], [, b]) => b.percentage - a.percentage)
    .slice(0, 3)
    .map(([trait, scores]) => ({
      trait: trait, // Already formatted in constants
      percentage: scores.percentage
    }));

  if (traits.length < 3) return "Profile generation requires more data.";

  if (traits[0].percentage >= 80) {
    return `You show strong ${traits[0].trait} tendencies (${traits[0].percentage}%), indicating a ${traits[0].trait.toLowerCase()}-focused personality with ${traits[1].trait.toLowerCase()} and ${traits[2].trait.toLowerCase()} as supporting traits.`;
  } else if (traits[0].percentage >= 60) {
    return `You demonstrate moderate ${traits[0].trait} characteristics (${traits[0].percentage}%), balanced with ${traits[1].trait.toLowerCase()} and ${traits[2].trait.toLowerCase()} traits.`;
  } else {
    return `You show a balanced personality profile with ${traits[0].trait.toLowerCase()}, ${traits[1].trait.toLowerCase()}, and ${traits[2].trait.toLowerCase()} as your primary characteristics.`;
  }
};

const generateHDSRiskAreas = (hds: Record<string, DimensionScore>): string[] => {
  const riskAreas = Object.entries(hds)
    .filter(([, scores]) => scores.percentage >= 70)
    .map(([trait, scores]) => ({
      trait: trait,
      percentage: scores.percentage
    }))
    .sort((a, b) => b.percentage - a.percentage);

  if (riskAreas.length === 0) {
    return ["No significant risk areas identified"];
  }

  return riskAreas.map(area =>
    `${area.trait} tendencies (${area.percentage}%) - May need attention in high-stress situations`
  );
};

const determineProfileTitle = (hpi: Record<string, DimensionScore>): string => {
  const getScore = (name: string) => hpi[name]?.percentage || 0;

  if (getScore('Ambition') > 75 && getScore('Sociability') > 70) return "The Charismatic Leader";
  if (getScore('Adjustment') > 75 && getScore('Prudence') > 70) return "The Steady Executor";
  if (getScore('Inquisitiveness') > 75 && getScore('Learning Approach') > 70) return "The Visionary Strategist";
  if (getScore('Interpersonal Sensitivity') > 75 && getScore('Sociability') > 70) return "The Diplomatic Connector";
  if (getScore('Ambition') > 80) return "The Driven Achiever";

  return "The Balanced Professional";
};

const calculateLeadershipPotential = (hpi: Record<string, DimensionScore>, hds: Record<string, DimensionScore>): number => {
  const leadershipTraits = ['Ambition', 'Sociability', 'Adjustment', 'Prudence'];
  let lpSum = 0;
  let lpCount = 0;

  leadershipTraits.forEach(trait => {
    if (hpi[trait]) {
      lpSum += hpi[trait].percentage;
      lpCount++;
    }
  });

  const baseLpScore = lpCount > 0 ? lpSum / lpCount : 0;

  let riskPenalty = 0;
  Object.values(hds).forEach(score => {
    if (score.percentage >= 70) {
      riskPenalty += 5;
    }
  });

  return Math.max(0, Math.min(100, Math.round(baseLpScore - riskPenalty)));
};

const generateJobFitRecommendations = (hpi: Record<string, DimensionScore>, mvpi: Record<string, DimensionScore>): string[] => {
  const recommendations: string[] = [];
  const getHpi = (t: string) => hpi[t]?.percentage || 0;
  const getMvpi = (t: string) => mvpi[t]?.percentage || 0;

  if (getHpi('Ambition') >= 70) recommendations.push("Leadership roles", "Management positions", "Entrepreneurship");
  if (getHpi('Sociability') >= 70) recommendations.push("Sales", "Marketing", "Public relations");
  if (getHpi('Inquisitiveness') >= 70) recommendations.push("Research", "Analysis", "Consulting");
  if (getHpi('Prudence') >= 70) recommendations.push("Accounting", "Finance", "Project management");

  if (getMvpi('Aesthetic') >= 70) recommendations.push("Design", "Arts", "Creative industries");
  if (getMvpi('Commercial') >= 70) recommendations.push("Business development", "Investment");
  if (getMvpi('Power') >= 70) recommendations.push("Executive Leadership", "Politics");

  return Array.from(new Set(recommendations)).slice(0, 5);
};

// Mock interpretation generator (simplified for now, can be expanded)
const getInterpretation = (dimension: string, percentage: number): string => {
  if (percentage >= 75) return `High ${dimension}: Likely to demonstrate strong characteristics in this area.`;
  if (percentage >= 40) return `Moderate ${dimension}: Balanced approach. Traits appear depending on the situation.`;
  return `Low ${dimension}: Less likely to exhibit these behaviors.`;
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

    // Max score is number of questions * 5 (since max logical value is 5)
    // Wait, VISUAL_TO_LOGICAL_MAP maps 7 -> 5. So max per question is 5.
    const maxScore = questions.length * 5;
    const percentage = maxScore > 0 ? (rawScore / maxScore) * 100 : 0;
    const finalPercentage = Math.round(percentage);

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

  // Derived Insights
  result.leadershipPotentialScore = calculateLeadershipPotential(result.hpi, result.hds);
  result.jobFit = generateJobFitRecommendations(result.hpi, result.mvpi);
  result.riskAnalysis = generateHDSRiskAreas(result.hds);
  result.profileTitle = determineProfileTitle(result.hpi);

  // Leadership Style Radar (using HPI)
  const getHpi = (t: string) => result.hpi[t]?.percentage || 0;
  result.leadershipStyle = [
    { subject: 'Strategy', A: getHpi('Inquisitiveness'), fullMark: 100 },
    { subject: 'People', A: getHpi('Interpersonal Sensitivity'), fullMark: 100 },
    { subject: 'Execution', A: getHpi('Prudence'), fullMark: 100 },
    { subject: 'Drive', A: getHpi('Ambition'), fullMark: 100 },
    { subject: 'Influence', A: getHpi('Sociability'), fullMark: 100 },
    { subject: 'Resilience', A: getHpi('Adjustment'), fullMark: 100 },
  ];

  // Work Environment Fit
  result.workEnvironment = [
    { label: "Fast-Paced & Competitive", score: (getHpi('Ambition') + getHpi('Adjustment')) / 2 },
    { label: "Structured & Process-Oriented", score: getHpi('Prudence') },
    { label: "Collaborative & Social", score: (getHpi('Sociability') + getHpi('Interpersonal Sensitivity')) / 2 },
    { label: "Creative & Innovative", score: (getHpi('Inquisitiveness') + getHpi('Learning Approach')) / 2 },
  ];

  return result;
};