import React from 'react';
import { Activity, Briefcase, AlertTriangle, Target, Brain } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TraitAnalysisCard } from '@/components/results/report/shared/TraitAnalysisCard';

interface HoganTraitsSectionProps {
    hpiScores: any;
    hdsScores: any;
    mvpiScores: any;
    hbriScores?: any;
    hpiProfile?: any;
    hdsRiskAreas?: any;
    mvpiTopValues?: any;
    hpiAnalysis?: any[]; // New prop from AI
    hdsAnalysis?: any[]; // New prop from AI
    mvpiAnalysis?: any[]; // New prop from AI
    sectionNumber: number;
    firstname?: string;
    id: string;
    isPaidUser: boolean;
    testType: string;
}

export const HoganTraitsSection: React.FC<HoganTraitsSectionProps> = ({
    hpiScores,
    hdsScores,
    mvpiScores,
    hbriScores,
    hpiAnalysis,
    hdsAnalysis,
    mvpiAnalysis,
    id
}) => {

    // Helper to find analysis for a trait
    const getAnalysis = (list: any[] | undefined, name: string) => {
        return list?.find((item: any) => item.traitName === name);
    };

    return (
        <section id={id} className="container py-12">
            <SectionHeader
                title="Detailed Trait Analysis"
                subtitle="In-depth breakdown of your behavioural patterns across three key dimensions."
                icon={Activity}
            />

            <div className="mt-12 space-y-16">
                {/* 2A. Personality (HPI) */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                            <Briefcase size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-oswald font-bold text-slate-800">2A. Personality Traits (HPI)</h2>
                            <p className="text-slate-500">Your day-to-day behavioral tendencies in normal circumstances.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        {Object.entries(hpiScores as Record<string, any>).map(([name, score]) => {
                            const analysis = getAnalysis(hpiAnalysis, name);
                            return (
                                <TraitAnalysisCard
                                    key={name}
                                    traitName={name}
                                    score={score.percentage}
                                    theme="blue"
                                    interpretation={analysis?.interpretation || `Your score on ${name} suggests a specific behavioral pattern.`}
                                    strengths={analysis?.strengths || [`Strength of ${name} A`, `Strength of ${name} B`]}
                                    watchOuts={analysis?.watchOuts || [`Risk of ${name} A`, `Risk of ${name} B`]}
                                    microAction={analysis?.microAction || `Try to practice behaviors related to ${name}.`}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* 2B. Risk Factors (HDS) */}
                {hdsScores && (
                    <div className="space-y-6 break-before-page">
                        <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
                            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                                <AlertTriangle size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-oswald font-bold text-slate-800">2B. Risk Factors (HDS)</h2>
                                <p className="text-slate-500">Behaviors that emerge under stress or pressure.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            {Object.entries(hdsScores as Record<string, any>).map(([name, score]) => {
                                const analysis = getAnalysis(hdsAnalysis, name);
                                return (
                                    <TraitAnalysisCard
                                        key={name}
                                        traitName={name}
                                        score={score.percentage}
                                        theme="orange"
                                        interpretation={analysis?.definition}
                                        strengths={analysis?.recenterStrategies} // Mapping equivalent props
                                        watchOuts={analysis?.stressSigns}
                                        microAction={analysis?.selfManagementTip}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* 2C. Values (MVPI) */}
                {mvpiScores && (
                    <div className="space-y-6 break-before-page">
                        <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
                            <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                                <Target size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-oswald font-bold text-slate-800">2C. Values & Drivers (MVPI)</h2>
                                <p className="text-slate-500">The core values that drive your decisions and fit.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            {Object.entries(mvpiScores as Record<string, any>).map(([name, score]) => {
                                const analysis = getAnalysis(mvpiAnalysis, name);
                                return (
                                    <TraitAnalysisCard
                                        key={name}
                                        traitName={name}
                                        score={score.percentage}
                                        theme="green"
                                        interpretation={analysis?.coreMeaning}
                                        strengths={analysis?.priorities}
                                        watchOuts={analysis?.socialRead}
                                        microAction={analysis?.growthSuggestion}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* 2D. Reasoning (HBRI) */}
                {hbriScores && (
                    <div className="space-y-6 break-before-page">
                        <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
                            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                                <Brain size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-oswald font-bold text-slate-800">2D. Reasoning Style (HBRI)</h2>
                                <p className="text-slate-500">How you process information and solve problems.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            {Object.entries(hbriScores as Record<string, any>).map(([name, score]) => (
                                <TraitAnalysisCard
                                    key={name}
                                    traitName={name}
                                    score={score.percentage}
                                    theme="purple"
                                // HBRI is currently less detailed in the AI schema, standard props available
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
export default HoganTraitsSection;
