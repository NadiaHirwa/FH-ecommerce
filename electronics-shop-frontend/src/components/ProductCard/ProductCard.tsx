import React from 'react';
import type { Product } from '../../types';
import { formatPrice } from '../../utils/helpers';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  badge?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, badge }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {badge && <span className="product-badge new">{badge}</span>}
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="discount-badge">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <div className="product-rating">
          <span className="stars">★ {product.rating}</span>
          <span className="reviews">({product.reviews} reviews)</span>
        </div>
        <div className="product-price">
          <span className="current-price">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="original-price">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        <button
          className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};
