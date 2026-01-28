import React, { useState } from 'react';
import { Product } from '../../../types';
import { useProducts } from '../../../hooks/useProducts';
import { useCart } from '../../../context/CartContext';
import { ProductCard } from '../../../components/ProductCard/ProductCard';
import './Home.css';

export const Home: React.FC = () => {
  const { products, loading, error } = useProducts();
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    addItem({
      ...product,
      cartQuantity: 1,
    });
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to ElectroShop</h1>
          <p>Discover the latest electronics at unbeatable prices</p>
          <button className="cta-button">Shop Now</button>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          <h2>Featured Products</h2>

          <div className="filters">
            <button
              className={selectedCategory === 'all' ? 'active' : ''}
              onClick={() => setSelectedCategory('all')}
            >
              All Products
            </button>
            <button
              className={selectedCategory === 'laptops' ? 'active' : ''}
              onClick={() => setSelectedCategory('laptops')}
            >
              Laptops
            </button>
            <button
              className={selectedCategory === 'phones' ? 'active' : ''}
              onClick={() => setSelectedCategory('phones')}
            >
              Phones
            </button>
            <button
              className={selectedCategory === 'accessories' ? 'active' : ''}
              onClick={() => setSelectedCategory('accessories')}
            >
              Accessories
            </button>
          </div>

          {loading && <p className="loading">Loading products...</p>}
          {error && <p className="error">Error: {error}</p>}

          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
