import { DimensionScore } from "../../../types";

export interface HoganResultData {
    hpiScores: Record<string, DimensionScore>;
    hdsScores: Record<string, DimensionScore>;
    mvpiScores: Record<string, DimensionScore>;
    hbriScores?: Record<string, DimensionScore>;
    hoganProfile: string;
    leadershipPotential: number;
    jobFit: string[];
    takenAt: string;
    firstname?: string;
    hpiProfile?: any;
    hdsRiskAreas?: string[];
    mvpiTopValues?: string[];
}
