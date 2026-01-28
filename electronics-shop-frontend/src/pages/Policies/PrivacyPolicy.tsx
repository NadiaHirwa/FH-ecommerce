import React from 'react';
import './Policies.css';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="policy-page">
      <div className="container">
        <h1>🔒 Privacy Policy</h1>
        <p className="last-updated">Last Updated: January 28, 2024</p>

        <div className="policy-content">
          <section>
            <h2>1. Introduction</h2>
            <p>
              ElectroShop ("we", "our", or "us") operates the ElectroShop website and mobile application. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service.
            </p>
          </section>

          <section>
            <h2>2. Information Collection and Use</h2>
            <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
            <h3>Types of Data Collected:</h3>
            <ul>
              <li><strong>Personal Data:</strong> Name, email address, phone number, mailing address</li>
              <li><strong>Usage Data:</strong> Browser type, pages visited, time spent, device information</li>
              <li><strong>Payment Information:</strong> Credit/debit card details, transaction history</li>
              <li><strong>Cookies:</strong> To enhance user experience and track preferences</li>
            </ul>
          </section>

          <section>
            <h2>3. Use of Data</h2>
            <p>ElectroShop uses the collected data for various purposes:</p>
            <ul>
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To provide customer support</li>
              <li>To gather analysis to improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </section>

          <section>
            <h2>4. Security of Data</h2>
            <p>
              The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2>5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p>
              <strong>Email:</strong> privacy@electroshop.com<br />
              <strong>Address:</strong> 123 Electronics Street, Tech City, TC 12345
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
