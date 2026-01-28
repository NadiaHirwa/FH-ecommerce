import React, { useState } from 'react';
import './Support.css';

interface Message {
  id: string;
  sender: 'user' | 'support';
  text: string;
  timestamp: string;
  isRead?: boolean;
}

const Support: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'user', text: 'Hi, I need help with my recent order', timestamp: '2026-01-28 10:00' },
    { id: '2', sender: 'support', text: 'Hello! We\'re here to help. What\'s your order number?', timestamp: '2026-01-28 10:05', isRead: true },
    { id: '3', sender: 'user', text: 'It\'s #ORD-2026-003', timestamp: '2026-01-28 10:10' },
    { id: '4', sender: 'support', text: 'Thank you! Your order is currently being processed and will ship within 24 hours. We\'ll send you a tracking number as soon as it ships.', timestamp: '2026-01-28 10:15', isRead: true },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="support-page">
      <div className="page-header">
        <h1>Support & Messages</h1>
        <p>Chat with our support team for help</p>
      </div>

      <div className="support-container">
        <div className="messages-box">
          <div className="messages-header">
            <h3>Support Chat</h3>
            <span className="status-badge online">● Online</span>
          </div>

          <div className="messages-list">
            {messages.map(msg => (
              <div key={msg.id} className={`message message-${msg.sender}`}>
                <div className="message-content">
                  <p>{msg.text}</p>
                  <span className="timestamp">{msg.timestamp}</span>
                </div>
              </div>
            ))}
          </div>

          <form className="message-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="message-input"
            />
            <button type="submit" className="send-btn" disabled={!newMessage.trim()}>
              Send
            </button>
          </form>
        </div>

        <div className="support-info">
          <div className="info-card">
            <h4>Available Help Topics</h4>
            <ul>
              <li>📦 Order & Shipping</li>
              <li>💳 Payment Issues</li>
              <li>📋 Returns & Refunds</li>
              <li>🔐 Account Security</li>
              <li>⚙️ Technical Support</li>
            </ul>
          </div>

          <div className="info-card">
            <h4>Quick Contact</h4>
            <p>
              <strong>Email:</strong><br />
              <a href="mailto:support@electroshop.com">support@electroshop.com</a>
            </p>
            <p>
              <strong>WhatsApp:</strong><br />
              <a href="https://wa.me/1555123456" target="_blank" rel="noopener noreferrer">
                Message Us
              </a>
            </p>
            <p>
              <strong>Hours:</strong><br />
              Mon - Fri: 9 AM - 6 PM<br />
              Sat - Sun: 10 AM - 4 PM
            </p>
          </div>

          <div className="info-card">
            <h4>FAQs</h4>
            <ul>
              <li><a href="/faq">Frequently Asked Questions</a></li>
              <li><a href="/returns">Returns & Warranty</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
