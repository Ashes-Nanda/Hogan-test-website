import React from 'react';
import { Heart, TrendingUp } from 'lucide-react';

interface ValuesMotivatorSectionProps {
    firstname: string | null;
    valuesAndMotivators: {
        summary: string;
        coreValues: any[];
        motivators: any[];
        actionItems: any[];
    };
    personalityType: string;
    sectionNumber: number;
    id: string;
    isPaidUser: boolean;
    testType: string;
}

export const ValuesMotivatorSection: React.FC<ValuesMotivatorSectionProps> = ({ valuesAndMotivators }) => {
    return (
        <section className="container py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-pink-50 rounded-full text-pink-600">
                            <Heart size={28} />
                        </div>
                        <h2 className="text-3xl font-oswald font-bold text-foreground">Core Values</h2>
                    </div>
                    <div className="space-y-6">
                        {valuesAndMotivators.coreValues.map((val, idx) => (
                            <div key={idx} className="flex gap-4 items-start group">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 text-white flex items-center justify-center font-bold shadow-md">
                                    {idx + 1}
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-foreground mb-1">{val.title}</h4>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {val.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-8 border border-border">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-indigo-50 rounded-full text-indigo-600">
                            <TrendingUp size={28} />
                        </div>
                        <h2 className="text-3xl font-oswald font-bold text-foreground">Key Motivators</h2>
                    </div>
                    <div className="space-y-4">
                        {valuesAndMotivators.motivators.map((motivator, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-border">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">
                                    {String.fromCharCode(65 + idx)}
                                </div>
                                <span className="font-medium text-foreground text-lg">{motivator.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
export default ValuesMotivatorSection;
