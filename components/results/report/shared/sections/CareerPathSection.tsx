import React from 'react';
import { Briefcase, CheckCircle, Activity } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface CareerPathSectionProps {
    firstname: string | null;
    career: {
        summary: string;
        superpowers: any[];
        growthAreas: any[];
        actionSteps: any[];
        suggestions: {
            title: string;
            description: string;
            matchPercentage: number;
            qualityMatches: any[];
        }[];
    };
    personalityType: string;
    testType: string;
    sectionNumber: number;
    id: string;
    isPaidUser: boolean;
}

export const CareerPathSection: React.FC<CareerPathSectionProps> = ({ career }) => {
    const radarData = [
        { subject: 'Strategy', A: 80, fullMark: 100 },
        { subject: 'Execution', A: 65, fullMark: 100 },
        { subject: 'People', A: 90, fullMark: 100 },
        { subject: 'Innovation', A: 70, fullMark: 100 },
        { subject: 'Data', A: 50, fullMark: 100 },
    ];

    return (
        <section id="career-path" className="bg-white py-16 border-y border-border break-before-page">
            <div className="container">
                <SectionHeader title="Career & Relationships" subtitle="Professional trajectory and interpersonal dynamics." icon={Briefcase} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm break-inside-avoid">
                        <h3 className="font-oswald font-bold text-lg mb-6 flex items-center gap-2">
                            <Briefcase className="text-primary" size={20} /> Work Environment
                        </h3>
                        <div className="space-y-6">
                            <p className="text-sm text-muted-foreground">{career.summary}</p>
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col items-center break-inside-avoid">
                        <h3 className="font-oswald font-bold text-lg mb-2 flex items-center gap-2 w-full">
                            <Activity className="text-primary" size={20} /> Leadership Style
                        </h3>
                        <div className="flex-grow w-full -ml-6">
                            <ResponsiveContainer width="100%" height={300}>
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                    <PolarGrid stroke="#e2e8f0" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748b' }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar name="You" dataKey="A" stroke="#6257e3" strokeWidth={2} fill="#6257e3" fillOpacity={0.3} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-gradient-to-b from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-6 shadow-sm relative overflow-hidden break-inside-avoid">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <CheckCircle size={80} className="text-emerald-600" />
                        </div>
                        <h3 className="font-oswald font-bold text-lg mb-6 flex items-center gap-2 text-emerald-900">
                            <CheckCircle className="text-emerald-600" size={20} /> Recommended Roles
                        </h3>
                        <div className="space-y-3 relative z-10">
                            {career.suggestions.map((job, i) => (
                                <div key={i} className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex justify-between items-center">
                                    <span className="font-medium text-emerald-900">{job.title}</span>
                                    <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                                        {job.matchPercentage}% Match
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
