import React, { useState, useEffect } from 'react';
import { BrainCircuit } from 'lucide-react';

interface LoadingOverlayProps {
    messages?: string[];
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
    messages = [
        "Analyzing assessment responses...",
        "Calibrating HPI & HDS profiles...",
        "Generating MVPI report...",
        "Synthesizing cognitive reasoning...",
        "Drafting executive summary...",
        "Designing career path analysis...",
        "Generating micro habits...",
        "Finalizing comprehensive report..."
    ]
}) => {
    const [progress, setProgress] = useState(0);

    // Calculate current message based on progress
    // We cap the index at messages.length - 1
    const msgIndex = Math.min(
        Math.floor((progress / 100) * messages.length),
        messages.length - 1
    );

    useEffect(() => {
        const duration = 60000; // 60 seconds total (Slowed down)
        const intervalTime = 100; // Update every 100ms
        const steps = duration / intervalTime;
        const increment = 100 / steps;

        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + increment;
                // Cap at 99% to avoid showing 100% while still loading
                if (next >= 99) {
                    return 99;
                }
                return next;
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed inset-0 bg-slate-50/95 backdrop-blur-md z-50 flex flex-col items-center justify-center animate-fade-in-up">
            <div className="w-full max-w-md px-6 flex flex-col items-center">
                {/* Icon Animation */}
                <div className="relative mb-10">
                    <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-ping"></div>
                    <div className="bg-white p-6 rounded-full shadow-2xl shadow-indigo-200 relative z-10 animate-bounce-subtle border border-indigo-100">
                        <BrainCircuit size={48} className="text-indigo-600" />
                    </div>
                </div>

                {/* Text & Progress */}
                <div className="w-full space-y-4 text-center">
                    <h3 className="text-3xl font-heading text-slate-800 tracking-wide">Processing Results</h3>

                    <div className="h-8 flex items-center justify-center">
                        <p className="text-slate-500 font-medium text-lg animate-pulse transition-all duration-300">
                            {messages[msgIndex]}
                        </p>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mt-6 relative">
                        {/* Progress Fill */}
                        <div
                            className="h-full bg-indigo-600 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite]" />
                        </div>
                    </div>

                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">{Math.round(progress)}% Complete</p>
                </div>
            </div>
        </div>
    );
};
