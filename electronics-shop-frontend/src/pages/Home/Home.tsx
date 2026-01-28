import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import type { Product } from '../../types';
import laptop from '../../assets/categories/laptop.jpg';
import monitor from '../../assets/categories/monitor.jpg';
import keyboard from '../../assets/categories/keyboard-mouse.jpg';
import headphones from '../../assets/categories/headphones.jpg';
import storage from '../../assets/categories/storage.jpg';
import accessory from '../../assets/categories/accessory.jpg';
import './Home.css';

const Home: React.FC = () => {
  // Sample products
  const [products] = useState([
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
    {
      id: '2',
      name: 'Wireless Mouse',
      price: 45,
      originalPrice: 69,
      image: accessory,
      rating: 4.5,
      reviews: 125,
      discount: 35,
      inStock: true,
      description: 'Ergonomic wireless mouse',
      category: 'Accessories',
    },
    {
      id: '3',
      name: 'USB-C Hub',
      price: 79,
      originalPrice: 99,
      image: storage,
      rating: 4.3,
      reviews: 89,
      discount: 20,
      inStock: true,
      description: 'Multi-port USB-C hub',
      category: 'Accessories',
    },
    {
      id: '4',
      name: 'Mechanical Keyboard',
      price: 149,
      originalPrice: 199,
      image: keyboard,
      rating: 4.6,
      reviews: 312,
      discount: 25,
      inStock: true,
      description: 'High-performance mechanical keyboard',
      category: 'Accessories',
    },
    {
      id: '5',
      name: 'Desktop Monitor 4K',
      price: 499,
      originalPrice: 699,
      image: monitor,
      rating: 4.7,
      reviews: 178,
      discount: 29,
      inStock: true,
      description: 'Beautiful 4K display monitor',
      category: 'Monitors',
    },
    {
      id: '6',
      name: 'Wireless Headphones',
      price: 199,
      originalPrice: 299,
      image: headphones,
      rating: 4.4,
      reviews: 456,
      discount: 33,
      inStock: true,
      description: 'Premium wireless headphones',
      category: 'Audio',
    },
  ]);

  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product);
    alert(`${product.name} added to cart!`);
  };

  const [categories] = useState([
    {
      id: 1,
      name: 'Laptops',
      image: laptop,
      count: 24,
    },
    {
      id: 2,
      name: 'Desktops',
      image: storage,
      count: 18,
    },
    {
      id: 3,
      name: 'Accessories',
      image: accessory,
      count: 156,
    },
    {
      id: 4,
      name: 'Phones',
      image: headphones,
      count: 42,
    },
  ]);

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1>Welcome to ElectroShop ⚡</h1>
          <p>Discover the Latest Electronics & Tech Gadgets</p>
          <Link to="/shop" className="btn btn-primary btn-lg">
            Shop Now →
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="featured-categories">
        <div className="container">
          <h2>🏆 Featured Categories</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/shop/category/${category.name.toLowerCase()}`}
                className="category-card"
              >
                <img src={category.image} alt={category.name} />
                <div className="category-overlay">
                  <h3>{category.name}</h3>
                  <p>{category.count} Products</p>
                  <span className="view-link">View Products →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="popular-products">
        <div className="container">
          <h2>🔥 Popular Now</h2>
          <div className="products-grid">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
          <Link to="/shop" className="btn btn-secondary">
            View All Products
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="new-arrivals">
        <div className="container">
          <h2>⭐ New Arrivals</h2>
          <div className="products-grid">
            {products.slice(2, 6).map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Promotions Banner */}
      <section className="promotions-banner">
        <div className="container">
          <div className="promo-card">
            <div className="promo-content">
              <h3>🎉 Special Offer</h3>
              <p>20% OFF Everything!</p>
              <p className="promo-code">Code: WELCOME20</p>
              <p className="promo-date">Ends Jan 31, 2026</p>
            </div>
            <Link to="/shop" className="btn btn-white">
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
