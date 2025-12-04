import React from 'react';
import { Activity, Briefcase, AlertTriangle, Target } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { DetailCard } from '@/components/ui/DetailCard';
import { TraitRow } from '@/components/ui/TraitRow';

interface HoganTraitsSectionProps {
    hpiScores: any;
    hdsScores: any;
    mvpiScores: any;
    hpiProfile?: any;
    hdsRiskAreas?: any;
    mvpiTopValues?: any;
    sectionNumber: number;
    firstname?: string;
    id: string;
    isPaidUser: boolean;
    testType: string;
}

export const HoganTraitsSection: React.FC<HoganTraitsSectionProps> = ({ hpiScores, hdsScores, mvpiScores, id }) => {
    return (
        <section id={id} className="container py-12">
            <SectionHeader title="Detailed Trait Analysis" subtitle="Breakdown of your personality inventory across three dimensions." icon={Activity} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DetailCard title="Personality (HPI)" icon={Briefcase} theme="blue">
                    <div className="space-y-5">
                        {Object.entries(hpiScores as Record<string, any>).slice(0, 7).map(([name, score]) => (
                            <TraitRow key={name} name={name} score={score.percentage} theme="blue" />
                        ))}
                    </div>
                </DetailCard>

                <DetailCard title="Risk Factors (HDS)" icon={AlertTriangle} theme="orange">
                    <div className="space-y-5">
                        {Object.entries(hdsScores as Record<string, any>).map(([name, score]) => (
                            <TraitRow key={name} name={name} score={score.percentage} theme="orange" />
                        ))}
                    </div>
                </DetailCard>

                <DetailCard title="Values (MVPI)" icon={Target} theme="green">
                    <div className="space-y-5">
                        {Object.entries(mvpiScores as Record<string, any>).map(([name, score]) => (
                            <TraitRow key={name} name={name} score={score.percentage} theme="green" />
                        ))}
                    </div>
                </DetailCard>
            </div>
        </section>
    );
};
export default HoganTraitsSection;
