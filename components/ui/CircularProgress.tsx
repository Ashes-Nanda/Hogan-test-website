import React from 'react';
import { motion } from 'framer-motion';

interface CircularProgressProps {
    value: number; // 0 to 100
    size?: number;
    strokeWidth?: number;
    color?: string;
    trackColor?: string;
    children?: React.ReactNode;
    className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
    value,
    size = 100,
    strokeWidth = 8,
    color = "currentColor",
    trackColor = "rgba(255,255,255,0.2)",
    children,
    className = ""
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(Math.max(value, 0), 100);
    const dashOffset = circumference - (progress / 100) * circumference;

    return (
        <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="transform -rotate-90"
            >
                {/* Track Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={trackColor}
                    strokeWidth={strokeWidth}
                />

                {/* Progress Circle */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: dashOffset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                />
            </svg>

            {/* Center Content */}
            {children && (
                <div className="absolute inset-0 flex items-center justify-center">
                    {children}
                </div>
            )}
        </div>
    );
};
