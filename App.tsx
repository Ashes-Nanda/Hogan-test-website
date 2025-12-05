import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { AdminDashboard } from './components/AdminDashboard';
import { AssessmentFlow } from './components/AssessmentFlow';
import { AuthPage } from './components/auth/AuthPage';
import { AssessmentLandingPage } from './components/AssessmentLandingPage';
import { AccessRestricted } from './components/auth/AccessRestricted';

const App: React.FC = () => {
    const { user, loading, logout } = useAuth();

    if (loading) {
        return <div className="h-screen flex items-center justify-center bg-background text-primary">Loading...</div>;
    }

    return (
        <Routes>
            {/* Auth Route */}
            <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" replace />} />

            {/* Access Restricted Route */}
            <Route path="/access-restricted" element={<AccessRestricted />} />

            {/* Protected Admin Route */}
            <Route
                path="/admin"
                element={
                    user ? (
                        user.role === 'admin' ? (
                            <AdminDashboard onLogout={logout} />
                        ) : (
                            <Navigate to="/" replace />
                        )
                    ) : (
                        <Navigate to="/auth" replace />
                    )
                }
            />

            {/* Assessment Flow (Test & Results) */}
            <Route
                path="/assessment"
                element={
                    user ? <AssessmentFlow /> : <Navigate to="/auth" replace />
                }
            />

            {/* Landing Page (Home) */}
            <Route
                path="/"
                element={
                    user ? <AssessmentLandingPage /> : <Navigate to="/auth" replace />
                }
            />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default App;