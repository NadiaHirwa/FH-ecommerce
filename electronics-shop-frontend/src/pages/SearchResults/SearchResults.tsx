import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import type { Product } from '../../types';
import laptop from '../../assets/categories/laptop.jpg';
import './SearchResults.css';

interface SearchResultsProps {
  query?: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query: initialQuery }) => {
  const [searchParams] = useSearchParams();
  const query = initialQuery || searchParams.get('q') || '';

  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product);
    alert(`${product.name} added to cart!`);
  };

  const mockResults = query ? [
    {
      id: '1',
      name: 'Laptop Pro Max 15"',
      price: 999,
      originalPrice: 1299,
      image: laptop,
      rating: 4.8,
      reviews: 234,
      discount: 23,
      inStock: true,
      description: 'Powerful laptop for professionals',
      category: 'Laptops',
    },
  ] : [];

  return (
    <div className="search-results-page">
      <div className="container">
        <h1>Search Results</h1>
        {query && (
          <p className="search-query">
            Showing results for: <strong>"{query}"</strong> ({mockResults.length} found)
          </p>
        )}

        {mockResults.length > 0 ? (
          <div className="results-grid">
            {mockResults.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h2>😕 No products found</h2>
            <p>We couldn't find any products matching "{query}"</p>
            <p>Try different keywords or browse categories</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
