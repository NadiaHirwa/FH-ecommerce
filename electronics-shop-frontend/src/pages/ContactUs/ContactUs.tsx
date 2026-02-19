import React, { useState } from 'react';
import { Mail, MapPin, MessageSquare, Instagram, Twitter, Video, Facebook } from 'lucide-react';
import './ContactUs.css';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Thank you!");
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-wrapper">

          <div className="contact-content">
            <h1>Contact Us</h1>
            <p className="contact-description">
              Have questions or need help with your order? Our team is ready to assist you. Reach out via phone, email, or WhatsApp, and we’ll respond as soon as possible.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="icon-box"><Mail size={24} strokeWidth={1.5} /></div>
                <a href="mailto:fhtechnologyltd@gmail.com">fhtechnologyltd@gmail.com</a>
              </div>

              <div className="contact-item">
                <div className="icon-box"><MapPin size={24} strokeWidth={1.5} /></div>
                <div>
                  <p>4074 Ebert Summit Suite 375</p>
                  <p>Lake Leonardchester</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="icon-box"><MessageSquare size={24} strokeWidth={1.5} /></div>
                <a href="https://wa.me/250786729568" target="_blank" rel="noopener noreferrer">+250 786 729 568</a>
              </div>

              <div className="contact-socials">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                  <Instagram size={24} strokeWidth={1.5} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
                  <Twitter size={24} strokeWidth={1.5} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                  <Facebook size={24} strokeWidth={1.5} />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="TikTok">
                  <Video size={24} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
              </div>
              <div className="form-group">
                <input type="text" name="website" placeholder="Website" onChange={handleChange} />
              </div>
              <div className="form-group">
                <textarea name="message" placeholder="Message" rows={5} onChange={handleChange}></textarea>
              </div>

              <button type="submit" className="btn-submit">Submit</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;