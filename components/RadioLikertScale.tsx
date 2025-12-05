import React from 'react';
import { VisualScore } from '../types';

interface Props {
  value?: VisualScore;
  onChange: (val: VisualScore) => void;
}

// Configuration for the 7-point visual scale as per requirements
// Keeping the specific colors for visual feedback (red to green spectrum) 
// but ensuring container/focus states use design tokens
const scaleOptions = [
  { val: 1, color: 'bg-primary', ring: 'ring-primary', size: 'w-8 h-8 sm:w-[60px] sm:h-[60px]', dot: 'w-2 h-2 sm:w-4 sm:h-4', label: 'Strongly Disagree' },
  { val: 2, color: 'bg-primary', ring: 'ring-primary', size: 'w-6 h-6 sm:w-[45px] sm:h-[45px]', dot: 'w-1.5 h-1.5 sm:w-3 sm:h-3', label: 'Disagree' },
  { val: 3, color: 'bg-primary', ring: 'ring-primary', size: 'w-6 h-6 sm:w-[45px] sm:h-[45px]', dot: 'w-1.5 h-1.5 sm:w-3 sm:h-3', label: 'Agree' },
  { val: 4, color: 'bg-primary', ring: 'ring-primary', size: 'w-8 h-8 sm:w-[60px] sm:h-[60px]', dot: 'w-2 h-2 sm:w-4 sm:h-4', label: 'Strongly Agree' },
];

export const RadioLikertScale: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-12 px-2 sm:px-6">
      <div className="relative flex items-center justify-between gap-1 sm:gap-2">

        {/* Connecting Track Line */}
        <div className="absolute left-4 right-4 top-1/2 h-1 -z-10 bg-muted rounded-full" />

        {/* Labels - Visible on desktop for extremes */}
        <div className={`absolute -top-8 sm:-top-12 left-0 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-opacity duration-300 ${value === 1 ? 'opacity-100 text-primary' : 'opacity-40 text-muted-foreground'}`}>
          Strongly Disagree
        </div>
        <div className={`absolute -top-8 sm:-top-12 right-0 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-opacity duration-300 ${value === 4 ? 'opacity-100 text-primary' : 'opacity-40 text-muted-foreground'}`}>
          Strongly Agree
        </div>

        {scaleOptions.map((opt) => {
          const isSelected = value === opt.val;

          return (
            <div key={opt.val} className="relative flex flex-col items-center group">
              <button
                type="button"
                onClick={() => onChange(opt.val as VisualScore)}
                className={`
                  relative z-10 rounded-full flex items-center justify-center outline-none
                  transition-all duration-300 ease-out border-2 border-primary
                  ${opt.size} 
                  ${isSelected
                    ? `${opt.color} ring-4 ring-offset-2 ring-offset-card ${opt.ring} scale-110 shadow-lg`
                    : 'bg-white hover:bg-primary/10 hover:scale-105 hover:shadow-md'}
                `}
                title={opt.label}
                aria-label={opt.label}
                aria-pressed={isSelected}
              >
                {/* Center Dot Logic */}
                <span className={`
                  rounded-full bg-card transition-all duration-300
                  ${isSelected ? `${opt.dot} opacity-100` : 'w-0 h-0 opacity-0'}
                `} />
              </button>


            </div>
          );
        })}
      </div>
    </div>
  );
};