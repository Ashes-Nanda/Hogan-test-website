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
  { val: 1, color: 'bg-red-500', ring: 'ring-red-500', size: 'w-10 h-10 sm:w-[70px] sm:h-[70px]', dot: 'w-2 h-2 sm:w-4 sm:h-4', label: 'Strongly Disagree' },
  { val: 2, color: 'bg-orange-500', ring: 'ring-orange-500', size: 'w-9 h-9 sm:w-[56px] sm:h-[56px]', dot: 'w-1.5 h-1.5 sm:w-3 sm:h-3', label: 'Disagree' },
  { val: 3, color: 'bg-amber-500', ring: 'ring-amber-500', size: 'w-8 h-8 sm:w-[46px] sm:h-[46px]', dot: 'w-1.5 h-1.5 sm:w-2.5 sm:h-2.5', label: 'Somewhat Disagree' },
  { val: 4, color: 'bg-zinc-300', ring: 'ring-zinc-300', size: 'w-7 h-7 sm:w-[36px] sm:h-[36px]', dot: 'w-1.5 h-1.5 sm:w-2 sm:h-2', label: 'Neutral' },
  { val: 5, color: 'bg-lime-500', ring: 'ring-lime-500', size: 'w-8 h-8 sm:w-[46px] sm:h-[46px]', dot: 'w-1.5 h-1.5 sm:w-2.5 sm:h-2.5', label: 'Somewhat Agree' },
  { val: 6, color: 'bg-green-500', ring: 'ring-green-500', size: 'w-9 h-9 sm:w-[56px] sm:h-[56px]', dot: 'w-1.5 h-1.5 sm:w-3 sm:h-3', label: 'Agree' },
  { val: 7, color: 'bg-emerald-600', ring: 'ring-emerald-600', size: 'w-10 h-10 sm:w-[70px] sm:h-[70px]', dot: 'w-2 h-2 sm:w-4 sm:h-4', label: 'Strongly Agree' },
];

export const RadioLikertScale: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-12 px-2 sm:px-6">
      <div className="relative flex items-center justify-between gap-1 sm:gap-2">
        
        {/* Connecting Track Line */}
        <div className="absolute left-4 right-4 top-1/2 h-1 -z-10 bg-muted rounded-full" />

        {/* Labels - Visible on desktop for extremes */}
        <div className={`absolute -top-8 sm:-top-12 left-0 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-opacity duration-300 ${value === 1 ? 'opacity-100 text-destructive' : 'opacity-40 text-muted-foreground'}`}>
          Strongly Disagree
        </div>
        <div className={`absolute -top-8 sm:-top-12 right-0 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-opacity duration-300 ${value === 7 ? 'opacity-100 text-emerald-600' : 'opacity-40 text-muted-foreground'}`}>
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
                  transition-all duration-300 ease-out
                  ${opt.size} ${opt.color}
                  ${isSelected 
                    ? `ring-4 ring-offset-2 ring-offset-card ${opt.ring} scale-110 shadow-lg` 
                    : 'hover:scale-105 hover:shadow-md opacity-80 hover:opacity-100'}
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
              
              {/* Tooltip on Hover/Selection */}
              <div className={`
                absolute top-full mt-4 transition-all duration-300 transform origin-top
                ${isSelected ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 -translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0'}
                pointer-events-none z-20 whitespace-nowrap hidden sm:block
              `}>
                <div className="relative flex flex-col items-center">
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-popover-foreground mb-[-1px]" />
                    <div className="bg-popover-foreground text-popover px-3 py-1.5 rounded-md text-xs font-bold shadow-xl tracking-wide">
                        {opt.label}
                    </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};