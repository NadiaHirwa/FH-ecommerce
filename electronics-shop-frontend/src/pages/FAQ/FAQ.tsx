import React, { useState } from 'react';
import './FAQ.css';

const FAQ: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqs = [
    {
      category: 'shipping',
      question: 'How much is shipping?',
      answer: 'Shipping is FREE for orders over $500. For orders below $500, standard shipping costs $50.',
    },
    {
      category: 'shipping',
      question: 'How long does delivery take?',
      answer: 'Standard delivery takes 5-7 business days. Express delivery takes 2-3 days, and overnight delivery is next day.',
    },
    {
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'We offer 30-day returns for all products. Items must be in original condition with all packaging.',
    },
    {
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept bank transfers and mobile money (MTN, Airtel, Vodafone).',
    },
    {
      category: 'payment',
      question: 'Is my payment information secure?',
      answer: 'Yes! We use industry-standard encryption to protect all payment information.',
    },
    {
      category: 'products',
      question: 'Are the products original?',
      answer: 'Yes, all our products are 100% original and come with manufacturer warranties.',
    },
  ];

  const categories = ['all', 'shipping', 'returns', 'payment', 'products'];
  const filteredFaqs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter((f) => f.category === selectedCategory);

  return (
    <div className="faq-page">
      <div className="container">
        <h1>❓ Frequently Asked Questions</h1>

        {/* Category Filter */}
        <div className="category-filter">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="accordions">
          {filteredFaqs.map((faq, index) => (
            <div key={index} className={`accordion ${expanded === index ? 'expanded' : ''}`}>
              <button
                className="accordion-header"
                onClick={() => setExpanded(expanded === index ? null : index)}
              >
                <span className="accordion-icon">▶</span>
                {faq.question}
              </button>
              {expanded === index && (
                <div className="accordion-content">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="still-questions">
          <h2>Still have questions?</h2>
          <p>Can't find the answer you're looking for? Please chat with our friendly team.</p>
          <div className="contact-buttons">
            <a href="/contact" className="btn btn-primary">
              Contact Us
            </a>
            <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="btn btn-secondary">
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
