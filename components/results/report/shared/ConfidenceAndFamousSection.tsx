import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface ConfidenceAndWordsSectionProps {
    confidenceScore: number;
    reason?: string;
    personalityWords?: string[];
}

export const ConfidenceAndFamousSection: React.FC<ConfidenceAndWordsSectionProps> = ({ confidenceScore, reason, personalityWords = [] }) => {

    // Fallback words if none provided
    const displayWords = personalityWords && personalityWords.length > 0
        ? personalityWords
        : ["Ambitious", "Strategic", "Thoughtful", "Driven", "Resilient"];

    return (
        <section className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Confidence Score Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 md:p-10 flex flex-col items-center relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600" />

                    <div className="mb-8 flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Confidence Score</span>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center w-full">
                        <div className="relative w-40 h-40 shrink-0 flex items-center justify-center mb-8">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                                <motion.circle
                                    cx="80" cy="80" r="70"
                                    stroke="currentColor"
                                    strokeWidth="10"
                                    fill="transparent"
                                    strokeDasharray={439.82}
                                    initial={{ strokeDashoffset: 439.82 }}
                                    whileInView={{ strokeDashoffset: 439.82 * (1 - confidenceScore / 100) }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                                    className="text-emerald-500"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                    className="text-5xl font-heading text-slate-900 dark:text-white"
                                >
                                    {confidenceScore}%
                                </motion.span>
                            </div>
                        </div>

                        <p className="text-center text-slate-600 dark:text-slate-400 text-sm max-w-xs leading-relaxed font-medium">
                            This score reflects the consistency and clarity of your responses throughout the assessment.
                        </p>
                    </div>
                </motion.div>

                {/* Personality in 5 Words Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 md:p-10 flex flex-col items-center relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-400 to-indigo-600 z-10" />

                    {/* Background decorations for visual appeal */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-3xl opacity-60 pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-50 dark:bg-purple-900/10 rounded-full blur-3xl opacity-60 pointer-events-none" />

                    <div className="mb-8 flex items-center gap-2 relative z-10">
                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                        <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Your personality in 5 words</span>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center w-full relative z-10 p-4">
                        <div className="flex flex-wrap justify-center items-center content-center gap-6 w-full max-w-lg">
                            {displayWords.map((word, index) => {
                                // Cycle through 5 distinct color styles
                                const styles = [
                                    "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
                                    "bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800",
                                    "bg-green-50 text-green-700 border-green-100 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
                                    "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800",
                                    "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-900/20 dark:text-rose-300 dark:border-rose-800"
                                ];
                                const style = styles[index % styles.length];

                                // Fixed Symmetric Layout: No random rotations or margins
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            delay: 0.2 + (index * 0.1),
                                            type: "spring",
                                            stiffness: 100
                                        }}
                                        className={`px-8 py-4 rounded-2xl border ${style} shadow-sm min-w-[140px] text-center backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-default`}
                                    >
                                        <span className="font-heading text-xl font-medium tracking-normal">
                                            {word}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
