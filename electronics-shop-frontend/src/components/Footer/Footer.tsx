import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Quick Links Section */}
        <section className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/returns">Returns & Warranty</a></li>
          </ul>
        </section>

        {/* Support Section */}
        <section className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><a href="/help">Help Center</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/shipping">Shipping Info</a></li>
            <li><a href="/track-order">Track Order</a></li>
          </ul>
        </section>

        {/* About Us Section */}
        <section className="footer-section">
          <h4>About Us</h4>
          <ul>
            <li><a href="/about">About ElectroShop</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/press">Press</a></li>
          </ul>
        </section>

        {/* Connect With Us Section */}
        <section className="footer-section">
          <h4>Connect With Us</h4>
          
          {/* Contact Information */}
          <div className="contact-info">
            <p>
              <span className="contact-icon">📧</span>
              <a href="mailto:support@electroshop.com">support@electroshop.com</a>
            </p>
            <p>
              <span className="contact-icon">📞</span>
              <a href="tel:1-800-3325876">1-800-ELECTRO</a>
            </p>
          </div>

          {/* Social Media Links */}
          <div className="social-links">
            <a 
              href="https://facebook.com" 
              title="Visit us on Facebook" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              f
            </a>
            <a 
              href="https://twitter.com" 
              title="Follow us on Twitter" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              𝕏
            </a>
            <a 
              href="https://instagram.com" 
              title="Follow us on Instagram" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              📷
            </a>
            <a 
              href="https://linkedin.com" 
              title="Connect with us on LinkedIn" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              in
            </a>
          </div>
        </section>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {currentYear} ElectroShop. All rights reserved. | Made with ❤️</p>
      </div>
    </footer>
  );
};
