import { z } from "zod";

// 1. HEADER / HERO
export const HeroSectionSchema = z.object({
    identityTitle: z.string().describe("2-3 word personality title (e.g. 'The Balanced Professional')."),
    heroNarrative: z.string().describe("5-component narrative paragraph describing core disposition, work style, thinking, drivers, and pattern."),
    subTitle: z.string().describe("e.g. 'Prepared exclusively for [Name]'")
});

// 2. TRAIT SUMMARY
export const TraitSummarySchema = z.object({
    snapshotParagraph: z.string().describe("4-component narrative overview (disposition, work style, thinking, values)."),
    headlineInsights: z.array(z.string()).describe("3-4 short summary chips (e.g. 'Driven and goal-oriented')."),
    standOutCard: z.string().nullable().describe("Optional 1-2 line insight about the most extreme score.")
});

// 3A. DETAILED TRAIT ANALYSIS - HPI
export const TraitAnalysisSchema = z.object({
    traitName: z.string(),
    score: z.number().nullable(),
    traitLabel: z.string().describe("1-2 word personal descriptor."),
    interpretation: z.string().describe("1 sentence explanation based on score band."),
    innerExperience: z.string().describe("1-2 sentences describing internal state."),
    atWork: z.string().describe("2 sentences describing observable behaviour."),
    underPressure: z.string().describe("1 sentence modified by HDS traits."),
    socialImpact: z.string().describe("1-2 sentences on how others interpret this."),
    strengths: z.array(z.string()).describe("3 bullet points."),
    watchOuts: z.array(z.string()).describe("3 bullet points relative to frictions/blind spots."),
    traitInteractionInsight: z.string().describe("1-2 sentences connecting to another trait."),
    microAction: z.string().describe("One actionable behaviour.")
});

// 3B. RISKS - HDS
export const RiskFactorSchema = z.object({
    traitName: z.string(),
    score: z.number().nullable(),
    interpretation: z.string().describe("Interpretation based on score band."),
    triggerConditions: z.string().describe("2 triggers (e.g. 'sudden change or unmet expectations')."),
    behaviourUnderStress: z.string().describe("How this looks under stress."),
    socialImpact: z.string().describe("How others might read this behavior."),
    strengthExpressions: z.array(z.string()).describe("2 positive expressions of this trait."),
    frictionPatterns: z.array(z.string()).describe("2 friction points."),
    regulationStrategies: z.string().describe("1-2 line strategy to manage this."),
    traitInteractionInsight: z.string().describe("Insight connecting this risk to HPI traits."),
    microAction: z.string().describe("Single-line behaviour.")
});

// 3C. VALUES - MVPI
export const ValueSchema = z.object({
    valueName: z.string(),
    score: z.number().nullable(),
    interpretation: z.string().describe("Influence level based on score."),
    drivers: z.string().describe("What drives you (e.g. 'desire to influence')."),
    workBehaviour: z.string().describe("How this shows up at work."),
    strengthSituations: z.array(z.string()).describe("2 situations where this helps."),
    tensionSituations: z.array(z.string()).describe("2 situations creating tension."),
    socialImpact: z.string().describe("How others experience this value."),
    interactionInsight: z.string().describe("Connection to HPI traits."),
    microAction: z.string().describe("Single specific action.")
});

// 3D. REASONING - HBRI
export const ReasoningSchema = z.object({
    styleName: z.string().describe("'Tactical' or 'Strategic'"),
    score: z.number().nullable(),
    interpretation: z.string(),
    coreThinkingStyle: z.string().describe("Descriptors of thinking style."),
    problemSolving: z.string().describe("How you solve problems."),
    strengthSituations: z.array(z.string()).describe("2 situations where this helps."),
    blindSpots: z.array(z.string()).describe("2 potential blind spots."),
    collaborationImpact: z.string().describe("How colleagues experience this reasoning."),
    interactionInsight: z.string().describe("Connection to HPI traits."),
    microAction: z.string()
});

// 4. PERSONAL EXAMPLES
export const PersonalExamplesSchema = z.object({
    superpowers: z.array(z.object({
        title: z.string(),
        tag: z.string().describe("'Strength'"),
        body: z.string().describe("2-3 sentences rooted in trait behaviour.")
    })).describe("2-3 superpower cards."),
    blindSpots: z.array(z.object({
        title: z.string(),
        tag: z.string().describe("'Risk Area'"),
        body: z.string().describe("2-3 sentences on trigger and regulation.")
    })).describe("2-3 blind spot cards.")
});

// 5. CORE VALUES SUMMARY
export const ValuesSummarySchema = z.object({
    summaryParagraph: z.string().describe("1-2 sentences summarizing top values."),
    motivatorTags: z.array(z.string()).describe("2-3 chips (e.g. 'Driven by Results').")
});

