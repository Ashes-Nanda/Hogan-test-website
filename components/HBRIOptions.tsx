import React from 'react';
import { QuestionOption, VisualScore } from '../types';

interface Props {
    options: QuestionOption[];
    value?: VisualScore;
    onChange: (val: VisualScore) => void;
}

export const HBRIOptions: React.FC<Props> = ({ options, value, onChange }) => {
    return (
        <div className="w-full max-w-3xl mx-auto py-6">
            <div className="grid grid-cols-1 gap-4">
                {options.map((opt) => {
                    const isSelected = value === opt.value;
                    return (
                        <button
                            key={opt.value}
                            onClick={() => onChange(opt.value)}
                            className={`
                relative flex items-center p-4 rounded-lg border-2 transition-all duration-200 text-left group
                ${isSelected
                                    ? 'border-primary bg-primary/5 shadow-md'
                                    : 'border-border bg-card hover:border-primary/50 hover:bg-accent'}
              `}
                        >
                            <div className={`
                w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center flex-shrink-0 transition-colors
                ${isSelected ? 'border-primary bg-primary' : 'border-muted-foreground group-hover:border-primary'}
              `}>
                                {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary-foreground" />}
                            </div>
                            <span className={`text-base sm:text-lg ${isSelected ? 'font-medium text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                                {opt.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
