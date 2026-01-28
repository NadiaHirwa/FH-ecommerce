import React from 'react';
import { Link } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess: React.FC = () => {
  const orderNumber = 'ORD-2024-001234';
  const orderDate = 'Jan 28, 2024';
  const estimatedDelivery = 'Feb 2-4, 2024';
  const orderTotal = 2154;
  const customerEmail = 'john@example.com';

  return (
    <div className="order-success-page">
      <div className="success-container">
        {/* Success Header */}
        <div className="success-header">
          <div className="success-icon">✅</div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your purchase! Your order has been confirmed.</p>
        </div>

        {/* Order Details Card */}
        <div className="order-details-card">
          <div className="order-info">
            <div className="info-row">
              <label>Order Number:</label>
              <span className="order-number">{orderNumber}</span>
              <button className="btn-copy" onClick={() => navigator.clipboard.writeText(orderNumber)}>
                📋 Copy
              </button>
            </div>
            <div className="info-row">
              <label>Order Date:</label>
              <span>{orderDate}</span>
            </div>
            <div className="info-row">
              <label>Order Total:</label>
              <span className="total">${orderTotal}</span>
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary-section">
            <h3>📦 Order Summary</h3>
            <div className="order-items">
              <div className="item">
                <span>Laptop Pro Max 15" × 2</span>
                <span>$1,998</span>
              </div>
              <div className="item">
                <span>Wireless Mouse × 1</span>
                <span>$45</span>
              </div>
              <div className="item-divider"></div>
              <div className="item-total">
                <span>Subtotal: $2,043</span>
              </div>
              <div className="item-total">
                <span>Shipping: FREE ✓</span>
              </div>
              <div className="item-total">
                <span>Tax: $111</span>
              </div>
              <div className="item-total-final">
                <span>Total: ${orderTotal}</span>
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="delivery-info">
            <div className="info-card">
              <span className="info-icon">📧</span>
              <div>
                <p>Confirmation email sent to:</p>
                <strong>{customerEmail}</strong>
              </div>
            </div>
            <div className="info-card">
              <span className="info-icon">🚚</span>
              <div>
                <p>Estimated Delivery:</p>
                <strong>{estimatedDelivery}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="whats-next">
          <h2>What's Next?</h2>
          <ol>
            <li>You'll receive a confirmation email shortly with your order details</li>
            <li>Your items will be prepared for shipment within 1-2 business days</li>
            <li>You'll get a tracking number once your order ships</li>
            <li>Track your package in real-time using your order number</li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <Link to="/track-order" className="btn btn-primary">
            📍 Track Your Order
          </Link>
          <Link to="/" className="btn btn-secondary">
            Continue Shopping
          </Link>
        </div>

        {/* Support */}
        <div className="support-section">
          <p>Have questions? <a href="/contact">Contact Us</a> or <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer">Chat on WhatsApp 💬</a></p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
