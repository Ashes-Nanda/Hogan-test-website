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
                <h3 className="font-oswald font-bold text-lg">{title}</h3>
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
    hbriScores
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
        </section>
    );
};
