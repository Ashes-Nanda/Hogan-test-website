import React from 'react';
import { Users, Heart, CheckCircle, AlertTriangle } from 'lucide-react';

interface RelationshipSectionProps {
    firstname: string | null;
    relationships: any[];
    sectionNumber: number;
    id: string;
    isPaidUser: boolean;
    testType: string;
}

export const RelationshipSection: React.FC<RelationshipSectionProps> = ({ id }) => {
    return (
        <section id={id} className="container py-12">
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 border border-border rounded-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <Users size={24} className="text-blue-600" />
                        <h3 className="text-xl font-bold font-oswald">Professional Relationships</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-sm font-bold text-blue-600 uppercase mb-3">Strengths</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex gap-2"><CheckCircle size={14} className="text-blue-500 shrink-0 mt-1" /> Clear communication style</li>
                                <li className="flex gap-2"><CheckCircle size={14} className="text-blue-500 shrink-0 mt-1" /> Reliability in delivery</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-orange-600 uppercase mb-3">Growth Areas</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex gap-2"><AlertTriangle size={14} className="text-orange-500 shrink-0 mt-1" /> May appear too detached</li>
                                <li className="flex gap-2"><AlertTriangle size={14} className="text-orange-500 shrink-0 mt-1" /> Patience with ambiguity</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="p-6 border border-border rounded-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <Heart size={24} className="text-pink-600" />
                        <h3 className="text-xl font-bold font-oswald">Personal Dynamics</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-sm font-bold text-pink-600 uppercase mb-3">Strengths</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex gap-2"><CheckCircle size={14} className="text-pink-500 shrink-0 mt-1" /> Loyal and supportive</li>
                                <li className="flex gap-2"><CheckCircle size={14} className="text-pink-500 shrink-0 mt-1" /> Excellent listener</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-orange-600 uppercase mb-3">Growth Areas</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex gap-2"><AlertTriangle size={14} className="text-orange-500 shrink-0 mt-1" /> Expressing needs openly</li>
                                <li className="flex gap-2"><AlertTriangle size={14} className="text-orange-500 shrink-0 mt-1" /> Avoiding confrontation</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
