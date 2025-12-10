import React, { useEffect, useRef, useState } from 'react';

interface LazySectionProps {
    children: React.ReactNode;
    threshold?: number;
    id?: string;
}

export const LazySection: React.FC<LazySectionProps> = ({ children, threshold = 0.1, id }) => {
    // Eagerly render content to support immediate sidebar navigation
    // Previously used IntersectionObserver, but user requested "render entire report at once".

    return (
        <div id={id} className="min-h-[50px] transition-opacity duration-700 ease-in-out opacity-100">
            {children}
        </div>
    );
};
