import React from 'react';
import './Policies.css';

const ReturnsWarranty: React.FC = () => {
  return (
    <div className="policy-page">
      <div className="container">
        <h1>🔄 Returns & Warranty</h1>
        <p className="last-updated">Last Updated: January 28, 2024</p>

        <div className="policy-content">
          <section>
            <h2>1. Return Policy</h2>
            <p>
              We want you to be completely satisfied with your purchase. If you're not happy with your product, we offer a hassle-free 30-day return policy.
            </p>
          </section>

          <section>
            <h2>2. Return Eligibility</h2>
            <p>To be eligible for a return, your item must meet the following conditions:</p>
            <ul>
              <li>Product must be in original, unused condition</li>
              <li>All original packaging and documentation included</li>
              <li>Return requested within 30 days of purchase</li>
              <li>Product not damaged due to misuse</li>
            </ul>
          </section>

          <section>
            <h2>3. How to Return</h2>
            <ol>
              <li>Contact our customer support team at support@electroshop.com</li>
              <li>Provide your order number and reason for return</li>
              <li>Receive return shipping instructions</li>
              <li>Ship the item back to us</li>
              <li>Refund processed within 5-7 business days</li>
            </ol>
          </section>

          <section>
            <h2>4. Warranty Information</h2>
            <p>All products come with manufacturer warranties. Warranty periods vary by product:</p>
            <ul>
              <li><strong>Electronics (Laptops, Desktops):</strong> 2-year manufacturer warranty</li>
              <li><strong>Accessories:</strong> 1-year manufacturer warranty</li>
              <li><strong>Software:</strong> 90-day warranty</li>
            </ul>
          </section>

          <section>
            <h2>5. Warranty Coverage</h2>
            <p>Our warranties cover:</p>
            <ul>
              <li>Defects in materials and workmanship</li>
              <li>Hardware failures under normal use</li>
              <li>Software issues and bugs</li>
              <li>Manufacturing defects</li>
            </ul>
          </section>

          <section>
            <h2>6. Warranty Exclusions</h2>
            <p>The following are not covered under warranty:</p>
            <ul>
              <li>Damage from accidents, misuse, or negligence</li>
              <li>Unauthorized repairs or modifications</li>
              <li>Damage from natural disasters</li>
              <li>Normal wear and tear</li>
              <li>Water or liquid damage</li>
            </ul>
          </section>

          <section>
            <h2>7. Warranty Claim Process</h2>
            <ol>
              <li>Contact our support team with product details</li>
              <li>Provide proof of purchase (receipt or order number)</li>
              <li>Describe the issue in detail</li>
              <li>Follow diagnostic steps provided</li>
              <li>Ship product for repair or replacement if needed</li>
            </ol>
          </section>

          <section>
            <h2>8. Contact Us</h2>
            <p>For return or warranty inquiries, please contact:</p>
            <p>
              <strong>Email:</strong> support@electroshop.com<br />
              <strong>Phone:</strong> +1 (234) 567-8900<br />
              <strong>WhatsApp:</strong> Available 24/7
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReturnsWarranty;
