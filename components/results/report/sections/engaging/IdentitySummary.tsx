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
            <div>
                <SectionHeader title="Your Top 5 Takeaways" subtitle="The most defining insights from your profile." icon={Star} />
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
                            <span className="text-xs font-bold uppercase tracking-wider opacity-70">{item.label}</span>
                            <div className="flex flex-col">
                                <span className="font-oswald font-bold text-xl leading-tight mb-1">
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
