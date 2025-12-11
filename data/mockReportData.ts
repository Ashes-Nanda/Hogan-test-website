import { HoganResultData } from "../types/tests/hogan/results";
import { HoganReportContent } from "../lib/ai/report-schema";

// Helper to create a DimensionScore
const score = (val: number) => ({ raw: val, max: 100, percentage: val, interpretation: "Generated Mock Data" });

export const mockResultData: HoganResultData = {
    firstname: "John",
    takenAt: new Date().toISOString(),
    hoganProfile: "The Strategic Builder",
    leadershipPotential: 85,
    jobFit: ["Executive Leadership", "Strategic Planning", "Operations Management"],
    hpiScores: {
        adjustment: score(85),
        ambition: score(92),
        sociability: score(75),
        interpersonalSensitivity: score(65),
        prudence: score(88),
        inquisitive: score(70),
        learningApproach: score(82)
    },
    hdsScores: {
        excitable: score(45),
        skeptical: score(30),
        cautious: score(25),
        reserved: score(40),
        leisurely: score(35),
        bold: score(85),
        mischievous: score(60),
        colorful: score(70),
        imaginative: score(65),
        diligent: score(90),
        dutiful: score(50)
    },
    mvpiScores: {
        recognition: score(85),
        power: score(90),
        hedonism: score(40),
        altruistic: score(60),
        affiliation: score(70),
        tradition: score(55),
        security: score(80),
        commerce: score(95),
        aesthetics: score(45),
        science: score(75)
    },
    hbriScores: {
        tactical: score(80),
        strategic: score(88)
    },
    hpiProfile: {
        description: "A strong leader with a focus on results and structure."
    },
    hdsRiskAreas: ["Bold", "Diligent", "Colorful"],
    mvpiTopValues: ["Commerce (95)", "Power (90)", "Recognition (85)", "Security (80)"]
};

// MOCK CONTENT BASED ON "THE PERSONAL INSIGHTS COACH" PERSONA
// Rules applied: No em dashes, no jargon, empathetic tone, specific scenarios.

