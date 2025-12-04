import React from 'react';
import { Calendar } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface DailyHabitsSectionProps {
    firstname: string | null;
    dailyHabits: any;
    personalityType: string;
    sectionNumber: number;
    id: string;
    isPaidUser: boolean;
    testType: string;
}

export const DailyHabitsSection: React.FC<DailyHabitsSectionProps> = ({ id }) => {
    const habits = [
        { time: 'Morning', title: 'Strategic Focus', desc: 'Review your top 3 priorities before checking email to leverage your Ambition.' },
        { time: 'Afternoon', title: 'Collaborative Bursts', desc: 'Schedule meetings in the early afternoon when your Sociability is most effective.' },
        { time: 'Evening', title: 'Structured Review', desc: 'Use your Prudence to review the day\'s achievements and plan for tomorrow.' }
    ];

    return (
        <section id={id} className="container py-16">
            <SectionHeader title="Daily Habits" subtitle="Optimizing your performance through routine." icon={Calendar} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {habits.map((habit) => (
                    <div key={habit.time} className="bg-card p-6 rounded-xl border border-border shadow-sm">
                        <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">{habit.time}</div>
                        <h4 className="text-lg font-bold text-foreground mb-2">{habit.title}</h4>
                        <p className="text-sm text-muted-foreground">{habit.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
