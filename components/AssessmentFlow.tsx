import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TestRunner } from './TestRunner';
import { ResultsView } from './ResultsView';
import { BrainCircuit } from 'lucide-react';
import { loadProgress, clearProgress, saveAttempt } from '../services/storageService';
import { TestStatus, AnswerMap, TestResult, Attempt } from '../types';

export const AssessmentFlow: React.FC = () => {
    const { user, setUser, logout } = useAuth();
    const [retaking, setRetaking] = useState(false);

    if (!user) return null;

    const handleTestComplete = (answers: AnswerMap, results: TestResult) => {
        const attemptNumber = user.attempts.length + 1;
        results.attemptNumber = attemptNumber;

        const newAttempt: Attempt = {
            id: `att_${Date.now()}`,
            number: attemptNumber,
            completedAt: new Date().toISOString(),
            answers,
            result: results
        };

        // Update User State
        const updatedUser = {
            ...user,
            status: TestStatus.COMPLETED,
            attempts: [...user.attempts, newAttempt]
        };

        // Save to Supabase
        try {
            if (user.id) {
                saveAttempt(user.id, newAttempt).catch(console.error);
            } else {
                console.error("User ID missing, cannot save attempt");
            }
        } catch (e) {
            console.error(e);
        }

        setUser(updatedUser);
        clearProgress();
        setRetaking(false);
    };

    const handleRetake = () => {
        setRetaking(true);
        clearProgress();
    };

    const hasAttempts = user.attempts && user.attempts.length > 0;

    if (hasAttempts && !retaking) {
        return (
            <div className="min-h-screen bg-background flex flex-col text-foreground">
                <header className="bg-card shadow-sm py-4 px-6 flex justify-between items-center z-10 border-b border-border">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary p-1.5 rounded-md"><BrainCircuit size={18} className="text-primary-foreground" /></div>
                        <div className="font-oswald font-bold text-xl tracking-tight">CEREBRAL<span className="text-primary">Q</span></div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="hidden sm:inline text-sm text-muted-foreground">Logged in as <b>{user.name}</b></span>
                        {user.role === 'admin' && (
                            <a href="/admin" className="text-sm font-bold text-primary hover:underline">Admin Console</a>
                        )}
                        <button onClick={handleRetake} className="text-sm font-bold text-primary hover:text-primary/80 border border-primary/20 px-3 py-1.5 rounded-md hover:bg-primary/5 transition-colors">Retake Test</button>
                        <button onClick={() => logout()} className="text-sm font-bold text-muted-foreground hover:text-foreground border border-input px-3 py-1.5 rounded-md hover:bg-muted transition-colors">Sign Out</button>
                    </div>
                </header>
                <ResultsView user={user} onRetake={handleRetake} />
            </div>
        );
    }

    // Test Runner (First time or Retake)
    const savedAnswers = loadProgress();
    return (
        <div className="min-h-screen bg-background text-foreground">
            <TestRunner initialAnswers={savedAnswers} onComplete={handleTestComplete} />
        </div>
    );
};
