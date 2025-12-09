import React from 'react';
import { motion } from 'framer-motion';
import { Star, Eye, Zap, Sparkles, User, AlertCircle, Quote } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface IdentitySummaryProps {
    id: string;
    sectionNumber: number;
    topTakeaways?: {
        highestHPI: string;
        lowestHPI: string;
        highestRisk: string;
        highestValue: string;
        reasoningStyle: string;
    };
    personalityWords?: string[]; // 5 words
    socialExperience?: {
        atBest: string;
        underPressure: string;
    };
}

export const IdentitySummary: React.FC<IdentitySummaryProps> = ({
    id,
    topTakeaways,
    personalityWords,
    socialExperience
}) => {

    // Default placeholders
    const takeaways = topTakeaways || {
        highestHPI: "Ambition - Natural leader",
        lowestHPI: "Prudence - Flexible thinker",
        highestRisk: "Excitable - Passionate intensity",
        highestValue: "Power - Influence driven",
        reasoningStyle: "Strategic - Big picture thinker"
    };

    const words = personalityWords || ["Driven", "Strategic", "Direct", "Flexible", "Influential"];

    const social = socialExperience || {
        atBest: "People experience you as open, decisive, and clear in your communication.",
        underPressure: "In tense moments, you may become impatient and might overlook details."
    };

    return (
        <section id={id} className="container py-16 space-y-24">

            {/* Section 8: Top 5 Takeaways */}
            <div>
                <SectionHeader title="Your Top 5 Takeaways" subtitle="The most defining insights from your profile." icon={Star} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
                    {[
                        { label: "Top Strength", value: takeaways.highestHPI, color: "bg-blue-100 text-blue-700 border-blue-200" },
                        { label: "Growth Edge", value: takeaways.lowestHPI, color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
                        { label: "Key Risk", value: takeaways.highestRisk, color: "bg-orange-100 text-orange-700 border-orange-200" },
                        { label: "Core Value", value: takeaways.highestValue, color: "bg-green-100 text-green-700 border-green-200" },
                        { label: "Thinking Style", value: takeaways.reasoningStyle, color: "bg-purple-100 text-purple-700 border-purple-200" },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`p-6 rounded-xl border ${item.color} flex flex-col justify-between h-32 hover:shadow-md transition-shadow`}
                        >
                            <span className="text-xs font-bold uppercase tracking-wider opacity-70">{item.label}</span>
                            <span className="font-oswald font-bold text-lg leading-tight">{item.value}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Section 9: Your Personality In 5 Words */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20 pointer-events-none" />

                <div className="relative z-10 text-center">
                    <h2 className="text-3xl md:text-5xl font-oswald font-black mb-12 tracking-tight">
                        Your Personality in 5 Words
                    </h2>

                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        {words.map((word, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0.5, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ delay: i * 0.1, type: "spring" }}
                                className="px-6 py-3 md:px-10 md:py-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-xl"
                            >
                                <span className="text-xl md:text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                                    {word}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section 11: How Others Experience You */}
            <div>
                <SectionHeader title="How Others Experience You" subtitle="A mirror to your social impact." icon={Eye} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    {/* At Your Best */}
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-8 relative overflow-hidden">
                        <Sparkles className="absolute top-4 right-4 text-emerald-200" size={100} strokeWidth={1} />
                        <div className="relative z-10">
                            <h3 className="text-2xl font-oswald font-bold text-emerald-800 mb-6 flex items-center gap-2">
                                <span className="p-2 bg-emerald-100 rounded-lg"><Sparkles size={20} /></span>
                                At Your Best
                            </h3>
                            <div className="space-y-4 text-slate-600 leading-relaxed">
                                <p>{social.atBest}</p>
                            </div>
                        </div>
                    </div>

                    {/* Under Pressure */}
                    <div className="bg-gradient-to-br from-slate-50 to-orange-50/50 border border-orange-100/50 rounded-2xl p-8 relative overflow-hidden">
                        <AlertCircle className="absolute top-4 right-4 text-orange-200/50" size={100} strokeWidth={1} />
                        <div className="relative z-10">
                            <h3 className="text-2xl font-oswald font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <span className="p-2 bg-orange-100 text-orange-600 rounded-lg"><AlertCircle size={20} /></span>
                                Under Pressure
                            </h3>
                            <div className="space-y-4 text-slate-600 leading-relaxed">
                                <p>{social.underPressure}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};
