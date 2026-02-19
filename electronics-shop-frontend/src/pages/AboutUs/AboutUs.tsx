import React, { useRef } from 'react';
import './AboutUs.css';
import { ArrowRight, CheckCircle, Diamond, Tag, Handshake, ChevronLeft, ChevronRight } from 'lucide-react';

const services = [
  { id: 1, title: "Device Repair & Maintenance", icon: "🔧", description: "Expert diagnosis and repair for laptops, PCs, and peripherals." },
  { id: 2, title: "Laptop Upgrades", icon: "💻", description: "RAM & SSD installation to boost your computer's speed and performance." },
  { id: 3, title: "Printer Setup", icon: "🖨️", description: "Complete installation, configuration, and troubleshooting services." },
  { id: 4, title: "Network Solutions", icon: "🌐", description: "Home and office Wi-Fi setup, router configuration, and optimization." },
  { id: 5, title: "Bulk Equipment Supply", icon: "📦", description: "Reliable sourcing of electronics for schools, offices, and businesses." },
  { id: 6, title: "Product Consultation", icon: "🛒", description: "Personalized advice to help you choose the perfect tech for your needs." }
];

const AboutUs: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 340; // Card width + gap
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollWidth = current.scrollWidth;
      const scrollLeft = current.scrollLeft;

      // Total sets = 3. One set width approx = scrollWidth / 3.
      const singleSetWidth = scrollWidth / 3;

      if (scrollLeft >= singleSetWidth * 2) {
        // Reset to start of middle set
        current.scrollLeft = scrollLeft - singleSetWidth;
      } else if (scrollLeft <= 0) {
        // Jump to end of middle set
        current.scrollLeft = scrollLeft + singleSetWidth;
      }
    }
  };

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
      </div>

      {/* 3️⃣ 🛠️ Our Services */}
      <section className="services-section">
        <div className="services-header-container">
          <h2>🛠️ Our Services</h2>
        </div>

        <div
          className="services-grid"
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {/* Render items multiple times for seamless loop */}
          {[...services, ...services, ...services].map((service, index) => (
            <div className="service-card" key={`${service.id}-${index}`}>
              <div className="service-header">
                <h3>{service.title}</h3>
                <span className="service-icon">{service.icon}</span>
              </div>
              <p>{service.description}</p>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="services-navigation">
          <button className="scroll-btn" onClick={() => scroll('left')} aria-label="Scroll left">
            <ChevronLeft size={24} />
          </button>
          <button className="scroll-btn" onClick={() => scroll('right')} aria-label="Scroll right">
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      <div className="container">
        {/* 4️⃣ Why Choose Us */}
        <section className="why-choose-us-section">
          <div className="why-choose-us-container">
            {/* Left Column: Text Content */}
            <div className="why-content">
              <h2>Why Choose Us?</h2>
              <p>
                We are committed to providing our customers with exceptional service, competitive pricing, and a wide range of products.
              </p>
              <button className="btn btn-primary">
                Get Started <ArrowRight size={20} />
              </button>
            </div>

            {/* Right Column: Features Grid */}
            <div className="why-features-grid">
              <div className="why-feature-item">
                <div className="why-feature-icon">
                  <CheckCircle size={32} />
                </div>
                <h3>Trusted Local Store</h3>
                <p>Rooted in the community, we are always here when you need us.</p>
              </div>

              <div className="why-feature-item">
                <div className="why-feature-icon">
                  <Diamond size={32} />
                </div>
                <h3>Quality Products</h3>
                <p>We stock only genuine, high-performance electronics and tools.</p>
              </div>

              <div className="why-feature-item">
                <div className="why-feature-icon">
                  <Tag size={32} />
                </div>
                <h3>Affordable Pricing</h3>
                <p>Competitive rates without compromising on quality or service.</p>
              </div>

              <div className="why-feature-item">
                <div className="why-feature-icon">
                  <Handshake size={32} />
                </div>
                <h3>After-Sale Support</h3>
                <p>Our relationship doesn't end at checkout; we support you all the way.</p>
              </div>
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
            <a href="tel:+250786729568" className="btn btn-call-solid">
              Call Us 📞
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
