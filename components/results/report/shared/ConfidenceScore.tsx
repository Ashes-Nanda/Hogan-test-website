import React from 'react';
import { motion } from 'framer-motion';

interface ConfidenceScoreProps {
    confidenceScore: number;
    reason?: string;
    personalityType: string;
}

export const ConfidenceScore: React.FC<ConfidenceScoreProps> = ({ confidenceScore, reason }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
            className="bg-card rounded-2xl shadow-lg border border-border p-8 flex flex-col items-center justify-center text-center h-full transition-shadow duration-300"
        >
            <div className="mb-2 text-sm font-bold text-muted-foreground uppercase tracking-wider">Confidence Score</div>
            <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted/20" />
                    <motion.circle
                        cx="64" cy="64" r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={351.86}
                        initial={{ strokeDashoffset: 351.86 }}
                        animate={{ strokeDashoffset: 351.86 * (1 - confidenceScore / 100) }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="text-emerald-500"
                    />
                </svg>
                <div className="absolute flex flex-col items-center">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="text-4xl font-heading text-foreground"
                    >
                        {confidenceScore}%
                    </motion.span>
                </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">{reason || "High consistency in responses indicates reliable results."}</p>
        </motion.div>
    );
};
