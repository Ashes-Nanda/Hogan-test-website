import React from 'react';
import { motion } from 'framer-motion';
import { Battery, BatteryCharging, Clock, Users, MessageSquare, Layout } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

// Interface update
interface WorkStyleProps {
    id: string;
    sectionNumber: number;
    workStyle?: {
        rhythm: { title: string; body: string };
        team: { title: string; body: string };
        manager: { title: string; body: string };
        communication: { title: string; body: string };
        setup: { title: string; body: string };
    };
    energy?: {
        energisers: string[];
        drainers: string[];
    };
}

export const WorkStyleAndEnvironment: React.FC<WorkStyleProps> = ({
    id,
    workStyle,
    energy
}) => {

    // Default placeholders
    const style = workStyle || {
        rhythm: { title: "Ideal Rhythm", body: "Fast-paced, iterative sprints" },
        team: { title: "Team Environment", body: "Collaborative, high-energy environment" },
        manager: { title: "Manager Style", body: "Hands-off, results-oriented" },
        communication: { title: "Communication", body: "Direct, concise, face-to-face" },
        setup: { title: "Productivity Setup", body: "Open plan or flexible workspace" }
    };

    const energyFlow = energy || {
        energisers: ["Brainstorming sessions", "Leading initiatives", "Competitive goals"],
        drainers: ["Repetitive administrative tasks", "Slow decision making", "Isolation"]
    };

    return (
        <section id={id} className="container py-16 space-y-24 bg-slate-50/50">

            {/* Section 10: How You Work Best */}
            <div>
                <SectionHeader title="Work Style" subtitle="Optimizing your environment for peak performance." icon={Layout} />

                <div className="flex flex-wrap justify-center gap-6 mt-12">
                    <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                        <WorkCard icon={Clock} title="Ideal Rhythm" text={style.rhythm.body} color="blue" />
                    </div>
                    <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                        <WorkCard icon={Users} title="Team Environment" text={style.team.body} color="indigo" />
                    </div>
                    <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                        <WorkCard icon={UserIcon} title="Manager Style" text={style.manager.body} color="purple" />
                    </div>
                    <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                        <WorkCard icon={MessageSquare} title="Communication" text={style.communication.body} color="pink" />
                    </div>
                    <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                        <WorkCard icon={Layout} title="Productivity Setup" text={style.setup.body} color="teal" />
                    </div>
                </div>
            </div>

            {/* Section 12: Energisers & Drainers */}
            <div>
                <SectionHeader title="Energisers & Drainers" subtitle="Managing your motivational battery." icon={Battery} />

                <div className="mt-12 flex flex-col md:flex-row gap-6 items-stretch">
                    {/* Energisers */}
                    <motion.div
                        whileHover={{ y: -4 }}
                        className="flex-1 rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-8 shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
                                <BatteryCharging size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-heading text-emerald-800">Energises You</h3>
                                <p className="text-xs font-bold uppercase tracking-wider text-emerald-600/70">Green Zone</p>
                            </div>
                        </div>
                        <ul className="space-y-4">
                            {energyFlow.energisers.map((item, i) => (
                                <li key={i} className="flex gap-3 items-start text-emerald-900 font-medium">
                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Drainers */}
                    <motion.div
                        whileHover={{ y: -4 }}
                        className="flex-1 rounded-xl border border-rose-200 bg-gradient-to-br from-rose-50 to-orange-50 p-8 shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-rose-100 rounded-lg text-rose-600">
                                <Battery size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-heading text-rose-800">Drains You</h3>
                                <p className="text-xs font-bold uppercase tracking-wider text-rose-600/70">Red Zone</p>
                            </div>
                        </div>
                        <ul className="space-y-4">
                            {energyFlow.drainers.map((item, i) => (
                                <li key={i} className="flex gap-3 items-start text-rose-900 font-medium">
                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// Helper Icon Component wrapper to allow passing 'User' icon properly if needed or generic
const UserIcon = (props: any) => <Users {...props} />;

const WorkCard = ({ icon: Icon, title, text, color }: any) => {
    const colors = {
        blue: "bg-blue-50 text-blue-600 border-blue-100",
        indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
        purple: "bg-purple-50 text-purple-600 border-purple-100",
        pink: "bg-pink-50 text-pink-600 border-pink-100",
        teal: "bg-teal-50 text-teal-600 border-teal-100",
    }[color] || "bg-slate-50";

    return (
        <div className={`p-6 rounded-2xl border ${colors.split(' ')[2]} bg-white shadow-sm hover:shadow-md transition-all h-full`}>
            <div className={`w-12 h-12 rounded-xl ${colors.split(' ')[0]} ${colors.split(' ')[1]} flex items-center justify-center mb-4`}>
                <Icon size={24} />
            </div>
            <h4 className="font-heading text-slate-800 text-lg mb-2">{title}</h4>
            <p className="font-sans text-sm text-slate-600 leading-relaxed font-medium">{text}</p>
        </div>
    );
};
