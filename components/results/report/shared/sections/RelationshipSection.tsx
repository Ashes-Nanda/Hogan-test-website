import React from 'react';
import { Users, Heart, CheckCircle, AlertTriangle } from 'lucide-react';

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

    return (
        <section id={id} className="container py-12">
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 border border-border rounded-xl bg-white shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <Users size={24} className="text-blue-600" />
                        <h3 className="text-xl font-heading">Professional Relationships</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-sm font-bold text-blue-600 uppercase mb-3">Strengths</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                {data.professional?.strengths?.map((item, i) => (
                                    <li key={i} className="flex gap-2">
                                        <CheckCircle size={14} className="text-blue-500 shrink-0 mt-1" />
                                        <span><strong className="text-slate-700">{item.title}:</strong> {item.body}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-orange-600 uppercase mb-3">Growth Areas</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                {data.professional?.growthAreas?.map((item, i) => (
                                    <li key={i} className="flex gap-2">
                                        <AlertTriangle size={14} className="text-orange-500 shrink-0 mt-1" />
                                        <span><strong className="text-slate-700">{item.title}:</strong> {item.body}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="p-6 border border-border rounded-xl bg-white shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <Heart size={24} className="text-pink-600" />
                        <h3 className="text-xl font-heading">Personal Dynamics</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-sm font-bold text-pink-600 uppercase mb-3">Strengths</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                {data.personal?.strengths?.map((item, i) => (
                                    <li key={i} className="flex gap-2">
                                        <CheckCircle size={14} className="text-pink-500 shrink-0 mt-1" />
                                        <span><strong className="text-slate-700">{item.title}:</strong> {item.body}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-orange-600 uppercase mb-3">Growth Areas</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                {data.personal?.growthAreas?.map((item, i) => (
                                    <li key={i} className="flex gap-2">
                                        <AlertTriangle size={14} className="text-orange-500 shrink-0 mt-1" />
                                        <span><strong className="text-slate-700">{item.title}:</strong> {item.body}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
