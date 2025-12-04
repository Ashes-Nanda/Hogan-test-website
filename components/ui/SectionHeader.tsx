import React from 'react';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    icon?: any;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, icon: Icon }) => (
    <div className="mb-8 page-break-after-avoid break-inside-avoid">
        <div className="flex items-center gap-3 mb-2">
            {Icon && <div className="p-2 bg-primary/10 rounded-lg text-primary"><Icon size={24} /></div>}
            <h2 className="text-3xl font-oswald font-bold text-foreground uppercase tracking-tight">{title}</h2>
        </div>
        {subtitle && <p className="text-muted-foreground text-lg font-light pl-1">{subtitle}</p>}
    </div>
);
