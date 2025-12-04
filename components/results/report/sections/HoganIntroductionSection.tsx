import React from 'react';

interface HoganIntroductionSectionProps {
    hoganProfile: string;
    hpiScores: any;
    hdsScores?: any;
    mvpiScores?: any;
    leadershipPotential: number;
    firstname?: string;
    isPaidUser: boolean;
    userEmail?: string;
}

export const HoganIntroductionSection: React.FC<HoganIntroductionSectionProps> = ({ firstname, hoganProfile }) => {
    return (
        <div className="container py-8">
            <h2 className="text-2xl font-bold mb-4">Welcome, {firstname || 'User'}</h2>
            <p className="text-muted-foreground">
                This report dives deep into your {hoganProfile} profile. We've analyzed your personality across three key dimensions:
                everyday strengths (HPI), potential derailers under stress (HDS), and your core drivers (MVPI).
            </p>
        </div>
    );
};
