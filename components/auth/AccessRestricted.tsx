import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, ArrowLeft } from 'lucide-react';

export const AccessRestricted: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
            <div className="max-w-md w-full text-center space-y-8">
                {/* Logo */}
                <div className="flex justify-center">
                    <div className="bg-muted p-3 rounded-xl">
                        <BrainCircuit size={48} className="text-muted-foreground" />
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                    <h1 className="text-2xl font-bold font-oswald tracking-tight">
                        There was an error signing in
                    </h1>
                    <p className="text-muted-foreground leading-relaxed">
                        Thank you for your interest in CerebralQ. Due to high demand, we are currently only onboarding users who have connected directly with our team.
                    </p>
                </div>

                {/* Action */}
                <div>
                    <button
                        onClick={() => navigate('/auth')}
                        className="bg-primary text-primary-foreground font-medium px-6 py-2.5 rounded-md hover:opacity-90 transition-all shadow-sm inline-flex items-center gap-2"
                    >
                        <ArrowLeft size={16} />
                        Back to Login
                    </button>
                </div>

                {/* Footer */}
                <div className="pt-8">
                    <p className="text-sm text-muted-foreground">
                        Keep seeing this error? Please <a href="#" className="underline hover:text-foreground">contact support</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};
