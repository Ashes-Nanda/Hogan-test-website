import React from 'react';

export const FamousPeopleSection: React.FC<{ personalityType: string }> = ({ personalityType }) => {
    const famousPeopleMapping: Record<string, string[]> = {
        'Ambition': ['Napoleon Bonaparte', 'Sheryl Sandberg', 'Satya Nadella'],
        'Inquisitive': ['Elon Musk', 'Steve Jobs', 'Jeff Bezos', 'Marie Curie', 'Leonardo da Vinci'],
        'Prudence': ['Warren Buffett', 'Angela Merkel', 'Tim Cook'],
        'Interpersonal Sensitivity': ['Oprah Winfrey', 'Nelson Mandela', 'Mother Teresa'],
        'Adjustment': ['Barack Obama', 'Captain Sully', 'Neil Armstrong'],
        'Sociability': ['Bill Clinton', 'Richard Branson', 'Will Smith'],
        'Learning Approach': ['Bill Gates', 'Albert Einstein', 'Isaac Newton']
    };

    // Find matching people or default to a mix of leaders
    const people = Object.entries(famousPeopleMapping).find(([key]) =>
        personalityType.includes(key)
    )?.[1] || ['Sheryl Sandberg', 'Satya Nadella', 'Elon Musk'];

    return (
        <section className="container py-16 text-center">
            <h3 className="text-xl font-oswald font-bold text-muted-foreground uppercase tracking-widest mb-8">You're in good company</h3>
            <div className="flex justify-center gap-8 flex-wrap">
                {people.slice(0, 3).map((person) => (
                    <div key={person} className="flex flex-col items-center gap-2">
                        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-2xl font-bold text-muted-foreground border-2 border-border shadow-sm">
                            {person.charAt(0)}
                        </div>
                        <span className="font-medium text-foreground">{person}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};
