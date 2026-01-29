import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Unauthorized: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const getDashboardLink = () => {
        if (user?.role === 'admin') return '/admin';
        if (user?.role === 'employee') return '/employee-dashboard';
        return '/dashboard';
    };

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-4 text-center">
            <div className="max-w-md w-full">
                <div className="text-6xl mb-4">🛡️</div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>
                <p className="text-gray-600 mb-8">
                    You don’t have permission to access this page.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200"
                    >
                        Go Back
                    </button>
                    <button
                        onClick={() => navigate(getDashboardLink())}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;
