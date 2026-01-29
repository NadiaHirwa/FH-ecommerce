import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServerError: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-4 text-center">
            <div className="max-w-md w-full">
                <div className="text-6xl mb-4">⚠️</div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">500 Server Error</h1>
                <p className="text-gray-600 mb-8">
                    Something went wrong on our side. Please try again later.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        Refresh Page
                    </button>
                    <button
                        onClick={() => navigate('/contact')}
                        className="px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200"
                    >
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServerError;
