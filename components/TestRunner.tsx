import React, { useState, useEffect, useRef } from 'react';
import { AnswerMap, VisualScore } from '../types';
import { MOCK_QUESTIONS, QUESTIONS_PER_PAGE } from '../constants';
import { RadioLikertScale } from './RadioLikertScale';
import { HBRIOptions } from './HBRIOptions';
import { saveProgress } from '../services/storageService';
import { calculateScores } from '../utils/scoring';
import { ArrowRight, ArrowLeft, CheckCircle, BrainCircuit, Loader2 } from 'lucide-react';

interface Props {
  initialAnswers: AnswerMap;
  onComplete: (answers: AnswerMap, results: any) => void;
}

import { LoadingOverlay } from './ui/LoadingOverlay';


export const TestRunner: React.FC<Props> = ({ initialAnswers, onComplete }) => {
  const [answers, setAnswers] = useState<AnswerMap>(initialAnswers);
  const [currentPage, setCurrentPage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs to manage scrolling
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const totalPages = Math.ceil(MOCK_QUESTIONS.length / QUESTIONS_PER_PAGE);
  const answeredCount = Object.keys(answers).length;
  const progressPercent = (answeredCount / MOCK_QUESTIONS.length) * 100;

  useEffect(() => {
    saveProgress(answers);
  }, [answers]);

  const currentQuestions = MOCK_QUESTIONS.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  );

  const handleAnswer = (qId: string, val: VisualScore, indexOnPage: number) => {
    setAnswers(prev => ({ ...prev, [qId]: val }));

    // Auto-scroll logic: Scroll to next question if available
    if (indexOnPage < currentQuestions.length - 1) {
      setTimeout(() => {
        const nextIndex = indexOnPage + 1;
        const nextEl = questionRefs.current[nextIndex];
        if (nextEl) {
          // Scroll to the top of the next element with some offset for the sticky header
          const headerOffset = 100;
          const elementPosition = nextEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 400); // Slightly longer delay for better UX
    }
  };

  const canProceed = currentQuestions.every(q => answers[q.id] !== undefined);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
      // Force scroll to top
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const results = calculateScores(answers);
      onComplete(answers, results);
    }, 4000);
  };

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <div className="w-full min-h-screen flex flex-col pb-24 relative bg-background">
      {/* Full Width Sticky Header */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border shadow-sm transition-all duration-300">
        <div className="max-w-4xl mx-auto px-4 py-3 md:py-4">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-foreground">
                <div className="bg-primary/10 p-1.5 rounded-md">
                  <BrainCircuit size={20} className="text-primary" />
                </div>
                <span className="font-oswald font-bold text-xl tracking-tight">CEREBRAL<span className="text-primary">Q</span></span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Completed</p>
                  <p className="text-sm font-bold text-foreground font-mono">{answeredCount} / {MOCK_QUESTIONS.length}</p>
                </div>
                <div className="flex items-center justify-center bg-muted rounded-md px-3 py-1 border border-border">
                  <span className="text-sm font-bold text-primary">{Math.round(progressPercent)}%</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-500 ease-out shadow-[0_0_10px_var(--primary)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow w-full max-w-4xl mx-auto px-4 pt-12">
        <div className="space-y-16">
          {currentQuestions.map((q, index) => (
            <div
              key={q.id}
              ref={(el) => { questionRefs.current[index] = el; }}
              className="animate-fade-in-up scroll-mt-32"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="mb-8 text-center px-4">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-4 shadow-sm border border-primary/20 tracking-wide">
                  QUESTION {(currentPage * QUESTIONS_PER_PAGE) + index + 1}
                </span>
                <h3 className="text-2xl md:text-3xl font-medium text-foreground leading-snug max-w-3xl mx-auto transition-colors">
                  {q.text}
                </h3>
              </div>

              <div className="bg-card rounded-lg p-4 sm:p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
                {q.dimensionType === 'HBRI' && q.options ? (
                  <HBRIOptions
                    options={q.options}
                    value={answers[q.id]}
                    onChange={(val) => handleAnswer(q.id, val, index)}
                  />
                ) : (
                  <RadioLikertScale
                    value={answers[q.id]}
                    onChange={(val) => handleAnswer(q.id, val, index)}
                  />
                )}
              </div>

              {index < currentQuestions.length - 1 && (
                <div className="w-16 h-1 rounded-full bg-border mx-auto mt-16" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-md border-t border-border p-4 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] z-20">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={currentPage === 0 || isSubmitting}
            className={`
              flex items-center gap-2 px-6 py-2 rounded-md font-medium transition-all duration-200 border border-input bg-background
              ${currentPage === 0 ? 'text-muted-foreground cursor-not-allowed opacity-50' : 'text-foreground hover:bg-muted active:scale-95'}
            `}
          >
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="text-xs font-medium text-muted-foreground hidden sm:block bg-muted px-4 py-1.5 rounded-full border border-border">
            Page {currentPage + 1} of {totalPages}
          </div>

          <button
            onClick={handleNext}
            disabled={!canProceed || isSubmitting}
            className={`
              flex items-center gap-2 px-6 sm:px-8 py-2 rounded-md font-bold text-primary-foreground shadow-sm transition-all duration-200 transform
              ${!canProceed || isSubmitting
                ? 'bg-muted text-muted-foreground cursor-not-allowed shadow-none'
                : 'bg-primary hover:opacity-90 hover:-translate-y-1 active:translate-y-0'}
            `}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={20} /> Processing...</span>
            ) : currentPage === totalPages - 1 ? (
              <>Finish <span className="hidden sm:inline">Assessment</span> <CheckCircle size={20} /></>
            ) : (
              <>Continue <ArrowRight size={20} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};