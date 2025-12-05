import React from 'react';
import { User, Attempt } from '../types';
import HoganReportFull from './results/report/HoganReportFull';
import { HoganResultData } from '../types/tests/hogan/results';

interface Props {
    user: User;
    activeAttempt?: Attempt;
    onRetake: () => void;
}

export const ResultsView: React.FC<Props> = ({ user, activeAttempt, onRetake }) => {
    const selectedAttempt = activeAttempt || user.attempts[user.attempts.length - 1] || user.attempts[0];
    const result = selectedAttempt?.result;

    if (!result) return <div className="p-12 text-center text-muted-foreground">No results found.</div>;

    // Map TestResult to HoganResultData
    const resultData: HoganResultData = {
        hpiScores: result.hpi,
        hdsScores: result.hds,
        mvpiScores: result.mvpi,
        hbriScores: result.hbri,
        hoganProfile: result.profileTitle,
        leadershipPotential: result.leadershipPotentialScore,
        jobFit: result.jobFit,
        takenAt: result.completedAt,
        firstname: user.name.split(' ')[0],
        hpiProfile: result.hpi,
        hdsRiskAreas: result.riskAnalysis,
        mvpiTopValues: Object.entries(result.mvpi)
            .sort(([, a], [, b]) => b.percentage - a.percentage)
            .slice(0, 3)
            .map(([k]) => k)
    };

    return (
        <div className="min-h-screen bg-background">
            <HoganReportFull
                resultData={resultData}
                isPaidUser={true}
                userEmail={user.email}
                userId={user.id}
            />
            {/* Retake button for mobile/easy access if needed, though usually handled in nav */}
            <div className="fixed bottom-20 right-4 z-50 md:hidden">
                <button onClick={onRetake} className="bg-primary text-white px-4 py-2 rounded-full shadow-lg text-xs font-bold opacity-80 hover:opacity-100">
                    Retake
                </button>
            </div>
        </div>
    );
};