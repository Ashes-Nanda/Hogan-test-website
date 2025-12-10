import React from 'react';
import { motion } from 'framer-motion';
import { Repeat, MessageCircle, HelpCircle, CheckCircle } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface ReflectionsProps {
    id: string;
    sectionNumber: number;
    microHabits?: string[];
    coachQuestions?: string[];
}

export const ReflectionsAndHabits: React.FC<ReflectionsProps> = ({
    id,
    microHabits,
    coachQuestions
}) => {

    // Default placeholders
    const habits = microHabits || [
        "Take a 2-minute pause before sending critical emails.",
        "Start team meetings by asking one personal check-in question.",
        "Write down your top 3 priorities every morning."
    ];

    const questions = coachQuestions || [
        "What would happen if you let go of control on your current project?",
        "Who are you forgetting to acknowledge this week?",
        "When do you feel most 'in flow' at work, and how can you replicate that?"
    ];

    return (
        <section id={id} className="container py-16 space-y-24">

            {/* Section 13: Micro-Habits */}
            <div className="max-w-4xl mx-auto">
                <SectionHeader title="Micro-Habits for Growth" subtitle="Small actions that create big changes." icon={Repeat} />

                <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Left Column: Scrollable Interactive List */}
                    <div className="bg-white rounded-3xl p-1 border border-slate-200 shadow-sm h-[500px] flex flex-col relative overflow-hidden group/container">
                        <div className="absolute top-0 left-0 w-full h-full bg-white/50 z-0 pointer-events-none" />

                        <div className="p-6 pb-0 relative z-10 bg-white">
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Your Action Plan ({habits.length})</h4>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-3 relative z-10 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                            {habits.map((habit, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    viewport={{ once: true }}
                                    className="group flex gap-4 bg-slate-50 hover:bg-white p-4 rounded-xl border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all duration-200 cursor-pointer"
                                >
                                    <div className="mt-1 shrink-0 text-slate-300 group-hover:text-indigo-500 transition-colors">
                                        <CheckCircle size={20} />
                                    </div>
                                    <span className="text-slate-600 group-hover:text-slate-800 font-medium leading-relaxed text-sm">
                                        {habit}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Fade Mask */}
                        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-20" />
                    </div>

                    {/* Right Column: Mesh Gradient Blob Visual */}
                    <div className="bg-white border border-slate-200 rounded-3xl h-[500px] flex items-center justify-center relative overflow-hidden group">

                        {/* Animated Gradient Blobs (Pastel Palette from IdentitySummary) */}
                        <div className="absolute inset-0 bg-slate-50/50" />

                        {/* Blue Blob (Matches 'Top Strength') */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                x: [0, 50, 0],
                                y: [0, 30, 0]
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-300/30 rounded-full blur-[100px]"
                        />

                        {/* Rose Blob (Matches 'Personality Word') */}
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                x: [0, -30, 0],
                                y: [0, 50, 0]
                            }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-300/20 rounded-full blur-[120px]"
                        />

                        {/* Amber Blob (Matches 'Core Value') */}
                        <motion.div
                            animate={{
                                scale: [1, 1.3, 1],
                                rotate: [0, 90, 0]
                            }}
                            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-300/20 rounded-full blur-[80px]"
                        />

                        {/* Glassmorphism Card Content */}
                        <div className="relative z-10 p-10 flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-2xl bg-white/40 backdrop-blur-md border border-white/50 shadow-lg flex items-center justify-center mb-6">
                                <Repeat className="text-indigo-600" size={32} />
                            </div>

                            <h3 className="text-2xl font-serif text-slate-800 mb-2">Habit Flow</h3>
                            <p className="text-slate-500 text-sm max-w-[250px] leading-relaxed">
                                Consistently stacking small actions creates a powerful momentum in your life.
                            </p>

                            {/* Decorative Elements */}
                            <div className="flex gap-2 mt-8">
                                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                <span className="w-2 h-2 rounded-full bg-indigo-300" />
                                <span className="w-2 h-2 rounded-full bg-indigo-200" />
                            </div>
                        </div>

                        {/* Overlay Texture */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none mix-blend-overlay" />
                    </div>
                </div>
            </div>

            {/* Section 14: If You Had A Coach... */}
            <div className="max-w-4xl mx-auto">
                <SectionHeader title="If You Had A Coach..." subtitle="Reflective questions to spark deeper insight." icon={MessageCircle} />

                <div className="mt-12 grid gap-8">
                    {questions.map((question, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15 }}
                            className="bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 p-8 rounded-2xl md:rounded-3xl relative overflow-hidden group hover:shadow-md transition-all duration-300"
                        >


                            <div className="relative z-10 flex gap-6">
                                <div className="hidden md:flex flex-col items-center gap-2">
                                    <div className="w-px h-8 bg-indigo-300" />
                                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                    <div className="w-px h-full bg-indigo-300" />
                                </div>
                                <div>
                                    <span className="text-indigo-600 font-bold tracking-widest text-xs uppercase mb-2 block">Reflection {i + 1}</span>
                                    <h3 className="text-xl md:text-2xl font-serif leading-relaxed text-slate-800">
                                        "{question}"
                                    </h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

        </section >
    );
};
