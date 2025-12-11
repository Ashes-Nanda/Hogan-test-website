"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    Fingerprint,
    BarChart2,
    Search,
    Zap,
    Heart,
    Briefcase,
    Users,
    TrendingUp,
    Star,
    Monitor,
    Repeat,
    ChevronLeft,
    ChevronRight,
    Menu
} from "lucide-react";

function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(" ");
}

const SECTIONS = [
    { id: "hero", label: "Overview", icon: LayoutDashboard },
    { id: "identity-summary-takeaways", label: "Identity", icon: Fingerprint },
    { id: "trait-summary", label: "Trait Summary", icon: BarChart2 },
    { id: "explore-traits", label: "Trait Analysis", icon: Search },
    { id: "personal-examples", label: "Strengths & Risks", icon: Zap },
    { id: "values-motivators", label: "Core Values", icon: Heart },
    { id: "career-path", label: "Career Path", icon: Briefcase },
    { id: "relationships", label: "Relationships", icon: Users },
    { id: "growth-journey", label: "Growth Journey", icon: TrendingUp },
    { id: "identity-summary-reputation", label: "Reputation", icon: Star },
    { id: "work-style", label: "Work Style", icon: Monitor },
    { id: "reflections-habits", label: "Habits & Reflections", icon: Repeat },
];

export interface ReportSidebarProps {
    isExpanded: boolean;
    onToggle: () => void;
    // Mobile props
    isOpenMobile?: boolean;
    onCloseMobile?: () => void;
    // Identity props
    title?: string;
    firstname?: string;
}

export const ReportSidebar: React.FC<ReportSidebarProps> = ({
    isExpanded,
    onToggle,
    isOpenMobile = false,
    onCloseMobile,
    title,
    firstname
}) => {
    const [activeSection, setActiveSection] = useState("hero");

    // Handle scroll spy
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-20% 0px -60% 0px", // Trigger when section is near top
                threshold: 0,
            }
        );

        SECTIONS.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    // We need to handle internal scroll for sidebar content
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            // Offset for fixed header if any, or just scroll
            // In layout we have 2 columns. Main content scrolls.
            // On mobile, if we are in overlay, we should close sidebar after click?
            element.scrollIntoView({ behavior: 'smooth' });

            if (isOpenMobile && onCloseMobile) {
                onCloseMobile();
            }
        }
    };

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpenMobile && (
                <div
                    className="fixed inset-0 bg-black/40 z-[60] md:hidden backdrop-blur-sm"
                    onClick={onCloseMobile}
                />
            )}

            <motion.aside
                initial={false}
                animate={{
                    width: isExpanded ? 260 : 80, // Slightly wider to fit title
                    x: isOpenMobile ? 0 : 0
                }}
                className={cn(
                    // Desktop styles
                    "h-screen sticky top-0 left-0 bg-white border-r border-gray-100 flex-shrink-0 overflow-hidden z-[50]",
                    // Mobile styles overrides
                    "md:block", // Always block on MD
                    isOpenMobile ? "fixed inset-y-0 left-0 z-[70] block shadow-2xl" : "hidden" // Fixed overlay on mobile if open, else hidden
                )}
            >
                <div className={cn("h-full flex flex-col", isExpanded ? "w-[260px]" : "w-[80px]")}> {/* Fixed width inner container */}
                    {/* Header / Brand area with Toggle */}
                    <div className={cn(
                        "h-24 flex items-center border-b border-gray-50/50 relative shrink-0 transition-all duration-300",
                        isExpanded ? "w-full justify-between px-5" : "w-[80px] justify-center"
                    )}>
                        {/* Identity Title Area (Only when Expanded) */}
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col pr-2 overflow-hidden"
                                >
                                    <h2 className="font-heading font-bold text-lg text-slate-900 leading-tight line-clamp-2">
                                        {title || "Your Report"}
                                    </h2>
                                    {firstname && (
                                        <p className="text-[10px] uppercase tracking-wider font-semibold text-indigo-500 mt-1">
                                            Prepared exclusively for {firstname}
                                        </p>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex items-center gap-2">
                            {/* Mobile Close Button */}
                            <button
                                onClick={onCloseMobile}
                                className="md:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                            >
                                <Menu size={20} className="rotate-45" /> {/* Using rotate-45 Menu as X or import X */}
                            </button>

                            {/* Desktop Toggle Button */}
                            <button
                                onClick={onToggle}
                                className={cn(
                                    "hidden md:flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors bg-transparent border-0 p-2 rounded-md hover:bg-gray-50",
                                )}
                                title={isExpanded ? "Collapse" : "Expand"}
                            >
                                {isExpanded ? (
                                    <ChevronLeft size={16} />
                                ) : (
                                    <div className="flex flex-col items-center gap-0.5">
                                        <ChevronRight size={20} className="text-gray-500" />
                                        <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Expand</span>
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col gap-1 py-6 px-3 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {SECTIONS.map((section) => {
                            const isActive = activeSection === section.id;
                            const Icon = section.icon;

                            return (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className={cn(
                                        "relative group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 w-full",
                                        isActive
                                            ? "bg-indigo-50 text-indigo-700 font-medium"
                                            : "hover:bg-gray-50 text-gray-500 hover:text-gray-900"
                                    )}
                                >
                                    <motion.div
                                        className="min-w-[24px] flex items-center justify-center"
                                        variants={{
                                            initial: { rotate: 0, scale: 1 },
                                            hover: {
                                                rotate: [0, -10, 10, -5, 5, 0],
                                                scale: 1.2,
                                                transition: {
                                                    type: "spring",
                                                    stiffness: 400,
                                                    damping: 10
                                                }
                                            },
                                            active: {
                                                scale: 1.2,
                                                rotate: 0,
                                                transition: { type: "spring", stiffness: 300, damping: 20 }
                                            }
                                        }}
                                        initial="initial"
                                        animate={isActive ? "active" : "initial"}
                                        whileHover={isActive ? "active" : "hover"}
                                    >
                                        <Icon size={22} className={isActive ? "text-indigo-600" : ""} />
                                    </motion.div>

                                    <AnimatePresence mode="wait">
                                        {isExpanded && (
                                            <motion.span
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -10 }}
                                                transition={{ duration: 0.15 }}
                                                className="text-sm whitespace-nowrap"
                                            >
                                                {section.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>

                                    {/* Active Indicator Strip */}
                                    {isActive && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-md" />
                                    )}

                                    {/* Highlight Background for non-active hover status */}
                                    {!isActive && isExpanded && (
                                        <div className="absolute inset-0 rounded-xl bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                                    )}

                                    {/* Tooltip for collapsed state */}
                                    {!isExpanded && (
                                        <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-800 text-white text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-md">
                                            {section.label}
                                            {/* Little triangular arrow */}
                                            <div className="absolute top-1/2 right-full -translate-y-1/2 -mr-1 border-4 border-transparent border-r-gray-800" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </motion.aside>
        </>
    );
};
