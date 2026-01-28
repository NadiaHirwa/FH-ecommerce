import React, { useState } from 'react';
import '../EmployeeDashboard.css';

export const EmployeeOverview: React.FC = () => {
  const [showAddItem, setShowAddItem] = useState(false);

  const cards = [
    { title: 'Total Items in Stock', value: '1,234', icon: '📦', color: '#1e40af' },
    { title: 'Units Available', value: '856', icon: '✅', color: '#059669' },
    { title: 'Inventory Value', value: '$45,280', icon: '💰', color: '#7c3aed' },
    { title: 'Transactions (Today)', value: '18', icon: '📊', color: '#dc2626' },
    { title: 'Assigned Orders', value: '7', icon: '📬', color: '#2563eb' },
  ];

  const recentOrders = [
    { id: 'ORD001', customer: 'John Smith', status: 'Processing', date: '2025-01-28' },
    { id: 'ORD002', customer: 'Jane Doe', status: 'Ready for Delivery', date: '2025-01-27' },
    { id: 'ORD003', customer: 'Bob Wilson', status: 'Pending', date: '2025-01-27' },
  ];

  return (
    <div className="employee-page">
      <h1>Employee Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="cards-grid">
        {cards.map((card, idx) => (
          <div key={idx} className="summary-card">
            <div className="card-header" style={{ borderTopColor: card.color }}>
              <span className="card-icon">{card.icon}</span>
              <span className="card-title">{card.title}</span>
            </div>
            <div className="card-value">{card.value}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <section className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <button className="action-btn" onClick={() => setShowAddItem(true)}>
            ➕ Add Item to Inventory
          </button>
          <button className="action-btn">🧾 Record Offline Sale (POS)</button>
          <button className="action-btn">📦 View Stock</button>
          <button className="action-btn">📄 View Transactions</button>
        </div>
      </section>

      {/* Recent Orders */}
      <section className="recent-orders">
        <h2>Your Assigned Orders</h2>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td className="order-id">{order.id}</td>
                <td>{order.customer}</td>
                <td>
                  <span className={`badge badge-${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {order.status}
                  </span>
                </td>
                <td>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Add Item Modal (Basic) */}
      {showAddItem && (
        <div className="modal-overlay" onClick={() => setShowAddItem(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add Item to Inventory</h2>
            <form className="form-group">
              <input type="text" placeholder="Product Name" />
              <input type="number" placeholder="Quantity" />
              <input type="text" placeholder="Category" />
              <div className="form-actions">
                <button type="submit" className="btn-primary">Save Item</button>
                <button type="button" className="btn-secondary" onClick={() => setShowAddItem(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
