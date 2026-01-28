import React from 'react';
import { useParams } from 'react-router-dom';

export const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <div className="container-custom py-12">
            <h1 className="text-3xl font-bold mb-6">Product Details</h1>
            <p>Details for product ID: {id}</p>
        </div>
    );
};
