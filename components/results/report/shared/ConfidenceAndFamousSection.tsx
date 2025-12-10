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

    const famousPeopleImages: Record<string, string> = {
        'Elon Musk': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/220px-Elon_Musk_Royal_Society_%28crop2%29.jpg',
        'Jeff Bezos': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_%2839074799225%29_%28cropped%29.jpg/220px-Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_%2839074799225%29_%28cropped%29.jpg',
        'Steve Jobs': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/220px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg',
        'Bill Gates': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Bill_Gates_2017_%28cropped%29.jpg/220px-Bill_Gates_2017_%28cropped%29.jpg',
        'Warren Buffett': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Warren_Buffett_KU_Visit.jpg/220px-Warren_Buffett_KU_Visit.jpg',
        'Barack Obama': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/220px-President_Barack_Obama.jpg',
        'Oprah Winfrey': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Oprah_in_2014.jpg/220px-Oprah_in_2014.jpg',
        'Sheryl Sandberg': '/SherylSandberg.jpg',
        'Satya Nadella': '/SatyaNadella.jpg',
        'Indra Nooyi': '/IndraNooyi.jpg',
        'Napoleon Bonaparte': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg/220px-Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg',
        'Angela Merkel': '/AngelaMerkel.jpg',
        'Tim Cook': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Tim_Cook_2009_cropped.jpg/220px-Tim_Cook_2009_cropped.jpg',
        'Queen Elizabeth II': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Queen_Elizabeth_II_in_March_2015.jpg/220px-Queen_Elizabeth_II_in_March_2015.jpg',
        'Mahatma Gandhi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Mahatma-Gandhi-studio-1931.jpg/220px-Mahatma-Gandhi-studio-1931.jpg',
        'Albert Einstein': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/220px-Albert_Einstein_Head.jpg',
        'Winston Churchill': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Sir_Winston_Churchill_-_19086236948.jpg/220px-Sir_Winston_Churchill_-_19086236948.jpg',
        'Nelson Mandela': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Nelson_Mandela_1994.jpg/220px-Nelson_Mandela_1994.jpg',
        'Abraham Lincoln': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg/220px-Abraham_Lincoln_O-77_matte_collodion_print.jpg',
        'Margaret Thatcher': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Margaret_Thatcher.png/220px-Margaret_Thatcher.png',
        'Richard Branson': '/RichardBranson.jpg',
        'Captain Sully': '/CaptainSully.jpg',
        'Marie Curie': '/MarieCurie.jpg'
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

    const [imagesLoaded, setImagesLoaded] = React.useState(false);

    React.useEffect(() => {
        const preloadImages = async () => {
            const promises = people.slice(0, 3).map(person => {
                return new Promise<void>((resolve) => {
                    const src = famousPeopleImages[person];
                    if (!src) {
                        resolve();
                        return;
                    }
                    const img = new Image();
                    img.src = src;
                    img.onload = () => resolve();
                    img.onerror = () => resolve(); // Resolve even on error to not block
                });
            });

            await Promise.all(promises);
            setImagesLoaded(true);
        };

        preloadImages();
    }, [people.map(p => p).join(',')]); // Stable dependency

    return (
        <section className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Confidence Score Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 md:p-10 flex flex-col items-center justify-center relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600" />

                    <div className="mb-8 flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Confidence Score</span>
                    </div>

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

                    <p className="text-center text-slate-600 dark:text-slate-400 text-sm max-w-xs leading-relaxed">
                        {reason || "High consistency in responses indicates reliable results."}
                    </p>
                </motion.div>

                {/* You're in Good Company Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 md:p-10 flex flex-col items-center justify-center relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-400 to-indigo-600" />

                    <div className="mb-8 flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                        <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">You're in Good Company</span>
                    </div>

                    <div className="flex justify-center gap-4 md:gap-6 flex-wrap mb-8">
                        {imagesLoaded ? (
                            people.slice(0, 3).map((person, index) => (
                                <motion.div
                                    key={person}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex flex-col items-center gap-3 group"
                                >
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-xl md:text-2xl font-bold text-slate-400 dark:text-slate-500 border-2 border-slate-100 dark:border-slate-700 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300 group-hover:border-indigo-100 dark:group-hover:border-indigo-900 overflow-hidden relative">
                                        {famousPeopleImages[person] ? (
                                            <img
                                                src={famousPeopleImages[person]}
                                                alt={person}
                                                className="w-full h-full object-cover object-top"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                    e.currentTarget.parentElement?.classList.add('fallback-initials');
                                                }}
                                            />
                                        ) : null}
                                        <span className={`absolute inset-0 flex items-center justify-center ${famousPeopleImages[person] ? 'opacity-0' : 'opacity-100'} fallback-text`}>
                                            {person.charAt(0)}
                                        </span>
                                    </div>
                                    <span className="font-medium text-slate-700 dark:text-slate-300 text-xs md:text-sm text-center max-w-[100px] leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                        {person}
                                    </span>
                                </motion.div>
                            ))
                        ) : (
                            // Loading Skeletons
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="flex flex-col items-center gap-3">
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse" />
                                    <div className="h-4 w-20 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                                </div>
                            ))
                        )}
                    </div>

                    <div className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-full">
                        <p className="text-xs font-medium text-indigo-600 dark:text-indigo-300">
                            Leaders who share your {personalityType.split(' ')[0]} traits
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
