import React, { useState } from 'react';
import './EmployeeDashboard.css';

export const CustomerMessages: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      customer: 'John Smith',
      subject: 'Order Status Inquiry',
      message: 'When will my order ORD001 be delivered?',
      date: '2025-01-28 14:30',
      status: 'unread',
    },
    {
      id: 2,
      customer: 'Jane Doe',
      subject: 'Product Information',
      message: 'Do you have the keyboard in black color?',
      date: '2025-01-28 10:15',
      status: 'read',
    },
    {
      id: 3,
      customer: 'Bob Wilson',
      subject: 'Return Request',
      message: 'I would like to return my purchase.',
      date: '2025-01-27 16:45',
      status: 'read',
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [reply, setReply] = useState('');

  const handleMarkAsRead = (id: number) => {
    setMessages(
      messages.map((msg) => (msg.id === id ? { ...msg, status: 'read' } : msg))
    );
  };

  const handleReply = (id: number) => {
    if (reply.trim()) {
      alert(`✅ Reply sent to message #${id}:\n"${reply}"`);
      handleMarkAsRead(id);
      setReply('');
      setSelectedMessage(null);
    }
  };

  return (
    <div className="employee-page">
      <h1>Customer Messages</h1>

      <div className="messages-container">
        {/* Message List */}
        <div className="messages-list">
          <div className="list-header">
            <h2>Messages ({messages.length})</h2>
            <p>{messages.filter((m) => m.status === 'unread').length} unread</p>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message-item ${msg.status} ${selectedMessage === msg.id ? 'selected' : ''}`}
              onClick={() => {
                setSelectedMessage(msg.id);
                handleMarkAsRead(msg.id);
              }}
            >
              <div className="message-header">
                <h3>{msg.customer}</h3>
                <span className="date">{msg.date}</span>
              </div>
              <p className="subject">{msg.subject}</p>
              <p className="preview">{msg.message.substring(0, 60)}...</p>
            </div>
          ))}
        </div>

        {/* Message Detail & Reply */}
        {selectedMessage && (
          <div className="message-detail">
            {messages.map((msg) =>
              msg.id === selectedMessage ? (
                <div key={msg.id}>
                  <div className="detail-header">
                    <h2>{msg.subject}</h2>
                    <p className="customer-name">From: {msg.customer}</p>
                    <p className="message-date">{msg.date}</p>
                  </div>

                  <div className="message-body">
                    <p>{msg.message}</p>
                  </div>

                  <div className="reply-section">
                    <h3>Reply</h3>
                    <textarea
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder="Type your reply here..."
                      rows={5}
                    />
                    <div className="form-actions">
                      <button
                        className="btn-primary"
                        onClick={() => handleReply(msg.id)}
                      >
                        Send Reply
                      </button>
                      <button
                        className="btn-secondary"
                        onClick={() => {
                          setSelectedMessage(null);
                          setReply('');
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        )}
      </div>

      <div className="page-info">
        <p>💬 <strong>Note:</strong> You can reply to or mark messages as handled. Deletion is not allowed.</p>
      </div>
    </div>
  );
};
