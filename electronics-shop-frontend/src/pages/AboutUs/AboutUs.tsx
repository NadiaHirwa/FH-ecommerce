import React from 'react';
import './AboutUs.css';

const AboutUs: React.FC = () => {
  return (
    <div className="about-page">
      {/* 1️⃣ Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>About Our Store</h1>
          <p>Your trusted local partner for quality electronics and tech solutions.</p>
        </div>
      </section>

      <div className="container">
        {/* 2️⃣ Who We Are */}
        <section className="who-we-are-section">
          <h2>Who We Are</h2>
          <div className="who-content">
            <p>
              We are a dedicated local electronics tools store committed to empowering your digital life.
              We provide only high-quality tech products, ensuring that every purchase adds value to your setup.
              Customer satisfaction is our absolute priority — we believ in building lasting relationships through trust and service.
            </p>
          </div>
        </section>

        {/* 3️⃣ 🛠️ Our Services */}
        <section className="services-section">
          <h2>🛠️ Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <span className="service-icon">🔧</span>
              <h3>Device Repair & Maintenance</h3>
              <p>Expert diagnosis and repair for laptops, PCs, and peripherals.</p>
            </div>
            <div className="service-card">
              <span className="service-icon">💻</span>
              <h3>Laptop Upgrades</h3>
              <p>RAM & SSD installation to boost your computer's speed and performance.</p>
            </div>
            <div className="service-card">
              <span className="service-icon">🖨️</span>
              <h3>Printer Setup</h3>
              <p>Complete installation, configuration, and troubleshooting services.</p>
            </div>
            <div className="service-card">
              <span className="service-icon">🌐</span>
              <h3>Network Solutions</h3>
              <p>Home and office Wi-Fi setup, router configuration, and optimization.</p>
            </div>
            <div className="service-card">
              <span className="service-icon">📦</span>
              <h3>Bulk Equipment Supply</h3>
              <p>Reliable sourcing of electronics for schools, offices, and businesses.</p>
            </div>
            <div className="service-card">
              <span className="service-icon">🛒</span>
              <h3>Product Consultation</h3>
              <p>Personalized advice to help you choose the perfect tech for your needs.</p>
            </div>
          </div>

          <div className="services-cta">
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp-outline">
              Chat With Us on WhatsApp 💬
            </a>
          </div>
        </section>

        {/* 4️⃣ Why Choose Us */}
        <section className="why-choose-us-section">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">✅</div>
              <h3>Trusted Local Store</h3>
              <p>Rooted in the community, we are always here when you need us.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💎</div>
              <h3>Quality Products</h3>
              <p>We stock only genuine, high-performance electronics and tools.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🏷️</div>
              <h3>Affordable Pricing</h3>
              <p>Competitive rates without compromising on quality or service.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🤝</div>
              <h3>After-Sale Support</h3>
              <p>Our relationship doesn't end at checkout; we support you all the way.</p>
            </div>
          </div>
        </section>
      </div>

      {/* 5️⃣ Call To Action */}
      <section className="about-cta-section">
        <div className="container">
          <h2>Need help choosing the right product?</h2>
          <p>Contact us today! Our team is ready to assist you.</p>
          <div className="cta-buttons">
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp-solid">
              WhatsApp Us 📲
            </a>
            <a href="tel:+1234567890" className="btn btn-call-solid">
              Call Us 📞
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
