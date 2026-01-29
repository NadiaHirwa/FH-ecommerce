import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SessionExpired: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        // Clear any lingering session data when landing on this page
        logout();
    }, [logout]);

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-4 text-center">
            <div className="max-w-md w-full">
                <div className="text-6xl mb-4">⏰</div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Session Expired</h1>
                <p className="text-gray-600 mb-8">
                    Your session has expired due to inactivity. Please log in again.
                </p>

                <button
                    onClick={() => navigate('/login')}
                    className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default SessionExpired;
