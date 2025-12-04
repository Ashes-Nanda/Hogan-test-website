import { DimensionScore } from "../../../types";

export function convertHoganScoresToMBTIFormat(hpiScores: Record<string, DimensionScore>) {
    // Map HPI to MBTI-like dimensions
    // E/I: Sociability & Ambition
    // S/N: Inquisitiveness & Learning Approach
    // T/F: Interpersonal Sensitivity
    // J/P: Prudence

    const e_i = ((hpiScores['Sociability']?.percentage || 50) + (hpiScores['Ambition']?.percentage || 50)) / 2;
    const s_n = ((hpiScores['Inquisitiveness']?.percentage || 50) + (hpiScores['Learning Approach']?.percentage || 50)) / 2;
    const t_f = hpiScores['Interpersonal Sensitivity']?.percentage || 50;
    const j_p = hpiScores['Prudence']?.percentage || 50;

    return {
        Extraversion: {
            percentage: e_i,
            label: e_i > 50 ? 'Extraversion' : 'Introversion',
            interpretation: e_i > 50 ? 'You are outgoing and sociable.' : 'You are reserved and reflective.'
        },
        Intuition: {
            percentage: s_n,
            label: s_n > 50 ? 'Intuition' : 'Sensing',
            interpretation: s_n > 50 ? 'You focus on future possibilities.' : 'You focus on concrete facts.'
        },
        Feeling: {
            percentage: t_f,
            label: t_f > 50 ? 'Feeling' : 'Thinking',
            interpretation: t_f > 50 ? 'You prioritize values and people.' : 'You prioritize logic and analysis.'
        },
        Judging: {
            percentage: j_p,
            label: j_p > 50 ? 'Judging' : 'Perceiving',
            interpretation: j_p > 50 ? 'You prefer structure and planning.' : 'You prefer flexibility and spontaneity.'
        }
    };
}
