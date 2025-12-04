import React from 'react';
import { CheckCircle } from 'lucide-react';

interface GrowthSectionProps {
    firstname: string | null;
    growth: any;
    personalityType: string;
    sectionNumber: number;
    id: string;
    isPaidUser: boolean;
    testType: string;
}

export const GrowthSection: React.FC<GrowthSectionProps> = ({ id }) => {
    return (
        <section id={id} className="bg-slate-900 text-white py-20 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full blur-3xl"></div>
            </div>

            <div className="container relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-oswald font-bold mb-4">Your Growth Journey</h2>
                    <p className="text-white/60 max-w-2xl mx-auto">A roadmap to unlocking your full leadership potential based on your unique profile.</p>
                </div>

                <div className="relative pt-12">
                    {/* Timeline Line */}
                    <div className="hidden md:block absolute top-[24px] left-0 w-full h-0.5 bg-white/10"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Phase 1 */}
                        <div className="relative group">
                            {/* Marker */}
                            <div className="hidden md:flex absolute top-[-24px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-slate-900 border-4 border-blue-500 rounded-full z-10 items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            {/* Card */}
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 h-full">
                                <div className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-2">Phase 1: Immediate</div>
                                <h3 className="text-xl font-bold mb-4">Awareness & Quick Wins</h3>
                                <ul className="space-y-3 text-sm text-white/70">
                                    <li className="flex gap-2"><CheckCircle size={14} className="text-blue-400 shrink-0 mt-1" /> Review "Risk Factors" report</li>
                                    <li className="flex gap-2"><CheckCircle size={14} className="text-blue-400 shrink-0 mt-1" /> Identify top 2 strengths to leverage</li>
                                    <li className="flex gap-2"><CheckCircle size={14} className="text-blue-400 shrink-0 mt-1" /> Share profile with a mentor</li>
                                </ul>
                            </div>
                        </div>

                        {/* Phase 2 */}
                        <div className="relative group">
                            {/* Marker */}
                            <div className="hidden md:flex absolute top-[-24px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-slate-900 border-4 border-purple-500 rounded-full z-10 items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            {/* Card */}
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 h-full">
                                <div className="text-purple-400 font-bold uppercase tracking-widest text-xs mb-2">Phase 2: Short Term</div>
                                <h3 className="text-xl font-bold mb-4">Skill Development</h3>
                                <ul className="space-y-3 text-sm text-white/70">
                                    <li className="flex gap-2"><CheckCircle size={14} className="text-purple-400 shrink-0 mt-1" /> Practice the "10-second pause"</li>
                                    <li className="flex gap-2"><CheckCircle size={14} className="text-purple-400 shrink-0 mt-1" /> Seek feedback on communication</li>
                                    <li className="flex gap-2"><CheckCircle size={14} className="text-purple-400 shrink-0 mt-1" /> Optimize daily habits</li>
                                </ul>
                            </div>
                        </div>

                        {/* Phase 3 */}
                        <div className="relative group">
                            {/* Marker */}
                            <div className="hidden md:flex absolute top-[-24px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-slate-900 border-4 border-emerald-500 rounded-full z-10 items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            {/* Card */}
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 h-full">
                                <div className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2">Phase 3: Long Term</div>
                                <h3 className="text-xl font-bold mb-4">Mastery & Leadership</h3>
                                <ul className="space-y-3 text-sm text-white/70">
                                    <li className="flex gap-2"><CheckCircle size={14} className="text-emerald-400 shrink-0 mt-1" /> Mentor others with similar profiles</li>
                                    <li className="flex gap-2"><CheckCircle size={14} className="text-emerald-400 shrink-0 mt-1" /> Lead high-stakes projects</li>
                                    <li className="flex gap-2"><CheckCircle size={14} className="text-emerald-400 shrink-0 mt-1" /> Re-assess profile annually</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
