import React, { useEffect, useRef, useState } from 'react';

interface LazySectionProps {
    children: React.ReactNode;
    threshold?: number;
}

export const LazySection: React.FC<LazySectionProps> = ({ children, threshold = 0.1 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [threshold]);

    return (
        <div ref={ref} className="min-h-[200px] transition-opacity duration-700 ease-in-out" style={{ opacity: isVisible ? 1 : 0 }}>
            {isVisible ? children : <div className="h-32 flex items-center justify-center text-muted-foreground">Loading section...</div>}
        </div>
    );
};
