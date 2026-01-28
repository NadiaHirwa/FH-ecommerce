import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const SearchResults: React.FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    return (
        <div className="container-custom py-12">
            <h1 className="text-3xl font-bold mb-6">Search Results</h1>
            <p>Showing results for: "{query}"</p>
            {/* Product Grid would go here */}
        </div>
    );
};
