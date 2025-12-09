import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle, AlertCircle, Zap, Info, Eye, Heart, Anchor, Activity, Brain, Target, ShieldAlert } from 'lucide-react';

interface TraitAnalysisCardProps {
    traitName: string;
    score: number;
    theme: 'blue' | 'orange' | 'green' | 'purple';
    traitLabel?: string;
    definition?: string;
    interpretation?: string;

    // HPI Specific
    innerExperience?: string;
    atWork?: string;
    underPressure?: string;

    // HDS Specific
    triggers?: string; // mapped from triggerConditions
    behaviorUnderStress?: string;
    regulationStrategies?: string;

    // MVPI Specific
    drivers?: string;
    workBehaviour?: string;

    // HBRI Specific
    coreThinkingStyle?: string;
    problemSolving?: string;
    collaborationImpact?: string;

    // Shared / Mappable Lists
    strengths?: string[]; // HPI strengths, HDS strengthExpressions, MVPI strengthSituations, HBRI strengthSituations
    watchOuts?: string[]; // HPI watchOuts, HDS frictionPatterns, MVPI tensionSituations, HBRI blindSpots

    // Social & Insight
    socialImpact?: string; // shared across all
    traitInteractionInsight?: string; // HPI, HDS, MVPI interaction

    // Action
    microAction?: string;
}

