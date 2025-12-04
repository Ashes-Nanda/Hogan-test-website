import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, Activity, Menu } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible) return null;

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden">
            <div className="bg-gray-900/90 backdrop-blur-lg text-white rounded-full px-6 py-3 shadow-2xl flex items-center gap-6 border border-white/10">
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="p-1 hover:text-primary transition-colors">
                    <Home size={20} />
                </button>
                <button onClick={() => scrollToSection('explore-traits')} className="p-1 hover:text-primary transition-colors">
                    <Activity size={20} />
                </button>
                <button onClick={() => scrollToSection('career-path')} className="p-1 hover:text-primary transition-colors">
                    <Briefcase size={20} />
                </button>
                <button onClick={() => scrollToSection('action-plan')} className="p-1 hover:text-primary transition-colors">
                    <User size={20} />
                </button>
            </div>
        </div>
    );
};
