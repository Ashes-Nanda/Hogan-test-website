import React from 'react';

export const FamousPeopleSection: React.FC<{ personalityType: string }> = ({ personalityType }) => {
    return (
        <section className="container py-16 text-center">
            <h3 className="text-xl font-oswald font-bold text-muted-foreground uppercase tracking-widest mb-8">You're in good company</h3>
            <div className="flex justify-center gap-8 flex-wrap">
                {['Elon Musk', 'Sheryl Sandberg', 'Satya Nadella'].map((person) => (
                    <div key={person} className="flex flex-col items-center gap-2">
                        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-2xl font-bold text-muted-foreground">
                            {person.charAt(0)}
                        </div>
                        <span className="font-medium text-foreground">{person}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};
