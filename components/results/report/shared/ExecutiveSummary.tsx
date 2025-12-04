import React from 'react';
import { Briefcase } from 'lucide-react';

interface ExecutiveSummaryProps {
    summary: string;
    personalityType: string;
    firstname?: string;
    sectionNumber?: number;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ summary, personalityType, firstname }) => {
    return (
        <div className="bg-card rounded-2xl shadow-lg border border-border p-8 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary"><Briefcase size={24} /></div>
                <h2 className="text-2xl font-oswald font-bold text-foreground uppercase">Executive Summary</h2>
            </div>
            <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                <p className="mb-4">
                    <span className="font-bold text-foreground">{firstname || 'User'}</span>, your results indicate a profile characterized by
                    <span className="font-semibold text-primary"> {personalityType}</span>.
                </p>
                <p>{summary}</p>
            </div>
        </div>
    );
};
