import React from 'react';
import { BookOpen, Play } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

export const RelatedResourcesSection: React.FC<{ personalityType: string }> = ({ personalityType }) => {
    return (
        <section className="container py-16">
            <SectionHeader title="Resources" icon={BookOpen} />
            <div className="space-y-4">
                <div className="flex gap-4 items-center p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer border border-border">
                    <div className="p-3 bg-red-100 text-red-600 rounded-lg"><Play size={20} /></div>
                    <div>
                        <h4 className="font-bold text-foreground">Mastering Leadership</h4>
                        <p className="text-xs text-muted-foreground">Video • 15 mins</p>
                    </div>
                </div>
                <div className="flex gap-4 items-center p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer border border-border">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><BookOpen size={20} /></div>
                    <div>
                        <h4 className="font-bold text-foreground">Leadership in the Modern Age</h4>
                        <p className="text-xs text-muted-foreground">Article • 5 min read</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
