import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';

interface StickyReportHeaderProps {
    title: string;
    firstname?: string;
    onDownload?: () => void;
    isSidebarExpanded?: boolean;
}

export const StickyReportHeader: React.FC<StickyReportHeaderProps> = ({
    title,
    firstname,
    onDownload,
    isSidebarExpanded = true
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past the hero section (approx 600px)
            const show = window.scrollY > 600;
            setIsVisible(show);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed top-0 left-0 right-0 z-[60] bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm print:hidden"
                >
                    <div className="w-full px-5 h-16 flex items-center justify-between">
                        {/* 
                            Left aligned "Logo Position" text.
                            Overlays the top of the sidebar when scrolling.
                        */}
                        <div className="flex flex-col justify-center items-start">
                            <div className="flex flex-col items-center md:items-start">
                                <h2 className="text-lg font-bold text-gray-900 leading-tight">
                                    {title}
                                </h2>
                                <p className="text-xs text-muted-foreground font-medium">
                                    Prepared exclusively for <span className="text-indigo-600">{firstname || 'User'}</span>
                                </p>
                            </div>
                        </div>

                        {/* Optional: Add Action Button here if space permits */}
                        {onDownload && (
                            <button
                                onClick={onDownload}
                                className="hidden md:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors shadow-sm ml-auto"
                            >
                                <Download size={14} />
                                <span>Download PDF</span>
                            </button>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
