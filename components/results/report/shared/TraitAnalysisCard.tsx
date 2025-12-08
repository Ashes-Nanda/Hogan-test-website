import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle, AlertCircle, Zap, Info } from 'lucide-react';

interface TraitAnalysisCardProps {
    traitName: string;
    score: number;
    theme: 'blue' | 'orange' | 'green' | 'purple';
    definition?: string;
    interpretation?: string;
    strengths?: string[];
    watchOuts?: string[];
    microAction?: string;
}

export const TraitAnalysisCard: React.FC<TraitAnalysisCardProps> = ({
    traitName,
    score,
    theme,
    definition = "Detailed definition pending...",
    interpretation = "Your score indicates specific behavioral patterns in this area.",
    strengths = ["Strength 1 pending analysis", "Strength 2 pending analysis"],
    watchOuts = ["Watch-out 1 pending analysis", "Watch-out 2 pending analysis"],
    microAction = "Specific micro-habit suggestion pending analysis."
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const themeConfig = {
        blue: { main: 'bg-blue-600', light: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: 'text-blue-500' },
        orange: { main: 'bg-orange-500', light: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', icon: 'text-orange-500' },
        green: { main: 'bg-green-500', light: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', icon: 'text-green-500' },
        purple: { main: 'bg-purple-600', light: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', icon: 'text-purple-500' },
    }[theme];

    return (
        <div className={`border ${themeConfig.border} rounded-xl overflow-hidden bg-white mb-4 shadow-sm transition-all duration-300 hover:shadow-md`}>
            {/* Header / Snapshot */}
            <div
                className="p-4 flex items-center justify-between cursor-pointer group bg-gradient-to-r from-transparent to-slate-50/50"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-4 flex-1">
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-oswald font-bold text-lg text-slate-800">{traitName}</h4>
                            <span className={`font-bold ${themeConfig.text} bg-white px-2 py-0.5 rounded shadow-sm border ${themeConfig.border}`}>
                                {score}%
                            </span>
                        </div>
                        {/* Progress Bar */}
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${score}%` }}
                                transition={{ duration: 0.8 }}
                                className={`h-full ${themeConfig.main}`}
                            />
                        </div>
                    </div>
                </div>

                <button className={`ml-4 p-1 rounded-full ${themeConfig.light} ${themeConfig.text} transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDown size={20} />
                </button>
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden bg-slate-50/30"
                    >
                        <div className="p-5 border-t border-slate-100 space-y-6">

                            {/* Interpretation */}
                            <div className="flex gap-3">
                                <Info className={`shrink-0 mt-1 ${themeConfig.icon}`} size={18} />
                                <div>
                                    <h5 className={`text-sm font-bold uppercase tracking-wider mb-1 ${themeConfig.text}`}>Interpretation</h5>
                                    <p className="text-sm text-slate-600 leading-relaxed">{interpretation}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Strengths */}
                                <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100/50">
                                    <h5 className="text-sm font-bold uppercase tracking-wider mb-3 text-emerald-700 flex items-center gap-2">
                                        <CheckCircle size={16} /> Strengths
                                    </h5>
                                    <ul className="space-y-2">
                                        {strengths.map((s, i) => (
                                            <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                                                {s}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Watch-outs */}
                                <div className="bg-amber-50/50 p-4 rounded-lg border border-amber-100/50">
                                    <h5 className="text-sm font-bold uppercase tracking-wider mb-3 text-amber-700 flex items-center gap-2">
                                        <AlertCircle size={16} /> Watch-outs
                                    </h5>
                                    <ul className="space-y-2">
                                        {watchOuts.map((w, i) => (
                                            <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                                                {w}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Micro-Action */}
                            <div className={`p-4 rounded-lg border ${themeConfig.border} ${themeConfig.light} flex gap-3 items-start`}>
                                <Zap className={`shrink-0 mt-0.5 ${themeConfig.icon}`} size={18} />
                                <div>
                                    <h5 className={`text-sm font-bold uppercase tracking-wider mb-1 ${themeConfig.text}`}>Micro-Action</h5>
                                    <p className="text-sm text-slate-700 italic">"{microAction}"</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
