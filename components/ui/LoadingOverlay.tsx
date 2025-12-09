import React, { useState, useEffect } from 'react';
import { BrainCircuit } from 'lucide-react';

interface LoadingOverlayProps {
    messages?: string[];
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
    messages = [
        "Saving your responses...",
        "Analyzing personality dimensions...",
        "Calibrating HPI & HDS scores...",
        "Generating your comprehensive report...",
        "Almost there..."
    ]
}) => {
    const [msgIndex, setMsgIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMsgIndex((prev) => (prev + 1) % messages.length);
        }, 800);
        return () => clearInterval(interval);
    }, [messages]);

    return (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center animate-fade-in-up">
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                <div className="bg-primary p-6 rounded-full shadow-2xl shadow-primary/40 relative z-10 animate-bounce-subtle">
                    <BrainCircuit size={64} className="text-primary-foreground" />
                </div>
            </div>
            <h3 className="text-2xl font-oswald font-bold text-foreground mb-2">Processing Results</h3>
            <p className="text-primary font-medium min-h-[24px] transition-all duration-300">
                {messages[msgIndex]}
            </p>
        </div>
    );
};
