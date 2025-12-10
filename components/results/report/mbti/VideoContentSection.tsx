import React from 'react';
import { Play } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

export const VideoContentSection: React.FC<{ personalityType: string }> = ({ personalityType }) => {
    return (
        <section className="container py-16">
            <SectionHeader title="Video Insights" icon={Play} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="aspect-video bg-muted rounded-xl flex items-center justify-center relative group cursor-pointer overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="ml-1 text-primary" size={32} />
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    <h3 className="text-2xl font-heading mb-4">Mastering Your Profile</h3>
                    <p className="text-muted-foreground mb-6">Learn how to leverage your unique strengths and manage your risks in this deep-dive video analysis.</p>
                    <button className="self-start px-6 py-2 bg-primary text-primary-foreground rounded-lg font-bold">Watch Now</button>
                </div>
            </div>
        </section>
    );
};
