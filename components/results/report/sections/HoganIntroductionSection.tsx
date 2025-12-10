import React from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, Target, Brain } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface HoganIntroductionSectionProps {
    hoganProfile: string;
    hpiScores: any;
    hdsScores?: any;
    mvpiScores?: any;
    hbriScores?: any;
    leadershipPotential: number;
    firstname?: string;
    isPaidUser: boolean;
    userEmail?: string;
    traitSummary?: {
        snapshotParagraph: string;
        headlineInsights: string[];
        standOutCard: string | null;
    };
}

const SummaryCard = ({ title, icon: Icon, scores, theme, delay }: any) => {
    const colorClass = theme === 'blue' ? 'text-blue-600' : theme === 'orange' ? 'text-orange-500' : theme === 'green' ? 'text-green-500' : 'text-purple-600';
    const bgClass = theme === 'blue' ? 'bg-blue-50' : theme === 'orange' ? 'bg-orange-50' : theme === 'green' ? 'bg-green-50' : 'bg-purple-50';
    const borderClass = theme === 'blue' ? 'border-blue-100' : theme === 'orange' ? 'border-orange-100' : theme === 'green' ? 'border-green-100' : 'border-purple-100';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className={`rounded-xl border ${borderClass} bg-white p-5 shadow-sm hover:shadow-md transition-shadow`}
        >
            <div className={`flex items-center gap-2 mb-4 ${colorClass}`}>
                <div className={`p-2 rounded-lg ${bgClass}`}>
                    <Icon size={20} />
                </div>
                <h3 className="font-heading text-lg">{title}</h3>
            </div>

            <div className="space-y-3">
                {Object.entries(scores || {}).slice(0, 5).map(([label, value]: any, i) => (
                    <div key={i} className="flex flex-col gap-1">
                        <div className="flex justify-between text-xs font-medium text-slate-600">
                            <span>{label}</span>
                            <span>{value}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${value}%` }}
                                transition={{ duration: 0.8, delay: delay + 0.1 * i }}
                                className={`h-full rounded-full ${theme === 'blue' ? 'bg-blue-500' : theme === 'orange' ? 'bg-orange-500' : theme === 'green' ? 'bg-green-500' : 'bg-purple-500'}`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export const HoganIntroductionSection: React.FC<HoganIntroductionSectionProps> = ({
    hpiScores,
    hdsScores,
    mvpiScores,
    hbriScores,
    traitSummary
}) => {
    return (
        <section className="container py-8 md:py-12">
            <SectionHeader
                title="Trait Summary"
                subtitle="High-level overview of your personality, risks, values, and reasoning."
                icon={Activity}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <SummaryCard
                    title="Personality (HPI)"
                    icon={Activity}
                    scores={hpiScores}
                    theme="blue"
                    delay={0.1}
                />

                {hdsScores && (
                    <SummaryCard
                        title="Risk Factors (HDS)"
                        icon={AlertTriangle}
                        scores={hdsScores}
                        theme="orange"
                        delay={0.2}
                    />
                )}

                {mvpiScores && (
                    <SummaryCard
                        title="Values (MVPI)"
                        icon={Target}
                        scores={mvpiScores}
                        theme="green"
                        delay={0.3}
                    />
                )}

                {hbriScores && (
                    <SummaryCard
                        title="Reasoning (HBRI)"
                        icon={Brain}
                        scores={hbriScores}
                        theme="purple"
                        delay={0.4}
                    />
                )}
            </div>

            {traitSummary && (
                <div className="mt-12 max-w-3xl mx-auto flex flex-col items-center gap-8">
                    {/* Snapshot Paragraph */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center"
                    >
                        <p className="font-montserrat text-slate-700 text-lg leading-relaxed">
                            {traitSummary.snapshotParagraph}
                        </p>
                    </motion.div>

                    {/* Headline Insights */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {traitSummary.headlineInsights.map((insight, idx) => (
                            <motion.span
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 + (idx * 0.1) }}
                                className={`px-4 py-2 rounded-full font-semibold text-sm shadow-sm ${idx % 3 === 0 ? 'bg-blue-100 text-blue-700' :
                                    idx % 3 === 1 ? 'bg-purple-100 text-purple-700' :
                                        'bg-green-100 text-green-700'
                                    }`}
                            >
                                {insight}
                            </motion.span>
                        ))}
                    </div>

                    {/* Stand Out Card (Optional) */}
                    {traitSummary.standOutCard && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="w-full bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-xl p-6 relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                            <h4 className="font-heading text-slate-800 mb-2 flex items-center gap-2">
                                <Target size={18} className="text-indigo-500" />
                                What Stands Out Most
                            </h4>
                            <p className="font-montserrat text-slate-600">
                                {traitSummary.standOutCard}
                            </p>
                        </motion.div>
                    )}
                </div>
            )}

        </section>
    );
};
