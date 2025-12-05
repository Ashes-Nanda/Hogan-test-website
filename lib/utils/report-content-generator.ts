import { HoganResultData } from "@/types/tests/hogan/results";

export const generateRelationshipInsights = (resultData: HoganResultData) => {
    const profile = resultData.hoganProfile || "General";

    // Simple mapping based on profile keywords or scores
    // In a real app, this would be more complex

    const insights = {
        title: "Relationship Dynamics",
        subtitle: `How you interact as a ${profile}`,
        description: `Your ${profile} profile shapes how you build trust, handle conflict, and collaborate with others.`,
        compatibleTypes: [
            "Colleagues who value direct communication",
            "Partners who appreciate strategic thinking",
            "Teams that need structured guidance"
        ],
        superpowers: [
            { title: "Communication", description: "You likely communicate with clarity and purpose." },
            { title: "Empathy", description: "You strive to understand others' perspectives." }
        ],
        growthAreas: [
            { title: "Patience", description: "You may need to practice patience with less structured working styles." }
        ],
        actionSteps: [
            { number: 1, description: "Practice active listening in team meetings." },
            { number: 2, description: "Ask for feedback on your communication style." }
        ]
    };

    // Customize based on high scores if available
    if (resultData.hpiScores) {
        const sociability = resultData.hpiScores['Sociability']?.percentage || 50;
        const sensitivity = resultData.hpiScores['Interpersonal Sensitivity']?.percentage || 50;

        if (sociability > 70) {
            insights.superpowers.push({ title: "Networking", description: "You naturally build broad networks." });
            insights.compatibleTypes.push("Social and energetic environments");
        } else if (sociability < 30) {
            insights.superpowers.push({ title: "Deep Connections", description: "You prefer few but deep professional relationships." });
            insights.growthAreas.push({ title: "Visibility", description: "Work on being more visible in large groups." });
        }

        if (sensitivity > 70) {
            insights.superpowers.push({ title: "Diplomacy", description: "You are tactful and considerate of others' feelings." });
        } else if (sensitivity < 30) {
            insights.growthAreas.push({ title: "Tact", description: "Be mindful of being too blunt or direct." });
        }
    }

    // HBRI Insights
    if (resultData.hbriScores) {
        const tactical = resultData.hbriScores['Tactical']?.percentage || 0;
        const strategic = resultData.hbriScores['Strategic']?.percentage || 0;

        if (strategic > 70) {
            insights.compatibleTypes.push("Partners who appreciate big-picture thinking");
            insights.superpowers.push({ title: "Strategic Vision", description: "You can anticipate future trends and align teams." });
        }
        if (tactical > 70) {
            insights.compatibleTypes.push("Colleagues who value practical solutions");
            insights.superpowers.push({ title: "Problem Solving", description: "You quickly identify and fix operational issues." });
        }
    }

    return [insights];
};

export const generateGrowthJourney = (resultData: HoganResultData) => {
    const growth = {
        summary: "Your path to professional excellence involves leveraging your strengths and managing your risks.",
        superpowers: [] as any[],
        growthAreas: [] as any[],
        actionSteps: [] as any[]
    };

    if (resultData.hpiScores) {
        // Add strengths (High scores)
        Object.entries(resultData.hpiScores)
            .filter(([_, score]: [string, any]) => score.percentage > 70)
            .slice(0, 3)
            .forEach(([trait, _]) => {
                growth.superpowers.push({
                    title: trait,
                    description: `Leverage your high ${trait} to drive results.`
                });
            });

        // Add growth areas (Low scores or Risks)
        if (resultData.hdsScores) {
            Object.entries(resultData.hdsScores)
                .filter(([_, score]: [string, any]) => score.percentage > 70)
                .slice(0, 2)
                .forEach(([trait, _]) => {
                    growth.growthAreas.push({
                        title: `Manage ${trait}`,
                        description: `Watch out for ${trait.toLowerCase()} tendencies under stress.`
                    });
                });
        }
    }

    // HBRI Growth
    if (resultData.hbriScores) {
        const tactical = resultData.hbriScores['Tactical']?.percentage || 0;
        const strategic = resultData.hbriScores['Strategic']?.percentage || 0;

        if (strategic > 75) {
            growth.superpowers.push({ title: "Strategic Thinking", description: "You excel at long-term planning." });
        } else if (strategic < 35) {
            growth.growthAreas.push({ title: "Big Picture", description: "Practice stepping back to see the broader context." });
        }

        if (tactical > 75) {
            growth.superpowers.push({ title: "Tactical Execution", description: "You are excellent at solving immediate problems." });
        } else if (tactical < 35) {
            growth.growthAreas.push({ title: "Operational Detail", description: "Ensure you don't overlook practical implementation details." });
        }
    }

    // Default action steps
    growth.actionSteps = [
        { number: 1, description: "Select one strength to over-use this month." },
        { number: 2, description: "Identify a stress trigger that activates your risk factors." },
        { number: 3, description: "Seek a mentor who complements your profile." }
    ];

    return growth;
};

export const getPersonalExample = (trait: string, isHigh: boolean) => {
    const examples: Record<string, { high: string, low: string }> = {
        'Extraversion': {
            high: "In meetings, you're likely the first to speak up and energize the room.",
            low: "You prefer to process information internally before sharing your well-thought-out views."
        },
        'Intuition': {
            high: "You enjoy brainstorming big-picture ideas and future possibilities.",
            low: "You are the one who grounds the team with practical facts and implementation details."
        },
        'Feeling': {
            high: "You naturally consider the human impact of business decisions.",
            low: "You excel at making objective decisions based on logic and data."
        },
        'Judging': {
            high: "You keep projects on track with clear timelines and organized plans.",
            low: "You adapt quickly to changing circumstances and keep options open."
        }
    };

    return isHigh ? examples[trait]?.high : examples[trait]?.low;
};

export const generateValuesActionItems = (topValues: string[]) => {
    const items = [
        { number: 1, description: "Align your role with your core drivers." }
    ];

    if (topValues && topValues.length > 0) {
        const top = topValues[0].split(' (')[0];
        items[0].description = `Seek roles that satisfy your need for ${top}.`;

        if (topValues.length > 1) {
            const second = topValues[1].split(' (')[0];
            items.push({ number: 2, description: `Ensure your work environment supports ${second}.` });
        }
    } else {
        items.push({ number: 2, description: "Develop strategies to manage any identified risk areas." });
    }

    return items;
};

export const generateCareerActionSteps = (jobFit: string[], hbriScores?: Record<string, any>) => {
    const steps = [
        { number: 1, description: "Review your Hogan profile insights regularly." }
    ];

    if (jobFit && jobFit.length > 0) {
        steps.push({ number: 2, description: `Explore opportunities in ${jobFit[0]} to leverage your natural fit.` });
    } else {
        steps.push({ number: 2, description: "Seek roles that align with your identified strengths." });
    }

    if (hbriScores) {
        const strategic = hbriScores['Strategic']?.percentage || 0;
        if (strategic > 70) {
            steps.push({ number: 3, description: "Look for roles that involve long-term strategy and forecasting." });
        } else {
            steps.push({ number: 3, description: "Create a development plan addressing your specific risk factors." });
        }
    } else {
        steps.push({ number: 3, description: "Create a development plan addressing your specific risk factors." });
    }

    return steps;
};
