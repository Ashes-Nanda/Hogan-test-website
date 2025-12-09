import { HoganReportContent } from './report-schema';

export const MOCK_HOGAN_REPORT: HoganReportContent = {
    hero: {
        identityTitle: "The Driven Leader",
        subTitle: "Prepared exclusively for Alex Mercer",
        heroNarrative: "You bring a steady, grounded presence to your work and connect with others in thoughtful, meaningful ways. You take initiative when it matters, but you don’t push for attention — you prefer goals that feel purposeful. You learn quickly, enjoy exploring new ideas, and think more strategically than tactically. You’re motivated by influence and the chance to shape how things unfold. Overall, your profile reflects a confident, growth-oriented approach to leadership."
    },
    traitSummary: {
        snapshotParagraph: "Your traits show a balance of social confidence and emotional stability. In your work, you tend to push for results while maintaining a structured approach. You think conceptually, connecting dots between disparate ideas, and you're motivated by having a tangible impact. Together, these patterns highlight a leader who builds through influence and foresight.",
        headlineInsights: ["Calm & steady under pressure", "Driven and goal-oriented", "Strategic thinker"],
        standOutCard: "Your highest trait is Ambition, showing a strong desire to lead, effect change, and leave a legacy."
    },
    hpiAnalysis: [
        {
            traitName: "Adjustment",
            score: 75,
            traitLabel: "Steady & Resilient",
            interpretation: "You consistently show calm and resilient tendencies.",
            innerExperience: "You often feel composed and unshaken, even when demands pile up.",
            atWork: "Colleagues often notice that you stay calm during uncertainty.",
            underPressure: "Your behaviour remains relatively stable even in high-pressure situations.",
            socialImpact: "Others see you as a steady hand, which helps you build trust quickly.",
            strengths: ["stays calm", "recovers quickly", "objective under pressure"],
            watchOuts: ["may seem unbothered", "could underestimate urgency", "might not show empathy visibly"],
            traitInteractionInsight: "Your high Adjustment acts as an anchor for your Ambition.",
            microAction: "Share your internal thought process during crises so others know you care."
        },
        {
            traitName: "Ambition",
            score: 88,
            traitLabel: "Driven & Impactful",
            interpretation: "You consistently show a strong desire to lead and achieve.",
            innerExperience: "You often feel a restless drive to do more and achieve higher goals.",
            atWork: "Colleagues see you as a natural leader who takes charge.",
            underPressure: "You may become impatient if results are slow.",
            socialImpact: "Others view you as competitive and results-oriented.",
            strengths: ["takes initiative", "sets high standards", "drives performance"],
            watchOuts: ["may compete unnecessarily", "could overwhelm quieter types", "risk of burnout"],
            traitInteractionInsight: "Combined with high Adjustment, your drive is sustained and resilient.",
            microAction: "Delegate one major task this week to empower others."
        },
        {
            traitName: "Sociability",
            score: 65,
            traitLabel: "Socially Engaging",
            interpretation: "You enjoy social interaction but value substance over surface.",
            innerExperience: "You feel energized by connecting with people on relevant topics.",
            atWork: "You network effectively and are often the spokesperson.",
            underPressure: "You might over-talk to fill silence.",
            socialImpact: "People find you approachable and energetic.",
            strengths: ["builds networks", "communicates well", "energizes teams"],
            watchOuts: ["may distract others", "could monopolize airtime", "might avoid solitude"],
            traitInteractionInsight: "Your Sociability helps sell the vision derived from your Ambition.",
            microAction: "Practice active listening by waiting 3 seconds before responding."
        },
        {
            traitName: "Interpersonal Sensitivity",
            score: 60,
            traitLabel: "Perceptive & Diplomatic",
            interpretation: "You are attuned to others' feelings but maintain professional boundaries.",
            innerExperience: "You notice subtle shifts in team mood.",
            atWork: "You handle conflicts with tact and diplomacy.",
            underPressure: "You might avoid delivering tough feedback.",
            socialImpact: "Others see you as agreeable and easy to work with.",
            strengths: ["builds trust", "resolves conflict", "inclusive"],
            watchOuts: ["may avoid confrontation", "could be too soft", "hard to fire people"],
            traitInteractionInsight: "Balances your high Ambition, softening your drive.",
            microAction: "Deliver one piece of constructive feedback directly this week."
        },
        {
            traitName: "Prudence",
            score: 70,
            traitLabel: "Organized & Reliable",
            interpretation: "You value order, rules, and conscientious execution.",
            innerExperience: "You feel responsible for details and outcomes.",
            atWork: "You are the one ensuring plans are feasible.",
            underPressure: "You may become rigid about rules.",
            socialImpact: "Others trust you to follow through.",
            strengths: ["reliable", "detail-oriented", "disciplined"],
            watchOuts: ["inflexible", "risk-averse", "micromanaging"],
            traitInteractionInsight: "Provides the structure for your Ambitious goals.",
            microAction: "Allow for one deviation from the plan this week."
        },
        {
            traitName: "Inquisitive",
            score: 80,
            traitLabel: "Curious & Strategic",
            interpretation: "You have a strong appetite for new ideas and big-picture thinking.",
            innerExperience: "You often get bored with routine and crave novelty.",
            atWork: "You are the visionary or strategist.",
            underPressure: "You may struggle with mundane implementation.",
            socialImpact: "Others see you as creative but perhaps impractical.",
            strengths: ["visionary", "innovative", "strategic"],
            watchOuts: ["impractical", "quickly bored", "lacks follow-through"],
            traitInteractionInsight: "Fuels your Ambition with creative strategies.",
            microAction: "Spend 20% of your time on current execution, not just future ideas."
        },
        {
            traitName: "Learning Approach",
            score: 60,
            traitLabel: "Current & Capable",
            interpretation: "You value learning that is practical and applicable.",
            innerExperience: "You want to know 'how' something works, not just theory.",
            atWork: "You stay up to date with necessary skills.",
            underPressure: "You may dismiss purely academic ideas.",
            socialImpact: "Others see you as knowledgeable but focused.",
            strengths: ["quick study", "informed", "teachable"],
            watchOuts: ["may dismiss theory", "could ignore history", "preference for known methods"],
            traitInteractionInsight: "Supports your Inquisitive nature with facts.",
            microAction: "Read one article outside your immediate field this week."
        }
    ],
    hdsAnalysis: [
        {
            traitName: "Excitable",
            score: 85,
            interpretation: "You're highly sensitive to shifts in expectations.",
            triggerConditions: "Sudden change or unmet personal expectations.",
            behaviourUnderStress: "You may react quickly with frustration.",
            socialImpact: "Others may see your reactions as sudden.",
            strengthExpressions: ["Deeply invested", "Passionate"],
            frictionPatterns: ["Intensity escalates", "May give up"],
            regulationStrategies: "Pause for 10 seconds before responding.",
            traitInteractionInsight: "Tends to emerge when Ambition is blocked.",
            microAction: "Pause before hitting send on emotional emails."
        },
        {
            traitName: "Skeptical",
            score: 40,
            interpretation: "You are generally trusting.",
            triggerConditions: "Betrayal of trust.",
            behaviourUnderStress: "You might become guarded.",
            socialImpact: "Others usually find you transparent.",
            strengthExpressions: ["Alert", "Perceptive"],
            frictionPatterns: ["Cynical", "Suspicious"],
            regulationStrategies: "Verify before accusing.",
            traitInteractionInsight: "Balanced by high Adjustment.",
            microAction: "Assume positive intent first."
        },
        {
            traitName: "Cautious",
            score: 30,
            interpretation: "You are willing to take risks.",
            triggerConditions: "Failure.",
            behaviourUnderStress: "You might hesitate.",
            socialImpact: "Others see you as bold.",
            strengthExpressions: ["Careful", "Risk-aware"],
            frictionPatterns: ["Fearful", "Indecisive"],
            regulationStrategies: "Focus on best-case scenarios.",
            traitInteractionInsight: "Low Cautious reinforces high Ambition.",
            microAction: "Check for one risk you might have missed."
        },
        {
            traitName: "Reserved",
            score: 20,
            interpretation: "You remain accessible under stress.",
            triggerConditions: "Overstimulation.",
            behaviourUnderStress: "You might withdraw.",
            socialImpact: "Others find you engaging.",
            strengthExpressions: ["Tough", "Independent"],
            frictionPatterns: ["Aloof", "Uncommunicative"],
            regulationStrategies: "Force a check-in.",
            traitInteractionInsight: "Doesn't block your Sociability.",
            microAction: "Schedule distinct quiet time."
        },
        {
            traitName: "Leisurely",
            score: 30,
            interpretation: "You are generally direct.",
            triggerConditions: "Demands on time.",
            behaviourUnderStress: "Passive resistance.",
            socialImpact: "Others know where they stand.",
            strengthExpressions: ["Cooperative", "Polite"],
            frictionPatterns: ["Stubborn", "Procrastinating"],
            regulationStrategies: "Be explicitly direct.",
            traitInteractionInsight: "Supports efficient communication.",
            microAction: "Say no clearly instead of maybe."
        },
        {
            traitName: "Bold",
            score: 70,

            interpretation: "You have a high degree of confidence.",
            triggerConditions: "Challenge to authority.",
            behaviourUnderStress: "You may become arrogant.",
            socialImpact: "Others see you as leader-like but perhaps overbearing.",
            strengthExpressions: ["Confident", "Inspiring"],
            frictionPatterns: ["Self-promoting", "Over-confident"],
            regulationStrategies: "Ask for feedback often.",
            traitInteractionInsight: "Amplifies Ambition.",
            microAction: "Credit someone else for a win this week."
        },
        {
            traitName: "Mischievous",
            score: 60,

            interpretation: "You enjoy testing boundaries.",
            triggerConditions: "Boredom.",
            behaviourUnderStress: "You make impulsive decisions.",
            socialImpact: "Others find you exciting but unpredictable.",
            strengthExpressions: ["Charming", "Daring"],
            frictionPatterns: ["Impulsive", "Manipulative"],
            regulationStrategies: "Stick to the plan.",
            traitInteractionInsight: "Feeds Inquisitive creativity.",
            microAction: "Consult the rulebook before breaking it."
        },
        {
            traitName: "Colorful",
            score: 65,

            interpretation: "You enjoy being noticed.",
            triggerConditions: "Being ignored.",
            behaviourUnderStress: "You become dramatic.",
            socialImpact: "Others find you entertaining.",
            strengthExpressions: ["Entertaining", "Visible"],
            frictionPatterns: ["Distracting", "Attention-seeking"],
            regulationStrategies: "Listen more than talk.",
            traitInteractionInsight: "Boosts Sociability.",
            microAction: "Let others shine in the meeting."
        },
        {
            traitName: "Imaginative",
            score: 75,

            interpretation: "You think differently.",
            triggerConditions: "Status quo.",
            behaviourUnderStress: "You propose odd ideas.",
            socialImpact: "Others see you as visionary.",
            strengthExpressions: ["Creative", "Innovative"],
            frictionPatterns: ["Eccentric", "Unfocused"],
            regulationStrategies: "Connect ideas to reality.",
            traitInteractionInsight: "Pairs with Inquisitive.",
            microAction: "Explain the 'how' behind your 'what'."
        },
        {
            traitName: "Diligent",
            score: 50,
            interpretation: "You balance standards with flexibility.",
            triggerConditions: "Disorder.",
            behaviourUnderStress: "Micromanagement.",
            socialImpact: "Others see you as thorough.",
            strengthExpressions: ["Hardworking", "High standards"],
            frictionPatterns: ["Perfectionist", "Controlling"],
            regulationStrategies: "Delegate perfection.",
            traitInteractionInsight: "Supports Prudence.",
            microAction: "Accept 80% good enough."
        },
        {
            traitName: "Dutiful",
            score: 40,
            interpretation: "You are independent minded.",
            triggerConditions: "Authority pressure.",
            behaviourUnderStress: "Compliance.",
            socialImpact: "Others see you as loyal.",
            strengthExpressions: ["Loyal", "Supportive"],
            frictionPatterns: ["Dependent", "Ingratiating"],
            regulationStrategies: "Voice your dissent.",
            traitInteractionInsight: "Allows for independent Ambition.",
            microAction: "Respectfully challenge a decision."
        }
    ],
    mvpiAnalysis: [
        {
            valueName: "Power",
            score: 90,
            interpretation: "This value strongly guides your choices.",
            drivers: "Desire to influence.",
            workBehaviour: "Seeking leadership roles.",
            strengthSituations: ["Leading teams", "Deciding"],
            tensionSituations: ["No influence", "Subordination"],
            socialImpact: "Drive to lead.",
            interactionInsight: "Amplifies Ambition.",
            microAction: "Take responsibility."
        },
        {
            valueName: "Hedonism",
            score: 50,
            interpretation: "You balance work and play.",
            drivers: "Good environment.",
            workBehaviour: "Fun workplace.",
            strengthSituations: ["Socializing", "Celebrating"],
            tensionSituations: ["Drudgery", "Boring tasks"],
            socialImpact: "Fun to work with.",
            interactionInsight: "Balances Diligence.",
            microAction: "Plan a team lunch."
        },
        {
            valueName: "Altruistic",
            score: 40,
            interpretation: "You value self-reliance.",
            drivers: "Helping others.",
            workBehaviour: "Service roles.",
            strengthSituations: ["Mentoring", "Customer service"],
            tensionSituations: ["Ruthless profit", "Firing"],
            socialImpact: "Helpful.",
            interactionInsight: "Softens Ambition.",
            microAction: "Volunteer."
        },
        {
            valueName: "Affiliation",
            score: 60,
            interpretation: "You value networking.",
            drivers: "Social contact.",
            workBehaviour: "Teamwork.",
            strengthSituations: ["Networking", "Conferences"],
            tensionSituations: ["Isolation", "Solo work"],
            socialImpact: "Connector.",
            interactionInsight: "Pairs with Sociability.",
            microAction: "Introduce two people."
        },
        {
            valueName: "Tradition",
            score: 30,
            interpretation: "You value innovation.",
            drivers: "History.",
            workBehaviour: "Conservative.",
            strengthSituations: ["Rituals", "Stability"],
            tensionSituations: ["Disruption", "Change"],
            socialImpact: "Grounding.",
            interactionInsight: "Checks Inquisitive.",
            microAction: "Respect the legacy."
        },
        {
            valueName: "Security",
            score: 30,
            interpretation: "You value risk.",
            drivers: "Certainty.",
            workBehaviour: "Planning.",
            strengthSituations: ["Order", "Safety"],
            tensionSituations: ["Ambiguity", "Chaos"],
            socialImpact: "Cautious.",
            interactionInsight: "Reinforces Prudence.",
            microAction: "Double check."
        },
        {
            valueName: "Commerce",
            score: 85,
            interpretation: "You value financial success.",
            drivers: "Profit.",
            workBehaviour: "Financial analysis.",
            strengthSituations: ["Budgeting", "Investing"],
            tensionSituations: ["Waste", "Unprofitability"],
            socialImpact: "Bottom-line focused.",
            interactionInsight: "Fuels Ambition.",
            microAction: "Review the P&L."
        },
        {
            valueName: "Aesthetics",
            score: 50,
            interpretation: "You value quality.",
            drivers: "Beauty.",
            workBehaviour: "Design.",
            strengthSituations: ["Branding", "Creative"],
            tensionSituations: ["Ugliness", "Functionalism"],
            socialImpact: "Tasteful.",
            interactionInsight: "Pairs with Imaginative.",
            microAction: "Improve a slide deck."
        },
        {
            valueName: "Science",
            score: 70,
            interpretation: "You value data.",
            drivers: "Truth.",
            workBehaviour: "Analysis.",
            strengthSituations: ["Research", "Decisions"],
            tensionSituations: ["Gut feel", "Ignorance"],
            socialImpact: "Objective.",
            interactionInsight: "Supports Learning.",
            microAction: "Ask for evidence."
        },
        {
            valueName: "Recognition",
            score: 75,
            interpretation: "You value visibility.",
            drivers: "Fame.",
            workBehaviour: "Public speaking.",
            strengthSituations: ["Awards", "Publicity"],
            tensionSituations: ["Anonymity", "Credit theft"],
            socialImpact: "Star power.",
            interactionInsight: "Feeds Boldness.",
            microAction: "Share a win."
        }
    ],
    hbriAnalysis: [
        {
            styleName: "Strategic",
            score: 80,
            interpretation: "This reasoning style shapes how you understand information.",
            coreThinkingStyle: "Big-picture, abstract, and long-range.",
            problemSolving: "You anticipate ripple effects and prefer frameworks.",
            strengthSituations: ["Long-term planning", "Ambiguous decisions"],
            blindSpots: ["May overlook practical constraints", "Plans may stretch feasibility"],
            collaborationImpact: "People seek your perspective when direction is unclear.",
            interactionInsight: "With high Inquisitiveness, this produces strong visionary ideas.",
            microAction: "Translate one big idea each week into a concrete next step."
        }
    ],
    personalExamples: {
        superpowers: [
            { title: "Steady Under Pressure", tag: "Strength", body: "You tend to stay calm when others panic." }
        ],
        blindSpots: [
            { title: "Intensity During Stress", tag: "Risk Area", body: "This tends to appear when expectations are unclear." }
        ]
    },
    valuesSummary: {
        summaryParagraph: "Your strongest values are Power and Commerce.",
        motivatorTags: ["Driven by Influence", "Driven by Results"]
    },
    career: {
        workEnvironmentFit: "You work best in structured, fast-paced environments.",
        leadershipStyle: [
            { dimension: "Strategy", description: "You lead with long-range thinking." },
            { dimension: "People", description: "You lead through connection." }
        ],
        recommendedRoles: [
            { role: "Director of Operations", matchPercentage: 95, explanation: "Fits your drive." }
        ]
    },
    relationships: {
        professional: {
            strengths: [{ title: "Supportive", body: "You create stability." }],
            growthAreas: [{ title: "Withdrawal", body: "You may pull back." }]
        },
        personal: {
            strengths: [{ title: "Reliable", body: "You follow through." }],
            growthAreas: [{ title: "Guarded", body: "Hard to open up." }]
        }
    },
    growthJourney: {
        phases: [
            {
                phaseTitle: "Phase 1 - Stability",
                themeLine: "Building reliable systems.",
                insights: [{ body: "You tend to rush." }],
                practice: { text: "Use a 2-minute ground routine." }
            },
            {
                phaseTitle: "Phase 2 - Expansion",
                themeLine: "Expanding skills.",
                insights: [{ body: "Explore new ideas." }],
                practice: { text: "Weekly reflection loop." }
            },
            {
                phaseTitle: "Phase 3 - Mastery",
                themeLine: "Leaning into influence.",
                insights: [{ body: "Mentor others." }],
                practice: { text: "Long-range planning." }
            }
        ]
    },
    actionPlan: {
        actionItems: [
            { title: "Pause and label", body: "Focus on pausing.", type: "Self-Regulation" },
            { title: "Use structure", body: "Focus on weekly lists.", type: "Execution" },
            { title: "Turn idea to action", body: "Focus on one experiment.", type: "Strength" }
        ]
    },
    socialExperience: {
        atBest: "People experience you as open and warm.",
        underPressure: "In tense moments, your reactions may intensify."
    },
    workStyle: {
        rhythm: { title: "Ideal Work Rhythm", body: "You work best with predictable routines." },
        team: { title: "Ideal Team", body: "You work best in open teams." },
        manager: { title: "Ideal Manager", body: "You work best with visibility." },
        communication: { title: "Ideal Communication", body: "You prefer big picture talk." },
        setup: { title: "Ideal Setup", body: "You thrive with organized tools." }
    },
    energy: {
        energisers: ["Taking ownership", "Creative freedom", "Clear priorities", "Socializing"],
        drainers: ["Lack of influence", "Inefficiency", "Chaos", "Isolation"]
    },
    confidenceScoreReason: "High consistency between Ambition and Drivers suggested strong self-awareness.",
    personalityWords: ["Driven", "Steady", "Strategic", "Influential", "Structured"],
    coachQuestions: ["How does your need for control impact your team?", "When do you feel most drained?"]
};
