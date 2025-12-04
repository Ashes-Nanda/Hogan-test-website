import React from 'react';

interface ConfidenceScoreProps {
    confidenceScore: number;
    personalityType: string;
}

export const ConfidenceScore: React.FC<ConfidenceScoreProps> = ({ confidenceScore }) => {
    return (
        <div className="bg-card rounded-2xl shadow-lg border border-border p-8 flex flex-col items-center justify-center text-center h-full">
            <div className="mb-2 text-sm font-bold text-muted-foreground uppercase tracking-wider">Confidence Score</div>
            <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted/20" />
                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={351.86} strokeDashoffset={351.86 * (confidenceScore / 100)} className="text-emerald-500" />
                </svg>
                <span className="absolute text-4xl font-oswald font-black text-foreground">{confidenceScore}%</span>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">High consistency in responses indicates reliable results.</p>
        </div>
    );
};
