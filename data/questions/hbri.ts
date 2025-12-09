import { Question } from '../../types';

export const HBRI_QUESTIONS: Question[] = [
    // HBRI Questions - Tactical
    {
        id: "hbri_tac_1",
        text: "A company’s quarterly expenses (in thousands): Q1: 320, Q2: 340, Q3: 300, Q4: 360. Which quarter saw the largest increase compared to the previous quarter?",
        dimensionType: "HBRI",
        dimensionName: "Tactical",
        correctAnswer: "Q4",
        options: [
            { value: "Q1", label: "Q1" },
            { value: "Q2", label: "Q2" },
            { value: "Q3", label: "Q3" },
            { value: "Q4", label: "Q4" }
        ]
    },
    {
        id: "hbri_tac_2",
        text: "A retailer buys a product for $40 and sells it for $64. If they sold 750 units, what is the total profit?",
        dimensionType: "HBRI",
        dimensionName: "Tactical",
        correctAnswer: "$18,000",
        options: [
            { value: "$12,000", label: "$12,000" },
            { value: "$18,000", label: "$18,000" },
            { value: "$24,000", label: "$24,000" },
            { value: "$30,000", label: "$30,000" }
        ]
    },
    {
        id: "hbri_tac_3",
        text: "A team has Analysts:Developers = 3:7. If there are 140 team members, how many are Analysts?",
        dimensionType: "HBRI",
        dimensionName: "Tactical",
        correctAnswer: "42",
        options: [
            { value: "30", label: "30" },
            { value: "40", label: "40" },
            { value: "42", label: "42" },
            { value: "98", label: "98" }
        ]
    },
    {
        id: "hbri_tac_4",
        text: "Sales growth rates: Product A: 8%, Product B: 12%, Product C: 5%, Product D: 12%. Which product(s) showed the highest growth?",
        dimensionType: "HBRI",
        dimensionName: "Tactical",
        correctAnswer: "Product B and Product D",
        options: [
            { value: "Product B only", label: "Product B only" },
            { value: "Product D only", label: "Product D only" },
            { value: "Product B and Product D", label: "Product B and Product D" },
            { value: "Product A", label: "Product A" }
        ]
    },
    {
        id: "hbri_tac_5",
        text: "A machine produces 480 units per hour but loses 12.5% efficiency due to overheating. How many units does it produce in one hour under these conditions?",
        dimensionType: "HBRI",
        dimensionName: "Tactical",
        correctAnswer: "420",
        options: [
            { value: "400", label: "400" },
            { value: "420", label: "420" },
            { value: "440", label: "440" },
            { value: "460", label: "460" }
        ]
    },
    {
        id: "hbri_tac_6",
        text: "A company earned $240,000 total profit. Department A contributed 35%. How much profit came from Department A?",
        dimensionType: "HBRI",
        dimensionName: "Tactical",
        correctAnswer: "$84,000",
        options: [
            { value: "$75,000", label: "$75,000" },
            { value: "$80,000", label: "$80,000" },
            { value: "$84,000", label: "$84,000" },
            { value: "$90,000", label: "$90,000" }
        ]
    },
    {
        id: "hbri_tac_7",
        text: "A bar graph shows the following monthly website visits: Jan: 20k, Feb: 22k, Mar: 19k, Apr: 25k. Which month had the largest increase from the previous month?",
        dimensionType: "HBRI",
        dimensionName: "Tactical",
        correctAnswer: "April",
        options: [
            { value: "January", label: "January" },
            { value: "February", label: "February" },
            { value: "March", label: "March" },
            { value: "April", label: "April" }
        ]
    },
    {
        id: "hbri_tac_8",
        text: "A product’s price increased from $80 to $92. What is the percentage increase?",
        dimensionType: "HBRI",
        dimensionName: "Tactical",
        correctAnswer: "15%",
        options: [
            { value: "10%", label: "10%" },
            { value: "12%", label: "12%" },
            { value: "15%", label: "15%" },
            { value: "20%", label: "20%" }
        ]
    },
    {
        id: "hbri_tac_9",
        text: "Number Series: 7, 10, 16, 25, 37, ?",
        dimensionType: "HBRI",
        dimensionName: "Tactical",
        correctAnswer: "52",
        options: [
            { value: "48", label: "48" },
            { value: "50", label: "50" },
            { value: "52", label: "52" },
            { value: "55", label: "55" }
        ]
    },
    {
        id: "hbri_tac_10",
        text: "If sales rose 12% this year to reach 224,000 units, what were last year’s sales?",
        dimensionType: "HBRI",
        dimensionName: "Tactical",
        correctAnswer: "200,000 units",
        options: [
            { value: "190,000 units", label: "190,000 units" },
            { value: "200,000 units", label: "200,000 units" },
            { value: "210,000 units", label: "210,000 units" },
            { value: "215,000 units", label: "215,000 units" }
        ]
    },
    {
        id: "hbri_tac_11",
        text: "Revenue: $150,000, Cost: $112,500. What is the profit margin?",
        dimensionType: "HBRI",
        dimensionName: "Tactical",
        correctAnswer: "25%",
        options: [
            { value: "20%", label: "20%" },
            { value: "25%", label: "25%" },
            { value: "30%", label: "30%" },
            { value: "35%", label: "35%" }
        ]
    },
    // HBRI Questions - Strategic
    {
        id: "hbri_str_1",
        text: "“All sales associates who exceed targets qualify for incentives. No associate who receives customer complaints exceeds targets.” Which statement MUST be true?",
        dimensionType: "HBRI",
        dimensionName: "Strategic",
        correctAnswer: "Associates receiving complaints do not qualify for incentives.",
        options: [
            { value: "Associates receiving complaints do not qualify for incentives.", label: "Associates receiving complaints do not qualify for incentives." },
            { value: "Some associates who exceed targets receive complaints.", label: "Some associates who exceed targets receive complaints." },
            { value: "All associates qualify for incentives.", label: "All associates qualify for incentives." },
            { value: "No associate exceeds targets.", label: "No associate exceeds targets." }
        ]
    },
    {
        id: "hbri_str_2",
        text: "Sequence: 4, 6, 9, 13, 18, ?",
        dimensionType: "HBRI",
        dimensionName: "Strategic",
        correctAnswer: "24",
        options: [
            { value: "22", label: "22" },
            { value: "23", label: "23" },
            { value: "24", label: "24" },
            { value: "25", label: "25" }
        ]
    },
    {
        id: "hbri_str_3",
        text: "Employee turnover rose 15%. Survey shows: 50%: poor manager communication, 25%: unclear job expectations, 15%: workload, 10%: compensation. Which intervention is MOST justified?",
        dimensionType: "HBRI",
        dimensionName: "Strategic",
        correctAnswer: "Improve managerial communication practices",
        options: [
            { value: "Improve managerial communication practices", label: "Improve managerial communication practices" },
            { value: "Clarify job expectations", label: "Clarify job expectations" },
            { value: "Reduce workload", label: "Reduce workload" },
            { value: "Increase compensation", label: "Increase compensation" }
        ]
    },
    {
        id: "hbri_str_4",
        text: "A report states, “Most regional branches experienced higher customer retention except the West division, which remained flat.” Which conclusion is valid?",
        dimensionType: "HBRI",
        dimensionName: "Strategic",
        correctAnswer: "Retention did not decline in the West division.",
        options: [
            { value: "Retention increased in the West division.", label: "Retention increased in the West division." },
            { value: "Retention decreased in the West division.", label: "Retention decreased in the West division." },
            { value: "Retention did not decline in the West division.", label: "Retention did not decline in the West division." },
            { value: "The West division had the highest retention.", label: "The West division had the highest retention." }
        ]
    },
    {
        id: "hbri_str_5",
        text: "“If an option is cost-effective, then it will be approved. This proposal is not approved.” What can be concluded?",
        dimensionType: "HBRI",
        dimensionName: "Strategic",
        correctAnswer: "The proposal was not cost-effective.",
        options: [
            { value: "The proposal was not cost-effective.", label: "The proposal was not cost-effective." },
            { value: "The proposal was cost-effective.", label: "The proposal was cost-effective." },
            { value: "The proposal will be approved later.", label: "The proposal will be approved later." },
            { value: "None of the above.", label: "None of the above." }
        ]
    },
    {
        id: "hbri_str_6",
        text: "A triangular arrow is rotated 90° clockwise. Which orientation results?",
        dimensionType: "HBRI",
        dimensionName: "Strategic",
        correctAnswer: "The arrow points to the right",
        options: [
            { value: "The arrow points to the left", label: "The arrow points to the left" },
            { value: "The arrow points to the right", label: "The arrow points to the right" },
            { value: "The arrow points up", label: "The arrow points up" },
            { value: "The arrow points down", label: "The arrow points down" }
        ]
    },
    {
        id: "hbri_str_7",
        text: "“Blueprint is to building as recipe is to ___”",
        dimensionType: "HBRI",
        dimensionName: "Strategic",
        correctAnswer: "Meal",
        options: [
            { value: "Food", label: "Food" },
            { value: "Meal", label: "Meal" },
            { value: "Chef", label: "Chef" },
            { value: "Kitchen", label: "Kitchen" }
        ]
    },
    {
        id: "hbri_str_8",
        text: "A team faces: 40% delays due to unclear requirements, 35% due to slow approvals, 15% due to technical debt, 10% miscellaneous. What should be addressed first?",
        dimensionType: "HBRI",
        dimensionName: "Strategic",
        correctAnswer: "Improve requirement clarity",
        options: [
            { value: "Improve requirement clarity", label: "Improve requirement clarity" },
            { value: "Speed up approvals", label: "Speed up approvals" },
            { value: "Reduce technical debt", label: "Reduce technical debt" },
            { value: "Address miscellaneous issues", label: "Address miscellaneous issues" }
        ]
    },
    {
        id: "hbri_str_9",
        text: "All consultants are trained in analytics. Some analysts are consultants. Which must be true?",
        dimensionType: "HBRI",
        dimensionName: "Strategic",
        correctAnswer: "Some analysts are trained in analytics.",
        options: [
            { value: "Some analysts are trained in analytics.", label: "Some analysts are trained in analytics." },
            { value: "All analysts are trained in analytics.", label: "All analysts are trained in analytics." },
            { value: "No analysts are trained in analytics.", label: "No analysts are trained in analytics." },
            { value: "All consultants are analysts.", label: "All consultants are analysts." }
        ]
    },
    {
        id: "hbri_str_10",
        text: "Three vendor quotes for a project: Vendor A: $48,000, Vendor B: $42,500 + 10% maintenance, Vendor C: $45,000 flat. Which is the lowest total cost?",
        dimensionType: "HBRI",
        dimensionName: "Strategic",
        correctAnswer: "Vendor C",
        options: [
            { value: "Vendor A", label: "Vendor A" },
            { value: "Vendor B", label: "Vendor B" },
            { value: "Vendor C", label: "Vendor C" },
            { value: "Vendor A and C", label: "Vendor A and C" }
        ]
    },
    {
        id: "hbri_str_11",
        text: "“Employee satisfaction rose despite no increase in compensation.” What can be inferred?",
        dimensionType: "HBRI",
        dimensionName: "Strategic",
        correctAnswer: "Factors other than compensation improved satisfaction.",
        options: [
            { value: "Factors other than compensation improved satisfaction.", label: "Factors other than compensation improved satisfaction." },
            { value: "Compensation is not important.", label: "Compensation is not important." },
            { value: "Employees are unhappy.", label: "Employees are unhappy." },
            { value: "Productivity increased.", label: "Productivity increased." }
        ]
    },
    {
        id: "hbri_str_12",
        text: "Three employees - A, B, C - completed a task. If A finished before B, and C finished after B, who finished last?",
        dimensionType: "HBRI",
        dimensionName: "Strategic",
        correctAnswer: "C",
        options: [
            { value: "A", label: "A" },
            { value: "B", label: "B" },
            { value: "C", label: "C" },
            { value: "A and B", label: "A and B" }
        ]
    },
    {
        id: "hbri_str_13",
        text: "Customer complaints dropped 20% after introducing a self-service portal, but call volume stayed the same. What is the best interpretation?",
        dimensionType: "HBRI",
        dimensionName: "Strategic",
        correctAnswer: "Customers still need assistance but are reporting fewer issues.",
        options: [
            { value: "Customers still need assistance but are reporting fewer issues.", label: "Customers still need assistance but are reporting fewer issues." },
            { value: "The portal is not working.", label: "The portal is not working." },
            { value: "Customers are calling more.", label: "Customers are calling more." },
            { value: "Issues have increased.", label: "Issues have increased." }
        ]
    }
];
