import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import type { Product } from '../../types';
import './Category.css';

const Category: React.FC = () => {
  const { category } = useParams();

  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product);
    alert(`${product.name} added to cart!`);
  };

  const products = [
    {
      id: '1',
      name: 'Laptop Pro Max 15"',
      price: 999,
      originalPrice: 1299,
      image: 'https://via.placeholder.com/250x250?text=Laptop',
      rating: 4.8,
      reviews: 234,
      discount: 23,
      inStock: true,
      description: 'Powerful laptop for professionals',
      category: 'Laptops',
    },
    {
      id: '2',
      name: 'Gaming Laptop',
      price: 1499,
      originalPrice: 1999,
      image: 'https://via.placeholder.com/250x250?text=Gaming',
      rating: 4.9,
      reviews: 189,
      discount: 25,
      inStock: true,
      description: 'High-performance gaming laptop',
      category: 'Laptops',
    },
  ];

  return (
    <div className="category-page">
      {/* Hero Banner */}
      <div className="category-hero">
        <img src={`https://via.placeholder.com/1400x300?text=${category}`} alt={category} />
        <div className="hero-content">
          <h1>{category}</h1>
          <p>{products.length} products available</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {category}
      </div>

      {/* Products */}
      <div className="container">
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