export const mockAiContent: HoganReportContent = {
    hero: {
        identityTitle: "The Strategic Builder",
        subTitle: "Prepared exclusively for John Doe",
        heroNarrative: "You bring a focused and driving energy to the room that pushes everyone to do their best. You are consistent and structured, preferring to have a clear plan rather than improvising. You tend to learn by analyzing data and looking for long-term patterns rather than just jumping in. You are happiest when you are leading a team toward a profitable and measurable goal. Overall, you are someone who builds reliable systems that ensure success long after you have moved on."
    },
    traitSummary: {
        snapshotParagraph: "Think of your profile like this: you have the engine of a race car but the steering of a freight train. You want to go fast and win (Ambition), but you also want to be safe and precise (Prudence). This makes you incredibly effective, but sometimes you might feel a tension between 'let's go now' and 'wait, is this perfect?'.",
        headlineInsights: [
            "Driven by big goals",
            "Disciplined and careful",
            "Confident under pressure",
            "Strategic problem solver"
        ],
        standOutCard: "Your Commerce score of 95% means you see the world through a lens of value. If it does not make money or save time, you likely lose interest fast."
    },
    hpiAnalysis: [
        {
            traitName: "Adjustment",
            score: 85,
            traitLabel: "The Anchor",
            traitQuote: "I will handle it; don't worry.",
            interpretation: "In a chaotic meeting where everyone else is panicking, you are the one sitting back, calmly taking notes and planning the next step. You don't let the noise get to you.",
            innerExperience: "Inside, you mostly feel steady and capable. While others are kept awake by worry, you tend to sleep soundly, trusting your ability to fix things tomorrow.",
            atWork: "Colleagues rely on you to be the voice of reason. When a client is angry or a deadline is missed, they look to you to lower the temperature of the room.",
            underPressure: "When you have a bad day, you might not show it at all. You might just go quiet and fix the problem, which can make people think you don't care, even when you do.",
            socialImpact: "People feel safe around you because you are predictable, but they might also wish you would get more excited or show more emotion when things go really well.",
            strengths: [
                "Staying calm during crises",
                "Handling heavy workloads without burnout"
            ],
            watchOuts: [
                "Underestimating how stressed others feel",
                "Ignoring valid complaints because they seem emotional"
            ],
            traitInteractionInsight: "Because your Adjustment is high, it supports your high Ambition. You can chase big goals without burning out from the stress.",
            microAction: "Try this tomorrow: when someone comes to you with a problem, say 'That sounds really hard' before you offer a solution."
        },
        {
            traitName: "Ambition",
            score: 92,
            traitLabel: "The Driver",
            traitQuote: "We can do better than this.",
            interpretation: "You are the person in the group project who naturally takes the marker and starts writing on the whiteboard. You don't wait for permission to lead.",
            innerExperience: "You likely feel a restless energy to achieve more. Standing still feels like falling behind to you.",
            atWork: "You are known as the one who pushes for promotion and growth. You are constantly looking for the next level.",
            underPressure: "If you are blocked, you might become competitive or impatient with people who are content with 'good enough'.",
            socialImpact: "People see you as a leader, but some might feel you are more focused on your own career than the team's health.",
            strengths: [
                "Setting and hitting aggressive targets",
                "Energizing others to work harder"
            ],
            watchOuts: [
                "Competing with your own team members",
                "Never celebrating the win before moving to the next one"
            ],
            traitInteractionInsight: "Your high Ambition combined with high Prudence means you don't just want to win; you want to win by following the rules.",
            microAction: "In your next 1:1, ask 'How can I help you reach your goals?' and just listen."
        },
        {
            traitName: "Sociability",
            score: 75,
            traitLabel: "The Networker",
            traitQuote: "Let's get everyone together.",
            interpretation: "If you walk into a room of strangers, you are likely the first one to introduce yourself. You get energy from interaction.",
            innerExperience: "You feel recharged after a busy day of meetings, whereas a day alone in an office might feel draining.",
            atWork: "You are the glue that holds the team culture together. You likely organize the happy hours or the team lunches.",
            underPressure: "You might talk too much or dominate the conversation when you are nervous.",
            socialImpact: "People enjoy your company and find you engaging, but quiet people might find you a bit overwhelming.",
            strengths: [
                "Building quick rapport with clients",
                "Keeping team morale high"
            ],
            watchOuts: [
                "Distracting others with too much chat",
                "Not listening enough in deep conversations"
            ],
            traitInteractionInsight: "Your Sociability warms up your Ambition, making you seem like a charismatic leader rather than just a bossy one.",
            microAction: "Try this: in your next meeting, wait for three other people to speak before you share your opinion."
        },
        {
            traitName: "Prudence",
            score: 88,
            traitLabel: "The Planner",
            traitQuote: "Let's check the details one more time.",
            interpretation: "You are the one who reads the fine print before signing. While others are brainstorming wild ideas, you are thinking about the budget and the timeline.",
            innerExperience: "You feel a strong need for order. Chaos and ambiguity feel physically uncomfortable to you.",
            atWork: "You are the guardian of quality. Nothing leaves your desk until it is perfect.",
            underPressure: "You can become rigid and inflexible, refusing to change the plan even when the situation has changed.",
            socialImpact: "People trust you to get it right, but they might stop bringing you new ideas if they fear you will just point out the risks.",
            strengths: [
                "Executing complex projects flawlessly",
                "Managing budgets and resources"
            ],
            watchOuts: [
                "Micro-managing small details",
                "Resisting necessary change"
            ],
            traitInteractionInsight: "Your Prudence keeps your Boldness in check, ensuring you take calculated risks rather than reckless ones.",
            microAction: "Identify one low-risk decision this week and delegate it entirely to someone else without checking it."
        },
        {
            traitName: "Interpersonal Sensitivity",
            score: 65,
            traitLabel: "The Straight Shooter",
            traitQuote: "I just want to be honest.",
            interpretation: "You value truth over tact. If someone has spinach in their teeth, you tell them immediately because it's the practical thing to do.",
            innerExperience: "You feel that emotions often cloud good judgment. You prefer to stick to the facts.",
            atWork: "You are great at giving tough feedback, but you might forget to cushion the blow.",
            underPressure: "You can come across as cold or abrasive, especially when you are rushing.",
            socialImpact: "People respect your honesty, but they might not come to you for emotional support.",
            strengths: [
                "Having difficult performance conversations",
                "Remaining objective in heated arguments"
            ],
            watchOuts: [
                "Hurting feelings without realizing it",
                " seeming unapproachable"
            ],
            traitInteractionInsight: "Because this score is average, you can turn on the charm (Sociability) when you need to, but your default is task-focus.",
            microAction: "Start your next email with a personal check-in sentence before jumping to business."
        },
        {
            traitName: "Inquisitive",
            score: 70,
            traitLabel: "The Strategist",
            traitQuote: "What if we tried it this way?",
            interpretation: "You enjoy big ideas and future vision, but you are grounded enough to want to know how it actually works.",
            innerExperience: "You are curious but practical. You like learning things that you can apply immediately.",
            atWork: "You are good at bridging the gap between the visionaries and the operators.",
            underPressure: "You might get bored with routine tasks and start looking for something new to fix.",
            socialImpact: "People see you as bright and interesting, capable of strategic thought.",
            strengths: [
                "Solving complex problems",
                "Seeing the long-term impact of decisions"
            ],
            watchOuts: [
                "Over-complicating simple solutions",
                "Getting distracted by new shiny objects"
            ],
            traitInteractionInsight: "Your Inquisitive nature feeds your Ambition, driving you to find smarter ways to win.",
            microAction: "Spend 15 minutes this week reading about a topic completely unrelated to your job."
        },
        {
            traitName: "Learning Approach",
            score: 82,
            traitLabel: "The Expert",
            traitQuote: "I need to master this.",
            interpretation: "You are the person who reads the manual. You hate not knowing the answer.",
            innerExperience: "You feel confident when you are prepared. Lack of knowledge feels like a vulnerability to you.",
            atWork: "You are likely the subject matter expert that everyone goes to.",
            underPressure: "You might delay action because you feel you need 'just a bit more research'.",
            socialImpact: "You are respected for your knowledge, but you might seem a bit academic or slow to act.",
            strengths: [
                "Staying up to date with industry trends",
                "Training and mentoring others"
            ],
            watchOuts: [
                "Analysis paralysis",
                "Being intolerant of those who know less"
            ],
            traitInteractionInsight: "Your high Learning Approach pairs with Prudence to make you very thorough.",
            microAction: "Share one thing you learned this week with your team in a simple, non-technical way."
        }
    ],
    hdsAnalysis: [
        {
            traitName: "Bold",
            score: 85,
            traitQuote: "I know exactly how to fix this better than anyone else.",
            interpretation: "When things are moving too slowly, you tend to take over. You have a lot of confidence, which is great, but under stress, it can turn into arrogance.",
            triggerConditions: "This usually comes out when you feel your competence is questioned or when the team is hesitating.",
            behaviourUnderStress: "You might stop listening, interrupt others, or make unilateral decisions without consulting anyone.",
            socialImpact: "Others might feel steamrolled or undervalued. They might stop offering ideas because they think you won't listen anyway.",
            strengthExpressions: [
                "Courageous leadership in a crisis",
                "Willingness to take charge when no one else will"
            ],
            frictionPatterns: [
                "talking over people in meetings",
                "refusing to admit when you are wrong"
            ],
            regulationStrategies: "Next time you feel the urge to jump in, take a breath and ask a question instead.",
            traitInteractionInsight: "Combined with your high Prudence, your Boldness is methodical. You don't take wild risks; you take calculated takeovers.",
            microAction: "Ask 'What am I missing?' at the end of your next proposal presentation."
        },
        {
            traitName: "Diligent",
            score: 90,
            traitQuote: "If you want it done right, do it yourself.",
            interpretation: "You have incredibly high standards. When you are stressed, you can become a micromanager because you are terrified of a mistake slipping through.",
            triggerConditions: "This usually comes out when a deadline is tight or when you are working with people you perceive as sloppy.",
            behaviourUnderStress: "You might take work back from people to redo it yourself, or nitpick small formatting errors instead of focusing on the big picture.",
            socialImpact: "Your team might feel that nothing they do is ever good enough for you.",
            strengthExpressions: [
                "Producing flawless work",
                "Modeling hard work and dedication"
            ],
            frictionPatterns: [
                "Bottlenecking decisions",
                "Burnout from doing everything yourself"
            ],
            regulationStrategies: "Remind yourself that 80% perfect and done is often better than 100% perfect and late.",
            traitInteractionInsight: "Your Diligent score amplifies your Prudence, making it very hard for you to let go of control.",
            microAction: "Delegate a task this week and explicitly tell the person: 'I trust you to handle this your way.'"
        },
        {
            traitName: "Colorful",
            score: 70,
            traitQuote: "Watch this!",
            interpretation: "You enjoy being the center of attention. Under stress, you might become dramatic or easily distracted to keep things interesting.",
            triggerConditions: "This comes out when you are bored or feels like you are being ignored.",
            behaviourUnderStress: "You might dominate the airtime in meetings or make impulsive promises just to get a reaction.",
            socialImpact: "People find you entertaining but might question your focus or reliability.",
            strengthExpressions: [
                "Captivating an audience",
                "Bringing energy to a dull room"
            ],
            frictionPatterns: [
                "Distracting the team",
                "Seeking attention over results"
            ],
            regulationStrategies: "Try to share the stage. Make it your goal to make someone else look good.",
            traitInteractionInsight: "Your Colorful side fights with your Prudence. One part wants to show off, the other wants to be careful.",
            microAction: "In your next presentation, highlight a team member's contribution before your own."
        }
    ],
    mvpiAnalysis: [
        {
            valueName: "Commerce",
            score: 95,
            traitQuote: "Show me the ROI.",
            interpretation: "You look at the world through a lens of value. You are the friend who researches the best credit card points system.",
            drivers: "You naturally gravitate towards roles where success is measured in numbers and financial growth.",
            workBehaviour: "You prefer environments that are meritocratic and transparent about pay and bonuses.",
            strengthSituations: ["Analyzing budgets and pricing strategies", "Evaluating investment opportunities"],
            tensionSituations: ["Wasting money on 'nice to haves'", "Vague branding exercises with no ROI"],
            socialImpact: "People see you as business-savvy, but sometimes they might feel you only care about the money.",
            interactionInsight: "Your Commerce drive creates the 'why' behind your Ambition.",
            microAction: "Before rejecting an idea for cost reasons, ask what the non-financial benefit might be."
        },
        {
            valueName: "Power",
            score: 90,
            traitQuote: "I want to be the one deciding.",
            interpretation: "It is important for you to be in charge. You don't like waiting for permission.",
            drivers: "You naturally gravitate towards leadership, ownership, and competition.",
            workBehaviour: "You prefer environments where there is a clear hierarchy and a path to the top.",
            strengthSituations: ["Stepping up to lead a new initiative", "Taking ownership of a critical project"],
            tensionSituations: ["Being micromanaged", "Having no say in the team's direction"],
            socialImpact: "You are respected as a leader, but peers might find you a bit sharp-elbowed.",
            interactionInsight: "Power fuels your Boldness. You want the seat at the head of the table.",
            microAction: "Find a way to empower someone else to lead a small project this week."
        },
        {
            valueName: "Recognition",
            score: 85,
            traitQuote: "I did that, and it worked.",
            interpretation: "You want your hard work to be seen and appreciated. A private 'thank you' is nice, but a public shout-out is better.",
            drivers: "You naturally gravitate towards visibility, awards, and public speaking.",
            workBehaviour: "You work harder when you know there will be an audience or a scorecard.",
            strengthSituations: ["Presenting on stage", "Representing the company publicly"],
            tensionSituations: ["Working in anonymity", "Contributions going unnoticed"],
            socialImpact: "You bring energy and pride to your work, but ensure you share the credit.",
            interactionInsight: "High Recognition makes your Colorful side come out more often.",
            microAction: "Send a public slack message praising a colleague for something specific."
        },
        {
            valueName: "Security",
            score: 80,
            traitQuote: "Let's stick to the plan.",
            interpretation: "You value certainty. You want to know that your job, your income, and your future are safe.",
            drivers: "You naturally gravitate towards stable industries, clear career paths, and established companies.",
            workBehaviour: "You prefer environments that are organized, predictable, and low-risk.",
            strengthSituations: ["Creating long-term plans", "Developing risk mitigation strategies"],
            tensionSituations: ["Startup chaos with no plan", "Unpredictable environments"],
            socialImpact: "You are a stabilizing force, but you might miss high-risk, high-reward opportunities.",
            interactionInsight: "Security reinforces your Prudence. You double-check because you want to be safe.",
            microAction: "Say 'yes' to one small thing this week that feels a little bit uncertain."
        }
    ],
    hbriAnalysis: [
        {
            styleName: "Strategic",
            score: 88,
            traitQuote: "Where will this be in 5 years?",
            interpretation: "When handed a messy problem, you immediately zoom out. You look for the pattern, the history, and the future implication.",
            coreThinkingStyle: "You prefer to connect the dots rather than just collecting them.",
            problemSolving: "When faced with a complex puzzle, you ignore the noise and look for the root cause.",
            strengthSituations: [
                "Developing long-term roadmaps",
                "Anticipating market shifts"
            ],
            blindSpots: [
                "Overlooking immediate tactical fires",
                "Assuming everyone sees the pattern you see"
            ],
            collaborationImpact: "Teammates value your ability to see around corners, but they might wish you would help with the grunt work sometimes.",
            interactionInsight: "Your Strategic thinking pairs with Inquisitive to make you a very forward-looking leader.",
            microAction: "Next time you explain a strategy, draw it on a whiteboard to help others see the picture in your head."
        }
    ],
    personalExamples: {
        superpowers: [
            {
                title: "The Architect",
                tag: "Strength",
                body: "Imagine the team is lost in weeds, arguing about small details. You are the one who steps in and says, 'Wait, what are we actually trying to build here?' You realign everyone to the true goal. That is your superpower: clarity amidst chaos."
            },
            {
                title: "The Steady Hand",
                tag: "Strength",
                body: "When a client calls in a rage, you don't flinch. You listen, you acknowledge, and you propose a fix. Your ability to stay cool (Adjustment) while finding a commercial solution (Commerce) is rare and valuable."
            }
        ],
        blindSpots: [
            {
                title: "The Steamroller",
                tag: "Risk Area",
                body: "When you are stressed and the deadline is looming, you might just do everything yourself because 'it's faster'. It gets the job done today, but it demoralizes your team for tomorrow. Watch out for crushing people with your competence."
            },
            {
                title: "The Bank Vault",
                tag: "Risk Area",
                body: "You are so careful (Prudence) and value security (Security) so much that you might say 'no' to a great idea just because it is new. Don't let your need for safety kill innovation."
            }
        ]
    },
    valuesSummary: {
        summaryParagraph: "Deep down, you are driven by a need to win, to lead, and to be secure while doing it. You want to build something lasting and profitable, and you want to be recognized for it.",
        motivatorTags: [
            { tag: "Profit & Efficiency", description: "You are motivated by seeing measurable financial results." },
            { tag: "Leadership & Impact", description: "You want a seat at the table where decisions are made." },
            { tag: "Order & Certainty", description: "You need a clear path forward to feel your best." }
        ]
    },
    career: {
        workEnvironmentFit: "You will thrive in professional, structured environments where competence is rewarded. You need a place that respects hierarchy but allows you to climb it. Avoid chaotic startups or flat organizations where no one knows who is in charge.",
        leadershipStyle: [
            { dimension: "Strategy", description: "You lead with a map. You define the destination clearly." },
            { dimension: "Standards", description: "You set the bar high and expect people to jump." },
            { dimension: "Execution", description: "You don't just dream; you deliver. You track progress religiously." },
            { dimension: "Mentorship", description: "You teach people how to do it 'the right way'." },
            { dimension: "Distance", description: "You might keep a professional distance rather than being 'buddy-buddy'." }
        ],
        recommendedRoles: [
            { role: "Chief Operating Officer", matchPercentage: 95, explanation: "Aligns with your love for systems, structure, and execution." },
            { role: "VP of Strategy", matchPercentage: 90, explanation: "Leverages your ability to see the long game." },
            { role: "Financial Controller", matchPercentage: 85, explanation: "Perfect for your Commerce and Security drivers." }
        ]
    },
    relationships: {
        professional: {
            strengths: [
                { title: "Reliability", body: "If you say you will do it, it gets done. People rely on you." },
                { title: "Clarity", body: "You don't play games. You are direct and honest." }
            ],
            growthAreas: [
                { title: "Warnth", body: "Remember to ask about their weekend, not just the report." },
                { title: "Patience", body: "Not everyone thinks as fast as you. Give them time." }
            ]
        },
        personal: {
            strengths: [
                { title: "The Planner", body: "You are the one who ensures the family vacation actually happens." },
                { title: "The Rock", body: "In a family crisis, you are the calm one figuring out what to do." }
            ],
            growthAreas: [
                { title: "Relaxing", body: "It is okay to have a Saturday with no plan. Try it." },
                { title: "Vulnerability", body: "Your friends want to know when you are struggling too." }
            ]
        }
    },
    growthJourney: {
        phases: [
            {
                phaseTitle: "Immediate Focus (0-30 Days)",
                themeLine: "Soften your approach",
                insights: [
                    { body: "You are strong, but you don't need to use all your strength all the time." },
                    { body: "Practice asking questions instead of giving answers." }
                ],
                practice: { text: "In every meeting this week, speak last." }
            },
            {
                phaseTitle: "Short Term (1-3 Months)",
                themeLine: "Trust your team",
                insights: [
                    { body: "You are burning yourself out by double-checking everything." },
                    { body: "Letting go of control is the only way to scale up." }
                ],
                practice: { text: "Delegate one major task and do not check it until it is finished." }
            },
            {
                phaseTitle: "Long Term (3-12 Months)",
                themeLine: "Build your legacy",
                insights: [
                    { body: "Stop being the hero who fixes problems." },
                    { body: "Start being the architect who builds problem-solving teams." }
                ],
                practice: { text: "Mentor one person to take over your current role." }
            }
        ]
    },
    actionPlan: {
        actionItems: [
            {
                title: "The 'Wait' Rule",
                body: "When you want to interrupt, count to three. Use the acronym WAIT: 'Why Am I Talking?'",
                type: "Communication"
            },
            {
                title: "Schedule 'Do Nothing' Time",
                body: "Put 30 minutes of 'Strategy Time' on your calendar where email is off. Protect your thinking time.",
                type: "Productivity"
            },
            {
                title: "The 3:1 Ratio",
                body: "For every critical comment you give, give three genuine positive ones. Build the relationship bank account.",
                type: "Leadership"
            }
        ]
    },
    socialExperience: {
        atBest: "When you are at your best, people feel secure. They know that you have the plan, you have the skills, and you will get them to the finish line. You feel like a captain steering the ship through a storm.",
        underPressure: "When you are stressed, people might feel judged. Your silence can feel like disapproval, and your directness can feel like an attack. They might shrink away to avoid a critique."
    },
    workStyle: {
        rhythm: { title: "Steady & Intense", body: "You work like a marathon runner: consistent, high-pace, and enduring." },
        team: { title: "Director", body: "You prefer to be the conductor of the orchestra, not just a player." },
        manager: { title: "Hands-Off", body: "You want a manager who sets the goal and lets you figure out the path." },
        communication: { title: "Bullet Points", body: "You like it brief, clear, and actionable. You delete long emails." },
        setup: { title: "Structured", body: "You need a tidy desk and a clear calendar to think straight." }
    },
    energy: {
        energisers: ["Winning a deal", "Crossing things off a list", "Leading a team", "Solving a complex knot"],
        drainers: ["Vague meetings", "Emotional drama", "Waiting on others", "Unclear instructions"]
    },
    topTakeaways: {
        highestHPI: {
            name: "Ambition",
            descriptor: "The Driver",
            insight: "You have a relentless internal engine that pushes you to achieve more."
        },
        lowestHPI: {
            name: "Interpersonal Sensitivity",
            descriptor: "The Realist",
            insight: "You prioritize the hard truth over comforting liss, which makes you effective but blunt."
        },
        highestRisk: {
            name: "Diligent",
            descriptor: "The Perfectionist",
            insight: "You care so much about quality that you struggle to let things go."
        },
        highestValue: {
            name: "Commerce",
            descriptor: "The Builder",
            insight: "You are motivated by building value, wealth, and efficiency."
        },
        reasoningStyle: {
            name: "Strategic",
            descriptor: "The Chess Player",
            insight: "You see the future impact of today's decisions clearly."
        }
    },
    personalityWords: ["Driven", "Strategic", "Disciplined", "Confident", "Reliable"],
    confidenceScoreReason: "Your profile is very consistent. Your internal values (Money, Power) align perfectly with your traits (Ambition, Boldness). You assume you are meant to lead, and you are right.",
    coachQuestions: [
        "What is the cost of always needing to be right?",
        "Who could you be if you weren't so afraid of failing?",
        "Are you climbing the ladder just because it is there?"
    ]
};
