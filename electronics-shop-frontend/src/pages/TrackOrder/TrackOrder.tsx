import React from 'react';
import { Link } from 'react-router-dom';
import './TrackOrder.css';

const TrackOrder: React.FC = () => {
  const [searchCompleted, setSearchCompleted] = React.useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchCompleted(true);
  };

  return (
    <div className="track-order-page">
      <div className="container">
        <h1>📍 Track Your Order</h1>

        {!searchCompleted ? (
          <div className="search-section">
            <form onSubmit={handleSearch} className="search-form">
              <h2>Enter your order details:</h2>
              <input type="text" placeholder="Order Number" required />
              <input type="email" placeholder="Email Address" required />
              <p className="or-text">OR</p>
              <input type="tel" placeholder="Phone Number" required />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
              <Link to="/" className="btn btn-secondary">
                Back to Home
              </Link>
            </form>
          </div>
        ) : (
          <div className="tracking-result">
            <div className="order-status">
              <h2>Order #ORD-2024-001234</h2>
              <p className="status-label">Status: <span className="status-badge processing">Processing</span></p>
            </div>

            <div className="timeline">
              <div className="timeline-item completed">
                <div className="timeline-circle">✅</div>
                <div className="timeline-content">
                  <h3>Order Placed</h3>
                  <p>Jan 28, 2024 · 2:30 PM</p>
                  <p className="timeline-desc">Your order has been received and confirmed</p>
                </div>
              </div>

              <div className="timeline-item active">
                <div className="timeline-circle">🔄</div>
                <div className="timeline-content">
                  <h3>Processing</h3>
                  <p>Jan 28, 2024 · 5:00 PM</p>
                  <p className="timeline-desc">We're preparing your items for shipment</p>
                </div>
              </div>

              <div className="timeline-item pending">
                <div className="timeline-circle">📦</div>
                <div className="timeline-content">
                  <h3>Shipped</h3>
                  <p>Expected: Jan 30, 2024</p>
                  <p className="timeline-desc">Your package is on its way</p>
                </div>
              </div>

              <div className="timeline-item pending">
                <div className="timeline-circle">🚚</div>
                <div className="timeline-content">
                  <h3>In Transit</h3>
                  <p>Expected: Feb 2, 2024</p>
                  <p className="timeline-desc">Out for delivery</p>
                </div>
              </div>

              <div className="timeline-item pending">
                <div className="timeline-circle">✓</div>
                <div className="timeline-content">
                  <h3>Delivered</h3>
                  <p>Expected: Feb 2-4, 2024</p>
                  <p className="timeline-desc">Delivery complete</p>
                </div>
              </div>
            </div>

            <div className="tracking-info">
              <div className="info-card">
                <h3>📋 Order Details</h3>
                <p><strong>Order #:</strong> ORD-2024-001234</p>
                <p><strong>Date:</strong> Jan 28, 2024</p>
                <p><strong>Total:</strong> $2,154</p>
                <p><strong>Items:</strong> 3 products</p>
              </div>

              <div className="info-card">
                <h3>📦 Shipment Info</h3>
                <p><strong>Tracking #:</strong> SHP-20240128-98765</p>
                <p><strong>Carrier:</strong> Express Delivery</p>
                <p><strong>Est. Delivery:</strong> Feb 2-4, 2024</p>
                <a href="#" className="tracking-link">Track on Carrier Website →</a>
              </div>
            </div>

            <div className="support-links">
              <p>Need help? <a href="/contact">Contact Support</a> or <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer">Chat on WhatsApp</a></p>
            </div>

            <button onClick={() => setSearchCompleted(false)} className="btn btn-secondary">
              Track Another Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
