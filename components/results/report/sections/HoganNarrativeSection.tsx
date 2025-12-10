import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles } from 'lucide-react';

interface HoganNarrativeSectionProps {
    narrative: string;
    userName?: string;
}

export const HoganNarrativeSection: React.FC<HoganNarrativeSectionProps> = ({ narrative, userName }) => {
    if (!narrative) return null;

    return (
        <section className="container mx-auto px-4 mt-8 mb-12 print:break-inside-avoid">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                whileHover={{ y: -5 }}
                className="max-w-4xl mx-auto relative group"
            >
                {/* Decorative background blur (Glow effect) */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-indigo-500 to-violet-500 rounded-[2rem] opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-500" />

                <div className="relative bg-white dark:bg-slate-900 rounded-[1.5rem] p-6 md:p-12 shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800">

                    {/* Floating Decorative Elements */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-12 -right-12 text-purple-50 dark:text-purple-900/20"
                    >
                        <Sparkles size={120} strokeWidth={1} />
                    </motion.div>

                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-600 to-indigo-500" />

                    <div className="relative z-10 flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-purple-50 dark:bg-purple-900/30 rounded-xl text-purple-600 dark:text-purple-400">
                                <Quote size={24} className="fill-current" />
                            </div>
                            <h3 className="font-heading text-lg text-slate-400 uppercase tracking-widest">
                                {userName ? `${userName}'s ` : "Your "}Executive Profile
                            </h3>
                        </div>

                        <p className="font-montserrat text-lg md:text-xl leading-relaxed text-slate-700 dark:text-slate-200 font-medium">
                            {narrative}
                        </p>

                        <div className="flex justify-end">
                            <motion.div
                                className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                            >
                                <motion.div
                                    className="h-full bg-gradient-to-r from-purple-600 to-indigo-500"
                                    initial={{ x: "-100%" }}
                                    whileInView={{ x: "100%" }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};
