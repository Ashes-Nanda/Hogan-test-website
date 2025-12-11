import React from 'react';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    icon?: any;
    className?: string; // For container style overrides
    titleClassName?: string; // For title text overrides (e.g. colors)
    subtitleClassName?: string; // For subtitle overrides
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, icon: Icon, className = "", titleClassName = "", subtitleClassName = "" }) => (
    <div className={`mb-8 page-break-after-avoid break-inside-avoid border-t border-slate-200 pt-12 mt-16 first:border-0 first:pt-0 first:mt-0 ${className}`}>
        <div className="flex items-center gap-3 mb-2">
            {Icon && <div className="p-2 bg-primary/10 rounded-lg text-primary"><Icon size={24} /></div>}
            <h2 className={`text-3xl font-heading text-foreground uppercase tracking-tight ${titleClassName}`}>{title}</h2>
        </div>
        {subtitle && <p className={`text-muted-foreground text-lg font-light pl-1 ${subtitleClassName}`}>{subtitle}</p>}
    </div>
);
