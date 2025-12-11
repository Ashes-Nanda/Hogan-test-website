import React from 'react';
import { Lightbulb, Zap, AlertTriangle } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { motion } from 'framer-motion';
import { getPersonalExample } from '@/lib/utils/report-content-generator';

interface PersonalExampleItem {
    title: string;
    tag: string;
    body: string;
}

interface PersonalExamplesData {
    superpowers: PersonalExampleItem[];
    blindSpots: PersonalExampleItem[];
}

interface PersonalExamplesSectionProps {
    traitScores: any;
    personalityType: string;
    firstname?: string;
    personalExamples?: PersonalExamplesData;
}

export const PersonalExamplesSection: React.FC<PersonalExamplesSectionProps> = ({ traitScores, personalExamples }) => {
    // Fallback logic if AI data isn't ready
    const entries = Object.entries(traitScores as Record<string, any>);
    const topTraits = entries.sort(([, a], [, b]) => b.percentage - a.percentage).slice(0, 2);
    const bottomTraits = entries.sort(([, a], [, b]) => a.percentage - b.percentage).slice(0, 2);

    // Normalize Data
    const normalizedSuperpowers: PersonalExampleItem[] = personalExamples?.superpowers ?? topTraits.map(([trait]) => ({
        title: `High ${trait}`,
        tag: 'Strength',
        body: getPersonalExample(trait, true) || `Because you scored high in ${trait}, you likely exhibit strong traits.`
    }));

    const normalizedBlindSpots: PersonalExampleItem[] = personalExamples?.blindSpots ?? bottomTraits.map(([trait]) => ({
        title: `Low ${trait}`,
        tag: 'Risk Area',
        body: getPersonalExample(trait, false) || `A lower score in ${trait} suggests you might struggle with this area.`
    }));

    return (
        <section className="bg-gradient-to-b from-white to-slate-50 py-20 border-y border-border break-inside-avoid">
            <div className="container">
                <SectionHeader title="Strengths & Risks" subtitle="Real-world scenarios where your traits shine or shadow." icon={Lightbulb} />

                {/* 
                  Grid Layout Strategy:
                  - Mobile: Single column source order (Superpower Header -> S Cards -> Blind Header -> B Cards)
                  - Desktop: Two columns with dense packing. We force columns using col-start.
                  This ensures that S1 aligns with B1, S2 aligns with B2, etc., because they share the same grid rows.
                */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:grid-flow-row-dense">

                    {/* Superpowers Header */}
                    <div className="md:col-start-1">
                        <h3 className="text-xl font-heading text-emerald-800 flex items-center gap-2">
                            <Zap className="text-emerald-500 fill-emerald-100" /> Superpowers
                        </h3>
                    </div>

                    {/* Superpower Cards */}
                    {normalizedSuperpowers.map((item, idx) => (
                        <motion.div
                            whileHover={{ y: -5 }}
                            key={`sp-${idx}`}
                            className="p-6 bg-white rounded-xl border-l-4 border-emerald-500 shadow-lg hover:shadow-xl transition-all h-full md:col-start-1"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h4 className="font-bold text-lg text-foreground">{item.title}</h4>
                                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded uppercase tracking-wider">{item.tag}</span>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {item.body}
                            </p>
                        </motion.div>
                    ))}

                    {/* Blind Spots Header */}
                    <div className="mt-8 md:mt-0 md:col-start-2">
                        <h3 className="text-xl font-heading text-orange-800 flex items-center gap-2">
                            <AlertTriangle className="text-orange-500 fill-orange-100" /> Blind Spots
                        </h3>
                    </div>

                    {/* Blind Spot Cards */}
                    {normalizedBlindSpots.map((item, idx) => (
                        <motion.div
                            whileHover={{ y: -5 }}
                            key={`bs-${idx}`}
                            className="p-6 bg-white rounded-xl border-l-4 border-orange-500 shadow-lg hover:shadow-xl transition-all h-full md:col-start-2"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h4 className="font-bold text-lg text-foreground">{item.title}</h4>
                                <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded uppercase tracking-wider">{item.tag}</span>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {item.body}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
