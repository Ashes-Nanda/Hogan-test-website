import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
import { useAuth } from '../../contexts/AuthContext';
import { COMPANY_DOMAIN } from '../../constants';
import { BrainCircuit, ArrowRight, ShieldCheck, Mail, Lock, User as UserIcon, CheckCircle, Eye, EyeOff } from 'lucide-react';

export const AuthPage: React.FC = () => {
    const navigate = useNavigate();
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [error, setError] = useState('');

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
            }

            // Force a refresh of the user state with timeout
            const refreshPromise = refreshUser();
            const refreshTimeout = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('User data refresh timed out')), 5000)
            );

            await Promise.race([refreshPromise, refreshTimeout]);

        } catch (err: any) {
            console.error("Auth Error:", err);
            setError(err.message || 'Authentication failed');
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
                    <h1 className="text-4xl lg:text-5xl font-oswald font-bold mb-6 leading-tight">Unlock Your Leadership Potential.</h1>
                    <p className="text-lg text-primary-foreground/90 font-light leading-relaxed">
                        The Hogan Assessment is the gold standard for predicting workplace performance.
                        Discover your strengths, values, and derailers with CerebralQ's enterprise platform.
                    </p>
                    <div className="mt-12 flex gap-4 text-sm font-medium opacity-70">
                        <span className="flex items-center gap-2"><ShieldCheck size={16} /> Secure</span>
                        <span className="flex items-center gap-2"><Lock size={16} /> Confidential</span>
                        <span className="flex items-center gap-2"><CheckCircle size={16} /> Validated</span>
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
                                        placeholder="Your Name"
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
                                    placeholder="Email"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-foreground uppercase tracking-wide">Password</label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-ring focus:border-input outline-none transition-all text-sm"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-destructive/10 text-destructive text-sm rounded-md animate-scale-in">
                                <div className="flex items-center gap-2 font-bold mb-2">
                                    <ShieldCheck size={16} className="flex-shrink-0" />
                                    <span>Connection Error</span>
                                </div>
                                <p className="mb-3">{error}</p>

                                <div className="bg-white/50 p-3 rounded text-xs font-mono text-muted-foreground">
                                    <p><strong>Diagnostics:</strong></p>
                                    <p>Mode: {import.meta.env.DEV ? 'Development (Proxy)' : 'Production'}</p>
                                    <p>URL: {import.meta.env.VITE_SUPABASE_URL?.slice(0, 20)}...</p>
                                    <p>Status: {loading ? 'Checking...' : 'Failed'}</p>
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            type="button"
                                            onClick={() => window.location.reload()}
                                            className="text-primary hover:underline font-bold"
                                        >
                                            Reload Page
                                        </button>
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                try {
                                                    const start = Date.now();
                                                    const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/`, { method: 'HEAD', headers: { apikey: import.meta.env.VITE_SUPABASE_ANON_KEY } });
                                                    alert(`Ping: ${Date.now() - start}ms. Status: ${res.status}`);
                                                } catch (e) {
                                                    alert(`Ping failed: ${e}`);
                                                }
                                            }}
                                            className="text-primary hover:underline font-bold"
                                        >
                                            Test Connection
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-primary-foreground font-medium py-2 rounded-md hover:opacity-90 transition-all transform active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Processing...' : (authMode === 'login' ? 'Unlock your Potential' : 'Start Assessment')}
                            {!loading && <ArrowRight size={18} />}
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
                            Restricted Access: @{COMPANY_DOMAIN} <br />
                            Authorized Personnel Only
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
