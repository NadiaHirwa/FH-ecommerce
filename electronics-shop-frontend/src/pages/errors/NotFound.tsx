import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-4 text-center">
            <div className="max-w-md w-full">
                <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Ops! Page Not Found</h2>
                <p className="text-gray-600 mb-8">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        Go to Home
                    </Link>
                    <Link
                        to="/shop"
                        className="px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200"
                    >
                        Go to Shop
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
