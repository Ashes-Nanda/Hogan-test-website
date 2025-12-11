import React from 'react';
import { Briefcase, CheckCircle, Activity, Quote, Target, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { motion } from 'framer-motion';

interface CareerSectionData {
    workEnvironmentFit: string;
    leadershipStyle: { dimension: string; description: string }[];
    recommendedRoles: { role: string; matchPercentage: number; explanation: string }[];
}

interface CareerPathSectionProps {
    firstname: string | null;
    career: {
        summary: string;
        superpowers: any[];
        growthAreas: any[];
        actionSteps: any[];
        suggestions: {
            title: string;
            description: string;
            matchPercentage: number;
            qualityMatches: any[];
        }[];
    };
    careerData?: CareerSectionData;
    personalityType: string;
    testType: string;
    sectionNumber: number;
    id: string;
    isPaidUser: boolean;
}

export const CareerPathSection: React.FC<CareerPathSectionProps> = ({ career, careerData }) => {
    const radarData = [
        { subject: 'Strategy', A: 80, fullMark: 100 },
        { subject: 'Execution', A: 65, fullMark: 100 },
        { subject: 'People', A: 90, fullMark: 100 },
        { subject: 'Innovation', A: 70, fullMark: 100 },
        { subject: 'Data', A: 50, fullMark: 100 },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
    };

    return (
        <section id="career-path" className="bg-slate-50/50 py-24 border-y border-border break-before-page overflow-hidden">
            <div className="container">
                <SectionHeader title="Career Path" subtitle="Professional trajectory and interpersonal dynamics." icon={Briefcase} />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12"
                >
                    {/* 1. LEADERSHIP STYLE (Main Feature - Top Row Full Width) */}
                    <motion.div
                        variants={itemVariants}
                        className="col-span-1 lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300 group"
                    >
                        <div className="flex flex-col md:flex-row gap-10 items-center">
                            {/* Chart Side */}
                            <div className="w-full md:w-1/3 flex flex-col items-center justify-center bg-slate-50 rounded-2xl p-6 border border-slate-100 relative">
                                <h3 className="font-heading text-lg mb-4 flex items-center gap-2 text-slate-800 z-10 w-full">
                                    <Activity className="text-primary" size={20} /> Leadership Style
                                </h3>
                                <div className="w-full h-[360px] relative z-10">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                            <PolarGrid stroke="#e2e8f0" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} />
                                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                            <Radar name="You" dataKey="A" stroke="#4f46e5" strokeWidth={3} fill="#6366f1" fillOpacity={0.2} />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Insight Side */}
                            <div className="w-full md:w-2/3">
                                <div className="mb-6">
                                    <h4 className="text-2xl font-heading text-slate-900 mb-2">How you lead.</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed">Your natural disposition when guiding teams and making decisions.</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {careerData ? (
                                        careerData.leadershipStyle.map((style, idx) => (
                                            <motion.div
                                                key={idx}
                                                whileHover={{ y: -2 }}
                                                className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:border-indigo-100 transition-colors"
                                            >
                                                <h5 className="font-bold text-indigo-700 text-xs uppercase tracking-wide mb-2">{style.dimension}</h5>
                                                <p className="text-sm text-slate-600 leading-relaxed font-medium line-clamp-3">{style.description}</p>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-slate-500">Analysis pending...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* 2. WORK ENVIRONMENT (Bottom Row - Left) */}
                    <motion.div
                        variants={itemVariants}
                        className="col-span-1 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <Briefcase size={20} />
                            </div>
                            <h3 className="font-heading text-xl text-slate-800">Ideal Environment</h3>
                        </div>

                        <div className="flex-grow relative bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col justify-center items-center text-center group-hover:bg-indigo-50/30 transition-colors">
                            <Quote className="absolute top-6 left-6 text-indigo-200/50 transform scale-x-[-1]" size={48} />
                            <Quote className="absolute bottom-6 right-6 text-indigo-200/50" size={48} />

                            <p className="relative z-10 text-slate-700 leading-relaxed italic text-lg px-4">
                                {careerData ? careerData.workEnvironmentFit : career.summary}
                            </p>
                        </div>
                    </motion.div>

                    {/* 3. RECOMMENDED ROLES (Bottom Row - Right) */}
                    <motion.div
                        variants={itemVariants}
                        className="col-span-1 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 border border-emerald-100 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 h-full relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-5">
                            <Target size={120} className="text-emerald-900" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                                    <CheckCircle size={20} />
                                </div>
                                <h3 className="font-heading text-xl text-slate-800">Best Fit Roles</h3>
                            </div>

                            <div className="space-y-3">
                                {careerData ? (
                                    careerData.recommendedRoles.map((job, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ x: 4 }}
                                            className="flex items-center justify-between p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-emerald-100/60 shadow-sm hover:border-emerald-200 transition-all cursor-default"
                                        >
                                            <span className="font-bold text-slate-700">{job.role}</span>
                                            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-md">
                                                {job.matchPercentage}%
                                            </span>
                                        </motion.div>
                                    ))
                                ) : (
                                    career.suggestions.map((job, i) => (
                                        <div key={i} className="p-4 bg-slate-50 rounded-lg">
                                            <span className="font-medium text-slate-700">{job.title}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
