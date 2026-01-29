import React from 'react';

const Maintenance: React.FC = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-4 text-center">
            <div className="max-w-md w-full">
                <div className="text-6xl mb-4">🛠️</div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Under Maintenance</h1>
                <p className="text-gray-600 mb-8">
                    We’re doing some maintenance. We’ll be back shortly.
                </p>

                {/* Optional contact info as requested */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                    <p className="text-gray-500 text-sm">Need urgent help?</p>
                    <a
                        href="mailto:support@fhecommerce.com"
                        className="text-blue-600 font-medium hover:underline mt-1 block"
                    >
                        support@fhecommerce.com
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Maintenance;
