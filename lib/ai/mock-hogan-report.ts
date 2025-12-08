import { HoganReportContent } from "./report-schema";

export const MOCK_HOGAN_REPORT: HoganReportContent = {
    executiveSummary: "This profile suggests a leader who is ambitious, energetic, and driven by a desire to make a significant impact. You naturally take charge in social settings and are comfortable with visibility. While you are charming and persuasive, you may occasionally struggle with details or become impatient with slower-paced processes. Your leadership style is bold and demonstrative, often inspiring others through confidence and vision.",
    confidenceScoreReason: "The profile shows a high consistency between ambition (HPI) and power motivation (MVPI), suggesting a clear and aligned drive for leadership.",

    hpiAnalysis: [
        {
            traitName: "Ambition",
            score: 85,
            interpretation: "You are driven, competitive, and eager to advance.",
            strengths: ["Takes initiative naturally", "Comfortable with leaderships roles", "Sets high goals"],
            watchOuts: ["May compete with team members", "Could become restless in static roles", "Might overcommit"],
            microAction: "Before volunteering for a new project, check if you have capacity."
        },
        {
            traitName: "Sociability",
            score: 72,
            interpretation: "You are outgoing, approachable, and enjoy social interaction.",
            strengths: ["Builds networks easily", "Energizes the team", "Good at public facing roles"],
            watchOuts: ["Might talk more than listen", "Could be distracted by socializing", "May struggle with solitary work"],
            microAction: "Practice active listening in your next meeting."
        },
        {
            traitName: "Prudence",
            score: 25,
            interpretation: "You are flexible and open to change, but may dislike rules.",
            strengths: ["Adaptable to change", "Quick decision maker", "Not bogged down by bureaucracy"],
            watchOuts: ["May miss important details", "Could be seen as disorganized", "Might act impulsively"],
            microAction: "Double check your work before submitting."
        }
    ],

    hdsAnalysis: [
        {
            traitName: "Bold",
            score: 90,
            definition: "Self-promoting and overly confident behaviors.",
            behaviorInfo: "You might refuse to listen to feedback or blame others for mistakes.",
            stressSigns: ["Interrupting others", "Taking crazy risks", "Ignoring valid criticism"],
            recenterStrategies: ["Seek objective feedback", "Pause before deciding", "Acknowledge others' contributions"],
            selfManagementTip: "Ask 'What am I missing?' before pushing your agenda."
        },
        {
            traitName: "Mischievous",
            score: 75,
            definition: "Impulsive and limit-testing behaviors.",
            behaviorInfo: "You might ignore rules or charm your way out of trouble.",
            stressSigns: ["Ignoring standard procedures", "Making promises you can't keep", "Downplaying serious risks"],
            recenterStrategies: ["Review the consequences", "Consult with a careful colleague", "Stick to the plan"],
            selfManagementTip: "Wait 24 hours before making a major pivot."
        }
    ],

    mvpiAnalysis: [
        {
            valueName: "Power",
            coreMeaning: "You value influence, achievement, and success.",
            influence: "You will seek roles where you can lead and control outcomes.",
            priorities: ["Career advancement", "Beating the competition", "Leading teams"],
            socialRead: ["Others see you as assertive and goal-oriented.", "May be perceived as overly ambitious."],
            growthSuggestion: "Ensure you empower others, not just yourself."
        },
        {
            valueName: "Recognition",
            coreMeaning: "You value public acknowledgement and visibility.",
            influence: "You prefer high-profile projects and public praise.",
            priorities: ["Being noticed", "Public speaking", "Winning awards"],
            socialRead: ["Others see you as seeking the spotlight.", "May appear to crave attention."],
            growthSuggestion: "Remember to share credit with the team."
        }
    ],

    relationships: {
        professional: {
            strengths: ["Inspires confidence in partners", "Good at networking", "Direct communicator"],
            growthAreas: ["May dominate conversations", "Could be seen as too intense", "Might not listen enough"]
        },
        personal: {
            strengths: ["Fun and energetic friend", "Takes charge of plans", "Protective of loved ones"],
            growthAreas: ["Might compete with friends", "Could be impatient with emotions", "May over-schedule"]
        }
    },

    strategicActions: [
        "Delegate detailed planning to high-Prudence team members.",
        "Schedule regular 'listening sessions' where you do not speak first.",
        "Create a checklist for quality control to manage low Prudence."
    ],

    topTakeaways: {
        highestHPI: "Ambition - Driven to lead",
        lowestHPI: "Prudence - Flexible and impulsive",
        highestRisk: "Bold - Over-confidence risk",
        highestValue: "Power - Desire for influence",
        reasoningStyle: "Intuitive - Quick big-picture thinker"
    },

    personalityWords: ["Ambitious", "Charismatic", "Energetic", "Direct", "Flexible"],

    workStyle: {
        rhythm: "Fast-paced and dynamic",
        team: "Collaborative but leader-led",
        manager: "Prefers autonomy and clear goals",
        communication: "Verbal, direct, and persuasive",
        setup: "Open office or active environment"
    },

    socialExperience: {
        atBest: ["Charming", "Entertaining", "Inspirational"],
        underPressure: ["Domineering", "Arrogant", "Impulsive"]
    },

    energyFlow: {
        energisers: ["Public speaking", "Starting new projects", "Competition"],
        drainers: ["Detailed paperwork", "Routine maintenance", "Working alone"]
    },

    microHabits: [
        "Take 5 minutes to plan the day.",
        "Ask one open-ended question in every meeting.",
        "Write down key details immediately."
    ],

    coachQuestions: [
        "When does your confidence cross the line into arrogance?",
        "Who is someone you need to listen to more carefully?",
        "What is one detail you missed recently that caused an issue?"
    ]
};
