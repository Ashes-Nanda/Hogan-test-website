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
    hpiAnalysis?: any[];
    hdsAnalysis?: any[];
    mvpiAnalysis?: any[];
    hbriAnalysis?: any[];
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
    hbriAnalysis,
    id
}) => {

    // Helper to find analysis for a trait
    const getAnalysis = (list: any[] | undefined, name: string) => {
        if (!list || !name) return undefined;
        const searchName = name.toLowerCase();

        return list.find((item: any) => {
            const trait = item.traitName?.toLowerCase();
            const value = item.valueName?.toLowerCase(); // MVPI
            const style = item.styleName?.toLowerCase(); // HBRI

            return (
                (trait && (trait === searchName || trait.includes(searchName) || searchName.includes(trait))) ||
                (value && (value === searchName || value.includes(searchName) || searchName.includes(value))) ||
                (style && (style === searchName || style.includes(searchName) || searchName.includes(style)))
            );
        });
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
                            <h2 className="text-2xl font-heading text-slate-800">2A. Personality Traits (HPI)</h2>
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
                                    traitLabel={analysis?.traitLabel}
                                    traitQuote={analysis?.traitQuote}
                                    interpretation={analysis?.interpretation || `Your score on ${name} suggests a specific behavioral pattern.`}

                                    // HPI Fields
                                    innerExperience={analysis?.innerExperience}
                                    atWork={analysis?.atWork}
                                    underPressure={analysis?.underPressure}
                                    socialImpact={analysis?.socialImpact}

                                    strengths={analysis?.strengths}
                                    watchOuts={analysis?.watchOuts}
                                    traitInteractionInsight={analysis?.traitInteractionInsight}
                                    microAction={analysis?.microAction}
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
                                <h2 className="text-2xl font-heading text-slate-800">2B. Risk Factors (HDS)</h2>
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
                                        traitQuote={analysis?.traitQuote}
                                        interpretation={analysis?.interpretation}

                                        // HDS Fields
                                        triggers={analysis?.triggerConditions}
                                        behaviorUnderStress={analysis?.behaviourUnderStress}
                                        socialImpact={analysis?.socialImpact}

                                        strengths={analysis?.strengthExpressions} // Mapping
                                        watchOuts={analysis?.frictionPatterns} // Mapping

                                        regulationStrategies={analysis?.regulationStrategies}
                                        traitInteractionInsight={analysis?.traitInteractionInsight}
                                        microAction={analysis?.microAction}
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
                                <h2 className="text-2xl font-heading text-slate-800">2C. Values & Drivers (MVPI)</h2>
                                <p className="text-slate-500">The core values that drive your decisions and fit.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            {Object.entries(mvpiScores as Record<string, any>).map(([name, score]) => {
                                const analysis = getAnalysis(mvpiAnalysis, name); // Might match valueName
                                return (
                                    <TraitAnalysisCard
                                        key={name}
                                        traitName={name}
                                        score={score.percentage}
                                        theme="green"
                                        traitQuote={analysis?.traitQuote}
                                        interpretation={analysis?.interpretation}

                                        // MVPI Fields
                                        // MVPI Fields
                                        // drivers={analysis?.drivers} // Removed by user request
                                        workBehaviour={analysis?.workBehaviour}
                                        socialImpact={analysis?.socialImpact}

                                        strengths={analysis?.strengthSituations} // Mapping
                                        watchOuts={analysis?.tensionSituations} // Mapping

                                        traitInteractionInsight={analysis?.interactionInsight}
                                        microAction={analysis?.microAction}
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
                                <h2 className="text-2xl font-heading text-slate-800">2D. Reasoning Style (HBRI)</h2>
                                <p className="text-slate-500">How you process information and solve problems.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            {Object.entries(hbriScores as Record<string, any>).map(([name, score]) => {
                                const analysis = getAnalysis(hbriAnalysis, name); // Matches styleName
                                return (
                                    <TraitAnalysisCard
                                        key={name}
                                        traitName={name}
                                        score={score.percentage}
                                        theme="purple"
                                        traitQuote={analysis?.traitQuote}
                                        interpretation={analysis?.interpretation}

                                        // HBRI Fields
                                        coreThinkingStyle={analysis?.coreThinkingStyle}
                                        problemSolving={analysis?.problemSolving}
                                        collaborationImpact={analysis?.collaborationImpact}

                                        strengths={analysis?.strengthSituations} // Mapping
                                        watchOuts={analysis?.blindSpots} // Mapping

                                        traitInteractionInsight={analysis?.interactionInsight}
                                        microAction={analysis?.microAction}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section >
    );
};
export default HoganTraitsSection;
