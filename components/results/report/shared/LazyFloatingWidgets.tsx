import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface LazyFloatingWidgetsProps {
    personalityType: string;
    firstname?: string;
    reportId: string;
    showSocialProof?: boolean;
    delayMs?: number;
}

export const LazyFloatingWidgets: React.FC<LazyFloatingWidgetsProps> = ({ delayMs = 2000 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delayMs);
        return () => clearTimeout(timer);
    }, [delayMs]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-8 right-8 z-40 hidden md:block">
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-72 bg-white rounded-xl shadow-2xl border border-border p-4 mb-2 animate-fade-in-up">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-sm">AI Coach</h4>
                        <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                            <X size={14} />
                        </button>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                        Hi! I can help you interpret your results. What would you like to know?
                    </p>
                    <button className="w-full bg-primary text-primary-foreground text-xs font-bold py-2 rounded-lg">
                        Start Chat
                    </button>
                </div>
            )}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>
        </div>
    );
};
