import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [expandDescription, setExpandDescription] = useState(false);

  // Sample product
  const product = {
    id: parseInt(id || '1'),
    name: 'Laptop Pro Max 15"',
    price: 999,
    originalPrice: 1299,
    mainImage: 'https://via.placeholder.com/400x400?text=Laptop+Main',
    images: [
      'https://via.placeholder.com/400x400?text=Laptop+Main',
      'https://via.placeholder.com/400x400?text=Laptop+Side',
      'https://via.placeholder.com/400x400?text=Laptop+Top',
      'https://via.placeholder.com/400x400?text=Laptop+Detail',
    ],
    rating: 4.8,
    reviews: 234,
    inStock: 5,
    category: 'Laptops',
    brand: 'Dell',
    description:
      'Experience the power of our flagship Laptop Pro Max. Perfect for professionals and creators.',
    fullDescription: `The Laptop Pro Max 15" is a professional-grade laptop designed for demanding users who need high performance and portability. 

Features:
• Intel i7 Processor
• 16GB RAM
• 512GB SSD
• 15" 4K Display
• Windows 11
• All-day battery life
• Premium build quality
• Thunderbolt 4 ports

Perfect for video editing, 3D modeling, software development, and content creation.`,
    features: ['Intel i7 Processor', '16GB RAM', '512GB SSD', '15" 4K Display', 'Windows 11'],
    warranty: '2-year manufacturer warranty',
    shipping: 'Free shipping on this item',
  };

  const relatedProducts = [
    {
      id: 2,
      name: 'Laptop Pro 14"',
      price: 799,
      image: 'https://via.placeholder.com/150x150?text=Laptop+14',
      rating: 4.6,
    },
    {
      id: 3,
      name: 'Gaming Laptop',
      price: 1399,
      image: 'https://via.placeholder.com/150x150?text=Gaming+Laptop',
      rating: 4.9,
    },
    {
      id: 4,
      name: 'Ultrabook Pro',
      price: 1099,
      image: 'https://via.placeholder.com/150x150?text=Ultrabook',
      rating: 4.7,
    },
  ];

  const reviews = [
    {
      id: 1,
      author: 'John Doe',
      rating: 5,
      text: 'Excellent laptop! Fast, reliable, and build quality is top-notch.',
      date: 'Jan 20, 2024',
    },
    {
      id: 2,
      author: 'Sarah Smith',
      rating: 4,
      text: 'Great performance, but a bit pricey. Still worth the investment.',
      date: 'Jan 15, 2024',
    },
  ];

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="product-detail-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <Link to="/shop">{product.category}</Link> / {product.name}
      </div>

      <div className="product-container">
        {/* Left Side - Images */}
        <div className="product-images">
          <div className="main-image">
            <img src={product.images[selectedImage]} alt={product.name} />
            {discount > 0 && <div className="discount-badge">{discount}% OFF</div>}
          </div>
          <div className="thumbnails">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} ${index + 1}`}
                className={selectedImage === index ? 'active' : ''}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Right Side - Product Info */}
        <div className="product-info">
          <h1>{product.name}</h1>

          {/* Rating */}
          <div className="rating">
            <span className="stars">⭐⭐⭐⭐⭐</span>
            <span className="rating-value">{product.rating} ({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="price-section">
            <span className="sale-price">${product.price}</span>
            <span className="original-price">${product.originalPrice}</span>
            <span className="savings">Save ${product.originalPrice - product.price}</span>
          </div>

          {/* Stock */}
          <div className="stock-status">
            {product.inStock > 0 ? (
              <>
                <span className="in-stock">✓ In Stock</span>
                <span className="stock-count">({product.inStock} available)</span>
              </>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>

          {/* Description */}
          <p className="description">{product.description}</p>

          {/* Features */}
          <div className="features">
            <h3>Key Features:</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>• {feature}</li>
              ))}
            </ul>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="cart-section">
            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="qty-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>
            <button className="btn btn-primary btn-add-cart">
              🛒 Add to Cart
            </button>
            <button className="btn btn-secondary">
              ❤️ Wishlist
            </button>
            <button className="btn btn-secondary">
              ↗️ Share
            </button>
          </div>

          {/* Additional Info */}
          <div className="additional-info">
            <p>✈️ {product.shipping}</p>
            <p>🛡️ {product.warranty}</p>
          </div>
        </div>
      </div>

      {/* Full Description */}
      <section className="full-description">
        <div className="container">
          <h2>Product Details</h2>
          <div className={`description-content ${expandDescription ? 'expanded' : ''}`}>
            {product.fullDescription.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          <button className="btn-expand" onClick={() => setExpandDescription(!expandDescription)}>
            {expandDescription ? 'Show Less ▲' : 'Read More ▼'}
          </button>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="reviews-section">
        <div className="container">
          <h2>Customer Reviews</h2>
          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div>
                    <h4>{review.author}</h4>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <span className="review-stars">{'⭐'.repeat(review.rating)}</span>
                </div>
                <p className="review-text">{review.text}</p>
                <button className="btn-helpful">👍 Helpful</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="related-products">
        <div className="container">
          <h2>Related Products</h2>
          <div className="related-grid">
            {relatedProducts.map((item) => (
              <Link key={item.id} to={`/product/${item.id}`} className="related-card">
                <img src={item.image} alt={item.name} />
                <h4>{item.name}</h4>
                <p>${item.price}</p>
                <span className="related-rating">⭐ {item.rating}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
