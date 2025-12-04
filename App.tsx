import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { AdminDashboard } from './components/AdminDashboard';
import { AssessmentFlow } from './components/AssessmentFlow';
import { AuthPage } from './components/auth/AuthPage';

const App: React.FC = () => {
    const { user, loading, logout } = useAuth();

    if (loading) {
        return <div className="h-screen flex items-center justify-center bg-background text-primary">Loading...</div>;
    }

    if (!user) {
        return <AuthPage />;
    }

    return (
        <Routes>
            <Route
                path="/admin"
                element={
                    user.role === 'admin' ? (
                        <AdminDashboard onLogout={logout} />
                    ) : (
                        <Navigate to="/" replace />
                    )
                }
            />
            <Route
                path="/"
                element={<AssessmentFlow />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default App;