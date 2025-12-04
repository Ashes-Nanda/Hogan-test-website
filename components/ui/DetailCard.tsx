import React from 'react';

interface DetailCardProps {
    title: string;
    icon: any;
    theme: 'blue' | 'orange' | 'green' | 'purple';
    children: React.ReactNode;
}

export const DetailCard: React.FC<DetailCardProps> = ({ title, icon: Icon, theme, children }) => {
    const themeColors = {
        blue: { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
        orange: { text: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
        green: { text: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' },
        purple: { text: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
    }[theme];

    return (
        <div className={`bg-card rounded-xl border ${themeColors.border} shadow-sm overflow-hidden h-full flex flex-col break-inside-avoid`}>
            <div className={`${themeColors.bg} p-4 border-b ${themeColors.border} flex items-center gap-3`}>
                <div className={`p-2 bg-white rounded-lg shadow-sm ${themeColors.text}`}>
                    <Icon size={20} />
                </div>
                <h3 className={`font-oswald font-bold text-lg ${themeColors.text} uppercase`}>{title}</h3>
            </div>
            <div className="p-5 flex-grow">
                {children}
            </div>
        </div>
    );
};
