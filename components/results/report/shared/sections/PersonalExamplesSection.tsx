import React from 'react';
import { Lightbulb, Zap, AlertTriangle } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { motion } from 'framer-motion';

interface PersonalExamplesSectionProps {
    traitScores: any;
    personalityType: string;
    firstname?: string;
}

export const PersonalExamplesSection: React.FC<PersonalExamplesSectionProps> = ({ traitScores }) => {
    const entries = Object.entries(traitScores as Record<string, any>);
    const topTraits = entries.sort(([, a], [, b]) => b.percentage - a.percentage).slice(0, 2);
    const bottomTraits = entries.sort(([, a], [, b]) => a.percentage - b.percentage).slice(0, 2);

    return (
        <section className="bg-gradient-to-b from-white to-slate-50 py-20 border-y border-border break-inside-avoid">
            <div className="container">
                <SectionHeader title="Personal Examples" subtitle="Real-world scenarios where your traits shine or shadow." icon={Lightbulb} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <h3 className="text-xl font-oswald font-bold text-emerald-800 flex items-center gap-2">
                            <Zap className="text-emerald-500 fill-emerald-100" /> Superpowers
                        </h3>
                        {topTraits.map(([trait, score]) => (
                            <motion.div
                                whileHover={{ y: -5 }}
                                key={trait}
                                className="p-6 bg-white rounded-xl border-l-4 border-emerald-500 shadow-lg hover:shadow-xl transition-all"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <h4 className="font-bold text-lg text-foreground">High {trait}</h4>
                                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded uppercase tracking-wider">Strength</span>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    Because you scored high in {trait}, you likely {score.interpretation?.toLowerCase() || 'exhibit strong traits'}.
                                    For example, in a team meeting, you might be the one who ensures everyone is heard or drives the agenda forward efficiently.
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xl font-oswald font-bold text-orange-800 flex items-center gap-2">
                            <AlertTriangle className="text-orange-500 fill-orange-100" /> Blind Spots
                        </h3>
                        {bottomTraits.map(([trait, score]) => (
                            <motion.div
                                whileHover={{ y: -5 }}
                                key={trait}
                                className="p-6 bg-white rounded-xl border-l-4 border-orange-500 shadow-lg hover:shadow-xl transition-all"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <h4 className="font-bold text-lg text-foreground">Low {trait}</h4>
                                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded uppercase tracking-wider">Risk Area</span>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    A lower score in {trait} suggests you might {score.interpretation?.toLowerCase() || 'struggle with this area'}.
                                    In high-pressure situations, you might prefer to work independently rather than seek immediate collaboration.
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
