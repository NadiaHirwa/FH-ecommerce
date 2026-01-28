import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

const AboutUs: React.FC = () => {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>About ElectroShop ⚡</h1>
          <p>Your trusted destination for quality electronics</p>
        </div>
      </section>

      {/* Story */}
      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            <img src="https://via.placeholder.com/500x300?text=Our+Story" alt="Our Story" />
            <div className="story-content">
              <h2>Our Journey</h2>
              <p>
                Founded in 2020, ElectroShop began with a simple mission: to provide high-quality electronics at competitive prices. What started as a small online store has grown into a trusted platform serving thousands of customers.
              </p>
              <p>
                We believe that everyone deserves access to the latest technology without breaking the bank. Our carefully curated selection of products ensures you get the best value for your money.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Quality</h3>
              <p>We source only the best products from trusted manufacturers</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💚</div>
              <h3>Customer Care</h3>
              <p>Your satisfaction is our top priority. We're here 24/7</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🚀</div>
              <h3>Innovation</h3>
              <p>We constantly improve to bring you the best experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Let's Stay Connected</h2>
          <p>Have questions or suggestions? We'd love to hear from you!</p>
          <Link to="/contact" className="btn btn-primary">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
