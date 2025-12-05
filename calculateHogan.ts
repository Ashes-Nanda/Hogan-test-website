import { HoganAnswers } from "@/schema/hogan";
import { HoganCalculatedResult, HPITraitScores, HDSTraitScores, MVPITraitScores } from "@/types/tests/hogan/test-response/calculatedResponse";
import { TestQuestionsData } from "@/types/tests/testQuestions";

export function calculateHogan(
  answers: HoganAnswers,
  questionsData: TestQuestionsData
): HoganCalculatedResult {
  const questions = questionsData.questions;

  // Initialize HPI scores
  const hpiScores: HPITraitScores = {
    adjustment: { score: 0, total: 0, percentage: 0 },
    ambition: { score: 0, total: 0, percentage: 0 },
    sociability: { score: 0, total: 0, percentage: 0 },
    interpersonal_sensitivity: { score: 0, total: 0, percentage: 0 },
    prudence: { score: 0, total: 0, percentage: 0 },
    inquisitiveness: { score: 0, total: 0, percentage: 0 },
    learning_approach: { score: 0, total: 0, percentage: 0 },
  };

  // Initialize HDS scores
  const hdsScores: HDSTraitScores = {
    excitable: { score: 0, total: 0, percentage: 0 },
    skeptical: { score: 0, total: 0, percentage: 0 },
    cautious: { score: 0, total: 0, percentage: 0 },
    reserved: { score: 0, total: 0, percentage: 0 },
    leisurely: { score: 0, total: 0, percentage: 0 },
    bold: { score: 0, total: 0, percentage: 0 },
    mischievous: { score: 0, total: 0, percentage: 0 },
    colorful: { score: 0, total: 0, percentage: 0 },
    imaginative: { score: 0, total: 0, percentage: 0 },
    diligent: { score: 0, total: 0, percentage: 0 },
    dutiful: { score: 0, total: 0, percentage: 0 },
  };

  // Initialize MVPI scores
  const mvpiScores: MVPITraitScores = {
    aesthetic: { score: 0, total: 0, percentage: 0 },
    affiliation: { score: 0, total: 0, percentage: 0 },
    altruistic: { score: 0, total: 0, percentage: 0 },
    commercial: { score: 0, total: 0, percentage: 0 },
    hedonistic: { score: 0, total: 0, percentage: 0 },
    power: { score: 0, total: 0, percentage: 0 },
    recognition: { score: 0, total: 0, percentage: 0 },
    scientific: { score: 0, total: 0, percentage: 0 },
    security: { score: 0, total: 0, percentage: 0 },
    tradition: { score: 0, total: 0, percentage: 0 },
  };

  // Count questions per dimension
  const dimensionCounts: Record<string, number> = {};
  Object.values(answers).forEach((answer) => {
    dimensionCounts[answer.dimension] = (dimensionCounts[answer.dimension] || 0) + 1;
  });

  // Process answers and calculate scores
  Object.values(answers).forEach((answer) => {
    const dimension = answer.dimension;
    const selectedValue = answer.selectedValue;

    // Convert selectedValue to numeric score (Hogan uses "1", "2", "4", "5")
    let score = 0;
    switch (selectedValue) {
      case "1": // Strongly Disagree
        score = 1;
        break;
      case "2": // Disagree
        score = 2;
        break;
      case "3": // Agree
        score = 4;
        break;
      case "4": // Strongly Agree
        score = 5;
        break;
      default:
        score = 2; // Default to neutral/disagree if invalid value
    }

    // Add to appropriate dimension
    if (dimension in hpiScores) {
      hpiScores[dimension as keyof HPITraitScores].score += score;
    } else if (dimension in hdsScores) {
      hdsScores[dimension as keyof HDSTraitScores].score += score;
    } else if (dimension in mvpiScores) {
      mvpiScores[dimension as keyof MVPITraitScores].score += score;
    }
  });

  // Calculate percentages for all dimensions
  Object.keys(hpiScores).forEach((key) => {
    const dimension = key as keyof HPITraitScores;
    const count = dimensionCounts[dimension] || 0;
    hpiScores[dimension].total = count * 5; // Hogan uses 1-5 scale
    // Prevent division by zero - if no answers, percentage is 0
    hpiScores[dimension].percentage = count > 0
      ? Math.round((hpiScores[dimension].score / hpiScores[dimension].total) * 100)
      : 0;
  });

  Object.keys(hdsScores).forEach((key) => {
    const dimension = key as keyof HDSTraitScores;
    const count = dimensionCounts[dimension] || 0;
    hdsScores[dimension].total = count * 5; // Hogan uses 1-5 scale
    // Prevent division by zero - if no answers, percentage is 0
    hdsScores[dimension].percentage = count > 0
      ? Math.round((hdsScores[dimension].score / hdsScores[dimension].total) * 100)
      : 0;
  });

  Object.keys(mvpiScores).forEach((key) => {
    const dimension = key as keyof MVPITraitScores;
    const count = dimensionCounts[dimension] || 0;
    mvpiScores[dimension].total = count * 5; // Hogan uses 1-5 scale
    // Prevent division by zero - if no answers, percentage is 0
    mvpiScores[dimension].percentage = count > 0
      ? Math.round((mvpiScores[dimension].score / mvpiScores[dimension].total) * 100)
      : 0;
  });

  // Generate HPI Profile
  const hpiProfile = generateHPIProfile(hpiScores);

  // Generate HDS Risk Areas
  const hdsRiskAreas = generateHDSRiskAreas(hdsScores);

  // Generate MVPI Top Values
  const mvpiTopValues = generateMVPITopValues(mvpiScores);

  // Generate Overall Hogan Profile
  const hoganProfile = generateHoganProfile(hpiScores, hdsScores, mvpiScores);

  // Calculate Leadership Potential
  const leadershipPotential = calculateLeadershipPotential(hpiScores, hdsScores);

  // Generate Job Fit Recommendations
  const jobFit = generateJobFitRecommendations(hpiScores, hdsScores, mvpiScores);

  return {
    hpiScores,
    hpiProfile,
    hdsScores,
    hdsRiskAreas,
    mvpiScores,
    mvpiTopValues,
    hoganProfile,
    leadershipPotential,
    jobFit,
  };
}

