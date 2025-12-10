import React from 'react';

export const FamousPeopleSection: React.FC<{ personalityType: string }> = ({ personalityType }) => {
    const famousPeopleMapping: Record<string, string[]> = {
        'Ambition': ['Napoleon Bonaparte', 'Sheryl Sandberg', 'Satya Nadella'],
        'Inquisitive': ['Elon Musk', 'Steve Jobs', 'Jeff Bezos', 'Marie Curie', 'Leonardo da Vinci'],
        'Prudence': ['Warren Buffett', 'Angela Merkel', 'Tim Cook'],
        'Interpersonal Sensitivity': ['Indra Nooyi', 'Nelson Mandela', 'Mother Teresa'],
        'Adjustment': ['Barack Obama', 'Captain Sully', 'Neil Armstrong'],
        'Sociability': ['Bill Clinton', 'Richard Branson', 'Will Smith'],
        'Learning Approach': ['Bill Gates', 'Albert Einstein', 'Isaac Newton']
    };

    const personImages: Record<string, string> = {
        'Angela Merkel': '/AngelaMerkel.jpg',
        'Captain Sully': '/CaptainSully.jpg',
        'Indra Nooyi': '/IndraNooyi.jpg',
        'Marie Curie': '/MarieCurie.jpg',
        'Richard Branson': '/RichardBranson.jpg',
        'Satya Nadella': '/SatyaNadella.jpg',
        'Sheryl Sandberg': '/SherylSandberg.jpg'
    };

    // Find matching people or default to a mix of leaders
    const people = Object.entries(famousPeopleMapping).find(([key]) =>
        personalityType.includes(key)
    )?.[1] || ['Sheryl Sandberg', 'Satya Nadella', 'Indra Nooyi'];

    return (
        <section className="container py-16 text-center">
            <h3 className="text-xl font-heading text-muted-foreground uppercase tracking-widest mb-8">You're in good company</h3>
            <div className="flex justify-center gap-8 flex-wrap">
                {people.slice(0, 3).map((person) => (
                    <div key={person} className="flex flex-col items-center gap-2">
                        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-2xl font-bold text-muted-foreground border-2 border-border shadow-sm overflow-hidden relative group">
                            {/* Initials (Always rendered, visible if image missing/hidden) */}
                            <span className="absolute inset-0 flex items-center justify-center z-0">
                                {person.charAt(0)}
                            </span>

                            {/* Image (Layers on top, hides itself on error) */}
                            {personImages[person] && (
                                <img
                                    src={personImages[person]}
                                    alt={person}
                                    className="w-full h-full object-cover relative z-10 transition-opacity duration-300"
                                    onError={(e) => {
                                        e.currentTarget.style.opacity = '0';
                                    }}
                                />
                            )}
                        </div>
                        <span className="font-medium text-foreground">{person}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};
