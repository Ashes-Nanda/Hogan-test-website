import React from 'react';
import { motion } from 'framer-motion';
import { Repeat, MessageCircle, HelpCircle } from 'lucide-react';
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

                <div className="mt-12 grid gap-6">
                    {habits.map((habit, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.01 }}
                            className="bg-white border-l-4 border-indigo-500 shadow-sm p-6 rounded-r-xl flex items-center gap-6"
                        >
                            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl shrink-0">
                                {i + 1}
                            </div>
                            <p className="text-lg text-slate-700 font-medium leading-relaxed">
                                {habit}
                            </p>
                        </motion.div>
                    ))}
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
                            className="bg-slate-900 text-white p-8 rounded-2xl md:rounded-3xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                                <HelpCircle size={100} />
                            </div>

                            <div className="relative z-10 flex gap-6">
                                <div className="hidden md:flex flex-col items-center gap-2">
                                    <div className="w-px h-8 bg-indigo-400/50" />
                                    <div className="w-2 h-2 rounded-full bg-indigo-400" />
                                    <div className="w-px h-full bg-indigo-400/50" />
                                </div>
                                <div>
                                    <span className="text-indigo-300 font-bold tracking-widest text-xs uppercase mb-2 block">Reflection {i + 1}</span>
                                    <h3 className="text-xl md:text-2xl font-serif leading-relaxed text-slate-100">
                                        "{question}"
                                    </h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

        </section>
    );
};
