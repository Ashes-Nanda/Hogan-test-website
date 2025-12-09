import React from 'react';
import { Heart, TrendingUp } from 'lucide-react';

interface ValuesData {
    summary: {
        summaryParagraph: string;
        motivatorTags: { tag: string; description: string }[];
    };
    analysis: {
        valueName: string;
        drivers: string;
        workBehaviour?: string;
        strengthSituations?: string[];
        tensionSituations?: string[];
        socialImpact?: string;
    }[];
}

interface ValuesMotivatorSectionProps {
    firstname: string | null;
    valuesAndMotivators: {
        summary: string;
        coreValues: any[];
        motivators: any[];
        actionItems: any[];
    };
    valuesData?: ValuesData;
    personalityType: string;
    sectionNumber: number;
    id: string;
    isPaidUser: boolean;
    testType: string;
}

export const ValuesMotivatorSection: React.FC<ValuesMotivatorSectionProps> = ({ valuesAndMotivators, valuesData }) => {
    return (
        <section className="container py-16">

            {valuesData && valuesData.summary.summaryParagraph && (
                <div className="mb-12 max-w-4xl mx-auto text-center">
                    <p className="text-lg text-slate-600 leading-relaxed font-medium">
                        {valuesData.summary.summaryParagraph}
                    </p>
                </div>
            )}

            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-pink-50 rounded-full text-pink-600">
                    <Heart size={28} />
                </div>
                <h2 className="text-3xl font-oswald font-bold text-foreground">Core Values & Drivers</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {valuesData ? (
                    valuesData.analysis.slice(0, 3).map((val, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow group">
                            <div className="p-5 border-b border-border bg-gradient-to-r from-pink-50/50 to-rose-50/50">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-sm">
                                        {idx + 1}
                                    </div>
                                    <h4 className="text-xl font-oswald font-bold text-slate-800">{val.valueName}</h4>
                                </div>
                                <p className="text-sm font-medium text-pink-700">"{val.drivers}"</p>
                            </div>

                            <div className="p-5 space-y-4">
                                <div>
                                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">At Work</h5>
                                    <p className="text-sm text-slate-600 leading-relaxed">{val.workBehaviour}</p>
                                </div>

                                {(val.strengthSituations && val.strengthSituations.length > 0) && (
                                    <div>
                                        <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">Thrives In</h5>
                                        <ul className="list-disc list-inside text-sm text-slate-600 pl-1">
                                            {val.strengthSituations.slice(0, 2).map((s: string, i: number) => (
                                                <li key={i}>{s}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {(val.tensionSituations && val.tensionSituations.length > 0) && (
                                    <div>
                                        <h5 className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">Tension When</h5>
                                        <ul className="list-disc list-inside text-sm text-slate-600 pl-1">
                                            {val.tensionSituations.slice(0, 2).map((s: string, i: number) => (
                                                <li key={i}>{s}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {val.socialImpact && (
                                    <div className="pt-3 border-t border-slate-100">
                                        <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-500 mb-1">Social Impact</h5>
                                        <p className="text-xs text-slate-500">{val.socialImpact}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    // Fallback for non-AI data
                    valuesAndMotivators.coreValues.map((val, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-sm border border-border p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm">{idx + 1}</div>
                                <h4 className="text-lg font-bold text-slate-800">{val.title}</h4>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">{val.description}</p>
                        </div>
                    ))
                )}
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-border">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-indigo-50 rounded-full text-indigo-600">
                        <TrendingUp size={28} />
                    </div>
                    <h2 className="text-3xl font-oswald font-bold text-foreground">Key Motivators Summary</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {valuesData ? (
                        valuesData.summary.motivatorTags.map((motivator: any, idx) => {
                            const title = typeof motivator === 'string' ? motivator : motivator.tag;
                            const desc = typeof motivator === 'string' ? null : motivator.description;

                            return (
                                <div key={idx} className="flex flex-col gap-2 p-4 bg-white rounded-xl shadow-sm border border-border hover:border-indigo-200 transition-colors">
                                    <div className="flex items-center gap-3 mb-1">
                                        <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0">
                                            {idx + 1}
                                        </div>
                                        <span className="font-bold text-indigo-700">{title}</span>
                                    </div>
                                    {desc && <p className="text-sm text-slate-600 pl-9">{desc}</p>}
                                </div>
                            );
                        })
                    ) : (
                        valuesAndMotivators.motivators.map((motivator, idx) => (
                            <div key={idx} className="flex flex-col gap-2 p-4 bg-white rounded-xl shadow-sm border border-border">
                                <span className="font-bold text-indigo-600">{motivator.title}</span>
                                <span className="text-sm text-slate-600">{motivator.description}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};
export default ValuesMotivatorSection;