function generateHPIProfile(hpiScores: HPITraitScores): string {
  const traits = Object.entries(hpiScores)
    .sort(([, a], [, b]) => b.percentage - a.percentage)
    .slice(0, 3)
    .map(([trait, scores]) => ({
      trait: trait.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      percentage: scores.percentage
    }));

  if (traits[0].percentage >= 80) {
    return `You show strong ${traits[0].trait} tendencies (${traits[0].percentage}%), indicating a ${traits[0].trait.toLowerCase()}-focused personality with ${traits[1].trait.toLowerCase()} and ${traits[2].trait.toLowerCase()} as supporting traits.`;
  } else if (traits[0].percentage >= 60) {
    return `You demonstrate moderate ${traits[0].trait} characteristics (${traits[0].percentage}%), balanced with ${traits[1].trait.toLowerCase()} and ${traits[2].trait.toLowerCase()} traits.`;
  } else {
    return `You show a balanced personality profile with ${traits[0].trait.toLowerCase()}, ${traits[1].trait.toLowerCase()}, and ${traits[2].trait.toLowerCase()} as your primary characteristics.`;
  }
}

function generateHDSRiskAreas(hdsScores: HDSTraitScores): string[] {
  const riskAreas = Object.entries(hdsScores)
    .filter(([, scores]) => scores.percentage >= 70)
    .map(([trait, scores]) => ({
      trait: trait.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      percentage: scores.percentage
    }))
    .sort((a, b) => b.percentage - a.percentage);

  if (riskAreas.length === 0) {
    return ["No significant risk areas identified"];
  }

  return riskAreas.map(area =>
    `${area.trait} tendencies (${area.percentage}%) - May need attention in high-stress situations`
  );
}

function generateMVPITopValues(mvpiScores: MVPITraitScores): string[] {
  return Object.entries(mvpiScores)
    .sort(([, a], [, b]) => b.percentage - a.percentage)
    .slice(0, 3)
    .map(([value, scores]) =>
      `${value.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} (${scores.percentage}%)`
    );
}

function generateHoganProfile(hpiScores: HPITraitScores, hdsScores: HDSTraitScores, mvpiScores: MVPITraitScores): string {
  const topHPI = Object.entries(hpiScores)
    .sort(([, a], [, b]) => b.percentage - a.percentage)[0];

  const topMVPI = Object.entries(mvpiScores)
    .sort(([, a], [, b]) => b.percentage - a.percentage)[0];

  const riskCount = Object.values(hdsScores).filter(scores => scores.percentage >= 70).length;

  let profile = `Your Hogan profile shows strong ${topHPI[0].replace(/_/g, ' ')} tendencies with ${topMVPI[0].replace(/_/g, ' ')} as your primary motivator.`;

  if (riskCount === 0) {
    profile += " You demonstrate excellent emotional stability with no significant risk areas.";
  } else if (riskCount <= 2) {
    profile += " You show good emotional stability with minimal risk areas to monitor.";
  } else {
    profile += " You may benefit from developing strategies to manage stress and emotional responses.";
  }

  return profile;
}

function calculateLeadershipPotential(hpiScores: HPITraitScores, hdsScores: HDSTraitScores): number {
  // Leadership potential based on HPI traits
  const leadershipTraits = [
    hpiScores.ambition.percentage,
    hpiScores.sociability.percentage,
    hpiScores.adjustment.percentage,
    hpiScores.prudence.percentage
  ];

  const avgLeadership = leadershipTraits.reduce((sum, score) => sum + score, 0) / leadershipTraits.length;

  // Reduce for high HDS risk scores
  const riskPenalty = Object.values(hdsScores)
    .filter(scores => scores.percentage >= 70)
    .length * 5;

  return Math.max(0, Math.min(100, Math.round(avgLeadership - riskPenalty)));
}

function generateJobFitRecommendations(hpiScores: HPITraitScores, hdsScores: HDSTraitScores, mvpiScores: MVPITraitScores): string[] {
  const recommendations: string[] = [];

  // Based on HPI scores
  if (hpiScores.ambition.percentage >= 70) {
    recommendations.push("Leadership roles", "Management positions", "Entrepreneurship");
  }

  if (hpiScores.sociability.percentage >= 70) {
    recommendations.push("Sales", "Marketing", "Public relations", "Customer service");
  }

  if (hpiScores.inquisitiveness.percentage >= 70) {
    recommendations.push("Research", "Analysis", "Consulting", "Education");
  }

  if (hpiScores.prudence.percentage >= 70) {
    recommendations.push("Accounting", "Finance", "Quality assurance", "Project management");
  }

  // Based on MVPI scores
  if (mvpiScores.aesthetic.percentage >= 70) {
    recommendations.push("Design", "Arts", "Creative industries");
  }

  if (mvpiScores.commercial.percentage >= 70) {
    recommendations.push("Business development", "Investment", "Trading");
  }

  if (mvpiScores.scientific.percentage >= 70) {
    recommendations.push("Science", "Technology", "Engineering", "Medicine");
  }

  // Remove duplicates and return top 5
  return Array.from(new Set(recommendations)).slice(0, 5);
}
