import React from 'react';
import { Link } from 'react-router-dom';

export const Cart: React.FC = () => {
    return (
        <div className="container-custom py-12">
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
            <p className="mb-8">Your cart is empty.</p>
            <Link to="/shop" className="btn-primary">
                Continue Shopping
            </Link>
        </div>
    );
};
