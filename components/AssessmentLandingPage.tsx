import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock, BrainCircuit, ArrowRight, ShieldCheck, ScrollText } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const AssessmentLandingPage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const hasCompleted = user?.attempts && user.attempts.length > 0;

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            // Check if user is near the bottom (within 50px)
            if (scrollHeight - scrollTop <= clientHeight + 50) {
                setIsScrolledToBottom(true);
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            // Check initially in case content fits without scrolling
            if (container.scrollHeight <= container.clientHeight) {
                setIsScrolledToBottom(true);
            }
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    // If user has completed, they can always proceed (to view results)
    const canStart = hasCompleted || isScrolledToBottom || isChecked;

    const handleStart = () => {
        if (canStart) {
            navigate('/assessment');
        }
    };

    return (
        <div className="fixed inset-0 bg-background text-foreground overflow-hidden flex flex-col">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
                style={{ scaleX }}
            />

            {/* Header */}
            <header className="flex-none bg-card/80 backdrop-blur-md border-b border-border p-4 z-40">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary p-1.5 rounded-md">
                            <BrainCircuit size={24} className="text-primary-foreground" />
                        </div>
                        <span className="font-oswald font-bold text-xl tracking-tight">CEREBRAL<span className="text-primary">Q</span></span>
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                        Official Assessment Portal
                    </div>
                </div>
            </header>

            {/* Main Scrollable Content */}
            <div
                ref={containerRef}
                className="flex-1 overflow-y-auto scroll-smooth"
            >
                <div className="max-w-4xl mx-auto p-6 pb-32 space-y-16">

                    {/* Hero Section */}
                    <section className="pt-10 text-center space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                                {hasCompleted ? "Welcome Back" : "Unlock Your Potential"}
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                {hasCompleted
                                    ? "Review your assessment results and continue your growth journey."
                                    : "A comprehensive personality assessment based on the Hogan framework to reveal your strengths, values, and derailers."}
                            </p>
                        </motion.div>
                    </section>

                    {/* Overview Cards */}
                    <section className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <BrainCircuit className="w-8 h-8 text-blue-500" />,
                                title: "Personality DNA",
                                desc: "Understand the core traits that define how you interact with the world and approach challenges."
                            },
                            {
                                icon: <ShieldCheck className="w-8 h-8 text-green-500" />,
                                title: "Values & Drivers",
                                desc: "Discover what truly motivates you and the environments where you thrive the most."
                            },
                            {
                                icon: <ScrollText className="w-8 h-8 text-purple-500" />,
                                title: "Growth Areas",
                                desc: "Identify potential derailers and blind spots to turn them into actionable growth opportunities."
                            }
                        ].map((card, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="mb-4 bg-muted/50 w-14 h-14 rounded-full flex items-center justify-center">
                                    {card.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                                <p className="text-muted-foreground">{card.desc}</p>
                            </motion.div>
                        ))}
                    </section>

                    {/* Details Section */}
                    <section className="bg-muted/30 rounded-2xl p-8 border border-border">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex-1 space-y-6">
                                <h2 className="text-3xl font-bold">Assessment Overview</h2>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Clock className="w-6 h-6 text-primary mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-lg">Duration</h4>
                                            <p className="text-muted-foreground">Approximately 15-20 minutes to complete.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-6 h-6 text-primary mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-lg">Format</h4>
                                            <p className="text-muted-foreground">Multiple choice questions designed to capture your natural responses.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 bg-card p-6 rounded-xl border border-border shadow-sm">
                                <h3 className="font-bold text-xl mb-4">Instructions</h3>
                                <ul className="space-y-3 text-muted-foreground">
                                    <li className="flex gap-2">
                                        <span className="font-bold text-primary">1.</span>
                                        <span>Answer honestly. There are no right or wrong answers.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="font-bold text-primary">2.</span>
                                        <span>Go with your first instinct. Don't overthink the questions.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="font-bold text-primary">3.</span>
                                        <span>Complete in one sitting for the best accuracy.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="font-bold text-primary">4.</span>
                                        <span>Ensure you are in a quiet environment free from distractions.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Terms / Confirmation */}
                    {!hasCompleted && (
                        <section className="max-w-2xl mx-auto text-center space-y-8 pt-8">
                            <div className="p-6 border border-border rounded-xl bg-card/50">
                                <label className="flex items-center gap-4 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            className="peer sr-only"
                                            checked={isChecked}
                                            onChange={(e) => setIsChecked(e.target.checked)}
                                        />
                                        <div className="w-6 h-6 border-2 border-muted-foreground rounded transition-colors peer-checked:bg-primary peer-checked:border-primary group-hover:border-primary"></div>
                                        <CheckCircle2 className="w-4 h-4 text-primary-foreground absolute left-1 top-1 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                                    </div>
                                    <span className="text-left text-foreground/80 group-hover:text-foreground transition-colors select-none">
                                        I have read the instructions and understand that this assessment is designed to provide insights into my personality and professional potential.
                                    </span>
                                </label>
                            </div>
                        </section>
                    )}

                    {/* Spacer for bottom bar */}
                    <div className="h-20"></div>
                </div>
            </div>

            {/* Bottom Action Bar */}
            <motion.div
                className="flex-none bg-card border-t border-border p-4 md:p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-50"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
            >
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-muted-foreground hidden md:block">
                        {canStart
                            ? (hasCompleted ? "Your results are ready." : "You are ready to begin.")
                            : "Please scroll to the bottom or accept the terms to proceed."}
                    </div>

                    <motion.button
                        onClick={handleStart}
                        disabled={!canStart}
                        className={`
                            group relative px-8 py-3 rounded-full font-bold text-lg flex items-center gap-2 transition-all duration-300
                            ${canStart
                                ? 'bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25 hover:scale-105 cursor-pointer'
                                : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'}
                        `}
                        whileTap={canStart ? { scale: 0.95 } : {}}
                    >
                        <span>{hasCompleted ? "View Results" : "Start Assessment"}</span>
                        <ArrowRight className={`w-5 h-5 transition-transform ${canStart ? 'group-hover:translate-x-1' : ''}`} />
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};
