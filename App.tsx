import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { AdminDashboard } from './components/AdminDashboard';
import { AssessmentFlow } from './components/AssessmentFlow';
import { AuthPage } from './components/auth/AuthPage';
import { AssessmentLandingPage } from './components/AssessmentLandingPage';
import { AccessRestricted } from './components/auth/AccessRestricted';
import { MockReportPage } from './components/MockReportPage';
import { Footer } from './components/ui/Footer';

const App: React.FC = () => {
    const { user, loading, logout, isAdminAuthenticated } = useAuth();

    if (loading) {
        return <div className="h-screen flex items-center justify-center bg-background text-primary">Loading...</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-1">
                <Routes>
                    {/* Auth Route */}
                    <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" replace />} />

                    {/* Access Restricted Route */}
                    <Route path="/access-restricted" element={<AccessRestricted />} />

                    {/* Mock Report Route - Public for Demo */}
                    <Route path="/mock-report" element={<MockReportPage />} />

                    {/* Protected Admin Route - Dashboard handles its own auth check now */}
                    <Route
                        path="/admin"
                        element={<AdminDashboard onLogout={logout} />}
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
            </div>
            <Footer />
        </div>
    );
};

export default App;