export const TraitAnalysisCard: React.FC<TraitAnalysisCardProps> = ({
    traitName,
    score,
    theme,
    traitLabel,
    definition,
    interpretation = "Analysis pending...",

    innerExperience,
    atWork,
    underPressure,

    triggers,
    behaviorUnderStress,
    regulationStrategies,

    drivers,
    workBehaviour,

    coreThinkingStyle,
    problemSolving,
    collaborationImpact,

    strengths = [],
    watchOuts = [],

    socialImpact,
    traitInteractionInsight,
    microAction
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const themeConfig = {
        blue: { main: 'bg-blue-600', light: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: 'text-blue-500' },
        orange: { main: 'bg-orange-500', light: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', icon: 'text-orange-500' },
        green: { main: 'bg-green-500', light: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', icon: 'text-green-500' },
        purple: { main: 'bg-purple-600', light: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', icon: 'text-purple-500' },
    }[theme];

    // Helper to determine what "Inner / Core" content to show
    const getCoreContent = () => {
        if (innerExperience) return { label: "Inner Experience", text: innerExperience, icon: Heart };
        if (drivers) return { label: "Performance Drivers", text: drivers, icon: Target };
        if (coreThinkingStyle) return { label: "Core Thinking Style", text: coreThinkingStyle, icon: Brain };
        if (triggers) return { label: "Trigger Conditions", text: triggers, icon: ShieldAlert };
        return null;
    };

    // Helper for "At Work / Behavior" content
    const getWorkContent = () => {
        if (atWork) return { label: "At Work", text: atWork };
        if (workBehaviour) return { label: "Work Behaviour", text: workBehaviour };
        if (behaviorUnderStress) return { label: "Behavior Under Stress", text: behaviorUnderStress };
        if (problemSolving) return { label: "Problem Solving Style", text: problemSolving };
        return null;
    };

    const core = getCoreContent();
    const work = getWorkContent();

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
                            <div className="flex items-center gap-2">
                                <h4 className="font-oswald font-bold text-lg text-slate-800">{traitName}</h4>
                                {traitLabel && (
                                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                        {traitLabel}
                                    </span>
                                )}
                            </div>
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

                            {/* 1. CORE INTERPRETATION */}
                            <div className="flex gap-3">
                                <Info className={`shrink-0 mt-1 ${themeConfig.icon}`} size={18} />
                                <div>
                                    <h5 className={`text-sm font-bold uppercase tracking-wider mb-1 ${themeConfig.text}`}>Interpretation</h5>
                                    <p className="text-sm text-slate-600 leading-relaxed">{interpretation || definition}</p>
                                </div>
                            </div>

                            {/* 2. INNER / DRIVERS / THINKING */}
                            {core && (
                                <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm flex gap-3">
                                    <core.icon className={`shrink-0 mt-1 ${theme === 'orange' ? 'text-orange-500' : 'text-slate-500'}`} size={18} />
                                    <div>
                                        <h5 className="text-sm font-bold uppercase tracking-wider mb-1 text-slate-700">
                                            {core.label}
                                        </h5>
                                        <p className="text-sm text-slate-600 italic">"{core.text}"</p>
                                    </div>
                                </div>
                            )}

                            {/* 3. WORK BEHAVIOR / PROBLEM SOLVING / STRESS BEHAVIOR */}
                            {work && (
                                <div className="p-3 bg-slate-50 rounded-lg text-sm text-slate-700 flex gap-2 items-start">
                                    <BriefcaseIcon theme={theme} />
                                    <span>
                                        <strong>{work.label}:</strong> {work.text}
                                    </span>
                                </div>
                            )}

                            {/* 4. SOCIAL / COLLABORATION IMPACT */}
                            {(socialImpact || collaborationImpact) && (
                                <div className="p-3 bg-slate-50 rounded-lg text-sm text-slate-700 flex gap-2 items-start">
                                    <Eye className="shrink-0 mt-0.5 text-indigo-400" size={16} />
                                    <span>
                                        <strong>Social Impact:</strong> {socialImpact || collaborationImpact}
                                    </span>
                                </div>
                            )}

                            {/* 5. STRENGTHS & RISKS GRID */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Strengths */}
                                <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100/50">
                                    <h5 className="text-sm font-bold uppercase tracking-wider mb-3 text-emerald-700 flex items-center gap-2">
                                        <CheckCircle size={16} /> {theme === 'orange' ? 'Postive Expressions' : 'Strengths'}
                                    </h5>
                                    <ul className="space-y-2">
                                        {strengths.length > 0 ? strengths.map((s, i) => (
                                            <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                                                {s}
                                            </li>
                                        )) : <li className="text-sm text-slate-400 italic">None listed</li>}
                                    </ul>
                                </div>

                                {/* Watch-outs / Frictions */}
                                <div className="bg-amber-50/50 p-4 rounded-lg border border-amber-100/50">
                                    <h5 className="text-sm font-bold uppercase tracking-wider mb-3 text-amber-700 flex items-center gap-2">
                                        <AlertCircle size={16} /> {theme === 'orange' ? 'Friction Patterns' : 'Watch-outs'}
                                    </h5>
                                    <ul className="space-y-2">
                                        {watchOuts.length > 0 ? watchOuts.map((w, i) => (
                                            <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                                                {w}
                                            </li>
                                        )) : <li className="text-sm text-slate-400 italic">None listed</li>}
                                    </ul>
                                </div>
                            </div>

                            {/* 6. INSIGHTS & ACTIONS */}
                            <div className="space-y-3">
                                {/* Trait Interaction / Recovery */}
                                {(traitInteractionInsight || regulationStrategies) && (
                                    <div className="p-3 bg-blue-50/50 rounded-lg text-sm text-slate-700 flex gap-2 items-start border border-blue-100">
                                        <Activity className="shrink-0 mt-0.5 text-blue-500" size={16} />
                                        <span>
                                            <strong>{regulationStrategies ? "Regulation Strategy:" : "Trait Interaction:"}</strong> {traitInteractionInsight || regulationStrategies}
                                        </span>
                                    </div>
                                )}

                                {/* Micro-Action */}
                                <div className={`p-4 rounded-lg border ${themeConfig.border} ${themeConfig.light} flex gap-3 items-start`}>
                                    <Zap className={`shrink-0 mt-0.5 ${themeConfig.icon}`} size={18} />
                                    <div>
                                        <h5 className={`text-sm font-bold uppercase tracking-wider mb-1 ${themeConfig.text}`}>Micro-Action</h5>
                                        <p className="text-sm text-slate-700 italic">"{microAction}"</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const BriefcaseIcon = ({ theme }: { theme: string }) => {
    const color = theme === 'orange' ? 'text-orange-500' : 'text-slate-500';
    return <Anchor className={`shrink-0 mt-0.5 ${color}`} size={16} />;
};
