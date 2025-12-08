import React from 'react';
import { Target } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface ActionPlanSectionProps {
    username: string | null;
    firstname: string | null;
    resultData: any;
    hoganProfile: string;
    actionSteps?: string[]; // New prop
    sectionNumber: number;
    id: string;
}

export const ActionPlanSection: React.FC<ActionPlanSectionProps> = ({ id, actionSteps }) => {
    const defaultActions = [
        "Leverage your high Ambition by taking on a new leadership project.",
        "Mitigate risk of being 'Excitable' by practicing a 10-second pause before reacting.",
        "Utilize your Interpersonal Sensitivity to mentor a junior team member."
    ];

    const stepsToDisplay = (actionSteps && actionSteps.length > 0) ? actionSteps : defaultActions;

    return (
        <section id={id} className="bg-slate-50 py-16 border-y border-border break-inside-avoid">
            <div className="container">
                <SectionHeader title="Action Plan" subtitle="Turn insights into results." icon={Target} />

                <div className="space-y-6 max-w-4xl mx-auto mt-12">
                    <h3 className="text-xl font-bold font-oswald mb-4">Strategic Steps</h3>
                    {stepsToDisplay.map((step, i) => (
                        <div key={i} className="flex gap-5 p-5 bg-white rounded-xl border-l-4 border-primary shadow-sm hover:shadow-md transition-all">
                            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-lg">
                                {i + 1}
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground mb-1">Action Step {i + 1}</h4>
                                <p className="text-muted-foreground text-sm leading-relaxed">{step}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default ActionPlanSection;
