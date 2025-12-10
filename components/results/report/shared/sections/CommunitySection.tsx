import React from 'react';
import { Users } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface CommunitySectionProps {
    firstname: string | null;
    communityConnection: any;
    sectionNumber: number;
    id: string;
    personalityType: string;
    isPaidUser: boolean;
    userEmail?: string;
    testType: string;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({ personalityType }) => {
    return (
        <section className="bg-white py-16 border-t border-border">
            <div className="container">
                <SectionHeader title="Community" icon={Users} />
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-8 text-white text-center">
                    <h3 className="text-2xl font-heading mb-2">Join the Circle</h3>
                    <p className="text-white/80 mb-6">Connect with 500+ professionals who share your {personalityType} profile.</p>
                    <button className="bg-white text-indigo-600 px-6 py-2 rounded-full font-bold hover:bg-indigo-50 transition-colors">
                        Join Community
                    </button>
                </div>
            </div>
        </section>
    );
};
export default CommunitySection;
