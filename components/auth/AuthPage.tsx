import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
import { useAuth } from '../../contexts/AuthContext';
import { COMPANY_DOMAIN } from '../../constants';
import { BrainCircuit, ArrowRight, ShieldCheck, Mail, Lock, User as UserIcon, CheckCircle, Lightbulb, Map, Zap, Check, Eye, EyeOff } from 'lucide-react';

export const AuthPage: React.FC = () => {
    const navigate = useNavigate();
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [loading, setLoading] = useState(false);

    const { refreshUser } = useAuth(); // Import refreshUser

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Domain Validation
        const allowedDomains = ['c4e.in'];
        const allowedEmails = ['aknnn2017@gmail.com', 'aknn2017@gmail.com'];

        const domain = email.split('@')[1]?.toLowerCase();
        const isAllowed = allowedDomains.includes(domain) || allowedEmails.includes(email.toLowerCase());

        if (!isAllowed) {
            navigate('/access-restricted');
            setLoading(false);
            return;
        }

        try {
            // Create a timeout promise
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Request timed out. Please check your connection.')), 10000)
            );

            if (authMode === 'login') {
                const { error } = await Promise.race([
                    supabase.auth.signInWithPassword({ email, password }),
                    timeoutPromise
                ]) as any;

                if (error) throw error;
            } else {
                // Signup Logic
                const { error } = await Promise.race([
                    supabase.auth.signUp({
                        email,
                        password,
                        options: { data: { full_name: name } },
                    }),
                    timeoutPromise
                ]) as any;

                if (error) throw error;

                // Show success message and wait briefly
                setSuccessMessage('Welcome. You now have access - your assessment is ready when you are.');
                await new Promise(resolve => setTimeout(resolve, 1500));
            }

            // Force a refresh of the user state with timeout
            const refreshPromise = refreshUser();
            const refreshTimeout = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('User data refresh timed out')), 5000)
            );

            await Promise.race([refreshPromise, refreshTimeout]);

        } catch (err: any) {
            console.error("Auth Error:", err);
            // Custom error message for domain issue if 403 or specific string, but generic fallback
            // Spec requested: "This assessment is available only to verified members of your organisation. Try another email."
            // We'll apply this generally for auth failures if it seems like a permissions/email issue, or keep generic if unknown.
            if (err.message && (err.message.includes('domain') || err.message.includes('authorized'))) {
                setError('This assessment is available only to verified members of your organisation. Try another email.');
            } else {
                setError(err.message || 'Authentication failed. Please try again.');
            }
        } finally {
            if (mounted.current) setLoading(false);
        }
    };

    // Add mounted ref to prevent state updates on unmount
    const mounted = React.useRef(true);
    React.useEffect(() => {
        return () => { mounted.current = false; };
    }, []);

    return (
        <div className="h-screen flex flex-col lg:flex-row bg-background text-foreground overflow-hidden">
            {/* Left Side - Visual */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
                {/* Mesh Gradient Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-slate-900"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900 to-slate-900"></div>

                {/* Oversized Lock Symbol */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] text-white pointer-events-none">
                    <Lock size={600} strokeWidth={0.5} />
                </div>

                <div className="relative z-10 max-w-lg px-12 text-white">
                    {/* Exclusivity Badge */}
                    <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full px-3 py-1 mb-8 backdrop-blur-sm">
                        <Lock size={12} className="text-indigo-300" />
                        <span className="text-xs font-medium text-indigo-100 tracking-wide uppercase">Private Access: Invited Employees Only</span>
                    </div>

                    <h1 className="text-5xl font-heading mb-6 leading-none tracking-tight">Unlock Your <br /> Professional Edge.</h1>

                    <h2 className="text-lg font-montserrat font-medium text-slate-200 mb-2 leading-relaxed max-w-md">
                        A private, organisation-only assessment that helps you understand how you work, lead, and grow.
                    </h2>

                    <p className="text-sm text-slate-400 mb-8 font-light">
                        Your insights remain confidential and support your professional development.
                    </p>

                    {/* Mini-Benefits List */}
                    <div className="space-y-4 mb-10">
                        <div className="flex items-center gap-3 text-slate-300">
                            <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                                <Zap size={18} className="text-indigo-400" />
                            </div>
                            <span className="font-light">Understand your work style</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-300">
                            <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                                <ShieldCheck size={18} className="text-indigo-400" />
                            </div>
                            <span className="font-light">Discover your leadership strengths</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-300">
                            <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                                <Map size={18} className="text-indigo-400" />
                            </div>
                            <span className="font-light">Map your growth opportunities</span>
                        </div>
                    </div>

                    <div className="flex gap-6 text-xs font-medium text-slate-500 uppercase tracking-widest">
                        <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-500/70" /> Confidential to You</span>
                        <span className="flex items-center gap-2"><Check size={14} className="text-blue-500/70" /> Designed for Your Organisation</span>
                        <span className="flex items-center gap-2"><Lock size={14} className="text-purple-500/70" /> Secure Access</span>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 lg:p-8 bg-background h-full overflow-y-auto">
                <div className="w-full max-w-md bg-card p-6 rounded-lg shadow-sm border border-border">
                    {successMessage ? (
                        <div className="text-center py-12 animate-fade-in">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-6">
                                <CheckCircle size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-foreground mb-2">Access Granted</h2>
                            <p className="text-muted-foreground">{successMessage}</p>
                            <div className="mt-8 flex justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-heading text-foreground mb-1">{authMode === 'login' ? 'Welcome Back' : 'Access Your Assessment'}</h2>
                                <p className="text-muted-foreground font-montserrat font-medium text-xs">
                                    {authMode === 'login'
                                        ? 'Enter your credentials to access your dashboard.'
                                        : "Use your official work email to begin."}
                                </p>
                            </div>

                            <form onSubmit={handleAuth} className="space-y-3">
                                {authMode === 'signup' && (
                                    <div className="space-y-0.5">
                                        <label className="text-[10px] font-bold text-foreground uppercase tracking-wide">Full Name</label>
                                        <div className="relative">
                                            <UserIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                            <input
                                                type="text"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full pl-9 pr-3 py-2.5 rounded-md border border-input bg-background focus:ring-2 focus:ring-ring focus:border-input outline-none transition-all text-sm placeholder:text-muted-foreground/50"
                                                placeholder="Your full name"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-0.5">
                                    <label className="text-[10px] font-bold text-foreground uppercase tracking-wide">Work Email</label>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            // Make hint logic: If format is invalid, helper text shows "Use your official organisation email to unlock access."
                                            // Using browser default validation for now + error state below
                                            className="w-full pl-9 pr-3 py-2.5 rounded-md border border-input bg-background focus:ring-2 focus:ring-ring focus:border-input outline-none transition-all text-sm placeholder:text-muted-foreground/50"
                                            placeholder={authMode === 'login' ? 'name@company.com' : 'Your work email'}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-0.5">
                                    <label className="text-[10px] font-bold text-foreground uppercase tracking-wide">Password</label>
                                    <div className="relative">
                                        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-9 pr-9 py-2.5 rounded-md border border-input bg-background focus:ring-2 focus:ring-ring focus:border-input outline-none transition-all text-sm placeholder:text-muted-foreground/50"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-4 bg-destructive/5 text-destructive text-sm rounded-md animate-scale-in border border-destructive/20">
                                        <div className="flex items-start gap-2">
                                            <ShieldCheck size={16} className="mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="font-medium">{error}</p>
                                                <p className="text-xs mt-1 text-muted-foreground">Use your official organisation email to unlock access.</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="group w-full bg-primary text-primary-foreground font-medium h-12 rounded-md hover:bg-primary/90 transition-all transform active:scale-[0.99] shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Processing...' : (authMode === 'login' ? 'Log In' : 'Unlock My Assessment')}
                                        {!loading && (
                                            authMode === 'signup' ? (
                                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                            ) : (
                                                <Lock size={14} className="group-hover:scale-110 transition-transform" />
                                            )
                                        )}
                                    </button>
                                </div>

                                {authMode === 'signup' && (
                                    <p className="text-center text-[10px] text-muted-foreground/70 mt-3 font-montserrat">
                                        Your responses are private and visible only to you and authorised assessment partners.
                                    </p>
                                )}
                            </form>

                            <div className="mt-6 text-center border-t border-border/50 pt-4">
                                <p className="text-xs text-foreground/80 font-medium">
                                    {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
                                    <button
                                        onClick={() => { setAuthMode(authMode === 'login' ? 'signup' : 'login'); setError(''); }}
                                        className="font-bold text-primary hover:text-primary/80 underline decoration-2 underline-offset-4"
                                    >
                                        {authMode === 'login' ? 'Sign Up' : 'Log In'}
                                    </button>
                                </p>
                            </div>

                            <div className="mt-4 text-center">
                                <p className="text-[10px] text-muted-foreground/60">
                                    Access restricted to verified members of your organisation.
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {/* Footer Compliance Note */}
                <div className="mt-8 text-center max-w-sm">
                    <p className="text-[11px] font-montserrat text-muted-foreground/40 text-center leading-relaxed">
                        This assessment is exclusive to your organisation and not publicly accessible.
                    </p>
                </div>
            </div>
        </div>
    );
};
