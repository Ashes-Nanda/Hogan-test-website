import React from 'react';
import { Star, Download, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { CircularProgress } from '@/components/ui/CircularProgress';

interface HoganHeroSectionProps {
    hpiScores: any;
    hoganProfile: string;
    leadershipPotential: number;
    firstname?: string;
    completionDate: string;
    onDownload?: () => void;
}

export const HoganHeroSection: React.FC<HoganHeroSectionProps> = ({ hpiScores, hoganProfile, firstname, onDownload }) => {
    const topHpi = Object.entries(hpiScores as Record<string, any>)
        .sort(([, a], [, b]) => b.percentage - a.percentage)
        .slice(0, 5);

    return (
        <section className="relative w-full bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-600 text-white overflow-hidden py-20 lg:py-28">
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-400/30 rounded-full blur-3xl pointer-events-none"
            />

            <div className="container relative z-10 flex flex-col items-center text-center">
                <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-sm font-bold uppercase tracking-widest text-white">
                    <Star size={14} className="text-yellow-300 fill-yellow-300" />
                    <span>Comprehensive Leadership Profile</span>
                </div>

                <h1 className="text-4xl md:text-7xl font-oswald font-black mb-6 leading-none tracking-tight text-white drop-shadow-md">
                    {hoganProfile}
                </h1>

                <p className="text-xl md:text-2xl text-white/90 max-w-2xl font-light mb-12">
                    Prepared exclusively for <span className="font-semibold text-white">{firstname || 'User'}</span>
                </p>



                <div className="flex flex-wrap justify-center gap-6 w-full max-w-5xl">
                    {topHpi.map(([name, score], index) => (
                        <motion.div
                            key={name}
                            className="flex-1 min-w-[140px] max-w-[200px]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            whileHover={{ y: -5, scale: 1.05 }}
                        >
                            <GlassCard className="p-4 flex flex-col items-center cursor-default h-full justify-center bg-white/10 border-white/20 hover:bg-white/20 transition-colors duration-300 group">
                                <div className="mb-3 relative">
                                    <CircularProgress
                                        value={score.percentage}
                                        size={80}
                                        strokeWidth={6}
                                        color="#ffffff"
                                        trackColor="rgba(255,255,255,0.15)"
                                    >
                                        <div className="flex flex-col items-center justify-center">
                                            <span className="text-xl font-oswald font-bold text-white leading-none">
                                                {score.percentage}<span className="text-xs align-top">%</span>
                                            </span>
                                        </div>
                                    </CircularProgress>

                                    {/* Glow effect behind circle */}
                                    <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                                </div>

                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-xs uppercase tracking-wider font-bold text-white/90 text-center">{name}</span>
                                    <div className="h-0.5 w-0 bg-white/50 group-hover:w-8 transition-all duration-300 rounded-full" />
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 flex justify-center w-full px-4 sm:px-0">
                    <button onClick={onDownload} className="bg-white text-indigo-900 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-colors shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto">
                        <Download size={18} /> Download PDF
                    </button>
                </div>
            </div>
        </section>
    );
};
