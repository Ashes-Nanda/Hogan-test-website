import { SectionHeader } from '@/components/ui/SectionHeader';
import { Users, CheckCircle, AlertTriangle, Heart } from 'lucide-react';

interface RelationshipSectionProps {
    firstname: string | null;
    relationships: {
        professional: {
            strengths: { title: string; body: string }[];
            growthAreas: { title: string; body: string }[];
        };
        personal: {
            strengths: { title: string; body: string }[];
            growthAreas: { title: string; body: string }[];
        };
    };
    sectionNumber: number;
    id: string;
    isPaidUser: boolean;
    testType: string;
}

export const RelationshipSection: React.FC<RelationshipSectionProps> = ({ id, relationships }) => {
    // Fallback if data is missing (during transition)
    const data = relationships || {
        professional: {
            strengths: [{ title: "Communication", body: "Clear communication" }],
            growthAreas: [{ title: "Patience", body: "Patience with details" }]
        },
        personal: {
            strengths: [{ title: "Loyalty", body: "Loyal friend" }],
            growthAreas: [{ title: "Expression", body: "Expressing needs" }]
        }
    };

    const renderAlignedLists = (
        strengths: { title: string; body: string }[] | undefined,
        growthAreas: { title: string; body: string }[] | undefined,
        colors: { strength: string; growth: string; strengthIcon: string; growthIcon: string }
    ) => {
        const sList = strengths || [];
        const gList = growthAreas || [];
        const maxLength = Math.max(sList.length, gList.length);
        const rows = Array.from({ length: maxLength }, (_, i) => i);

        return (
            <>
                {/* Mobile View: Stacked */}
                <div className="flex flex-col gap-6 sm:hidden">
                    <div>
                        <h4 className={`text-sm font-bold ${colors.strength} uppercase mb-3`}>Strengths</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {sList.map((item, i) => (
                                <li key={i} className="flex gap-2">
                                    <CheckCircle size={14} className={`${colors.strengthIcon} shrink-0 mt-1`} />
                                    <span><strong className="text-slate-700">{item.title}:</strong> {item.body}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className={`text-sm font-bold ${colors.growth} uppercase mb-3`}>Growth Areas</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {gList.map((item, i) => (
                                <li key={i} className="flex gap-2">
                                    <AlertTriangle size={14} className={`${colors.growthIcon} shrink-0 mt-1`} />
                                    <span><strong className="text-slate-700">{item.title}:</strong> {item.body}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Desktop View: Aligned Grid */}
                <div className="hidden sm:grid grid-cols-2 gap-6">
                    <h4 className={`text-sm font-bold ${colors.strength} uppercase`}>Strengths</h4>
                    <h4 className={`text-sm font-bold ${colors.growth} uppercase`}>Growth Areas</h4>

                    {rows.map((i) => (
                        <div key={i} className="contents">
                            {/* Strength Item */}
                            <div className="text-sm text-muted-foreground">
                                {sList[i] && (
                                    <div className="flex gap-2">
                                        <CheckCircle size={14} className={`${colors.strengthIcon} shrink-0 mt-1`} />
                                        <span><strong className="text-slate-700">{sList[i].title}:</strong> {sList[i].body}</span>
                                    </div>
                                )}
                            </div>

                            {/* Growth Item */}
                            <div className="text-sm text-muted-foreground">
                                {gList[i] && (
                                    <div className="flex gap-2">
                                        <AlertTriangle size={14} className={`${colors.growthIcon} shrink-0 mt-1`} />
                                        <span><strong className="text-slate-700">{gList[i].title}:</strong> {gList[i].body}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    };

    return (
        <section id={id} className="container py-12">
            <SectionHeader title="Relationships" subtitle="Navigating professional and personal dynamics." icon={Users} />
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Professional Relationships */}
                <div className="p-6 border border-border rounded-xl bg-white shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <Users size={24} className="text-blue-600" />
                        <h3 className="text-xl font-heading">Professional Relationships</h3>
                    </div>
                    {renderAlignedLists(
                        data.professional?.strengths,
                        data.professional?.growthAreas,
                        {
                            strength: "text-blue-600",
                            growth: "text-orange-600",
                            strengthIcon: "text-blue-500",
                            growthIcon: "text-orange-500"
                        }
                    )}
                </div>

                {/* Personal Dynamics */}
                <div className="p-6 border border-border rounded-xl bg-white shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <Heart size={24} className="text-pink-600" />
                        <h3 className="text-xl font-heading">Personal Dynamics</h3>
                    </div>
                    {renderAlignedLists(
                        data.personal?.strengths,
                        data.personal?.growthAreas,
                        {
                            strength: "text-pink-600",
                            growth: "text-orange-600",
                            strengthIcon: "text-pink-500",
                            growthIcon: "text-orange-500"
                        }
                    )}
                </div>
            </div>
        </section>
    );
};
