import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="container">
        <h1>📞 Get in Touch</h1>

        <div className="contact-grid">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="contact-form">
            <h2>Send us a Message</h2>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="contact-info">
            <h2>Contact Information</h2>

            <div className="info-card">
              <span className="info-icon">📍</span>
              <div>
                <h3>Address</h3>
                <p>123 Electronics Street</p>
                <p>Tech City, TC 12345</p>
              </div>
            </div>

            <div className="info-card">
              <span className="info-icon">📞</span>
              <div>
                <h3>Phone</h3>
                <a href="tel:+1234567890">+1 (234) 567-8900</a>
              </div>
            </div>

            <div className="info-card">
              <span className="info-icon">📧</span>
              <div>
                <h3>Email</h3>
                <a href="mailto:support@electroshop.com">support@electroshop.com</a>
              </div>
            </div>

            <div className="info-card">
              <span className="info-icon">💬</span>
              <div>
                <h3>WhatsApp</h3>
                <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer">
                  Chat with us now
                </a>
              </div>
            </div>

            <div className="info-card">
              <span className="info-icon">🕐</span>
              <div>
                <h3>Business Hours</h3>
                <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                <p>Sat - Sun: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
