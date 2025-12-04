export function generateExecutiveSummary({ personalityType, traitScores, personalityData }: any) {
    const traits = Object.values(traitScores).map((t: any) => t.label).join(', ');
    return `Your Hogan profile (${personalityType}) suggests a leadership style characterized by ${traits}. ${personalityData.career.summary}`;
}
