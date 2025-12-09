import React from 'react';
import { motion } from 'framer-motion';

interface ConfidenceAndFamousSectionProps {
    confidenceScore: number;
    reason?: string;
    personalityType: string;
}

export const ConfidenceAndFamousSection: React.FC<ConfidenceAndFamousSectionProps> = ({ confidenceScore, reason, personalityType }) => {
    const famousPeopleMapping: Record<string, string[]> = {
        'Ambition': ['Napoleon Bonaparte', 'Sheryl Sandberg', 'Satya Nadella', 'Indra Nooyi', 'Jeff Bezos', 'Jack Ma', 'Margaret Thatcher'],
        'Inquisitive': ['Elon Musk', 'Steve Jobs', 'Jeff Bezos', 'Marie Curie', 'Leonardo da Vinci', 'Thomas Edison', 'Ada Lovelace'],
        'Prudence': ['Warren Buffett', 'Angela Merkel', 'Tim Cook', 'Queen Elizabeth II', 'George Washington', 'Dwight D. Eisenhower'],
        'Interpersonal Sensitivity': ['Oprah Winfrey', 'Nelson Mandela', 'Mother Teresa', 'Princess Diana', 'Dalai Lama', 'Mahatma Gandhi'],
        'Adjustment': ['Barack Obama', 'Captain Sully', 'Neil Armstrong', 'Winston Churchill', 'Franklin D. Roosevelt', 'Abraham Lincoln'],
        'Sociability': ['Bill Clinton', 'Richard Branson', 'Will Smith', 'Ellen DeGeneres', 'Tony Robbins', 'Magic Johnson'],
        'Learning Approach': ['Bill Gates', 'Albert Einstein', 'Isaac Newton', 'Charles Darwin', 'Stephen Hawking', 'Nikola Tesla']
    };

    const getRandomPeople = (list: string[], count: number) => {
        const shuffled = [...list].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    // Find matching people or default to a mix of leaders
    const matchedList = Object.entries(famousPeopleMapping).find(([key]) =>
        personalityType.includes(key)
    )?.[1];

    const defaultPool = [
        'Sheryl Sandberg', 'Satya Nadella', 'Elon Musk', 'Jeff Bezos', 'Oprah Winfrey',
        'Barack Obama', 'Bill Gates', 'Warren Buffett', 'Steve Jobs', 'Indra Nooyi'
    ];

    const people = getRandomPeople(matchedList || defaultPool, 3);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row"
        >
            {/* Left Side: Confidence Score */}
            <div className="flex-1 p-6 md:p-10 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="mb-4 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Confidence Score</span>
                </div>

                <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-200 dark:text-slate-800" />
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
                            className="text-5xl font-oswald font-black text-slate-900 dark:text-white"
                        >
                            {confidenceScore}%
                        </motion.span>
                    </div>
                </div>

                <p className="text-center text-slate-600 dark:text-slate-400 text-sm max-w-xs leading-relaxed">
                    {reason || "High consistency in responses indicates reliable results."}
                </p>
            </div>

            {/* Right Side: Famous People */}
            <div className="flex-1 p-6 md:p-10 flex flex-col items-center justify-center bg-white dark:bg-slate-900">
                <div className="mb-8 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">You're in Good Company</span>
                </div>

                <div className="flex justify-center gap-4 md:gap-6 flex-wrap">
                    {people.slice(0, 3).map((person, index) => (
                        <motion.div
                            key={person}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + (index * 0.1) }}
                            className="flex flex-col items-center gap-3 group"
                        >
                            <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl font-bold text-slate-400 dark:text-slate-500 border-2 border-white dark:border-slate-700 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                                {person.charAt(0)}
                            </div>
                            <span className="font-medium text-slate-700 dark:text-slate-300 text-sm text-center max-w-[100px] leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {person}
                            </span>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-full">
                    <p className="text-xs font-medium text-indigo-600 dark:text-indigo-300">
                        Leaders who share your {personalityType.split(' ')[0]} traits
                    </p>
                </div>
            </div>
        </motion.div>
    );
};
