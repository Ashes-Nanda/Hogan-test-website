import React, { useState, useEffect } from 'react';
import { MOCK_USERS, COMPANY_DOMAIN } from './constants';
import { User, TestStatus, AnswerMap, TestResult, Attempt } from './types';
import { saveUserSession, loadUserSession, clearUserSession, loadProgress, clearProgress } from './services/storageService';
import { TestRunner } from './components/TestRunner';
import { ResultsView } from './components/ResultsView';
import { AdminDashboard } from './components/AdminDashboard';
import { calculateScores } from './utils/scoring';
import { BrainCircuit, ArrowRight, ShieldCheck, Mail, Lock, User as UserIcon, CheckCircle } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [retaking, setRetaking] = useState(false);
  
  // App initialization
  useEffect(() => {
    const session = loadUserSession();
    if (session) {
      // Validate against mock DB
      const found = MOCK_USERS.find(u => u.email === session.email && u.token === session.token);
      if (found) {
        setUser(found);
      } else {
        clearUserSession();
      }
    }
    setLoading(false);
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Domain Validation
    if (!email.toLowerCase().endsWith(`@${COMPANY_DOMAIN}`)) {
        setError(`Access restricted. Please use your @${COMPANY_DOMAIN} email address.`);
        return;
    }

    if (authMode === 'login') {
        const found = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (found) {
            // Simulate password check
            if (found.passwordHash && found.passwordHash !== password) {
                setError('Incorrect password.');
                return;
            }
            saveUserSession(found.email, found.token);
            setUser(found);
        } else {
            setError('User not found. Please sign up first.');
        }
    } else {
        // Signup Logic
        if (MOCK_USERS.find(u => u.email === email)) {
            setError('User already exists. Please log in.');
            return;
        }
        // Create new user
        const newUser: User = {
            email,
            name,
            passwordHash: password,
            status: TestStatus.PENDING,
            token: `token_${Date.now()}`,
            attempts: []
        };
        MOCK_USERS.push(newUser); // Push to mock DB
        saveUserSession(newUser.email, newUser.token);
        setUser(newUser);
    }
  };

  const handleLogout = () => {
    clearUserSession();
    setUser(null);
    setEmail('');
    setPassword('');
    setRetaking(false);
  };

  const handleTestComplete = (answers: AnswerMap, results: TestResult) => {
    if (!user) return;

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
    
    // In real app, API call here to persist
    // Update local mock
    const userIndex = MOCK_USERS.findIndex(u => u.email === user.email);
    if(userIndex >= 0) MOCK_USERS[userIndex] = updatedUser;

    setUser(updatedUser);
    clearProgress();
    setRetaking(false);
  };

  const handleRetake = () => {
      setRetaking(true);
      // Optional: Load previous answers? No, PRD says "every retake...". Usually better to start fresh.
      clearProgress();
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center bg-background text-primary">Loading...</div>;
  }

  // Admin View
  if (user?.email === `admin@${COMPANY_DOMAIN}`) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  // Employee Views
  if (user) {
    // Logic: 
    // 1. If User has attempts AND is not retaking -> Show Dashboard (ResultsView)
    // 2. If User has NO attempts OR is retaking -> Show TestRunner
    
    const hasAttempts = user.attempts && user.attempts.length > 0;

    if (hasAttempts && !retaking) {
      return (
        <div className="min-h-screen bg-background flex flex-col text-foreground">
            <header className="bg-card shadow-sm py-4 px-6 flex justify-between items-center z-10 border-b border-border">
                <div className="flex items-center gap-2">
                    <div className="bg-primary p-1.5 rounded-md"><BrainCircuit size={18} className="text-primary-foreground"/></div>
                    <div className="font-oswald font-bold text-xl tracking-tight">CEREBRAL<span className="text-primary">Q</span></div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="hidden sm:inline text-sm text-muted-foreground">Logged in as <b>{user.name}</b></span>
                    <button onClick={handleLogout} className="text-sm font-bold text-muted-foreground hover:text-foreground border border-input px-3 py-1.5 rounded-md hover:bg-muted transition-colors">Sign Out</button>
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
  }

  // Authentication Screen (Login / Sign Up)
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background text-foreground">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex w-1/2 bg-primary relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 opacity-90"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
             <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse-slow"></div>
             <div className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-bounce-subtle"></div>
        </div>
        <div className="relative z-10 max-w-lg px-12 text-primary-foreground">
            <div className="mb-6 flex items-center gap-3">
                 <div className="bg-white/20 p-3 rounded-xl backdrop-blur-md">
                    <BrainCircuit size={48} />
                 </div>
            </div>
            <h1 className="text-5xl font-oswald font-bold mb-6 leading-tight">Unlock Your Leadership Potential.</h1>
            <p className="text-lg text-primary-foreground/90 font-light leading-relaxed">
                The Hogan Assessment is the gold standard for predicting workplace performance. 
                Discover your strengths, values, and derailers with CerebralQ's enterprise platform.
            </p>
            <div className="mt-12 flex gap-4 text-sm font-medium opacity-70">
                <span className="flex items-center gap-2"><ShieldCheck size={16}/> Secure</span>
                <span className="flex items-center gap-2"><Lock size={16}/> Confidential</span>
                <span className="flex items-center gap-2"><CheckCircle size={16}/> Validated</span>
            </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 bg-background">
        <div className="w-full max-w-md bg-card p-8 rounded-lg shadow-sm border border-border">
            <div className="text-center mb-8">
               <h2 className="text-2xl font-oswald font-bold text-foreground">{authMode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
               <p className="text-muted-foreground text-sm mt-2">
                   {authMode === 'login' 
                    ? 'Enter your credentials to access your dashboard.' 
                    : `Join your team on CerebralQ. Use your @${COMPANY_DOMAIN} email.`}
               </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
                {authMode === 'signup' && (
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-foreground uppercase tracking-wide">Full Name</label>
                        <div className="relative">
                            <UserIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input 
                                type="text" 
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-ring focus:border-input outline-none transition-all text-sm"
                                placeholder="Jane Doe"
                            />
                        </div>
                    </div>
                )}

                <div className="space-y-1">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wide">Work Email</label>
                    <div className="relative">
                        <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-ring focus:border-input outline-none transition-all text-sm"
                            placeholder={`name@${COMPANY_DOMAIN}`}
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wide">Password</label>
                    <div className="relative">
                        <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input 
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-ring focus:border-input outline-none transition-all text-sm"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                {error && (
                    <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md flex items-center gap-2 animate-scale-in">
                        <ShieldCheck size={16} className="flex-shrink-0" /> {error}
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground font-medium py-2 rounded-md hover:opacity-90 transition-all transform active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 mt-4"
                >
                    {authMode === 'login' ? 'Sign In' : 'Start Assessment'} <ArrowRight size={18} />
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                    {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
                    <button 
                        onClick={() => { setAuthMode(authMode === 'login' ? 'signup' : 'login'); setError(''); }}
                        className="font-bold text-primary hover:underline"
                    >
                        {authMode === 'login' ? 'Sign Up' : 'Log In'}
                    </button>
                </p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-border text-center">
                 <p className="text-[10px] text-muted-foreground">
                    Restricted Access: @{COMPANY_DOMAIN} <br/>
                    Demo: <span className="font-mono">employee1@{COMPANY_DOMAIN}</span> / pass123 <br/>
                    Admin: <span className="font-mono">admin@{COMPANY_DOMAIN}</span> / admin123
                 </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default App;