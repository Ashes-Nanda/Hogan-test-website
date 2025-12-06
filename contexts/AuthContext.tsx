import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../services/supabaseClient';
import { User, TestStatus } from '../types';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAdminAuthenticated: boolean;
    setUser: (user: User | null) => void;
    refreshUser: () => Promise<void>;
    logout: () => Promise<void>;
    loginAdmin: (password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

    useEffect(() => {
        // Check for admin session persistence
        const adminSession = localStorage.getItem('admin_session');
        if (adminSession === 'true') {
            setIsAdminAuthenticated(true);
        }

        // Critical Env Check
        // @ts-ignore
        if (!process.env.ADMIN_PASSWORD) {
            console.error("CRITICAL: ADMIN_PASSWORD is not set in environment variables. Admin login will fail.");
        }
    }, []);

    const loginAdmin = async (password: string): Promise<boolean> => {
        // @ts-ignore
        const configuredPass = process.env.ADMIN_PASSWORD;

        if (!configuredPass) {
            console.error("Admin password not configured");
            return false;
        }

        if (password === configuredPass) {
            localStorage.setItem('admin_session', 'true');
            setIsAdminAuthenticated(true);
            return true;
        }
        return false;
    };

    const fetchUserData = async (userId: string, email: string) => {
        console.log('fetchUserData started', userId);

        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Data fetch timed out')), 5000)
        );

        try {
            // Fetch Profile
            console.log('Fetching profile...');
            const profilePromise = supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .maybeSingle();

            const { data: profile, error: profileError } = await Promise.race([profilePromise, timeoutPromise]) as any;

            console.log('Profile fetched', profile, profileError);

            if (profileError) {
                console.error('Error fetching profile:', profileError);
            }

            // Fetch Attempts
            console.log('Fetching attempts...');
            const attemptsPromise = supabase
                .from('attempts')
                .select('*')
                .eq('user_id', userId)
                .order('completed_at', { ascending: true });

            const { data: attempts, error: attemptsError } = await Promise.race([attemptsPromise, timeoutPromise]) as any;

            console.log('Attempts fetched', attempts?.length, attemptsError);

            if (attemptsError) {
                console.error('Error fetching attempts:', attemptsError);
            }

            // Construct User object
            const mappedUser: User = {
                id: userId,
                email: email,
                name: profile?.full_name || email.split('@')[0],
                role: 'employee', // FORCE_NORMAL_USER: Decoupled from DB/email. Admin access is now separate.
                status: (attempts && attempts.length > 0) ? TestStatus.COMPLETED : TestStatus.PENDING,
                token: 'supabase-session', // Placeholder
                attempts: (attempts || []).map((a: any) => ({
                    id: a.id,
                    number: a.attempt_number,
                    completedAt: a.completed_at,
                    answers: a.answers,
                    result: a.result
                }))
            };
            console.log('Setting user:', mappedUser.email);
            setUser(mappedUser);
        } catch (err) {
            console.error('Error in fetchUserData:', err);
        }
    };

    const refreshUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            await fetchUserData(session.user.id, session.user.email!);
        }
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        // Also clear admin session if they log out of the app
        localStorage.removeItem('admin_session');
        setIsAdminAuthenticated(false);
    };

    useEffect(() => {
        let mounted = true;

        // Safety timeout: Force loading to false after 3 seconds to prevent infinite load
        const safetyTimeout = setTimeout(() => {
            if (mounted) {
                console.warn("Auth loading timed out, forcing render.");
                setLoading(false);
            }
        }, 3000);

        const initSession = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                if (error) throw error;

                if (session?.user && mounted) {
                    await fetchUserData(session.user.id, session.user.email!);
                }
            } catch (err) {
                console.error("Session init error:", err);
            } finally {
                if (mounted) setLoading(false);
                clearTimeout(safetyTimeout);
            }
        };

        initSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (!mounted) return;

            if (session?.user) {
                await fetchUserData(session.user.id, session.user.email!);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => {
            mounted = false;
            clearTimeout(safetyTimeout);
            subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, isAdminAuthenticated, setUser, refreshUser, logout, loginAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
