import React from 'react';
import { motion } from 'framer-motion';

interface TraitRowProps {
    name: string;
    score: number;
    theme: 'blue' | 'orange' | 'green' | 'purple';
}

export const TraitRow: React.FC<TraitRowProps> = ({ name, score, theme }) => {
    const color = theme === 'blue' ? 'bg-blue-600' : theme === 'orange' ? 'bg-orange-500' : theme === 'green' ? 'bg-green-500' : 'bg-purple-600';
    return (
        <div className="mb-4 last:mb-0">
            <div className="flex justify-between text-sm font-medium mb-1">
                <span className="text-foreground">{name}</span>
                <span className="text-muted-foreground">{score}%</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${score}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${color} rounded-full`}
                />
            </div>
        </div>
    );
};