// 6. CAREER
export const CareerSchema = z.object({
    workEnvironmentFit: z.string().describe("Narrative paragraph on fit."),
    leadershipStyle: z.array(z.object({
        dimension: z.string().describe("e.g. 'Strategy', 'People'"),
        description: z.string().describe("1-2 sentences.")
    })).describe("5 dimensions of leadership style."),
    recommendedRoles: z.array(z.object({
        role: z.string(),
        matchPercentage: z.number(),
        explanation: z.string()
    }))
});

// 7. RELATIONSHIPS
export const RelationshipsSchema = z.object({
    professional: z.object({
        strengths: z.array(z.object({ title: z.string(), body: z.string() })),
        growthAreas: z.array(z.object({ title: z.string(), body: z.string() }))
    }),
    personal: z.object({
        strengths: z.array(z.object({ title: z.string(), body: z.string() })),
        growthAreas: z.array(z.object({ title: z.string(), body: z.string() }))
    })
});

// 8. GROWTH JOURNEY
export const GrowthJourneySchema = z.object({
    phases: z.array(z.object({
        phaseTitle: z.string(),
        themeLine: z.string(),
        insights: z.array(z.object({
            body: z.string().describe("Insight sentence.")
        })),
        practice: z.object({
            text: z.string().describe("Actionable practice.")
        })
    })).length(3).describe("Immediate, Short-term, Long-term phases.")
});

// 9. ACTION PLAN
export const ActionPlanSchema = z.object({
    actionItems: z.array(z.object({
        title: z.string(),
        body: z.string().describe("2 sentences: Focus on X... This works because..."),
        type: z.string().describe("Self-Regulation, Execution, etc.")
    })).min(3).max(5)
});

// 10. HOW OTHERS EXPERIENCE YOU
export const SocialExperienceSchema = z.object({
    atBest: z.string().describe("1 paragraph, 3 sentences (Social presence, Contribution, Impact)."),
    underPressure: z.string().describe("1 paragraph, 3 sentences (Stress expression, Behaviour, Interpretation).")
});

// 11. HOW YOU WORK BEST
export const WorkStyleSchema = z.object({
    rhythm: z.object({ title: z.string(), body: z.string() }),
    team: z.object({ title: z.string(), body: z.string() }),
    manager: z.object({ title: z.string(), body: z.string() }),
    communication: z.object({ title: z.string(), body: z.string() }),
    setup: z.object({ title: z.string(), body: z.string() })
});

// 12. ENERGY
export const EnergySchema = z.object({
    energisers: z.array(z.string()).length(4),
    drainers: z.array(z.string()).length(4)
});


// === FULL REPORT SCHEMA ===
export const HoganReportContentSchema = z.object({
    hero: HeroSectionSchema,
    traitSummary: TraitSummarySchema,

    hpiAnalysis: z.array(TraitAnalysisSchema),
    hdsAnalysis: z.array(RiskFactorSchema),
    mvpiAnalysis: z.array(ValueSchema),
    hbriAnalysis: z.array(ReasoningSchema),

    personalExamples: PersonalExamplesSchema,
    valuesSummary: ValuesSummarySchema,

    career: CareerSchema,
    relationships: RelationshipsSchema,
    growthJourney: GrowthJourneySchema,
    actionPlan: ActionPlanSchema,

    socialExperience: SocialExperienceSchema,
    workStyle: WorkStyleSchema,
    energy: EnergySchema,

    // Legacy / Other
    confidenceScoreReason: z.string().nullable(),
    personalityWords: z.array(z.string()).nullable(),
    coachQuestions: z.array(z.string()).nullable()
});

// === PARTIAL SCHEMAS FOR PARALLEL GENERATION ===

export const Part1_CoreSchema = z.object({
    hero: HeroSectionSchema,
    traitSummary: TraitSummarySchema,
});

export const Part2_AnalysisSchema = z.object({
    hpiAnalysis: z.array(TraitAnalysisSchema),
    hdsAnalysis: z.array(RiskFactorSchema),
    mvpiAnalysis: z.array(ValueSchema),
    hbriAnalysis: z.array(ReasoningSchema),
});

export const Part3_ApplicationSchema = z.object({
    personalExamples: PersonalExamplesSchema,
    valuesSummary: ValuesSummarySchema,
    career: CareerSchema,
    relationships: RelationshipsSchema,
    growthJourney: GrowthJourneySchema,
    actionPlan: ActionPlanSchema,
    socialExperience: SocialExperienceSchema,
    workStyle: WorkStyleSchema,
    energy: EnergySchema,
    // Include legacy fields here as they fit "application/summary"
    confidenceScoreReason: z.string().nullable(),
    personalityWords: z.array(z.string()).nullable(),
    coachQuestions: z.array(z.string()).nullable()
});

export type HoganReportContent = z.infer<typeof HoganReportContentSchema>;
