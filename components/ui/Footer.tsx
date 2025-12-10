import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="w-full py-6 bg-white border-t border-gray-100 mt-auto print:hidden">
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} CerebralQ. All rights reserved.
                </p>
            </div>
        </footer>
    );
};
