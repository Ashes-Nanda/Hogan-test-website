export function calculateConfidenceScore({ personalityType, traitScores }: any) {
    // Calculate variance/standard deviation of scores to determine consistency/distinctness
    // Higher variance means the user has distinct preferences (high confidence)
    // Low variance (everything near 50%) means ambiguous profile (lower confidence)

    if (!traitScores || Object.keys(traitScores).length === 0) {
        return { score: 0, reason: "Insufficient data to calculate confidence." };
    }

    const scores = Object.values(traitScores).map((s: any) => s.percentage || s.score || 50);
    const mean = scores.reduce((a: number, b: number) => a + b, 0) / scores.length;
    const variance = scores.reduce((a: number, b: number) => a + Math.pow(b - mean, 2), 0) / scores.length;
    const stdDev = Math.sqrt(variance);

    // Normalize stdDev to a 0-100 confidence scale
    // Max possible stdDev for 0-100 scale is 50 (if half are 0 and half are 100)
    // Typical "distinct" profile might have stdDev around 20-30
    // "Ambiguous" profile might have stdDev < 10

    let confidence = Math.min(100, Math.max(50, Math.round((stdDev / 25) * 100)));

    // Adjust based on completeness if available (mocking full completeness for now)

    let reason = "";
    if (confidence >= 90) {
        reason = "Your profile shows very distinct and clear personality preferences.";
    } else if (confidence >= 75) {
        reason = "Your results indicate a consistent and well-defined personality profile.";
    } else if (confidence >= 60) {
        reason = "Your profile shows a mix of distinct traits and balanced tendencies.";
    } else {
        reason = "Your results are quite balanced, suggesting adaptability across different situations.";
    }

    return { score: confidence, reason };
}
