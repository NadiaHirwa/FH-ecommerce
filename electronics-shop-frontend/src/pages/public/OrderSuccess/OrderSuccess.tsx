import React from 'react';
import { Link } from 'react-router-dom';

export const OrderSuccess: React.FC = () => {
    return (
        <div className="container-custom py-12 text-center">
            <h1 className="text-3xl font-bold mb-6 text-green-600">Order Successful!</h1>
            <p className="mb-8">Thank you for your purchase.</p>
            <Link to="/" className="btn-primary">
                Return Home
            </Link>
        </div>
    );
};
