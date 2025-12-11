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
            <div className="max-w-6xl mx-auto">
                <SectionHeader title="Habits & Reflections" subtitle="Small actions that create big changes." icon={Repeat} />

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {/* Level 1: Foundational */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-blue-500" />
                        <div className="mb-6">
                            <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-2 block">Level 1</span>
                            <h3 className="text-2xl font-bold text-slate-900">Foundational</h3>
                            <p className="text-slate-500 text-sm mt-2">Essential habits for daily stability.</p>
                        </div>
                        <ul className="space-y-4 flex-1">
                            {habits.slice(0, 5).map((habit, i) => (
                                <li key={i} className="flex gap-3 items-start">
                                    <CheckCircle size={18} className="text-blue-500 shrink-0 mt-0.5" />
                                    <span className="text-slate-600 text-sm leading-relaxed font-medium">{habit}</span>
                                </li>
                            ))}
                            {/* Fillers if not enough habits */}
                            {Array.from({ length: Math.max(0, 5 - habits.slice(0, 5).length) }).map((_, i) => (
                                <li key={`fill-${i}`} className="flex gap-3 items-start opacity-40">
                                    <CheckCircle size={18} className="text-slate-300 shrink-0 mt-0.5" />
                                    <span className="text-slate-400 text-sm leading-relaxed">Continue to build consistency...</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Level 2: Advanced */}
                    <div className="bg-gradient-to-b from-indigo-50 to-white rounded-2xl border border-indigo-200 shadow-lg p-8 flex flex-col hover:shadow-xl transition-all duration-300 relative scale-105 md:-translate-y-4 z-10 group">
                        <div className="absolute px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-sm">
                            Suggested Focus
                        </div>
                        <div className="mb-6">
                            <span className="text-indigo-600 font-bold tracking-widest text-xs uppercase mb-2 block">Level 2</span>
                            <h3 className="text-2xl font-bold text-slate-900">Advanced</h3>
                            <p className="text-slate-500 text-sm mt-2">Deepening impact & influence.</p>
                        </div>
                        <ul className="space-y-4 flex-1">
                            {(habits.length > 5 ? habits.slice(5, 10) : [
                                "Seek feedback from a peer.",
                                "Delegate one low-leverage task.",
                                "Practice active listening in meetings.",
                                "Set a 15-min deep work timer.",
                                "Review goals weekly."
                            ]).map((habit, i) => (
                                <li key={i} className="flex gap-3 items-start">
                                    <CheckCircle size={18} className="text-indigo-600 shrink-0 mt-0.5" />
                                    <span className="text-slate-700 text-sm leading-relaxed font-bold">{habit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Level 3: Mastery */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
                        <div className="mb-6">
                            <span className="text-emerald-600 font-bold tracking-widest text-xs uppercase mb-2 block">Level 3</span>
                            <h3 className="text-2xl font-bold text-slate-900">Mastery</h3>
                            <p className="text-slate-500 text-sm mt-2">Long-term transformational shifts.</p>
                        </div>
                        <ul className="space-y-4 flex-1">
                            {(habits.length > 10 ? habits.slice(10, 15) : [
                                "Mentor a junior colleague.",
                                "Lead a cross-functional initiative.",
                                "Write a thought leadership piece.",
                                "Reflect on 5-year vision.",
                                "Optimize personal energy management."
                            ]).map((habit, i) => (
                                <li key={i} className="flex gap-3 items-start">
                                    <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                                    <span className="text-slate-600 text-sm leading-relaxed font-medium">{habit}</span>
                                </li>
                            ))}
                        </ul>
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
