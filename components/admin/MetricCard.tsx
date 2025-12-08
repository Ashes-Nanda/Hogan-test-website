import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
    label: string;
    value: number | string;
    icon: LucideIcon;
    colorClass?: string;
    trend?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, icon: Icon, colorClass = "text-foreground", trend }) => {
    return (
        <div className="bg-[#E9E2D5] p-6 rounded-[12px] shadow-sm border border-border/50 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start z-10 relative">
                <div>
                    <p className="text-xs font-montserrat font-semibold text-muted-foreground uppercase tracking-wider mb-2">{label}</p>
                    <p className={`text-4xl font-oswald font-bold ${colorClass} tracking-tight`}>{value}</p>
                    {trend && <p className="text-[10px] text-muted-foreground mt-1">{trend}</p>}
                </div>
                <div className={`p-3 rounded-full bg-white/40 ${colorClass.replace('text-', 'bg-').replace('600', '100').replace('foreground', 'slate-200')} backdrop-blur-sm`}>
                    <Icon size={24} className={`opacity-80 ${colorClass}`} />
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute -bottom-4 -right-4 opacity-[0.05] pointer-events-none transform group-hover:scale-110 transition-transform duration-500">
                <Icon size={120} />
            </div>
        </div>
    );
};
