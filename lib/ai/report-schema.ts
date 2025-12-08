import { z } from "zod";

// Schema for individual trait analysis (HPI)
export const TraitAnalysisSchema = z.object({
    traitName: z.string(),
    score: z.number().nullable(), // Percentage
    interpretation: z.string().describe("1-sentence explanation of the trait in plain English."),
    strengths: z.array(z.string()).describe("List of 2-3 strengths."),
    watchOuts: z.array(z.string()).describe("List of 2-3 watch-outs or risks."),
    microAction: z.string().describe("A small, 1-2 sentence micro-habit.")
});

// Schema for risk factors (HDS)
export const RiskFactorSchema = z.object({
    traitName: z.string(),
    score: z.number().nullable(),
    definition: z.string().describe("One clear sentence describing the risk trait."),
    behaviorInfo: z.string().describe("How this score tends to show up."),
    stressSigns: z.array(z.string()).describe("Early signs you are under stress."),
    recenterStrategies: z.array(z.string()).describe("What helps you recenter."),
    selfManagementTip: z.string().describe("1 sentence behavioural suggestion.")
});

// Schema for values (MVPI)
export const ValueSchema = z.object({
    valueName: z.string(),
    coreMeaning: z.string().describe("1-sentence description of the value."),
    influence: z.string().describe("How this value influences decisions."),
    priorities: z.array(z.string()).describe("What you tend to prioritise."),
    socialRead: z.array(z.string()).describe("How others may experience you."),
    growthSuggestion: z.string().describe("Simple 1-line shift.")
});

// Schema for relationships
export const RelationshipSchema = z.object({
    professional: z.object({
        strengths: z.array(z.string()),
        growthAreas: z.array(z.string())
    }),
    personal: z.object({
        strengths: z.array(z.string()),
        growthAreas: z.array(z.string())
    })
});

// Full Report Content Schema
export const HoganReportContentSchema = z.object({
    // Section 0/Summary
    executiveSummary: z.string().describe("A 3-4 sentence comprehensive summary of the profile."),
    confidenceScoreReason: z.string().describe("Explanation for the confidence score."),

    // Section 1 & 2A (HPI)
    hpiAnalysis: z.array(TraitAnalysisSchema).describe("Analysis for all 7 HPI traits."),

    // Section 2B (HDS)
    hdsAnalysis: z.array(RiskFactorSchema).describe("Analysis for relevant HDS traits (at least top 2-3 risks)."),

    // Section 2C (MVPI)
    mvpiAnalysis: z.array(ValueSchema).describe("Analysis for top 3 MVPI values."),

    // Section 5 (Relationships) - Note: Section 3 & 4 are handled separately or less dynamic
    relationships: RelationshipSchema,

    // Section 7 (Action Plan)
    strategicActions: z.array(z.string()).describe("3 distinct strategic steps."),

    // Section 8 (Takeaways) (IdentitySummary)
    topTakeaways: z.object({
        highestHPI: z.string().describe("Format: 'Trait - Description'"),
        lowestHPI: z.string().describe("Format: 'Trait - Description'"),
        highestRisk: z.string().describe("Format: 'Trait - Description'"),
        highestValue: z.string().describe("Format: 'Trait - Description'"),
        reasoningStyle: z.string().describe("Format: 'Style - Description'")
    }),

    // Section 9 (Identity)
    personalityWords: z.array(z.string()).length(5).describe("5 powerful adjectives describing the user."),

    // Section 10 (Work Style) (WorkStyleAndEnvironment)
    workStyle: z.object({
        rhythm: z.string(),
        team: z.string(),
        manager: z.string(),
        communication: z.string(),
        setup: z.string()
    }),

    // Section 11 (Social Insight) (IdentitySummary - socialExperience)
    socialExperience: z.object({
        atBest: z.array(z.string()).describe("3 bullet points"),
        underPressure: z.array(z.string()).describe("3 bullet points")
    }),

    // Section 12 (Energy) (WorkStyleAndEnvironment)
    energyFlow: z.object({
        energisers: z.array(z.string()).min(2).max(4).describe("2-4 things that energise the user."),
        drainers: z.array(z.string()).min(2).max(4).describe("2-4 things that drain the user.")
    }),

    // Section 13 (Micro Habits) (ReflectionsAndHabits)
    microHabits: z.array(z.string()).min(3).max(5).describe("3-5 specific micro-habits."),

    // Section 14 (Coach Reflections) (ReflectionsAndHabits)
    coachQuestions: z.array(z.string()).length(3).describe("3 deep reflective questions.")
});

export type HoganReportContent = z.infer<typeof HoganReportContentSchema>;
