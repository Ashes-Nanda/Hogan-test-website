import React from 'react';
import { motion } from 'framer-motion';
import { Star, Eye, Zap, Sparkles, User, AlertCircle, Quote } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface TakeawayData {
    name: string;
    descriptor: string;
    insight: string;
}

interface IdentitySummaryProps {
    id: string;
    sectionNumber: number;
    topTakeaways?: {
        highestHPI: TakeawayData | string;
        lowestHPI: TakeawayData | string;
        highestRisk: TakeawayData | string;
        highestValue: TakeawayData | string;
        reasoningStyle: TakeawayData | string;
    };
    personalityWords?: string[]; // 5 words
    showTakeaways?: boolean;
    showWords?: boolean;
    showSocial?: boolean;
    socialExperience?: {
        atBest: string;
        underPressure: string;
    };
}

export const IdentitySummary: React.FC<IdentitySummaryProps> = ({
    id,
    topTakeaways,
    personalityWords,
    socialExperience,
    showTakeaways = true,
    showWords = true,
    showSocial = true
}) => {

    // Default placeholders
    const defaultTakeaways = {
        highestHPI: { name: "Ambition", descriptor: "Natural leader", insight: "You possess a natural drive to lead and influence others toward shared goals." },
        lowestHPI: { name: "Prudence", descriptor: "Flexible thinker", insight: "You tend to be adaptable and open to changing course when necessary." },
        highestRisk: { name: "Excitable", descriptor: "Passionate intensity", insight: "Your passion can sometimes be intense, requiring mindful regulation." },
        highestValue: { name: "Power", descriptor: "Influence driven", insight: "You are motivated by opportunities to exercise authority and make an impact." },
        reasoningStyle: { name: "Strategic", descriptor: "Big picture thinker", insight: "You excel at seeing the long-term vision and connecting complex dots." }
    };

    const takeaways = topTakeaways || defaultTakeaways;

    const normalizeTakeaway = (data: TakeawayData | string | undefined): TakeawayData => {
        if (!data) return { name: "", descriptor: "", insight: "" };
        if (typeof data === 'string') {
            const parts = data.split(' - ');
            return {
                name: parts[0] || "",
                descriptor: parts[1] || "",
                insight: ""
            };
        }
        return data;
    };

    const words = personalityWords || ["Driven", "Strategic", "Direct", "Flexible", "Influential"];

    const social = socialExperience || {
        atBest: "People experience you as open, decisive, and clear in your communication.",
        underPressure: "In tense moments, you may become impatient and might overlook details."
    };

    return (
        <section id={id} className="container py-16 space-y-24">

            {/* Section 8: Top 5 Takeaways */}
            {showTakeaways && (
                <div>
                    <SectionHeader title="Key Takeaways" subtitle="The most defining insights from your profile." icon={Star} />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
                        {[
                            { label: "Top Strength", data: normalizeTakeaway(takeaways.highestHPI), color: "bg-blue-100 text-blue-700 border-blue-200" },
                            { label: "Growth Edge", data: normalizeTakeaway(takeaways.lowestHPI), color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
                            { label: "Key Risk", data: normalizeTakeaway(takeaways.highestRisk), color: "bg-orange-100 text-orange-700 border-orange-200" },
                            { label: "Core Value", data: normalizeTakeaway(takeaways.highestValue), color: "bg-green-100 text-green-700 border-green-200" },
                            { label: "Thinking Style", data: normalizeTakeaway(takeaways.reasoningStyle), color: "bg-purple-100 text-purple-700 border-purple-200" },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`p-6 rounded-xl border ${item.color} flex flex-col gap-4 hover:shadow-md transition-shadow`}
                            >
                                <span className="text-xs font-medium uppercase tracking-wider opacity-70">{item.label}</span>
                                <div className="flex flex-col">
                                    <span className={`font-heading leading-tight mb-1 break-words hyphens-auto ${item.data.name.length > 13 ? 'text-lg' : 'text-xl'}`}>
                                        {item.data.name}
                                    </span>
                                    <span className="font-montserrat font-medium text-sm opacity-90 leading-tight">
                                        {item.data.descriptor}
                                    </span>
                                </div>
                                {item.data.insight && (
                                    <p className="text-xs leading-relaxed opacity-80 border-t border-current pt-3 mt-auto">
                                        {item.data.insight}
                                    </p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Section 9: Your Personality In 5 Words */}
            {/* Section 9: Your Personality In 5 Words */}
            {showWords && (
                <div className="text-center py-8">
                    <h2 className="text-3xl md:text-5xl font-heading mb-12 tracking-tight text-slate-900">
                        Your Personality in 5 Words
                    </h2>

                    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                        {words.map((word, i) => {
                            const colors = [
                                "from-blue-50 to-blue-100 border-blue-200 text-blue-800",
                                "from-purple-50 to-purple-100 border-purple-200 text-purple-800",
                                "from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-800",
                                "from-amber-50 to-amber-100 border-amber-200 text-amber-800",
                                "from-rose-50 to-rose-100 border-rose-200 text-rose-800",
                            ];
                            const colorClass = colors[i % colors.length];

                            return (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                                    className={`px-8 py-4 rounded-xl border bg-gradient-to-br ${colorClass} shadow-sm hover:shadow-md transition-all cursor-default select-none`}
                                >
                                    <span className="text-xl md:text-2xl font-normal font-heading">
                                        {word}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Section 11: How Others Experience You */}
            {showSocial && (
                <div>
                    <SectionHeader title="Reputation" subtitle="A mirror to your social impact." icon={Eye} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                        {/* At Your Best */}
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-8 relative overflow-hidden">
                            <Sparkles className="absolute top-4 right-4 text-emerald-200" size={100} strokeWidth={1} />
                            <div className="relative z-10">
                                <h3 className="text-2xl font-heading text-emerald-800 mb-6 flex items-center gap-2">
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
                                <h3 className="text-2xl font-heading text-slate-800 mb-6 flex items-center gap-2">
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
            )}

        </section>
    );
};
