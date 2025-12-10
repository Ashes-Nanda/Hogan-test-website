import React from 'react';
import { Target } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface ActionPlanSectionProps {
    username: string | null;
    firstname: string | null;
    resultData: any;
    hoganProfile: string;
    actionItems?: { title: string; body: string; type: string }[]; // Updated prop
    sectionNumber: number;
    id: string;
}

export const ActionPlanSection: React.FC<ActionPlanSectionProps> = ({ id, actionItems }) => {

    // Default fallback
    const stepsToDisplay = actionItems || [
        { title: "Leverage Ambition", body: "Take on a new leadership project to utilize your drive.", type: "Growth" },
        { title: "Manage Excitability", body: "Practice a 10-second pause before reacting to stressful news.", type: "Regulation" },
        { title: "Mentor Others", body: "Utilize your Interpersonal Sensitivity to mentor a junior team member.", type: "Social" }
    ];

    return (
        <section id={id} className="bg-slate-50 py-16 border-y border-border break-inside-avoid">
            <div className="container">
                <SectionHeader title="Action Plan" subtitle="Turn insights into results." icon={Target} />

                <div className="space-y-6 max-w-4xl mx-auto mt-12">
                    <h3 className="text-xl font-heading mb-4">Strategic Steps</h3>
                    {stepsToDisplay.map((step, i) => (
                        <div key={i} className="flex gap-5 p-5 bg-white rounded-xl border-l-4 border-primary shadow-sm hover:shadow-md transition-all">
                            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-lg">
                                {i + 1}
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-bold text-foreground">Action Step {i + 1}: {step.title}</h4>
                                    <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full uppercase tracking-wider font-bold">{step.type}</span>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed">{step.body}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default ActionPlanSection;
