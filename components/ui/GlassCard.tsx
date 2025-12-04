import React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = "" }) => (
    <div className={`bg-white/10 border border-white/20 backdrop-blur-sm rounded-xl overflow-hidden ${className}`}>
        {children}
    </div>
);
